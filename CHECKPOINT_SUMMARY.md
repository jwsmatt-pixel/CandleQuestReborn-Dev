# Candle Quest Reborn — v26.2.3 Checkpoint Summary

## Current build

**v26.2.3 · Result Flow Stepper**  
Build marker: `v26_2_3_result_flow_stepper`

## Base build

**v26.2.2 · Missed Reads Coach Carousel**  
Build marker: `v26_2_2_missed_reads_coach_carousel`

## Current status

Active development checkpoint.

The project now has the clean v26 documentation/package foundation, the v26.1 generator doctrine engine, the v26.1.1 tiny candle renderer cleanup, and a more visual end-of-run review layer.

v26.2.3 should be treated as the current result-flow test build until desktop and iPhone testing confirms the two-step summary reduces vertical scroll while preserving the coach carousel learning value.

## Core design doctrine

Candle Quest should not teach players to memorise chart shapes alone. It should train players to read market behaviour.

Master learning ladder:

```text
Shape → Location → Context → Quality → Risk → Execution
```

World 1 starts with shape recognition. Future worlds should add one decision layer at a time.

Feature filter:

```text
Does this feature move the player from recognising shapes toward reading market behaviour?
```

## What this package contains

- `index.html`
- `style.css`
- `game.js`
- `manifest.webmanifest`
- `README.md`
- `CHANGELOG.md`
- `CHECKPOINT_SUMMARY.md`
- `START_GAME.bat`
- `icons/icon-192.png`
- `icons/icon-512.png`

## What changed in v26.2.3

### Code / game state

- Updated the build marker and build badge to v26.2.3.
- Preserved the v26.2.2 coach carousel visuals and missed-read grouping.
- Split the result screen into two steps:
  - score step first
  - missed-reads coach carousel second
- Added `showResultStep()` for navigating between result steps.
- Removed numbered carousel dots under the coach carousel.
- Kept side arrows on desktop and horizontal swipe on iPhone.
- Hid the global Candle Quest header and XP/Shop wallet on the result screen.
- Reduced the mobile `X/10` score size slightly.
- Kept the feature focused on Shape + Location learning while reducing vertical scroll on iOS.

### Preserved

- v26.2.2 coach carousel
- v26.2 missed-read tracking
- v26.1.1 tiny candle renderer cleanup
- v26.1 generator recipes
- v26.1 validation logic
- v26.1 diversity logic
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile gameplay layout
- desktop gameplay layout
- progression

## Current World 1 active answer pool

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

## Current review philosophy

The review screen should be a visual coach screen, not a literary review.

Current rule:

```text
Pattern shape + key level + one cue
```

Comparative coach cards are intentionally deferred. For now, each missed pattern receives one generic visual coach slide in the carousel. Later builds can compare common confusion pairs such as:

- Hammer vs Bullish Engulfing
- Shooting Star vs Bearish Engulfing
- Support Reclaim vs Range Bounce
- Clean Breakout vs Range Expansion

## Next recommended test

Use GitHub Pages with:

```text
?fresh=2621
```

Then check:

1. Desktop full run with multiple wrong answers
2. iPhone full run with multiple wrong answers
3. Timeout behaviour records a missed read
4. Missed reads group by pattern
5. All missed pattern types appear
6. No `review later` language appears
7. Coach carousel slides are readable on mobile
8. Clean/perfect run summary stays uncluttered
9. Tiny candle/doji rendering still looks clean
10. Hammer / Shooting Star / Doji readability
11. Bullish/Bearish Engulfing readability
12. Pattern answer labels remain correct
13. Repetition/diversity still feels controlled
14. Pattern Library opens
15. Add to Home Screen / PWA behaviour remains unchanged

## Known watch points

- Coach carousel slides may need tighter mobile spacing after iPhone testing.
- The visual icons are generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.2.2.
- The larger market-rhythm issue remains separate: background candles can still feel too flat or low-volatility.

## Next intended work

Recommended sequence:

```text
v26.3 · Natural Candle Rhythm Pass
v26.4 · Comparative Coach Cards / Confusion Pair Tracking
v26.5 · Engulfing Doctrine Engine
```

Do not combine market rhythm, comparative cards, and engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.
