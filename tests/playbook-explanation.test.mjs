import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingScenario} from '../playbook/scenario.mjs';
import {classifySession} from '../playbook/classifier.mjs';
import {prefix,createReplay,advance,snapshot} from '../playbook/replay.mjs';
import {buildEvidence,explanationChoices,supports,gradeExplanation,PARTS} from '../playbook/explanation.mjs';
import {syntheticSession,breakoutFixture,setClose} from './fixtures/playbook-synthetic.mjs';
for(let index=0;index<5;index++) {
 test('exercise '+(index+1)+' explanation claims match independently inspected candle evidence',()=>{
   const input=trainingScenario(index),before=structuredClone(input), e=buildEvidence(input);
   assert.equal(e.classification,['B','A','B','A','C'][index]);
   assert.equal(e.openingRange.high,Math.max(...input.candles.slice(0,15).map(c=>c.high)));
   assert.equal(e.openingRange.low,Math.min(...input.candles.slice(0,15).map(c=>c.low)));
   const search=input.candles.slice(15,76),h=e.openingRange.high,l=e.openingRange.low;
   const first=search.find(c=>c.close>h||c.close<l);
   assert.equal(e.firstBreakout?.timestamp,first?.timestamp);
   const following=first?input.candles.slice(input.candles.indexOf(first)+1,input.candles.indexOf(first)+16):[];
   const returned=following.find(c=>first.close>h?c.close<=h:c.close>=l);
   assert.equal(e.firstReturn?.timestamp,returned?.timestamp);
   assert.deepEqual(e.followingCloses.map(c=>c.close),following.map(c=>c.close));
   assert.equal(e.searchComplete,!first);assert.equal(e.search.checkedCloses.length,first?7:61);
   for(let variation=0;variation<12;variation++) {
     const answers={};
     for(const part of PARTS) {
       const choices=explanationChoices(e,part,variation),correct=choices.filter(c=>supports(e,part,c.id));
       assert.equal(choices.length,3);assert.equal(correct.length,1);
       const expected=part==='move'?(first?(first.close>h?'bullish':'bearish'):'none'):part==='response'?(first?(returned?'return':'hold'):'search'):['B','A','B','A','C'][index];
       assert.equal(correct[0].id,expected);
       choices.filter(c=>c.id!==expected).forEach(c=>assert.equal(supports(e,part,c.id),false));
       // Similar sentence length and neutral evidence vocabulary; plausibility also reviewed by a human.
       const lengths=choices.map(c=>c.text.split(/\s+/).length);
       assert.ok(Math.max(...lengths)/Math.min(...lengths)<=1.5,part+' length balance');
       choices.forEach(c=>assert.ok(!/trader|predict|will |reversal|retest/i.test(c.text)));
       answers[part]=expected;
     }
     assert.equal(gradeExplanation(e,e.classification,answers,variation).explanationCorrect,true);
     assert.equal(gradeExplanation(e,'wrong',answers,variation).classificationCorrect,false);
     for(const part of PARTS){
       const wrong=explanationChoices(e,part,variation).find(c=>!supports(e,part,c.id));
       const g=gradeExplanation(e,e.classification,{...answers,[part]:wrong.id},variation);
       assert.equal(g.classificationCorrect,true);assert.equal(g.explanationCorrect,false);assert.equal(g.parts.filter(p=>p.correct).length,2);
     }
   }
   assert.deepEqual(input,before);
 });
 test('exercise '+(index+1)+' positions and wording vary while ground truth stays fixed',()=>{
   const e=buildEvidence(trainingScenario(index));
   for(const part of PARTS){
     const positions=new Set(),wording=new Set();
     for(let n=0;n<12;n++){const c=explanationChoices(e,part,n);positions.add(c.findIndex(o=>supports(e,part,o.id)));wording.add(c.find(o=>supports(e,part,o.id)).text);}
     assert.equal(positions.size,3);assert.equal(wording.size,2);
   }
 });
}
test('the longest option does not identify the correct answer across the five exercises',()=>{
 for(const part of PARTS)for(let n=0;n<6;n++){
   let longestCorrect=0;
   for(let i=0;i<5;i++){const e=buildEvidence(trainingScenario(i)),c=explanationChoices(e,part,n),max=Math.max(...c.map(o=>o.text.length));if(c.find(o=>supports(e,part,o.id)).text.length===max)longestCorrect++;}
   assert.ok(longestCorrect>0 && longestCorrect<5,part+' length must not predict truth');
 }
});
test('evidence is unavailable until the complete A/B assessment or C search',()=>{
 for(let i=0;i<5;i++){const input=trainingScenario(i);let s=createReplay(input);while(s.playing){assert.throws(()=>buildEvidence(prefix(input,s.cursor)));s=advance(s);}assert.equal(buildEvidence(prefix(input,s.cursor)).classification,classifySession(input).classification);}
});
test('midpoint uses only completed range extremes and remains locked after 09:45',()=>{
 const input=trainingScenario();let s=createReplay(input);
 assert.equal(snapshot(input,s).range,null);
 for(let n=1;n<=37;n++){
   s=advance(s);const range=snapshot(input,s).range,observed=input.candles.slice(0,Math.min(n,15));
   assert.equal(range.midpoint,(Math.max(...observed.map(c=>c.high))+Math.min(...observed.map(c=>c.low)))/2);
   assert.equal(range.locked,n>=15);
   const changed=structuredClone(input);changed.candles.slice(n).forEach(c=>Object.assign(c,{high:999999,low:1,open:2,close:2}));
   assert.deepEqual(snapshot(changed,s),snapshot(input,s));
 }
});
test('C does not require wick probes; strict/equal and fifteen-close rules remain authoritative',()=>{
 const noProbe=syntheticSession(),c=buildEvidence(noProbe);assert.equal(c.classification,'C');assert.deepEqual(c.wickOnlyBreaches,[]);
 for(const direction of ['bullish','bearish']){
   const input=breakoutFixture(direction);setClose(input,30,direction==='bullish'?110:90);
   const e=buildEvidence(input);assert.equal(e.classification,'B');assert.equal(e.firstReturn.timestamp,input.candles[30].timestamp);assert.equal(e.followingCloses.length,15);
   assert.throws(()=>buildEvidence(prefix(input,30)));
   const late=breakoutFixture(direction,{breakoutIndex:75});assert.equal(buildEvidence(late).classification,'A');assert.throws(()=>buildEvidence(prefix(late,90)));
 }
 const e=buildEvidence(trainingScenario());assert.ok(e.wickOnlyBreaches.includes('2026-01-15T14:47:00.000Z'));assert.ok(e.boundaryEqualCloses.includes('2026-01-15T14:48:00.000Z'));
 assert.throws(()=>gradeExplanation(e,'B',{}));
});
