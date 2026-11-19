import {trainingScenario,SCENARIO_COUNT} from './scenario.mjs';
import {createReplay,advance,inspect,replayFromStart,snapshot,prefix,scenarioTitle,LABELS,nyTime,DEFAULT_AUTOPLAY_MS} from './replay.mjs';
import {buildEvidence,explanationChoices,gradeExplanation,independentReview,PARTS} from './explanation.mjs';
// Set to false to restore mandatory first-view autoplay.
export const SKIP_INITIAL_REPLAY_FOR_TESTING = true;

const el=id=>document.getElementById(id);
const panes={observe:['pbObserveTab','pbChartView'],answer:['pbAnswerTab','pbAnswerView'],review:['pbReviewTab','pbReview']};
let input, state, timer, pane, answerStarted, chosenClass, answers, partIndex, evidence, feedback, written;
let navigationFrame=0, scenarioIndex=0, variation=-1, mode='guided';

// Focus after layout without summoning the software keyboard.
function moveTo(id){
  window.cancelAnimationFrame(navigationFrame);
  navigationFrame=window.requestAnimationFrame(()=>{
    if(document.body.dataset.screen!=='playbook') return;
    el(id).focus({preventScroll:true});
    el('pbScenario').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
}

function showPane(target){
  if(!state || pane===target) return;
  if(target==='answer' && (!state.completed || feedback)) return;
  if(target==='review' && !feedback) return;
  state.playing=false;
  stop();
  pane=target;
  if(pane==='answer' && !answerStarted){
    answerStarted=true;
    renderAnswer();
  }
  render();
  const returnButton=feedback?'pbReturnReview':answerStarted?'pbReturnAnswer':'pbChartView';
  moveTo(pane==='observe'?returnButton:panes[pane][1]);
}

function button(text,fn){
  const b=document.createElement('button');
  b.type='button';b.textContent=text;b.className='pb-card';b.onclick=fn;
  return b;
}

function choice(panel,text,select,selected){
  const b=button(text,()=>{
    select();
    renderAnswer();
    // The answer panel has been rebuilt; move focus to the new selection.
    Array.from(el('pbQuestions').querySelectorAll('button')).find(c=>c.textContent===text)?.focus({preventScroll:true});
  });
  b.setAttribute('aria-pressed',String(selected));
  panel.append(b);
}

function paragraph(panel,text){
  const p=document.createElement('p');
  p.textContent=text;
  panel.append(p);
}

function stop(){clearTimeout(timer);}
function schedule(){
  stop();
  if(!state.playing || document.body.dataset.screen!=='playbook') return;
  timer=setTimeout(()=>{
    const wasComplete=state.completed;
    state=advance(state);
    render();schedule();
    if(!wasComplete && state.completed) el('pbAnswerNow').focus({preventScroll:true});
  },state.stepMs);
}

export function startTraining(){
  stop();
  window.cancelAnimationFrame(navigationFrame);
  input=trainingScenario(scenarioIndex);
  state=createReplay(input);
  if(SKIP_INITIAL_REPLAY_FOR_TESTING){
    Object.assign(state,{cursor:state.limit,revealed:state.limit,completed:true,playing:false});
  }
  pane='observe';answerStarted=false;partIndex=-1;chosenClass=null;answers={};evidence=null;feedback=null;variation++;
  written={move:'',response:'',result:''};
  el('pbQuestions').replaceChildren();
  el('pbReviewActions').replaceChildren();
  el('pbReviewContent').replaceChildren();
  el('pbGuided').setAttribute('aria-pressed',String(mode==='guided'));
  el('pbIndependent').setAttribute('aria-pressed',String(mode==='independent'));
  el('pbScenario').textContent='Synthetic exercise '+(scenarioIndex+1)+' / '+SCENARIO_COUNT+' · BTCUSD · 1m · 15 Jan 2026';
  window.openScreen('playbook');render();schedule();
  el('pbTitle').focus();window.scrollTo(0,0);
}

function render(){
  const observing=pane==='observe';
  for(const [name,[nav,view]] of Object.entries(panes)){
    el(nav).setAttribute('aria-pressed',String(pane===name));
    el(view).hidden=pane!==name;
  }
  el('pbAnswerTab').disabled=!state.completed || !!feedback;
  el('pbReviewTab').disabled=!feedback;
  el('pbAnswerNow').hidden=!observing || !state.completed || answerStarted;
  el('pbReturnAnswer').hidden=!observing || !answerStarted || !!feedback;
  el('pbReturnReview').hidden=!observing || !feedback;
  el('pbControls').hidden=!observing || !state.completed;
  el('pbInspect').hidden=!observing || !state.completed || answerStarted || state.cursor!==state.limit;
  el('pbLegend').hidden=!feedback;
  if(pane==='review') return;

  const s=snapshot(input,state),r=s.result;
  const clock=nyTime(s.asOf)+' New York · '+s.candles.length+' completed 1m candles';
  const levels=s.range ? 'ORH '+s.range.high+' · ORL '+s.range.low+' · '+(s.range.locked?'Locked':'Provisional') : 'ORH / ORL develop from observed candles only';
  if(pane==='answer'){
    el('pbChartSummary').textContent=clock+' · '+levels;
    return;
  }

  el('pbStage').hidden=state.completed;
  el('pbStage').textContent='Watch first · about '+Math.round(DEFAULT_AUTOPLAY_MS/1000)+' seconds. Answers unlock after observation.';
  el('pbProgress').value=state.cursor/state.limit;
  el('pbClock').textContent=clock;
  const phase=!s.range ? 'Session opens at 09:30.' : !s.range.locked
    ? 'Opening range developing · '+state.cursor+'/15 candles · levels provisional'
    : 'Opening range locked at 09:45 · '+(r.firstBreakout ? 'First qualifying '+r.firstBreakout.direction+' candle: '+nyTime(r.firstBreakout.timestamp)+' · following closes '+r.assessment.observedCount+'/15' : 'Searching strict closing breakouts · 09:45–10:45 inclusive');
  el('pbPhase').textContent=mode==='independent' && !feedback && s.range?.locked
    ? 'Opening range locked at 09:45 · Observe the completed candles against ORH, ORL and midpoint.' : phase;
  el('pbLevels').textContent=levels;
  const last=s.candles.at(-1);
  el('pbOhlc').textContent=last ? nyTime(last.timestamp)+' candle · O '+last.open+' · H '+last.high+' · L '+last.low+' · C '+last.close : 'No completed candle yet.';
  draw(s);
  el('pbPlay').textContent=state.playing?'Pause':'Play';
  el('pbPrev').disabled=state.cursor===0;
  el('pbNext').disabled=state.cursor===state.revealed;
  el('pbPlay').disabled=state.cursor===state.limit;
}

function moveToAnswerPart(){
  renderAnswer();
  moveTo('pbAnswerView');
}

function submitReview(){
  if(pane!=='answer' || !state.completed || feedback || !chosenClass) return;
  if(mode==='independent'){
    if(!PARTS.every(p=>written[p].trim())) return;
    evidence=buildEvidence(prefix(input,state.limit));
    feedback=independentReview(evidence,chosenClass,Object.freeze({...written}),variation);
  }else{
    if(!PARTS.every(p=>answers[p])) return;
    feedback=gradeExplanation(evidence,chosenClass,answers,variation);
  }
  state={...state,cursor:state.limit,playing:false};
  el('pbQuestions').replaceChildren();
  renderReview();
  showPane('review');
}

function renderAnswer(){
  const panel=el('pbQuestions');panel.replaceChildren();
  if(mode==='independent'){
    paragraph(panel,'Write all three parts, then choose a category. “Unsure” is welcome.');
    const prompts={move:'What did price do?',response:'What happened afterwards?',result:'What does the completed evidence establish?'};
    const submit=button('Submit independent read',submitReview);
    const update=()=>{submit.disabled=!chosenClass || !PARTS.every(p=>written[p].trim());};
    PARTS.forEach(part=>{
      const label=document.createElement('label');label.htmlFor='pbWritten-'+part;
      label.textContent=part.toUpperCase()+' — '+prompts[part];
      const field=document.createElement('textarea');field.id=label.htmlFor;field.rows=2;field.required=true;
      field.value=written[part];field.placeholder='A short response, or Unsure';
      field.oninput=()=>{written[part]=field.value;update();};panel.append(label,field);
    });
    paragraph(panel,'Choose your classification independently.');
    const categories=document.createElement('div');categories.className='pb-categories';
    ['A','B','C'].forEach(id=>choice(categories,'Category '+id,()=>{chosenClass=id;},chosenClass===id));
    panel.append(categories);
    submit.className+=' pb-primary';update();panel.append(submit);return;
  }
  if(partIndex<0){
    paragraph(panel,'Classify the completed outcome. Feedback follows your full explanation.');
    Object.entries(LABELS).forEach(([id,label])=>choice(panel,id+' — '+label,()=>{chosenClass=id;},chosenClass===id));
    const next=button('Continue to Move → Response → Result',()=>{
      if(!chosenClass) return;
      evidence=buildEvidence(prefix(input,state.limit));partIndex=0;moveToAnswerPart();
    });
    next.className+=' pb-primary';next.disabled=!chosenClass;panel.append(next);return;
  }
  const part=PARTS[partIndex];
  const prompts={move:'What did price do?',response:'What did subsequent price action do?',result:'What does the completed evidence establish?'};
  paragraph(panel,(partIndex+1)+' / 3 · '+part.toUpperCase()+' — '+prompts[part]);
  explanationChoices(evidence,part,variation).forEach(c=>choice(panel,c.text,()=>{answers[part]=c.id;},answers[part]===c.id));
  panel.append(button(partIndex?'← Previous part':'Back to classification',()=>{
    partIndex--;moveToAnswerPart();
  }));
  const lastPart=partIndex===PARTS.length-1;
  const next=button(lastPart?'Submit explanation':'Continue to '+PARTS[partIndex+1].toUpperCase(),lastPart?submitReview:()=>{
    partIndex++;moveToAnswerPart();
  });
  next.className+=' pb-primary';
  next.disabled=lastPart?!PARTS.every(p=>answers[p]):!answers[part];
  panel.append(next);
}

function renderReview(){
  const final=snapshot(input,state).result;
  const actions=el('pbReviewActions'),panel=el('pbReviewContent');
  const next=button('Next synthetic exercise →',()=>{scenarioIndex=(scenarioIndex+1)%SCENARIO_COUNT;startTraining();});
  next.className+=' pb-primary';
  const evidenceLinks=document.createElement('div');evidenceLinks.className='pb-evidence';
  const points=[['Range lock',final.openingRange.completesAt],['First close',final.firstBreakout?.timestamp],['First return',final.assessment?.firstReturn?.timestamp],[final.assessment?'Assessment end':'Search end',final.assessment?.end ?? final.search.end]];
  points.filter(p=>p[1]).forEach(([label,stamp])=>evidenceLinks.append(button(label+' · '+nyTime(stamp),()=>{
    state={...state,cursor:Math.min(state.limit,Math.max(0,input.candles.findIndex(c=>c.timestamp===stamp)+(label==='Range lock'?0:1))),playing:false};
    showPane('observe');
  })));
  actions.append(next,evidenceLinks,button('Replay revealed exercise',()=>{
    showPane('observe');state=replayFromStart(state);render();schedule();
  }));
  const text=t=>paragraph(panel,t);
  text('Synthetic · '+scenarioTitle(final));
  if(mode==='independent'){
    text('Verified classification: '+final.classification+' — '+LABELS[final.classification]+'.');
    text('Your classification: '+chosenClass+' · '+(feedback.classificationCorrect?'correct.':'incorrect.'));
    text('Self-review · Your writing is not automatically graded. Compare each original response with the factual reference. No writing score or XP is awarded.');
    feedback.parts.forEach(p=>{
      const row=document.createElement('section');row.className='pb-comparison';
      const title=document.createElement('h3');title.textContent=p.part.toUpperCase();
      const own=document.createElement('p');own.className='pb-original';own.textContent=p.chosen;
      row.append(title);paragraph(row,'Your original words:');row.append(own);paragraph(row,'Reference: '+p.reference);
      panel.append(row);
    });
    text('Your self-review checklist: Did I identify the important price movement? Did I describe the response accurately? Does my result follow from the observed evidence?');
  }else{
    text('Classification: '+chosenClass+' · '+(feedback.classificationCorrect?'correct.':'incorrect; reference: '+final.classification+' — '+LABELS[final.classification]+'.'));
    text('Explanation: '+feedback.parts.filter(p=>p.correct).length+' / 3 correct.');
    text('Reference · '+feedback.reference);
    const comparison=document.createElement('details');
    const summary=document.createElement('summary');summary.textContent='Compare your explanation';comparison.append(summary);
    feedback.parts.forEach(p=>paragraph(comparison,p.part.toUpperCase()+' · '+(p.correct?'Correct':'Incorrect')+' · You: '+p.chosen+(p.correct?'':' Reference: '+p.reference)));
    panel.append(comparison);
  }
  if(final.assessment) text('All 15 following completed closes assessed through '+nyTime(final.assessment.end)+'; decision available at '+nyTime(final.assessment.completesAt)+' New York.');
  if(!final.assessment) text('All 61 search closes checked through 10:45; complete at '+nyTime(final.search.completesAt)+' New York.');
  panel.append(button('Restart exercise',startTraining));
}
function draw(s){
  const svg=el('pbChart'), w=Math.max(280,svg.clientWidth||340), h=300;
  const left=12,right=w-76,top=26,bottom=264, slots=Math.max(10,Math.min(24,Math.floor((right-left)/15)));
  const start=Math.max(0,s.candles.length-slots), visible=s.candles.slice(start), gap=(right-left)/slots;
  const prices=visible.flatMap(c=>[c.high,c.low]);if(s.range) prices.push(s.range.high,s.range.low);
  svg.setAttribute('viewBox','0 0 '+w+' '+h);
  if(!prices.length){svg.innerHTML='<text x="16" y="150" fill="#dbeafe">09:30 · Waiting for the first completed candle</text>';return;}
  const lo=Math.min(...prices),hi=Math.max(...prices),pad=Math.max(20,(hi-lo)*.15);
  const y=p=>bottom-(p-lo+pad)/(hi-lo+2*pad)*(bottom-top), x=i=>left+(i-start+.5)*gap;
  let markup='';
  for(let i=0;i<4;i++){const gy=top+i*(bottom-top)/3;markup+='<path d="M '+left+' '+gy+' H '+right+'" stroke="#263548"/>';}
  if(s.range){
    const {high,low,locked}=s.range;
    if(locked){const bx=Math.max(left,x(0)-gap/2),ex=Math.min(right,x(15)-gap/2);if(ex>bx) markup+='<rect x="'+bx+'" y="'+y(high)+'" width="'+(ex-bx)+'" height="'+(y(low)-y(high))+'" fill="#24385f" fill-opacity=".6"/>';}
    markup+='<path data-level="midpoint" d="M '+left+' '+y(s.range.midpoint)+' H '+right+'" stroke="#cbd0d8" stroke-width="1" stroke-opacity=".65" stroke-dasharray="3 5"/>';
    [[high,'#53adff','ORH'],[low,'#ff80b7','ORL']].forEach(([price,color,label])=>{markup+='<path d="M '+left+' '+y(price)+' H '+right+'" stroke="'+color+'" stroke-width="'+(feedback && price===snapshot(input,{...state,cursor:state.limit}).result.breachedBoundary?3:1)+'" '+(locked?'':'stroke-dasharray="4 4"')+'/><text x="'+(right+5)+'" y="'+(y(price)-3)+'" fill="'+color+'" font-size="11">'+label+' '+price+'</text>';});
  }
  const f=feedback ? snapshot(input,{...state,cursor:state.limit}).result : null;
  visible.forEach((c,j)=>{
    const i=start+j,cx=x(i),cy=Math.min(y(c.open),y(c.close)),body=Math.max(2,Math.abs(y(c.open)-y(c.close)));
    const assessed=(f?.assessment?.closes ?? (f?.classification==='C'?f.search.checkedCloses:[]))?.some(a=>a.timestamp===c.timestamp);
    if(assessed) markup+='<rect x="'+(cx-gap/2)+'" y="'+top+'" width="'+gap+'" height="'+(bottom-top)+'" fill="#a1ceff" fill-opacity=".07"/>';
    const highlight=f && [f.firstBreakout?.timestamp,f.assessment?.firstReturn?.timestamp].includes(c.timestamp);
    markup+='<path d="M '+cx+' '+y(c.high)+' V '+y(c.low)+'" stroke="#fff" stroke-width="1.4"/>';
    markup+='<rect x="'+(cx-gap*.28)+'" y="'+cy+'" width="'+(gap*.56)+'" height="'+body+'" fill="'+(c.close>=c.open?'#f5f7ff':'#101c2e')+'" stroke="'+(highlight?'#ffdf70':'#fff')+'" stroke-width="'+(highlight?3:1.4)+'"/>';
    if(j===0 || j===visible.length-1 || j===Math.floor(visible.length/2)) markup+='<text x="'+cx+'" y="286" text-anchor="middle" fill="#cbd5e1" font-size="11">'+nyTime(c.timestamp)+'</text>';
  });
  svg.innerHTML=markup;
}
for(const [name,[nav]] of Object.entries(panes)) el(nav).onclick=()=>showPane(name);
el('pbAnswerNow').onclick=()=>showPane('answer');
el('pbViewChart').onclick=()=>showPane('observe');
el('pbReturnAnswer').onclick=()=>showPane('answer');
el('pbReturnReview').onclick=()=>showPane('review');
el('pbInspect').onclick=()=>{state=replayFromStart(state);render();schedule();};
el('pbPlay').onclick=()=>{state={...state,playing:!state.playing};render();schedule();};
el('pbPrev').onclick=()=>{state=inspect(state,-1);stop();render();};
el('pbNext').onclick=()=>{state=inspect(state,1);stop();render();};
el('pbRestart').onclick=startTraining;
el('pbExit').onclick=()=>{stop();window.cancelAnimationFrame(navigationFrame);state.playing=false;window.openScreen('home');el('playbookEntry').focus();};
new MutationObserver(()=>{if(document.body.dataset.screen!=='playbook'){stop();if(state)state.playing=false;}}).observe(document.body,{attributes:true,attributeFilter:['data-screen']});
window.addEventListener('resize',()=>{if(state && pane==='observe' && document.body.dataset.screen==='playbook') draw(snapshot(input,state));});

// Switching mode restarts this exercise only; no World or saved progression is touched.
for(const [id,value] of [['pbGuided','guided'],['pbIndependent','independent']]){
  el(id).onclick=()=>{if(mode!==value){mode=value;startTraining();}};
}
