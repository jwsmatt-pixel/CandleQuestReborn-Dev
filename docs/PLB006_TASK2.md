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
