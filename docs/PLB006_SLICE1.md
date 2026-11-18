# PLB-006 — Slice 1 Classification Foundation

Standalone prototype on the v28.5.8 game baseline. No runtime integration, build-marker change, replay adapter, UI, live data, or Trading Research Studio changes.

## Run

Requires Node with its built-in test runner and Intl America/New_York timezone support (verified on Node v24.18.0). No packages or installation needed.

~~~sh
node --test tests/playbook-classifier.test.mjs
node --check game.js
~~~

Import the named export classifySession from playbook/classifier.mjs in Node or a future browser ES module. The classifier has no Node imports, clock access, side effects, or game dependencies. It returns a fresh result without mutating input. Browser execution is not verified in this slice.

## Input contract

~~~js
import {classifySession} from './playbook/classifier.mjs';
const result = classifySession({
  instrument: 'COINBASE:BTCUSD',
  dataKind: 'synthetic', // Explicit training-data label, never a market-history claim.
  timeframe: '1m',
  sessionDate: '2026-01-15', // Calendar date in America/New_York.
  asOf: '2026-01-15T16:01:00.000Z', // Explicit knowledge/completion cutoff.
  candles: [
    {timestamp: '2026-01-15T14:30:00.000Z',
      open: 100, high: 110, low: 90, close: 100, complete: true}
    // Supply subsequent minutes in strict chronological order.
  ]
});
// This one-candle example returns incomplete, with no classification.
~~~

All instants use canonical UTC ISO strings YYYY-MM-DDTHH:mm:ss.sssZ. Offset strings, local timestamps, epoch numbers, and silently normalised impossible dates are rejected. Candle timestamps denote OPENINGS and must have seconds and milliseconds zero. Each candle lasts exactly one minute. asOf can be any canonical UTC instant; the system clock is never consulted.

Each candle must have an explicit boolean complete. A completed candle must close at or before asOf; no supplied candle may open after asOf. An uncompleted candle is allowed and cannot contribute to a decision, even when its expected closing time has passed. Truncate a replay snapshot at asOf rather than supplying future history.

OHLC must be finite positive numbers with low <= open/close <= high. Equal prices and zero-range candles are allowed. All supplied candles must belong to sessionDate in New York, be strictly increasing, and have unique timestamps. Every supplied candle is validated, including candles outside the decision windows. Single-session pre/post-window candles are allowed. Missing minutes are reported as incomplete when required by the decision; they are never fabricated, sorted, or treated as evidence of no breakout. Gaps outside the required decision windows do not prevent a result.

## Rules and time boundaries

New York local times use Intl with America/New_York, including daylight saving. The fixtures explicitly cover both 2026 transition dates and surrounding days. Synthetic sessions have no weekday or holiday restriction; the engine does not implement an exchange calendar.

- Opening range: all 15 completed openings 09:30–09:44. High is the maximum wick high; low is the minimum wick low. Frozen at 09:45. No partial range is returned.
- Search: openings 09:45–10:45 inclusive (61 possible closes). A strict close above the high or below the low establishes the first breakout. Wicks and exact-boundary closes do not qualify. Search stops at its first missing/uncompleted candle so a later breakout cannot be incorrectly called first.
- Assessment: the next 15 exact minute openings after the first breakout, excluding that breakout candle. Bullish return is close <= ORH; bearish return is close >= ORL. First return evidence is retained, but neither A nor B is final until all 15 completed closes exist.
- A = Sustained Breakout; B = Failed Initial Breakout; C = No Qualifying Breakout. Later expansion or a breakout in the opposite direction never replaces the first breakout.
- C requires all 61 search candles completed, so the earliest C is 10:46 local. A/B may complete before the rest of the search window. A 10:45 breakout uses 10:46–11:00 assessment openings and cannot finalise until 11:01 local.

## Result contract

Every result has status (complete, incomplete, invalid), classification (A/B/C or null), openingRange, firstBreakout, breachedBoundary, search, assessment, missingCandles, and errors.

- openingRange: high, low, start/end opening timestamps, completesAt freeze instant, and count (15), or null when the range cannot be established.
- firstBreakout: timestamp, direction (bullish/bearish), close, boundary; otherwise null. breachedBoundary repeats that numeric level for direct consumers.
- search: start/end opening timestamps, completesAt (10:46), checkedCloses containing timestamp/close evidence up to the first breakout or data gap. These are the closes actually searched, not an assertion that the full window has elapsed.
- assessment: start/end opening timestamps, completesAt, expectedCount (15), observedCount, closes (timestamp, close, returnedToBoundary), firstReturn evidence or null. It is null until a first breakout is established.
- missingCandles: required opening timestamps with phase and reason (missing or not-completed). Opening-range and assessment checks list all unavailable required candles. Search reports the first gap and stops; a caller should resubmit after filling it.
- errors: structured code/message and zero-based candle index where relevant. Invalid input returns no decision or partial evidence. Structural errors, duplicates, order violations, invalid OHLC, date/timestamp violations, missing completion flags, and impossible future-completion claims are invalid.

Incomplete input always returns classification null, even with visible failure evidence. Complete results always have classification A/B/C. Missing data is an availability problem (incomplete); malformed or contradictory supplied data is invalid. No rounding tolerance is applied to price comparisons.

## Verification and scope

Deterministic synthetic fixtures and node:test cover both directions, first-breakout retention, later expansion, opposite-boundary crossing, immediate and fifteenth-close returns, assessment wicks, exact boundaries, no breakout, last permitted breakout, incomplete prefixes, missing/duplicate/out-of-order candles, invalid OHLC and metadata, invalid/future timestamps, DST dates, and immutable input.

Human review of Slice 1 is the next gate. Replay adapters and all subsequent slices remain outside this change. The legacy roadmap, official Trading Research Studio baseline, Worlds 1–4, XP, progression, saved data, and logs/ ignore rule are preserved.
