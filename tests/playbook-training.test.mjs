// UI integration with a DOM/timer double; does not claim browser layout coverage.
import test from 'node:test';
import assert from 'node:assert/strict';
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
const tick=()=>{assert.ok(pending,'Missing autoplay timer');const fn=pending;pending=null;fn();};
training.startTraining();
assert.equal(document.body.dataset.screen,'playbook');assert.equal(el('pbControls').hidden,true);assert.deepEqual(labels(),[]);
for(let i=1;i<=37;i++){
 tick();
 if(i<15){assert.ok(el('pbLevels').textContent.includes('Provisional'));assert.ok(!el('pbChart').innerHTML.includes('fill-opacity=".6"'));}
 if(i===15){assert.ok(el('pbLevels').textContent.includes('Locked'));assert.ok(el('pbChart').innerHTML.includes('fill-opacity=".6"'));assert.ok(el('pbClock').textContent.startsWith('09:45'));}
 if(i<37)assert.deepEqual(labels(),[]);
}
assert.equal(pending,null);assert.equal(el('pbControls').hidden,false);assert.ok(labels().includes('Answer now'));
click('Inspect replay first');assert.ok(el('pbClock').textContent.includes('0 completed'));el('pbPlay').onclick();assert.equal(pending,null);el('pbNext').onclick();assert.ok(el('pbClock').textContent.includes('1 completed'));el('pbPrev').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));
click('Answer now');assert.ok(!el('pbQuestions').children.some(c=>c.textContent.includes('correct result:')));click('B — Failed Initial Breakout');click('Continue to Move → Response → Result');
assert.equal(el('pbQuestions').children.find(c=>c.textContent==='Submit both answers').disabled,true);
const correct=labels().find(t=>t.startsWith('09:51 bullish'));assert.ok(correct);click(correct);click('Submit both answers');assert.ok(el('pbQuestions').children.some(c=>c.textContent.startsWith('✓ Both reads correct.')));assert.ok(el('pbChart').innerHTML.includes('#ffdf70'));
const evidence=el('pbQuestions').children.find(c=>c.className==='pb-evidence');evidence.children.find(c=>c.textContent.startsWith('First close')).onclick();assert.ok(el('pbOhlc').textContent.startsWith('09:51 candle'));
click('Replay revealed exercise');assert.ok(pending);el('pbExit').onclick();assert.equal(pending,null);assert.equal(document.body.dataset.screen,'home');
training.startTraining();for(let i=0;i<37;i++)tick();click('Answer now');click('A — Sustained Breakout');click('Continue to Move → Response → Result');click(labels().find(t=>t.startsWith('A wick')));click('Submit both answers');assert.ok(el('pbQuestions').children.some(c=>c.textContent.includes('correct result: B')));
click('Restart exercise');assert.equal(el('pbControls').hidden,true);assert.ok(el('pbClock').textContent.includes('0 completed'));document.body.dataset.screen='shop';observer();assert.equal(pending,null);

} finally {Object.assign(globalThis,saved);}
});
