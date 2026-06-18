# Candle Quest Reborn - v26.2.11 Checkpoint Summary

## Current build

**v26.2.11 - Mobile Result Hero Header**
Build marker: `v26_2_11_mobile_result_hero_header`

## Base build

**v26.2.10 - Mobile Result Header Scale Bump**
Build marker: `v26_2_10_mobile_result_header_scale_bump`

## Current status

Active development checkpoint.

v26.2.11 should be treated as the current mobile result hero-header build. It preserves the v26.2.10 mobile result vertical layout and score-summary structure, the v26.2.8 score-header structure, the v26.2.7 mobile result coach overlay, the v26.2.6 vertical balance, the v26.2.5 result-flow QA lock on desktop, the v26.2.2 coach carousel content, desktop carousel arrows, and mobile swipe behaviour.

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

## What changed in v26.2.11

### Code / game state

- Updated the build marker and build badge to v26.2.11.
- Increased only the mobile score-header typography scale inside the existing score-header contract.
- Enlarged RUN COMPLETE and CORRECT READS so the result header reads as a strong hero on iPhone.
- Increased the X/10 score so it is clearly the dominant result focal point.
- Slightly strengthened the run title so it stays balanced with the larger score.
- Preserved the v26.2.10 centered alignment, margins, result card placement, and score-summary structure.
- Preserved the v26.2.7 missed-reads review bottom-sheet overlay layered over the score summary.
- Kept desktop on the existing separate review step, with side arrows preserved.
- Kept the existing coach carousel markup, cards, content, grouping, and swipe behaviour.
- Left gameplay, scoring, XP, timer, generator, answer pool, and library content untouched.

### Preserved

- v26.2.10 mobile result header alignment and spacing
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
?fresh=26210
```

Then check:

1. Desktop app loads
2. iPhone/mobile app loads
3. Start Run works
4. Complete a run with at least one missed read
5. Mobile result lands on the score summary as the main screen
6. RUN COMPLETE, run title, X/10, CORRECT READS, and feedback sentence remain centered and evenly spaced
7. RUN COMPLETE and CORRECT READS feel much larger and more readable on iPhone
8. X/10 score feels larger and clearly becomes the result focal point
9. Feedback sentence is larger, readable, and not squeezed
10. Score summary keeps the v26.2.10 alignment and vertical balance on iPhone
11. Larger header text does not overlap or create awkward scrolling
12. Review missed reads opens the coach carousel as a bottom-sheet overlay
13. Coach overlay can be dismissed back to score summary
14. Coach carousel still swipes on iPhone
15. Play Again remains tappable
16. Lesson Map remains tappable
17. Review missed reads remains tappable
18. Desktop result flow remains readable
19. Desktop carousel arrows still work
20. No numbered pagination appears
21. Homepage still shows Candle Quest title, XP, and Shop
22. Result screen still hides homepage title, XP, and Shop
23. Gameplay/scoring/timer/generator remain unchanged

## Known watch points

- The larger mobile header scale should be visually checked on a real iPhone because Safari text metrics can differ from desktop emulation.
- The bottom-sheet height may still need device-specific tuning after real iPhone testing.
- Coach carousel slides remain generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.2.11.
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
