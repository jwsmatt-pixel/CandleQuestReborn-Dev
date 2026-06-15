# Candle Quest Reborn — v26.2 Checkpoint Summary

## Current build

**v26.2 · Missed Reads Review**  
Build marker: `v26_2_missed_reads_review`

## Base build

**v26.1.1 · Tiny Candle Render Cleanup**  
Build marker: `v26_1_1_tiny_candle_render_cleanup`

## Current status

Active development checkpoint.

The project now has the clean v26 documentation/package foundation, the v26.1.1 tiny candle renderer cleanup, and the first end-of-run learning-review layer.

Treat this as the current learning-loop test build until desktop and iPhone testing confirms that the missed-read review adds useful feedback without making the mobile summary feel crowded.

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

## What changed in v26.2

### Code / game state

- Updated the build marker and build badge to v26.2.
- Added `missedReads` tracking inside each run.
- Wrong answers now record the correct pattern, chosen answer, and a short review note.
- Timeouts now record as missed reads with `Timeout` as the selected answer.
- End-of-run summary now shows a compact `Review your missed reads` section underneath the normal score/comment/XP summary.
- Clean runs show a small positive clean-run message.
- Review cards are limited to the first three missed reads to keep mobile readable.
- Added mobile/desktop CSS for missed-read review cards.
- Changed the result body container from a paragraph to a div so summary/review cards render cleanly.

### Preserved

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

## Confirmed from v26.1.1 base

Before the v26.1.1 renderer patch, v26.1 had been confirmed to have:

- Desktop loads
- iPhone loads
- Start Run works
- Static answer dock works
- Active game layout feels good
- World 1 active answers are correct
- Bullish Candle / Bearish Candle are not active gameplay answers
- Pattern Library corrected
- Play Again works
- Timer / Streak / XP run as intended
- Repeats feel reduced
- No significant final-candle gaps observed
- Summary screen looks good on desktop

## Current World 1 active answer pool

- Bullish Engulfing
- Bearish Engulfing
- Hammer
- Shooting Star
- Doji

## Current World 1 doctrine/reference concepts

- Hammer
- Shooting Star
- Doji
- Bullish Candle
- Bearish Candle
- Bullish Rejection
- Bearish Rejection

Important distinction:

Bullish Candle / Bearish Candle are not the same as Bullish Engulfing / Bearish Engulfing.

Bullish Candle and Bearish Candle are reference concepts only at this stage. They should not appear as active World 1 quiz answers unless intentionally enabled later.

## Next recommended test

Use GitHub Pages with:

```text
?fresh=262
```

Then check:

1. Desktop full run with at least one wrong answer
2. iPhone full run with at least one wrong answer
3. Timeout behaviour records a missed read
4. Clean/perfect run summary stays uncluttered
5. Missed-read cards are useful but not too large
6. Tiny candle/doji rendering still looks clean
7. Hammer / Shooting Star / Doji readability
8. Bullish/Bearish Engulfing readability
9. Pattern answer labels remain correct
10. Repetition/diversity still feels controlled
11. Pattern Library opens
12. Add to Home Screen / PWA behaviour

## Known watch points

- Confirm missed-read review does not make the mobile summary feel too crowded.
- Confirm wrong answers and timeouts both appear correctly in the review.
- Mobile wick width from v26.1.1 should still read clearly on iPhone.
- Dojis should still look intentional, not too flat or overly digital.
- The larger market-rhythm issue remains separate: background candles can still feel too flat or low-volatility.

## Next intended work

Recommended sequence:

```text
v26.3 · Natural Candle Rhythm Pass
v26.4 · Engulfing Doctrine Engine
```

Do not combine market rhythm and engulfing doctrine until v26.2 has been tested on desktop and iPhone.

## Current development philosophy

> Polish the existing core until every question feels fair. Then expand.

The game has moved from pure UI polish into generator-doctrine and candle-quality work. Human visual testing is now more important than code-only validation.
