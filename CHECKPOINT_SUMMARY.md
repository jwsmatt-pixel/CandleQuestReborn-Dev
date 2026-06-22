# Candle Quest Reborn - v28.0.3 Checkpoint Summary

## Current build

**v28.0.3 - W2 Label Size Tuning**
Build marker: `v28_0_3_w2_label_size_tuning`

## Base build

**v26.3.0 - Chart Viewport Unification**
Build marker: `v26_3_0_chart_viewport_unification`

## Current status

World 1 remains the locked/stable playable baseline. World 2 remains a playable early Support & Resistance prototype with a stable per-question teaching level and viewport.

## What changed in v28.0.3

- Reduced only the World 2 replay/chart `SUPPORT` and `RESISTANCE` labels from the oversized v28.0.2 treatment to a balanced, mobile-readable `22px`.
- Scaled the W2 label box and offset with the text while preserving its clearance from the teaching line.
- Left teaching-level placement, the World 2 generator, chart scaling, the locked viewport, and World 1 unchanged.

## What changed in v28.0.2

- World 2 now fixes one support or resistance value for the whole question instance.
- Support appears as a predictable low/floor teaching line; resistance appears as a predictable high/ceiling teaching line.
- Each World 2 scenario replays against a locked per-question viewport, preserving the same line placement and candle scale at Quest Moment.
- The previous teaching line is replaced when the next question starts, so only one relevant World 2 line is visible at a time.
- World 2 level labels are enlarged from the previous tiny chart text to mobile-readable `SUPPORT` and `RESISTANCE` labels.
- Replay-to-Quest-Moment line jumping is reduced without changing the answer dock, HUD, Lesson Map, result screen, Pattern Library, shop, Mochi UI, or app-wide theme.
- World 1 and World 2 gameplay, exact answer pools, 10-question runs, 7-second timer, scoring, XP, streaks, and supporting systems remain preserved.

## What changed in v28.0.1

- Refined the replay/chart window identity with a clean dark rounded panel, faint grid, consistent padding, and sharper candle and wick geometry.
- Removed the old World 2 parallel channel/range fallback. World 2 now shows only one relevant support or resistance line when its teaching level is active.
- Standardised Quest Moment badge language to `READ THE CANDLE` for World 1 and `READ THE LEVEL` for World 2.
- Removed phase-dependent chart width so candles no longer shift horizontally when replay freezes into Quest Moment.
- Replaced blurred fractional support/resistance strokes with snapped crisp teaching lines and tightened price padding slightly.
- Intentionally left the HUD, answer buttons and dock, Lesson Map, result screen, Pattern Library, shop, Mochi UI, footer, and app-wide theme unchanged.
- Preserved both playable generators, exact answer pools, 10-question runs, 7-second timer, scoring, XP, streaks, result flow, Dev Tools, Candle Lens, Study Progress, and mobile/desktop usability.

## What changed in v28.0

- World 2 can be entered from the Lesson Map and completed as a 10-question run through the existing score, XP, streak, missed-read, and result flow.
- The active World 2 pool is exactly Support Holds, Resistance Rejects, Support Breaks, and Resistance Breaks.
- A dedicated prototype generator shows a clear support floor or resistance ceiling, a readable approach, and an obvious hold, rejection, or decisive break with continuation.
- World 2 charts show one labeled teaching line without opaque or debug overlays.
- The Pattern Library exposes all four World 2 Rules Bible entries with simple cues.
- World 1 generation, its five-answer pool, Pattern Bible, Candle Lens, and Study Progress remain isolated and unchanged.

## Known limitations

World 2 intentionally does not yet generate fakeouts, retests, liquidity sweeps, support/resistance flips, order-flow concepts, volume profile, or advanced market structure.

## What changed in v27.9.1

- Removed unresolved merge conflict markers from the v27.9 files and restored valid JavaScript syntax.
- Preserved the locked World 2 Rules Bible answer pool and kept World 2 non-playable.

## What changed in v27.9

- Defined the World 2 learning layer as Location + Context: did the level hold, or did it break?
- Locked the World 2 pool to Support Holds, Resistance Rejects, Support Breaks, and Resistance Breaks.
- Documented core meaning, must-have conditions, invalid conditions, visual cues, common confusions, simple coach wording, and future generator notes for each concept.
- Added a Coming Soon Lesson Map card and defensive run guards; World 2 gameplay remains inactive.
- Updated the build marker and visible badge.

## World 2 Rules Bible v1.0

- **Support Holds:** The floor is clear before price tests it, price does not close decisively below, and buyers produce a visible bounce. Candle Lens: look at the level first and ask whether price tested the floor and bounced. Invalid when the floor breaks, the reaction or level is weak, or hold versus break is ambiguous.
- **Resistance Rejects:** The ceiling is clear before price tests it, price does not close decisively above, and sellers produce a visible rejection. Candle Lens: look at the level first and ask whether price tested the ceiling and failed. Invalid when the ceiling breaks, the reaction or level is weak, or rejection versus break is ambiguous.
- **Support Breaks:** The floor is clear before price reaches it, then price closes decisively below and continues or remains below. Candle Lens: look for the close below because a wick is not enough. Invalid when price reclaims the floor, the break is weak, or hold versus break is ambiguous.
- **Resistance Breaks:** The ceiling is clear before price reaches it, then price closes decisively above and continues or remains above. Candle Lens: look for the close above because a wick is not enough. Invalid when price falls back below, the break is weak, or rejection versus break is ambiguous.

Each entry also records its beginner translation, visual cue, common confusions, coach feedback, and future generator recipe in the frozen `WORLD_2_RULES_BIBLE` data object.

Future generation must show a clear level, visible approach, decisive hold or break, enough pre-signal context, no ambiguous fakeouts, and a clean mobile-readable chart. Liquidity sweeps, fakeouts, support/resistance flips, break and retest, trendline breaks, volume profile, order flow, and advanced market structure are deferred.

## Preserved in v27.9

- World 1 answer pool remains exactly Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji.
- World 1 Pattern Bible/generator, location tuning, replay and Engulfing sequencing, Quest Moment, 7-second timer, scoring, tempo progression, Mochi, Dev Tools, Candle Lens, Study Progress, Pattern Library stats, result coach flow, mobile answer dock, and clean chart remain unchanged.

v27.8.1 reduces only the lower mobile result stat-card numerals for Score, XP earned, and Best score. The hero result header remains bold, gameplay and scoring logic are unchanged, and all v27.8 study progress systems are preserved.

## What changed in v27.8.1

- Reduced the mobile lower result stat-card numerals by roughly 15% while retaining readable labels and existing card dimensions.
- Preserved the main result hero scale, including PERFECT RUN, 10/10, and CORRECT READS.
- Updated the build marker and visible badge for v27.8.1.

## Preserved in v27.8.1

- No gameplay, scoring, XP, result logic, generator, timer, answer-pool, or progression behavior changed.
- All v27.8 study progress tracking, Pattern Library stats, Study Focus, and missed-read links remain intact.
- Candle Lens, Mochi, tempo unlocks, Dev Tools visibility, mobile answer dock, and clean chart presentation remain unchanged.

## What changed in v27.8

- Added localStorage-backed seen/correct stats for Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing.
- Added calculated accuracy plus New, Learning, Improving, Strong, and Mastered labels to the World 1 library cards.
- Added a Study Focus recommendation using the lowest accuracy among patterns seen at least three times, with a no-data fallback.
- Added missed-read Review Pattern buttons that open, scroll to, and highlight the correct Pattern Library card.
- Added a dev-only reset that clears only World 1 pattern study stats.
- Updated the build marker and visible badge for v27.8.

## Preserved in v27.8

- World 1 generator, Pattern Bible recipes/validation, active five-answer pool, replay and Engulfing sequencing, and v27.4 location tuning.
- The 7-second answer timer, scoring, result flow, tempo XP multipliers/unlocks, Mochi purchase/equip/persistence, and clean chart.
- v27.6.2 `?dev=1` visibility behavior and the v27.7 Candle Lens preview, seen state, and Study Bonus.
- Tracking is World 1 only; distractors are not marked seen and no future-world stats are created.

## What changed in v27.7

- Added a first-run Candle Lens preview for Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing.
- Added a modern rectangular inspection window with enlarged signal candles, feature callouts, short explanations, and optional expanded text.
- Added `Skip`, `Explain More`, `Next`, and final `Start Run` controls plus Home `Review Patterns` access.
- Persisted first-view state with `world1CandleLensSeen` so returning World 1 starts are not interrupted.
- Added a one-time `+50 XP` Study Bonus for full completion, persisted separately and never awarded for skipping or replaying.
- Added a small dev-only reset for Candle Lens seen/bonus state while keeping all v27.6.2 tools URL-gated.
- Updated the build marker and visible badge for v27.7.

## Preserved in v27.7

- World 1 generator, Pattern Bible recipes/validation, active answer pool, replay and Engulfing sequencing, and location tuning.
- The 7-second answer timer, scoring, result/missed-read coach flow, tempo XP multipliers and unlock counts.
- Mochi purchase/equip/persistence, Pattern Library content, mobile answer dock, clean live chart, and `?dev=1` visibility behavior.

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

## What changed in v27.6.2

- Added an obvious mobile-friendly `DEV TOOLS` panel near the top of Home when `?dev=1` is active.
- Kept a matching panel near the top of the Shop with `Add 500 XP` and `Reset Mochi` controls.
- Added immediate action feedback while retaining the existing persisted XP and Mochi reset behaviour.
- Kept all dev panels, buttons, and the `DEV PREVIEW` badge absent when the URL flag is removed.
- Preserved normal gameplay, World 1 generation and answer pool, tempo progression, Mochi purchasing/equipping, scoring, timer, result flow, Pattern Library, and layouts.

## Preserved from v27.6.1

- Kept temporary Beginner, Normal, and Speedrun selection for testing without persisting locked selections or run-count progress.
- Kept the URL-controlled `DEV PREVIEW` badge away from the game screen.

## Preserved from v27.6

- Added Mochi the Market Cat, the first Familiar, to the existing Cosmetics shop for 250 XP.
- Added insufficient-XP, buy, equip, and equipped states with purchase feedback and automatic equip on unlock.
- Persisted Mochi ownership and equipped state in the existing localStorage payload, including a safe fallback that prevents unowned equipment.
- Added compact pixel-art Mochi placements on home and result screens.
- Added simple performance reactions, including Perfect Run bounce/sparkle/rainbow and Bad Luck sleepy loaf.
- Kept Mochi cosmetic only with no hints, timer changes, score boosts, reveals, or pattern assistance.

## Preserved from v27.5

- Added Beginner at the existing v27.4 replay pace with standard XP, unlocked by default.
- Added Normal at a faster readable pace with +10% XP, unlocked after 10 completed Beginner runs.
- Added Speedrun at the fastest pace with +25% XP, unlocked after 20 completed Normal runs.
- Added persistent progress toward 30 completed Speedrun runs as future mastery tracking only.
- Added a compact selector, locked explanations, persisted selection, and result progress feedback.
- Kept XP integer-based by rounding the multiplied completed-run reward once.
- Preserved the 7-second Quest Moment timer; replay tempo changes setup pacing only.

## Preserved from v27.4

### Code / game state

- Updated the build marker and badge to v27.4 Location Probability Tuning.
- Split shared location profiles so each active pattern has an explainable primary/secondary bias.
- Hammer: 70% Range Low/support, 30% below/near Channel Mean after a pullback.
- Shooting Star: 70% Range High/resistance, 30% above/near Channel Mean after a rally.
- Bullish Engulfing: 55% Range Low/support, 45% Channel Mean reclaim after bearish pressure.
- Bearish Engulfing: 55% Range High/resistance, 45% Channel Mean rejection after bullish pressure.
- Doji: 52% Channel Mean hesitation/compression, 24% Range High hesitation, 24% Range Low hesitation.
- Preserved the existing generator structure, Pattern Bible recipes/validators, and Engulfing prior-candle/Quest Moment sequencing.
- Preserved the v26.8.1 removal of player-facing setup-zone and Quest-zone guide rectangles.
- Preserved the v26.8 active pattern source and stricter Bullish/Bearish Engulfing body-boundary validation.
- Tuned only the v26.7 location profiles and setup-story weighting described above.
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

## v27.4 location-tuning status

- W1 answer pool locked.
- Pattern Bible v1.0 locked.
- Generator fairness accepted.
- Candle rhythm accepted.
- Bullish/Bearish Engulfing replay sequencing accepted.
- Location logic accepted.
- Chart overlays cleaned.
- Opaque guide boxes removed.
- Desktop/mobile tests passed for the v26.9 lockdown candidate.
- Result summary and missed-read coach flow accepted.
- First-player onboarding helper preserved without changing locked gameplay.
- Pattern Library uses beginner quick-scan rows while preserving Pattern Bible truth lines.
- Home/start flow now points directly at World 1: Candle Basics.
- Visible Pattern Library now avoids non-active future-world patterns during the first tester pass.
- Location remains contextual and probabilistic rather than deterministic.
- Channel Mean now supports hesitation and both directions of control shift.

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
- Support Holds vs Support Breaks
- Clean Breakout vs Range Expansion

## Next recommended test

Use GitHub Pages with:

```text
?fresh=270
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
- Comparative coach cards are a future feature, not included in v27.4.
- Generator fairness is preserved through validation and retry rules, but location weighting still needs human visual sampling across many runs.

## Next intended work

Recommended sequence:

```text
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
v27.9 - World 2 Rules Bible
v27.10+ - World 2 generator planning and later teaching expansions
```

Do not combine lockdown, market rhythm changes, comparative cards, and deeper engulfing doctrine into one patch.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator doctrine, candle-quality work, and learning-loop design. Human visual testing is now more important than code-only validation.
