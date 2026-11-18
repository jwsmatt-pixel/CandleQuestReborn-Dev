# PLB-006 Task 3 — Guided Training expansion

Task 3 extends the accepted Task 2 prototype. The historical Task 2 notes follow below.

## Launch and play

From PowerShell in the repository:

~~~powershell
Set-Location 'C:\Users\jwsma\OneDrive\Documents\GitHub\CandleQuestReborn-Dev'
py -m http.server 8000 --bind 127.0.0.1
~~~

Open http://127.0.0.1:8000 and choose **Playbook Training · Prototype**. Python 3 is required; no install/build step. Keep the terminal open; Ctrl+C stops the server. Use HTTP for ES modules.

Each first viewing autoplays for approximately 60 seconds. Then choose **Answer now** or **Inspect replay first**. Inspection retains Play/Pause, Previous candle, Next candle and Restart. Submit classification and description together to reveal feedback and evidence. **Next synthetic exercise →** advances without a consecutive repeat; Restart repeats the current exercise. The five-exercise rotation is kept only in memory, wraps after five and starts over after a page reload.

The deterministic rotation is: Failed Bullish Initial Breakout (B), Sustained Bullish Breakout (A), Failed Bearish Initial Breakout (B), Sustained Bearish Breakout (A), No Qualifying Breakout (C). Only generic exercise numbers appear before feedback. These are invented synthetic BTCUSD 1m candles for 15 January 2026; canonical UTC timestamps map to New York session rules. Outcome names, grades and descriptions derive from the original classifier.

## Changes from Task 2

- Five playable cases with classifier-driven completion. All A/B cases retain 37 sequential completed candles, including all 15 following closes even after a return. C retains all 76 candles (15 opening-range plus 61 search closes).
- One tuning point: `DEFAULT_AUTOPLAY_MS = 60000` in playbook/replay.mjs. Per-candle interval is duration / required candle count; every scenario has the same target total time. Background timer throttling can extend real playback. C has a faster cadence because it requires more candles.
- Short instructions above the dominant navy chart; optional rules below it. Clear Observe, Inspect, Answer and Review stages. Completion focuses the next-step panel and emphasises Answer now. Existing answer targets remain at least 48px high.
- Narrower charts show fewer candles with wider bodies; every candle remains reachable through inspection. Blue ORH, pink ORL, translucent range box, white/outlined candles and feedback-only yellow outlines remain intact.
- Feedback removes duplicate correct-description text, adds a concise legend and a prominent Next action. C includes full-search shading and search-end evidence navigation. Description choices vary position deterministically.
- No classifier rules, Worlds, XP, player storage, research baseline, dependencies or hybrid controller changes.

## Verification and human review

~~~powershell
node --test tests/playbook-*.test.mjs
node --check game.js
Get-ChildItem playbook,tests -Recurse -Filter *.mjs | ForEach-Object { node --check $_.FullName }
git diff --check
~~~

Baseline: 90 tests passed. Task 3: 101 tests passed, covering all five outcomes, valid OHLC/completion, required assessment/search periods, prefix isolation, descriptions, duration configuration, UI transitions and a complete rotation/wrap. DOM/timer simulation includes a 320px SVG width; it does not establish rendered layout correctness.

Rendered browser/mobile testing remains for human review: isolated Playwright/Puppeteer tooling is unavailable in this workspace. No existing browser profile or external account was accessed. Test 320/375/390px portrait and landscape, chart readability, touch/keyboard navigation, completion focus/scroll, 60-second pacing, all inspection and evidence controls, correct/wrong answers, next/restart/exit/re-entry and existing Worlds/saved progression. Fixed finite exercises can become familiar; broader variation is outside this task. Stop after Task 3 for human review; Task 4 is not started.

---
# PLB-006 Task 2 — Guided Training prototype

## Launch on Windows

In PowerShell:

~~~powershell
Set-Location 'C:\Users\jwsma\OneDrive\Documents\GitHub\CandleQuestReborn-Dev'
py -m http.server 8000 --bind 127.0.0.1
~~~

Open http://127.0.0.1:8000 in a browser. Keep the terminal open; Ctrl+C stops the server. No package installation or build step. Python 3 is required for this launch command. ES modules require HTTP; opening index.html directly still supports the legacy game, but Playbook Training displays server instructions if loading fails.

## Play

Choose **Playbook Training · Prototype** on Home, separately from the World controls. First viewing autoplays completed 1m candles for about 75 seconds. Watch provisional ORH (blue) and ORL (pink) develop; they lock at 09:45 New York. The dark navy box covers the 09:30–09:45 range and scrolls out with the moving viewport. Levels continue across the chart. The camera uses only observed candles and observed range levels.

After the required observation pauses, choose **Answer now** or **Inspect replay first**. Inspection offers Play/Pause, Previous candle, Next candle and Restart. Every observed candle remains reachable, including candles outside the current moving viewport. Next always advances exactly one completed candle. Restart clears the exercise and requires a fresh first viewing. Submit an A/B/C answer and a Move → Response → Result description together; neither receives correctness feedback before submission. Feedback highlights first-breakout/return candles in yellow, thickens the relevant boundary, shades the assessment span and provides evidence navigation, replay and restart.

The single labelled synthetic BTCUSD 1m scenario contains invented prices, not live or historical market data. Its current classifier result is B: ORH 60120 / ORL 59880; a 09:47 wick and a 09:48 boundary-equal close do not qualify; the first strict bullish close is the 09:51 candle at 60148 (completed at 09:52); first return is the 09:57 candle at 60110 (completed at 09:58). All 15 following completed candles (09:52–10:06) are required; completion cutoff is 10:07 New York. Later upward expansion does not replace the first breakout. These facts are revealed in player feedback only after submission.

## Implementation boundaries

- Original Slice 1 classifier, tests, fixtures and input/output contract remain unchanged. See PLB006_SLICE1.md.
- scenario.mjs owns synthetic OHLC and canonical UTC metadata. replay.mjs owns prefix/asOf snapshots, sequential state, observation checkpoints, configurable DEFAULT_AUTOPLAY_MS (75000), and evidence-derived descriptions. training.mjs owns the isolated screen and SVG renderer.
- The classifier alone determines the observation endpoint: 15 OR candles; strict first closing breakout in 09:45–10:45 inclusive; 15 following completed candles for A/B, or all 61 search closes for C. Replay tests exercise A, B, C and the last permitted breakout, though the player receives only one scenario.
- No localStorage access, World run calls, XP, scoring, saved progress, framework, dependency or research-baseline changes. Only the Home entry and lazy module loader touch the legacy UI/engine files.
- Browser timers can extend wall-clock playback in background tabs. No advanced playback settings, joystick or intrabar ticks.

## Verification

~~~powershell
node --test tests/playbook-classifier.test.mjs tests/playbook-replay.test.mjs tests/playbook-training.test.mjs
node --check game.js
node --check playbook/classifier.mjs
node --check playbook/scenario.mjs
node --check playbook/replay.mjs
node --check playbook/training.mjs
node --check tests/playbook-replay.test.mjs
node --check tests/playbook-training.test.mjs
git diff --check
~~~

The integration test uses a DOM/timer double and a 320px SVG width; it is not a rendered-browser test. Actual browser/mobile smoke testing is UNVERIFIED: browser access host unavailable. Native fallback also ended because it could not determine the current URL confidently enough to enforce policy; no further browser attempts were made after the user's instruction.

Human manual checks: launch over HTTP; verify Home entry; observe range extremes updating without duplicate/obsolete lines and lock/box at 09:45; watch full 15-candle assessment; test all inspection controls, both answer paths and correct/wrong submissions; use feedback evidence buttons; restart/exit/re-enter; verify keyboard navigation, 320/375/390px mobile and landscape scrolling, chart/labels/touch targets, and World 1–4/progression regression behavior. Tune the default duration only after playtesting. Stop after Task 2 for human review.
