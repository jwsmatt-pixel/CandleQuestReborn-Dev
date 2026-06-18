# Candle Quest Reborn — Changelog

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
