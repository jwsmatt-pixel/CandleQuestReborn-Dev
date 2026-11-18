// Synthetic training illustration only. Prices are invented, not market history.
export const SCENARIO_COUNT = 5;
// Fixed rotation, starting with the accepted Task 2 illustration. Names are
// derived from classifier evidence in feedback, never sent to the watch screen.
export function trainingScenario(index = 0) {
  if (!Number.isInteger(index) || index < 0 || index >= SCENARIO_COUNT) throw new RangeError('Unknown training scenario');
  const start = Date.parse('2026-01-15T14:30:00.000Z');
  const closes = [60000,60024,60010,59980,59950,59972,60010,60060,60085,60040,60000,59960,59930,59980,60030,
    60060,60090,60100,60120,60085,60105,60148,60170,60185,60160,60140,60132,60110,60070,60030,59990,60050,60150,60180,60200,60170,60190];
  if (index === 1 || index === 3) {
    for (let i=22;i<closes.length;i++) closes[i]=60140+(i%5)*18;
  }
  if (index === 4) {
    closes.length=21;
    while(closes.length<76) closes.push(60000+((closes.length%7)-3)*30);
  }
  const candles = closes.map((close, i) => {
    const open = i ? closes[i-1] : 59990;
    return {timestamp:new Date(start + i*60000).toISOString(), open, close,
      high:Math.max(open,close) + (i < 15 ? 20 : 16),
      low:Math.min(open,close) - (i < 15 ? 20 : 16), complete:true};
  });
  candles[8].high = 60120;
  candles[12].low = 59880;
  candles[17].high = 60160; // Wick only; the close stays inside.
  if (index === 2 || index === 3) {
    for (const c of candles) {
      const {open,high,low,close}=c;
      Object.assign(c,{open:120000-open,high:120000-low,low:120000-high,close:120000-close});
    }
  }
  return {instrument:'COINBASE:BTCUSD', dataKind:'synthetic', timeframe:'1m',
    sessionDate:'2026-01-15', asOf:new Date(start + candles.length*60000).toISOString(), candles};
}
