# Candle Quest Reborn

**Current build:** `v27.8 - Study Progress Foundations`
**Build marker:** `v27_8_study_progress_foundations`
**Base:** `v26.2.3 · Result Flow Stepper`  
**Status:** World 1 locked/stable gameplay baseline with mobile-first visual teaching and persistent study progress

---

## What is Candle Quest?

Candle Quest Reborn is a mobile-first chart-reading game built to turn candlestick recognition into deliberate practice.

The long-term vision is to become a **trader's gym**: simple on the surface, intelligent underneath, and focused on repeated high-quality chart-reading reps.

Core learning doctrine:

```text
Shape → Location → Context → Quality → Risk → Execution
```

Candle Quest should not teach players to memorise chart shapes alone. It should train players to read market behaviour. World 1 begins with shape recognition, then future worlds should add one decision layer at a time.

Players learn by:

- watching a chart develop
- reading the channel and setup zone
- answering under Quest Moment pressure
- receiving immediate feedback
- building XP, streaks, and accuracy over repeated runs

---

## Current gameplay loop

1. Start a run.
2. Watch the chart replay/setup phase.
3. Quest Moment begins.
4. Timer starts at 7 seconds.
5. Choose the best pattern answer.
6. Receive correct/incorrect feedback.
7. Earn XP and streak rewards.
8. Complete a 10-question run.
9. Review the run summary.

---

## Current features

### Core gameplay

- 10-question runs
- 7-second Quest Moment timer
- timer shows `—` during replay/setup
- static answer dock beneath the chart
- placeholder answer slots during setup
- real answer labels appear at Quest Moment
- score tracking
- streak tracking
- `STREAK LOST` feedback
- live `+XP` reward pop
- fast-read bonus
- perfect-run bonus
- run-complete summary tiers
- end-of-run missed-reads coach carousel
- Pattern Library with per-pattern seen, correct, accuracy, and learning status
- Study Focus recommendation based on live World 1 reps
- missed-read links back to the correct Pattern Library card
- fail-soft localStorage persistence for World 1 pattern progress
- basic cosmetic shop scaffold

### v27.8 Study Progress Foundations

- tracks Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing during World 1 only
- increments seen for the correct pattern on every completed question and increments correct only for a correct answer
- calculates accuracy and friendly New, Learning, Improving, Strong, and Mastered labels
- recommends the lowest-accuracy pattern with at least three reps in Study Focus
- opens, scrolls to, and highlights the correct library card from missed-read coaching
- keeps generator logic, Pattern Bible rules, the five-answer pool, timer, scoring, tempo, Mochi, and Candle Lens unchanged

### Visual identity

- mobile-first layout
- desktop compatibility
- solid Range High line
- dashed Channel Mean line
- solid Range Low line
- no opaque setup-zone or Quest-zone guide boxes
- Quest Moment banner: `QUEST MOMENT · READ THE CHANNEL`
- cleaned tiny-body/doji candle rendering from v26.1.1

### v26.2.4 Mobile Result Polish

- keeps the v26.2.3 two-step result flow
- further reduces the mobile `X/10` score size
- tightens the result title, correct-reads label, comment, bonus pill, and stat cards on iPhone
- leaves the missed-reads coach carousel, gameplay, scoring, XP, timer, and generator untouched

### v26.2.3 Result Flow Stepper

- splits the run-complete result into two cleaner steps
- Step 1 shows score, run tier, short comment, bonuses, and stats
- Step 2 shows the missed-reads coach carousel
- hides the global title/XP/shop header on the result screen to reduce iOS vertical scroll
- removes the numbered carousel dots while keeping side arrows and iPhone swipe
- slightly reduces the mobile `X/10` summary score size

### v26.2.2 Coach Carousel

- Missed reads are grouped by correct pattern.
- The review now uses large swipeable coach slides instead of compact grid cards.
- Each slide shows a generic TradingView-style visual cue for the missed pattern.
- Each slide reinforces shape and location with concise labels.
- iPhone users can swipe horizontally through missed patterns.
- Desktop users can use arrows, dots, or horizontal scrolling.

### Current engine work

v26.1 introduced the first doctrine-based generator layer for World 1.

The goal is to move Candle Quest away from loose visual approximation and toward:

```text
Pattern Bible
↓
Pattern Recipe
↓
Candle Generator
↓
Validation
↓
Gameplay
```

v26.1.1 builds on that by improving the **canvas renderer** so tiny candles, dojis, and small-body candles look clean and symmetrical rather than clipped or malformed.

v26.2 added the first learning-review layer: wrong answers and timeouts are stored during the run and shown underneath the normal summary so the speedrun loop stays uninterrupted.

v26.2.1 tightened that layer into compact visual missed-read coach cards. v26.2.2 then expands the review into a swipeable **Missed Reads Coach Carousel**, with larger chart-style visual slides that teach each missed pattern through Shape + Location cues.

v26.5 tightens the World 1 generator against Pattern Bible v1.0. Hammer, Shooting Star, and Doji now use stricter recipe validation and overlap rejection, while Bullish/Bearish Engulfing now shape and validate the prior candle so the signal reads as a clear two-candle pattern.

v26.6 keeps those final answer rules intact and improves the replay rhythm before Quest Moment. World 1 setup candles now use small controlled market stories: pushes toward range edges, occasional pullbacks, hesitation/compression before Doji, and more varied body/wick sizes without changing the active answer pool. Bullish/Bearish Engulfing now show the prior pressure candle as the final setup beat before Quest Moment, then print only the engulfing control-shift candle when the answer timer starts.

v26.6.1 keeps the v26.6 rhythm and engulfing sequencing intact while cleaning player-facing chart overlays. Yellow focus bands and the `focus` label are removed, and the Quest Zone highlight is reduced to a subtle unlabeled guide so candles, Range High, Channel Mean, Range Low, and the Quest Moment banner remain the main read.

v26.7 keeps the same active World 1 answer pool and final Pattern Bible validation while improving where those patterns appear. Hammer and Bullish Engulfing now prefer Range Low/support or controlled lower-channel pullback weakness, Shooting Star and Bearish Engulfing prefer Range High/resistance or controlled upper-channel rally rejection, and Doji prefers Channel Mean hesitation/compression with only occasional edge hesitation.

v26.8 protects the v26.7 feel with a narrow World 1 QA sweep. It keeps the same active answer pool, rhythm, location logic, chart presentation, scoring, result flow, Pattern Library, and coach overlay while adding an explicit World 1 answer-pool guard and stricter Bullish/Bearish Engulfing body-boundary validation.

v26.8.1 keeps the v26.8 generator, answer pool, candle rhythm, location logic, and gameplay flow intact while removing the remaining opaque setup/Quest guide boxes from the player-facing chart. Range High, Channel Mean, Range Low, candles, and the Quest Moment banner remain the visible reading structure.

v26.9 is a World 1 lockdown-candidate pass. It keeps the current good gameplay feel intact, preserves the five-answer World 1 pool, Pattern Bible fairness, v26.6 replay rhythm/Engulfing sequencing, v26.7 location realism, v26.8 ambiguity safeguards, and v26.8.1 clean chart presentation while tightening release hygiene with an immutable active answer pool, quiet generator debug logging, and updated build documentation.

v27.0 formally locks World 1 as the current stable baseline after the accepted v26.9 test pass. It changes only the release marker, build badge, and checkpoint documentation. Gameplay behaviour, scoring, answer pool, candle generation, chart overlays, result flow, Pattern Library wording, Pattern Bible fairness, replay sequencing, and location realism remain unchanged.

v27.1 keeps the v27.0 World 1 gameplay baseline locked while improving first-player onboarding. The home screen now explains the watch/wait/read/choose loop, a small dismissible Candle Basics helper appears on first run, Quest Moment is defined in player-facing copy, range lines are explained in beginner language, and Pattern Library access is more visible before and after runs. Generator logic, answer pool, Pattern Bible fairness, replay sequencing, location realism, scoring, timer, chart layout, result screen, and missed-read coach behavior remain unchanged.

v27.2 keeps the v27.0 World 1 gameplay baseline locked and preserves v27.1 onboarding while improving the Pattern Library as a beginner study reference. The World 1 cards now present meaning, what to look for, usual location, and common confusion in quick-scan rows, with Range High, Channel Mean, and Range Low explained in simple location language. Generator logic, answer pool, Pattern Bible validation, replay sequencing, location realism, scoring, timer, chart layout, result screen, and missed-read coach behavior remain unchanged.

v27.3 keeps the v27.0 World 1 gameplay baseline locked and prepares the game for first external testers with small clarity polish. The home screen now points directly at World 1: Candle Basics, the first-run helper clarifies that answer buttons unlock at Quest Moment, the visible Pattern Library stays focused on the five active World 1 answers, and the iPhone install tip stays home-only so it cannot cover gameplay or result actions. Generator logic, answer pool, Pattern Bible validation, replay sequencing, location realism, scoring, timer, chart layout, result flow, and missed-read coach behavior remain unchanged.

v27.4 keeps realistic World 1 location bias while reducing position-based shortcuts. Hammer and Shooting Star remain edge-first with occasional mean-adjacent setups, Bullish and Bearish Engulfing gain more Channel Mean control-shift scenarios, and Doji remains common at the mean without being automatic there. Pattern recipes, validation, answer pool, replay sequencing, scoring, timer, and presentation remain unchanged.

v27.5 adds a replay tempo progression loop without changing recognition time or World 1 generation. Beginner preserves the v27.4 setup pace and standard XP. Ten completed Beginner runs unlock Normal, which targets a roughly four-second replay and awards +10% XP. Twenty completed Normal runs unlock Speedrun, which targets a roughly three-second replay and awards +25% XP. Completed Speedrun runs track toward 30-run mastery. Counts and the last unlocked selection persist in localStorage, while the Quest Moment answer timer remains exactly 7 seconds.

v27.6 adds Mochi the Market Cat as the first cosmetic Familiar in the existing shop. Mochi costs 250 XP and supports insufficient-XP, buy, owned, equip, and equipped states. Ownership and equipment persist in localStorage; purchase auto-equips Mochi. When equipped, the compact pixel familiar appears on home and result screens with simple CSS reactions, including a Perfect Run rainbow sparkle and a Bad Luck sleepy loaf. Mochi is cosmetic only and provides no gameplay advantage.

v27.6.1 adds hidden developer preview tools behind `?dev=1`. Dev mode shows a clear badge, temporarily permits all replay tempos, and adds shop controls for `500 XP` grants and Mochi ownership resets. Preview-only tempo access does not persist selection or unlock progress, all tools disappear when the flag is removed, and normal gameplay remains unchanged.

v27.6.2 makes those dev tools obvious without changing their scope. When `?dev=1` is active, compact `DEV TOOLS` panels appear on Home and near the top of the Shop with `Add 500 XP` and `Reset Mochi` actions and immediate feedback. The panels, buttons, and `DEV PREVIEW` badge remain hidden from normal users, and normal gameplay is unchanged.

v27.7 adds Candle Lens, a guided visual preview before the first World 1 run. Five curated frozen-chart examples isolate the active World 1 signals in a rectangular inspection lens with concise visual cues and optional deeper explanations. Players can replay it through `Review Patterns`; completing all five cards awards a one-time `+50 XP` Study Bonus, while skipping and reviewing cannot farm XP. Preview state is isolated from live runs, and the World 1 generator and Pattern Bible remain unchanged.

---

## World structure

### World 1 — Candle Basics

Current active World 1 answer pool:

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

`Bullish Candle` and `Bearish Candle` are not active World 1 quiz answers.

Reference concepts being developed for future doctrine work:

- Hammer
- Shooting Star
- Doji
- Bullish Candle
- Bearish Candle
- Bullish Rejection
- Bearish Rejection

Important note:

`Bullish Candle` and `Bearish Candle` are basic single-candle direction concepts. They are not the same as `Bullish Engulfing` and `Bearish Engulfing`, which are two-candle patterns.

v26.1 keeps Bullish/Bearish Engulfing as active gameplay patterns while using doctrine-based logic for single-candle patterns.

### World 2 — Levels

- Support Reclaim
- Resistance Reject
- Mean Chop
- Range Bounce
- Level Break

### World 3 — Breakouts

- Clean Breakout
- Failed Breakout
- Breakdown
- Retest Hold
- Range Expansion

### World 4 — Trend

- Uptrend Continuation
- Downtrend Continuation
- Trend Break
- Pullback Hold
- Lower High

### World 5 — Risk Brain

- Good Read Bad Trade
- No-Trade Chop
- Stop Too Tight
- Stop Too Wide
- Clean Plan

---

## v26.2.2 focus

v26.2.2 upgrades the missed-read review into a swipeable **Missed Reads Coach Carousel**.

Primary focus:

- keep the active gameplay loop fast and uninterrupted
- group missed reads by correct pattern
- show all missed pattern types from the run
- replace compact grid cards with larger coach slides
- add generic chart-style visuals for each missed World 1 pattern
- include one simple shape cue and one key level cue per slide
- support iPhone horizontal swipe
- support desktop arrows, dots, and horizontal scroll
- preserve the v26.1.1 renderer, v26.1 generator, answer pool, XP, scoring, timer, static answer dock, Pattern Library, shop, mobile layout, and desktop layout

This build should be tested on desktop and iPhone to confirm the summary feels more visual, intuitive, and swipe-friendly without bloating the post-run flow.

---

## Development philosophy

Current mantra:

> Polish the existing core until every question feels fair. Then expand.

Design filter:

> Does this feature move the player from recognising shapes toward reading market behaviour?

Do not rush new worlds yet.

The current priority is:

1. make existing questions fair
2. make generated candles respect doctrine
3. make rendered candles visually trustworthy
4. prevent repetitive pattern sequences
5. align Pattern Library language with gameplay
6. build the Pattern Bible as the source of truth

---

## World 1 Pattern Bible v1.0

The Pattern Bible defines the law for Candle Quest. In v26.4, the Pattern Library and missed-read coach cues for the five active World 1 answers were aligned to this source of truth. In v26.5, the World 1 generator is tightened against the same definitions.

Active World 1 answer pool:

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

### Hammer

Core definition: A bullish rejection-style candle with a small body near the top of its range and a long lower wick.

Must-have: Small-to-medium body, body near the top of the full range, clearly long lower wick at least 2x the body size, very small or absent upper wick, and open/close near the candle high.

Invalid if: Lower wick is not clearly longer than the body, body is centered, upper wick is large, it looks more like a Doji, or open/close are too far from the high.

Player cue: Small body near the top, long wick rejecting lower prices.

Common confusion: Doji, Bullish Engulfing.

### Shooting Star

Core definition: A bearish rejection-style candle with a small body near the bottom of its range and a long upper wick.

Must-have: Small-to-medium body, body near the bottom of the full range, clearly long upper wick at least 2x the body size, very small or absent lower wick, and open/close near the candle low.

Invalid if: Upper wick is not clearly longer than the body, body is centered, lower wick is large, it looks more like a Doji, or open/close are too far from the low.

Player cue: Small body near the bottom, long wick rejecting higher prices.

Common confusion: Doji, Bearish Engulfing.

### Doji

Core definition: A neutral indecision candle where open and close are nearly the same.

Must-have: Very small body, open and close nearly the same, body roughly centered within the full range, balanced upper/lower wicks, and neither wick dominating.

Invalid if: Body is too large, one wick is much longer than the other, it clearly rejects one side like a Hammer or Shooting Star, body is strongly near the top or bottom, or it clearly communicates bullish/bearish rejection.

Player cue: Tiny body, balanced wicks, indecision.

Common confusion: Hammer, Shooting Star.

### Bullish Engulfing

Core definition: A two-candle bullish reversal pattern where a bullish candle fully engulfs the previous bearish candle's body.

Must-have: Two candles, first bearish, second bullish, second body completely engulfs the first body, second opens below or near the first close, second closes above the first open, and the second body is clearly larger.

Invalid if: First candle is not bearish, second candle is not bullish, only the wick is engulfed, second candle does not close above the first open, bodies are too similar in size, or the second candle looks like a normal bullish candle.

Player cue: Bearish candle first, then a stronger bullish body swallows it.

Common confusion: Hammer, Bullish rejection.

### Bearish Engulfing

Core definition: A two-candle bearish reversal pattern where a bearish candle fully engulfs the previous bullish candle's body.

Must-have: Two candles, first bullish, second bearish, second body completely engulfs the first body, second opens above or near the first close, second closes below the first open, and the second body is clearly larger.

Invalid if: First candle is not bullish, second candle is not bearish, only the wick is engulfed, second candle does not close below the first open, bodies are too similar in size, or the second candle looks like a normal bearish candle.

Player cue: Bullish candle first, then a stronger bearish body swallows it.

Common confusion: Shooting Star, Bearish rejection.

### Generator fairness rules

- Hammer must not look like a Doji.
- Shooting Star must not look like a Doji.
- Doji must not look like a Hammer or Shooting Star.
- Bullish Engulfing must clearly engulf the prior bearish body.
- Bearish Engulfing must clearly engulf the prior bullish body.
- Engulfing patterns should be visibly two-candle patterns, not single-candle rejection patterns.
- Rejection candles should be visibly single-candle patterns, not engulfing patterns.
- Distractor answers may be plausible, but the correct answer must be visually defensible.
- If a candle could reasonably be two World 1 answers, the generator should reject it and regenerate.

These fairness rules are enforced by the v26.5 World 1 generator fairness pass and preserved by the v26.6 candle rhythm and engulfing replay sequencing pass.

---

## Future Pattern Bible extensions

The Pattern Bible defines the law for Candle Quest.

Each pattern should eventually include:

- simple definition
- what must always be true
- what it means
- what it is not
- common confusions
- valid screenshots
- annotated screenshots
- generator requirements

The player should learn:

```text
Market Behaviour → Pattern
```

rather than:

```text
Pattern → Memorisation
```

---

## Next intended work

Suggested next sequence:

```text
v26.6 - World 1 Candle Rhythm + Engulfing Replay Sequencing
v26.6.1 - Chart Overlay Cleanup
v26.7 - World 1 Location Logic Pass
v26.8 - World 1 QA / Ambiguity Sweep
v26.8.1 - Opaque Guide Removal
v26.9 - World 1 Lockdown Candidate
v27.0 - World 1 Lockdown
v27.1 - First Player Onboarding Polish
v27.2 - Pattern Library Polish
v27.3 - First Tester Readiness Pass
v27.4 - Location Probability Tuning
v27.5 - Replay Tempo Unlocks
v27.6 - Mochi Store Prototype
v27.6.1 - Dev Preview Tools
v27.6.2 - Dev Tools Visibility Patch
v27.7 - Candle Lens Pattern Preview
v27.8 - Study Progress Foundations
```

World 1 gameplay is locked at the v27.0 stable baseline. Future work should preserve that gameplay baseline unless a new checkpoint explicitly changes behaviour.

---

## How to run locally

### Option 1 — Open directly

Open `index.html` in a browser.

### Option 2 — Use the launcher

On Windows, run:

```text
START_GAME.bat
```

---

## GitHub Pages notes

Expected root structure:

```text
index.html
style.css
game.js
manifest.webmanifest
README.md
CHANGELOG.md
CHECKPOINT_SUMMARY.md
START_GAME.bat
icons/
```

Use a cache-busting URL after uploading a new build, for example:

```text
https://jwsmatt-pixel.github.io/CandleQuestReborn-Dev/?fresh=2780
https://jwsmatt-pixel.github.io/CandleQuestReborn-Dev/?fresh=2780&dev=1
```
