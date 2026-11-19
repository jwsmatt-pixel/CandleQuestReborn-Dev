// UI integration with a DOM/timer double; does not claim browser layout coverage.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {buildEvidence,explanationChoices,supports,PARTS} from '../playbook/explanation.mjs';
import {trainingScenario} from '../playbook/scenario.mjs';
test('complete isolated training flow, answer gates, replay and cleanup',async()=>{
class Element {
 constructor(){this.children=[];this.attrs={};this.dataset={};this.textContent='';this.innerHTML='';this.clientWidth=320;this.disabled=false;}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 setAttribute(k,v){this.attrs[k]=v;}
 querySelectorAll(tag){return this.children.filter(c=>c.tag===tag);}
 focus(options){this.focusOptions=options;} scrollIntoView(options){this.scrollOptions=options;}
}
const ids=new Map(), el=id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id);};
let pending, observer, frame, reduced=true;
const flushFrame=()=>{if(frame){const fn=frame;frame=null;fn();}};
const document={getElementById:el,createElement:tag=>Object.assign(new Element(),{tag}),body:{dataset:{screen:'home'}}};
const saved={document:globalThis.document,window:globalThis.window,MutationObserver:globalThis.MutationObserver,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout,localStorage:globalThis.localStorage};
Object.assign(globalThis,{document,
 window:{openScreen:id=>{document.body.dataset.screen=id;},scrollTo(){},addEventListener(){},requestAnimationFrame(fn){frame=fn;return 1;},cancelAnimationFrame(){frame=null;},matchMedia(){return {matches:reduced};}},
 MutationObserver:class{constructor(fn){observer=fn;}observe(){}},
 setTimeout:fn=>{pending=fn;return 1;},clearTimeout:()=>{pending=null;},
 localStorage:{setItem(){throw Error('Unexpected storage write');},getItem(){throw Error('Unexpected storage read');}}
});
try {
const training=await import('../playbook/training.mjs');
const answer=el('pbQuestions'),review=el('pbReviewContent'),actions=el('pbReviewActions');
const labels=()=>answer.children.filter(c=>c.onclick).map(c=>c.textContent);
const click=text=>{const b=[...answer.children,...actions.children,...review.children].find(c=>c.onclick&&c.textContent===text);assert.ok(b,'Missing '+text);assert.equal(b.disabled,false);b.onclick();flushFrame();};
const view=expected=>{
 for(const [name,id] of [['Observe','pbChartView'],['Answer','pbAnswerView'],['Review','pbReview']]){
   assert.equal(el(id).hidden,name!==expected);
   assert.equal(el('pb'+name+'Tab').attrs['aria-pressed'],String(name===expected));
 }
};
const locked=()=>{
 assert.equal(el('pbReviewTab').disabled,true);el('pbReviewTab').onclick();flushFrame();
 assert.equal(el('pbReview').hidden,true);
 assert.deepEqual(review.children,[]);assert.deepEqual(actions.children,[]);
 assert.equal(el('pbLegend').hidden,true);assert.doesNotMatch(el('pbChart').innerHTML,/#ffdf70|fill-opacity="\.07"/);
};
let variation=0;
const build=(index,wrong=false)=>{
 const e=buildEvidence(trainingScenario(index));
 for(const [i,part] of PARTS.entries()){
   assert.ok(el('pbQuestions').children.some(c=>c.textContent.startsWith((i+1)+' / 3 · '+part.toUpperCase())));
   const opts=explanationChoices(e,part,variation);
   const selected=opts.find(c=>supports(e,part,c.id)!==wrong).text;
   click(selected);
   if(index===0 && !wrong){
     el('pbViewChart').onclick();flushFrame();view('Observe');locked();
     el('pbReturnAnswer').onclick();flushFrame();view('Answer');
     assert.equal(answer.children.find(c=>c.textContent===selected).attrs['aria-pressed'],'true');
   }
   locked();
   click(i<2?'Continue to '+PARTS[i+1].toUpperCase():'Submit explanation');
 }
};
const tick=()=>{assert.ok(pending,'Missing autoplay timer');const fn=pending;pending=null;fn();};
training.startTraining();
assert.equal(document.body.dataset.screen,'playbook');assert.equal(el('pbControls').hidden,true);assert.deepEqual(labels(),[]);
view('Observe');locked();
assert.equal(el('pbAnswerTab').disabled,true);el('pbAnswerTab').onclick();view('Observe');
for(let i=1;i<=37;i++){
 tick();
 assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
 assert.equal(el('pbLegend').hidden,true);
 assert.ok(el('pbChart').innerHTML.includes('data-level="midpoint"'));
 assert.ok(el('pbChart').innerHTML.includes('stroke="#cbd0d8"'));
 if(i<15){assert.ok(el('pbLevels').textContent.includes('Provisional'));assert.ok(!el('pbChart').innerHTML.includes('fill-opacity=".6"'));}
 if(i===15){assert.ok(el('pbLevels').textContent.includes('Locked'));assert.ok(el('pbChart').innerHTML.includes('fill-opacity=".6"'));assert.ok(el('pbClock').textContent.startsWith('09:45'));}
 if(i<37){assert.deepEqual(labels(),[]);assert.equal(el('pbAnswerTab').disabled,true);}
}
assert.equal(pending,null);assert.equal(el('pbControls').hidden,false);assert.equal(el('pbAnswerNow').hidden,false);
assert.equal(el('pbAnswerTab').disabled,false);locked();
el('pbInspect').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));el('pbPlay').onclick();assert.equal(pending,null);
el('pbNext').onclick();assert.ok(el('pbClock').textContent.includes('1 completed'));el('pbPrev').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));
el('pbAnswerNow').onclick();
assert.equal(el('pbScenario').scrollOptions,undefined);assert.ok(frame,'navigation waits until animation frame');
flushFrame();assert.deepEqual(el('pbAnswerView').focusOptions,{preventScroll:true});
view('Answer');locked();
assert.match(el('pbChartSummary').textContent,/09:30 New York · 0 completed/);
assert.doesNotMatch(el('pbChartSummary').textContent,/ORH [0-9]|ORL [0-9]|qualifying|assessment/);
assert.ok(!el('pbQuestions').children.some(c=>c.textContent.includes('correct result:')));click('B — Failed Initial Breakout');click('Continue to Move → Response → Result');
assert.equal(el('pbQuestions').children.find(c=>c.textContent==='Continue to RESPONSE').disabled,true);
const move=explanationChoices(buildEvidence(trainingScenario(0)),'move',variation).find(c=>c.id==='bullish');
click(move.text);
reduced=false;el('pbViewChart').onclick();flushFrame();
assert.deepEqual(el('pbScenario').scrollOptions,{block:'start',behavior:'smooth'});reduced=true;
view('Observe');locked();assert.equal(el('pbControls').hidden,false);
assert.equal(el('pbReturnAnswer').hidden,false);assert.deepEqual(el('pbReturnAnswer').focusOptions,{preventScroll:true});
el('pbNext').onclick();el('pbReturnAnswer').onclick();flushFrame();
assert.equal(el('pbControls').hidden,true);view('Answer');
assert.equal(el('pbQuestions').children.find(c=>c.textContent===move.text).attrs['aria-pressed'],'true');
assert.deepEqual(el('pbScenario').scrollOptions,{block:'start',behavior:'instant'});
assert.match(el('pbChartSummary').textContent,/09:31 New York · 1 completed .* Provisional/);
el('pbObserveTab').onclick();flushFrame();view('Observe');
el('pbAnswerTab').onclick();flushFrame();view('Answer');
assert.equal(el('pbQuestions').children.find(c=>c.textContent===move.text).attrs['aria-pressed'],'true');
click('Continue to RESPONSE');
assert.equal(el('pbQuestions').children.find(c=>c.textContent==='Continue to RESULT').disabled,true);
click('← Previous part');assert.equal(el('pbQuestions').children.find(c=>c.textContent===move.text).attrs['aria-pressed'],'true');
click('Back to classification');assert.equal(el('pbQuestions').children.find(c=>c.textContent==='B — Failed Initial Breakout').attrs['aria-pressed'],'true');
click('Continue to Move → Response → Result');
build(0);view('Review');assert.equal(el('pbReviewTab').disabled,false);assert.equal(el('pbAnswerTab').disabled,true);
el('pbAnswerTab').onclick();view('Review');
assert.ok(review.children.some(c=>c.textContent==='Explanation: 3 / 3 correct.'));
assert.equal(actions.children[0].textContent,'Next synthetic exercise →');
const evidence=actions.children.find(c=>c.className==='pb-evidence');
evidence.children.find(c=>c.textContent.startsWith('First close')).onclick();flushFrame();view('Observe');
assert.ok(el('pbOhlc').textContent.startsWith('09:51 candle'));assert.ok(el('pbChart').innerHTML.includes('#ffdf70'));
el('pbReturnReview').onclick();flushFrame();view('Review');
click('Replay revealed exercise');assert.ok(pending);el('pbExit').onclick();assert.equal(pending,null);assert.equal(document.body.dataset.screen,'home');
training.startTraining();variation++;for(let i=0;i<37;i++)tick();el('pbAnswerTab').onclick();flushFrame();click('A — Sustained Breakout');click('Continue to Move → Response → Result');build(0,true);
assert.ok(review.children.some(c=>c.textContent.includes('incorrect; reference: B')));
assert.ok(review.children.some(c=>c.textContent==='Explanation: 0 / 3 correct.'));
const comparison=review.children.find(c=>c.children?.some(p=>p.textContent==='Compare your explanation'));
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
 assert.equal(el('pbAnswerTab').disabled,false);locked();
 el('pbAnswerTab').onclick();flushFrame();click(classification+' — '+({A:'Sustained Breakout',B:'Failed Initial Breakout',C:'No Qualifying Breakout'})[classification]);click('Continue to Move → Response → Result');
 build(index%5);
 assert.ok(review.children.some(c=>c.textContent==='Explanation: 3 / 3 correct.'));
 assert.ok(review.children.some(c=>c.textContent.includes('Classification: '+classification+' · correct.')));
 assert.equal(el('pbLegend').hidden,false);view('Review');
 if(classification==='C'){
   actions.children.find(c=>c.className==='pb-evidence').children.find(c=>c.textContent.startsWith('Search end')).onclick();flushFrame();
   view('Observe');assert.match(el('pbClock').textContent,/10:46 New York · 76 completed/);
   assert.equal(el('pbNext').disabled,true);
   assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
   assert.ok(el('pbChart').innerHTML.includes('fill-opacity=".07"'));
   assert.ok(review.children.some(c=>c.textContent.startsWith('All 61 search closes')));
   el('pbReviewTab').onclick();flushFrame();view('Review');
 }
 click('Next synthetic exercise →');variation++;
}
document.body.dataset.screen='shop';observer();assert.equal(pending,null);

} finally {Object.assign(globalThis,saved);}
});

test('Observe uses the requested row-major replay order and puts Return to answer above the chart',async()=>{
 const [html,css]=await Promise.all([
   readFile(new URL('../index.html',import.meta.url),'utf8'),
   readFile(new URL('../style.css',import.meta.url),'utf8')
 ]);
 const observe=html.match(/<section id="pbChartView"[^>]*>([\s\S]*?)<\/section>/)[1];
 const controls=observe.match(/<div id="pbControls"[^>]*>([\s\S]*?)<\/div>/)[1];
 const ids=[...controls.matchAll(/<button id="([^"]+)"/g)].map(match=>match[1]);
 assert.deepEqual(ids,['pbPrev','pbNext','pbPlay','pbRestart']);
 assert.match(css,/#playbook \.pb-controls\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
 assert.match(observe,/id="pbReturnAnswer"[\s\S]*id="pbChart"/);
});
