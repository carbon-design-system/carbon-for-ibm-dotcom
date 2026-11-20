# Replace Karma with `web-test-runner`

> **Stub.** Created from the discussion in
> [`fix-components-plan.md`](fix-components-plan.md). Sub-tasks are to be filled
> out in a separate conversation thread. Do not start implementation from this
> file alone.

## Top-level overview

**Goal:** run the unit tests for `packages/web-components` the way
`@carbon/web-components` (CWC) v3 does, with `web-test-runner`
(`web-test-runner --node-resolve --concurrency=1`) in a real browser, instead of
Karma on webpack 4 with Babel.

**Why this is a separate plan:** every unit test and snapshot runs through the
runner, so this touches the whole suite and its conventions (Jasmine, the
`karma-snapshot` snapshot format, the accessibility checker). It was not in the
original list of two tooling changes; it was added during the discussion as the
third item needed to match CWC.

**Relationship to the fix plan**

- Karma is what forces Babel into the test compile, because webpack 4 cannot
  parse Lit 3 and CWC v3 syntax without extra transpilation.
- [`fix-components-plan.md`](fix-components-plan.md) changes the Karma `.ts`
  rule as an **interim** step (tagged `TEMP(fix-components)`). This plan
  replaces it.
- The shadowing detector and the regression tests built in the fix plan must be
  ported here (see its "Handoff notes").
- Recommended as the **second** of the three follow-ups, after the
  build-toolchain plan.

## Verified facts

- CWC's test script is `web-test-runner --node-resolve --concurrency=1`, with
  `@web/test-runner`, `@web/test-runner-commands`,
  `@web/test-runner-playwright`, `@web/test-runner-puppeteer` and
  `@open-wc/testing` as dev dependencies. (Upstream
  `packages/web-components/package.json`.)
- This repo's Karma stack: `karma`, `karma-webpack` 4, `karma-jasmine`,
  `karma-snapshot`, `karma-sourcemap-loader`, `karma-chrome-launcher`,
  `karma-firefox-launcher`, `karma-coverage-istanbul-reporter`,
  `karma-spec-reporter`, plus `karma-accessibility-checker`
  (`tests/karma.conf.js`, `tests/karma-accessibility-checker.conf.js`).
- The Karma webpack config currently carries three Babel rules for `.js` (own
  source, `@carbon/*`, and `lit`/`@lit`), documented in the migration plan,
  Step 2. A comment there notes the rules can be removed "when webpack 5 is
  adopted".
- Tests live in `__tests__/*.test.ts` next to each component and use snapshot
  files; snapshot updates run via `yarn test:unit:updateSnapshot`.
- The migration plan records pre-existing failures that are Lit 3 render-timing
  related (Step 9). The runner swap will change timing and may change which
  tests fail.

## Open questions (to resolve when filling out the plan)

1. Test framework: keep Jasmine-style `describe`/`it`/`expect`, or move to the
   framework CWC uses with `@open-wc/testing`? How many tests need rewriting?
2. Snapshots: `karma-snapshot` format versus the web-test-runner snapshot
   mechanism (`test:updateSnapshots`). Are existing snapshots convertible?
3. Accessibility checks: `karma-accessibility-checker` replacement.
4. Coverage: istanbul reporter replacement and CI reporting.
5. Browsers: CWC uses Playwright and Puppeteer launchers; this repo runs Chrome
   and Firefox in Karma.
6. How do `.scss?lit`, raw `.svg` and the CSS result loader work without webpack
   (depends on the build-toolchain plan)?
7. CI changes (`.github/workflows`) and the `gulp test:unit` entry points
   (`gulp-tasks/test.js`).

## Sub-tasks

To be filled out. Suggested starting points:

1. Spike: run one family's tests (for example `button`, `global-banner`) under
   web-test-runner.
2. Port helpers (snapshot utility, test utils) and the shadowing detector.
3. Migrate tests family by family; compare pass/fail counts with the baseline.
4. Accessibility checker and coverage.
5. CI workflow updates; remove Karma and webpack test config.

**Status:** `[ ] not started (stub)`
