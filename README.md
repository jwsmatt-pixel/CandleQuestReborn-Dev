# Candle Quest Reborn

**Current build:** `v26.1 · World 1 Generator Doctrine Engine`  
**Build marker:** `v26_1_world1_generator_doctrine_engine`  
**Status:** Active development / generator-doctrine testing checkpoint

---

## What is Candle Quest?

Candle Quest Reborn is a mobile-first chart-reading game built to turn candlestick recognition into deliberate practice.

The long-term vision is to become a **trader's gym**: simple on the surface, intelligent underneath, and focused on repeated high-quality chart-reading reps.

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

### Current engine work

v26.1 introduces the first doctrine-based generator layer for World 1.

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

## v26.1 focus

v26.1 is a generator-doctrine testing checkpoint.

Primary focus:

- World 1 candle structure quality
- recipe-based generation
- validation rules
- anti-repeat pattern diversity
- smoother candle continuity
- clearer distinction between similar single-candle ideas

This build should be treated as a test checkpoint until World 1 has been manually audited on desktop and iPhone.

---

## Development philosophy

Current mantra:

> Polish the existing core until every question feels fair. Then expand.

Do not rush new worlds yet.

The current priority is:

1. make existing questions fair
2. make generated candles respect doctrine
3. prevent repetitive pattern sequences
4. align Pattern Library language with gameplay
5. build the Pattern Bible as the source of truth

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

## How to run locally

### Option 1 — Open directly

Open `index.html` in a browser.

### Option 2 — Use local server on Windows

Double click:

```text
START_GAME.bat
```

Then open:

```text
http://127.0.0.1:8123
```

---

## iPhone / PWA testing

Recommended:

1. Upload the folder to GitHub Pages or another static host.
2. Open the page in Safari.
3. Tap Share.
4. Tap Add to Home Screen.

This build includes:

- mobile web app meta tags
- PWA manifest
- app icons
- touch-first layout
- iPhone install tip

---

## GitHub Pages cache busting

After uploading a new build, use a fresh query string:

```text
?fresh=261
```

Example:

```text
https://your-github-pages-url/?fresh=261
```

---

## Recommended test checklist

Before calling v26.1 stable, verify:

- Start Run works
- candles render immediately
- static answer dock appears during setup
- placeholder answers appear before Quest Moment
- Quest Moment appears
- real answer labels appear in the dock
- timer shows `—` during replay/setup
- 7-second timer starts only during Quest Moment
- answer buttons work
- score does not double count
- streak tracker works
- `STREAK LOST` still flashes/shakes
- live `+XP` beside score still works
- run ends after 10 Quest Moments
- summary page works
- Pattern Library opens
- desktop only shows one XP/Shop block
- mobile chart remains readable
- full Quest Map channel remains visible
- same pattern does not repeat 3–4 times in a row
- Hammer / Shooting Star / Doji examples visually respect doctrine
- Bullish Engulfing and Bearish Engulfing remain active where expected

---

## Project principle

The game should stay simple on the surface and become more intelligent underneath.

The Pattern Bible defines the law.

The generator should obey the law.
