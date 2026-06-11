# Candle Quest Reborn — Changelog

## v26.1 · World 1 Generator Doctrine Engine

Status: current test checkpoint

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

- Desktop was reported working after the v26 generator upload.
- Full iPhone test still required.
- Manual gameplay audit still required.

### Known watch points

- Confirm Bullish Engulfing / Bearish Engulfing remain active gameplay choices where expected.
- Confirm Bullish Candle / Bearish Candle do not appear as active answers unless intentionally enabled.
- Confirm World 1 patterns do not repeat 3–4 times in a row.
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
