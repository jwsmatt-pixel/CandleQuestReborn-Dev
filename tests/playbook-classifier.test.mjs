import test from 'node:test';
import assert from 'node:assert/strict';
import {classifySession} from '../playbook/classifier.mjs';
import {syntheticSession, breakoutFixture, setClose, stamp, MINUTE} from './fixtures/playbook-synthetic.mjs';

for (const direction of ['bullish', 'bearish']) {
  for (const failed of [false, true]) {
    test((failed ? 'failed ' : 'sustained ') + direction + ' breakout', () => {
      const input = breakoutFixture(direction, {failed});
      const r = classifySession(input);
      assert.equal(r.status, 'complete');
      assert.equal(r.classification, failed ? 'B' : 'A');
      assert.equal(r.openingRange.high, 110);
      assert.equal(r.openingRange.low, 90);
      assert.equal(r.openingRange.completesAt, input.candles[15].timestamp);
      assert.equal(r.firstBreakout.timestamp, input.candles[15].timestamp);
      assert.equal(r.firstBreakout.direction, direction);
      assert.equal(r.breachedBoundary, direction === 'bullish' ? 110 : 90);
      assert.equal(r.assessment.start, input.candles[16].timestamp);
      assert.equal(r.assessment.end, input.candles[30].timestamp);
      assert.equal(r.assessment.completesAt, input.candles[31].timestamp);
      assert.equal(r.assessment.closes.length, 15);
      assert.equal(r.assessment.firstReturn?.timestamp ?? null, failed ? input.candles[16].timestamp : null);
      assert.deepEqual(r.errors, []);
    });
  }
  test(direction + ' failure on fifteenth assessment close counts', () => {
    assert.equal(classifySession(breakoutFixture(direction, {failed: true, returnIndex: 30})).classification, 'B');
  });
  test(direction + ' crossing through opposite boundary fails initial breakout', () => {
    const input = breakoutFixture(direction);
    setClose(input, 16, direction === 'bullish' ? 80 : 120);
    setClose(input, 17, direction === 'bullish' ? 130 : 70);
    const r = classifySession(input);
    assert.equal(r.classification, 'B');
    assert.equal(r.firstBreakout.direction, direction);
    assert.equal(r.firstBreakout.timestamp, input.candles[15].timestamp);
  });
  test(direction + ' missing assessment cannot finalise even after known failure', () => {
    const input = breakoutFixture(direction, {failed: true});
    input.candles.splice(25, 1);
    const r = classifySession(input);
    assert.equal(r.status, 'incomplete');
    assert.equal(r.classification, null);
    assert.equal(r.assessment.observedCount, 14);
    assert.ok(r.assessment.firstReturn);
    assert.equal(r.missingCandles[0].phase, 'assessment');
  });
  test(direction + ' assessment wicks and sixteenth close do not cause failure', () => {
    const input = breakoutFixture(direction);
    input.candles[16].high = 200;
    input.candles[16].low = 50;
    setClose(input, 31, 100);
    assert.equal(classifySession(input).classification, 'A');
  });
  test(direction + ' last permitted breakout needs closes through 11:00', () => {
    const input = breakoutFixture(direction, {breakoutIndex: 75});
    const r = classifySession(input);
    assert.equal(r.classification, 'A');
    assert.equal(r.firstBreakout.timestamp, '2026-01-15T15:45:00.000Z');
    assert.equal(r.assessment.end, '2026-01-15T16:00:00.000Z');
    assert.equal(r.assessment.completesAt, '2026-01-15T16:01:00.000Z');
    input.candles.pop();
    input.asOf = '2026-01-15T16:00:59.999Z';
    assert.equal(classifySession(input).status, 'incomplete');
  });
}

test('failed initial breakout followed by later expansion stays B', () => {
  const input = breakoutFixture('bullish', {failed: true});
  for (let i = 31; i < 91; i++) setClose(input, i, 150);
  const r = classifySession(input);
  assert.equal(r.classification, 'B');
  assert.equal(r.firstBreakout.timestamp, input.candles[15].timestamp);
  assert.equal(r.assessment.firstReturn.timestamp, input.candles[16].timestamp);
});

test('complete search with no qualifying breakout is C', () => {
  const r = classifySession(syntheticSession({count: 76}));
  assert.equal(r.status, 'complete');
  assert.equal(r.classification, 'C');
  assert.equal(r.search.checkedCloses.length, 61);
  assert.equal(r.search.completesAt, '2026-01-15T15:46:00.000Z');
  assert.equal(r.firstBreakout, null);
  assert.equal(r.breachedBoundary, null);
  assert.equal(r.assessment, null);
});

test('wick-only breaches never qualify and cannot change frozen OR', () => {
  const input = syntheticSession();
  for (const candle of input.candles.slice(15)) { candle.high = 200; candle.low = 50; }
  const r = classifySession(input);
  assert.equal(r.classification, 'C');
  assert.equal(r.openingRange.high, 110);
  assert.equal(r.openingRange.low, 90);
});

test('closes exactly on either boundary never qualify', () => {
  const input = syntheticSession();
  for (let i = 15; i < 91; i++) setClose(input, i, i % 2 ? 110 : 90);
  assert.equal(classifySession(input).classification, 'C');
});

test('10:46 breakout is outside search', () => {
  assert.equal(classifySession(breakoutFixture('bullish', {breakoutIndex: 76})).classification, 'C');
});

test('09:44 closing breach is part of OR, not a breakout', () => {
  const input = syntheticSession();
  setClose(input, 14, 120);
  const r = classifySession(input);
  assert.equal(r.openingRange.high, 121);
  assert.equal(r.classification, 'C');
});

for (const count of [0, 14, 15, 75]) {
  test('prefix of ' + count + ' candles cannot finalise C', () => {
    const r = classifySession(syntheticSession({count}));
    assert.equal(r.status, 'incomplete');
    assert.equal(r.classification, null);
    assert.ok(r.missingCandles.length);
  });
}
for (const count of [16, 30]) {
  test('breakout with only ' + (count - 16) + ' assessment closes is incomplete', () => {
    const input = breakoutFixture('bullish');
    input.candles.length = count;
    input.asOf = stamp(Date.parse(input.candles[0].timestamp) + count * MINUTE);
    assert.equal(classifySession(input).status, 'incomplete');
    assert.equal(classifySession(input).classification, null);
  });
}

test('A can finalise at fifteenth assessment close before search end', () => {
  const input = breakoutFixture('bullish');
  input.candles.length = 31;
  input.asOf = '2026-01-15T15:01:00.000Z';
  assert.equal(classifySession(input).classification, 'A');
});

for (const index of [0, 14, 15, 20, 75]) {
  test('missing required candle at index ' + index + ' yields incomplete', () => {
    const input = syntheticSession();
    input.candles.splice(index, 1);
    const r = classifySession(input);
    assert.equal(r.status, 'incomplete');
    assert.equal(r.classification, null);
  });
}

test('missing search candle prevents claiming a later first breakout', () => {
  const input = breakoutFixture('bullish', {breakoutIndex: 20});
  input.candles.splice(16, 1);
  const r = classifySession(input);
  assert.equal(r.status, 'incomplete');
  assert.equal(r.firstBreakout, null);
});

for (const index of [0, 15, 16, 75]) {
  test('explicitly uncompleted required candle at ' + index, () => {
    const input = syntheticSession();
    input.candles[index].complete = false;
    assert.equal(classifySession(input).status, 'incomplete');
  });
}

test('uncompleted assessment candle preserves evidence without final classification', () => {
  const input = breakoutFixture('bullish');
  input.candles[30].complete = false;
  const r = classifySession(input);
  assert.equal(r.status, 'incomplete');
  assert.equal(r.classification, null);
  assert.equal(r.missingCandles[0].reason, 'not-completed');
});

const invalidCases = [
  ['duplicate', i => i.candles.splice(16, 0, {...i.candles[15]}), 'ORDER'],
  ['out of order', i => [i.candles[15], i.candles[16]] = [i.candles[16], i.candles[15]], 'ORDER'],
  ['low above body', i => i.candles[0].low = 101, 'OHLC'],
  ['high below body', i => i.candles[0].high = 99, 'OHLC'],
  ['inverted range', i => Object.assign(i.candles[0], {low: 120, high: 80}), 'OHLC'],
  ['NaN', i => i.candles[0].close = NaN, 'OHLC'],
  ['Infinity', i => i.candles[0].high = Infinity, 'OHLC'],
  ['numeric string', i => i.candles[0].open = '100', 'OHLC'],
  ['nonpositive BTC price', i => i.candles[0].low = 0, 'OHLC'],
  ['absent completion flag', i => delete i.candles[0].complete, 'COMPLETENESS'],
  ['nonboolean completion', i => i.candles[0].complete = 1, 'COMPLETENESS'],
  ['null candle', i => i.candles[0] = null, 'CANDLE'],
  ['ambiguous local timestamp', i => i.candles[0].timestamp = '2026-01-15T09:30:00', 'TIMESTAMP'],
  ['off-minute timestamp', i => i.candles[0].timestamp = '2026-01-15T14:30:01.000Z', 'TIMESTAMP'],
  ['impossible timestamp', i => i.candles[0].timestamp = '2026-02-30T14:30:00.000Z', 'TIMESTAMP'],
  ['wrong NY session', i => i.sessionDate = '2026-01-16', 'SESSION'],
  ['impossible date', i => i.sessionDate = '2026-02-30', 'SESSION_DATE'],
  ['wrong timeframe', i => i.timeframe = '5m', 'METADATA'],
  ['unlabelled data', i => delete i.dataKind, 'METADATA'],
  ['live data', i => i.dataKind = 'live', 'METADATA'],
  ['wrong instrument', i => i.instrument = 'BTCUSD', 'METADATA'],
  ['missing candles array', i => delete i.candles, 'CANDLES'],
  ['bad asOf', i => i.asOf = 'yesterday', 'AS_OF'],
  ['future completed close', i => { i.asOf = '2026-01-15T16:00:59.999Z'; }, 'FUTURE_CLOSE'],
  ['future opening', i => { i.asOf = '2026-01-15T14:30:00.000Z'; }, 'FUTURE_OPEN']
];
for (const [label, mutate, code] of invalidCases) {
  test('invalid: ' + label, () => {
    const input = syntheticSession();
    mutate(input);
    const r = classifySession(input);
    assert.equal(r.status, 'invalid');
    assert.equal(r.classification, null);
    assert.ok(r.errors.some(e => e.code === code));
  });
}
for (const input of [undefined, null, [], 42]) {
  test('invalid root ' + JSON.stringify(input), () => assert.equal(classifySession(input).status, 'invalid'));
}

for (const [date, utcOpen] of [
  ['2026-03-07', '14:30'], ['2026-03-08', '13:30'], ['2026-03-09', '13:30'],
  ['2026-10-31', '13:30'], ['2026-11-01', '14:30'], ['2026-11-02', '14:30']
]) {
  test('New York DST session ' + date + ' opens at ' + utcOpen + 'Z', () => {
    const input = syntheticSession({date, utcOpen});
    const r = classifySession(input);
    assert.equal(r.classification, 'C');
    assert.equal(r.openingRange.start, date + 'T' + utcOpen + ':00.000Z');
    assert.equal(r.search.start, stamp(Date.parse(input.candles[0].timestamp) + 15 * MINUTE));
    assert.equal(r.search.end, stamp(Date.parse(input.candles[0].timestamp) + 75 * MINUTE));
  });
}

test('deterministic and does not mutate frozen input', () => {
  const input = breakoutFixture('bearish');
  input.candles.forEach(Object.freeze);
  Object.freeze(input.candles);
  Object.freeze(input);
  assert.deepEqual(classifySession(input), classifySession(input));
});
