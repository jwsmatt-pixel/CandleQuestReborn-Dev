import {trainingScenario,SCENARIO_COUNT} from './scenario.mjs';
import {createReplay,advance,inspect,replayFromStart,snapshot,descriptionChoices,grade,scenarioTitle,LABELS,nyTime,DEFAULT_AUTOPLAY_MS} from './replay.mjs';
const el=id=>document.getElementById(id);
let input, state, timer, stage, chosenClass, chosenDescription, feedback;
let scenarioIndex=0;
const button=(text,fn,selected=false)=>{
  const b=document.createElement('button'); b.type='button'; b.textContent=text;
  b.className='pb-card'; b.setAttribute('aria-pressed',String(selected)); b.onclick=fn; return b;
};
function stop(){clearTimeout(timer);}
function schedule(){
  stop();
  if(!state.playing || document.body.dataset.screen!=='playbook') return;
  timer=setTimeout(()=>{
    const wasComplete=state.completed;
    state=advance(state);
    if(!wasComplete && state.completed) stage='ready';
    render(); schedule();
    if(!wasComplete && state.completed) el('pbQuestions').focus();
  },state.stepMs);
}
export function startTraining(){
  stop(); input=trainingScenario(scenarioIndex); state=createReplay(input);
  stage='watch'; chosenClass=null;chosenDescription=null;feedback=null;
  window.openScreen('playbook'); render(); schedule();
  el('pbTitle').focus(); window.scrollTo(0,0);
}
function render(){
  const s=snapshot(input,state), r=s.result;
  el('pbScenario').textContent='Synthetic exercise '+(scenarioIndex+1)+' / '+SCENARIO_COUNT+' · BTCUSD · 1m · 15 Jan 2026';
  el('pbStage').textContent=({watch:'1 · Observe',ready:'2 · Choose your next step',inspect:'2 · Inspect',classify:'3 · Answer',describe:'3 · Answer',feedback:'4 · Review'})[stage];
  el('pbLegend').hidden=stage!=='feedback';
  el('pbProgress').value=state.cursor/state.limit;
  el('pbClock').textContent=nyTime(s.asOf)+' New York · '+state.cursor+' completed 1m candles';
  let phase=!s.range ? 'Session opens at 09:30. Watch completed candles appear.' : !s.range.locked
    ? 'Opening range developing · '+state.cursor+'/15 candles · levels provisional'
    : 'Opening range locked at 09:45 · '+(r.firstBreakout ? 'First qualifying '+r.firstBreakout.direction+' candle: '+nyTime(r.firstBreakout.timestamp)+' · following closes '+r.assessment.observedCount+'/15' : 'Searching strict closing breakouts · 09:45–10:45 inclusive');
  el('pbPhase').textContent=phase;
  el('pbLevels').textContent=s.range ? 'ORH '+s.range.high+' · ORL '+s.range.low+' · '+(s.range.locked?'Locked':'Provisional') : 'ORH / ORL develop from observed candles only';
  const last=s.candles.at(-1);
  el('pbOhlc').textContent=last ? nyTime(last.timestamp)+' candle · O '+last.open+' · H '+last.high+' · L '+last.low+' · C '+last.close : 'No completed candle yet.';
  draw(s);
  el('pbControls').hidden=!state.completed;
  el('pbPlay').textContent=state.playing?'Pause':'Play';
  el('pbPrev').disabled=state.cursor===0;
  el('pbNext').disabled=state.cursor===state.revealed;
  el('pbPlay').disabled=state.cursor===state.limit;
  const panel=el('pbQuestions');panel.replaceChildren();
  const text=t=>{const p=document.createElement('p');p.textContent=t;panel.append(p);};
  if(stage==='watch'){text('Watch first · about '+Math.round(DEFAULT_AUTOPLAY_MS/1000)+' seconds. Answers unlock after observation.');return;}
  if(stage==='ready'){
    text('Observation complete. Choose how to continue.');
    const answer=button('Answer now',()=>{state.playing=false;stop();stage='classify';render();el('pbQuestions').focus();});answer.className+=' pb-primary';
    panel.append(answer,button('Inspect replay first',()=>{state=replayFromStart(state);stage='inspect';render();schedule();}));return;
  }
  if(stage==='inspect'){
    text('Inspect the revealed sequence with Play / Pause or one completed candle at a time.');
    panel.append(button('Answer now',()=>{state.playing=false;stop();stage='classify';render();}));return;
  }
  if(stage==='classify'){
    text('1 / 2 · Classify the first qualifying breakout. No feedback until both answers are submitted.');
    Object.entries(LABELS).forEach(([id,label])=>panel.append(button(id+' — '+label,()=>{chosenClass=id;render();},chosenClass===id)));
    const next=button('Continue to Move → Response → Result',()=>{stage='describe';render();});next.disabled=!chosenClass;panel.append(next);return;
  }
  if(stage==='describe'){
    text('2 / 2 · Select the Move → Response → Result description supported by the candles.');
    descriptionChoices(snapshot(input,{...state,cursor:state.limit}).result).forEach(c=>panel.append(button(c.text,()=>{chosenDescription=c.id;render();},chosenDescription===c.id)));
    panel.append(button('Back to classification',()=>{stage='classify';render();}));
    const submit=button('Submit both answers',()=>{
      const final=snapshot(input,{...state,cursor:state.limit}).result;
      feedback=grade(final,chosenClass,chosenDescription);state={...state,cursor:state.limit,playing:false};stop();stage='feedback';render();el('pbQuestions').focus();
    });submit.disabled=!chosenDescription;panel.append(submit);return;
  }
  const final=snapshot(input,{...state,cursor:state.limit}).result;
  text('Synthetic · '+scenarioTitle(final));
  text((feedback.classificationCorrect && feedback.descriptionCorrect ? '✓ Both reads correct.' : 'Keep practising.')+' Your classification: '+chosenClass+'; '+(feedback.classificationCorrect?'correct.':'correct result: '+final.classification+' — '+LABELS[final.classification]+'.')+' Description: '+(feedback.descriptionCorrect?'correct.':'review the evidence below.'));
  text(feedback.explanation);
  if(final.assessment) text('All 15 following completed closes assessed through '+nyTime(final.assessment.end)+'; decision available at '+nyTime(final.assessment.completesAt)+' New York.');
  if(!final.assessment) text('All 61 search closes checked through 10:45; complete at '+nyTime(final.search.completesAt)+' New York.');
  if(!feedback.descriptionCorrect){const chosen=descriptionChoices(final).find(c=>c.id===chosenDescription);text('Your description: '+chosen.text);}
  const evidence=document.createElement('div');evidence.className='pb-evidence';
  const points=[['Range lock',final.openingRange.completesAt],['First close',final.firstBreakout?.timestamp],['First return',final.assessment?.firstReturn?.timestamp],[final.assessment?'Assessment end':'Search end',final.assessment?.end ?? final.search.end]];
  points.filter(p=>p[1]).forEach(([label,stamp])=>evidence.append(button(label+' · '+nyTime(stamp),()=>{state={...state,cursor:Math.min(state.limit,Math.max(0,input.candles.findIndex(c=>c.timestamp===stamp)+(label==='Range lock'?0:1))),playing:false};stop();render();})));
  const next=button('Next synthetic exercise →',()=>{scenarioIndex=(scenarioIndex+1)%SCENARIO_COUNT;startTraining();});next.className+=' pb-primary';
  panel.append(next,evidence,button('Replay revealed exercise',()=>{state=replayFromStart(state);render();schedule();}),button('Restart exercise',startTraining));
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
el('pbPlay').onclick=()=>{state={...state,playing:!state.playing};render();schedule();};
el('pbPrev').onclick=()=>{state=inspect(state,-1);stop();render();};
el('pbNext').onclick=()=>{state=inspect(state,1);stop();render();};
el('pbRestart').onclick=startTraining;
el('pbExit').onclick=()=>{stop();state.playing=false;window.openScreen('home');el('playbookEntry').focus();};
new MutationObserver(()=>{if(document.body.dataset.screen!=='playbook'){stop();if(state)state.playing=false;}}).observe(document.body,{attributes:true,attributeFilter:['data-screen']});
window.addEventListener('resize',()=>{if(state && document.body.dataset.screen==='playbook') draw(snapshot(input,state));});
