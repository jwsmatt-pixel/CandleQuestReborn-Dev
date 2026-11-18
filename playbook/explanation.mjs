// Explanation wording describes evidence; only classifySession establishes A/B/C.
import {classifySession} from './classifier.mjs';
export const PARTS = ['move', 'response', 'result'];
export function buildEvidence(displayedInput) {
  const result = classifySession(displayedInput);
  if (result.status !== 'complete') throw new Error('Complete observation required');
  const {openingRange, firstBreakout, assessment, search} = result;
  const byTime = new Map(displayedInput.candles.map(c => [c.timestamp,c]));
  const searchCandles = search.checkedCloses.map(c => byTime.get(c.timestamp));
  return {classification:result.classification, openingRange:{...openingRange},
    firstBreakout:firstBreakout && {...firstBreakout},
    followingCloses:assessment ? assessment.closes.map(c=>({...c})) : [],
    firstReturn:assessment?.firstReturn ? {...assessment.firstReturn} : null,
    search:{...search,checkedCloses:search.checkedCloses.map(c=>({...c}))},
    searchComplete:!firstBreakout && search.checkedCloses.length===61,
    wickOnlyBreaches:searchCandles.filter(c => c.close<=openingRange.high && c.close>=openingRange.low && (c.high>openingRange.high || c.low<openingRange.low)).map(c=>c.timestamp),
    boundaryEqualCloses:searchCandles.filter(c=>c.close===openingRange.high || c.close===openingRange.low).map(c=>c.timestamp)};
}
// Semantic assertions have one truth value independent of wording and position.
export function supports(e, part, claim) {
  if (part==='move') return claim===(e.firstBreakout?.direction ?? 'none');
  if (part==='response') return claim===(e.searchComplete ? 'search' : e.firstReturn ? 'return' : 'hold');
  if (part==='result') return claim===e.classification;
  return false;
}
const WORDING = {
  move:{
    bullish:['The first qualifying close finished above ORH.', 'Price first closed strictly above the range high.'],
    bearish:['The first qualifying close finished below ORL.', 'Price first closed strictly below the range low.'],
    none:['No qualifying close finished outside either boundary.', 'Price never closed strictly outside the opening range.']},
  response:{
    hold:['All 15 following completed closes stayed strictly beyond the boundary breached by the first breakout.', 'Across the next 15 completed candles, every close stayed strictly beyond the first breakout boundary.'],
    return:['A following close reached or crossed back through the breached boundary.', 'Within the next 15 closes, price closed at or through the breakout boundary.'],
    search:['All 61 completed search closes finished within or exactly on the opening range boundaries.', 'Through the 10:45 candle, every search close stayed within or on the range.']},
  result:{
    A:['The completed evidence establishes a sustained breakout: Category A.', 'Category A: the first breakout held across its full assessment.'],
    B:['The completed evidence establishes a failed initial breakout: Category B.', 'Category B: the first breakout failed within its full assessment.'],
    C:['The completed evidence establishes no qualifying breakout: Category C.', 'Category C: the full search ended without a qualifying breakout.']}
};
export function explanationChoices(e, part, variation=0) {
  if (!WORDING[part] || !Number.isInteger(variation) || variation<0) throw new Error('Invalid explanation request');
  const choices=Object.entries(WORDING[part]).map(([id,phrases])=>({id,text:phrases[variation%phrases.length]}));
  const offset=(variation+PARTS.indexOf(part))%choices.length;
  const rotated=[...choices.slice(offset),...choices.slice(0,offset)];
  return variation%2 ? rotated.reverse() : rotated;
}
export function gradeExplanation(e, classification, answers, variation=0) {
  const parts=PARTS.map(part=>{
    const choices=explanationChoices(e,part,variation);
    const chosen=choices.find(c=>c.id===answers[part]);
    if (!chosen) throw new Error('Choose every explanation part');
    const reference=choices.find(c=>supports(e,part,c.id));
    return {part,chosen:chosen.text,reference:reference.text,correct:supports(e,part,chosen.id)};
  });
  return {classificationCorrect:classification===e.classification,
    explanationCorrect:parts.every(p=>p.correct),parts,
    reference:parts.map(p=>p.reference).join(' → ')};
}

// Independent writing is preserved for human comparison, never semantically graded.
export function independentReview(e, classification, written, variation=0) {
  if (!['A','B','C'].includes(classification) || !PARTS.every(p=>typeof written[p]==='string' && written[p].trim())) throw new Error('Complete your read and choose a category');
  const time=stamp=>new Intl.DateTimeFormat('en-GB',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(stamp));
  const b=e.firstBreakout, boundary=b?.direction==='bullish'?'ORH':'ORL';
  const facts=b ? {
    move:time(b.timestamp)+' candle closed '+b.close+' strictly '+(b.direction==='bullish'?'above':'below')+' '+boundary+' '+b.boundary+'; this was the first qualifying closing breakout.',
    response:e.firstReturn
      ? time(e.firstReturn.timestamp)+' candle closed '+e.firstReturn.close+' at or through '+boundary+' '+b.boundary+' within the next 15 completed closes. The original first breakout remains authoritative.'
      : 'All 15 following completed closes stayed strictly beyond '+boundary+' '+b.boundary+'.',
    result:'Category '+e.classification+': '+(e.classification==='A'?'the first breakout held':'the first breakout failed')+' across its 15-close assessment through '+time(e.followingCloses.at(-1).timestamp)+'.'
  } : {
    move:'No qualifying closing breakout occurred from 09:45 through 10:45 inclusive. ORH '+e.openingRange.high+'; ORL '+e.openingRange.low+'.',
    response:'All 61 completed search closes stayed within or exactly on the opening range boundaries. There is no first breakout or 15-close A/B assessment.',
    result:'Category C: no qualifying closing breakout by the complete search cutoff; the 10:45 candle completed at 10:46 New York.'
  };
  return {classificationCorrect:classification===e.classification,
    parts:PARTS.map(part=>({part,chosen:written[part],reference:facts[part]}))};
}
