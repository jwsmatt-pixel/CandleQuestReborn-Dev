// PLB-006 Slice 1: pure rules only; no game, storage, network, or clock access.
const MINUTE = 60_000;
const NY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/New_York', year: 'numeric', month: '2-digit',
  day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
const iso = time => new Date(time).toISOString();
const parts = time => Object.fromEntries(NY.formatToParts(time).map(p => [p.type, p.value]));
const localDate = time => {
  const p = parts(time);
  return p.year + '-' + p.month + '-' + p.day;
};
function parseInstant(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return NaN;
  const time = Date.parse(value);
  return Number.isFinite(time) && iso(time) === value ? time : NaN;
}
function sessionStart(date) {
  // New York's offset at noon UTC also applies at 09:30 local, including DST dates.
  const noon = Date.parse(date + 'T12:00:00.000Z');
  const p = parts(noon);
  const localAsUTC = Date.parse(p.year + '-' + p.month + '-' + p.day + 'T' + p.hour + ':' + p.minute + ':00.000Z');
  return Date.parse(date + 'T09:30:00.000Z') - (localAsUTC - noon);
}
function windowInfo(start, count) {
  return {start: iso(start), end: iso(start + (count - 1) * MINUTE),
    completesAt: iso(start + count * MINUTE)};
}

/** Classify one explicitly synthetic COINBASE:BTCUSD session. See docs/PLB006_SLICE1.md. */
export function classifySession(input) {
  const result = {status: 'invalid', classification: null, openingRange: null,
    firstBreakout: null, breachedBoundary: null, search: null, assessment: null,
    missingCandles: [], errors: []};
  const error = (code, message, index) => result.errors.push({code, message,
    ...(index === undefined ? {} : {index})});
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    error('INPUT', 'Expected an input object.');
    return result;
  }
  if (input.instrument !== 'COINBASE:BTCUSD' || input.dataKind !== 'synthetic' || input.timeframe !== '1m') {
    error('METADATA', 'Expected COINBASE:BTCUSD, dataKind synthetic, timeframe 1m.');
  }
  const date = input.sessionDate;
  const dateTime = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? Date.parse(date + 'T00:00:00.000Z') : NaN;
  if (!Number.isFinite(dateTime) || iso(dateTime).slice(0, 10) !== date) {
    error('SESSION_DATE', 'sessionDate must be a valid YYYY-MM-DD New York calendar date.');
  }
  const asOf = parseInstant(input.asOf);
  if (!Number.isFinite(asOf)) error('AS_OF', 'asOf must be a canonical UTC ISO instant.');
  if (!Array.isArray(input.candles)) error('CANDLES', 'candles must be an array.');
  if (result.errors.length) return result;

  let previous = -Infinity;
  const candles = new Map();
  input.candles.forEach((candle, index) => {
    if (!candle || typeof candle !== 'object' || Array.isArray(candle)) {
      error('CANDLE', 'Expected a candle object.', index);
      return;
    }
    const time = parseInstant(candle.timestamp);
    if (!Number.isFinite(time) || time % MINUTE !== 0) {
      error('TIMESTAMP', 'Candle timestamp must be canonical UTC ISO at an exact minute opening.', index);
      return;
    }
    if (time <= previous) error('ORDER', 'Candle openings must be strictly increasing without duplicates.', index);
    previous = time;
    if (localDate(time) !== date) error('SESSION', 'Every candle must belong to sessionDate in New York.', index);
    if (time > asOf) error('FUTURE_OPEN', 'Candle opens after asOf.', index);
    if (typeof candle.complete !== 'boolean') error('COMPLETENESS', 'Each candle needs an explicit complete boolean.', index);
    if (candle.complete === true && time + MINUTE > asOf) error('FUTURE_CLOSE', 'Completed candle closes after asOf.', index);
    const {open, high, low, close} = candle;
    if (![open, high, low, close].every(v => typeof v === 'number' && Number.isFinite(v) && v > 0)
      || low > Math.min(open, close) || high < Math.max(open, close) || low > high) {
      error('OHLC', 'Expected finite positive OHLC prices with low <= open/close <= high.', index);
    }
    candles.set(time, candle);
  });
  if (result.errors.length) return result;
  result.status = 'incomplete';
  const start = sessionStart(date);
  const searchStart = start + 15 * MINUTE;
  result.search = {...windowInfo(searchStart, 61), checkedCloses: []};
  const required = (time, phase) => {
    const candle = candles.get(time);
    if (!candle || !candle.complete || time + MINUTE > asOf) {
      result.missingCandles.push({timestamp: iso(time), phase,
        reason: !candle ? 'missing' : 'not-completed'});
      return null;
    }
    return candle;
  };
  const opening = Array.from({length: 15}, (_, i) => required(start + i * MINUTE, 'opening-range'));
  if (opening.some(c => !c)) return result;
  result.openingRange = {high: Math.max(...opening.map(c => c.high)),
    low: Math.min(...opening.map(c => c.low)), ...windowInfo(start, 15), count: 15};
  const {high, low} = result.openingRange;
  // Stop at the first data gap: a later candle cannot prove it was the first breakout.
  for (let i = 0; i < 61; i++) {
    const time = searchStart + i * MINUTE;
    const candle = required(time, 'breakout-search');
    if (!candle) return result;
    result.search.checkedCloses.push({timestamp: iso(time), close: candle.close});
    const direction = candle.close > high ? 'bullish' : candle.close < low ? 'bearish' : null;
    if (direction) {
      result.breachedBoundary = direction === 'bullish' ? high : low;
      result.firstBreakout = {timestamp: iso(time), direction, close: candle.close,
        boundary: result.breachedBoundary};
      const assessmentStart = time + MINUTE;
      const closes = [];
      result.assessment = {...windowInfo(assessmentStart, 15), expectedCount: 15,
        observedCount: 0, closes, firstReturn: null};
      for (let j = 0; j < 15; j++) {
        const assessmentTime = assessmentStart + j * MINUTE;
        const next = required(assessmentTime, 'assessment');
        if (!next) continue;
        const returnedToBoundary = direction === 'bullish' ? next.close <= high : next.close >= low;
        const evidence = {timestamp: iso(assessmentTime), close: next.close, returnedToBoundary};
        closes.push(evidence);
        if (returnedToBoundary && !result.assessment.firstReturn) result.assessment.firstReturn = evidence;
      }
      result.assessment.observedCount = closes.length;
      if (closes.length === 15) {
        result.status = 'complete';
        result.classification = result.assessment.firstReturn ? 'B' : 'A';
      }
      return result;
    }
  }
  result.status = 'complete';
  result.classification = 'C';
  return result;
}
