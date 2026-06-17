# Candle Quest Reborn - v26.2.7 Checkpoint Summary

## Current build

**v26.2.7 - Mobile Result Coach Overlay**
Build marker: `v26_2_7_mobile_result_coach_overlay`

## Base build

**v26.2.6 - Mobile Result Vertical Balance**
Build marker: `v26_2_6_mobile_result_vertical_balance`

## Current status

Active development checkpoint.

v26.2.7 should be treated as the current mobile result coach-overlay build. It preserves the v26.2.6 locked mobile summary typography, the v26.2.5 result-flow QA lock on desktop, the v26.2.2 coach carousel content, desktop carousel arrows, and mobile swipe behaviour.

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

## What changed in v26.2.7

### Code / game state

- Updated the build marker and build badge to v26.2.7.
- Rebalanced the mobile result score card so the score summary sits closer to the middle of the iPhone viewport.
- Kept the existing score, title, and comment font sizes from the prior mobile result polish.
- Changed the mobile missed-reads review from a separate full result step into a bottom-sheet overlay layered over the score summary.
- Kept desktop on the existing separate review step, with side arrows preserved.
- Kept the existing coach carousel markup, cards, content, grouping, and swipe behaviour.
- Left gameplay, scoring, XP, timer, generator, answer pool, and library content untouched.

### Preserved

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
?fresh=2627
```

Then check:

1. Desktop app loads
2. iPhone/mobile app loads
3. Start Run works
4. Complete a run with at least one missed read
5. Mobile result lands on the score summary as the main screen
6. Score/title/comment sizes remain unchanged from v26.2.6
7. Score summary feels centred and balanced on iPhone
8. Review missed reads opens the coach carousel as a bottom-sheet overlay
9. Coach overlay can be dismissed back to score summary
10. Coach carousel still swipes on iPhone
11. Play Again remains tappable
12. Lesson Map remains tappable
13. Desktop result flow remains readable
14. Desktop carousel arrows still work
15. No numbered pagination appears
16. Homepage still shows Candle Quest title, XP, and Shop
17. Result screen still hides homepage title, XP, and Shop
18. Gameplay/scoring/timer/generator remain unchanged

## Known watch points

- The bottom-sheet height may still need device-specific tuning after real iPhone testing.
- Coach carousel slides remain generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.2.7.
- The larger market-rhythm issue remains separate: background candles can still feel too flat or low-volatility.

## Next intended work

Recommended sequence:

```text
v26.3 - Natural Candle Rhythm Pass
v26.4 - Comparative Coach Cards / Confusion Pair Tracking
v26.5 - Engulfing Doctrine Engine
```

Do not combine market rhythm, comparative cards, and engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.