import {classifySession} from './classifier.mjs';
export const DEFAULT_AUTOPLAY_MS = 60_000; // Single playtest tuning point for every scenario.
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
  if (!Number.isFinite(duration) || duration <= 0) throw new RangeError('Replay duration must be positive milliseconds');
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
  if(range) range.midpoint=(range.high+range.low)/2;
  return {candles:inputPrefix.candles,asOf:inputPrefix.asOf,range,result};
}
export function descriptionChoices(result) {
  if(result.status!=='complete') throw new Error('Observation incomplete');
  const b=result.firstBreakout, a=result.assessment;
  const boundary=b?.direction==='bullish' ? 'ORH' : 'ORL';
  const correct=b
    ? (nyTime(b.timestamp)+' '+b.direction+' candle closes '+b.close+' beyond '+boundary+' '+b.boundary+' → '+(a.firstReturn ? 'a close returns to or through that boundary at '+nyTime(a.firstReturn.timestamp)+' within the 15 following completed candles' : 'all 15 following closes stay beyond that boundary')+' → '+LABELS[result.classification]+'.')
    : 'No strict close beyond ORH or ORL from 09:45 through 10:45 → all 61 search closes observed → No Qualifying Breakout.';
  const choices = [
    {id:'wick',text:'A wick crosses a range boundary → count the wick as the first breakout → Sustained Breakout.'},
    {id:'equal',text:'A close equals a boundary → equality qualifies as a breakout → assess the next 15 candles.'},
    {id:'evidence',text:correct},
    {id:'replace',text:'The first breakout returns inside → replace it with a later breakout → Sustained Breakout.'},
    {id:'reversal',text:'The initial breakout fails → assume a reversal for the entire session → whole-session reversal.'}
  ];
  // Deterministic variety; the evidence card has no fixed screen position.
  const offset=result.classification==='C'?4:(result.classification==='A'?1:0)+(b?.direction==='bearish'?2:0);
  return [...choices.slice(offset),...choices.slice(0,offset)];
}
export function scenarioTitle(result) {
  if(result.status!=='complete') throw new Error('Observation incomplete');
  return result.firstBreakout
    ? (result.classification==='A'?'Sustained ':'Failed ')+
      (result.firstBreakout.direction==='bullish'?'Bullish':'Bearish')+
      (result.classification==='A'?' Breakout':' Initial Breakout')+' ('+result.classification+')'
    : LABELS.C+' (C)';
}
export function grade(result, classification, description) {
  if(result.status!=='complete') throw new Error('Observation incomplete');
  return {classificationCorrect:classification===result.classification,descriptionCorrect:description==='evidence',
    explanation:descriptionChoices(result).find(c=>c.id==='evidence').text};
}
