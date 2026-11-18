import test from 'node:test';
import assert from 'node:assert/strict';
import {trainingScenario,SCENARIO_COUNT} from '../playbook/scenario.mjs';
import {classifySession} from '../playbook/classifier.mjs';
import {createReplay,advance,snapshot,prefix,descriptionChoices,grade,scenarioTitle,DEFAULT_AUTOPLAY_MS} from '../playbook/replay.mjs';

const cases=[['B','bullish','Failed Bullish Initial Breakout (B)'],['A','bullish','Sustained Bullish Breakout (A)'],['B','bearish','Failed Bearish Initial Breakout (B)'],['A','bearish','Sustained Bearish Breakout (A)'],['C',null,'No Qualifying Breakout (C)']];
assert.equal(SCENARIO_COUNT,cases.length);
for(const [index,[classification,direction,title]] of cases.entries()) {
  test('synthetic exercise '+(index+1)+' validates complete OHLC and maps to '+title,()=>{
    const input=trainingScenario(index),r=classifySession(input);
    assert.deepEqual(input,trainingScenario(index));
    assert.equal(input.dataKind,'synthetic');assert.equal(input.timeframe,'1m');
    assert.equal(r.status,'complete');assert.deepEqual(r.errors,[]);
    assert.equal(r.classification,classification);assert.equal(r.firstBreakout?.direction??null,direction);
    assert.equal(scenarioTitle(r),title);
    input.candles.forEach((c,i)=>{
      assert.equal(c.timestamp,new Date(Date.parse(input.candles[0].timestamp)+i*60000).toISOString());
      assert.equal(c.complete,true);assert.ok(c.low<=Math.min(c.open,c.close));assert.ok(c.high>=Math.max(c.open,c.close));
      assert.ok(Date.parse(c.timestamp)+60000<=Date.parse(input.asOf));
    });
    const correct=descriptionChoices(r).find(c=>c.id==='evidence');
    assert.equal(grade(r,classification,correct.id).classificationCorrect,true);
    assert.equal(grade(r,classification,correct.id).descriptionCorrect,true);
    assert.ok(correct.text.includes(direction??'all 61'));
    if(r.assessment){assert.equal(r.assessment.closes.length,15);assert.equal(r.assessment.observedCount,15);assert.equal(r.firstBreakout.timestamp,input.candles[21].timestamp);}
    else {assert.equal(r.search.checkedCloses.length,61);assert.equal(r.search.completesAt,'2026-01-15T15:46:00.000Z');}
  });
  test('exercise '+(index+1)+' reveals sequential prefixes only and completes in configured duration',()=>{
    const input=trainingScenario(index);let state=createReplay(input);
    assert.equal(DEFAULT_AUTOPLAY_MS,60000);assert.equal(state.stepMs*state.limit,60000);
    assert.equal(createReplay(input,120000).stepMs*state.limit,120000);
    assert.equal(state.limit,classification==='C'?76:37);
    for(let n=0;n<=state.limit;n++){
      const snap=snapshot(input,state);
      assert.deepEqual(snap.candles,input.candles.slice(0,n));
      if(n<state.limit){
        assert.equal(snap.result.classification,null);
        assert.throws(()=>descriptionChoices(snap.result));assert.throws(()=>scenarioTitle(snap.result));
        const changed=structuredClone(input);
        changed.candles.slice(n).forEach(c=>Object.assign(c,{open:1,high:999999,low:1,close:1}));
        assert.deepEqual(snapshot(changed,state),snap);
      }
      if(n===state.limit){assert.equal(state.completed,true);assert.equal(state.playing,false);}
      state=advance(state);
    }
    assert.equal(classifySession(prefix(input,state.limit-1)).status,'incomplete');
    if(classification==='B'){
      const r=classifySession(input),count=input.candles.findIndex(c=>c.timestamp===r.assessment.firstReturn.timestamp)+1;
      assert.equal(classifySession(prefix(input,count)).classification,null);
    }
  });
}
test('invalid scenario indexes and replay durations fail clearly',()=>{
  for(const index of [-1,5,0.5,NaN])assert.throws(()=>trainingScenario(index),RangeError);
  for(const ms of [0,-1,NaN,Infinity,'60000'])assert.throws(()=>createReplay(trainingScenario(),ms),RangeError);
});
