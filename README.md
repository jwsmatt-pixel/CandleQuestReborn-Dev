# Candle Quest Reborn

**Current build:** `v26.2.8 - Mobile Result Header Lock`  
**Build marker:** `v26_2_8_mobile_result_header_lock`  
**Base:** `v26.2.3 · Result Flow Stepper`  
**Status:** Active development / iOS result-screen header lock

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
- Pattern Library
- basic cosmetic shop scaffold

### Visual identity

- mobile-first layout
- desktop compatibility
- solid Range High line
- dashed Channel Mean line
- solid Range Low line
- transparent setup-zone guidance
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

---

## World structure

### World 1 — Candle Basics

Current active gameplay patterns:

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

Current doctrine/reference concepts being developed:

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

## Pattern Bible direction

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
v26.3 · Natural Candle Rhythm Pass
v26.4 · Engulfing Doctrine Engine
```

The next larger quality issue is that background candle sequences can still feel too flat or low-volatility. That should be addressed separately from this v26.2 learning-review patch.

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
?fresh=262
```
