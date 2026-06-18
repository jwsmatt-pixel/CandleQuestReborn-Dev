const CANDLE_QUEST_BUILD = "v26_8_world1_qa_ambiguity_sweep";
console.log("Candle Quest build:", CANDLE_QUEST_BUILD);

function showBuildBadge(){
  if(!document.getElementById("buildBadge")){
    const b = document.createElement("div");
    b.id = "buildBadge";
    b.textContent = "v26.8 - World 1 QA / Ambiguity Sweep";
    b.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:99999;background:rgba(7,12,9,.86);color:white;border:1px solid rgba(255,255,255,.55);border-radius:999px;padding:6px 10px;font:800 11px system-ui;box-shadow:0 4px 14px rgba(0,0,0,.25);pointer-events:none;";
    document.body.appendChild(b);
  }
}
setTimeout(showBuildBadge, 500);

const $ = id => document.getElementById(id);

function renderAnswerDock(mode="waiting", options=[]){
  const pad = $("answerPad");
  if(!pad) return;
  if(mode === "quest" && options.length){
    pad.classList.remove("waiting");
    pad.setAttribute("aria-label", "Quest answer options");
    pad.innerHTML = options.map(o=>`<button onclick="answer('${o.replace(/'/g,"\\'")}')">${o}</button>`).join("");
    return;
  }
  pad.classList.add("waiting");
  pad.setAttribute("aria-label", "Answer dock waiting for Quest Moment");
  pad.innerHTML = [1,2,3,4].map(()=>`<button class="placeholder" disabled aria-hidden="true">—</button>`).join("");
}


const state = loadState();
let activeWorld = 1;
let run = null;
let miniTimer = null;

const worlds = [
  {
    id:1, icon:"Ⅰ", title:"Candle Basics", unlock:0,
    short:"Engulfing, hammer, shooting star and doji.",
    lesson:"Candles show a battle between buyers and sellers. Your first job is not to predict; it is to recognise who tried, who failed, and where the candle closed.",
    rules:["Body = accepted movement between open and close.","Wick = attempted movement that failed to fully hold.","A pattern matters more when it appears at a useful level."],
    patterns:["Bullish Engulfing","Bearish Engulfing","Hammer","Shooting Star","Doji"]
  },
  {
    id:2, icon:"Ⅱ", title:"Levels", unlock:80,
    short:"Support, resistance and channel mean.",
    lesson:"Levels are the map. Candles are the footsteps. A beginner improves fastest by learning whether price is rejecting a level, accepting through it, or chopping around the Channel Mean.",
    rules:["Support = area buyers defend.","Resistance = area sellers defend.","Channel Mean = the middle of the range; signals are weaker here."],
    patterns:["Support Reclaim","Resistance Reject","Mean Chop","Range Bounce","Level Break"]
  },
  {
    id:3, icon:"Ⅲ", title:"Breakouts", unlock:180,
    short:"Break, hold, fakeout and continuation.",
    lesson:"A breakout is only useful if price accepts beyond the level. Wicks through a level are not enough. Wait for hold, failure, or follow-through.",
    rules:["Clean breakout = close and hold outside range.","Fakeout = break outside then fail back in.","Range Expansion = volatility increases but price stays inside."],
    patterns:["Clean Breakout","Failed Breakout","Breakdown","Retest Hold","Range Expansion"]
  },
  {
    id:4, icon:"Ⅳ", title:"Trend", unlock:320,
    short:"Higher lows, lower highs and structure.",
    lesson:"Trends are not straight lines. In an uptrend, pullbacks should respect structure. In a downtrend, rallies should fail. Your job is to judge whether structure is respected or broken.",
    rules:["Uptrend = higher lows and stronger pushes.","Downtrend = lower highs and weaker bounces.","Trend break = structure no longer respected."],
    patterns:["Uptrend Continuation","Downtrend Continuation","Trend Break","Pullback Hold","Lower High"]
  },
  {
    id:5, icon:"Ⅴ", title:"Risk Brain", unlock:500,
    short:"No-trade, stops, risk and patience.",
    lesson:"A good read is not always a good trade. The best young traders learn one thing early: protecting capital is part of the game.",
    rules:["No-trade is a valid answer.","Bad reward-to-risk can ruin a good idea.","Process beats prediction."],
    patterns:["Good Read Bad Trade","No-Trade Chop","Stop Too Tight","Stop Too Wide","Clean Plan"]
  }
];

const skins = [
  {id:"classic", name:"Classic Quest", price:0, desc:"The signature green channel."},
  {id:"night", name:"Night Trader", price:160, desc:"Dark trading desk look."},
  {id:"neon", name:"Neon Breakout", price:320, desc:"Energetic late-night mode."},
  {id:"gold", name:"Gold Floor", price:600, desc:"Premium pro-desk feel."}
];


const patternDefinitions = {
  "Candle Basics": [
    {
      name:"Bullish Engulfing",
      type:"World 1 Pattern Bible v1.0",
      read:"A two-candle bullish reversal pattern where a bullish candle fully engulfs the previous bearish candle's body.",
      location:"First candle is bearish. Second candle is bullish, opens below or near the first candle's close, and closes above the first candle's open.",
      must:"Second candle body completely engulfs the first candle body and is clearly larger.",
      invalid:"Invalid if the first candle is not bearish, the second is not bullish, only the wick is engulfed, the close does not clear the first open, or the second candle reads like a normal bullish candle.",
      cue:"Bearish candle first, then a stronger bullish body swallows it."
    },
    {
      name:"Bearish Engulfing",
      type:"World 1 Pattern Bible v1.0",
      read:"A two-candle bearish reversal pattern where a bearish candle fully engulfs the previous bullish candle's body.",
      location:"First candle is bullish. Second candle is bearish, opens above or near the first candle's close, and closes below the first candle's open.",
      must:"Second candle body completely engulfs the first candle body and is clearly larger.",
      invalid:"Invalid if the first candle is not bullish, the second is not bearish, only the wick is engulfed, the close does not clear the first open, or the second candle reads like a normal bearish candle.",
      cue:"Bullish candle first, then a stronger bearish body swallows it."
    },
    {
      name:"Hammer",
      type:"World 1 Pattern Bible v1.0",
      read:"A bullish rejection-style candle with a small body near the top of its range and a long lower wick.",
      location:"Open and close both occur near the candle high, with the body positioned near the top of the full range.",
      must:"Small-to-medium body, clearly long lower wick at least 2x the body size, and very small or absent upper wick.",
      invalid:"Invalid if the lower wick is not clearly longer than the body, the body is centered, the upper wick is large, it looks more like a Doji, or open/close are too far from the high.",
      cue:"Small body near the top, long wick rejecting lower prices."
    },
    {
      name:"Shooting Star",
      type:"World 1 Pattern Bible v1.0",
      read:"A bearish rejection-style candle with a small body near the bottom of its range and a long upper wick.",
      location:"Open and close both occur near the candle low, with the body positioned near the bottom of the full range.",
      must:"Small-to-medium body, clearly long upper wick at least 2x the body size, and very small or absent lower wick.",
      invalid:"Invalid if the upper wick is not clearly longer than the body, the body is centered, the lower wick is large, it looks more like a Doji, or open/close are too far from the low.",
      cue:"Small body near the bottom, long wick rejecting higher prices."
    },
    {
      name:"Doji",
      type:"World 1 Pattern Bible v1.0",
      read:"A neutral indecision candle where open and close are nearly the same.",
      location:"Body is roughly centered within the candle's full range, with reasonably balanced upper and lower wicks.",
      must:"Very small body, open and close nearly the same, and neither wick dominates the candle.",
      invalid:"Invalid if the body is too large, one wick is much longer than the other, the body is strongly near the top or bottom, or the candle clearly rejects one side like a Hammer or Shooting Star.",
      cue:"Tiny body, balanced wicks, indecision."
    }
  ],
  "Levels": [
    {
      name:"Support Reclaim",
      type:"Failed breakdown / reclaim",
      read:"Price dips below support or Range Low, then closes back above it.",
      location:"Range Low or support area.",
      cue:"The breakdown failed. Buyers reclaimed the level."
    },
    {
      name:"Resistance Reject",
      type:"Failed breakout / rejection",
      read:"Price pushes into resistance or Range High, then closes back below it.",
      location:"Range High or resistance area.",
      cue:"The breakout attempt failed. Sellers defended the level."
    },
    {
      name:"Mean Chop",
      type:"No-trade / balance",
      read:"Price rotates around the Channel Mean without clean acceptance either way.",
      location:"Middle of the channel.",
      cue:"The market is balanced. Signals are weaker here."
    },
    {
      name:"Range Bounce",
      type:"Rotation",
      read:"Price rejects one edge of the channel and rotates back inward.",
      location:"Range High or Range Low.",
      cue:"The edge held. Expect rotation toward the mean or opposite side."
    },
    {
      name:"Level Break",
      type:"Acceptance attempt",
      read:"Price closes beyond a key channel level with intent.",
      location:"Usually Range High or Range Low.",
      cue:"Do not trust the wick alone. Look for close and hold."
    }
  ],
  "Breakouts": [
    {
      name:"Clean Breakout",
      type:"Upside expansion — closes outside",
      read:"Price clearly breaks AND closes outside Range High. Body above the line.",
      location:"Range High.",
      cue:"Body must be outside the channel — not just a wick."
    },
    {
      name:"Failed Breakout",
      type:"Trap / rejection",
      read:"Price WICKS above Range High but CLOSES back inside the range.",
      location:"Range High.",
      cue:"The wick is outside but the close is inside. Trap candle."
    },
    {
      name:"Breakdown",
      type:"Downside expansion — closes outside",
      read:"Price clearly breaks AND closes below Range Low. Body below the line.",
      location:"Range Low.",
      cue:"Mirror of Clean Breakout, but to the downside."
    },
    {
      name:"Retest Hold",
      type:"Continuation confirmation",
      read:"Price breaks a level, returns to test it, and holds from the other side.",
      location:"Old resistance becomes support, or old support becomes resistance.",
      cue:"The retest confirms acceptance."
    },
    {
      name:"Range Expansion",
      type:"Volatility shift — stays inside",
      read:"Candles get bigger and movement accelerates, but price stays INSIDE the channel.",
      location:"Inside the range after compression or quiet movement.",
      cue:"Volatility expanded but no clean escape. Different from a breakout."
    }
  ],
  "Trend": [
    {
      name:"Uptrend Continuation",
      type:"Trend follow-through",
      read:"Price keeps forming higher lows and pushes upward after pullbacks.",
      location:"Above Channel Mean or after holding a pullback.",
      cue:"Buyers defend dips and push to new highs."
    },
    {
      name:"Downtrend Continuation",
      type:"Trend follow-through",
      read:"Price keeps forming lower highs and sells off after bounces.",
      location:"Below Channel Mean or after rejecting a bounce.",
      cue:"Sellers defend rallies and push to new lows."
    },
    {
      name:"Pullback Hold",
      type:"Trend support",
      read:"Price pulls back but holds structure before continuing.",
      location:"Trendline, prior breakout, or Channel Mean.",
      cue:"A pullback is healthy if structure holds."
    },
    {
      name:"Lower High",
      type:"Bearish structure",
      read:"Price bounces but fails below the previous high.",
      location:"Often near resistance or below Channel Mean.",
      cue:"Buyers could not reclaim higher ground."
    },
    {
      name:"Trend Break",
      type:"Structure failure",
      read:"Price breaks the pattern of higher lows or lower highs.",
      location:"At a key structure level.",
      cue:"The prior trend is losing control. Wait for confirmation."
    }
  ],
  "Risk Brain": [
    {
      name:"Good Read Bad Trade",
      type:"Execution warning",
      read:"The pattern may be correct, but the entry, stop, or reward-to-risk is poor.",
      location:"Usually after price already moved too far.",
      cue:"A good read is not automatically a good trade."
    },
    {
      name:"No-Trade Chop",
      type:"Patience",
      read:"Price is noisy, balanced, and lacking clean location.",
      location:"Often around Channel Mean.",
      cue:"No-trade is a valid decision."
    },
    {
      name:"Stop Too Tight",
      type:"Risk mistake",
      read:"The stop is placed where normal candle noise can easily hit it.",
      location:"Too close to the entry or inside the setup zone.",
      cue:"Give the idea enough room to breathe."
    },
    {
      name:"Stop Too Wide",
      type:"Risk mistake",
      read:"The stop is so far away that the reward no longer justifies the risk.",
      location:"Usually chasing after a large move.",
      cue:"Good direction with bad risk can still be a bad trade."
    },
    {
      name:"Clean Plan",
      type:"Process",
      read:"Clear location, clear invalidation, and reasonable reward-to-risk.",
      location:"At a key level with a defined setup.",
      cue:"Plan first. Execute second."
    }
  ]
};

function renderLibrary(category="Candle Basics"){
  const tabs = Object.keys(patternDefinitions);
  const tabsEl = $("libraryTabs");
  const grid = $("definitionGrid");
  if(!tabsEl || !grid) return;

  tabsEl.innerHTML = tabs.map(t=>`<button class="${t===category?'active':''}" onclick="renderLibrary('${t}')">${t}</button>`).join("");

  grid.innerHTML = patternDefinitions[category].map((d,i)=>`
    <article class="definition-card">
      <div class="definition-topline">
        <span class="definition-number">${i+1}</span>
        <span class="definition-type">${d.type}</span>
      </div>
      <h3>${d.name}</h3>
      <p><b>Read:</b> ${d.read}</p>
      <p><b>${d.must ? "Bible condition" : "Best location"}:</b> ${d.location}</p>
      ${d.must ? `<p><b>Must-have:</b> ${d.must}</p>` : ""}
      ${d.invalid ? `<p><b>Invalid if:</b> ${d.invalid}</p>` : ""}
      <p class="definition-cue"><b>Quest cue:</b> ${d.cue}</p>
    </article>
  `).join("");
}

function loadState(){
  try{
    const raw = localStorage.getItem("candleQuestRebornV1");
    if(raw) return Object.assign({xp:0,best:0,skin:"classic",owned:["classic"]}, JSON.parse(raw));
  }catch(e){}
  return {xp:0,best:0,skin:"classic",owned:["classic"]};
}
function saveState(){
  localStorage.setItem("candleQuestRebornV1", JSON.stringify(state));
  $("xpText").textContent = `${state.xp} XP`;
  const gameXp = $("gameXpText");
  if(gameXp) gameXp.textContent = `${state.xp} XP`;
  document.body.dataset.skin = state.skin === "classic" ? "" : state.skin;
}

function pulseXPWallet(){
  const wallet = document.querySelector(document.body.dataset.screen === "game" ? ".game-wallet-mini" : ".wallet") || document.querySelector(".wallet");
  if(!wallet) return;
  wallet.classList.remove("xp-pulse");
  void wallet.offsetWidth;
  wallet.classList.add("xp-pulse");
}

function showXPPop(amount, label="Bonus XP"){
  const wallet = document.querySelector(document.body.dataset.screen === "game" ? ".game-wallet-mini" : ".wallet") || document.querySelector(".wallet");
  if(!wallet || !amount || amount <= 0) return;
  pulseXPWallet();
  const pop = document.createElement("div");
  pop.className = "xp-pop";
  pop.innerHTML = `<b>+${amount} XP</b><span>${label}</span>`;
  wallet.appendChild(pop);
  setTimeout(()=>{ if(pop && pop.parentNode) pop.parentNode.removeChild(pop); },1500);
}


function openScreen(id){
  document.body.dataset.screen = id;
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  if(id==="map") renderMap();
  if(id==="shop") renderShop();
  if(id==="library") renderLibrary();
  if(id==="home") drawMini();
}
function renderMap(){
  $("worldGrid").innerHTML = worlds.map(w=>{
    const locked = state.xp < w.unlock;
    return `<div class="world-card ${locked?'locked':''}">
      <div class="world-icon">${locked?'🔒':w.icon}</div>
      <h3>${w.title}</h3>
      <p>${w.short}</p>
      <button ${locked?'disabled':''} onclick="openLesson(${w.id})">${locked?`Unlock at ${w.unlock} XP`:'Study / Play'}</button>
    </div>`;
  }).join("");
}
function openLesson(id){
  const w = worlds.find(x=>x.id===id);
  if(!w || state.xp < w.unlock) return;
  activeWorld = id;
  $("lessonEyebrow").textContent = `World ${id}`;
  $("lessonTitle").textContent = w.title;
  $("lessonBody").textContent = w.lesson;
  $("lessonRules").innerHTML = w.rules.map((r,i)=>`<div class="rule"><b>${i+1}.</b> ${r}</div>`).join("");
  $("lessonPlayBtn").onclick = () => startRun(id);
  openScreen("lesson");
}
function renderShop(){
  $("shopGrid").innerHTML = skins.map(s=>{
    const owned = state.owned.includes(s.id);
    const active = state.skin === s.id || (s.id==="classic" && state.skin==="classic");
    const canBuy = state.xp >= s.price;
    return `<div class="skin-card ${(!owned && !canBuy)?'locked':''}">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <button ${(!owned && !canBuy)?'disabled':''} onclick="${owned?`equipSkin('${s.id}')`:`buySkin('${s.id}')`}">${active?'Equipped':owned?'Equip':`Buy ${s.price} XP`}</button>
    </div>`;
  }).join("");
}
function buySkin(id){
  const s = skins.find(x=>x.id===id);
  if(!s || state.owned.includes(id) || state.xp < s.price) return;
  state.xp -= s.price;
  state.owned.push(id);
  state.skin = id;
  saveState();
  renderShop();
}
function equipSkin(id){
  if(!state.owned.includes(id)) return;
  state.skin = id;
  saveState();
  renderShop();
}


const runComments = {
  perfect: [
    "Flawless channel reading. You owned every Quest Moment.",
    "Perfect execution — clean reads, clean pressure, clean run.",
    "Channel mastered. No missed reads. That is elite focus.",
    "Perfect run. You read location and candle behaviour like a pro."
  ],
  elite: [
    "Elite run. You stayed sharp under pressure.",
    "Strong channel awareness. You are reading the setup before the candle.",
    "Great work — your zone recognition is becoming automatic.",
    "Elite pressure response. Keep stacking these clean reps."
  ],
  good: [
    "Good run. You are building the right pattern-recognition base.",
    "Solid effort. Keep reading the channel before choosing the candle.",
    "Good progress — the structure is starting to click.",
    "Nice rep. A few cleaner reads and this becomes elite."
  ],
  badluck: [
    "Bad luck. The reps still count — focus on the channel first.",
    "Tough run, but useful data. Slow the read: zone, candle, answer.",
    "Shake it off. Every missed read teaches what to watch next.",
    "Good attempt. Reset, watch the setup zone, and run it back."
  ]
};

function pickRunComment(correct){
  const bucket = correct >= 10 ? "perfect" : correct >= 7 ? "elite" : correct >= 4 ? "good" : "badluck";
  const arr = runComments[bucket];
  return arr[Math.floor(Math.random()*arr.length)];
}


const missedReadCoach = {
  "Bullish Engulfing": {
    visual:"bullish-engulfing",
    shape:"Two-candle bullish reversal",
    level:"Range Low / support",
    cue:"Bearish candle first, then a stronger bullish body swallows it.",
    tag:"Body engulf"
  },
  "Bearish Engulfing": {
    visual:"bearish-engulfing",
    shape:"Two-candle bearish reversal",
    level:"Range High / resistance",
    cue:"Bullish candle first, then a stronger bearish body swallows it.",
    tag:"Body engulf"
  },
  "Hammer": {
    visual:"hammer",
    shape:"Small body near the top",
    level:"Range Low / support",
    cue:"Small body near the top, long wick rejecting lower prices.",
    tag:"Lower rejection"
  },
  "Shooting Star": {
    visual:"shooting-star",
    shape:"Small body near the bottom",
    level:"Range High / resistance",
    cue:"Small body near the bottom, long wick rejecting higher prices.",
    tag:"Upper rejection"
  },
  "Doji": {
    visual:"doji",
    shape:"Tiny centered body",
    level:"Channel Mean / key zone",
    cue:"Tiny body, balanced wicks, indecision.",
    tag:"Indecision"
  }
};

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>'"]/g, ch => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    "'":"&#39;",
    '"':"&quot;"
  }[ch]));
}

function recordMissedRead(correct, chosen){
  if(!run || !correct) return;
  if(!run.missedReads) run.missedReads = [];
  const coach = missedReadCoach[correct] || {
    visual:"generic",
    shape:"Best matching structure",
    level:"Key chart zone",
    cue:"Review the candle body, wick direction, and where it formed in the channel.",
    tag:"Review"
  };
  run.missedReads.push({
    correct,
    chosen: chosen || "Timeout",
    shape: coach.shape,
    level: coach.level,
    cue: coach.cue,
    tag: coach.tag,
    visual: coach.visual
  });
}

function getChoiceSummary(items){
  const counts = {};
  items.forEach(m=>{
    const choice = m.chosen || "Timeout";
    counts[choice] = (counts[choice] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,2)
    .map(([choice,count])=>count > 1 ? `${choice} ×${count}` : choice)
    .join(", ");
}

function groupMissedReads(missedReads){
  const groups = new Map();
  (Array.isArray(missedReads) ? missedReads : []).forEach(m=>{
    if(!m || !m.correct) return;
    if(!groups.has(m.correct)) groups.set(m.correct, []);
    groups.get(m.correct).push(m);
  });
  return Array.from(groups.entries()).map(([correct,items])=>{
    const coach = missedReadCoach[correct] || items[0] || {};
    return {
      correct,
      count: items.length,
      choices: getChoiceSummary(items),
      shape: coach.shape || items[0]?.shape || "Best matching structure",
      level: coach.level || items[0]?.level || "Key chart zone",
      cue: coach.cue || items[0]?.cue || "Review the candle body, wick direction, and where it formed in the channel.",
      tag: coach.tag || items[0]?.tag || "Review",
      visual: coach.visual || items[0]?.visual || "generic"
    };
  }).sort((a,b)=>b.count-a.count || a.correct.localeCompare(b.correct));
}


function renderCoachPatternVisual(visual){
  const safeVisual = ["bullish-engulfing","bearish-engulfing","hammer","shooting-star","doji"].includes(visual) ? visual : "generic";
  const levelText = {
    "bullish-engulfing":"Range Low / support",
    "bearish-engulfing":"Range High / resistance",
    "hammer":"Range Low / support",
    "shooting-star":"Range High / resistance",
    "doji":"Channel Mean / key zone",
    "generic":"Key level"
  }[safeVisual] || "Key level";

  if(safeVisual === "bullish-engulfing" || safeVisual === "bearish-engulfing"){
    const bull = safeVisual === "bullish-engulfing";
    return `
      <div class="coach-chart coach-chart--${safeVisual}" aria-hidden="true">
        <span class="coach-grid"></span>
        <span class="coach-level coach-level--main"><i>${levelText}</i></span>
        <span class="coach-candle coach-candle--prior ${bull ? 'red' : 'green'}"><i class="wick"></i><i class="body"></i></span>
        <span class="coach-candle coach-candle--engulf ${bull ? 'green' : 'red'}"><i class="wick"></i><i class="body"></i></span>
        <span class="coach-note coach-note--prior">prior ${bull ? 'weakness' : 'strength'}</span>
        <span class="coach-note coach-note--engulf">body takes control</span>
      </div>
    `;
  }

  return `
    <div class="coach-chart coach-chart--${safeVisual}" aria-hidden="true">
      <span class="coach-grid"></span>
      <span class="coach-level coach-level--main"><i>${levelText}</i></span>
      <span class="coach-candle coach-candle--single ${safeVisual === 'shooting-star' ? 'red' : 'green'}"><i class="wick"></i><i class="body"></i></span>
      <span class="coach-note coach-note--wick">${safeVisual === 'shooting-star' ? 'long upper wick' : safeVisual === 'hammer' ? 'long lower wick' : 'open ≈ close'}</span>
      <span class="coach-note coach-note--body">${safeVisual === 'doji' ? 'indecision body' : safeVisual === 'shooting-star' ? 'body near lows' : 'body near top'}</span>
    </div>
  `;
}

function scrollMissedCoach(direction){
  const track = $("missedCoachCarousel");
  if(!track) return;
  const amount = Math.max(240, track.clientWidth * 0.92);
  track.scrollBy({left: direction * amount, behavior:"smooth"});
}

function scrollMissedCoachTo(index){
  const track = $("missedCoachCarousel");
  if(!track || !track.children[index]) return;
  track.children[index].scrollIntoView({behavior:"smooth", block:"nearest", inline:"center"});
}

function showResultStep(step="score"){
  const result = $("result");
  if(!result) return;
  const cleanStep = step === "review" ? "review" : "score";
  const useMobileOverlay = isMobile();
  result.dataset.review = useMobileOverlay && cleanStep === "review" ? "open" : "closed";
  result.dataset.step = useMobileOverlay ? "score" : cleanStep;
  result.querySelectorAll(".result-step").forEach(panel=>{
    const panelStep = panel.dataset.stepPanel;
    const active = useMobileOverlay
      ? (panelStep === "score" || (cleanStep === "review" && panelStep === "review"))
      : panelStep === cleanStep;
    panel.classList.toggle("active", active);
  });
}

function renderMissedReadsReview(missedReads){
  const missed = Array.isArray(missedReads) ? missedReads : [];
  if(!missed.length){
    return `<div class="missed-review clean"><b>No missed reads.</b><span>Clean round — run it back and build the streak.</span></div>`;
  }
  const groups = groupMissedReads(missed);
  return `
    <div class="missed-review coach-carousel-review">
      <div class="missed-review-head">
        <div>
          <b>Review missed reads</b>
          <small>Swipe through each pattern cue</small>
        </div>
        <span>${missed.length} ${missed.length === 1 ? "miss" : "misses"} · ${groups.length} ${groups.length === 1 ? "pattern" : "patterns"}</span>
      </div>
      <div class="coach-carousel-shell">
        <button class="coach-nav coach-nav--prev" type="button" aria-label="Previous missed read" onclick="scrollMissedCoach(-1)">‹</button>
        <div class="missed-coach-carousel" id="missedCoachCarousel" tabindex="0" aria-label="Missed read coach carousel">
          ${groups.map((g,i)=>`
            <article class="missed-coach-slide">
              <div class="coach-slide-top">
                <span>${i+1}/${groups.length}</span>
                <small>${g.count > 1 ? `missed ×${g.count}` : "missed once"}</small>
              </div>
              ${renderCoachPatternVisual(g.visual)}
              <div class="coach-slide-copy">
                <h3>${escapeHTML(g.correct)}</h3>
                <p>${escapeHTML(g.cue)}</p>
                <div class="coach-cue-list">
                  <span><b>Shape</b>${escapeHTML(g.shape)}</span>
                  <span><b>Level</b>${escapeHTML(g.level)}</span>
                </div>
                ${g.choices ? `<em>Confused with: ${escapeHTML(g.choices)}</em>` : ""}
              </div>
            </article>
          `).join("")}
        </div>
        <button class="coach-nav coach-nav--next" type="button" aria-label="Next missed read" onclick="scrollMissedCoach(1)">›</button>
      </div>
    </div>
  `;
}


function updateStreakHud(){
  const hud = document.querySelector(".game-hud");
  if(!hud) return;
  let pill = document.getElementById("streakPill");
  if(!pill){
    pill = document.createElement("div");
    pill.id = "streakPill";
    pill.className = "streak-pill idle";
    hud.appendChild(pill);
  }
  const combo = run ? (run.combo || 0) : 0;
  if(combo >= 2){
    pill.textContent = `${combo}x STREAK`;
    pill.className = "streak-pill hot";
  } else {
    pill.textContent = "STREAK —";
    pill.className = "streak-pill idle";
  }
}

function showScoreXPPop(amount, label="Bonus XP", isPerfect=false){
  if(!run || !amount || amount <= 0) return;
  const scoreEl = $("scoreText");
  if(!scoreEl) return;
  const box = scoreEl.closest ? scoreEl.closest(".hud-stats") : scoreEl.parentElement;
  if(!box) return;
  box.classList.remove("score-xp-pulse");
  void box.offsetWidth;
  box.classList.add("score-xp-pulse");
  const pop = document.createElement("div");
  pop.className = isPerfect ? "score-xp-pop perfect" : "score-xp-pop";
  pop.innerHTML = `<b>+${amount} XP</b><span>${label}</span>`;
  box.appendChild(pop);
  setTimeout(()=>{ if(pop && pop.parentNode) pop.parentNode.removeChild(pop); },1500);
}

function showStreakLost(){
  const hud = document.querySelector(".game-hud");
  if(!hud) return;
  let pill = document.getElementById("streakPill");
  if(!pill){
    pill = document.createElement("div");
    pill.id = "streakPill";
    hud.appendChild(pill);
  }
  pill.textContent = "STREAK LOST";
  pill.className = "streak-pill lost";
  setTimeout(()=>{ updateStreakHud(); },900);
}


// ─── MOBILE DETECTION ─────────────────────────────────────────────────────────
function isMobile(){
  return window.innerWidth <= 850;
}


// ─── RUN BOOTSTRAP ────────────────────────────────────────────────────────────
function startRun(worldId=activeWorld){
  activeWorld = worldId;
  const world = worlds.find(w=>w.id===worldId) || worlds[0];
  const startPrice = 100;
  run = {
    world,
    score:0,
    price:startPrice,
    candles:[],
    paused:false,
    current:null,
    nextFreeze: 6,
    combo:0,
    timer:null,
    tick:null,

    support:startPrice - 6,
    resistance:startPrice + 6,
    midpoint:startPrice,
    regime: world.id >= 4 ? "trend" : "range",
    trendDir: 1,
    trendStrength: world.id >= 4 ? 0.26 : 0.05,
    volatility: world.id >= 5 ? 1.35 : (world.id >= 3 ? 1.08 : 0.92),
    phase:0,

    setupTarget:null,
    setupPattern:null,
    setupSteps:0,
    setupZone:null,
    setupStory:null,

    momentum:0,
    volPulse:0,
    compression:0,
    lastDirection:0,
    edgeMemory:null,
    setupPhase:null,
    setupPulse:0,

    questCount:0,
    correctCount:0,
    fastCount:0,
    longestStreak:0,
    missedReads:[],
    maxQuests:10,
    questTime:7,
    questLeft:7,
    questTimer:null
  };
  // Mobile: fewer initial candles for clarity
  const initCandles = isMobile() ? 18 : 26;
  for(let i=0;i<initCandles;i++) addCandle();
  $("runMode").textContent = world.title;
  $("runHint").textContent = "Watch the replay. Timer starts at Quest Moment.";
  $("scoreText").textContent = "0";
  $("timeText").textContent = "—";
  renderAnswerDock("waiting");
  $("freezeBanner").classList.add("hidden");
  openScreen("game");
  drawGame();
  updateStreakHud();
  run.timer = null;
  run.tick = setInterval(()=>{
    if(!run || run.paused) return;
    if(run.setupPattern && run.setupSteps <= 0 && run.nextFreeze <= 0){
      freezeScenario();
      drawGame(true);
      return;
    }
    const wasFinishingSetup = !!run.setupPattern && run.setupSteps > 0;
    addCandle();
    run.nextFreeze--;
    if(run.nextFreeze<=0 && !(wasFinishingSetup && run.setupSteps <= 0)) freezeScenario();
    drawGame();
  },520);
}
function quitRun(){
  if(run){clearInterval(run.timer);clearInterval(run.tick);clearInterval(run.questTimer);}
  run=null;
  openScreen("home");
}
function endRun(){
  if(!run) return;
  clearInterval(run.timer);clearInterval(run.tick);clearInterval(run.questTimer);

  const correct = run.correctCount || 0;
  const maxQ = run.maxQuests || 10;
  const baseXP = Math.max(10, Math.round(run.score/2));
  const perfectBonus = correct >= maxQ ? 50 : 0;
  const fastAnswerBonus = (run.fastCount || 0) * 3;
  const bonusXP = perfectBonus + fastAnswerBonus;
  const earned = baseXP + bonusXP;

  state.xp += earned;
  state.best = Math.max(state.best, run.score);
  saveState();
  if(bonusXP > 0){
    setTimeout(()=>showXPPop(bonusXP, perfectBonus > 0 ? "Perfect + speed bonus" : "Speed bonus"), 350);
  } else {
    setTimeout(()=>pulseXPWallet(), 350);
  }

  $("finalScore").textContent = run.score;
  $("finalXP").textContent = earned;
  $("finalBest").textContent = state.best;

  $("resultTitle").textContent = correct >= 10 ? "PERFECT RUN" : correct >= 7 ? "Elite Run" : correct >= 4 ? "Good Run" : "Bad Luck";

  const runComment = pickRunComment(correct);
  const fastLine = (run.fastCount || 0) > 0 ? `<span class="summary-bonus">⚡ ${run.fastCount} fast reads · +${(run.fastCount || 0)*3} XP</span>` : "";
  const perfectLine = correct >= maxQ ? `<span class="summary-bonus perfect">✦ Perfect bonus +50 XP</span>` : "";
  const bonusRow = (fastLine || perfectLine) ? `<div class="summary-bonus-row">${fastLine}${perfectLine}</div>` : "";
  const missedCount = (run.missedReads || []).length;
  const missedReview = renderMissedReadsReview(run.missedReads || []);
  const reviewButton = missedCount > 0
    ? `<button class="secondary result-review-btn" onclick="showResultStep('review')">Review missed reads</button>`
    : `<button class="secondary result-review-btn" onclick="showResultStep('review')">View clean-run coach note</button>`;

  $("resultBody").innerHTML = `
    <div class="result-step result-step-score active" data-step-panel="score">
      <div class="summary-correct">${correct}/${maxQ}</div>
      <div class="summary-label">correct reads</div>
      <div class="summary-comment">${runComment}</div>
      ${bonusRow}
      <div class="summary-step-actions">${reviewButton}</div>
    </div>
    <div class="result-step result-step-review" data-step-panel="review">
      ${missedReview}
      <div class="summary-step-actions review-back-row">
        <button class="secondary result-review-close" onclick="showResultStep('score')">Back to score</button>
      </div>
    </div>
  `;

  run=null;
  openScreen("result");
  showResultStep("score");
}


// ─── CANDLE ENGINE v26.1 — DOCTRINE GENERATOR ─────────────────────────────────
// World 1 answer pool (unchanged): Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
// New: recipe-based generator + validator for the 3 single-candle W1 patterns.
// Bullish/Bearish Engulfing use the existing v25 hardcoded recipes (two-candle context).
// Diversity engine prevents 3-4 repeat patterns in a row for all W1 patterns.

// ── WORLD 1 SINGLE-CANDLE RECIPES ─────────────────────────────────────────────
// Measurements relative to total candle range (high - low = 1.0).
// bodyPosFrac: 0 = body sits at bottom, 1 = body sits at top (by body midpoint).

const W1_RECIPES = {
  "Hammer": {
    // Small body near top. Long lower wick (>=2x body). Tiny/no upper wick.
    totalRange:    [1.9, 3.1],
    bodyFrac:      [0.09, 0.20],
    bodyPosFrac:   [0.80, 0.93],
    upperWickFrac: [0.00, 0.08],
    lowerWickFrac: [0.66, 0.86],
    colourBias: 0.65,
    validate: {
      lowerWickMinRatio: 2.2,   // lower wick must be clearly at least 2x body
      upperWickMaxFrac:  0.10,  // tiny upper wick
      bodyMinFrac:       0.07,
      bodyMaxFrac:       0.22,
      bodyMinPosFrac:    0.76,  // body in upper quarter of candle
      closeToHighMaxFrac:0.16,
      minDominantWickRatio: 3.0,
      rejectDojiOverlap: true
    }
  },
  "Shooting Star": {
    // Small body near bottom. Long upper wick (>=2x body). Tiny/no lower wick.
    totalRange:    [1.9, 3.1],
    bodyFrac:      [0.09, 0.20],
    bodyPosFrac:   [0.07, 0.20],
    upperWickFrac: [0.66, 0.86],
    lowerWickFrac: [0.00, 0.08],
    colourBias: 0.35,
    validate: {
      upperWickMinRatio: 2.2,
      lowerWickMaxFrac:  0.10,
      bodyMinFrac:       0.07,
      bodyMaxFrac:       0.22,
      bodyMaxPosFrac:    0.24,  // body in lower quarter of candle
      closeToLowMaxFrac: 0.16,
      minDominantWickRatio: 3.0,
      rejectDojiOverlap: true
    }
  },
  "Doji": {
    // Open ≈ close. Tiny body. Wicks balanced, can be short or long.
    totalRange:    [1.2, 2.6],
    bodyFrac:      [0.00, 0.045],
    bodyPosFrac:   [0.42, 0.58],
    upperWickFrac: [0.38, 0.58],
    lowerWickFrac: [0.38, 0.58],
    colourBias: 0.5,
    validate: {
      bodyMaxFrac:      0.055,
      bodyMinPosFrac:   0.38,
      bodyMaxPosFrac:   0.62,
      minUpperWickFrac: 0.28,
      minLowerWickFrac: 0.28,
      maxWickImbalanceRatio: 1.45,
      rejectRejectionOverlap: true
    }
  }
};

function _rand(min, max){ return min + Math.random() * (max - min); }

function _w1CandleMetrics(candle){
  const { open, high, low, close } = candle;
  const totalRange = high - low;
  if(totalRange <= 0) return null;
  const bodySize = Math.abs(close - open);
  const bodyBottom = Math.min(open, close);
  const bodyTop = Math.max(open, close);
  const bodyMid = (bodyBottom + bodyTop) / 2;
  const upperWick = Math.max(0, high - bodyTop);
  const lowerWick = Math.max(0, bodyBottom - low);
  const bodyFrac = bodySize / totalRange;
  const upperWickFrac = upperWick / totalRange;
  const lowerWickFrac = lowerWick / totalRange;
  const bodyPosFrac = (bodyMid - low) / totalRange;
  return {
    totalRange,
    bodySize,
    bodyBottom,
    bodyTop,
    bodyMid,
    upperWick,
    lowerWick,
    bodyFrac,
    upperWickFrac,
    lowerWickFrac,
    bodyPosFrac,
    distanceBodyTopFromHighFrac: (high - bodyTop) / totalRange,
    distanceBodyBottomFromLowFrac: (bodyBottom - low) / totalRange
  };
}

function _looksLikeW1Hammer(candle){
  const m = _w1CandleMetrics(candle);
  if(!m || m.totalRange < 0.05 || m.bodySize <= 0.001) return false;
  return m.bodyFrac >= 0.06 &&
    m.bodyFrac <= 0.24 &&
    m.bodyPosFrac >= 0.72 &&
    m.lowerWick / m.bodySize >= 2.0 &&
    m.upperWickFrac <= 0.14 &&
    m.lowerWick >= m.upperWick * 2.5;
}

function _looksLikeW1ShootingStar(candle){
  const m = _w1CandleMetrics(candle);
  if(!m || m.totalRange < 0.05 || m.bodySize <= 0.001) return false;
  return m.bodyFrac >= 0.06 &&
    m.bodyFrac <= 0.24 &&
    m.bodyPosFrac <= 0.28 &&
    m.upperWick / m.bodySize >= 2.0 &&
    m.lowerWickFrac <= 0.14 &&
    m.upperWick >= m.lowerWick * 2.5;
}

function _looksLikeW1Doji(candle){
  const m = _w1CandleMetrics(candle);
  if(!m || m.totalRange < 0.05) return false;
  const wickMin = Math.max(0.001, Math.min(m.upperWick, m.lowerWick));
  const wickMax = Math.max(m.upperWick, m.lowerWick);
  return m.bodyFrac <= 0.065 &&
    m.bodyPosFrac >= 0.34 &&
    m.bodyPosFrac <= 0.66 &&
    m.upperWickFrac >= 0.20 &&
    m.lowerWickFrac >= 0.20 &&
    wickMax / wickMin <= 1.65;
}

// ── VALIDATOR ─────────────────────────────────────────────────────────────────
function _validateW1Candle(patternName, candle){
  const recipe = W1_RECIPES[patternName];
  if(!recipe || !recipe.validate) return true;
  const v = recipe.validate;
  const m = _w1CandleMetrics(candle);
  if(!m || m.totalRange < 0.05) return false;
  const {
    bodySize,
    upperWick,
    lowerWick,
    bodyFrac,
    upperWickFrac,
    lowerWickFrac,
    bodyPosFrac,
    distanceBodyTopFromHighFrac,
    distanceBodyBottomFromLowFrac
  } = m;
  const wickMin = Math.max(0.001, Math.min(upperWick, lowerWick));
  const wickMax = Math.max(upperWick, lowerWick);

  if(v.lowerWickMinRatio  !== undefined && bodySize > 0.001 && lowerWick / bodySize < v.lowerWickMinRatio) return false;
  if(v.upperWickMinRatio  !== undefined && bodySize > 0.001 && upperWick / bodySize < v.upperWickMinRatio) return false;
  if(v.upperWickMaxFrac   !== undefined && upperWickFrac > v.upperWickMaxFrac)  return false;
  if(v.lowerWickMaxFrac   !== undefined && lowerWickFrac > v.lowerWickMaxFrac)  return false;
  if(v.bodyMinFrac        !== undefined && bodyFrac < v.bodyMinFrac)            return false;
  if(v.bodyMaxFrac        !== undefined && bodyFrac > v.bodyMaxFrac)            return false;
  if(v.bodyMinPosFrac     !== undefined && bodyPosFrac < v.bodyMinPosFrac)      return false;
  if(v.bodyMaxPosFrac     !== undefined && bodyPosFrac > v.bodyMaxPosFrac)      return false;
  if(v.minUpperWickFrac   !== undefined && upperWickFrac < v.minUpperWickFrac)  return false;
  if(v.minLowerWickFrac   !== undefined && lowerWickFrac < v.minLowerWickFrac)  return false;
  if(v.closeToHighMaxFrac !== undefined && distanceBodyTopFromHighFrac > v.closeToHighMaxFrac) return false;
  if(v.closeToLowMaxFrac  !== undefined && distanceBodyBottomFromLowFrac > v.closeToLowMaxFrac) return false;
  if(v.maxWickImbalanceRatio !== undefined && wickMax / wickMin > v.maxWickImbalanceRatio) return false;
  if(v.minDominantWickRatio !== undefined && patternName === "Hammer" && lowerWick < upperWick * v.minDominantWickRatio) return false;
  if(v.minDominantWickRatio !== undefined && patternName === "Shooting Star" && upperWick < lowerWick * v.minDominantWickRatio) return false;
  if(v.rejectDojiOverlap && _looksLikeW1Doji(candle)) return false;
  if(v.rejectRejectionOverlap && (_looksLikeW1Hammer(candle) || _looksLikeW1ShootingStar(candle))) return false;
  return true;
}

// ── RECIPE GENERATOR ──────────────────────────────────────────────────────────
function _generateW1Candle(patternName, anchorPrice, clampFn){
  const recipe = W1_RECIPES[patternName];
  if(!recipe) return null;

  for(let attempt = 0; attempt < 12; attempt++){
    const totalRange  = _rand(recipe.totalRange[0], recipe.totalRange[1]);
    const bodyFrac    = _rand(recipe.bodyFrac[0], recipe.bodyFrac[1]);
    const bodySize    = bodyFrac * totalRange;
    const bodyPosFrac = _rand(recipe.bodyPosFrac[0], recipe.bodyPosFrac[1]);
    const low         = anchorPrice - totalRange * (1 - bodyPosFrac);
    const high        = low + totalRange;
    const bodyMid     = low + bodyPosFrac * totalRange;
    const bodyBottom  = bodyMid - bodySize / 2;
    const bodyTop     = bodyMid + bodySize / 2;
    const bullish     = Math.random() < (recipe.colourBias || 0.5);
    const open        = bullish ? bodyBottom : bodyTop;
    const close       = bullish ? bodyTop    : bodyBottom;

    const candle = {
      open:  clampFn(open),
      high:  clampFn(high),
      low:   clampFn(low),
      close: clampFn(close)
    };
    candle.high = Math.max(candle.high, candle.open, candle.close);
    candle.low  = Math.min(candle.low,  candle.open, candle.close);

    if(_validateW1Candle(patternName, candle)){
      _debugLog(patternName, candle, attempt + 1, true);
      return candle;
    }
  }
  // Deterministic safe fallback
  const fallback = _fallbackW1Candle(patternName, anchorPrice, clampFn);
  _debugLog(patternName, fallback, 12, false);
  return fallback;
}

function _fallbackW1Candle(patternName, anchor, clampFn){
  let o, h, l, c;
  if(patternName === "Hammer"){
    o = anchor + 0.35; c = anchor + 0.60; h = anchor + 0.66; l = anchor - 1.65;
  } else if(patternName === "Shooting Star"){
    o = anchor - 0.35; c = anchor - 0.60; h = anchor + 1.65; l = anchor - 0.66;
  } else { // Doji
    o = anchor; c = anchor + 0.04; h = anchor + 0.9; l = anchor - 0.9;
  }
  const candle = { open: clampFn(o), high: clampFn(h), low: clampFn(l), close: clampFn(c) };
  candle.high = Math.max(candle.high, candle.open, candle.close);
  candle.low  = Math.min(candle.low,  candle.open, candle.close);
  return candle;
}

function _alignW1CandleToOpen(patternName, targetOpen, anchorPrice, clampFn){
  for(let attempt = 0; attempt < 18; attempt++){
    const gen = _generateW1Candle(patternName, anchorPrice, clampFn);
    if(!gen) continue;
    const shift = targetOpen - gen.open;
    const candle = {
      open: targetOpen,
      high: clampFn(gen.high + shift),
      low: clampFn(gen.low + shift),
      close: clampFn(gen.close + shift)
    };
    candle.high = Math.max(candle.high, candle.open, candle.close);
    candle.low  = Math.min(candle.low, candle.open, candle.close);
    if(_validateW1Candle(patternName, candle)) return candle;
  }
  let fallback;
  if(patternName === "Hammer"){
    fallback = {
      open: targetOpen,
      close: clampFn(targetOpen + 0.24),
      high: clampFn(targetOpen + 0.30),
      low: clampFn(targetOpen - 1.80)
    };
  } else if(patternName === "Shooting Star"){
    fallback = {
      open: targetOpen,
      close: clampFn(targetOpen - 0.24),
      high: clampFn(targetOpen + 1.80),
      low: clampFn(targetOpen - 0.30)
    };
  } else {
    fallback = {
      open: targetOpen,
      close: clampFn(targetOpen + 0.03),
      high: clampFn(targetOpen + 0.95),
      low: clampFn(targetOpen - 0.95)
    };
  }
  fallback.high = Math.max(fallback.high, fallback.open, fallback.close);
  fallback.low = Math.min(fallback.low, fallback.open, fallback.close);
  return _validateW1Candle(patternName, fallback) ? fallback : null;
}

function _validateW1Engulfing(patternName, first, second){
  const firstBody = Math.abs(first.close - first.open);
  const secondBody = Math.abs(second.close - second.open);
  if(firstBody < 0.45 || secondBody < firstBody * 1.35) return false;

  if(patternName === "Bullish Engulfing"){
    if(first.close >= first.open || second.close <= second.open) return false;
    // Body engulf, not wick-only: the second body must start at or below the prior body low.
    if(second.open > first.close + 0.03) return false;
    if(second.close < first.open + 0.18) return false;
    if(_looksLikeW1Hammer(second) || _looksLikeW1Doji(second)) return false;
    return true;
  }

  if(patternName === "Bearish Engulfing"){
    if(first.close <= first.open || second.close >= second.open) return false;
    // Body engulf, not wick-only: the second body must start at or above the prior body high.
    if(second.open < first.close - 0.03) return false;
    if(second.close > first.open - 0.18) return false;
    if(_looksLikeW1ShootingStar(second) || _looksLikeW1Doji(second)) return false;
    return true;
  }

  return false;
}

function _isW1EngulfingPattern(patternName){
  return patternName === "Bullish Engulfing" || patternName === "Bearish Engulfing";
}

function _buildW1EngulfingPriorCandle(patternName, prev, clampFn, story=null){
  const edgeBoost = story && story.edgeIntent ? 0.16 : 0;
  const body = 0.90 + edgeBoost + Math.random() * 0.46;
  let candle;

  if(patternName === "Bullish Engulfing"){
    const close = clampFn(prev - body);
    candle = {
      open: prev,
      close,
      high: clampFn(prev + 0.16 + Math.random() * 0.22),
      low: clampFn(close - 0.24 - Math.random() * 0.28)
    };
  } else if(patternName === "Bearish Engulfing"){
    const close = clampFn(prev + body);
    candle = {
      open: prev,
      close,
      high: clampFn(close + 0.24 + Math.random() * 0.28),
      low: clampFn(prev - 0.16 - Math.random() * 0.22)
    };
  } else {
    return null;
  }

  candle.high = Math.max(candle.high, candle.open, candle.close);
  candle.low = Math.min(candle.low, candle.open, candle.close);
  return candle;
}

function _getVisibleW1EngulfingContext(patternName){
  if(!run || !run.candles.length) return null;
  const [open, high, low, close] = run.candles[run.candles.length - 1];
  const first = {open, high, low, close};
  const body = Math.abs(close - open);
  if(body < 0.45) return null;
  if(patternName === "Bullish Engulfing" && close < open) return first;
  if(patternName === "Bearish Engulfing" && close > open) return first;
  return null;
}

// ── DEBUG LOGGER ──────────────────────────────────────────────────────────────
const W1_ACTIVE_PATTERNS = ["Bullish Engulfing","Bearish Engulfing","Hammer","Shooting Star","Doji"];
const W1_ACTIVE_PATTERN_SET = new Set(W1_ACTIVE_PATTERNS);

function _chooseW1LocationProfile(patternName){
  if(!run || !W1_ACTIVE_PATTERN_SET.has(patternName)) return null;
  const R = run.resistance;
  const S = run.support;
  const M = run.midpoint;
  const roll = Math.random();

  if(patternName === "Hammer" || patternName === "Bullish Engulfing"){
    if(roll < 0.78){
      const target = S + 0.46 + Math.random() * 0.42;
      return {
        id:"range-low-support",
        target,
        direction:-1,
        zone:{low:S - 1.3, high:S + 1.3, label:"setup zone: range low"},
        edgeIntent:true
      };
    }
    const target = M - 0.55 - Math.random() * 1.10;
    return {
      id:"mean-pullback-weakness",
      target,
      direction:-1,
      zone:{low:target - 1.15, high:target + 1.15, label:"setup zone: lower channel pullback"},
      edgeIntent:false,
      style:"impulse-pullback"
    };
  }

  if(patternName === "Shooting Star" || patternName === "Bearish Engulfing"){
    if(roll < 0.78){
      const target = R - 0.46 - Math.random() * 0.42;
      return {
        id:"range-high-resistance",
        target,
        direction:1,
        zone:{low:R - 1.3, high:R + 1.3, label:"setup zone: range high"},
        edgeIntent:true
      };
    }
    const target = M + 0.55 + Math.random() * 1.10;
    return {
      id:"mean-rally-rejection",
      target,
      direction:1,
      zone:{low:target - 1.15, high:target + 1.15, label:"setup zone: upper channel rally"},
      edgeIntent:false,
      style:"impulse-pullback"
    };
  }

  if(patternName === "Doji"){
    if(roll < 0.74){
      const target = M + (Math.random() < 0.5 ? -1 : 1) * (0.12 + Math.random() * 0.42);
      return {
        id:"channel-mean-hesitation",
        target,
        direction:Math.random() < 0.5 ? -1 : 1,
        zone:{low:M - 1.1, high:M + 1.1, label:"setup zone: channel mean"},
        edgeIntent:false,
        style:"compression-expansion"
      };
    }
    const highHesitation = Math.random() < 0.5;
    const target = highHesitation ? R - 0.72 - Math.random() * 0.30 : S + 0.72 + Math.random() * 0.30;
    return {
      id:highHesitation ? "range-high-hesitation" : "range-low-hesitation",
      target,
      direction:highHesitation ? 1 : -1,
      zone:{low:target - 1.05, high:target + 1.05, label:highHesitation ? "setup zone: range high hesitation" : "setup zone: range low hesitation"},
      edgeIntent:false,
      style:"compression-expansion"
    };
  }

  return null;
}

function _createW1SetupStory(patternName){
  if(!run || !W1_ACTIVE_PATTERN_SET.has(patternName)) return null;
  const total = 4 + Math.floor(Math.random() * 3);
  const styleRoll = Math.random();
  const location = _chooseW1LocationProfile(patternName);
  const style = location?.style || (styleRoll < 0.34 ? "push-pause" : styleRoll < 0.68 ? "impulse-pullback" : "compression-expansion");
  const direction = location?.direction || (Math.random() < 0.5 ? -1 : 1);
  const target = location?.target || run.midpoint;

  return {
    patternName,
    location,
    direction,
    target,
    total,
    step: 0,
    style,
    pullbackAt: total > 4 ? 2 + Math.floor(Math.random() * Math.max(1, total - 3)) : 2,
    edgeIntent: !!location?.edgeIntent,
    wickEnergy: 0.75 + Math.random() * 0.55
  };
}

function _shapeW1SetupCandle(o, c, h, l, story){
  const candle = { open:o, high:h, low:l, close:c };
  const body = Math.abs(candle.close - candle.open);
  if(body < 0.16){
    const dir = story.direction || (Math.random() < 0.5 ? -1 : 1);
    candle.close = candle.open + dir * 0.18;
  }

  candle.high = Math.max(candle.high, candle.open, candle.close);
  candle.low = Math.min(candle.low, candle.open, candle.close);

  if(_looksLikeW1Hammer(candle) || _looksLikeW1ShootingStar(candle) || _looksLikeW1Doji(candle)){
    const bodyTop = Math.max(candle.open, candle.close);
    const bodyBottom = Math.min(candle.open, candle.close);
    const pad = 0.28 + Math.random() * 0.20;
    candle.high = bodyTop + pad;
    candle.low = bodyBottom - pad;
  }

  return candle;
}

function _buildW1SetupTransition(prev, clampFn){
  const story = run.setupStory;
  if(!story) return null;

  const R = run.resistance;
  const S = run.support;
  const M = run.midpoint;
  const stepIndex = story.step;
  const lastStep = Math.max(1, story.total - 1);
  const progress = Math.min(1, stepIndex / lastStep);
  let direction = story.direction;
  const target = story.target;
  let distance = target - prev;

  if(_isW1EngulfingPattern(story.patternName) && stepIndex >= story.total - 1){
    story.step++;
    return _buildW1EngulfingPriorCandle(story.patternName, prev, clampFn, story);
  }

  if(story.patternName === "Doji"){
    const compressing = progress > 0.45 || story.style === "compression-expansion";
    const driftTarget = story.target || M;
    const drift = compressing ? (driftTarget - prev) * 0.10 : direction * (0.38 + Math.random() * 0.42);
    const alternate = stepIndex % 2 === 0 ? 1 : -1;
    let body = drift + alternate * (compressing ? 0.10 : 0.18) + (Math.random() - 0.5) * (compressing ? 0.16 : 0.26);
    const maxBody = compressing ? 0.46 : 0.78;
    body = Math.max(-maxBody, Math.min(maxBody, body));
    const close = clampFn(prev + body);
    const wickBase = compressing ? 0.36 + Math.random() * 0.34 : 0.48 + Math.random() * 0.48;
    const upper = wickBase * (0.82 + Math.random() * 0.38);
    const lower = wickBase * (0.82 + Math.random() * 0.38);
    story.step++;
    return _shapeW1SetupCandle(prev, close, Math.max(prev, close) + upper, Math.min(prev, close) - lower, story);
  }

  if(story.style === "impulse-pullback" && stepIndex === story.pullbackAt){
    direction *= -1;
    distance = direction * (0.58 + Math.random() * 0.62);
  }

  const edgeNear = story.edgeIntent && progress > 0.45;
  const baseStep = edgeNear ? 0.70 + Math.random() * 0.64 : 0.42 + Math.random() * 0.62;
  const impulse = story.style === "compression-expansion" && stepIndex >= story.total - 2 ? 0.28 + Math.random() * 0.44 : 0;
  const step = Math.min(Math.max(0.20, Math.abs(distance)), baseStep + impulse);
  let body = Math.sign(distance || direction) * step;
  body += (Math.random() - 0.5) * (edgeNear ? 0.22 : 0.34);

  const maxBody = edgeNear ? 1.55 : 1.10;
  body = Math.max(-maxBody, Math.min(maxBody, body));
  const close = clampFn(prev + body);

  let upper = 0.24 + Math.random() * 0.48 * story.wickEnergy;
  let lower = 0.24 + Math.random() * 0.48 * story.wickEnergy;
  if(story.patternName === "Hammer" || story.patternName === "Bullish Engulfing"){
    lower += (edgeNear ? 0.34 : 0.12) + Math.random() * 0.38;
    if(stepIndex === story.pullbackAt) upper += 0.12 + Math.random() * 0.22;
  }
  if(story.patternName === "Shooting Star" || story.patternName === "Bearish Engulfing"){
    upper += (edgeNear ? 0.34 : 0.12) + Math.random() * 0.38;
    if(stepIndex === story.pullbackAt) lower += 0.12 + Math.random() * 0.22;
  }

  let high = Math.max(prev, close) + upper;
  let low = Math.min(prev, close) - lower;
  if(run.regime === "range"){
    high = Math.min(high, R + 1.18);
    low = Math.max(low, S - 1.18);
  }

  story.step++;
  return _shapeW1SetupCandle(prev, close, high, low, story);
}

const CQ_DEBUG = true; // set false to silence

function _debugLog(patternName, candle, attempts, passed){
  if(!CQ_DEBUG) return;
  const { open, high, low, close } = candle;
  const totalRange = high - low;
  const bodySize   = Math.abs(close - open);
  const upperWick  = high - Math.max(open, close);
  const lowerWick  = Math.min(open, close) - low;
  console.groupCollapsed(
    `%cCQ Gen%c ${patternName} — ${passed ? '✅ valid' : '⚠️ fallback'} (attempt ${attempts})`,
    'background:#1a2e22;color:#31c977;padding:2px 5px;border-radius:3px;font-weight:800',
    'color:inherit'
  );
  console.log('OHLC:', `O=${open.toFixed(3)} H=${high.toFixed(3)} L=${low.toFixed(3)} C=${close.toFixed(3)}`);
  console.log('Range:', totalRange.toFixed(3), '| Body:', bodySize.toFixed(3),
    `(${(bodyFrac=bodySize/totalRange,bodyFrac*100).toFixed(1)}%)`,
    '| UW:', upperWick.toFixed(3), '| LW:', lowerWick.toFixed(3));
  console.log('Dir:', close >= open ? '🟢 Bull' : '🔴 Bear');
  console.groupEnd();
}

// ── DIVERSITY ENGINE ──────────────────────────────────────────────────────────
// Prevents same pattern appearing 3-4 times in a row.
function _pickDiversePattern(pool, history){
  if(!history || history.length === 0) return pool[Math.floor(Math.random() * pool.length)];

  // Hard block: exclude last 2 picks if pool is large enough
  const lastTwo = history.slice(-2);
  let candidates = pool.filter(p => !lastTwo.includes(p));
  if(candidates.length === 0){
    const last = history[history.length - 1];
    candidates = pool.filter(p => p !== last);
  }
  if(candidates.length === 0) candidates = [...pool];

  // Weighted: each recent appearance reduces weight
  const recent = history.slice(-3);
  const weights = candidates.map(p => {
    const count = recent.filter(r => r === p).length;
    return Math.pow(0.3, count);
  });
  const total = weights.reduce((s, w) => s + w, 0);
  let roll = Math.random() * total;
  for(let i = 0; i < candidates.length; i++){
    roll -= weights[i];
    if(roll <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

function addCandle(forced=null){
  if(!run) return;

  let prev = run.candles.length ? run.candles[run.candles.length-1][3] : run.price;
  let o = prev, c, h, l;

  function clampToWorld(v){
    return Math.max(55, Math.min(145, v));
  }

  // v25: Universal gap prevention — open is always prev close (or prev + tiny legal offset)
  // This replaces the old capStep approach for forced candles.
  function fromPrev(offset=0){
    return prev + offset;
  }

  function transitionCandle(){
    if(run.setupStory && W1_ACTIVE_PATTERN_SET.has(run.setupStory.patternName)){
      const storyCandle = _buildW1SetupTransition(prev, clampToWorld);
      if(storyCandle){
        o = storyCandle.open;
        c = storyCandle.close;
        h = storyCandle.high;
        l = storyCandle.low;
        run.momentum = (c-o) * 0.26;
        run.setupPulse = Math.min(1, (run.setupPulse || 0) + 0.18);
        return;
      }
    }

    const target = run.setupTarget;
    const distance = target - prev;
    const direction = distance === 0 ? 0 : Math.sign(distance);
    const absDist = Math.abs(distance);
    const arrival = absDist < 1.25;
    const baseStep = absDist > 5 ? 1.0 : absDist > 3 ? 0.78 : absDist > 1.25 ? 0.52 : 0.25;
    const step = Math.min(absDist, baseStep + Math.random()*0.22);
    const body = direction * step + (Math.random()-0.5)*(arrival ? 0.12 : 0.18);
    c = clampToWorld(o + body);
    const wick = arrival ? 0.22 + Math.random()*0.22 : 0.28 + Math.random()*0.34;
    h = Math.max(o,c) + wick;
    l = Math.min(o,c) - wick;
    if(arrival){
      c = o + (target-o)*0.24 + (Math.random()-0.5)*0.16;
      h = Math.max(o,c) + 0.25;
      l = Math.min(o,c) - 0.25;
    }
    run.momentum = (c-o) * 0.22;
    run.setupPulse = Math.min(1, (run.setupPulse || 0) + 0.15);
  }

  function normalCandle(){
    const R = run.resistance;
    const S = run.support;
    const M = run.midpoint;
    const channel = Math.max(1, R - S);
    const pos = (prev - S) / channel;

    run.volPulse = Math.max(0, run.volPulse - 0.06);
    if(Math.random() < 0.08) run.volPulse = 0.55 + Math.random()*0.55;
    if(Math.random() < 0.07) run.compression = 2 + Math.floor(Math.random()*3);
    const isCompressed = run.compression > 0;
    if(run.compression > 0) run.compression--;

    let bias = 0;
    if(run.regime === "range"){
      bias += (M - prev) * 0.055;
      if(pos > 0.82){ bias -= 0.42 + (pos-0.82)*1.8; run.edgeMemory = "high"; }
      else if(pos < 0.18){ bias += 0.42 + (0.18-pos)*1.8; run.edgeMemory = "low"; }
      else if(run.edgeMemory === "high" && pos > 0.55){ bias -= 0.16; }
      else if(run.edgeMemory === "low" && pos < 0.45){ bias += 0.16; }
      else { run.edgeMemory = null; }
    } else {
      bias += run.trendDir * run.trendStrength;
      if(run.phase % 6 === 0) bias -= run.trendDir * (0.28 + Math.random()*0.25);
      if(run.trendDir > 0 && pos > 0.74){
        run.support += 0.18; run.resistance += 0.22;
        run.midpoint = (run.support + run.resistance) / 2;
      }
      if(run.trendDir < 0 && pos < 0.26){
        run.support -= 0.22; run.resistance -= 0.18;
        run.midpoint = (run.support + run.resistance) / 2;
      }
    }

    run.momentum = (run.momentum || 0) * 0.58 + bias * 0.42;
    const vol = run.volatility * (isCompressed ? 0.42 : 0.86 + run.volPulse);
    const noise = (Math.random() - 0.5) * vol;
    let targetBody = run.momentum + noise;
    if(!isCompressed && Math.abs(targetBody) < 0.18){ targetBody += (Math.random() > 0.5 ? 1 : -1) * 0.18; }
    const maxBody = isCompressed ? 0.55 : 1.35 + run.volPulse*0.7;
    if(targetBody > maxBody) targetBody = maxBody;
    if(targetBody < -maxBody) targetBody = -maxBody;

    c = clampToWorld(o + targetBody);
    let upperWick = 0.22 + Math.random()*vol*0.42;
    let lowerWick = 0.22 + Math.random()*vol*0.42;
    if(run.regime === "range" && pos > 0.82){ upperWick += 0.45 + Math.random()*0.45; lowerWick *= 0.75; }
    if(run.regime === "range" && pos < 0.18){ lowerWick += 0.45 + Math.random()*0.45; upperWick *= 0.75; }
    h = Math.max(o,c) + upperWick;
    l = Math.min(o,c) - lowerWick;
    if(run.regime === "range"){
      if(h > R + 1.35){ h = R + 1.35; c = Math.min(c, R - 0.18); }
      if(l < S - 1.35){ l = S - 1.35; c = Math.max(c, S + 0.18); }
    }
    run.lastDirection = Math.sign(c-o);
  }

  // ─── FORCED PATTERN CANDLES ────────────────────────────────────────────────
  // v25 rules:
  // 1. Open = prev (universal gap prevention)
  // 2. Pattern-specific recipes distinguish similar-looking patterns
  // 3. Clean Breakout: body outside Range High, not just a wick
  // 4. Failed Breakout: wick outside, close back inside
  // 5. Range Expansion: big candles, stays INSIDE channel
  // 6. Trend patterns: no gaps, continuous from prev close

  if(!forced && run.setupSteps > 0 && run.setupTarget !== null){
    transitionCandle();
    run.setupSteps--;
  } else if(!forced){
    normalCandle();
  } else {
    const p = forced;
    const R = run.resistance;
    const S = run.support;
    const M = run.midpoint;

    // v25: All forced candles open from prev (gap-free)
    o = prev;

    if(p==="Bullish Engulfing"){
      let first = _getVisibleW1EngulfingContext("Bullish Engulfing");
      if(!first){
        first = _buildW1EngulfingPriorCandle("Bullish Engulfing", prev + 0.95, clampToWorld);
      }
      const firstBody = first ? Math.abs(first.close - first.open) : 0.90;
      o = first ? first.close : prev;
      c = clampToWorld(o + firstBody * (1.46 + Math.random()*0.24));
      h = c + 0.16 + Math.random()*0.12;
      l = o - 0.12 - Math.random()*0.10;
      let second = {open:o, high:Math.max(h,o,c), low:Math.min(l,o,c), close:c};
      if(first && !_validateW1Engulfing("Bullish Engulfing", first, second)){
        c = clampToWorld(first.open + 0.30 + Math.random()*0.16);
        h = c + 0.18;
        l = o - 0.14;
        second = {open:o, high:Math.max(h,o,c), low:Math.min(l,o,c), close:c};
      }
    }
    else if(p==="Bearish Engulfing"){
      let first = _getVisibleW1EngulfingContext("Bearish Engulfing");
      if(!first){
        first = _buildW1EngulfingPriorCandle("Bearish Engulfing", prev - 0.95, clampToWorld);
      }
      const firstBody = first ? Math.abs(first.close - first.open) : 0.90;
      o = first ? first.close : prev;
      c = clampToWorld(o - firstBody * (1.46 + Math.random()*0.24));
      h = o + 0.12 + Math.random()*0.10;
      l = c - 0.16 - Math.random()*0.12;
      let second = {open:o, high:Math.max(h,o,c), low:Math.min(l,o,c), close:c};
      if(first && !_validateW1Engulfing("Bearish Engulfing", first, second)){
        c = clampToWorld(first.open - 0.30 - Math.random()*0.16);
        h = o + 0.14;
        l = c - 0.18;
        second = {open:o, high:Math.max(h,o,c), low:Math.min(l,o,c), close:c};
      }
    }
    else if(p==="Hammer"){
      // v26.1: recipe-based generator. Anchor near Range Low.
      const anchor = Math.max(prev, S + 0.4);
      const gen = _alignW1CandleToOpen("Hammer", prev, anchor, clampToWorld);
      if(gen){
        o = gen.open; c = gen.close; h = gen.high; l = gen.low;
      } else {
        // safe fallback
        o = prev;
        const closeTarget = Math.max(S + 1.0, prev + 0.24);
        c = clampToWorld(closeTarget);
        h = Math.max(o, c) + 0.07;
        l = Math.min(o, c) - 1.8;
      }
    }
    else if(p==="Shooting Star"){
      // v26.1: recipe-based generator. Anchor near Range High.
      const anchor = Math.min(prev, R - 0.4);
      const gen = _alignW1CandleToOpen("Shooting Star", prev, anchor, clampToWorld);
      if(gen){
        o = gen.open; c = gen.close; h = gen.high; l = gen.low;
      } else {
        o = prev;
        const closeTarget = Math.min(R - 1.0, prev - 0.24);
        c = clampToWorld(closeTarget);
        l = Math.min(o, c) - 0.07;
        h = Math.max(o, c) + 1.8;
      }
    }
    else if(p==="Doji"){
      // v26.1: recipe-based generator. Anchor at prev (doji can appear anywhere).
      const gen = _alignW1CandleToOpen("Doji", prev, prev, clampToWorld);
      if(gen){
        o = gen.open; c = gen.close; h = gen.high; l = gen.low;
      } else {
        o = prev;
        c = o + (Math.random()-0.5)*0.06;
        h = Math.max(o,c) + 0.95;
        l = Math.min(o,c) - 0.95;
      }
    }
    else if(p==="Support Reclaim"){
      o = prev;
      l = S - 1.0 - Math.random()*0.3;
      c = clampToWorld(S + 1.1 + Math.random()*0.4);
      h = c + 0.3;
    }
    else if(p==="Resistance Reject"){
      o = prev;
      h = R + 1.0 + Math.random()*0.3;
      c = clampToWorld(R - 1.1 - Math.random()*0.4);
      l = c - 0.3;
    }
    else if(p==="Mean Chop"||p==="No-Trade Chop"){
      o = prev;
      c = o + (Math.random()-0.5)*0.55;
      h = Math.max(o,c) + 0.6 + Math.random()*0.3;
      l = Math.min(o,c) - 0.6 - Math.random()*0.3;
    }
    else if(p==="Range Bounce"){
      o = prev;
      l = S - 0.45 - Math.random()*0.2;
      c = clampToWorld(S + 1.45 + Math.random()*0.4);
      h = c + 0.28;
    }
    else if(p==="Level Break"){
      // Closes beyond Range High but not as decisively as Clean Breakout
      o = prev;
      c = clampToWorld(R + 0.75 + Math.random()*0.3);
      h = c + 0.32;
      l = o - 0.28;
    }

    // ─── BREAKOUT PATTERNS (v25 distinct recipes) ──────────────────────────
    else if(p==="Clean Breakout"){
      // BODY must close clearly outside Range High.
      // Open near resistance, strong bull body, close well above R.
      // Distinguishable from Range Expansion: body is OUTSIDE.
      o = Math.min(prev, R - 0.3);  // opens just below or at resistance
      c = clampToWorld(R + 1.8 + Math.random()*0.5);  // close well above R
      h = c + 0.35 + Math.random()*0.2;  // wick above close
      l = o - 0.2;  // minimal lower wick
    }
    else if(p==="Failed Breakout"){
      // WICK above Range High, body closes BACK INSIDE range.
      // Visually distinct: spike up then rejection close
      o = Math.min(prev, R - 0.2);
      h = R + 1.25 + Math.random()*0.4;  // wick clearly outside
      c = clampToWorld(R - 0.9 - Math.random()*0.35);  // close BACK INSIDE range
      l = c - 0.25;
    }
    else if(p==="Breakdown"){
      // Mirror of Clean Breakout downward.
      // BODY closes clearly outside Range Low.
      o = Math.max(prev, S + 0.3);  // opens just above or at support
      c = clampToWorld(S - 1.8 - Math.random()*0.5);  // close well below S
      l = c - 0.35 - Math.random()*0.2;  // wick below close
      h = o + 0.2;  // minimal upper wick
    }
    else if(p==="Range Expansion"){
      // STAYS INSIDE the channel — key distinction from Clean Breakout.
      // Bigger-than-normal candles, strong directional movement,
      // but both open and close remain between S and R.
      // Direction biased toward which half of channel we're in.
      const pos = (prev - S) / Math.max(1, R - S);
      const dir = pos < 0.5 ? 1 : -1;
      if(dir > 0){
        // Expanding upward from lower half — but close stays below R
        o = clampToWorld(Math.max(S + 0.5, prev - 0.3));
        c = clampToWorld(Math.min(R - 0.55, o + 2.1 + Math.random()*0.4));
        h = Math.min(R - 0.15, c + 0.55);  // wick stays inside or just at boundary
        l = Math.max(S + 0.15, o - 0.4);
      } else {
        // Expanding downward from upper half — but close stays above S
        o = clampToWorld(Math.min(R - 0.5, prev + 0.3));
        c = clampToWorld(Math.max(S + 0.55, o - 2.1 - Math.random()*0.4));
        l = Math.max(S + 0.15, c - 0.55);  // wick stays inside or just at boundary
        h = Math.min(R - 0.15, o + 0.4);
      }
    }
    else if(p==="Retest Hold"){
      // After breakout context: hold above old Range High.
      // No gap. Pullback toward R then close above it.
      o = prev;
      l = Math.min(o - 0.4, R - 0.1);  // dips toward retest level
      c = clampToWorld(Math.max(o + 0.8, R + 0.6));  // closes above R = holds
      h = c + 0.3;
    }

    // ─── TREND PATTERNS (v25: all gap-free, start from prev) ────────────────
    else if(p==="Pullback Hold"){
      // Trend context: price pulls back (tests lower structure),
      // then buyers respond → close above open. No jump.
      run.regime="trend"; run.trendDir=1;
      o = prev;
      l = o - 1.0 - Math.random()*0.25;  // pullback lower wick
      c = clampToWorld(o + 1.1 + Math.random()*0.25);  // bullish close from prev
      h = c + 0.3 + Math.random()*0.15;
    }
    else if(p==="Uptrend Continuation"){
      // Larger bullish candle, continuous from prev close.
      run.regime="trend"; run.trendDir=1;
      o = prev;
      c = clampToWorld(o + 1.3 + Math.random()*0.35);
      h = c + 0.32 + Math.random()*0.18;
      l = o - 0.28 - Math.random()*0.15;
    }
    else if(p==="Downtrend Continuation"){
      // Larger bearish candle, continuous from prev close.
      run.regime="trend"; run.trendDir=-1;
      o = prev;
      c = clampToWorld(o - 1.3 - Math.random()*0.35);
      h = o + 0.28 + Math.random()*0.15;
      l = c - 0.32 - Math.random()*0.18;
    }
    else if(p==="Trend Break"){
      // Breaks current trend structure. In a downtrend context this is
      // a strong bullish reversal; continuous from prev.
      run.regime="trend";
      o = prev;
      // Trend break: goes against the prior trend director strongly
      const breakDir = run.trendDir < 0 ? 1 : -1;
      if(breakDir > 0){
        c = clampToWorld(o + 1.65 + Math.random()*0.3);
        h = c + 0.3;
        l = o - 0.35;
      } else {
        c = clampToWorld(o - 1.65 - Math.random()*0.3);
        h = o + 0.35;
        l = c - 0.3;
      }
      run.trendDir = breakDir;
    }
    else if(p==="Lower High"){
      // Bounce fails. In a downtrend: price rallies (wick up),
      // then closes weak. Continuous from prev. No gap.
      run.regime="trend"; run.trendDir=-1;
      o = prev;
      h = o + 0.75 + Math.random()*0.2;   // rally attempt wick
      c = clampToWorld(o - 0.9 - Math.random()*0.25);   // close weak = lower high
      l = c - 0.28;
    }
    else if(p==="Good Read Bad Trade"||p==="Stop Too Wide"){
      o = prev;
      c = clampToWorld(o + 0.9 + Math.random()*0.3);
      h = c + 0.3;
      l = o - 2.1 - Math.random()*0.3;
    }
    else if(p==="Stop Too Tight"){
      o = prev;
      c = clampToWorld(o + 0.85 + Math.random()*0.3);
      h = c + 0.28;
      l = o - 0.6 - Math.random()*0.2;
    }
    else if(p==="Clean Plan"){
      o = prev;
      c = clampToWorld(o + 1.4 + Math.random()*0.3);
      h = c + 0.28;
      l = o - 0.32;
    }
    else {
      normalCandle();
    }
  }

  c = clampToWorld(c);
  h = Math.max(h, o, c);
  l = Math.min(l, o, c);
  run.momentum = (c - o) * 0.28;
  run.lastDirection = Math.sign(c-o);
  run.price = c;
  run.phase++;
  run.candles.push([o,h,l,c]);

  // Mobile: fewer candles on screen for readability
  const maxCandles = isMobile() ? 22 : 38;
  while(run.candles.length > maxCandles) run.candles.shift();
}


// ─── QUEST TIMER ──────────────────────────────────────────────────────────────
function startQuestTimer(){
  if(!run) return;
  clearInterval(run.questTimer);
  run.questLeft = run.questTime || 7;
  $("timeText").textContent = run.questLeft;

  run.questTimer = setInterval(()=>{
    if(!run || !run.paused || !run.current) return;
    run.questLeft--;
    $("timeText").textContent = run.questLeft;
    if(run.questLeft <= 0){
      clearInterval(run.questTimer);
      timeoutQuestMoment();
    }
  },1000);
}

function stopQuestTimer(){
  if(!run) return;
  clearInterval(run.questTimer);
  run.questTimer = null;
}

function timeoutQuestMoment(){
  if(!run || !run.current) return;
  const lostStreak = (run.combo || 0) >= 2;
  run.combo = 0;
  run.score = Math.max(0, run.score - 5);
  if(lostStreak) showStreakLost();
  $("scoreText").textContent = run.score;
  if(!lostStreak) updateStreakHud();
  recordMissedRead(run.current, "Timeout");
  $("runHint").textContent = `Time up — answer was ${run.current}.`;
  document.querySelectorAll("#answerPad button").forEach(b=>{
    b.disabled = true;
    if(b.textContent === run.current) b.classList.add("correct");
  });
  setTimeout(()=>finishQuestMoment(),850);
}

function finishQuestMoment(){
  if(!run) return;
  stopQuestTimer();
  run.questCount = (run.questCount || 0) + 1;
  if(run.questCount >= (run.maxQuests || 10)){
    endRun();
    return;
  }
  run.paused = false;
  run.current = null;
  run.setupZone = null;
  run.setupPhase = null;
  run.setupPulse = 0;
  run.setupStory = null;
  run.nextFreeze = 5 + Math.floor(Math.random()*5);
  $("freezeBanner").classList.add("hidden");
  renderAnswerDock("waiting");
  $("timeText").textContent = "—";
  $("runHint").textContent = `Quest ${run.questCount}/${run.maxQuests} complete. Watch the channel for the next setup.`;
}


// ─── FREEZE / QUEST MOMENT ────────────────────────────────────────────────────
function freezeScenario(){
  const pool = run.world.id === 1
    ? W1_ACTIVE_PATTERNS
    : (run.world.patterns || []).filter(Boolean);

  if(!run.setupPattern){
    // v26.1: diversity engine prevents repeat streaks
    if(!run.patternHistory) run.patternHistory = [];
    const chosen = _pickDiversePattern(pool, run.patternHistory);
    run.patternHistory.push(chosen);
    if(run.patternHistory.length > 8) run.patternHistory.shift();

    run.setupPattern = chosen;
    run.setupStory = _createW1SetupStory(chosen);
    run.setupTarget = getSetupTarget(run.setupPattern);
    run.setupZone = getSetupZone(run.setupPattern);
    run.setupSteps = run.setupStory ? run.setupStory.total : 4 + Math.floor(Math.random()*2);
    run.setupPhase = "forming";
    run.setupPulse = 1;
    run.nextFreeze = run.setupSteps;
    $("timeText").textContent = "—";
    $("runHint").textContent = "Setup forming — watch how price behaves around the channel.";
    renderAnswerDock("waiting");
    return;
  }

  const answer = run.setupPattern;
  addCandle(answer);
  run.paused = true;
  run.current = answer;
  run.setupZone = getSetupZone(answer);
  run.setupPattern = null;
  run.setupTarget = null;
  run.setupSteps = 0;
  run.setupStory = null;
  run.setupPhase = "quest";

  $("freezeBanner").classList.remove("hidden");
  $("runHint").textContent = `Quest Moment ${run.questCount+1}/${run.maxQuests} — 7 seconds to answer.`;
  const options = shuffle([answer,...shuffle(pool.filter(x=>x!==answer)).slice(0,3)]);
  renderAnswerDock("quest", options);
  drawGame(true);
  startQuestTimer();
}

function getSetupTarget(pattern){
  if(!run) return 100;
  const R = run.resistance, S = run.support, M = run.midpoint;
  if(W1_ACTIVE_PATTERN_SET.has(pattern) && run.setupStory?.patternName === pattern && Number.isFinite(run.setupStory.target)){
    return run.setupStory.target;
  }
  const upper = ["Bearish Engulfing","Shooting Star","Resistance Reject","Failed Breakout","Level Break","Clean Breakout","Range Expansion","Retest Hold","Clean Plan"];
  const lower = ["Bullish Engulfing","Hammer","Support Reclaim","Range Bounce","Breakdown"];
  const trendUp = ["Uptrend Continuation","Pullback Hold"];
  const trendDown = ["Downtrend Continuation","Trend Break","Lower High"];
  if(upper.includes(pattern)) return R - 0.75;
  if(lower.includes(pattern)) return S + 0.75;
  if(trendUp.includes(pattern)) return run.price + 0.45;
  if(trendDown.includes(pattern)) return run.price - 0.45;
  return M;
}

function getSetupZone(pattern){
  if(!run) return null;
  const R = run.resistance, S = run.support, M = run.midpoint;
  if(W1_ACTIVE_PATTERN_SET.has(pattern) && run.setupStory?.patternName === pattern && run.setupStory.location?.zone){
    return run.setupStory.location.zone;
  }
  const upper = ["Bearish Engulfing","Shooting Star","Resistance Reject","Failed Breakout","Level Break","Clean Breakout","Range Expansion","Retest Hold","Clean Plan"];
  const lower = ["Bullish Engulfing","Hammer","Support Reclaim","Range Bounce","Breakdown"];
  if(upper.includes(pattern)) return {low:R-1.3, high:R+1.3, label:"setup zone: range high"};
  if(lower.includes(pattern)) return {low:S-1.3, high:S+1.3, label:"setup zone: range low"};
  if(pattern === "Mean Chop" || pattern === "No-Trade Chop" || pattern === "Doji") return {low:M-1.1, high:M+1.1, label:"setup zone: channel mean"};
  return {low:run.price-1.2, high:run.price+1.2, label:"setup zone"};
}

function answer(label){
  if(!run || !run.current) return;
  stopQuestTimer();
  const ok = label === run.current;

  if(ok){
    run.combo++;
    run.correctCount = (run.correctCount || 0) + 1;
    run.longestStreak = Math.max(run.longestStreak || 0, run.combo || 0);

    // questLeft starts at 7 and ticks down each second, so >=5 means the
    // player answered within ~2 seconds → fast-read bonus.
    const underTwoBonus = (run.questLeft || 0) >= 5 ? 5 : 0;
    if(underTwoBonus){
      run.fastCount = (run.fastCount || 0) + 1;
      showScoreXPPop(3, "Fast read");
    }
    if((run.correctCount || 0) >= (run.maxQuests || 10) && (run.questCount || 0) === ((run.maxQuests || 10) - 1)){
      showScoreXPPop(50, "Perfect run", true);
    }

    // v25.1: score is awarded EXACTLY ONCE per correct answer.
    // base + combo bonus (capped) + speed bonus + fast-read bonus.
    const baseScore  = 10;
    const comboBonus = Math.min(10, run.combo * 2);
    const speedBonus = Math.max(0, run.questLeft || 0);
    const gained = baseScore + comboBonus + speedBonus + underTwoBonus;
    run.score += gained;
  } else {
    recordMissedRead(run.current, label);
    const lostStreak = (run.combo || 0) >= 2;
    run.combo = 0;
    run.score = Math.max(0, run.score - 5);
    if(lostStreak) showStreakLost();
  }

  $("scoreText").textContent = run.score;
  if(ok) updateStreakHud();
  $("runHint").textContent = ok ? "Correct read — market resumes." : `Wrong read — answer was ${run.current}.`;
  document.querySelectorAll("#answerPad button").forEach(b=>{
    b.disabled = true;
    if(b.textContent === run.current) b.classList.add("correct");
    else if(b.textContent === label) b.classList.add("wrong");
  });
  setTimeout(()=>finishQuestMoment(),750);
}


// ─── DRAWING ENGINE ────────────────────────────────────────────────────────────
function drawFlatCandle(ctx, x, yO, yH, yL, yC, cw, green, isSignal=false){
  const color = green ? "#31c977" : "#ff5b5b";
  const wickColor = green ? "#19a463" : "#e04444";
  const mobile = isMobile();

  // v26.1.1: Tiny Candle Render Cleanup
  // Previous renderer rounded wick centre, body width, and body left edge separately.
  // That made very small bodies/dojis look clipped or off-centre. This version snaps
  // one true candle centre first, derives the body from that centre, and draws the
  // wick through the same column.
  const effectiveCW = isSignal ? cw * (mobile ? 1.18 : 1.15) : cw;
  const centerX = Math.round(x);

  let bodyW = Math.max(mobile ? 9 : 5, Math.round(effectiveCW));
  if(bodyW % 2 === 0) bodyW += 1; // odd width gives a true centre column
  const left = centerX - Math.floor(bodyW / 2);

  const yHigh = Math.round(Math.min(yH, yL));
  const yLow = Math.round(Math.max(yH, yL));
  const bodyTopRaw = Math.min(yO, yC);
  const bodyBottomRaw = Math.max(yO, yC);
  const bodyMid = Math.round((bodyTopRaw + bodyBottomRaw) / 2);
  const rawBodyH = Math.abs(yC - yO);
  const minBodyH = mobile ? 4 : 3;
  const isTinyBody = rawBodyH < minBodyH;

  // Whole-pixel wick avoids fractional stroke blur and stays centred through body.
  const wickW = mobile ? 3 : 2;
  const wickLeft = centerX - Math.floor(wickW / 2);
  ctx.fillStyle = wickColor;
  ctx.fillRect(wickLeft, yHigh, wickW, Math.max(1, yLow - yHigh));

  ctx.fillStyle = color;

  if(isTinyBody){
    // Render doji/tiny bodies as clean horizontal bars instead of malformed slivers.
    const barH = mobile ? 3 : 2;
    const barTop = bodyMid - Math.floor(barH / 2);
    ctx.fillRect(left, barTop, bodyW, barH);
    return;
  }

  let bodyH = Math.max(minBodyH, Math.round(rawBodyH));
  let top = Math.round(bodyTopRaw);

  // If rounding would detach the body from its midpoint, re-centre it.
  if(bodyH === minBodyH && rawBodyH < minBodyH + 1){
    top = bodyMid - Math.floor(bodyH / 2);
  }

  ctx.fillRect(left, top, bodyW, bodyH);

  // Stroke only when there is enough height to avoid broken-looking tiny outlines.
  if(bodyH >= 5){
    ctx.strokeStyle = wickColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(left + 0.5, top + 0.5, bodyW - 1, bodyH - 1);
  }
}

function drawLevelLabel(ctx, text, x, y, color){
  ctx.save();
  ctx.font="800 11px system-ui";
  const w = ctx.measureText(text).width + 14;
  const h = 20;
  ctx.fillStyle="rgba(7,12,9,.82)";
  ctx.strokeStyle=color;
  ctx.lineWidth=1;
  ctx.beginPath();
  if(ctx.roundRect){
    ctx.roundRect(x,y,w,h,8);
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(x,y,w,h);
    ctx.strokeRect(x,y,w,h);
  }
  ctx.fillStyle="#ffffff";
  ctx.fillText(text,x+7,y+14);
  ctx.restore();
}

function drawGame(frozen=false){
  const canvas = $("gameCanvas"), ctx = canvas.getContext("2d"), W=canvas.width, H=canvas.height;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = "#0b120e";
  ctx.fillRect(0,0,W,H);
  if(!run) return;

  const mobile = isMobile();

  // v26.3.0: Keep the active read compact on every viewport.
  // Desktop still retains its candle buffer, but the rendered slice now follows the
  // same focused candle-count philosophy as mobile and desktop half-width.
  const mobileVisibleTarget = 14;
  const desktopVisibleTarget = 16;
  const visibleTarget = mobile ? mobileVisibleTarget : desktopVisibleTarget;
  const visibleCount = Math.min(run.candles.length, visibleTarget);
  const visibleCandles = run.candles.slice(run.candles.length - visibleCount);

  const candleVals = visibleCandles.flat();
  const visibleMin = Math.min(run.support, ...candleVals);
  const visibleMax = Math.max(run.resistance, ...candleVals);
  const pad = mobile
    ? Math.max(0.85, (run.resistance - run.support) * 0.105)
    : Math.max(1.25, (run.resistance - run.support) * 0.18);
  const min = visibleMin - pad;
  const max = visibleMax + pad;
  const mapY = v => H - 54 - ((v - min) / (max - min)) * (H - 100);

  const futurePad = frozen ? 120 : 88;
  const left = mobile ? 70 : 42;
  const right = W - futurePad;

  // v25.3/v26.3.0: tighter candle stage + wider bodies.
  // Keep the latest candle close to the focus area without letting wide desktop
  // stretch the read back into the old many-candle chart.
  const availableSpan = right - left;
  const compactSpan = mobile
    ? Math.max(360, visibleCandles.length * 36)
    : Math.max(520, visibleCandles.length * 42);
  const stageSpan = Math.min(availableSpan, compactSpan);
  const drawRight = mobile ? right - 18 : right - 10;
  const drawLeft = Math.max(left, drawRight - stageSpan);
  const rawGap = (drawRight - drawLeft) / Math.max(1, visibleCandles.length - 1);
  const gap = mobile ? Math.max(24, Math.min(39, rawGap)) : Math.max(30, Math.min(46, rawGap));
  const cwBase = mobile
    ? Math.max(13, Math.min(24, gap * 0.68))   // thicker on mobile
    : Math.max(5, Math.min(15, gap * 0.42));   // normal on desktop
  const cw = cwBase;

  // Grid lines
  ctx.strokeStyle="rgba(255,255,255,.07)"; ctx.lineWidth=1;
  for(let y=36;y<H-40;y+=44){ ctx.beginPath(); ctx.moveTo(24,y); ctx.lineTo(W-24,y); ctx.stroke(); }

  const hi = run.resistance;
  const lo = run.support;
  const mid = run.midpoint;

  // Channel lines: solid Range High/Low, dashed Channel Mean
  ctx.lineCap = "butt";
  ctx.shadowColor = "rgba(255,255,255,.28)";
  ctx.shadowBlur = 5;

  ctx.setLineDash([]);
  ctx.lineWidth = 3.1;
  ctx.strokeStyle = "rgba(255,255,255,.92)";
  ctx.beginPath(); ctx.moveTo(30,mapY(hi)); ctx.lineTo(W-30,mapY(hi)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(30,mapY(lo)); ctx.lineTo(W-30,mapY(lo)); ctx.stroke();

  ctx.setLineDash([10,8]);
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = "rgba(255,255,255,.72)";
  ctx.beginPath(); ctx.moveTo(30,mapY(mid)); ctx.lineTo(W-30,mapY(mid)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.shadowBlur = 0;

  // Level labels
  drawLevelLabel(ctx,"Range High",36,mapY(hi)-18,"rgba(255,255,255,.92)");
  drawLevelLabel(ctx,"Channel Mean",36,mapY(mid)-18,"rgba(255,255,255,.72)");
  drawLevelLabel(ctx,"Range Low",36,mapY(lo)+8,"rgba(255,255,255,.92)");

  // Setup zone glow (pre-Quest-Moment)
  if(!frozen && run.setupZone && run.setupPhase === "forming"){
    const zTop = mapY(run.setupZone.high);
    const zBottom = mapY(run.setupZone.low);
    const alpha = 0.045 + Math.min(0.08, (run.setupPulse || 0) * 0.08);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(32, Math.min(zTop,zBottom), W-64, Math.max(7, Math.abs(zBottom-zTop)));
    ctx.strokeStyle = "rgba(255,255,255,.16)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4,6]);
    ctx.strokeRect(32, Math.min(zTop,zBottom), W-64, Math.max(7, Math.abs(zBottom-zTop)));
    ctx.setLineDash([]);
  }

  // Quest zone highlight (frozen): keep this as a quiet guide, not a label-heavy overlay.
  if(frozen && run.setupZone){
    const zTop = mapY(run.setupZone.high);
    const zBottom = mapY(run.setupZone.low);
    ctx.fillStyle = "rgba(255,255,255,.045)";
    ctx.strokeStyle = "rgba(255,255,255,.14)";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.fillRect(32, Math.min(zTop,zBottom), W-64, Math.max(8, Math.abs(zBottom-zTop)));
    ctx.strokeRect(32, Math.min(zTop,zBottom), W-64, Math.max(8, Math.abs(zBottom-zTop)));
  }

  // Draw candles
  visibleCandles.forEach((c,i)=>{
    const x = drawLeft + i * gap;
    const [o,h,l,cl] = c;
    const green = cl >= o;
    const yO=mapY(o), yH=mapY(h), yL=mapY(l), yC=mapY(cl);
    const isSignal = frozen && i >= visibleCandles.length - 3;
    drawFlatCandle(ctx, x, yO, yH, yL, yC, cw, green, isSignal);
  });
}

function round(ctx,x,y,w,h,r,fill){
  ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
  if(fill) ctx.fill(); else ctx.stroke();
}
function shuffle(a){ return [...a].sort(()=>Math.random()-.5); }

function drawMini(){
  const c=$("miniCanvas"); if(!c)return; const ctx=c.getContext("2d"); ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle="#0b120e"; ctx.fillRect(0,0,c.width,c.height);
  let price=100, arr=[];
  for(let i=0;i<24;i++){
    let o=price,c2=o+(Math.random()-.45)*4,h=Math.max(o,c2)+Math.random()*2,l=Math.min(o,c2)-Math.random()*2;
    arr.push([o,h,l,c2]); price=c2;
  }
  const vals=arr.flat(),min=Math.min(...vals)-2,max=Math.max(...vals)+2,mapY=v=>c.height-30-((v-min)/(max-min))*(c.height-70);
  arr.forEach((d,i)=>{
    const x=24+i*10,[o,h,l,cl]=d,g=cl>=o,yO=mapY(o),yH=mapY(h),yL=mapY(l),yC=mapY(cl);
    drawFlatCandle(ctx,x,yO,yH,yL,yC,6,g);
  });
  ctx.fillStyle="#fff"; ctx.font="900 22px system-ui"; ctx.fillText("Candle Quest",28,54);
  ctx.font="800 13px system-ui"; ctx.fillText("Freeze. Read. Answer.",28,78);
}
setInterval(()=>{ if($("home").classList.contains("active")) drawMini(); },1800);

saveState();
renderMap();
renderShop();
renderLibrary();
drawMini();


// iOS/PWA helpers
function dismissInstallTip(){
  localStorage.setItem("candleQuestInstallTipDismissed","1");
  const tip = document.getElementById("installTip");
  if(tip) tip.classList.add("hidden");
}
(function setupIOS(){
  const tip = document.getElementById("installTip");
  const dismissed = localStorage.getItem("candleQuestInstallTipDismissed")==="1";
  const standalone = window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
  if(tip && (dismissed || standalone)) tip.classList.add("hidden");

  let lastTouchEnd = 0;
  document.addEventListener("touchend", function(e){
    const now = Date.now();
    if(now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
  }, {passive:false});

  const canvas = document.getElementById("gameCanvas");
  if(canvas){
    canvas.addEventListener("touchmove", function(e){ e.preventDefault(); }, {passive:false});
  }
})();
