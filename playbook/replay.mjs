import {classifySession} from './classifier.mjs';
export const DEFAULT_AUTOPLAY_MS = 75_000; // Playtest tuning point; no player settings.
export const LABELS = Object.freeze({A:'Sustained Breakout', B:'Failed Initial Breakout', C:'No Qualifying Breakout'});
export const nyTime = stamp => new Intl.DateTimeFormat('en-GB', {timeZone:'America/New_York', hour:'2-digit', minute:'2-digit', hourCycle:'h23'}).format(new Date(stamp));
const cutoff = (input, count) => count ? new Date(Date.parse(input.candles[count-1].timestamp)+60000).toISOString() : input.candles[0].timestamp;
export function prefix(input, count) {
  return {...input, candles:input.candles.slice(0,count).map(c=>({...c})), asOf:cutoff(input,count)};
}
// The classifier alone decides when enough observation exists. Never invent an A/B/C rule here.
export function observationLength(input) {
  for(let n=1;n<=input.candles.length;n++) {
    const result=classifySession(prefix(input,n));
    if(result.status==='invalid') throw new Error('Invalid training scenario');
    if(result.status==='complete') return n;
  }
  throw new Error('Training scenario lacks required observations');
}
export function createReplay(input, duration=DEFAULT_AUTOPLAY_MS) {
  const limit=observationLength(input);
  return {cursor:0, revealed:0, limit, completed:false, playing:true, stepMs:duration/limit};
}
export function advance(state) {
  if(!state.playing) return state;
  const cursor=Math.min(state.cursor+1,state.limit);
  const completed=state.completed || cursor===state.limit;
  return {...state,cursor,revealed:Math.max(state.revealed,cursor),completed,playing:cursor<state.limit};
}
export function inspect(state, delta) {
  if(!state.completed) return state;
  return {...state,playing:false,cursor:Math.max(0,Math.min(state.revealed,state.cursor+Math.sign(delta)))};
}
export function replayFromStart(state) {
  return state.completed ? {...state,cursor:0,playing:true} : state;
}
export function snapshot(input,state) {
  const inputPrefix=prefix(input,Math.min(state.cursor,state.revealed));
  const result=classifySession(inputPrefix);
  const opening=inputPrefix.candles.slice(0,15);
  const range=opening.length ? {high:Math.max(...opening.map(c=>c.high)),low:Math.min(...opening.map(c=>c.low)),locked:!!result.openingRange} : null;
  return {candles:inputPrefix.candles,asOf:inputPrefix.asOf,range,result};
}
export function descriptionChoices(result) {
  if(result.status!=='complete') throw new Error('Observation incomplete');
  const b=result.firstBreakout, a=result.assessment;
  const boundary=b?.direction==='bullish' ? 'ORH' : 'ORL';
  const correct=b
    ? (nyTime(b.timestamp)+' '+b.direction+' candle closes '+b.close+' beyond '+boundary+' '+b.boundary+' → '+(a.firstReturn ? 'a close returns to or through that boundary at '+nyTime(a.firstReturn.timestamp)+' within the 15 following completed candles' : 'all 15 following closes stay beyond that boundary')+' → '+LABELS[result.classification]+'.')
    : 'No strict close beyond ORH or ORL from 09:45 through 10:45 → all 61 search closes observed → No Qualifying Breakout.';
  // Stable order, with the correct card away from the first position. No correctness sent to markup.
  return [
    {id:'wick',text:'A wick crosses ORH → count the wick as the first breakout → Sustained Breakout.'},
    {id:'equal',text:'A close equals ORH → equality qualifies as an upward breakout → assess the next 15 candles.'},
    {id:'evidence',text:correct},
    {id:'replace',text:'The first breakout returns inside → replace it with the later upward breakout → Sustained Breakout.'},
    {id:'reversal',text:'The initial upward breakout fails → assume the entire session reverses down → whole-session bearish reversal.'}
  ];
}
export function grade(result, classification, description) {
  if(result.status!=='complete') throw new Error('Observation incomplete');
  return {classificationCorrect:classification===result.classification,descriptionCorrect:description==='evidence',
    explanation:descriptionChoices(result).find(c=>c.id==='evidence').text};
}
