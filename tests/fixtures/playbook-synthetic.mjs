// Explicitly synthetic 1m COINBASE:BTCUSD training candles; never market history.
export const MINUTE = 60_000;
export const stamp = time => new Date(time).toISOString();
export function syntheticSession({date = '2026-01-15', utcOpen = '14:30', count = 91} = {}) {
  const start = Date.parse(date + 'T' + utcOpen + ':00.000Z');
  return {instrument: 'COINBASE:BTCUSD', dataKind: 'synthetic', timeframe: '1m',
    sessionDate: date, asOf: stamp(start + count * MINUTE),
    candles: Array.from({length: count}, (_, i) => ({timestamp: stamp(start + i * MINUTE),
      open: 100, high: i < 15 ? 110 : 105, low: i < 15 ? 90 : 95,
      close: 100, complete: true}))};
}
export function setClose(input, index, close) {
  Object.assign(input.candles[index], {open: 100, close,
    high: Math.max(105, close + 1), low: Math.min(95, close - 1)});
  return input;
}
export function breakoutFixture(direction, {failed = false, breakoutIndex = 15, returnIndex = breakoutIndex + 1} = {}) {
  const input = syntheticSession();
  const close = direction === 'bullish' ? 111 : 89;
  for (let i = breakoutIndex; i < input.candles.length; i++) setClose(input, i, close);
  if (failed) setClose(input, returnIndex, direction === 'bullish' ? 110 : 90);
  return input;
}
