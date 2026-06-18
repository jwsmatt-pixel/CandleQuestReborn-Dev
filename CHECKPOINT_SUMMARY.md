# Candle Quest Reborn - v26.3.0 Checkpoint Summary

## Current build

**v26.3.0 - Chart Viewport Unification**
Build marker: `v26_3_0_chart_viewport_unification`

## Base build

**v26.2.12 - Mobile Result Hero Parity**
Build marker: `v26_2_12_mobile_result_hero_parity`

## Current status

Active development checkpoint.

v26.3.0 should be treated as the current chart viewport unification build. It preserves the v26.2.12 mobile result hero-parity build, the v26.2.11 mobile result hero header structure, the v26.2.10 mobile result vertical layout and score-summary structure, the v26.2.7 mobile result coach overlay, the v26.2.6 vertical balance, the v26.2.5 result-flow QA lock on desktop, the v26.2.2 coach carousel content, desktop carousel arrows, and mobile swipe behaviour.

## Core design doctrine

Candle Quest should not teach players to memorise chart shapes alone. It should train players to read market behaviour.

Master learning ladder:

```text
Shape -> Location -> Context -> Quality -> Risk -> Execution
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

## What changed in v26.3.0

### Code / game state

- Updated the build marker and build badge to v26.3.0.
- Capped the active desktop gameplay chart viewport to a compact recent-candle slice.
- Bypassed the old wide-desktop behaviour where the renderer used the full retained desktop candle buffer.
- Gave desktop the same compact stage-span philosophy as mobile so full-width desktop stays close to the iOS and half-width chart read.
- Kept desktop candles readable and anchored near the focus zone without changing the v26.1.1 candle renderer cleanup.
- Preserved Range High, Channel Mean, Range Low, setup zone, Quest zone highlight, answer dock, Quest Moment timing, and replay behaviour.
- Preserved the v26.2.12 score-header structure, centered alignment, result card placement, and score-summary flow.
- Preserved the v26.2.7 missed-reads review bottom-sheet overlay layered over the score summary.
- Kept desktop on the existing separate review step, with side arrows preserved.
- Kept the existing coach carousel markup, cards, content, grouping, and swipe behaviour.
- Left gameplay, scoring, XP, timer, generator, answer pool, and library content untouched.

### Preserved

- v26.2.11 mobile result header structure
- v26.2.12 mobile result hero parity
- v26.2.10 mobile result vertical layout
- v26.2.7 mobile result coach overlay
- v26.2.2 coach carousel content
- v26.2.5 desktop result-flow lock
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

The review should feel like coaching attached to the score page, not a disconnected second result window.

Current rule:

```text
Score summary remains the base screen; missed-read coaching opens as a dismissible mobile overlay.
```

Coach slide content remains:

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
?fresh=2630
```

Then check:

1. Desktop app loads
2. iPhone/mobile app loads
3. Start Run works
4. Chart renders immediately after Start Run
5. iPhone/mobile chart keeps the existing compact framing
6. Desktop half-width chart remains compact, centered, and readable
7. Desktop full-width chart no longer shows a much larger number of concurrent candles
8. Desktop full-width uses the compact recent-candle viewport instead of the full retained desktop buffer
9. Candle render quality remains clean, including tiny-body/doji handling
10. Range High, Channel Mean, and Range Low remain visible
11. Setup zone and Quest zone highlights still appear correctly
12. Quest Moment timing and replay behaviour still work
13. Answer dock remains below the chart and tappable
14. Timer still works
15. Run completes normally
16. Result summary still works
17. Review missed reads still works
18. Desktop result flow remains readable
19. Desktop carousel arrows still work
20. No numbered pagination appears
21. Homepage still shows Candle Quest title, XP, and Shop
22. Result screen still hides homepage title, XP, and Shop
23. Gameplay/scoring/XP/timer/generator remain unchanged

## Known watch points

- Full-width desktop should be visually checked against desktop half-width and iPhone because the patch intentionally changes only the active rendered slice, not the retained candle history.
- Desktop now renders fewer active candles than its retained buffer, so any future replay/debug feature that expects every retained candle to be visible should account for the viewport slice.
- The mobile hero parity pass should still be visually checked on a real iPhone because Safari text metrics can differ from desktop emulation.
- The bottom-sheet height may still need device-specific tuning after real iPhone testing.
- Coach carousel slides remain generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.3.0.
- The larger market-rhythm issue remains separate: background candles can still feel too flat or low-volatility.

## Next intended work

Recommended sequence:

```text
v26.4 - Natural Candle Rhythm Pass
v26.5 - Comparative Coach Cards / Confusion Pair Tracking
v26.6 - Engulfing Doctrine Engine
```

Do not combine market rhythm, comparative cards, and engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.
