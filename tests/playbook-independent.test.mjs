// DOM/timer doubles: interaction coverage only, not a rendered browser test.
import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingScenario} from '../playbook/scenario.mjs';
import {buildEvidence,independentReview,PARTS} from '../playbook/explanation.mjs';
import {nyTime} from '../playbook/replay.mjs';
for(let i=0;i<5;i++) test('independent reference facts and ungraded exact writing, fixture '+(i+1),()=>{
 const input=trainingScenario(i),e=buildEvidence(input),words={move:'  Unsure\n<price> & action  ',response:'My own response',result:'Category Z?'};
 const review=independentReview(e,e.classification,words);
 assert.equal(review.classificationCorrect,true);
 assert.equal(independentReview(e,e.classification==='A'?'B':'A',words).classificationCorrect,false);
 assert.ok(!('explanationCorrect' in review));
 for(const row of review.parts){assert.equal(row.chosen,words[row.part]);assert.ok(!('correct' in row));}
 if(i===4){
  assert.match(review.parts[0].reference,/No qualifying closing breakout.*09:45.*10:45/);
  assert.match(review.parts[1].reference,/All 61.*no first breakout or 15-close A.B assessment/);
  assert.match(review.parts[2].reference,/Category C.*10:46/);
 }else{
  const first=input.candles.find(c=>c.timestamp===e.firstBreakout.timestamp);
  assert.ok(review.parts[0].reference.includes(first.close+' strictly'));
  assert.ok(review.parts[0].reference.includes(nyTime(first.timestamp)));
  assert.ok(review.parts[0].reference.includes(String(e.firstBreakout.boundary)));
  if(e.firstReturn){assert.ok(review.parts[1].reference.includes(String(e.firstReturn.close)));assert.ok(review.parts[1].reference.includes(nyTime(e.firstReturn.timestamp)));}
  else assert.match(review.parts[1].reference,/All 15 following completed closes stayed strictly beyond/);
  assert.ok(review.parts[2].reference.includes(nyTime(e.followingCloses.at(-1).timestamp)));
 }
 assert.throws(()=>independentReview(e,'A',{...words,response:'  '}));
 assert.throws(()=>independentReview(e,'Z',words));
});
test('independent full five-fixture rotation, gates, draft retention, evidence and mode isolation',async()=>{
 class Element{
  constructor(){this.children=[];this.attrs={};this.textContent='';this.innerHTML='';this.clientWidth=320;this.disabled=false;this.value='';}
  append(...items){this.children.push(...items);} replaceChildren(...items){this.children=items;}
  setAttribute(k,v){this.attrs[k]=v;} focus(){}
 }
 const ids=new Map(),el=id=>{if(!ids.has(id))ids.set(id,new Element());return ids.get(id);};
 let pending,observer;
 const document={getElementById:el,createElement:tag=>Object.assign(new Element(),{tag}),body:{dataset:{screen:'home'}}};
 const keys=['document','window','MutationObserver','setTimeout','clearTimeout','localStorage'];
 const saved=Object.fromEntries(keys.map(k=>[k,globalThis[k]]));
 Object.assign(globalThis,{document,window:{openScreen:id=>document.body.dataset.screen=id,scrollTo(){},addEventListener(){}},MutationObserver:class{constructor(fn){observer=fn;}observe(){}},setTimeout:fn=>{pending=fn;return 1;},clearTimeout:()=>{pending=null;},localStorage:{getItem(){throw Error('Unexpected storage read');},setItem(){throw Error('Unexpected storage write');}}});
 try{
  const training=await import('../playbook/training.mjs?independent-test');
  const walk=node=>[node,...node.children.flatMap(walk)];
  const content=()=>walk(el('pbQuestions')).map(n=>n.textContent).join('\n');
  const click=text=>{const b=walk(el('pbQuestions')).find(n=>n.onclick&&n.textContent===text);assert.ok(b,'Missing '+text);assert.equal(b.disabled,false);b.onclick();};
  const tick=()=>{assert.ok(pending);const fn=pending;pending=null;fn();};
  const noLeak=()=>{
   assert.equal(el('pbLegend').hidden,true);assert.ok(!el('pbChart').innerHTML.includes('#ffdf70'));
   assert.ok(!/Reference:|Verified classification:|correct.|Sustained Breakout|Failed Initial Breakout|No Qualifying Breakout/.test(content()));
   assert.ok(!/First qualifying|following closes|First return/.test(el('pbPhase').textContent));
  };
  training.startTraining();assert.equal(el('pbGuided').attrs['aria-pressed'],'true');
  tick();el('pbIndependent').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));assert.equal(el('pbIndependent').attrs['aria-pressed'],'true');
  for(let index=0;index<5;index++){
   assert.ok(el('pbScenario').textContent.startsWith('Synthetic exercise '+(index+1)));
   assert.equal(el('pbControls').hidden,true);
   for(let n=0;n<(index===4?76:37);n++){noLeak();assert.equal(walk(el('pbQuestions')).filter(n=>n.tag==='textarea').length,0);tick();}
   noLeak();click('Inspect replay first');el('pbPlay').onclick();el('pbNext').onclick();assert.ok(el('pbClock').textContent.includes('1 completed'));el('pbPrev').onclick();assert.ok(el('pbClock').textContent.includes('0 completed'));
   click('Answer now');noLeak();
   const fields=()=>el('pbQuestions').children.filter(n=>n.tag==='textarea');
   assert.equal(fields().length,3);assert.deepEqual(fields().map(f=>f.id),PARTS.map(p=>'pbWritten-'+p));
   const submit=()=>el('pbQuestions').children.find(n=>n.textContent==='Submit independent read');
   assert.equal(submit().disabled,true);
   const words=['  My move\n<script>alert(1)</script>  ','Unsure','My result: '+index];
   fields().forEach((field,i)=>{field.value=words[i];field.oninput();});assert.equal(submit().disabled,true);
   const expected=['B','A','B','A','C'][index],picked=index===0?'A':expected;
   click('Category '+picked);assert.deepEqual(fields().map(f=>f.value),words);assert.equal(submit().disabled,false);
   fields()[1].value='  ';fields()[1].oninput();assert.equal(submit().disabled,true);
   fields()[1].value=words[1];fields()[1].oninput();noLeak();click('Submit independent read');
   assert.match(content(),new RegExp('Verified classification: '+expected));
   assert.ok(content().includes('Your classification: '+picked+' · '+(index===0?'incorrect.':'correct.')));
   assert.ok(content().includes('not automatically graded'));assert.ok(!/Explanation:.*correct/.test(content()));
   const originals=walk(el('pbQuestions')).filter(n=>n.className==='pb-original');assert.deepEqual(originals.map(n=>n.textContent),words);assert.ok(originals.every(n=>!n.innerHTML));
   assert.equal(el('pbLegend').hidden,false);
   if(index===4) assert.ok(!el('pbChart').innerHTML.includes('#ffdf70')); // A's first close may be outside the final viewport.
   const links=el('pbQuestions').children.find(n=>n.className==='pb-evidence');
   if(index===4){assert.ok(!links.children.some(n=>/First close|First return/.test(n.textContent)));assert.match(content(),/All 61 search closes/);}
   else {links.children.find(n=>n.textContent.startsWith('First close')).onclick();assert.ok(el('pbOhlc').textContent.startsWith('09:51'));assert.ok(el('pbChart').innerHTML.includes('#ffdf70'));}
   assert.deepEqual(walk(el('pbQuestions')).filter(n=>n.className==='pb-original').map(n=>n.textContent),words);
   click('Replay revealed exercise');tick();assert.deepEqual(walk(el('pbQuestions')).filter(n=>n.className==='pb-original').map(n=>n.textContent),words);
   click('Next synthetic exercise →');noLeak();
  }
  assert.ok(el('pbScenario').textContent.startsWith('Synthetic exercise 1'));
  el('pbGuided').onclick();assert.equal(el('pbGuided').attrs['aria-pressed'],'true');
  for(let n=0;n<37;n++)tick();click('Answer now');assert.ok(content().includes('B — Failed Initial Breakout'));assert.equal(walk(el('pbQuestions')).filter(n=>n.tag==='textarea').length,0);
  el('pbExit').onclick();assert.equal(document.body.dataset.screen,'home');assert.equal(pending,null);
  training.startTraining();document.body.dataset.screen='shop';observer();assert.equal(pending,null);
 }finally{Object.assign(globalThis,saved);}
});
