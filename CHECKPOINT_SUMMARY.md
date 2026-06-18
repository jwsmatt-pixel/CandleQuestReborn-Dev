# Candle Quest Reborn - v26.4 Checkpoint Summary

## Current build

**v26.4 - World 1 Pattern Bible Lock**
Build marker: `v26_4_world1_pattern_bible_lock`

## Base build

**v26.3.0 - Chart Viewport Unification**
Build marker: `v26_3_0_chart_viewport_unification`

## Current status

Active development checkpoint.

v26.4 should be treated as the current World 1 Pattern Bible source-of-truth build. It preserves the v26.3.0 chart viewport unification build, the v26.2.12 mobile result hero-parity build, the v26.2.11 mobile result hero header structure, the v26.2.10 mobile result vertical layout and score-summary structure, the v26.2.7 mobile result coach overlay, desktop carousel arrows, and mobile swipe behaviour.

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

## What changed in v26.4

### Code / game state

- Updated the build marker and build badge to v26.4.
- Locked the five active World 1 Pattern Library entries to World 1 Pattern Bible v1.0 wording.
- Added must-have and invalid-if Bible detail rows to the five active World 1 Pattern Library entries.
- Updated missed-read coach card shapes/cues for the five active World 1 patterns to use the Bible player cues.
- Documented World 1 Pattern Bible v1.0 in README and this checkpoint summary.
- Clearly documented that Bullish Candle and Bearish Candle are not active World 1 quiz answers.
- Left generator behavior, gameplay, scoring, XP, timer, chart rendering, result screen layout, and coach carousel behavior unchanged.

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
- v26.3.0 chart viewport unification
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

Bullish Candle and Bearish Candle are not active World 1 quiz answers.

## World 1 Pattern Bible v1.0

The Pattern Bible is the current source of truth for the five active World 1 answers. Pattern Library wording and missed-read coach cues should align to these definitions.

### Hammer

- Core definition: A bullish rejection-style candle with a small body near the top of its range and a long lower wick.
- Must-have: Small-to-medium body, body near the top of the full range, clearly long lower wick at least 2x the body size, very small or absent upper wick, and open/close near the candle high.
- Invalid if: Lower wick is not clearly longer than the body, body is centered, upper wick is large, it looks more like a Doji, or open/close are too far from the high.
- Player cue: Small body near the top, long wick rejecting lower prices.
- Common confusion: Doji, Bullish Engulfing.

### Shooting Star

- Core definition: A bearish rejection-style candle with a small body near the bottom of its range and a long upper wick.
- Must-have: Small-to-medium body, body near the bottom of the full range, clearly long upper wick at least 2x the body size, very small or absent lower wick, and open/close near the candle low.
- Invalid if: Upper wick is not clearly longer than the body, body is centered, lower wick is large, it looks more like a Doji, or open/close are too far from the low.
- Player cue: Small body near the bottom, long wick rejecting higher prices.
- Common confusion: Doji, Bearish Engulfing.

### Doji

- Core definition: A neutral indecision candle where open and close are nearly the same.
- Must-have: Very small body, open and close nearly the same, body roughly centered within the full range, balanced upper/lower wicks, and neither wick dominating.
- Invalid if: Body is too large, one wick is much longer than the other, it clearly rejects one side like a Hammer or Shooting Star, body is strongly near the top or bottom, or it clearly communicates bullish/bearish rejection.
- Player cue: Tiny body, balanced wicks, indecision.
- Common confusion: Hammer, Shooting Star.

### Bullish Engulfing

- Core definition: A two-candle bullish reversal pattern where a bullish candle fully engulfs the previous bearish candle's body.
- Must-have: Two candles, first bearish, second bullish, second body completely engulfs the first body, second opens below or near the first close, second closes above the first open, and the second body is clearly larger.
- Invalid if: First candle is not bearish, second candle is not bullish, only the wick is engulfed, second candle does not close above the first open, bodies are too similar in size, or the second candle looks like a normal bullish candle.
- Player cue: Bearish candle first, then a stronger bullish body swallows it.
- Common confusion: Hammer, Bullish rejection.

### Bearish Engulfing

- Core definition: A two-candle bearish reversal pattern where a bearish candle fully engulfs the previous bullish candle's body.
- Must-have: Two candles, first bullish, second bearish, second body completely engulfs the first body, second opens above or near the first close, second closes below the first open, and the second body is clearly larger.
- Invalid if: First candle is not bullish, second candle is not bearish, only the wick is engulfed, second candle does not close below the first open, bodies are too similar in size, or the second candle looks like a normal bearish candle.
- Player cue: Bullish candle first, then a stronger bearish body swallows it.
- Common confusion: Shooting Star, Bearish rejection.

### Generator fairness rules for next pass

- Hammer must not look like a Doji.
- Shooting Star must not look like a Doji.
- Doji must not look like a Hammer or Shooting Star.
- Bullish Engulfing must clearly engulf the prior bearish body.
- Bearish Engulfing must clearly engulf the prior bullish body.
- Engulfing patterns should be visibly two-candle patterns, not single-candle rejection patterns.
- Rejection candles should be visibly single-candle patterns, not engulfing patterns.
- Distractor answers may be plausible, but the correct answer must be visually defensible.
- If a candle could reasonably be two World 1 answers, the generator should reject it and regenerate.

These fairness rules are documented only. v26.4 does not rewrite the generator.

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
?fresh=2640
```

Then check:

1. Desktop app loads
2. iPhone/mobile app loads
3. Start Run works
4. Active World 1 answer pool remains Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji
5. Bullish Candle and Bearish Candle do not appear as active World 1 quiz answers
6. Pattern Library entries match World 1 Pattern Bible v1.0
7. Missed-read coach card cues align with World 1 Pattern Bible v1.0
8. Chart renders immediately after Start Run
9. iPhone/mobile chart keeps the existing compact framing
10. Desktop half-width chart remains compact, centered, and readable
11. Desktop full-width uses the v26.3.0 compact recent-candle viewport
12. Candle render quality remains clean, including tiny-body/doji handling
13. Range High, Channel Mean, and Range Low remain visible
14. Setup zone and Quest zone highlights still appear correctly
15. Quest Moment timing and replay behaviour still work
16. Answer dock remains below the chart and tappable
17. Timer still works
18. Run completes normally
19. Result summary still works
20. Review missed reads still works
21. Desktop result flow remains readable
22. Desktop carousel arrows still work
23. No numbered pagination appears
24. Gameplay/scoring/XP/timer/generator remain unchanged

## Known watch points

- Full-width desktop should be visually checked against desktop half-width and iPhone because the patch intentionally changes only the active rendered slice, not the retained candle history.
- Desktop now renders fewer active candles than its retained buffer, so any future replay/debug feature that expects every retained candle to be visible should account for the viewport slice.
- The mobile hero parity pass should still be visually checked on a real iPhone because Safari text metrics can differ from desktop emulation.
- The bottom-sheet height may still need device-specific tuning after real iPhone testing.
- Coach carousel slides remain generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.4.
- The generator fairness pass remains separate from this wording/source-of-truth patch.

## Next intended work

Recommended sequence:

```text
v26.5 - World 1 Generator Fairness Pass
v26.6 - Natural Candle Rhythm Pass
v26.7 - Comparative Coach Cards / Confusion Pair Tracking
v26.8 - Engulfing Doctrine Engine
```

Do not combine generator fairness, market rhythm, comparative cards, and engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.
