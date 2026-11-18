// UI integration with a DOM/timer double; does not claim browser layout coverage.
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEvidence,explanationChoices,supports,PARTS} from '../playbook/explanation.mjs';
import {trainingScenario} from '../playbook/scenario.mjs';
test('complete isolated training flow, answer gates, replay and cleanup',async()=>{
class Element {
 constructor(){this.children=[];this.attrs={};this.textContent='';this.innerHTML='';this.clientWidth=320;this.disabled=false;}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 setAttribute(k,v){this.attrs[k]=v;}
 focus(){}
}
const ids=new Map(), el=id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id);};
let pending, observer;
const document={getElementById:el,createElement:()=>new Element(),body:{dataset:{screen:'home'}}};
const saved={document:globalThis.document,window:globalThis.window,MutationObserver:globalThis.MutationObserver,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout,localStorage:globalThis.localStorage};
Object.assign(globalThis,{document,
 window:{openScreen:id=>{document.body.dataset.screen=id;},scrollTo(){},addEventListener(){}},
 MutationObserver:class{constructor(fn){observer=fn;}observe(){}},
 setTimeout:fn=>{pending=fn;return 1;},clearTimeout:()=>{pending=null;},
 localStorage:{setItem(){throw Error('Unexpected storage write');},getItem(){throw Error('Unexpected storage read');}}
});
try {
const training=await import('../playbook/training.mjs');
const labels=()=>el('pbQuestions').children.filter(c=>c.onclick).map(c=>c.textContent);
const click=text=>{const b=el('pbQuestions').children.find(c=>c.onclick&&c.textContent===text);assert.ok(b,'Missing '+text);assert.equal(b.disabled,false);b.onclick();};
let variation=0;
const build=(index,wrong=false)=>{
 const e=buildEvidence(trainingScenario(index));
 for(const [i,part] of PARTS.entries()){
   assert.ok(el('pbQuestions').children.some(c=>c.textContent.startsWith((i+1)+' / 3 · '+part.toUpperCase())));
   const opts=explanationChoices(e,part,variation);
   click(opts.find(c=>supports(e,part,c.id)!==wrong).text);
   assert.equal(el('pbLegend').hidden,true);
   assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
   assert.ok(!el('pbQuestions').children.some(c=>c.textContent.startsWith('Reference ·')));
   click(i<2?'Continue to '+PARTS[i+1].toUpperCase():'Submit explanation');
 }
};
const tick=()=>{assert.ok(pending,'Missing autoplay timer');const fn=pending;pending=null;fn();};
training.startTraining();
assert.equal(document.body.dataset.screen,'playbook');assert.equal(el('pbControls').hidden,true);assert.deepEqual(labels(),[]);
for(let i=1;i<=37;i++){
 tick();
 assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
 assert.equal(el('pbLegend').hidden,true);
 assert.ok(el('pbChart').innerHTML.includes('data-level="midpoint"'));
 assert.ok(el('pbChart').innerHTML.includes('stroke="#cbd0d8"'));
 if(i<15){assert.ok(el('pbLevels').textContent.includes('Provisional'));assert.ok(!el('pbChart').innerHTML.includes('fill-opacity=".6"'));}
 if(i===15){assert.ok(el('pbLevels').textContent.includes('Locked'));assert.ok(el('pbChart').innerHTML.includes('fill-opacity=".6"'));assert.ok(el('pbClock').textContent.startsWith('09:45'));}
 if(i<37)assert.deepEqual(labels(),[]);
}
assert.equal(pending,null);assert.equal(el('pbControls').hidden,false);assert.ok(labels().includes('Answer now'));
click('Inspect replay first');assert.ok(el('pbClock').textContent.includes('0 completed'));el('pbPlay').onclick();assert.equal(pending,null);el('pbNext').onclick();assert.ok(el('pbClock').textContent.includes('1 completed'));el('pbPrev').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));
click('Answer now');assert.ok(!el('pbQuestions').children.some(c=>c.textContent.includes('correct result:')));click('B — Failed Initial Breakout');click('Continue to Move → Response → Result');
assert.equal(el('pbQuestions').children.find(c=>c.textContent==='Continue to RESPONSE').disabled,true);
const move=explanationChoices(buildEvidence(trainingScenario(0)),'move',variation).find(c=>c.id==='bullish');
click(move.text);click('Continue to RESPONSE');
assert.equal(el('pbQuestions').children.find(c=>c.textContent==='Continue to RESULT').disabled,true);
click('← Previous part');assert.equal(el('pbQuestions').children.find(c=>c.textContent===move.text).attrs['aria-pressed'],'true');
click('Back to classification');assert.equal(el('pbQuestions').children.find(c=>c.textContent==='B — Failed Initial Breakout').attrs['aria-pressed'],'true');
click('Continue to Move → Response → Result');
build(0);assert.ok(el('pbQuestions').children.some(c=>c.textContent==='Explanation: 3 / 3 correct.'));assert.ok(el('pbChart').innerHTML.includes('#ffdf70'));
const evidence=el('pbQuestions').children.find(c=>c.className==='pb-evidence');evidence.children.find(c=>c.textContent.startsWith('First close')).onclick();assert.ok(el('pbOhlc').textContent.startsWith('09:51 candle'));
click('Replay revealed exercise');assert.ok(pending);el('pbExit').onclick();assert.equal(pending,null);assert.equal(document.body.dataset.screen,'home');
training.startTraining();variation++;for(let i=0;i<37;i++)tick();click('Answer now');click('A — Sustained Breakout');click('Continue to Move → Response → Result');build(0,true);
assert.ok(el('pbQuestions').children.some(c=>c.textContent.includes('incorrect; reference: B')));
assert.ok(el('pbQuestions').children.some(c=>c.textContent==='Explanation: 0 / 3 correct.'));
const comparison=el('pbQuestions').children.find(c=>c.children?.some(p=>p.textContent==='Compare your explanation'));
assert.ok(comparison);assert.equal(comparison.children.filter(c=>c.textContent.includes('Incorrect · You:')).length,3);
click('Restart exercise');variation++;assert.equal(el('pbControls').hidden,true);assert.ok(el('pbClock').textContent.includes('0 completed'));
// Complete a whole rotation and wrap; Next must clear answers, highlights and
// inspection privileges and never reveal outcome names before submission.
for(const [index,classification] of ['B','A','B','A','C','B'].entries()){
 assert.ok(el('pbScenario').textContent.startsWith('Synthetic exercise '+(index%5+1)+' / 5'));
 assert.equal(el('pbControls').hidden,true);assert.equal(el('pbLegend').hidden,true);
 assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
 assert.deepEqual(labels(),[]);
 for(let n=0;n<(classification==='C'?76:37);n++)tick();
 assert.equal(el('pbStage').textContent,'2 · Choose your next step');
 click('Answer now');click(classification+' — '+({A:'Sustained Breakout',B:'Failed Initial Breakout',C:'No Qualifying Breakout'})[classification]);click('Continue to Move → Response → Result');
 build(index%5);
 assert.ok(el('pbQuestions').children.some(c=>c.textContent==='Explanation: 3 / 3 correct.'));
 assert.ok(el('pbQuestions').children.some(c=>c.textContent.includes('Classification: '+classification+' · correct.')));
 assert.equal(el('pbLegend').hidden,false);
 if(classification==='C'){
   assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
   assert.ok(el('pbChart').innerHTML.includes('fill-opacity=".07"'));
   assert.ok(el('pbQuestions').children.some(c=>c.textContent.startsWith('All 61 search closes')));
 }
 click('Next synthetic exercise →');variation++;
}
document.body.dataset.screen='shop';observer();assert.equal(pending,null);

} finally {Object.assign(globalThis,saved);}
});
