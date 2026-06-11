# Candle Quest Reborn — v26.1 Checkpoint Summary

## Current build

**v26.1 · World 1 Generator Doctrine Engine**  
Build marker: `v26_1_world1_generator_doctrine_engine`

## Current status

Active development checkpoint.

The app works on desktop after the v26 generator update, but this build should still be treated as a test build until iPhone and gameplay-quality checks are complete.

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

## What changed in this packaged handoff

### Code / game state

- Preserved current v26.1 `game.js` from the uploaded GitHub ZIP.
- Preserved current `index.html` and `style.css` from the uploaded GitHub ZIP.
- Did not rewrite the gameplay code.

### Documentation / packaging

- Replaced outdated v25.6 README with current v26.1 project overview.
- Added `CHANGELOG.md` so version history is tracked outside the README.
- Added `CHECKPOINT_SUMMARY.md` for quick handoff context.
- Added missing `manifest.webmanifest`.
- Normalised `Icons/` to lowercase `icons/` to match paths in `index.html`.

## Important project context

The project has moved from pure UI polish into generator-doctrine work.

Current philosophy:

> Polish the existing core until every question feels fair. Then expand.

The Pattern Bible is becoming the source of truth for candle definitions and generator rules.

## Current World 1 distinction

Active gameplay currently includes:

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

Doctrine/reference concepts also include:

- Bullish Candle
- Bearish Candle
- Bullish Rejection
- Bearish Rejection

Important:

Bullish Candle / Bearish Candle are not the same as Bullish Engulfing / Bearish Engulfing.

## Next recommended test

Use GitHub Pages with:

```text
?fresh=261
```

Then check:

1. Desktop full run
2. iPhone full run
3. Pattern answer labels
4. Repetition/diversity
5. Hammer / Shooting Star / Doji visual quality
6. Summary screen
7. Pattern Library
8. Add to Home Screen / PWA behaviour

## Known risk

The generator may be valid by internal rules but still need manual human review for educational clarity.

Human fairness testing is now more important than code-only validation.
