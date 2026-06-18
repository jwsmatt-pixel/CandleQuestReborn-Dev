# Candle Quest Reborn - v26.9 Checkpoint Summary

## Current build

**v26.9 - World 1 Lockdown Candidate**
Build marker: `v26_9_world1_lockdown_candidate`

## Base build

**v26.3.0 - Chart Viewport Unification**
Build marker: `v26_3_0_chart_viewport_unification`

## Current status

Active development checkpoint / World 1 lockdown candidate.

v26.9 should be treated as the current World 1 lockdown-candidate pass. It preserves the v26.8.1 opaque guide removal build, the v26.8 World 1 QA / ambiguity sweep build, the v26.7 location logic build, the v26.6.1 chart overlay cleanup build, the v26.6 World 1 candle rhythm and engulfing replay sequencing build, the v26.5 generator fairness build, the v26.4 Pattern Bible wording/source-of-truth build, the v26.3.0 chart viewport unification build, the v26.2.12 mobile result hero-parity build, the v26.2.11 mobile result hero header structure, the v26.2.10 mobile result vertical layout and score-summary structure, the v26.2.7 mobile result coach overlay, desktop carousel arrows, and mobile swipe behaviour.

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

## What changed in v26.9

### Code / game state

- Updated the build marker and build badge to v26.9 World 1 Lockdown Candidate.
- Froze the active World 1 answer-pool array so the five-answer pool cannot be mutated at runtime.
- Disabled generator debug logging for release-candidate console cleanliness.
- Removed an accidental implicit global assignment from the generator debug logger in case debug logging is re-enabled later.
- Preserved the v26.8.1 removal of player-facing setup-zone and Quest-zone guide rectangles.
- Preserved the v26.8 active pattern source and stricter Bullish/Bearish Engulfing body-boundary validation.
- Left v26.7 location profiles and setup-story weighting unchanged.
- Preserved the Range High, Channel Mean, and Range Low lines and labels.
- Preserved v26.6.1 chart overlay cleanup and removed the remaining opaque guide boxes.
- Preserved v26.6 World 1 candle rhythm, setup stories, and Bullish/Bearish Engulfing replay sequencing.
- Preserved v26.5 Hammer, Shooting Star, Doji, and Engulfing final-candle validation.
- Left Pattern Bible wording, gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library, and coach carousel behavior unchanged.

### Preserved

- v26.2.11 mobile result header structure
- v26.2.12 mobile result hero parity
- v26.2.10 mobile result vertical layout
- v26.2.7 mobile result coach overlay
- v26.2.2 coach carousel content
- v26.2.5 desktop result-flow lock
- v26.2 missed-read tracking
- v26.1.1 tiny candle renderer cleanup
- v26.4 Pattern Bible wording
- v26.5 generator fairness validation
- v26.1 generator structure and diversity flow
- v26.1 diversity logic
- v26.3.0 chart viewport unification
- v26.6 candle rhythm and engulfing replay sequencing
- v26.6.1 chart overlay cleanup
- v26.8 World 1 QA / ambiguity sweep
- v26.8.1 opaque guide removal
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
?fresh=269
```

Then check:

1. Desktop app loads
2. iPhone/mobile app loads
3. Start Run works
4. Active World 1 answer pool remains Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji
5. Bullish Candle and Bearish Candle do not appear as active World 1 quiz answers
6. Hammer examples look clearly like Hammer, not Doji, and mostly appear near Range Low/support or after lower-channel pullback weakness
7. Shooting Star examples look clearly like Shooting Star, not Doji, and mostly appear near Range High/resistance or after upper-channel rally strength
8. Doji examples look clearly like Doji, not Hammer or Shooting Star, and mostly appear around Channel Mean hesitation/compression
9. Bullish Engulfing examples clearly engulf the prior bearish body and mostly appear near Range Low/support or after bearish pressure
10. Bearish Engulfing examples clearly engulf the prior bullish body and mostly appear near Range High/resistance or after bullish pressure
11. No World 1 pattern feels randomly placed
12. Controlled secondary-location variation remains visible without teaching advanced rare contexts
13. Distractors remain plausible but not unfair
14. Pattern Library entries match World 1 Pattern Bible v1.0
15. Missed-read coach card cues align with World 1 Pattern Bible v1.0
16. Chart renders immediately after Start Run
17. iPhone/mobile chart keeps the existing compact framing
18. Desktop half-width chart remains compact, centered, and readable
19. Desktop full-width uses the v26.3.0 compact recent-candle viewport
20. Candle render quality remains clean, including tiny-body/doji handling
21. Range High, Channel Mean, and Range Low remain visible
22. No opaque setup-zone or Quest-zone guide box is visible during replay/run or answer phase
23. Quest Moment timing and replay behaviour still work
24. Bullish Engulfing prior bearish candle appears before Quest Moment
25. Bullish Engulfing second green candle appears at Quest Moment
26. Bearish Engulfing prior bullish candle appears before Quest Moment
27. Bearish Engulfing second red candle appears at Quest Moment
28. Engulfing examples feel like a control shift instead of simultaneous pattern spawning
29. Answer dock remains below the chart and tappable
30. Timer still works
31. Run completes normally
32. Result summary still works
33. Review missed reads still works
34. Desktop result flow remains readable
35. Desktop carousel arrows still work
36. No numbered pagination appears
37. Gameplay/scoring/XP/timer remain unchanged

## Known watch points

- Full-width desktop should be visually checked against desktop half-width and iPhone because the patch intentionally changes only the active rendered slice, not the retained candle history.
- Desktop now renders fewer active candles than its retained buffer, so any future replay/debug feature that expects every retained candle to be visible should account for the viewport slice.
- The mobile hero parity pass should still be visually checked on a real iPhone because Safari text metrics can differ from desktop emulation.
- The bottom-sheet height may still need device-specific tuning after real iPhone testing.
- Coach carousel slides remain generic teaching cues, not exact replays of missed candles.
- Comparative coach cards are a future feature, not included in v26.9.
- Generator fairness is preserved through validation and retry rules, but location weighting still needs human visual sampling across many runs.

## Next intended work

Recommended sequence:

```text
v27.0 - World 1 Lockdown
v27.1+ - Future World 1 teaching expansions after lockdown
```

Do not combine lockdown, market rhythm changes, comparative cards, and deeper engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.
