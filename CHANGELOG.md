# Candle Quest Reborn — Changelog

## v28.3.4.6 - Stable Need Help Hint Overlay

### Changed

- Separated pre-answer help from the Coach Box into a compact, reserved-height control with an anchored hint overlay.
- Kept `Need help?` available on every active unanswered W1/W2 question and reset its hint on each transition.
- Kept the hint and button out of page-flow changes, so opening or closing help does not move the chart or answer buttons.
- Kept the full Coach Box answer-led: it remains empty before an answer and shows result guidance plus `Next` afterward.
- Updated the build marker to `v28_3_4_6_stable_need_help_hint_overlay` and the visible badge to `v28.3.4.6`.

### Preserved

- Exact W1/W2 answer pools, generators, answer checking, scoring, timer, streaks, 10-question flow, chart rendering, chart-rim feedback, Q progress, iPhone cockpit, desktop layout, and dev mode.

## v28.3.4.5 - Coach Box Answer-Only + Need Help Button

### Changed

- Removed the large default pre-answer Coach Box and the `Coach tips`, `Close tips`, and `Don't show again` control loop.
- Added a small speech-bubble `Need help?` action that opens fresh, neutral W1/W2 guidance for only the active unanswered question.
- Made the Coach Box answer-led: correct, incorrect, and timed-out reads now show the correct-answer explanation and a `Next` button.
- Reset optional help on every question transition so previous-question guidance cannot carry forward.
- Updated the build marker to `v28_3_4_5_coach_box_answer_only_need_help_button` and the visible badge to `v28.3.4.5`.

### Preserved

- Exact W1/W2 answer pools, generators, Pattern Bible logic, support/resistance behavior, scoring, timer, streaks, 10-question flow, large Q progress, iPhone cockpit, and chart-rim feedback.

## v28.3.4.4 - Coach Tips Simple Manual Button

### Changed

- Replaced the fragile `Show coach` / `Hide coach` loop with a consistently available `Coach tips` action and a visual-only `Close tips` action.
- Added one fresh guidance resolver that reads the active W1/W2 world, question, and matching result every time `Coach tips` is pressed.
- Added neutral world-specific tips before an answer and explicit correct, incorrect, and timeout guidance after an answer.
- Kept `Don't show again` limited to automatic coaching; manual tips continue to rebuild after suppression and after closing the panel.
- Updated the build marker to `v28_3_4_4_coach_tips_simple_manual_button` and the visible badge to `v28.3.4.4`.

### Preserved

- Exact W1/W2 answer pools, generators, Pattern Bible logic, support/resistance behavior, scoring, timer, streaks, 10-question flow, large Q progress, iPhone cockpit, and chart-rim feedback.

## v28.3.4.3 - Coach State Reliability Repair

### Changed

- Centralised W1/W2 Coach Box rendering so manual `Show coach` resolves guidance from the active world, question, and matching answer result each time.
- Separated temporary Coach Box visibility, run-scoped automatic suppression, and per-question result context.
- Made `Hide coach` collapse guidance without deleting result context, and made manual reopen work after repeated toggles and after `Don't show again`.
- Reset per-question Coach state on transitions and added a safe non-blank ready fallback before an answer.
- Updated the build marker to `v28_3_4_3_coach_state_reliability_repair` and the visible badge to `v28.3.4.3`.

### Preserved

- W1/W2 answer pools, generators, Pattern Bible logic, level behavior, scoring, timer, streaks, 10-question flow, cockpit/chart styling, Mochi, shop, tempo, Pattern Library, and Study Progress.

## v28.3.4.2 - Show Coach Current Lesson Repair

### Changed

- Made `Hide coach` a visual-only collapse that preserves the active question and answered-result guidance.
- Rehydrated manually opened W1/W2 guidance from the current active result, rejecting stale guidance from a prior question.
- Kept `Don't show again` separate from temporary hiding: it suppresses automatic coaching for the current run while manual `Show coach` remains available.
- Updated the build marker to `v28_3_4_2_show_coach_current_lesson_repair` and the visible badge to `v28.3.4.2`.

### Preserved

- Exact W1/W2 answer pools, generators, Pattern Bible logic, support/resistance behavior, scoring, timer, streaks, 10-question flow, large Q progress, and iPhone cockpit layout.

## v28.3.4.1 - Show Coach Always Available Repair

### Changed

- Kept `Show coach` functional after `Don't show again`; run-scoped automatic suppression no longer blocks manual result guidance.
- Added a neutral, non-answer-revealing ready state when `Show coach` is opened before the current question has been answered.
- Kept manual guidance tied to the current result and preserved normal automatic progression when suppressed guidance is closed.
- Confirmed automatic coach suppression resets when a new W1 or W2 run starts.
- Updated the build marker to `v28_3_4_1_show_coach_always_available_repair` and the visible badge to `v28.3.4.1`.

### Preserved

- Exact W1/W2 answer pools, generators, Pattern Bible logic, chart-rim feedback, scoring, timer, streaks, 10-question flow, fixed Coach Box, large Q progress, and iPhone cockpit layout.

## v28.3.4 - Coach Manual Reopen + Larger Q Progress

### Changed

- Separated manual Coach Box reopening from automatic coach suppression so `Show coach` remains available after `Don't show again`.
- Kept automatic coaching suppressed only for the current run; manually opened guidance no longer restores automatic interruptions or adds a forced `Next` step while suppression is active.
- Increased compact iPhone `Qn/10` progress to a responsive 30–38px HUD anchor and widened its cockpit column to fit `Q10/10`.
- Updated the build marker to `v28_3_4_coach_manual_reopen_larger_q_progress`.

### Preserved

- Automatic coach suppression still resets on every new W1/W2 run.
- Answer highlighting, chart-rim feedback, scoring, timer, streaks, answer pools, generators, World 2 levels, shop, Mochi, and desktop layout are unchanged.

## v28.3.3 - iPhone HUD Text Cleanup + Coach Suppression

### Changed

- Removed the redundant world title from the compact mobile W1/W2 gameplay cockpit, leaving only `Qn/10` progress in the top-left status area.
- Increased and vertically aligned the mobile Q label so it reads as an intentional peer to the score, timer, XP/Shop, and Exit controls.
- Replaced the full Coach Box `Dim` control with `Don't show again`.
- `Don't show again` suppresses automatic full coaching for the rest of the current run, advances the current result without requiring `Next`, and resets when the next run starts.
- Preserved the compact `Show coach` option so suppressed guidance can still be opened manually.
- Updated the build marker to `v28_3_3_iphone_hud_cleanup_coach_suppression`.

### Preserved

- Desktop retains the full world title and detailed status copy.
- The v28.3.2 cockpit layout, chart-rim feedback, fixed Coach Box, exact W1/W2 answer pools, generators, Pattern Bible rules, scoring, progression, and 10-question flow are unchanged.
- Coach suppression is run-scoped only and is not persisted to future runs or reloads.

## v28.3.2 - iPhone Cockpit Simplification + Chart Rim Feedback

### Changed

- Reclaimed the separate mobile exit column and moved the 44px back-arrow control into the cockpit beside the XP/Shop wallet.
- Replaced the long mobile Quest Moment status sentence with compact `Qn/10` progress while retaining the detailed status copy on desktop.
- Removed the bulky permanent streak row from the mobile cockpit; desktop streak presentation and all streak scoring remain unchanged.
- Added subtle green chart-rim pulses for correct reads and maintained streaks, plus red pulses for wrong reads, timeouts, and lost streaks.
- Updated the build marker to `v28_3_2_iphone_cockpit_chart_rim_feedback`.

### Preserved

- The fixed bottom W1/W2 Coach Box, exact answer pools, generators, Pattern Bible rules, World 2 chart behavior, scoring/XP logic, shop, Mochi, tempo unlocks, and 10-question flow are unchanged.
- Desktop retains its existing full status copy and Exit control.

## v28.3.1 - W1/W2 Fixed Bottom Coach Box

### Changed

- Replaced the transient World 2 feedback card with a permanently reserved Coach Box beneath the answer buttons, keeping the chart and answer dock anchored.
- Added the same lightweight Coach Box structure to World 1 using existing Candle Lens and Pattern Bible guidance.
- Wrong and timed-out W1/W2 reads now hold on readable guidance and require `Next`; correct reads stay compact and continue automatically unless the player opens the coach.
- Added subtle `Show coach` and `Dim` controls without changing the Coach Box footprint or iOS safe-area foundation.
- Updated the build marker to `v28_3_1_w1_w2_fixed_bottom_coach_box`.

### Preserved

- World 1 and World 2 answer pools, generators, Pattern Bible logic, World 2 chart behavior, scoring, progression, and 10-question run flow are unchanged.
- Future world layouts remain untouched.

## v28.3 - World 2 Coach / Library Polish + Future Shelf

### Changed

- Added short answer-specific World 2 Level Coach feedback for correct, incorrect, and timed-out reads.
- Added three beginner teaching tags for each World 2 answer and kept the chart as the primary learning object.
- Reworked all four World 2 Pattern Library cards into beginner translation, Look for, Invalid if, Common confusion, and Memory phrase sections.
- Made the existing World 2 Study Focus direction actionable without adding World 2 stat tracking or a new progression system.
- Added `docs/FUTURE_UPDATE_SHELF_v28.md` to preserve the current roadmap, locked pools, design constraints, URLs, and testing reminders.
- Updated the build marker to `v28_3_world_2_coach_library_polish` and badge to `v28.3 - World 2 Coach / Library Polish`.

### Preserved

- World 1 logic and exact answer pool are unchanged.
- World 2 generator fairness, line stability, label sizing, replay framing, compact iOS layout, and exact answer wording are unchanged.
- The 7-second timer, 10-question flow, scoring, XP, streaks, Mochi, shop, tempo unlocks, Dev Tools, Candle Lens, mobile answer dock, and mobile exit control are unchanged.
- No fakeouts, sweeps, flips, retests, order blocks, volume concepts, order flow, or advanced market structure were introduced.

## v28.2.2 - Mobile Exit Control Polish

### Changed

- Replaced the mobile cockpit `Exit` word button with a compact back-arrow control at the top-left of the game shell.
- Kept a full `44px` tap target while reducing the visual weight of the control.
- Positioned the control beside, rather than inside, the mobile cockpit grid so it does not add vertical height or cover status content.

### Preserved

- The v28.2.1 compact mobile chart framing and iOS scroll-reset behavior remain unchanged.
- Desktop Exit styling, gameplay logic, exact World 1 and World 2 answer pools, generators, Pattern Bible logic, scoring, XP, streaks, timer, run length, and progression systems remain unchanged.

## v28.2.1 - W2 Replay Stability + iOS Compact Framing Pass

### Changed

- Locked each World 2 question to a padded viewport containing every historical and scenario candle that can appear, preventing clipped bodies or wicks while keeping replay and Quest Moment framing identical.
- Restored a compact mobile cockpit and chart aspect, tightened vertical spacing, and retained `52px` answer targets.
- Moved the mobile Exit control into the cockpit and removed the large bottom exit section.
- Reset the document scroll position when entering a run so the chart remains the mobile visual anchor.

### Preserved

- Exact World 1 and World 2 answer pools, generators, Pattern Bible logic, W2 scenario fairness, one stable teaching line, scoring, XP, streaks, timer, run length, and desktop layout remain unchanged.

## v28.2 - World 2 Fairness Pass

### Changed

- Rebuilt all four World 2 generated scenarios around one mirrored, beginner-readable level story.
- Extended the visible approach so the support floor or resistance ceiling is established before the signal moment.
- Strengthened Support Holds and Resistance Rejects with a controlled level test and a clear multi-candle reaction away from the line.
- Strengthened Support Breaks and Resistance Breaks with a decisive full-body close through the line and two continuation/acceptance candles beyond it.
- Updated the build marker to `v28_2_world_2_fairness_pass` and badge to `v28.2 - World 2 Fairness Pass`.

### Preserved

- World 2 keeps its exact four-answer wording, one teaching line, locked per-question viewport, stable replay-to-Quest-Moment level position, and `22px` level labels.
- World 1 generation and answer pool, mobile layout, answer dock, 10-question flow, 7-second timer, scoring, XP, streaks, Mochi, shop, tempo unlocks, Dev Tools, Pattern Library structure, Candle Lens, and Study Progress are unchanged.
- No fakeouts, sweeps, flips, retests, order blocks, volume concepts, order flow, or advanced market structure were introduced.

## v28.1 - Mobile Layout Foundation

### Changed

- Rebuilt the narrow-screen game flow as an intentional vertical stack: world/status HUD, replay window, answer dock, feedback, and exit.
- Gave the question/status copy a full-width HUD row so it remains readable instead of being compressed beside score, timer, and XP controls.
- Increased mobile spacing and answer-button tap area while keeping the replay/chart window visually dominant.
- Made the fifth World 1 answer span the dock width on narrow screens; World 2 retains its balanced two-by-two answer layout.
- Stacked mobile result stat cards with clear internal spacing and preserved the existing wide desktop cockpit.
- Updated the build marker to `v28_1_mobile_layout_foundation` and badge to `v28.1 - Mobile Layout Foundation`.

### Preserved

- World 1 and World 2 gameplay, exact answer pools, Pattern Bible logic, generators, level stability, 10-question runs, 7-second timer, scoring, XP, streaks, Mochi, shop, tempo unlocks, Dev Tools, Pattern Library, Candle Lens, and Study Progress are unchanged.
- World 2 support/resistance line behavior and label sizing are unchanged.

## v28.0.3 - W2 Label Size Tuning

### Changed

- Reduced only the World 2 replay/chart `SUPPORT` and `RESISTANCE` labels to `22px` with a proportionally smaller label box.
- Kept the smaller label readable on mobile without letting it dominate the chart.
- Updated the build marker to `v28_0_3_w2_label_size_tuning` and badge to `v28.0.3 - W2 Label Size Tuning`.

### Preserved

- World 2 teaching-level placement, generator, chart scaling, locked viewport, and one-visible-line behavior are unchanged.
- World 1 and World 2 gameplay, exact answer pools, 10-question runs, 7-second timer, result flow, XP, score, streaks, Mochi, shop, tempo unlocks, Dev Tools, Pattern Library, Candle Lens, Study Progress, and mobile answer dock are unchanged.

## v28.0.2 - W2 Level Stability + Label Readability

### Changed

- Fixed one support or resistance teaching level for each World 2 question instance.
- Positioned support in a consistent low/floor region and resistance in a consistent high/ceiling region.
- Replayed each World 2 scenario against its precomputed level and locked viewport, reducing replay-to-Quest-Moment line and candle jumping.
- Replaced the previous teaching line when the next question starts so only one relevant World 2 level is visible.
- Enlarged only the World 2 `SUPPORT` and `RESISTANCE` labels to make them readable on mobile.
- Updated the build marker to `v28_0_2_w2_level_stability_label_readability` and badge to `v28.0.2 - W2 Level Stability + Label Readability`.

### Preserved

- World 1 and World 2 gameplay, exact answer pools, 10-question runs, 7-second timer, result flow, XP, score, streaks, Mochi, shop, tempo unlocks, Dev Tools, Pattern Library, Candle Lens, Study Progress, and mobile answer dock are unchanged.
- World 2 still shows one teaching line and introduces no advanced support/resistance concepts.

## v28.0.1 - Replay Window Identity Pass

### Changed

- Refined the dark rounded replay/chart window as Candle Quest's persistent training arena while leaving the surrounding interface unchanged.
- Removed the World 2 parallel channel/range fallback; World 2 now renders only its one relevant support or resistance teaching line.
- Standardised the chart badge to `QUEST MOMENT · READ THE CANDLE` for World 1 and `QUEST MOMENT · READ THE LEVEL` for World 2.
- Kept the replay stage width fixed through Quest Moment to reduce horizontal candle jumping.
- Sharpened candle, wick, grid, and level geometry with snapped coordinates and crisp teaching lines.
- Tightened internal price padding slightly while retaining mobile and desktop headroom.
- Updated the build marker to `v28_0_1_replay_window_identity_pass` and badge to `v28.0.1 - Replay Window Identity Pass`.

### Preserved

- World 1 and World 2 generators, exact answer pools, 10-question runs, 7-second timer, result flow, XP, score, streaks, Mochi, shop, tempo unlocks, Dev Tools, Pattern Library, Candle Lens, Study Progress, and mobile answer dock are unchanged.
- No future World 2 concepts or app-wide visual redesign were introduced.

## v28.0 - World 2 Playable Prototype

### Added

- Made World 2 playable from the Lesson Map as a 10-question Support & Resistance run.
- Activated exactly four World 2 answers: Support Holds, Resistance Rejects, Support Breaks, and Resistance Breaks.
- Added a small dedicated generator for clear floor/ceiling approaches, holds, rejections, and decisive breaks with continuation.
- Added a single labeled support or resistance teaching line to World 2 charts and exposed all four Rules Bible entries in the Pattern Library.
- Added simple World 2 missed-read cues using the existing result review flow.

### Changed

- Updated the build marker to `v28_0_world_2_playable_prototype` and badge to `v28.0 - World 2 Playable Prototype`.

### Preserved

- World 1 remains exactly Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji.
- World 1 generation, Pattern Bible, location tuning, replay tempo, Mochi, Dev Tools, Candle Lens, Study Progress, 7-second timer, scoring, XP, streaks, answer dock, and result flow are unchanged.

### Known limitations

- World 2 deliberately excludes fakeouts, retests, liquidity sweeps, support/resistance flips, order flow, volume profile, and advanced market structure.

### Testing required

- Verify complete World 1 and World 2 runs at phone and desktop sizes, exact answer pools, timer, results, Pattern Library tabs, shop/XP/streak behavior, Mochi, and `?dev=1` tools.

## v27.9.1 - Conflict Marker Cleanup

### Fixed

- Removed unresolved merge conflict markers from v27.9 files.
- Restored valid `game.js` syntax.
- Preserved World 2 Rules Bible doctrine and locked answer pool.

## v27.9 - World 2 Rules Bible

### Added

- Defined World 2 as `Support & Resistance`, teaching Location + Context through the question: did the level hold, or did it break?
- Added a frozen future answer pool: Support Holds, Resistance Rejects, Support Breaks, and Resistance Breaks.
- Added formal core meaning, must-have, invalid, visual cue, common confusion, coach wording, and future generator notes for all four concepts.
- Added future generator boundaries requiring a clear level, visible approach, decisive behaviour, sufficient context candles, and no early ambiguous fakeouts.
- Added a disabled Lesson Map card labelled `World 2`, `Support & Resistance`, and `Coming Soon` with beginner floor/ceiling copy.

### Changed

- Updated the build marker to `v27_9_world_2_rules_bible` and badge to `v27.9 - World 2 Rules Bible`.
- Replaced the dormant older World 2 labels with the four Rules Bible concepts and blocked World 2 lesson/run entry until its generator is deliberately implemented.

### Preserved

- World 1 remains exactly Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji.
- World 1 Pattern Bible, generator, v27.4 location tuning, v27.5 tempo logic, Mochi, Dev Tools, Candle Lens, Study Progress, result polish, replay sequencing, 7-second timer, scoring, coach flow, Pattern Library stats, answer dock, and clean chart are unchanged.

### Testing required

- Verify app load, World 1 start and completion, exact five-answer pool, 7-second timer, Pattern Library stats, Candle Lens, Mochi, tempo unlock UI, `?dev=1` tools, and result presentation.
- Verify World 2 is clearly Coming Soon at phone and desktop widths and cannot open a lesson or start gameplay.

## v27.8.1 - Result Score Font Polish

### Changed

- Reduced the mobile result stat-card numeral size for Score, XP earned, and Best score by roughly 15%.
- Updated the build marker to `v27_8_1_result_score_font_polish` and badge to `v27.8.1 - Result Score Font Polish`.

### Preserved

- The main result hero header remains bold, including PERFECT RUN, 10/10, and CORRECT READS.
- Gameplay, scoring, XP, result logic, and all v27.8 study progress systems are unchanged.

### Testing required

- Verify the lower stat-card numerals and labels on iPhone-sized screens and confirm the desktop result remains readable.
- Recheck a complete World 1 run plus the timer, locked answer pool, Pattern Library study stats, Candle Lens, Mochi, tempo unlocks, Dev Tools, and clean chart presentation.

## v27.8 - Study Progress Foundations

### Added

- Added persistent World 1 per-pattern `seen` and `correct` counts, with calculated accuracy and encouraging New, Learning, Improving, Strong, and Mastered status labels.
- Added compact progress summaries to all five World 1 Pattern Library cards and a Study Focus recommendation for the lowest-accuracy pattern with at least three attempts.
- Added Review Pattern buttons to missed-read coach cards. They open the Pattern Library, scroll to the correct card, and briefly highlight it.
- Added a `?dev=1` Reset Pattern Stats control that clears only World 1 study progress.
- Updated the build marker to `v27_8_study_progress_foundations` and badge to `v27.8 - Study Progress Foundations`.

### Preserved

- Study tracking is World 1 only and counts the correct pattern once per completed question; distractor selections are not counted as seen.
- Stats persist in the existing fail-soft localStorage save payload. XP, Mochi, tempo progress, Candle Lens state, and run history are unaffected by the study-stat reset.
- World 1 generation, Pattern Bible rules, the locked five-answer pool, location tuning, replay and Engulfing sequencing, the 7-second timer, scoring, tempo, Mochi, Candle Lens, chart presentation, and result flow are unchanged.

### Testing required

- Verify default, correct, incorrect, timeout, persistence, status threshold, Study Focus, Review Pattern focus/highlight, and dev reset paths.
- Recheck a complete World 1 run, tempo progression, Mochi shop, Candle Lens, Dev Tools, and phone/desktop layouts.

## v27.7 - Candle Lens Pattern Preview

### Added

- Added a first-run World 1 Candle Lens preview covering Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing before live play begins.
- Added frozen curated chart examples, a rectangular inspection lens, enlarged signal candles, visual callouts, short `Look for` cues, and optional expanded explanations.
- Added large `Skip`, `Explain More`, `Next`, and final `Start Run` controls plus a persistent Home `Review Patterns` button.
- Added `world1CandleLensSeen` persistence so later World 1 starts run normally after the preview is completed or skipped.
- Added a one-time `+50 XP` Study Bonus for completing all five cards, persisted with `world1CandleLensStudyBonusClaimed`; skipped and replayed previews do not award it.
- Added a dev-only Candle Lens reset alongside the preserved `?dev=1` tools.
- Updated the build marker to `v27_7_candle_lens_pattern_preview` and badge to `v27.7 - Candle Lens Pattern Preview`.

### Preserved

- World 1 generation and Pattern Bible logic are unchanged; preview candles are isolated curated teaching examples.
- The active answer pool remains exactly Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji.
- Replay sequencing, location tuning, tempo unlocks and multipliers, Mochi persistence, Dev Tools visibility, the 7-second answer timer, scoring, result/coach flow, Pattern Library, and clean live chart remain unchanged.

### Testing required

- Verify first-run, completion, skip, repeat-start, manual review, one-time bonus, and dev reset persistence paths.
- Check all five cards and expanded explanations on phone and desktop, including safe areas and vertical scrolling.
- Recheck a complete World 1 run, tempo progression, Mochi shop, Dev Tools, Pattern Library, and result coach flow.

## v27.6.2 - Dev Tools Visibility Patch

### Changed

- Added a clear, compact `DEV TOOLS` panel to the home screen when `?dev=1` is active.
- Kept matching dev controls visible near the top of the Shop for quick access.
- Added immediate shared feedback for the `Add 500 XP` and `Reset Mochi` actions.
- Updated the build marker to `v27_6_2_dev_tools_visibility_patch` and badge to `v27.6.2 - Dev Tools Visibility Patch`.

### Preserved

- Dev panels, buttons, and the `DEV PREVIEW` badge remain hidden without `?dev=1`.
- Normal gameplay, World 1 generation and answer pool, tempo progression and temporary dev access, Mochi logic, 7-second timer, scoring, result flow, Pattern Library, and chart presentation are unchanged.

## v27.6.1 - Dev Preview Tools

### Added

- Added hidden `?dev=1` Dev Preview Mode with a visible `DEV PREVIEW` badge.
- Added temporary Beginner, Normal, and Speedrun tempo access without changing stored unlock counters.
- Added dev-only shop controls to grant `500 XP` and reset Mochi ownership/equipment.

### Preserved

- Dev controls stay hidden without `?dev=1`, and removing the flag restores normal tempo locks.
- Preview-only locked tempo selections and completed runs do not persist tempo selection or unlock progress.
- Mochi purchase/equip persistence, World 1 gameplay, the five-answer pool, 7-second timer, scoring, tempo XP multipliers, result flow, Pattern Library, and clean chart remain unchanged.
- Updated the build marker to `v27_6_1_dev_preview_tools` and badge to `v27.6.1 - Dev Preview Tools`.

## v27.6 - Mochi Store Prototype

Status: first cosmetic familiar on the locked World 1 gameplay baseline

### Changed

- Added Mochi the Market Cat as a compact pixel-art Familiar in the existing Cosmetics shop for `250 XP`.
- Added clear insufficient-XP, buy, owned, equip, and equipped states; buying Mochi subtracts exactly `250 XP` and auto-equips the familiar.
- Persisted Mochi ownership and equipped state in the existing fail-soft localStorage save payload.
- Added equipped Mochi appearances on the home and result screens without placing the familiar over gameplay UI.
- Added lightweight CSS reactions: a bounce, sparkle, and rainbow pop for a Perfect Run; tail flick, blink, and sleepy-loaf treatments for lower result tiers.
- Updated the build marker to `v27_6_mochi_store_prototype` and badge to `v27.6 - Mochi Store Prototype`.

### Preserved

- Mochi is cosmetic only and gives no hints, answer reveals, timing changes, scoring boosts, pattern assistance, or other gameplay advantage.
- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- v27.4 location tuning, v27.5 replay tempo unlocks and XP multipliers, the 7-second answer timer, result/coach flow, Pattern Library, and chart presentation are unchanged.

### Testing required

- Verify Mochi shop states below and above `250 XP`, exact purchase subtraction, auto-equip messaging, manual equip, and refresh persistence.
- Verify equipped Mochi appears cleanly on home and result screens, including Perfect Run and Bad Luck reactions.
- Recheck a complete World 1 run, all replay tempo unlocks/multipliers, the 7-second Quest Moment timer, Pattern Library, coach flow, and mobile/desktop layout.

---

## v27.5 - Replay Tempo Unlocks

Status: replay/setup pacing progression on the locked World 1 gameplay baseline

### Changed

- Added Beginner, Normal, and Speedrun replay tempo classes through one centralized tempo configuration.
- Beginner preserves the v27.4 `520ms` replay tick and standard XP; Normal uses `390ms` and +10% XP; Speedrun uses `300ms` and +25% XP.
- Added completed-run unlock progression: 10 Beginner runs unlock Normal, and 20 Normal runs unlock Speedrun.
- Added persistent Speedrun mastery tracking toward 30 completed runs without adding another mode.
- Added a compact home tempo selector with locked explanations, persisted selection, safe Beginner fallback, and result progress feedback.
- Applied tempo XP multipliers once to the completed-run reward using consistent integer rounding.
- Updated the build marker to `v27_5_replay_tempo_unlocks` and badge to `v27.5 - Replay Tempo Unlocks`.

### Preserved

- The Quest Moment answer timer remains exactly 7 seconds in every tempo; only replay/setup pacing changes.
- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- World 1 generator, Pattern Bible recipes/validators, candle shapes, scoring, streaks, result/coach flow, and Pattern Library are unchanged.
- v27.4 location probability tuning and Engulfing prior-candle/Quest Moment sequencing remain intact.

### Testing required

- Verify fresh-state locks, unlock thresholds, persisted counts/selection, and Beginner fallback.
- Complete runs in all tempos and verify the 1.00x, 1.10x, and 1.25x rounded XP rewards.
- Confirm the timer displays `—` during replay and starts at 7 at Quest Moment across tempos.
- Recheck World 1 answers, Engulfing sequencing, result/review flow, Pattern Library, and responsive layout.

---

## v27.4 - Location Probability Tuning

Status: current World 1 location-probability tuning pass on the locked v27.0 gameplay baseline

### Changed

- Updated `game.js` build marker to `v27_4_location_probability_tuning` and the visible badge to `v27.4 - Location Probability Tuning`.
- Split the former shared edge/mean location profiles into pattern-specific weights.
- Kept Hammer and Shooting Star edge-first at 70%, with 30% realistic mean-adjacent pullback/rally setups.
- Kept Bullish and Bearish Engulfing edge-biased at 55%, while increasing Channel Mean reclaim/rejection setups to 45%.
- Reduced Doji Channel Mean weighting from 74% to 52%; its remaining 48% is evenly divided between Range High and Range Low hesitation.

### Preserved

- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- Existing candle recipes, Pattern Bible validators, setup rhythm, Engulfing two-candle sequencing, scoring, timer, XP, streaks, result flow, Pattern Library, and coach overlay remain unchanged.
- Range High / Channel Mean / Range Low lines, Quest Moment banner, clean chart, and removal of opaque guide boxes remain intact.

### Testing required

- Sample multiple runs on desktop and iPhone/mobile, including a complete ten-question run and result/review flow.
- Confirm mean scenarios include Doji hesitation, Bullish Engulfing reclaim, and Bearish Engulfing rejection without making location deterministic.
- Confirm Hammer and Shooting Star retain realistic primary edge bias and all five final patterns remain visually Pattern Bible-compliant.

---

## v27.3 - First Tester Readiness Pass

Status: current first external tester readiness pass on the locked v27.0 World 1 gameplay baseline

### Changed

- Updated `game.js` build marker to `v27_3_first_tester_readiness_pass`.
- Updated build badge to `v27.3 - First Tester Readiness Pass`.
- Clarified the home screen primary action as `Start World 1 Run`.
- Tightened home and daily-goal copy so first testers understand the World 1 / Candle Basics entry point.
- Clarified the first-run helper so players know answer buttons unlock at Quest Moment.
- Kept the visible Pattern Library focused on `World 1: Candle Basics` and the five active World 1 patterns.
- Shortened the clean-run review button label to reduce result-screen ambiguity.
- Kept the iPhone install tip home-only so it cannot cover gameplay answers, library controls, or result actions.

### Preserved

- v27.0 gameplay behaviour remains locked.
- v27.1 first-player onboarding and v27.2 Pattern Library quick-scan cards remain in place.
- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers.
- Generator logic, candle generation, Pattern Bible validation, answer selection, timer duration, scoring, XP, streaks, answer dock logic, chart layout, result flow, missed-read coach overlay, shop scaffold, replay sequencing, candle rhythm, and location logic were not changed.
- Range High / Channel Mean / Range Low gameplay lines, Quest Moment banner, clean chart view, and removed opaque guide boxes remain intact.

### Testing required

- Desktop app load, home/start clarity, Pattern Library open/readability, Start World 1 Run, answer selection, timer, ten-question completion, result summary, and Review missed reads.
- iPhone/mobile app load, first-run helper readability/dismissal, Pattern Library readability, Start World 1 Run, answer dock tap targets, result flow, bottom-sheet review, and carousel swipe.
- Confirm build badge shows `v27.3 - First Tester Readiness Pass`.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm generator fairness, Engulfing replay sequencing, location realism, candle rhythm, clean chart presentation, Range lines, Quest Moment banner, answer dock, XP, scoring, streaks, result flow, and coach overlay still work.

---

## v27.2 - Pattern Library Polish

Status: current Pattern Library clarity build on the locked v27.0 World 1 gameplay baseline

### Changed

- Updated `game.js` build marker to `v27_2_pattern_library_polish`.
- Updated build badge to `v27.2 - Pattern Library Polish`.
- Reworded the Pattern Library intro so beginners look at candle shape first, then use Range High, Channel Mean, and Range Low as context.
- Added a compact Pattern Library location key: Range High as upper/resistance, Channel Mean as middle/balance, and Range Low as lower/support.
- Improved the five World 1 Pattern Library entries with short Meaning, Look for, Usual location, and Common confusion rows.
- Kept Pattern Bible v1.0 must-have and invalid-if rows visible for Hammer, Shooting Star, Doji, Bullish Engulfing, and Bearish Engulfing.
- Tightened Pattern Library card spacing and mobile type scale so the entries are easier to scan on iPhone.

### Preserved

- v27.0 gameplay behaviour remains locked.
- v27.1 first-player onboarding remains in place.
- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers.
- Generator logic, candle generation, Pattern Bible validation, answer selection, timer duration, scoring, XP, streaks, answer dock, chart layout, result screen, missed-read coach overlay, shop scaffold, replay sequencing, candle rhythm, and location logic were not changed.
- Range High / Channel Mean / Range Low gameplay lines, Quest Moment banner, clean chart view, and removed opaque guide boxes remain intact.

### Testing required

- Desktop app load, Pattern Library open/close, mobile-sized Pattern Library scan, Start Run, answer selection, timer, ten-question completion, result summary, and Review missed reads.
- iPhone/mobile app load, first-run helper, Pattern Library open/close, card readability, Start Run, answer dock tap targets, result flow, bottom-sheet review, and carousel swipe.
- Confirm build badge shows `v27.2 - Pattern Library Polish`.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm generator fairness, Engulfing replay sequencing, location realism, candle rhythm, clean chart presentation, Range lines, Quest Moment banner, answer dock, XP, scoring, streaks, result flow, and coach overlay still work.

---

## v27.1 - First Player Onboarding Polish

Status: current onboarding polish build on the locked v27.0 World 1 gameplay baseline

### Changed

- Updated `game.js` build marker to `v27_1_first_player_onboarding_polish`.
- Updated build badge to `v27.1 - First Player Onboarding Polish`.
- Reworded the home screen copy to explain the core loop: watch candles move through the channel, wait for Quest Moment, choose the matching pattern, build streaks, and earn XP.
- Added a small dismissible first-run Candle Basics helper with beginner copy for watching candles form, answering at Quest Moment, and reading Range High, Channel Mean, and Range Low.
- Added safe localStorage dismissal for the onboarding helper with a session fallback if storage is unavailable.
- Added a compact player-facing Quest Moment explanation in home/game copy.
- Made Pattern Library access more visible by referencing it in onboarding copy and adding a Pattern Library action to the result screen.
- Wrapped existing app/install localStorage writes in fail-soft guards so unavailable storage does not block the app.

### Preserved

- v27.0 gameplay behaviour remains locked.
- Active World 1 answer pool remains exactly: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers.
- Generator logic, candle generation, Pattern Bible fairness, answer selection, timer duration, scoring, XP, streaks, answer dock, chart layout, result screen, missed-read coach overlay, shop scaffold, and Pattern Library definitions were not changed.
- Bullish/Bearish Engulfing replay sequencing, accepted candle rhythm, location realism, Range High / Channel Mean / Range Low lines, Quest Moment banner, and clean chart view remain intact.
- No opaque guide boxes, yellow focus bands, or debug-like chart overlays were reintroduced.

### Testing required

- Desktop app load, home copy review, Start Run, helper dismissal, answer selection, timer, ten-question completion, result summary, Pattern Library button, and Review missed reads.
- iPhone/mobile app load, helper layout/dismissal, Start Run, answer dock tap targets, timer, result flow, Pattern Library access, bottom-sheet review, and carousel swipe.
- Confirm build badge shows `v27.1 - First Player Onboarding Polish`.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm generator fairness, Engulfing replay sequencing, location realism, candle rhythm, clean chart presentation, Range lines, Quest Moment banner, answer dock, XP, scoring, streaks, and result flow still work.

---

## v27.0 - World 1 Lockdown

Status: locked/stable World 1 gameplay baseline preserved by v27.1

### Changed

- Updated `game.js` build marker to `v27_0_world1_lockdown`.
- Updated build badge to `v27.0 - World 1 Lockdown`.
- Promoted the accepted v26.9 World 1 Lockdown Candidate to the formal v27.0 World 1 Lockdown checkpoint.
- Updated checkpoint documentation to mark World 1 as locked/stable.

### Locked / accepted

- W1 answer pool locked: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji.
- Pattern Bible v1.0 locked.
- Generator fairness accepted.
- Candle rhythm accepted.
- Bullish/Bearish Engulfing replay sequencing accepted.
- Location logic accepted.
- Chart overlays cleaned.
- Opaque guide boxes removed.
- Desktop/mobile tests passed for the v26.9 lockdown candidate.
- Result summary and missed-read coach flow accepted.

### Preserved

- No gameplay, scoring, XP, timer, answer dock, result screen, Pattern Library wording, answer pool, candle generation, chart overlay, or generator logic changes were made for v27.0.
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers.
- Range High, Channel Mean, Range Low, and the Quest Moment banner remain part of the active chart read.

### Testing required

- Desktop app load, Start Run, answer selection, timer, ten-question completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm build badge shows `v27.0 - World 1 Lockdown`.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish Candle and Bearish Candle do not appear as World 1 quiz answers.

---

## v26.9 - World 1 Lockdown Candidate

Status: accepted World 1 lockdown-candidate pass promoted to v27.0

### Changed

- Updated `game.js` build marker to `v26_9_world1_lockdown_candidate`.
- Updated build badge to `v26.9 - World 1 Lockdown Candidate`.
- Froze the active World 1 answer-pool array so the five-answer pool cannot be mutated at runtime.
- Disabled generator debug logging for release-candidate console cleanliness.
- Removed an accidental implicit global assignment from the generator debug logger in case debug logging is re-enabled later.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible wording and validation.
- v26.6 candle rhythm and Bullish/Bearish Engulfing replay sequencing.
- v26.7 location realism and setup-story weighting.
- v26.8 ambiguity safeguards and stricter Engulfing body-boundary validation.
- v26.8.1 clean chart with no opaque setup-zone or Quest-zone guide boxes.
- Range High, Channel Mean, Range Low, and the Quest Moment banner.
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, shop, and coach carousel behavior.
- mobile and desktop layout behavior.

### Testing required

- Desktop app load, Start Run, answer selection, timer, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish Candle and Bearish Candle do not appear as World 1 quiz answers.
- Confirm no opaque guide box, yellow focus band, or debug-like Quest Zone label is visible during replay/run or answer phase.
- Confirm Range High, Channel Mean, Range Low, candles, and the Quest Moment banner remain visible.

---

## v26.8.1 - Opaque Guide Removal

Status: previous opaque guide removal test candidate

### Changed

- Updated `game.js` build marker to `v26_8_1_opaque_guide_removal`.
- Updated build badge to `v26.8.1 - Opaque Guide Removal`.
- Removed the player-facing setup-zone guide rectangle drawn during the run/replay phase.
- Removed the player-facing Quest-zone guide rectangle drawn during the frozen answer phase.
- Kept setup-zone data available internally for generator/location flow while stopping the chart from drawing opaque guide boxes.

### Preserved

- Range High, Channel Mean, Range Low, and the Quest Moment banner.
- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible validation and wording.
- v26.6 candle rhythm and Bullish/Bearish Engulfing replay sequencing.
- v26.7 location realism and setup-story weighting.
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, shop, and coach carousel behavior.
- mobile and desktop layout behavior.

### Testing required

- Desktop app load, Start Run, answer selection, timer, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm no opaque guide box is visible during replay/run or answer phase.
- Confirm Range High, Channel Mean, Range Low, candles, and the Quest Moment banner remain visible.
- Confirm yellow focus bands and debug-like Quest Zone boxes or labels are not visible on the player-facing chart.

---

## v26.8 - World 1 QA / Ambiguity Sweep

Status: current active World 1 QA / ambiguity sweep test candidate

### Changed

- Updated `game.js` build marker to `v26_8_world1_qa_ambiguity_sweep`.
- Updated build badge to `v26.8 - World 1 QA / Ambiguity Sweep`.
- Added an explicit `W1_ACTIVE_PATTERNS` source for World 1 freeze/answer-option selection.
- Tightened Bullish Engulfing validation so the second body must start at or below the prior bearish body low, not merely engulf by wick or close.
- Tightened Bearish Engulfing validation so the second body must start at or above the prior bullish body high, not merely engulf by wick or close.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible wording and single-candle validation
- v26.6 candle rhythm and Bullish/Bearish Engulfing replay sequencing
- v26.7 location realism and setup-story weighting
- v26.6.1 chart overlay cleanup
- Range High, Channel Mean, Range Low, and the Quest Moment banner
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, shop, and coach carousel behavior
- mobile and desktop layout behavior

### Testing required

- Desktop app load, Start Run, answer selection, timer, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish/Bearish Engulfing still show the prior pressure candle before Quest Moment and only the engulfing control-shift candle at Quest Moment.
- Confirm Hammer, Shooting Star, and Doji remain distinct and Pattern Bible fair.
- Confirm v26.7 location weighting still feels realistic and not random.
- Confirm yellow focus bands and heavy debug overlays are not visible on the player-facing chart.

---

## v26.7 - World 1 Location Logic Pass

Status: current active World 1 location logic patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_7_world1_location_logic_pass`.
- Updated build badge to `v26.7 - World 1 Location Logic Pass`.
- Added lightweight World 1 location profiles inside the existing setup-story generator.
- Weighted Hammer and Bullish Engulfing toward Range Low/support, with occasional lower-channel pullback/weakness setups.
- Weighted Shooting Star and Bearish Engulfing toward Range High/resistance, with occasional upper-channel rally/rejection setups.
- Weighted Doji toward Channel Mean hesitation/compression, with occasional Range High/Range Low hesitation setups.
- Reused existing setup target and setup zone plumbing so location changes remain small and explainable.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible wording and v26.5 final-candle validation
- v26.6 candle rhythm and Bullish/Bearish Engulfing replay sequencing
- v26.6.1 chart overlay cleanup
- v26.3.0 compact chart viewport and candle count
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, and coach carousel behavior
- mobile and desktop layout behavior

### Testing required

- Desktop app load, Start Run, answer selection, timer, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Hammer/Bullish Engulfing mostly form after bearish pressure near Range Low/support, with occasional lower-channel pullback setups.
- Confirm Shooting Star/Bearish Engulfing mostly form after bullish pressure near Range High/resistance, with occasional upper-channel rally setups.
- Confirm Doji mostly forms around Channel Mean compression/hesitation, with edge hesitation only as controlled variation.
- Confirm Bullish/Bearish Engulfing still show the prior pressure candle before Quest Moment and only the engulfing control-shift candle at Quest Moment.
- Confirm yellow focus bands and heavy debug overlays are not visible on the player-facing chart.

---

## v26.6.1 - Chart Overlay Cleanup

Status: previous chart overlay cleanup patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_6_1_chart_overlay_cleanup`.
- Updated build badge to `v26.6.1 - Chart Overlay Cleanup`.
- Removed the player-facing right-side focus panel and `focus` label from the gameplay canvas.
- Removed the yellow vertical Quest Moment signal focus bands behind candles.
- Simplified the frozen Quest Zone overlay into a faint, unlabeled guide band so it no longer competes with candles and range lines.
- Preserved the Range High, Channel Mean, and Range Low lines and labels.

### Preserved

- v26.6 World 1 candle rhythm improvements
- v26.6 Bullish/Bearish Engulfing replay sequencing
- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Pattern Bible wording and v26.5 generator fairness rules
- v26.3.0 compact chart viewport and candle count
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, and coach carousel behavior
- mobile and desktop layout behavior

### Testing required

- Desktop app load, Start Run, answer selection, timer, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, timer, bottom-sheet review, and carousel swipe.
- Confirm yellow vertical focus bands and `focus` labels are not visible on the player-facing chart.
- Confirm the Quest Zone visual is subtle and unlabeled while Range High, Channel Mean, Range Low, and the Quest Moment banner remain visible.
- Confirm Bullish/Bearish Engulfing still show the prior pressure candle before Quest Moment and only the engulfing control-shift candle at Quest Moment.

---

## v26.6 - World 1 Candle Rhythm + Engulfing Replay Sequencing

Status: previous active World 1 replay rhythm and engulfing sequencing patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_6_world1_candle_rhythm_engulfing_replay_sequencing`.
- Updated build badge to `v26.6 - World 1 Candle Rhythm + Engulfing Replay Sequencing`.
- Added a small World 1 setup-story layer for the five active answers so replay candles form controlled push/pause, impulse/pullback, and compression/expansion paths before Quest Moment.
- Added stronger but bounded pre-signal movement toward Range Low for Hammer/Bullish Engulfing and toward Range High for Shooting Star/Bearish Engulfing.
- Added Doji-specific hesitation context so the final Doji appears after movement or compression instead of flat mean drift.
- Increased body and wick variation in World 1 setup candles while screening out setup candles that accidentally read like Hammer, Shooting Star, or Doji.
- Moved Bullish/Bearish Engulfing prior-candle shaping into the final visible setup beat so the bearish/bullish pressure candle appears before Quest Moment.
- Changed Bullish/Bearish Engulfing Quest Moment generation to print only the second engulfing candle, then start the answer timer.
- Kept the final two-candle engulfing validator in place for body-engulfing correctness.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible wording from v26.4
- v26.5 final-candle validation and overlap rejection
- chart viewport/render behavior from v26.3.0
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, and coach carousel behavior
- mobile and desktop layout behavior

### Testing required

- Desktop app load, Start Run, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, normal completion, bottom-sheet review, and carousel swipe.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish Candle and Bearish Candle do not appear as World 1 quiz answers.
- Visually sample World 1 replays: setup candles should show more believable pushes, pullbacks, body variation, and wick variation without making final Quest Moment candles ambiguous.
- Confirm Bullish/Bearish Engulfing show the prior pressure candle before Quest Moment and only the engulfing control-shift candle at Quest Moment.

---

## v26.5 - World 1 Generator Fairness Pass

Status: previous World 1 generator fairness patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_5_world1_generator_fairness_pass`.
- Updated build badge to `v26.5 - World 1 Generator Fairness Pass`.
- Tightened World 1 Hammer, Shooting Star, and Doji recipe ranges and validation thresholds against Pattern Bible v1.0.
- Added shared single-candle shape metrics and overlap checks so Doji-like rejection candles and rejection-like Dojis are rejected/regenerated.
- Validates shifted final forced candles after they are aligned to the live previous close.
- Added explicit two-candle context shaping and validation for Bullish Engulfing and Bearish Engulfing.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- Pattern Bible wording from v26.4
- chart viewport/render behavior from v26.3.0
- gameplay, scoring, XP, timer, result screen layout, answer dock, Pattern Library UI, and coach carousel behavior
- mobile and desktop layout behavior

### Testing required

- Desktop app load, Start Run, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, normal completion, bottom-sheet review, and carousel swipe.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish Candle and Bearish Candle do not appear as World 1 quiz answers.
- Visually sample World 1 forced questions: Hammers should not read as Doji, Shooting Stars should not read as Doji, Dojis should not read as Hammer/Shooting Star, and Engulfing patterns should visibly use the prior candle body.

---

## v26.4 - World 1 Pattern Bible Lock

Status: current active World 1 wording/source-of-truth patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_4_world1_pattern_bible_lock`.
- Updated build badge to `v26.4 - World 1 Pattern Bible Lock`.
- Updated the Pattern Library wording for Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji to align with World 1 Pattern Bible v1.0.
- Added optional Pattern Library Bible detail rows for must-have and invalid-if wording on the five active World 1 entries.
- Updated missed-read coach card shapes/cues for the five active World 1 patterns to use the Bible player cues.
- Updated README and checkpoint docs to state the active World 1 answer pool and document World 1 Pattern Bible v1.0.

### Preserved

- active World 1 answer pool: Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, Doji
- Bullish Candle and Bearish Candle remain non-active reference concepts, not World 1 quiz answers
- generator behavior and fairness logic
- gameplay, scoring, XP, timer, chart rendering, result screen layout, and coach carousel behavior
- mobile and desktop layout behavior from v26.3.0

### Testing required

- Desktop app load, Start Run, normal completion, result summary, and Review missed reads.
- iPhone/mobile app load, Start Run, answer dock tap targets, normal completion, bottom-sheet review, and carousel swipe.
- Confirm Pattern Library entries show the v1.0 definitions, must-have lines, invalid-if lines, and player cues.
- Confirm active World 1 answers remain Bullish Engulfing, Bearish Engulfing, Hammer, Shooting Star, and Doji only.
- Confirm Bullish Candle and Bearish Candle do not appear as World 1 quiz answers.

---

## v26.3.0 - Chart Viewport Unification

Status: current active chart viewport consistency patch / test candidate

### Changed

- Updated `game.js` build marker to `v26_3_0_chart_viewport_unification`.
- Updated build badge to `v26.3.0 - Chart Viewport Unification`.
- Capped the active desktop gameplay chart viewport to a compact recent-candle slice instead of rendering the full retained desktop candle buffer.
- Gave desktop the same compact stage-span philosophy used by the mobile chart so full-width desktop no longer stretches back into the older wide-chart feel.
- Kept the chart anchored near the focus zone while preserving readable candle spacing and the current v26.1.1 candle render cleanup.

### Preserved

- mobile chart behaviour and answer dock layout
- Quest Moment timing and replay behaviour
- setup zone and Quest zone highlight behaviour
- Range High, Channel Mean, and Range Low visibility
- result screen and coach overlay behaviour
- gameplay, scoring, XP, timer, generator, answer pool, Pattern Library, and missed-read tracking data

### Testing required

- Desktop full-width run: confirm the active chart no longer shows a much larger number of concurrent candles than mobile or desktop half-width.
- Desktop half-width run: confirm the chart still feels compact, centered, and readable.
- iPhone/mobile run: confirm the existing mobile chart framing, answer dock, Quest Moment, and summary flow are unchanged.
- Confirm Range High, Channel Mean, Range Low, setup zone, Quest zone highlight, timer, run completion, result summary, and Review missed reads still work.

---

## v26.2.12 - Mobile Result Hero Parity

Status: current active iOS result-screen hero parity / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_12_mobile_result_hero_parity`.
- Updated build badge to `v26.2.12 - Mobile Result Hero Parity`.
- Tuned only the mobile score-summary hero spacing so it tracks closer to the cleaner desktop half-width result view.
- Reduced `RUN COMPLETE` and `CORRECT READS` back into deliberate uppercase labels instead of oversized hero text.
- Kept the `X/10` score strong and central while improving the spacing around the run title, score label, feedback sentence, bonus pill, and Review missed reads button.
- Narrowed and softened the mobile feedback sentence width/line-height so it wraps more comfortably on iPhone.

### Preserved

- desktop result screen styling and behaviour
- stat cards
- Play Again, Lesson Map, and Review missed reads positioning
- coach overlay and carousel content/navigation
- gameplay, scoring, XP, timer, generator, answer pool, Pattern Library, and missed-read tracking data
- build badge

### Testing required

- iPhone full run to the score summary.
- Confirm `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, feedback, fast reads pill, and Review missed reads feel balanced and less awkwardly stacked.
- Confirm the `X/10` score remains the main focal point.
- Confirm the feedback sentence wraps cleanly without forcing awkward vertical scrolling.
- Confirm Review missed reads opens the bottom-sheet coach overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Desktop full run with missed reads to confirm the existing result view remains acceptable.

---

## v26.2.11 - Mobile Result Hero Header

Status: current active iOS result-screen hero header / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_11_mobile_result_hero_header`.
- Updated build badge to `v26.2.11 - Mobile Result Hero Header`.
- Increased only the mobile score-summary hero header typography inside the existing score-header contract.
- Enlarged `RUN COMPLETE` and `CORRECT READS` from secondary micro-labels into clear hero labels on iPhone.
- Increased the mobile `X/10` score so it is the dominant result focal point.
- Slightly strengthened the mobile run title while preserving the current v26.2.10 vertical structure.

### Preserved

- v26.2.10 mobile result screen vertical layout and score-summary structure
- stat cards
- Play Again, Lesson Map, and Review missed reads positioning
- coach overlay and carousel content
- gameplay, scoring, XP, timer, generator, answer pool, Pattern Library, and missed-read tracking data
- removed numbered carousel pagination
- hidden homepage title/XP/shop header on the result screen

### Testing required

- iPhone full run to the score summary.
- Confirm `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, and the feedback sentence stay centered and balanced.
- Confirm `RUN COMPLETE` and `CORRECT READS` are much larger and more readable.
- Confirm the `X/10` score is larger and clearly the main focal point.
- Confirm larger text does not overlap or create awkward scrolling.
- Confirm Review missed reads opens the bottom-sheet coach overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Confirm Play Again, Lesson Map, and Review missed reads remain visible and tappable.
- Desktop full run with missed reads to confirm the result screen and carousel arrows remain acceptable.
- Homepage check to confirm Candle Quest title, XP, and Shop remain visible outside the result screen.

---

## v26.2.10 - Mobile Result Header Scale Bump

Status: previous iOS result-screen header scale bump / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_10_mobile_result_header_scale_bump`.
- Updated build badge to `v26.2.10 - Mobile Result Header Scale Bump`.
- Increased only the mobile score-summary header typography inside the existing score-header contract.
- Bumped the mobile run title and `X/10` score sizes so the result moment feels stronger on iPhone.
- Increased the mobile feedback sentence size with a more comfortable explicit line-height.
- Slightly increased the mobile `RUN COMPLETE` and `CORRECT READS` labels while keeping them secondary.

### Preserved

- v26.2.9 mobile result screen alignment, spacing structure, and result card placement
- stat cards
- Play Again, Lesson Map, and Review missed reads positioning
- coach overlay and carousel content
- gameplay, scoring, XP, timer, generator, answer pool, Pattern Library, and missed-read tracking data
- removed numbered carousel pagination
- hidden homepage title/XP/shop header on the result screen

### Testing required

- iPhone full run to the score summary.
- Confirm `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, and the feedback sentence stay centered and balanced.
- Confirm the run title, `X/10`, and feedback sentence are noticeably larger without moving the result card.
- Confirm larger text does not overlap or create awkward scrolling.
- Confirm Review missed reads opens the bottom-sheet coach overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Confirm Play Again, Lesson Map, and Review missed reads remain visible and tappable.
- Desktop full run with missed reads to confirm the result screen and carousel arrows remain acceptable.
- Homepage check to confirm Candle Quest title, XP, and Shop remain visible outside the result screen.

---

## v26.2.9 - Mobile Result Header Scale

Status: current active iOS result-screen header scale / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_9_mobile_result_header_scale`.
- Updated build badge to `v26.2.9 - Mobile Result Header Scale`.
- Slightly increased the mobile score-summary run title size while preserving the v26.2.8 centered header alignment and margins.
- Slightly increased the mobile `X/10` score size so it reads as the main result moment again.
- Increased the mobile feedback sentence size and line-height for a more confident read.
- Nudged the mobile `RUN COMPLETE` and `CORRECT READS` labels up slightly while keeping them secondary.

### Preserved

- v26.2.8 mobile result header alignment and spacing structure
- mobile result card vertical placement
- stat cards
- Play Again, Lesson Map, and Review missed reads positioning
- coach overlay and carousel content
- gameplay
- scoring
- XP
- timer
- generator
- active World 1 answer pool
- Pattern Library
- missed-read tracking data
- removed numbered carousel pagination
- hidden homepage title/XP/shop header on the result screen

### Testing required

- iPhone full run to the score summary.
- Confirm `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, and the feedback sentence stay centered and balanced.
- Confirm the run title and `X/10` feel stronger without moving the result card.
- Confirm the feedback sentence is readable and not cramped.
- Confirm Review missed reads opens the bottom-sheet coach overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Confirm Play Again, Lesson Map, and Review missed reads remain visible and tappable.
- Desktop full run with missed reads to confirm the result screen and carousel arrows remain acceptable.
- Homepage check to confirm Candle Quest title, XP, and Shop remain visible outside the result screen.

---

## v26.2.8 - Mobile Result Header Lock

Status: current active iOS result-screen header lock / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_8_mobile_result_header_lock`.
- Updated build badge to `v26.2.8 - Mobile Result Header Lock`.
- Added one mobile-only score-header contract for `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, and the feedback sentence.
- Improved mobile result-header spacing with explicit line-height, margins, centered alignment, and a readable feedback sentence width.
- Neutralized the v26.2.4 score-step title/score/comment sizing rules so they no longer compete with the new v26.2.8 header lock.

### Preserved

- gameplay
- scoring
- XP
- timer
- generator
- active World 1 answer pool
- Pattern Library
- missed-read tracking data
- existing coach carousel cards/content
- mobile coach overlay and swipe behaviour
- desktop result layout and carousel arrow behaviour
- hidden homepage title/XP/shop header on the result screen
- removed numbered carousel pagination
- v26.2.7 mobile result card vertical balance

### Testing required

- iPhone full run to the score summary.
- Confirm `RUN COMPLETE`, run title, `X/10`, `CORRECT READS`, and the feedback sentence feel evenly spaced.
- Confirm the feedback sentence wraps readably and does not feel squeezed.
- Confirm Review missed reads opens the bottom-sheet coach overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Confirm Play Again, Lesson Map, and Review missed reads remain visible and tappable.
- Desktop full run with missed reads to confirm the result screen and carousel arrows remain acceptable.
- Homepage check to confirm Candle Quest title, XP, and Shop remain visible outside the result screen.

---

## v26.2.7 - Mobile Result Coach Overlay

Status: current active iOS result-screen coach overlay / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_7_mobile_result_coach_overlay`.
- Updated build badge to `v26.2.7 - Mobile Result Coach Overlay`.
- Rebalanced the mobile score summary so the run-complete content sits nearer the middle of the iPhone result card without shrinking the locked title, score, or comment sizes.
- Changed mobile Review missed reads behavior from a separate result step into a bottom-sheet coach overlay layered over the score summary.
- Added a dismiss path back to the score summary while keeping Play Again and Lesson Map visible on the base result screen.

### Preserved

- gameplay
- scoring
- XP
- timer
- generator
- active World 1 answer pool
- Pattern Library
- missed-read tracking data
- existing coach carousel cards/content
- mobile carousel swipe behaviour
- desktop result step and carousel arrow behaviour
- hidden homepage title/XP/shop header on the result screen
- removed numbered carousel pagination

### Testing required

- iPhone full run with at least one missed read.
- Confirm the result lands on the score summary first.
- Confirm Review missed reads opens as a bottom-sheet overlay and Back to score dismisses it.
- Confirm coach cards still swipe horizontally on iPhone.
- Confirm Play Again and Lesson Map remain visible and tappable after dismissing the overlay.
- Desktop full run with missed reads to confirm the carousel step and side arrows still work.
- Homepage check to confirm Candle Quest title, XP, and Shop remain visible outside the result screen.

---
## v26.2.6 · Mobile Result Vertical Balance

Status: current active iOS result-screen vertical balance / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_6_mobile_result_vertical_balance`.
- Updated build badge to `v26.2.6 · Mobile Result Vertical Balance`.
- Added a mobile-only score-step balance layer so the result card uses more of the iPhone viewport height.
- Moved the mobile score-step stat cards and Play Again / Lesson Map buttons lower without reducing the locked title, score, or comment type sizes.

### Preserved

- gameplay
- scoring
- XP
- timer
- generator
- active World 1 answer pool
- Pattern Library
- v26.2.3 two-step result flow
- Review missed reads button
- missed-reads coach carousel layout
- mobile carousel swipe behaviour
- desktop result layout

### Testing required

- iPhone full run to the score screen.
- Confirm the score screen still fits without awkward scrolling.
- Confirm stat cards and Play Again / Lesson Map sit lower and reduce bottom dead space.
- Confirm Review missed reads opens the carousel and Back to score returns correctly.
- Desktop run-complete check to confirm the result screen remains acceptable.

---

## v26.2.5 · Result Flow QA Lock

Status: current active result-flow QA lock / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_5_result_flow_qa_lock`.
- Updated build badge to `v26.2.5 · Result Flow QA Lock`.
- Added a result-flow CSS lock layer to keep score/review result steps separated.
- Reinforced desktop coach carousel arrows and mobile horizontal swipe behaviour.

### Preserved

- gameplay
- scoring
- XP
- timer
- generator
- active World 1 answer pool
- Pattern Library
- v26.2.3 result stepper
- v26.2.4 mobile result polish
- desktop carousel arrows
- mobile swipe behaviour

### Testing required

- Desktop full run with missed reads.
- Confirm Review missed reads opens the carousel step.
- Confirm desktop carousel arrows remain visible and scroll slides.
- iPhone full run with missed reads.
- Confirm mobile swipe remains smooth and arrows stay hidden.
- Confirm Play Again and Lesson Map still work from the score step.

---

## v26.2.4 · Mobile Result Polish

Status: current active iOS result-screen polish / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_4_mobile_result_polish`.
- Updated build badge to `v26.2.4 · Mobile Result Polish`.
- Further reduced the mobile `X/10` score size on the score-first result step.
- Tightened mobile result title, correct-reads label, comment spacing, bonus pill, stat cards, and score-step vertical rhythm.
- Preserved the v26.2.3 two-step result flow and coach carousel.

### Preserved

- v26.2.3 result stepper
- v26.2.2 coach carousel visuals
- missed-read grouping and tracking
- v26.1.1 tiny candle renderer cleanup
- v26.1 generator doctrine engine
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile/desktop gameplay layout

### Testing required

- iPhone result screen after a run.
- Confirm `X/10` no longer dominates the score screen.
- Confirm result title/comment have breathing room.
- Confirm Review missed reads still opens the carousel.
- Confirm Play Again and Lesson Map remain easy to tap.

---
## v26.2.3 · Result Flow Stepper

Status: current active iOS summary-flow polish / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_3_result_flow_stepper`.
- Updated build badge to `v26.2.3 · Result Flow Stepper`.
- Split the run-complete result into two steps:
  - Score step: result title, `X/10`, comment, bonus, stats, and navigation.
  - Review step: missed-reads coach carousel and review navigation.
- Added `showResultStep()` for switching between score and review inside the result screen.
- Hid the global Candle Quest header and XP/Shop wallet on the result screen.
- Removed the numbered carousel dots under the coach carousel.
- Preserved side arrows on desktop and swipe behaviour on iPhone.
- Reduced the mobile `X/10` summary score size slightly to reduce cramped layout.

### Preserved

- v26.2.2 coach carousel visuals
- missed-read grouping
- v26.1.1 tiny candle renderer cleanup
- v26.1 generator doctrine engine
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile gameplay layout
- desktop gameplay layout
- game progression

### Testing required

- Desktop run with several missed patterns.
- iPhone run with several missed patterns.
- Confirm result screen opens on the score step first.
- Confirm Review missed reads opens the coach carousel step.
- Confirm Back to score works.
- Confirm numbered dots are gone.
- Confirm side arrows remain on desktop.
- Confirm iPhone swipe remains smooth.
- Confirm result page requires much less vertical scrolling on iOS.

---

## v26.2.2 · Missed Reads Coach Carousel

Status: current active visual coach-carousel upgrade / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_2_missed_reads_coach_carousel`.
- Updated build badge to `v26.2.2 · Missed Reads Coach Carousel`.
- Replaced the compact missed-read card grid with a swipeable coach carousel.
- Each missed pattern type now appears as a larger visual coach slide.
- Added generic TradingView-style chart panels for missed World 1 patterns.
- Added arrows and dot navigation for desktop.
- Optimised the carousel for horizontal swipe on iPhone.
- Kept the review grouped by correct pattern and preserved common wrong-choice summaries.
- Reinforced the learning ladder by presenting each miss as Shape + Location, not a text-heavy report.

### Preserved

- v26.2.1 missed-read grouping
- v26.2 missed-read tracking
- v26.1.1 tiny candle renderer cleanup
- v26.1 World 1 generator doctrine engine
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile gameplay layout
- desktop gameplay layout
- game progression

### Testing required

- Desktop full run with several missed patterns.
- iPhone full run with several missed patterns.
- Confirm carousel swipes horizontally on iPhone.
- Confirm arrows and dots work on desktop.
- Confirm Play Again and Lesson Map remain easy to reach.
- Confirm clean-run message still appears when no reads are missed.
- Confirm timer / XP / Streak / Summary still work.

---

## v26.2.1 · Visual Missed Reads Review

Status: current active visual coach upgrade / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_1_visual_missed_reads_review`.
- Updated build badge to `v26.2.1 · Visual Missed Reads Review`.
- Replaced the text-heavy missed-read review with compact visual coach cards.
- Grouped missed reads by correct pattern instead of listing only the first three misses.
- Removed the `+ more missed reads to review later` language.
- Added one generic visual card per missed World 1 candle structure:
  - Bullish Engulfing
  - Bearish Engulfing
  - Hammer
  - Shooting Star
  - Doji
- Added simple shape and level cues to each missed-read card.
- Added common wrong-choice/confusion summary per missed pattern.
- Updated `README.md`, `CHANGELOG.md`, and `CHECKPOINT_SUMMARY.md` to reflect the Shape → Location → Context → Quality → Risk → Execution doctrine.

### Preserved

- v26.2 missed-read tracking
- v26.1.1 tiny candle renderer cleanup
- v26.1 World 1 generator doctrine engine
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile gameplay layout
- desktop gameplay layout
- game progression

### Testing required

- Desktop full run with multiple wrong answers.
- iPhone full run with multiple wrong answers.
- Confirm missed reads group by pattern.
- Confirm all missed pattern types from the run appear.
- Confirm visual cards are readable and not too crowded on mobile.
- Confirm clean-run message still appears when no reads are missed.
- Confirm timer / XP / Streak / Summary still work.

---

## v26.2 · Missed Reads Review

Status: current active learning-loop upgrade / test candidate

### Changed

- Updated `game.js` build marker to `v26_2_missed_reads_review`.
- Updated build badge to `v26.2 · Missed Reads Review`.
- Added missed-read tracking for wrong answers and timeouts during a run.
- Added an end-of-run `Review your missed reads` section underneath the normal summary.
- Added compact pattern-specific review notes for the current World 1 active answers:
  - Bullish Engulfing
  - Bearish Engulfing
  - Hammer
  - Shooting Star
  - Doji
- Limited the visible review to the first three missed reads, with a small overflow note when there are more.
- Added a clean-run message when no reads were missed.
- Added CSS for desktop and mobile missed-read review cards.
- Changed the result body container from a paragraph to a div so summary/review cards render cleanly.

### Preserved

- v26.1.1 tiny candle renderer cleanup
- v26.1 World 1 generator doctrine engine
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- shop
- mobile gameplay layout
- desktop gameplay layout
- summary score/stat hierarchy
- game progression

### Testing required

- Desktop full run with at least one wrong answer.
- iPhone full run with at least one wrong answer.
- Timeout review card appears correctly.
- Perfect/clean run summary remains uncluttered.
- Play Again and Lesson Map still work.
- Timer / XP / Streak still work.

---

## v26.1.1 · Tiny Candle Render Cleanup

Status: current active renderer test / strong checkpoint candidate

### Changed

- Updated `game.js` build marker to `v26_1_1_tiny_candle_render_cleanup`.
- Updated build badge to `v26.1.1 · Tiny Candle Render Cleanup`.
- Reworked the `drawFlatCandle()` canvas renderer only.
- Fixed tiny candle and doji rendering so very small bodies no longer appear clipped, uneven, or malformed.
- Forced candle body widths to use symmetrical odd-number sizing so the body has a true visual centre.
- Derived body position from the same snapped candle centre used by the wick.
- Drew the wick as a whole-pixel rectangle through the body centre to reduce fractional stroke blur.
- Rendered tiny-body candles as clean doji-style horizontal bars.
- Preserved candle colour direction logic, signal-candle focus boost, chart spacing, and layout.

### Preserved

- `W1_RECIPES`
- `_generateW1Candle`
- `_validateW1Candle`
- `_pickDiversePattern`
- active World 1 answer pool
- scoring
- XP
- timer
- static answer dock
- Pattern Library
- summary screen
- shop
- mobile layout
- desktop layout
- game progression

### Testing status

- JavaScript syntax check passed.
- Requires visual desktop and iPhone comparison against v26.1 original renderer before final lock.

### Known watch points

- Confirm mobile wick weight still reads clearly after the renderer cleanup.
- Confirm dojis look intentional rather than too flat.
- Confirm Hammer / Shooting Star / Doji remain visually obvious.

---

## v26.1 · World 1 Generator Doctrine Engine

Status: strong generator checkpoint / base for v26.1.1

### Changed

- Updated `game.js` build marker to `v26_1_world1_generator_doctrine_engine`.
- Added/retained World 1 recipe-generator direction for doctrine-backed candle generation.
- Added validation-oriented logic for single-candle structures.
- Added diversity logic to reduce repeat pattern streaks.
- Preserved Bullish/Bearish Engulfing as active World 1 gameplay options.
- Kept Bullish/Bearish Candle as doctrine/reference concepts, not direct replacements for Engulfing patterns.
- README updated to reflect the current v26.1 project state.
- Added `CHANGELOG.md` for version history separate from README.
- Added `CHECKPOINT_SUMMARY.md` for the current handoff state.
- Added `manifest.webmanifest` for PWA support.
- Normalised icon folder to lowercase `icons/` to match `index.html` paths.

### Testing status

- Desktop loads.
- iPhone loads.
- Start Run works.
- Static answer dock works.
- Active game layout feels good.
- World 1 active answers are correct.
- Pattern Library has been corrected.
- Play Again works.
- Timer / Streak / XP run as intended.
- Repeats feel reduced.
- No significant final-candle gaps observed.
- Summary screen looks good on desktop.

### Known watch points

- Continue human fairness testing of World 1 generator output.
- Confirm doctrine-generated candles feel visually fair to a human tester, not just valid by code.

---

## v26.0 · World 1 Generator Doctrine Engine

### Changed

- Introduced the first recipe-based generator concept for World 1.
- Added validation rules based on Pattern Bible doctrine.
- Added anti-repeat / diversity logic.
- Added debug output for generator inspection.

### Issue found

- Initial Claude pass introduced Bullish Candle / Bearish Candle as active answer labels, creating confusion with the previous Bullish Engulfing / Bearish Engulfing gameplay options.

---

## v25.9 · Mobile Summary Declutter

### Changed

- Removed Longest Streak from the run-complete summary.
- Removed the black Bonus XP included pill.
- Kept useful fast-read XP pill.
- Kept perfect-run bonus pill for future 10/10 runs.
- Tightened mobile summary spacing.
- Preserved static answer dock from v25.8.

---

## v25.8 · Static Answer Dock

### Changed

- Answer box now stays static underneath the chart.
- Placeholder answer slots appear during setup/replay.
- Real answer labels swap into the same fixed dock at Quest Moment.
- Answer panel no longer pops up and shifts layout.
- Major gameplay stability improvement.

---

## v25.7 · Desktop Summary Rebalance

### Changed

- Rebalanced desktop summary proportions after compression.
- Improved spacing around result title, score, comment, stat cards, and buttons.

---

## v25.6 · Summary Compression + Desktop Shop Cleanup

### Changed

- Reduced run-summary score size.
- Reduced result title size.
- Tightened result header spacing.
- Slightly shrank stat cards.
- Fixed duplicate Shop/XP on desktop.

---

## v25.5 · Mobile Cockpit Compact

### Changed

- Hid large top header during mobile gameplay.
- Added compact in-game XP/Shop mini-wallet beside streak area.
- Reduced HUD font sizes.
- Reduced score/time box sizes.
- Moved Exit lower so it no longer competed with the chart.

---

## v25.4 · Mobile Answer Layout

### Changed

- Moved answer buttons below the chart instead of floating over it.
- Reduced overlap between chart and answer section.
- Added screen-state hook for mobile gameplay styling.

---

## v25.3 · Mobile Candle Polish

### Changed

- Tightened mobile candle spacing.
- Increased candle body width.
- Increased wick thickness.
- Improved chart framing.
- Preserved Range High / Channel Mean / Range Low visibility.

---

## v25.2 and earlier

Earlier builds established the mobile-first game loop, 7-second Quest Moment timer, XP system, streaks, Pattern Library, and core chart identity.
