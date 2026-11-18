import test from 'node:test';
import assert from 'node:assert/strict';
import {classifySession} from '../playbook/classifier.mjs';
import {trainingScenario} from '../playbook/scenario.mjs';
import {createReplay,advance,inspect,replayFromStart,snapshot,observationLength,descriptionChoices,grade,DEFAULT_AUTOPLAY_MS} from '../playbook/replay.mjs';
import {syntheticSession,breakoutFixture} from './fixtures/playbook-synthetic.mjs';

test('one sequential completed candle per step; final checkpoint pauses',()=>{
 const input=trainingScenario();let s=createReplay(input);assert.equal(s.stepMs*s.limit,DEFAULT_AUTOPLAY_MS);
 for(let n=1;n<=37;n++){assert.equal(inspect(s,1),s);s=advance(s);assert.equal(s.cursor,n);assert.equal(s.revealed,n);assert.equal(s.completed,n===37);}
 assert.equal(s.playing,false);assert.deepEqual(advance(s),s);
});
test('every prefix contains only completed candles at or before its cutoff',()=>{
 const input=trainingScenario();let s=createReplay(input);
 for(let n=0;n<=37;n++){const snap=snapshot(input,s);assert.equal(snap.candles.length,n);assert.notEqual(snap.result.status,'invalid');for(const c of snap.candles)assert.ok(Date.parse(c.timestamp)+60000<=Date.parse(snap.asOf));if(n<37)assert.equal(snap.result.classification,null);s=advance(s);}
});
test('provisional extremes use observed range candles only; lock after 15 closes',()=>{
 const input=trainingScenario();let s=createReplay(input);assert.equal(snapshot(input,s).range,null);
 for(let n=1;n<=15;n++){s=advance(s);const snap=snapshot(input,s);assert.equal(snap.range.high,Math.max(...input.candles.slice(0,n).map(c=>c.high)));assert.equal(snap.range.low,Math.min(...input.candles.slice(0,n).map(c=>c.low)));assert.equal(snap.range.locked,n===15);}
 assert.equal(snapshot(input,s).asOf,'2026-01-15T14:45:00.000Z');const locked=snapshot(input,s).range;while(s.playing)s=advance(s);assert.deepEqual(snapshot(input,s).range,locked);
});
test('altering unrevealed prices cannot affect snapshot or chart price inputs',()=>{
 const input=trainingScenario(),changed=JSON.parse(JSON.stringify(input));changed.candles.slice(10).forEach(c=>Object.assign(c,{open:1,high:999999,low:1,close:1}));let s=createReplay(input);for(let i=0;i<10;i++)s=advance(s);assert.deepEqual(snapshot(input,s),snapshot(changed,s));
});
test('wick and equality are observed but first strict close remains 09:51',()=>{
 const input=trainingScenario();let s=createReplay(input);for(let n=1;n<=22;n++){s=advance(s);const r=snapshot(input,s).result;if(n<22)assert.equal(r.firstBreakout,null);else assert.equal(r.firstBreakout.timestamp,'2026-01-15T14:51:00.000Z');}
});
test('failure evidence cannot end the required 15 following completed candles early',()=>{
 const input=trainingScenario();let s=createReplay(input);for(let n=1;n<=37;n++){s=advance(s);const r=snapshot(input,s).result;if(n>=28)assert.ok(r.assessment.firstReturn);assert.equal(r.status,n===37?'complete':'incomplete');}assert.equal(snapshot(input,s).result.assessment.observedCount,15);
});
test('inspection cannot skip first viewing; completed replay clamps to revealed sequence',()=>{
 const input=trainingScenario();let s=createReplay(input);assert.equal(inspect(s,1),s);assert.equal(replayFromStart(s),s);while(s.playing)s=advance(s);assert.equal(inspect(s,1).cursor,37);s=replayFromStart(s);assert.equal(s.cursor,0);assert.equal(s.revealed,37);s=inspect(s,-1);assert.equal(s.cursor,0);s=inspect(s,100);assert.equal(s.cursor,1);assert.equal(s.playing,false);assert.equal(snapshot(input,s).candles.length,1);
});
test('restart creates a fresh mandatory viewing without previous answers or reveal state',()=>{
 const input=trainingScenario();let s=createReplay(input);while(s.playing)s=advance(s);const fresh=createReplay(input);assert.equal(fresh.completed,false);assert.equal(fresh.revealed,0);assert.equal(fresh.cursor,0);assert.equal(fresh.playing,true);
});
for(const [label,input,expected] of [['A',breakoutFixture('bullish'),31],['B',breakoutFixture('bearish',{failed:true}),31],['C',syntheticSession(),76],['late A',breakoutFixture('bullish',{breakoutIndex:75}),91]]){
 test(label+' observation endpoint uses classifier completion',()=>{assert.equal(observationLength(input),expected);let s=createReplay(input);for(let n=0;n<expected;n++){assert.equal(snapshot(input,s).result.classification,null);s=advance(s);}assert.equal(snapshot(input,s).result.status,'complete');});
}
test('description and grade derive direction, timestamps, boundary and classification from classifier',()=>{
 const inputs=[trainingScenario(),breakoutFixture('bullish'),breakoutFixture('bearish',{failed:true}),syntheticSession()];
 for(const input of inputs){const r=classifySession(input),choices=descriptionChoices(r),correct=choices.find(c=>c.id==='evidence');assert.ok(correct.text.includes(({A:'Sustained Breakout',B:'Failed Initial Breakout',C:'No Qualifying Breakout'})[r.classification]));if(r.firstBreakout){assert.ok(correct.text.includes(String(r.firstBreakout.boundary)));assert.ok(correct.text.includes(r.firstBreakout.direction));}for(const c of choices)assert.equal(grade(r,r.classification,c.id).descriptionCorrect,c.id==='evidence');for(const c of ['A','B','C'])assert.equal(grade(r,c,'evidence').classificationCorrect,c===r.classification);}
});
test('no question evidence can be generated from an incomplete observation',()=>{const r=snapshot(trainingScenario(),createReplay(trainingScenario())).result;assert.throws(()=>descriptionChoices(r));assert.throws(()=>grade(r,'A','evidence'));});
test('replay and snapshots leave source data unchanged',()=>{const input=trainingScenario(),before=JSON.parse(JSON.stringify(input));let s=createReplay(input);while(s.playing){s=advance(s);const snap=snapshot(input,s);if(snap.candles.length)snap.candles[0].high=999999;}assert.deepEqual(input,before);});
