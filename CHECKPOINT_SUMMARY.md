# Candle Quest Reborn - v28.4.1 Checkpoint Summary

## Current build

**v28.4.1 - W1/W2 Smoke Test + Cleanup Pass**
Build marker: `v28_4_1_w1_w2_smoke_test_cleanup`

## Base build

**v26.3.0 - Chart Viewport Unification**
Build marker: `v26_3_0_chart_viewport_unification`

## Current status

World 1 and World 2 retain their teaching/rep split with clearer training-focused setup copy. Guided Training owns all help and Coach Tray UI, while Fast Reps and Speedrun keep the replay and answers unobstructed and advance automatically after feedback.

## What changed in v28.4.1

- Audited active W1/W2 UI and state for obsolete coach controls, duplicate help systems, and stale Fast Reps/Speedrun guidance.
- Confirmed Guided Training retains optional non-answer-revealing help plus post-answer coaching and `Next`.
- Confirmed Fast Reps and Speedrun hide all guidance surfaces and retain timed automatic progression.
- Rechecked the locked replay geometry, exact W1/W2 answer pools, W2 level viewport, mobile cockpit, desktop setup, and dev-mode paths.

## What changed in v28.4.0

- Locked W1/W2 to the same cockpit, replay window, answer dock, and optional fixed coaching structure.
- Added explicit active world, Training Style, and Candle Speed layout states.
- Reserved the compact help lane only for Guided Training; Fast Reps and Speedrun have no Need Help or Coach Tray surface.
- Kept all help and coaching out of document flow so replay geometry remains unchanged through hints, feedback, and transitions.
- Preserved the exact W1/W2 answer pools and the v28.3.5 World 2 level/viewport stability baseline.

## What changed in v28.3.10

- Renamed `Run Mode` to `Training Style` and `Replay Tempo` to `Candle Speed`, with clearer subtitles.
- Renamed Guided Mode to `Guided Training`, Normal Mode to `Fast Reps`, and the Normal tempo to `Standard`.
- Updated option descriptions, Speedrun availability copy, and tempo progression messages to match the new names.
- Preserved all Guided/Fast Reps behavior, Speedrun rules, exact answer pools, generators, checking, scoring, timers, chart rendering, coaching architecture, and world flows.

## What changed in v28.3.9

- Restricted `Need help?`, optional hints, post-answer explanations, the fixed Coach Tray, and `Next` to Guided Mode.
- Added clean Normal Mode auto-advance after 850ms for correct reads and 1300ms for wrong or timed-out reads.
- Kept Speedrun on Normal Mode rules and unavailable from Guided Mode.
- Cleared stale guidance state on mode and question transitions.
- Preserved answer feedback, exact W1/W2 gameplay, chart stability, mobile cockpit, result content, and dev mode.

## What changed in v28.3.8

- Reserved a compact, stable help lane between the chart and answer dock so toggling help does not shift either surface.
- Refined iPhone cockpit spacing, answer button tap targets, answer-state contrast, and page safe-area padding.
- Improved Coach Tray wrapping, horizontally scrollable chips, `Next` placement, maximum height, and home-indicator clearance.
- Added iOS visual-viewport repositioning for the fixed help control and hint.
- Preserved Guided/Normal behavior, Normal-only Speedrun, exact answer pools, generators, scoring, W1 candle readability, W2 level-line stability, desktop layout, and dev mode.

## What changed in v28.3.7

- Added a simple W1/W2 Guided Mode / Normal Mode selector.
- Guided Mode shows the correct-answer explanation and `Next` after correct, wrong, and timed-out reads.
- Normal Mode retains the answer highlight and chart-rim pulse, skips the full tray on correct reads, and auto-advances after 850ms.
- Wrong and timed-out answers in both modes show correction in the fixed bottom Coach Tray and require `Next`.
- Speedrun is limited to Normal Mode; Guided clears an active Speedrun selection and Speedrun always uses Normal flow.
- `Need help?` remains an optional, non-answer-revealing overlay before answering and hides after any answer.
- Final-question auto-advance still ends at the existing results flow; it does not skip the results screen.
- W1/W2 answer pools, generators, Pattern Bible logic, scoring, timer behavior, chart rendering, W2 level-line stability, Q progress, iPhone cockpit, desktop layout, and dev mode remain unchanged.

## What changed in v28.3.6

- Moved the W1/W2 answer-led Coach Box out of `.game-shell` and into a fixed bottom Coach Tray.
- Kept the tray out of normal layout so showing, clearing, or scrolling coaching cannot resize or move the chart and answer dock.
- Kept `Need help?` compact and out of flow before an answer, and retained clean reset on `Next`.
- Preserved the v28.3.5 W2 support/resistance viewport and level-line stability work.
- W1/W2 answer pools, generators, checking, scoring, timer, streaks, chart feedback, dev mode, and 10-question flow remain unchanged.

## What changed in v28.3.4.6

- Moved `Need help?` into its own reserved-height layer, separate from the answer-led Coach Box.
- Anchored the short W1/W2 hint as an overlay so toggling it does not resize or move the chart and answer controls.
- Kept the button available until answer or timeout, with clean per-question hint reset and no stale guidance.
- Kept the Coach Box empty before an answer and limited full guidance plus `Next` to answered states.
- W1/W2 answer pools, generators, checking, scoring, timer, streaks, chart feedback, dev mode, and 10-question flow remain unchanged.

## What changed in v28.3.4.5

- The Coach Box is hidden while watching a setup and no longer opens large by default on an unanswered question.
- A speech-bubble `Need help?` action opens compact, neutral guidance based on the active world without revealing the answer.
- Correct, incorrect, and timed-out answers all hold on the relevant correct-answer explanation with a `Next` action.
- Old `Coach tips`, `Close tips`, `Don't show again`, automatic suppression, and correct-answer auto-advance states were removed.
- Question transitions clear optional help and result context, preventing blank or stale Coach Box content.
- W1/W2 answer pools, generators, Pattern Bible logic, support/resistance behavior, scoring, timer, streaks, chart feedback, and 10-question flow remain unchanged.

## What changed in v28.3.4.4

- `Coach tips` replaces the old manual Show/Hide toggle and remains available in both compact and expanded Coach Box states.
- Every manual press resolves fresh W1/W2 guidance from the active world, question, and current result instead of preserved hidden markup.
- Before an answer, neutral world-specific lesson guidance appears without revealing the answer.
- After an answer, the panel identifies a correct read, correction, or timeout and rebuilds the matching current guidance.
- `Close tips` only collapses the visible content. Manual tips still work after repeated presses, closing, and run-scoped automatic suppression.
- W1/W2 answer pools, generators, Pattern Bible logic, support/resistance behavior, scoring, chart feedback, and 10-question flow remain unchanged.

## What changed in v28.3.4.3

- Manual `Show coach` rebuilds W1/W2 guidance from the active question and its matching current result instead of relying on hidden Coach Box content.
- Coach visibility, automatic suppression, and per-question result context are independent states.
- Repeated Hide/Show cycles and manual reopening after `Don't show again` retain relevant current guidance.
- Each question transition clears temporary Coach state so prior-question and prior-world guidance cannot carry forward.
- Pre-answer manual coaching renders a neutral current-world ready state rather than a blank box.

## What changed in v28.3.4.2

- `Hide coach` now collapses the Coach Box without advancing the question or clearing its guidance state.
- `Show coach` restores W1/W2 guidance only when the saved answered result matches the active question; otherwise it shows the neutral current-question ready state.
- `Don't show again` remains run-scoped automatic suppression and does not block manual guidance.
- New questions and runs clear prior guidance so previous-question and previous-world content cannot reappear.
- W1/W2 gameplay, scoring, timer, answer pools, generators, chart feedback, and 10-question flow remain unchanged.

## What changed in v28.3.4.1

- `Show coach` remains functional throughout W1/W2 runs, including after `Don't show again` suppresses automatic coaching.
- Manual opening after an answer shows guidance for that current result without re-enabling automatic interruptions.
- Manual opening before an answer shows a neutral ready state without revealing the answer or reusing stale result guidance.
- Automatic suppression remains scoped to one run and resets on every new run.
- W1/W2 gameplay, scoring, timer, answer pools, generators, chart feedback, and 10-question flow remain unchanged.

## What changed in v28.3.4

- `Don't show again` suppresses only automatic full coaching for the rest of the current run.
- Compact `Show coach` now uses an explicit manual-open path that remains available after suppression.
- Manually opened guidance does not re-enable automatic coaching or force a `Next` step while suppression is active.
- New W1/W2 runs still start with automatic coaching available.
- Compact iPhone `Qn/10` progress is now a responsive 30–38px HUD anchor with enough room for `Q10/10`.
- Desktop HUD layout and all W1/W2 gameplay, scoring, chart, content, and progression rules remain unchanged.

## What changed in v28.3.3

- The redundant world title is hidden in the compact mobile W1/W2 gameplay cockpit, eliminating truncated title text.
- The mobile `Qn/10` label is larger and vertically aligned within the cockpit status cell.
- Desktop keeps the full world title and detailed status copy.
- The Coach Box `Dim` control is replaced by `Don't show again`.
- Suppression prevents automatic full coaching and forced `Next` steps for the rest of the current run, while answer feedback and automatic progression continue normally.
- Suppression resets on every new run; compact `Show coach` remains available for manual guidance.
- The v28.3.2 cockpit controls and chart-rim feedback, the fixed Coach Box, and all W1/W2 gameplay rules remain unchanged.

## What changed in v28.3.2

- Mobile progress uses `Q1/10` through `Q10/10`; the detailed Quest Moment and timer sentence remains available on desktop only.
- The mobile back arrow now sits inside the cockpit beside XP/Shop, reclaiming the old separate left column while preserving its 44px tap target.
- The large mobile streak row is hidden so the cockpit prioritises title, progress, score, timer, XP/Shop, and Exit.
- Correct and maintained-streak reads pulse the outer chart rim green; wrong reads, timeouts, and lost streaks pulse it red.
- The rim effect stays outside the canvas content and respects reduced-motion preferences.
- The v28.3.1 fixed bottom Coach Box and all W1/W2 gameplay, content, scoring, and chart rules remain unchanged.

## What changed in v28.3.1

- The World 2 Level Coach no longer appears as a transient layout element near the chart.
- W1 Candle Coach and W2 Level Coach guidance use one fixed-height bottom console beneath the answer buttons.
- Wrong and timed-out reads show the correct answer, explanation, tags, and an explicit `Next` control.
- Correct reads show compact confirmation with optional `Show coach` guidance and otherwise advance automatically.
- `Dim` keeps the console footprint stable and resumes the run without a layout jump.
- W1/W2 answer pools, generators, Pattern Bible logic, score/XP/streak logic, and future world layouts remain unchanged.

## What changed in v28.3

- Correct, incorrect, and timed-out World 2 reads show the correct beginner explanation in a compact `Level Coach` panel.
- Each explanation includes three plain-language cues tied to the exact answer.
- The four World 2 Library cards now include a beginner translation, Look for list, Invalid if list, common confusion, and memory phrase.
- World 2 Study Focus now directs players to defended levels for holds and strong closes beyond levels for breaks.
- `docs/FUTURE_UPDATE_SHELF_v28.md` preserves the roadmap and project constraints outside chat.
- World 1, both locked answer pools, both generators, World 2 line behavior and labels, replay framing, timer, run length, scoring, progression, mobile answer dock, and mobile exit control remain unchanged.

## What changed in v28.2.2

- The mobile `Exit` word button has been replaced by a compact back-arrow control.
- The arrow sits at the top-left beside the cockpit panel, outside its status grid.
- The control retains a `44px` tap target without adding a new row or changing the chart and answer-dock vertical flow.
- Desktop keeps its existing `← Exit` button.
- Gameplay, answer pools, generators, Pattern Bible logic, scoring, progression, and iOS scroll-reset behavior are unchanged.

## What changed in v28.2.1

- World 2 calculates one padded viewport from all historical and scenario candles that can appear during the question.
- Replay and Quest Moment reuse that viewport, keeping candle scale and the teaching line stable without clipping wick extremes.
- Mobile cockpit, chart height, shell spacing, and answer-dock gaps are compacted toward the v27.9 proportions without shrinking answer tap targets.
- Mobile Exit now occupies a small cockpit control instead of a full-width footer row.
- Entering the game resets retained iOS document scroll before paint, preventing the exit-area-first view and Quest Moment snap.
- Desktop layout and all gameplay content and progression systems remain unchanged.

## What changed in v28.2

- All four World 2 scenarios now use a longer, controlled approach so the teaching level is visible before the signal.
- Support Holds and Resistance Rejects test the line without a decisive close through it, then react strongly away over multiple candles.
- Support Breaks and Resistance Breaks close decisively through the line, then print two continuation/acceptance candles beyond it.
- The four scenarios are mirrored around support and resistance so floor and ceiling lessons have consistent visual standards.
- The exact World 2 answer wording, one-line chart, locked viewport, stable replay/Quest Moment level position, `22px` labels, and v28.1 mobile layout remain preserved.
- World 1 and all unrelated gameplay systems remain unchanged.

## What changed in v28.1

- Narrow screens now use a deliberate vertical training flow with a full-width world/question status row, the replay window as the central learning object, a separated answer dock, and feedback below the HUD.
- Score, timer, XP, Shop, and streak information remain available without crushing the question copy into a narrow column.
- Mobile answer controls have larger tap targets, more breathing room, and a full-width fifth World 1 option; the four World 2 options remain a balanced two-by-two grid.
- Mobile result stats are presented as clearly separated stacked cards instead of compressed desktop columns.
- Wide desktop styling remains unchanged, while the shared narrow breakpoint also improves cramped desktop windows and tablet-like widths.
- World 1 and World 2 gameplay logic, exact answer pools, generators, Pattern Bible logic, World 2 level stability and label sizing, scoring, XP, timer, and run length are unchanged.

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
