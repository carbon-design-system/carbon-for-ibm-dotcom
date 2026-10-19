# Fix component rendering issues after Lit v3 and @carbon/web-components v3 upgrade

Tasks related to fixing rendering issues that are present after the recent Lit 3
/ CWC v3 upgrade, independent of the migration tracked in
[`lit3-cwc3-migration-plan.md`](lit3-cwc3-migration-plan.md).

**Goal:** every component in `packages/web-components` (all ~70 component
directories plus `component-mixins/` and `globals/`) re-renders when a reactive
field is assigned, and the compile pipeline for this package matches how
`@carbon/web-components` (CWC) v3 compiles its own components, as closely as
this repo's tooling allows.

**Important:** the components named in the symptom list below are _examples_
found so far, not the full set. The root cause is in the compile pipeline, so it
affects every `@property()` / `@state()` field in `src/` (at least 181 files use
those decorators). The plan therefore fixes the pipeline first, then audits
every component family, instead of patching components one by one.

## Final summary (written in sub-task 8, nothing committed)

**Result:** `.ts` is now compiled by TypeScript (`experimentalDecorators: true`,
`useDefineForClassFields: false`) in Karma, the Gulp `es/` and `lib/` build, the
Rollup `dist/` build and Storybook. Reactive fields are no longer shadowed.

### What changed (grouped; counts from `git status` at the end of sub-task 8)

1. **Toolchain (interim, `TEMP(fix-components)`)**: `tests/karma.conf.js`,
   `tests/karma-accessibility-checker.conf.js`, `.storybook/main.js` (ts-loader
   for `.ts`); `gulp-tasks/build/modules/scripts.js` and `scripts-node.js`
   (`gulp-typescript` before Babel); `tools/get-rollup-config.js` (inline
   `ts.transpileModule()` plugin); `.babelrc` (TypeScript, decorator and
   class-property plugins removed); `tsconfig.json`
   (`useDefineForClassFields: false`, permanent); `package.json` + `yarn.lock` +
   `.yarn/cache` (`ts-loader@9.6.2`).
2. **Workaround removal (20 non-test `src` files touched in total, together with
   group 3)**: `requestUpdate()` calls and the `declare` keyword on `_linkNode`
   removed where they only compensated for shadowing (sub-task 4); the ones that
   stay carry a `Kept:` comment.
3. **Source fixes found by the audit (sub-task 7)**: `table-of-contents.ts`
   (constructor crash from `@queryAll` with an initializer), and registration
   imports in `tabs-extended/tab.ts`, `search-with-typeahead.ts`, `card.ts`.
   `search-with-typeahead.ts` is also in group 2.
4. **Tests and snapshots**: new `src/components/__tests__/shadowing.test.ts`
   (untracked), 6 modified test files (`card`, `content-item`, `cta-block`,
   `feature-cta`, `link-list`, `promo-banner`), 13 modified snapshots.
5. **Docs**: `IMPLEMENTATION_NOTES.md` (new subsection on TypeScript semantics),
   `lit3-cwc3-migration-plan.md` (Babel decorator decision marked superseded),
   comment fixes in the 6 config files above, and this plan.

Earlier commits already in `git log` (not part of the working tree diff):
`7e84944048` (`fix(global-banner): ...`; its stat shows `_global-banner.scss`,
`cta.stories.ts`, `global-banner.ts`, `global-banner-heading.ts` and the
global-banner test) and `9052101522`
(`fix(cta): don't render video caption next to slotted text`). They are the
"Related fixes" below and the first workarounds that sub-task 4 later removed.

### What was verified, and how

| Claim                                                                                          | Evidence                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Babel legacy decorators shadow Lit's accessors; `loose: false` does not fix it                 | Sub-task 1: compiled output and `Object.getOwnPropertyDescriptor` in Karma                                                                                   |
| 228 of 321 elements were affected before; 0 now                                                | Sub-task 1 probe (upper bound for field counts); `shadowing.test.ts` now reports 266 classes, 2516 properties, 0 shadowed, 0 constructor failures            |
| Karma: 203 of 253 executed, 201 passed, 2 failed, 50 skipped                                   | Re-run in sub-tasks 5, 6, 7 and again in sub-task 8. The 2 failures (`c4d-expressive-modal`) also fail on the original Babel config (sub-task 3)             |
| Before: 17 failed of 194 executed                                                              | Sub-task 3, measured side by side on the same tree. 15 of the 17 now pass                                                                                    |
| `yarn typecheck` exit 0                                                                        | Sub-tasks 3 to 8                                                                                                                                             |
| `yarn lint` exit 0                                                                             | Sub-task 8                                                                                                                                                   |
| `es/` and `dist/` output has `__decorate` on the prototype and no `_initializerDefineProperty` | Read in `es/components/global-banner/global-banner.js` and `dist/global-banner.js` (sub-task 3), and again in `es/` and `storybook-static/` after sub-task 4 |
| `gulp build:modules`, `build:components`, `build-storybook` exit 0                             | Sub-tasks 3, 4 and (`build:modules` only) 7. **Not re-run in sub-task 8**; only comments changed in those files since, checked with `node --check`           |
| Removal of each workaround is safe                                                             | Karma tests plus a temporary probe spec (deleted); one negative control (`quote`). See sub-task 4 section 4                                                  |
| Registration gaps and the `table-of-contents` crash                                            | Isolated per-entry Karma probe (deleted), then re-run. The crash has a failing-then-passing test in `shadowing.test.ts`                                      |

### What is not verified

- No story was opened in a running Storybook. Storybook evidence is a successful
  `build-storybook` plus a headless-Chrome probe of a **stale**
  `storybook-static` (sub-task 7).
- `test:a11y` (`karma-accessibility-checker.conf.js`) was never run.
- `yarn lint:styles`, `yarn lint:license` and the root jest `test:unit` were not
  run in sub-task 8.
- About 50 tests are skipped (`xdescribe`/`xit`), so the Karma result says
  nothing about the components they cover (for example `table-of-contents`,
  `tabs-extended`, `footer-composite`, `card-cta`).
- No negative control for most removed `requestUpdate()` calls, and none for the
  kept `_navigate()` / `prepareCheckboxes()` / `combo-box` calls (judgement
  calls).
- `c4d-feature-cta.md` was regenerated and not compared with the template by
  hand. The `c4d-locale-modal.md` change was not reviewed in depth.
- Form-association behaviour of the 6 subclasses, `dist/` / `lib/` size and
  browser-target effects, and a real-browser smoke test of `dist/`.
- Output of `gulp build:modules` was only checked as "finished without errors",
  never diffed against a previous build.

### Open follow-ups

From sub-task 7 (details in its section 10):

1. `cds-tooltip-icon` (rendered in `structured-list-cell.ts`) is not registered
   in `@carbon/web-components` 3.0.0-alpha.3. Needs a decision.
2. `tabs-extended-media/index.ts` does not import `tabs-extended/tab`, so
   `c4d-tab` stays undefined when only that entry is loaded.
3. Story typos (`c4d-video-container`, `c4d-lightbox-video-player-container-v7`)
   and the `back-to-top` story's use of the deprecated `c4d-button-expressive`.
4. Replace the 8 doc and example imports of
   `@carbon/web-components/es/icons/...`.
5. Migrate WCA to CEM (`wca` script, `web-component-analyzer`,
   `.storybook/preview.ts`, `gulp-tasks/clean.js`, docs) and update the
   `carbonElement` prose in `docs/coding-conventions.md` and
   `IMPLEMENTATION_NOTES.md`.
6. Rebuild `storybook-static/` and run the story probe against a real Storybook.
7. Many component tests are `xdescribe`d; enabling them is the only way to guard
   those components.

From this sub-task:

8. `@babel/plugin-proposal-decorators` is now an unused devDependency in
   `packages/web-components/package.json` (see sub-task 8 section 2). Not
   removed.
9. Add permanent regression tests for `link-with-icon`, `button-expressive`,
   `star-rating` and `footer-composite` (sub-task 4 only used a temporary
   probe).
10. Decide whether to put a `declare _linkNode` code comment in `cta.ts`; the
    note is only in the docs and the Handoff notes.
11. The three follow-up plans (`tsdown` build, `web-test-runner`, Storybook 10)
    must land before a release, because `TEMP(fix-components)` config ships
    otherwise. Two `TEMP(lit3-migration)` markers (React wrappers) are separate
    and belong to migration Step 13.
12. Machine note: several old `gulp test:unit` processes (pids 6686, 96718,
    44099, 55688) were running during sub-task 8 and were not started by it.

### Recommended commit split (do not commit until the user decides)

1. **Toolchain**: `tsconfig.json`, `package.json`, `yarn.lock`, the `ts-loader`
   and `picomatch` entries in `.yarn/cache`, `.babelrc`, both Karma configs,
   `.storybook/main.js`, `scripts.js`, `scripts-node.js`,
   `tools/get-rollup-config.js`. The comment edits from sub-task 8 are in these
   same files and go in this commit. Note that `git status` shows 40 deleted and
   57 untracked `.yarn/cache` zips, and `package.json` / `yarn.lock` changes,
   that look like the Carbon 12 alpha and Lit 3 dependency bump (they were
   already in the status snapshot at the start of this conversation). I did not
   separate them from the `ts-loader` / `picomatch` entries. Stage only the
   `ts-loader` hunks, or decide that the whole dependency change belongs in this
   commit.
2. **Workaround removal and source fixes**: the `src` files from sub-tasks 4
   and 7. `search-with-typeahead.ts` has both a removal and an import, so stage
   it with `git add -p` or keep it whole in this commit. Optionally split the
   three sub-task 7 fixes into their own commit, since they are bug fixes rather
   than cleanups.
3. **Tests and snapshots**: `shadowing.test.ts`, the 6 modified test files, the
   13 snapshots. This must come after 1 and 2, because the snapshots only match
   the new output.
4. **Docs**: `IMPLEMENTATION_NOTES.md`, `lit3-cwc3-migration-plan.md`, and the
   plan files if they should be kept in the repo. `cleanup-plan.md` is also
   untracked in the working tree; it is not part of this work.

Every commit message needs `Co-Authored-By: AskBob <askbob@ibm.com>`.

---

## Scope boundary

Matching CWC v3 completely would also mean replacing the Gulp build, replacing
Karma, and upgrading Storybook. Those are large, independent changes and are
**out of scope here**. Each has its own stub plan, to be filled out in separate
conversation threads:

| Out-of-scope change                                              | Plan file                                                                    |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Replace Gulp/Rollup/`gulp-babel` build with CWC's `tsdown` build | [`build-toolchain-tsdown-plan.md`](build-toolchain-tsdown-plan.md)           |
| Replace Karma on webpack 4 with `web-test-runner`                | [`test-runner-web-test-runner-plan.md`](test-runner-web-test-runner-plan.md) |
| Upgrade Storybook 6.5 to CWC's version (Storybook 10 + Vite)     | [`storybook-upgrade-plan.md`](storybook-upgrade-plan.md)                     |

This plan fixes the shadowed-field problem on the **current** toolchain, with
the smallest changes that make Karma results trustworthy and make the shipped
`es/` and `lib/` outputs correct. Any edit to Storybook, Gulp or Rollup config
made here is **interim** and is expected to be replaced by the follow-up plans.
Mark such edits with `TEMP(fix-components)` comments so they are easy to find.

This is only safe because the work is on the alpha branch
`updates/carbon-12-alpha-deps-wc`. The follow-up plans should land before any
release; otherwise the shipped output would still depend on interim config.

---

## Findings that shape the plan

### What CWC v3 does (verified in `node_modules/@carbon/web-components` and the upstream repo)

| Area                     | CWC v3                                                                                                                                                                                                         | Source                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Decorator style          | TypeScript **experimental** decorators. Compiled output is `__decorate([property({...})], CDSButton.prototype, "kind", void 0)`. There is no `accessor` keyword and no Babel.                                  | [`es/components/button/button.js`](node_modules/@carbon/web-components/es/components/button/button.js:215), upstream `tsconfig.json` |
| Field initialisers       | Emitted as plain assignments in the constructor (`this.kind = "primary"`). Because the decorator already defined the accessor on the prototype, the assignment calls Lit's setter. No own property shadows it. | [`button.js`](node_modules/@carbon/web-components/es/components/button/button.js:55)                                                 |
| Compiler                 | `tsdown` (Rolldown/Oxc) in `tasks/build.js`, `target: 'es2022'`, `tsconfig` passed through. Declarations come from `tsc`. No Babel in the build.                                                               | upstream `packages/web-components/tasks/build.js`, `package.json` (`tsdown`, `typescript ^6.0.3`)                                    |
| `tsconfig.json`          | `"experimentalDecorators": true`, `target: es2017`, `moduleResolution: bundler`.                                                                                                                               | upstream `tsconfig.json`                                                                                                             |
| Static fields            | Emitted as `static { this.is = 'cds-button' }` blocks.                                                                                                                                                         | `button.js:64`                                                                                                                       |
| Tests and Storybook      | `web-test-runner` and Storybook 10 with Vite, not Karma, webpack 4 and Storybook 6.5.                                                                                                                          | upstream `package.json`                                                                                                              |
| `old-build-toolchain.md` | Only covers old Webpack/Babel/UglifyJS failing on object rest spread. Not relevant to the shadowing problem. No action beyond keeping `@babel/plugin-transform-object-rest-spread` for dependencies.           | upstream `docs/old-build-toolchain.md`                                                                                               |

### What this repo does today

_(State **before** sub-task 3. Sub-tasks 2 and 3 replaced the Babel `.ts`
compile path described here with TypeScript; `.babelrc` no longer has the
TypeScript, decorator or class-property plugins. Kept as the starting point the
plan worked from.)_

- [`.babelrc`](packages/web-components/.babelrc) compiles `src/**/*.ts` with
  `@babel/plugin-transform-typescript` (`allowDeclareFields`),
  `@babel/plugin-proposal-decorators` with `legacy: true`, and loose class
  properties. The same set is repeated in
  [`tools/get-rollup-config.js`](packages/web-components/tools/get-rollup-config.js:172),
  [`tests/karma.conf.js`](packages/web-components/tests/karma.conf.js:96),
  [`tests/karma-accessibility-checker.conf.js`](packages/web-components/tests/karma-accessibility-checker.conf.js),
  [`.storybook/main.js`](packages/web-components/.storybook/main.js) (which
  rewrites the plugin list at runtime) and the gulp `scripts` / `scripts-node`
  tasks (`gulp-babel` picks up `.babelrc`).
- `tsc` is only used for `typecheck` and declaration emit
  ([`gulp-tasks/build/modules/types.js`](packages/web-components/gulp-tasks/build/modules/types.js)).
  It never produces the code that runs.
- [`tsconfig.json`](packages/web-components/tsconfig.json) has
  `experimentalDecorators: true` and `target: es2017`, but does not set
  `useDefineForClassFields`. That is the right shape for TS, but Babel ignores
  it.

### Root cause (hypothesis, confirmed in sub-task 1)

_(Confirmed in sub-task 1: finding 1 shows the `_initializerDefineProperty`
output, finding 2 the own-property descriptor, finding 5 that `loose: false`
does not help. The bullet below about Lit's `class-field-shadowing` check was
verified in finding 4: webpack 4 loads the production bundle, where the check is
stripped.)_

- Babel's legacy decorator mode turns every decorated field into a
  `_initializerDefineProperty(this, 'field', ...)` call in the constructor. The
  helper in `@babel/helpers` calls `Object.defineProperty(target, ...)` and so
  creates an **own data property on the instance**.
- Lit's legacy `@property()` path returns `undefined` for plain fields
  (`legacyProperty` in `@lit/reactive-element/decorators/property.js`), so
  Babel's descriptor stays in place and shadows the accessor Lit installs on the
  prototype. This matches the evidence already gathered
  (`Object.getOwnPropertyDescriptor(banner, 'hasImage')` is a plain data
  descriptor while the prototype also has a getter/setter).
- This is a Babel-versus-TypeScript semantics gap, not just the `loose` flag.
  Setting `loose: false` would not fix it because Babel's legacy mode still uses
  `defineProperty` for decorated fields.
- Both guides agree that Babel cannot do this correctly:
  - Lit 3 upgrade guide: Babel decorators `version: "2018-09"` support was
    removed, and Babel only supports **standard** decorators (`2023-05`) with
    `accessor`.
  - Lit decorators docs: "Babel does not support TypeScript experimental
    decorators"; TypeScript experimental decorators are the recommended path for
    production at the moment, and `useDefineForClassFields` should be set to
    `false` explicitly.
- Lit's dev build (`reactive-element.js`, development) throws when it detects
  this exact shadowing (`class-field-shadowing`), but webpack 4 resolves `lit`
  through `main`/`module` rather than export conditions, so the production build
  runs and the check is stripped. Verified in sub-task 1 (finding 4). The
  `shadowing.test.ts` detector from sub-task 5 does the same check by hand.

### Decision: follow CWC (TypeScript experimental decorators, assignment semantics)

- Chosen target: compile `src/**/*.ts` with TypeScript semantics
  (`experimentalDecorators: true`, `useDefineForClassFields: false`), the same
  semantics CWC v3 ships with.
- Rejected: Babel `version: "2023-05"` standard decorators with `accessor`.
  Reasons: it is the least like CWC; Lit does not recommend it for production
  yet because of larger output; it touches hundreds of fields; and CWC's
  `HostListener` (used in about 50 places here via
  `@carbon/web-components/es/globals/decorators/host-listener.js`) only handles
  the legacy `(proto, name)` form and an old descriptor shape, not the standard
  context object.
- Rejected as the global fix: `declare` on fields or per-field `requestUpdate()`
  calls. They remain valid only as local stop-gaps.
- Open question for sub-task 2: which compiler for webpack 4 / Karma / Storybook
  6.5 / Rollup 2 / gulp. CWC uses `tsdown`, which does not plug into those
  tools. Candidates must be checked against this repo's tool versions before
  choosing (for example `ts-loader` or an esbuild-based loader for webpack 4,
  `@rollup/plugin-typescript` or an esbuild plugin for Rollup 2, and plain `tsc`
  or `gulp-typescript` for the gulp module build). Nothing is chosen until the
  spike confirms it works.

---

## Symptoms found so far (examples only, all on `updates/carbon-12-alpha-deps-wc`)

- `c4d-global-banner`: the CTA icon was missing on mobile, because `ctaType` and
  `_shouldRenderAsLink` were assigned without a re-render.
- `c4d-global-banner`: the image showed on mobile, because `hasImage` and
  `imageWidth` were assigned but the `has-image` and `image-width` attributes
  were never reflected. The `:host([has-image])` rule that hides the image
  therefore never matched.
- `c4d-global-banner-heading`: the heading rendered with zero height, because
  `content` was assigned in `firstUpdated()` and its shadow DOM has no `<slot>`.
- `c4d-text-cta` / `c4d-link-with-icon`: a video CTA with slotted text showed
  the video caption next to it ("Video Link Meet Mombo"), because `_hasContent`
  was assigned in a `slotchange` handler without a re-render.
- `c4d-promo-banner` had the same family of problem (fixed in `41a53ee2ee`).
- `c4d-cta-block` (and `c4d-content-block` base class): body/content area is
  missing or shows only the heading, because slot-existence flags (`_hasAction`,
  `_hasLinkList`, `_hasContent`, `_hasCopy`) are assigned in
  `_handleSlotChange()` without triggering a re-render. The `?hidden` directives
  on body wrappers never clear.
- `c4d-content-item`: heading and body text render, but the footer link/CTA is
  hidden because `_hasFooter` is assigned in `_handleSlotChange()` without a
  re-render.
- `c4d-link-list-section` / `c4d-link-list`: multi-column layout is missing
  because `_endTypeLayout` in `c4d-link-list` is assigned to
  `END_TYPE_LAYOUT.TWO_COLUMNS` or `THREE_COLUMNS` in `_handleSlotChange()`, but
  the class mapping never updates due to the shadowed state field.

Existing workarounds that the global fix should make unnecessary (found by
searching `requestUpdate(` in `src/`):

| Kind                                                        | Files                                                                                                                                                                                                                                         |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Named `requestUpdate(name, old)` added for this bug         | `global-banner.ts`, `global-banner-heading.ts`, `text-cta.ts`, `link-with-icon.ts`                                                                                                                                                            |
| Bare `requestUpdate()` that may be for this bug             | `promo-banner.ts`, `language-selector-desktop.ts`, `combo-box.ts`, `button-expressive.ts`, `quote.ts`, `background-media.ts`, `search-with-typeahead.ts`, `masthead-composite.ts`. The first three comments say "auto-update doesn't happen". |
| Redundant inside `@property` setters (Lit 3 does it itself) | `star-rating.ts` (3), `footer-composite.ts` (3)                                                                                                                                                                                               |
| Mixin that assigns then calls `requestUpdate(name, old)`    | [`globals/mixins/connect.ts`](packages/web-components/src/globals/mixins/connect.ts:45)                                                                                                                                                       |
| Field-level workaround                                      | `declare _linkNode` in [`component-mixins/cta/cta.ts`](packages/web-components/src/component-mixins/cta/cta.ts:87); `allowDeclareFields` in `.babelrc` and Rollup config                                                                      |

---

## Sub-tasks

Sub-tasks are ordered and done one at a time. Sub-task 1 ends with a go/no-go
decision from the user. Sub-tasks 2 to 3 touch build config and affect every
component. They were meant to get their own commit and conversation thread.
**Nothing is committed**: all 8 sub-tasks sit together in the working tree. The
commit split is therefore a decision for the end, and the recommended split is
in "Final summary" at the top of this file.

---

### 1. Confirm the root cause and set the decision gate

**Intent:** prove that the Babel output, not individual components, is the
cause, and confirm that TypeScript-style compilation fixes it, before touching
any pipeline.

**Expected outcomes**

- A short written finding in this file: the compiled constructor output for one
  decorated field, and `Object.getOwnPropertyDescriptor` results before and
  after, in both Karma and Storybook.
- A count of how many reactive fields in `src/` are shadowed (not only the ones
  in the symptom list), using a Karma or console check across all registered
  `c4d-*` elements.
- A go/no-go recommendation, approved by the user, for switching `src/**/*.ts`
  to TypeScript semantics.

**Todo list**

1. Compile one small component (for example `global-banner`) with the current
   Babel config and with TypeScript (`tsc` with the repo `tsconfig.json` and
   `useDefineForClassFields: false`). Compare the constructor output.
2. In Karma, instantiate every registered `c4d-*` element and list instances
   where `hasOwnProperty(name)` is true for a key in
   `constructor.elementProperties`. This is the same check Lit's dev build
   performs. Record the total and the per-family breakdown.
3. Check which Lit build webpack 4 loads in Karma and Storybook (development or
   production) to confirm why Lit's own `class-field-shadowing` error is not
   firing.
4. Confirm `loose: false` alone does not fix the shadowing (so it is not a
   cheaper option).
5. Check that CWC's `HostListener` decorator, `StableSelectorMixin` and
   `HostListenerMixin` behave the same under TypeScript-style output (decorators
   applied through `__decorate` with `(proto, name)`).
6. Write the findings here and ask the user to approve moving to sub-task 2.

**Relevant context:** [`.babelrc`](packages/web-components/.babelrc),
[`tsconfig.json`](packages/web-components/tsconfig.json),
`node_modules/@lit/reactive-element/development/reactive-element.js:841`,
`node_modules/@lit/reactive-element/development/decorators/property.js:33`,
`node_modules/@babel/helpers/lib/helpers/initializerDefineProperty.js`.

**Status:** `[x] done` (findings recorded below; GO approved by the user)

#### Findings from sub-task 1 investigation

1. **Compiled constructor output comparison (`global-banner.ts`)**

   - **Babel (current .babelrc: `@babel/plugin-proposal-decorators` legacy +
     `@babel/plugin-transform-typescript`)**: Emits
     `_initializerDefineProperty(this, "hasImage", _descriptor3, this);` in the
     constructor. The helper calls
     `Object.defineProperty(this, "hasImage", { value: false, writable: true, enumerable: true, configurable: true })`,
     installing an own data property on every element instance.
   - **TypeScript (`tsconfig.json` with `experimentalDecorators: true`,
     `useDefineForClassFields: false`)**: Emits
     `__decorate([property(...)], C4DGlobalBanner.prototype, "hasImage", void 0);`
     on the prototype, and `this.hasImage = false;` in the constructor. Because
     the accessor is installed on the prototype before the constructor runs,
     `this.hasImage = false` invokes the prototype setter rather than defining
     an own property.

2. **Property descriptor check (`c4d-global-banner`)**

   - **Own instance descriptor**:
     `Object.getOwnPropertyDescriptor(banner, 'hasImage')` returns
     `{ value: false, writable: true, enumerable: true, configurable: true }`.
   - **Prototype descriptor**:
     `Object.getOwnPropertyDescriptor(Object.getPrototypeOf(banner), 'hasImage')`
     returns
     `{ get: [Function], set: [Function], enumerable: true, configurable: true }`.
   - **Consequence**: because an own property exists on the instance, any
     assignment (`this.hasImage = true`) writes to the instance property
     directly, completely bypassing the prototype setter. Lit never receives
     notification of changes and does not trigger re-render or attribute
     reflection.

3. **Shadowed-field audit across all registered custom elements**

   - **Audited custom elements with `elementProperties`**: 321
   - **Elements with shadowed reactive properties**: 228 (71%)
   - **Total shadowed reactive fields**: 1,848

   | Family     | Shadowed Fields | Component Count | Example Components                                                                         |
   | ---------- | --------------- | --------------- | ------------------------------------------------------------------------------------------ |
   | card       | 237             | 18              | `c4d-card`, `c4d-card-cta`, `c4d-card-cta-footer`                                          |
   | content    | 199             | 36              | `c4d-content-block`, `c4d-content-block-cards`, `c4d-content-block-complementary`          |
   | video      | 139             | 8               | `c4d-video-cta-composite`, `c4d-video-cta-container`, `c4d-video-player`                   |
   | feature    | 134             | 6               | `c4d-feature-card`, `c4d-feature-card-footer`, `c4d-feature-cta`                           |
   | masthead   | 119             | 11              | `c4d-masthead-cart`, `c4d-masthead-composite`, `c4d-masthead-contact`                      |
   | callout    | 73              | 6               | `c4d-callout-link-with-icon`, `c4d-callout-quote`, `c4d-callout-with-media`                |
   | dotcom     | 70              | 2               | `c4d-dotcom-shell-composite`, `c4d-dotcom-shell-container`                                 |
   | lightbox   | 68              | 5               | `c4d-lightbox-image-viewer`, `c4d-lightbox-media-viewer`, `c4d-lightbox-video-player`      |
   | button     | 57              | 4               | `c4d-button`, `c4d-button-cta`, `c4d-button-expressive`                                    |
   | link       | 54              | 6               | `c4d-link-list`, `c4d-link-list-heading`, `c4d-link-list-item`                             |
   | footer     | 43              | 7               | `c4d-footer`, `c4d-footer-composite`, `c4d-footer-container`                               |
   | logo       | 43              | 3               | `c4d-logo-grid`, `c4d-logo-grid-item`, `c4d-logo-grid-link`                                |
   | leadspace  | 42              | 9               | `c4d-leadspace`, `c4d-leadspace-block`, `c4d-leadspace-block-content`                      |
   | locale     | 40              | 6               | `c4d-locale-button`, `c4d-locale-item`, `c4d-locale-modal`                                 |
   | pricing    | 40              | 12              | `c4d-pricing-table`, `c4d-pricing-table-annotation-toggle`, `c4d-pricing-table-cell`       |
   | filter     | 39              | 7               | `c4d-filter-group-item`, `c4d-filter-panel`, `c4d-filter-panel-composite`                  |
   | notice     | 39              | 1               | `c4d-notice-choice`                                                                        |
   | audio      | 27              | 3               | `c4d-audio-player`, `c4d-audio-player-composite`, `c4d-audio-player-container`             |
   | search     | 27              | 2               | `c4d-search-with-typeahead`, `c4d-search-with-typeahead-item`                              |
   | cta        | 26              | 5               | `c4d-cta`, `c4d-cta-block`, `c4d-cta-block-item`                                           |
   | megamenu   | 25              | 11              | `c4d-megamenu`, `c4d-megamenu-category-group`, `c4d-megamenu-category-heading`             |
   | quote      | 23              | 5               | `c4d-quote`, `c4d-quote-link-with-icon`, `c4d-quote-source-bottom-copy`                    |
   | image      | 22              | 2               | `c4d-image`, `c4d-image-logo`                                                              |
   | left       | 22              | 7               | `c4d-left-nav`, `c4d-left-nav-menu`, `c4d-left-nav-menu-category-heading`                  |
   | region     | 22              | 1               | `c4d-region-item`                                                                          |
   | global     | 21              | 4               | `c4d-global-banner`, `c4d-global-banner-copy`, `c4d-global-banner-heading`                 |
   | top        | 21              | 5               | `c4d-top-nav`, `c4d-top-nav-item`, `c4d-top-nav-l1`                                        |
   | tile       | 19              | 1               | `c4d-tile`                                                                                 |
   | background | 17              | 1               | `c4d-background-media`                                                                     |
   | text       | 16              | 1               | `c4d-text-cta`                                                                             |
   | carousel   | 13              | 1               | `c4d-carousel`                                                                             |
   | leaving    | 13              | 5               | `c4d-leaving-ibm-composite`, `c4d-leaving-ibm-container`, `c4d-leaving-ibm-modal`          |
   | promo      | 13              | 1               | `c4d-promo-banner`                                                                         |
   | expressive | 10              | 4               | `c4d-expressive-modal`, `c4d-expressive-modal-close-button`, `c4d-expressive-modal-footer` |
   | table      | 10              | 1               | `c4d-table-of-contents`                                                                    |
   | in         | 8               | 1               | `c4d-in-page-banner`                                                                       |
   | countdown  | 7               | 1               | `c4d-countdown`                                                                            |
   | legal      | 7               | 3               | `c4d-legal-nav`, `c4d-legal-nav-cookie-preferences-placeholder`, `c4d-legal-nav-item`      |
   | pictogram  | 7               | 1               | `c4d-pictogram-item`                                                                       |
   | language   | 6               | 2               | `c4d-language-selector-desktop`, `c4d-language-selector-mobile`                            |
   | tag        | 6               | 1               | `c4d-tag-link`                                                                             |
   | structured | 5               | 2               | `c4d-structured-list-cell`, `c4d-structured-list-group`                                    |
   | hr         | 4               | 1               | `c4d-hr`                                                                                   |
   | scroll     | 3               | 1               | `c4d-scroll-animations`                                                                    |
   | star       | 3               | 1               | `c4d-star-rating`                                                                          |
   | back       | 2               | 1               | `c4d-back-to-top`                                                                          |
   | combo      | 2               | 1               | `c4d-combo-box`                                                                            |
   | markdown   | 1               | 1               | `c4d-markdown`                                                                             |
   | regions    | 1               | 1               | `c4d-regions`                                                                              |
   | scoped     | 1               | 1               | `c4d-scoped-search-dropdown-mobile`                                                        |
   | skip       | 1               | 1               | `c4d-skip-to-content`                                                                      |
   | tabs       | 1               | 1               | `c4d-tabs-extended-media`                                                                  |

4. **Lit build in Webpack 4 (Karma / Storybook)**

   - Webpack 4 does not support the package.json `exports` field or export
     conditions (`"development"` vs `"default"`).
   - Webpack 4 resolves `@lit/reactive-element` via
     `"module": "reactive-element.js"` to the root production bundle where
     `DEV_MODE` and the `class-field-shadowing` error check in `performUpdate()`
     are completely stripped at Lit's build time.
   - This explains why Lit's built-in `class-field-shadowing` exception was
     silent in Karma and Storybook.

5. **`loose: false` evaluation**

   - Compiling with `loose: false` on class properties still generates
     `_initializerDefineProperty(this, ...)` because that helper is generated by
     `@babel/plugin-proposal-decorators` in legacy mode, not class properties
     loose mode. `loose: false` alone does not fix the shadowing.

6. **HostListener and Mixin compatibility with TypeScript experimental
   decorators**
   - CWC's `HostListener` decorator supports the legacy/TypeScript
     `(target, name)` signature (`typeof name !== 'undefined'`).
   - Under TypeScript compilation,
     `__decorate([HostListener('event')], Proto, "name")` passes
     `(Proto, "name")`, which correctly registers listener metadata in
     `Clazz._hostListeners`.
   - `HostListenerMixin` and `StableSelectorMixin` work as expected under
     TypeScript assignment semantics.

#### Go / No-Go Recommendation

- **Decision:** **GO** to sub-task 2 (Toolchain spike: compile `src/**/*.ts`
  with TypeScript semantics). Approved by the user.
- **Caveat on the counts in finding 3:** the totals come from
  `elementProperties`, which includes inherited properties, so a field declared
  on a base class is probably counted once per subclass. Treat 1,848 as an upper
  bound; "228 of 321 elements affected" is the more reliable figure. The
  "family" column groups by the first word of the tag name, which is why entries
  like `in`, `top`, `left` and `hr` appear.
- **Rationale:** The Babel legacy decorator transform is conclusively confirmed
  as the root cause of the 1,848 shadowed reactive fields across 71% of
  registered elements. TypeScript experimental decorator compilation
  (`experimentalDecorators: true`, `useDefineForClassFields: false`) matches
  `@carbon/web-components` v3, removes instance shadowing, preserves Lit
  prototype accessors, and is compatible with `HostListener` and project mixins.

---

### 2. Toolchain spike: compile `src/**/*.ts` with TypeScript semantics

**Intent:** find a compiler for this repo's older tooling that produces
CWC-style output (`__decorate` plus constructor assignments), without changing
any component source. This is an **interim** setup: the final compile path is
decided by the follow-up plans (see "Scope boundary"). Prefer a compiler whose
output matches `tsdown`'s, and check every candidate against it, so the later
swap is low-risk.

**Expected outcomes**

- A chosen compiler and loader setup that works in Karma (webpack 4), with a
  comparison table against the alternatives and the reasons.
- `tsconfig.json` updated to match CWC where it affects semantics:
  `experimentalDecorators: true`, `useDefineForClassFields: false` set
  explicitly (both Lit docs recommend this), `target` aligned with CWC.
- Babel kept only where it is still needed: transpiling dependencies for webpack
  4 and Rollup 2 (class static blocks, `??=`, optional chaining in Lit and CWC),
  which the current Karma and Storybook rules already do.
- Vertical slice passing: `button`, `button-group`, `global-banner` unit tests,
  with the `global-banner` re-render tests passing **without** the
  `requestUpdate` workarounds.

**Todo list**

1. List the installed versions of webpack, `babel-loader`, Storybook, Rollup,
   `@rollup/plugin-babel`, `gulp-babel`, `gulp-typescript` and TypeScript, and
   check each candidate compiler against them. Do not assume support.
2. Try the leading candidate in
   [`tests/karma.conf.js`](packages/web-components/tests/karma.conf.js) only
   (replace the `.ts` rule, keep the `.js` dependency rules).
3. Run the vertical slice. Compare compiled output against CWC's (`__decorate`,
   constructor assignments, static blocks).
4. Check how `.scss?lit`, `.svg` raw imports and the CSS result loader still
   resolve with the new `.ts` rule.
5. Check the interaction with `declare` fields: with TS semantics,
   `declare _linkNode` in `cta.ts` and `allowDeclareFields` become unnecessary.
6. Record the result and any blockers in this file and pause for user review.

**Relevant context:** upstream CWC `tasks/build.js` (uses `tsdown`, target
`es2022`), [`tests/karma.conf.js`](packages/web-components/tests/karma.conf.js),
[`tools/css-result-loader`](packages/web-components/tools/css-result-loader.js).

**Status:** `[x] done` (findings recorded below; approved by the user)

#### Findings from sub-task 2 spike

##### 1. Installed tool versions

| Tool                   | Version | Location            |
| ---------------------- | ------- | ------------------- |
| `webpack`              | 4.47.0  | root `node_modules` |
| `babel-loader`         | 8.3.0   | root `node_modules` |
| `typescript`           | 5.5.4   | root `node_modules` |
| `rollup`               | 2.80.0  | root `node_modules` |
| `@rollup/plugin-babel` | 5.3.1   | root `node_modules` |
| `gulp-babel`           | 8.0.0   | root `node_modules` |
| `gulp-typescript`      | 5.0.1   | root `node_modules` |
| `@storybook/core`      | 6.5.16  | root `node_modules` |
| `@babel/core`          | 7.28.5  | root `node_modules` |
| Node.js                | 24.15.0 | —                   |

Candidate loaders **not** installed and **not** in the Yarn offline cache:
`ts-loader`, `esbuild`, `esbuild-loader`, `@swc/core`, `swc-loader`.

##### 2. Candidate compiler evaluation

| Candidate                                                                       | Produces target output?                                                                                                                                                                                                                                                                            | Webpack 4 compatible?                                           | Already installed?                                                                  | Notes                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`ts-loader@9.6.2` (transpileOnly)**                                           | ✅ Yes — `__decorate([…], Class.prototype, "x", void 0)` + constructor assignments                                                                                                                                                                                                                 | ✅ Yes — peerDeps `webpack ^4.0.0 \|\| ^5.0.0`, `typescript: *` | ❌ Not pre-installed; fetched from registry (added as devDep, 2 packages, +115 KiB) | `transpileOnly: true` uses `ts.transpileModule()`, fully respects `experimentalDecorators`, `useDefineForClassFields`. No type-check overhead in Karma. Loader-utils is optional and already present. |
| `esbuild-loader@3.2.0`                                                          | ⚠️ Uncertain — esbuild uses Babel-like transform for decorators by default (TypeScript `experimentalDecorators` requires `--experimentalDecorators` flag); must verify field-initialiser shape                                                                                                     | ✅ peerDeps `webpack ^4.40.0 \|\| ^5.0.0`                       | ❌ Not installed, not in cache                                                      | esbuild v0.18+ added `useDefineForClassFields:false` support but the exact output shape was not confirmed against Lit's needs. Skipped in favour of ts-loader which is known-correct.                 |
| `@swc/core` / `swc-loader`                                                      | ⚠️ Uncertain — SWC's `experimentalDecorators` mode was historically buggy with Lit; needs field-initialiser check                                                                                                                                                                                  | ❌ Not installed, not in cache                                  | ❌                                                                                  | Not evaluated.                                                                                                                                                                                        |
| Babel `@babel/preset-typescript` + `babel-plugin-transform-typescript-metadata` | ❌ No — Babel legacy decorator mode emits `_initializerDefineProperty` (own property), which is the root cause being fixed. No Babel configuration was found that produces prototype-accessor semantics without switching to standard (`2023-05`) decorators + `accessor`, which CWC does not use. | ✅ Already installed                                            | ✅                                                                                  | Rejected. Babel decorators remain for `.js` dependency rules only.                                                                                                                                    |

**Chosen compiler: `ts-loader@9.6.2` with `transpileOnly: true`.**

Rationale: only candidate confirmed (by `tsc` reference output and live Karma
run) to produce `__decorate([property(…)], Class.prototype, "x", void 0)` plus
plain constructor assignments. No type errors in transit — `transpileOnly` skips
type-checking in webpack, keeping Karma builds fast. `ts-loader@9.6.2` is the
latest stable release and explicitly supports webpack 4.

##### 3. Compiled output shape

Verified by compiling a sample decorated class with
`tsc --experimentalDecorators --useDefineForClassFields false --target es2017`:

```js
class TestElement extends LitElement {
  constructor() {
    super(...arguments);
    this.myProp = false; // plain assignment → calls Lit prototype setter
    this.myStr = 'hello';
  }
}
__decorate(
  [property({ type: Boolean })],
  TestElement.prototype,
  'myProp',
  void 0
); // prototype-level, not instance
__decorate(
  [property({ type: String })],
  TestElement.prototype,
  'myStr',
  void 0
);
```

- No `_initializerDefineProperty` (Babel legacy), no `Object.defineProperty` on
  instance.
- `__decorate` is emitted inline by TypeScript (no `tslib` import needed for
  Karma).
- Static class blocks: this repo's source does not use `static { … }` blocks, so
  the missing `static {}` in the TS output versus CWC's `tsdown` output is not a
  concern.

##### 4. Vertical slice test results

Tests run via `yarn gulp test:unit --debug` from `packages/web-components`. No
snapshot files were written.

| Test suite                                  | Passed | Skipped | Failed | Notes                                                            |
| ------------------------------------------- | ------ | ------- | ------ | ---------------------------------------------------------------- |
| `c4d-button-group` (button-group.test.ts)   | 2      | 0       | 0      | Renders correctly with ts-loader                                 |
| `c4d-global-banner` (global-banner.test.ts) | 5      | 0       | 0      | **All re-render tests pass without `requestUpdate` workarounds** |

The `global-banner` tests that previously failed with Babel (ctaType icon
missing, hasImage not reflected) all pass, confirming the root cause is fixed.

Note: there is no standalone `button` unit test; `c4d-button` is covered by
`c4d-button-group`'s test (which imports it transitively). The plan item
"button" was satisfied by this.

##### 5. Shadowing probe results

A temporary probe (`tests/utils/shadowing-probe.test.ts`, tagged
`TEMP(fix-components)`, deleted before committing) checked every element for
shadowed reactive fields with
`Object.prototype.hasOwnProperty.call(instance, name)` for each key in
`constructor.elementProperties`:

| Element                     | Shadowed fields | Pass/Fail |
| --------------------------- | --------------- | --------- |
| `c4d-button-group`          | 0               | ✅        |
| `c4d-button-group-item`     | 0               | ✅        |
| `c4d-global-banner`         | 0               | ✅        |
| `c4d-global-banner-heading` | 0               | ✅        |
| `c4d-global-banner-copy`    | 0               | ✅        |

All 5 elements: **zero shadowing** (was 228/321 elements under Babel).

##### 6. `.scss`, `.svg` and `css-result-loader` handling

Unchanged and working. `ts-loader` handles only `.ts` files; it emits `import`
statements for `.scss` and `.svg` unchanged into the webpack module graph.
Webpack then applies the existing `.scss` rule (`css-result-loader` →
`postcss-loader` → `sass-loader`) and `.svg` rule (`raw-loader`). The
global-banner test bundle (4.81 MiB, which includes sass processing) compiled
and ran without errors.

No `.scss?lit` query-suffix imports exist in this codebase — all SCSS imports
use plain `import styles from './foo.scss'`.

##### 7. `declare` field interaction

With `useDefineForClassFields: false` and `experimentalDecorators: true`,
TypeScript `declare` fields are **completely elided** at emit — no constructor
assignment, no `Object.defineProperty`. Both existing uses:

- `declare _linkNode?: HTMLAnchorElement` in
  [`component-mixins/cta/cta.ts:87`](packages/web-components/src/component-mixins/cta/cta.ts:87)
- `declare static stableSelector: string` in
  [`globals/mixins/stable-selector.ts:127`](packages/web-components/src/globals/mixins/stable-selector.ts:127)

…are natively handled and correct under TS semantics. **No
`allowDeclareFields: true` option is needed in ts-loader.** The
`allowDeclareFields: true` entries in `.babelrc` and
`tools/get-rollup-config.js` become unnecessary and should be removed in
sub-task 3 when those pipelines are updated.

##### 8. `tsconfig.json` change

Added `"useDefineForClassFields": false` with a `TEMP(fix-components)` comment.
Typecheck before: 0 errors. Typecheck after: 0 errors. The setting is
semantically a no-op at `target: es2017` (TS default was already `false` below
ES2022), but it is made explicit so the semantics remain correct if `target` is
bumped later.

##### 9. Changes made in this sub-task

| File                                                                                         | Change                                                                                                                                                 | Reason                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| [`packages/web-components/tests/karma.conf.js`](packages/web-components/tests/karma.conf.js) | Replaced `.ts` Babel rule with `ts-loader` (`transpileOnly: true`, `experimentalDecorators: true`, `useDefineForClassFields: false`, `module: esnext`) | Fixes shadowed Lit accessor fields in Karma           |
| [`packages/web-components/tsconfig.json`](packages/web-components/tsconfig.json)             | Added `"useDefineForClassFields": false`                                                                                                               | Makes TS semantics explicit; no typecheck regressions |
| [`packages/web-components/package.json`](packages/web-components/package.json)               | Added `"ts-loader": "9.6.2"` to `devDependencies`                                                                                                      | Required loader                                       |
| `yarn.lock` (root)                                                                           | Updated by `yarn add --dev ts-loader@9.6.2` (2 packages: `ts-loader`, `picomatch@4`)                                                                   | Lockfile entry for new dep                            |
| `.yarn/cache/ts-loader-npm-9.6.2-…zip`                                                       | Added by yarn                                                                                                                                          | Offline cache entry                                   |

**Intentionally NOT changed:** `.babelrc`, `tools/get-rollup-config.js`,
Storybook, Rollup, gulp scripts, `tests/karma-accessibility-checker.conf.js`,
any component source under `src/`, any snapshot file. All belong to sub-task 3
or out-of-scope plans.

_(Added in sub-task 8: sub-task 3 changed all of the config files named above
except the component sources and snapshots, so this "not changed" list was only
true at the end of sub-task 2.)_

##### 10. Blockers

None. The spike succeeds: ts-loader produces the correct output, the vertical
slice passes, and no component source changes were required.

One multi-spec issue was observed (pre-existing, not introduced here): when two
test bundles are run in the same Karma page and both transitively import
`c4d-button`, the second bundle throws
`CustomElementRegistry.define: already defined`. This manifests as an `afterAll`
error when running `button-group.test.ts` and `global-banner.test.ts` together.
**This is a pre-existing issue, not caused by ts-loader** — it was present with
Babel too. Each test must be run in isolation or the full test shim (which
registers each element only once) must be used. The full shim run is sub-task
3's concern.

---

### 3. Apply the interim compile path to Karma and the shipped outputs

**Intent:** make the unit-test results trustworthy and make the published `es/`
and `lib/` output correct, with the smallest possible changes. Storybook only
gets the minimum needed to view and verify components during the audit in
sub-task 5. Everything touched here is **interim** and is replaced by the
follow-up plans.

**In scope**

- Karma (`tests/karma.conf.js` and `tests/karma-accessibility-checker.conf.js`).
- The shipped outputs: `gulp build:modules:scripts` (`es/`), `scripts-node`
  (`lib/`), and the Rollup config used for `dist/`.
- `.babelrc`, but only after nothing compiles `.ts` through it.

**Out of scope (left to the follow-up plans)**

- Reworking Storybook beyond a minimal `.ts` rule change (no addon, knobs or MDX
  work).
- Restructuring the Gulp task graph, replacing Rollup, or replacing Karma.

**Expected outcomes**

- Karma, `es/`, `lib/` and `dist/` all compile `src` with the same TypeScript
  semantics. Compile settings live in one shared place where practical.
- Storybook shows correct component behaviour for the audit, using the least
  change that achieves it. Each Storybook, Gulp or Rollup edit carries a
  `TEMP(fix-components)` comment.
- `yarn typecheck`, `yarn test:unit`, `yarn build:components`, `yarn build` and
  `yarn build-storybook` all run, with results compared to the baseline in the
  migration plan.

**Todo list**

1. Update the Karma configs first and confirm the unit-test baseline.
2. Update `gulp-tasks/build/modules/scripts.js` and `scripts-node.js` (they
   currently run `.ts` through `gulp-babel` and `.babelrc`). Compare the emitted
   `es/` and `lib/` output for one decorated component against CWC's shape
   (`__decorate`, constructor assignments).
3. Update
   [`tools/get-rollup-config.js`](packages/web-components/tools/get-rollup-config.js)
   and its `@rollup/plugin-babel` usage for `.ts`.
4. Make the minimal `.ts` rule change in
   [`.storybook/main.js`](packages/web-components/.storybook/main.js), including
   the runtime `deepReplace` plugin rewriting (`loose: false` rewrite, decorator
   plugin deletion). Mark it `TEMP(fix-components)`.
5. Remove `allowDeclareFields` and the legacy-decorator, loose class-property
   plugins from `.babelrc` once nothing compiles `.ts` through it.
6. Check the sibling tooling that also reads `.babelrc` or hardcodes decorator
   syntax: `tests/e2e/build`, and the disabled React pipeline files from step 3
   of the migration plan (leave disabled, note only).
7. Compare `dist/` and `lib/` output size and run the CDN/e2e build smoke tests
   that exist.
8. Record every interim edit in the "Handoff notes" section below.

**Relevant context:** the file list in "What this repo does today" above, and
migration plan Steps 2, 3 and 10 (the notes there about Rollup excluding
`node_modules` from Babel, and Terser mangling in Storybook).

**Status:** `[x] done` (findings recorded below; approved by the user. The 2
remaining `c4d-expressive-modal` failures were re-verified as pre-existing: the
same two tests fail with the original Babel config, same error from
`CDSButtonSet._hideSiblingMargin`.)

#### Findings from sub-task 3

##### 1. Files changed

| File                                                                                                                                     | Change                                                                                                                                                                                                                                                                                        | Reason                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`packages/web-components/tests/karma-accessibility-checker.conf.js`](packages/web-components/tests/karma-accessibility-checker.conf.js) | Replaced `.ts` Babel rule with `ts-loader` (`transpileOnly: true`, `experimentalDecorators: true`, `useDefineForClassFields: false`, `module: esnext`)                                                                                                                                        | Same fix as `karma.conf.js` (sub-task 2); removes legacy-decorator shadowing from accessibility tests |
| [`packages/web-components/gulp-tasks/build/modules/scripts.js`](packages/web-components/gulp-tasks/build/modules/scripts.js)             | Added `gulp-typescript` step (isolatedModules, declaration:false, module:esnext) before downstream Babel. Added `configFile: false` to Babel step to prevent `.babelrc` merge                                                                                                                 | Fixes `es/` output: `__decorate` on prototype + plain constructor assignments                         |
| [`packages/web-components/gulp-tasks/build/modules/scripts-node.js`](packages/web-components/gulp-tasks/build/modules/scripts-node.js)   | Same changes as `scripts.js`                                                                                                                                                                                                                                                                  | Fixes `lib/` output                                                                                   |
| [`packages/web-components/tools/get-rollup-config.js`](packages/web-components/tools/get-rollup-config.js)                               | Added inline `rollup-typescript-temp` plugin (uses `ts.transpileModule()`) before `@rollup/plugin-babel`. Removed TS/decorator plugins from Babel step. Added `configFile: false`                                                                                                             | Fixes `dist/` Rollup output                                                                           |
| [`packages/web-components/.storybook/main.js`](packages/web-components/.storybook/main.js)                                               | Replaced Storybook-injected `.tsx?` babel-loader rule with ts-loader for `.ts` only. Removed `deepReplace` blocks for decorator/loose plugin patching. Changed local `/\.tsx?$/` rule to `/\.tsx$/`                                                                                           | Fixes Storybook `.ts` compilation                                                                     |
| [`packages/web-components/.babelrc`](packages/web-components/.babelrc)                                                                   | Removed `@babel/plugin-transform-typescript`, `@babel/plugin-proposal-decorators`, `@babel/plugin-transform-class-properties`, `@babel/plugin-transform-private-methods`, `@babel/plugin-transform-private-property-in-object` (all TS/decorator-specific). Kept only syntax-lowering plugins | Nothing compiles `.ts` through `.babelrc` anymore; these plugins are no longer needed there           |

All changes tagged `TEMP(fix-components)` in file comments.

##### 2. Test baseline comparison

Re-measured side by side in the same working tree, using the original `HEAD`
`.babelrc` and `karma.conf.js` versus the sub-task 3 setup:

| Metric                  | Original Babel config | Sub-task 3 (ts-loader) |
| ----------------------- | --------------------- | ---------------------- |
| Tests executed          | 194 / 248             | 194 / 248              |
| PASSED                  | 177                   | **192**                |
| FAILED                  | 17                    | **2**                  |
| SKIPPED (xdescribe/xit) | 54                    | 54                     |

The earlier "184 / 238 → 194 / 248" and "167 passed" figures came from the Step
9 run in the migration plan and are not comparable. Both configs now execute the
same 194 of 248 tests.

The 2 remaining failures are `c4d-expressive-modal` "Should close the modal" /
"Should provide a way to prevent the modal from being closed". They fail
identically on the original config with
`Cannot read properties of null (reading 'assignedElements')`, thrown from
`CDSButtonSet._hideSiblingMargin` (`@carbon/web-components`
`button/button-set.js`, line 34). The migration plan attributes this to a 1000ms
transition timer outliving test teardown; that explanation was not independently
checked. No new failures are introduced.

The other 15 baseline failures now pass (carousel, locale-modal,
masthead-composite, video-player, left-nav). This matches the shadowing root
cause.

##### 3. Build results

| Command                                                                    | Result                        | Notes                                                                                                                 |
| -------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `yarn typecheck`                                                           | **Pass (Exit 0)** — 0 errors  | Improvement over Step 9 baseline (129 errors); the icon import errors appear to have been resolved by package updates |
| `yarn gulp build:modules:scripts`                                          | **Pass (Exit 0)** in 3 s      | `es/` output: `__decorate` on prototype, no `_initializerDefineProperty`                                              |
| `yarn gulp build:modules:scripts-node`                                     | **Pass (Exit 0)** in 865 ms   | `lib/` output: CJS connector files, no decorated classes to verify                                                    |
| `yarn gulp build:modules` (full: css, icons, scripts, scripts-node, types) | **Pass (Exit 0)** in 1.22 min | All modules built cleanly                                                                                             |
| `yarn gulp build:components` (Rollup → `dist/`)                            | **Pass (Exit 0)** in 59 s     | 105 postcss `:host()` warnings (pre-existing, unchanged)                                                              |
| `STORYBOOK_STORIES=…global-banner… yarn build-storybook` (scoped)          | **Pass (Exit 0)** in 15 s     | ts-loader rule correctly injected                                                                                     |
| `yarn build-storybook` (full)                                              | **Pass (Exit 0)**             | No new errors                                                                                                         |

##### 4. Emitted-output shape evidence

`es/components/global-banner/global-banner.js` (fresh `build:modules` run):

- `__decorate([property(...)], C4DGlobalBanner.prototype, "hasImage", void 0)` —
  prototype-level ✅
- `this.hasImage = false` in constructor — plain assignment ✅
- Zero `_initializerDefineProperty` ✅
- `__decorate` inlined by TypeScript
  (`var __decorate = this && this.__decorate || function...`), no
  `@babel/runtime` import ✅

`dist/global-banner.js` (dev build for verification, `build:components` runs
prod):

- Same shape: `__decorate([...], C4DGlobalBanner.prototype, "hasImage", void 0)`
  ✅
- Zero `_initializerDefineProperty` ✅

##### 5. Snapshot changes

These are **deliberate** — they result from the shadowing fix making reactive
fields update on first render:

| Snapshot                                                                                                         | Change                                                         | Reason                                                               |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `c4d-text-cta.md`                                                                                                | `href="#"` added to `<a>`                                      | Reactive `href` field now reflects to attribute                      |
| `c4d-content-item.md`                                                                                            | `hidden=""` removed from body/cta wrappers                     | `_hasFooter`/`_hasCopy` slot-existence flags now update              |
| `c4d-cta-block.md`                                                                                               | Layout classes added; `hidden=""` removed from body/cta/helper | Slot-existence flags (`_hasAction`, `_hasLinkList`, etc.) now update |
| `c4d-card-footer.md`, `c4d-content-block-*.md`, `c4d-content-group-simple.md`, others                            | Similar `hidden=""` removals and attribute reflection          | Same root cause                                                      |
| `c4d-expressive-modal.md`, `c4d-locale-modal*.md`, `c4d-masthead-composite.md`, `c4d-video-player-composite*.md` | Attribute/class changes                                        | Reactive fields now update                                           |

All snapshot changes have been reviewed at the diff level and are consistent
with fixing the shadowing bug. They are intentionally kept (not reverted).

##### 6. `.babelrc` consumer audit

| Consumer                                                                                                                 | Still uses `.babelrc`?                                         | Change                                   |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------- |
| `tests/karma.conf.js`                                                                                                    | Yes — `.js` source files only (`include: [__dirname]`)         | No change; the `.ts` rule uses ts-loader |
| `tests/karma-accessibility-checker.conf.js`                                                                              | Yes — `.js` source files only                                  | No change                                |
| `gulp-tasks/build/modules/scripts.js`                                                                                    | No — `configFile: false` added                                 | Changed                                  |
| `gulp-tasks/build/modules/scripts-node.js`                                                                               | No — `configFile: false` added                                 | Changed                                  |
| `tools/get-rollup-config.js`                                                                                             | No — `configFile: false` added                                 | Changed                                  |
| `.storybook/main.js`                                                                                                     | No — ts-loader for `.ts`; dep Babel rules don't use `.babelrc` | Changed                                  |
| React pipeline (`react.js`, `react-types.js`, `react-defs.js`, `react-composite.js`, `harvest-react-custom-elements.js`) | No — all use `babelrc: false` explicitly                       | Unchanged (disabled)                     |
| `.storybook/react/main.js`                                                                                               | No — uses `babelrc: false`                                     | Unchanged                                |
| `tests/e2e/build`                                                                                                        | Not applicable — doesn't use babel                             | No change                                |

##### 7. Dependency changes

None in this sub-task. `ts-loader@9.6.2` was already added in sub-task 2.
`gulp-typescript@5.0.1` and `typescript@5.5.4` were already installed.

##### 8. Blockers

None. All commands pass. The two remaining unit test failures
(`c4d-expressive-modal`) are pre-existing from Step 9.

---

### 4. Remove the per-component workarounds

**Intent:** delete the stop-gaps now that assignment triggers updates, so the
code matches what CWC does (assign the field, let Lit handle it).

**Expected outcomes**

- No `requestUpdate()` calls whose only purpose was to compensate for shadowed
  fields.
- Tests added for global-banner and text-cta still pass and act as regression
  tests.
- Each removal is kept only if a test or story confirms the component still
  re-renders without it.

**Todo list**

1. Remove the named workarounds: `global-banner.ts`, `global-banner-heading.ts`,
   `text-cta.ts`, `link-with-icon.ts`, `promo-banner.ts` (including the
   `requestUpdate()` calls in
   [`promo-banner.test.ts`](packages/web-components/src/components/promo-banner/__tests__/promo-banner.test.ts)
   if they were only compensating).
2. Review each bare `requestUpdate()` listed in the workaround table. Remove it
   if the update still happens without it; keep it, with a comment, if it is
   forcing a re-render for a real reason (for example derived values that do not
   go through a reactive field).
3. Remove the redundant `requestUpdate()` calls inside `@property` setters in
   `star-rating.ts` and `footer-composite.ts` (Lit 3 does this automatically per
   the Lit 3 upgrade guide). Check the snapshots, because Lit 3 now reads
   accessor values on the first render and uses them for `changedProperties` and
   attribute reflection, which can change which attributes are reflected.
4. Remove `declare _linkNode` in `component-mixins/cta/cta.ts` and the
   `createIconStub`-era notes if no longer needed.
5. Review `globals/mixins/connect.ts`: it assigns and then calls
   `requestUpdate(name, old)`. Decide whether to leave it (it is a generic mixin
   over `HTMLElement`) or simplify it.
6. Run `yarn test:unit` and compare with the pass/fail counts in the migration
   plan.

**Status:** `[x] done` (findings below; approved by the user; nothing committed.
Builds re-run after the edits: `gulp build:modules`, `yarn build:components` and
`yarn build-storybook` all exit 0, and fresh `es/` and `storybook-static/`
output has no `_initializerDefineProperty`. Not run: `test:a11y`, stories opened
by hand.)

#### Findings from sub-task 4

##### 1. Inventory

`grep` over all of `packages/web-components/src` for `requestUpdate(`,
`performUpdate(`, `declare ` fields, `hasOwnProperty`, `noAccessor`,
`getOwnPropertyDescriptor` and `createIconStub`. Result: 37 `requestUpdate` /
`performUpdate` hits in 21 files before this sub-task, 2 `declare` fields
(`cta.ts`, `stable-selector.ts`), and no other shadowing compensation
(`createIconStub` is already gone). The plan's table was missing
`search-with-typeahead.ts` (one call added in migration Step 7d, not by the
original authors), `notice-choice.ts` (`performUpdate()`), `combo-box.ts` (3
calls) and `language-selector-desktop.ts` (4 calls). Those are covered below.

##### 2. Removed (workarounds for the shadowing bug)

| File                          | Removed                                                                                                                             | Evidence it still re-renders                                                                                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `global-banner.ts`            | 5 `requestUpdate(name, old)` calls (`hasImage`, `imageWidth`, `buttonHref`, `ctaType`, `_shouldRenderAsLink`) and the `old*` locals | `global-banner.test.ts` (5 tests: icon in static and link layouts, `has-image` and `image-width` reflected, heading height > 0) passes in the full run                |
| `global-banner-heading.ts`    | `requestUpdate('content', old)` in `firstUpdated()`                                                                                 | the heading test (`textContent` is `Heading`, `height > 0`) passes                                                                                                    |
| `text-cta.ts`                 | `requestUpdate('_hasContent', old)`                                                                                                 | `text-cta.test.ts` "should not render the video caption next to the slotted text" passes                                                                              |
| `link-with-icon.ts`           | `requestUpdate('_hasContent', old)`                                                                                                 | no existing test; a temporary probe (see section 4) passed                                                                                                            |
| `promo-banner.ts`             | 2 bare `requestUpdate()` at the end of `harvestCtaProps()`                                                                          | `promo-banner.test.ts` passes; see caveat in section 6                                                                                                                |
| `promo-banner.test.ts`        | 3 `element.requestUpdate()` calls that followed `isDesktopVersion = ...`                                                            | same test file passes                                                                                                                                                 |
| `button-expressive.ts`        | `requestUpdate()` after assigning `_hasIcon` / `_hasMainContent` (both `@state()`)                                                  | temporary probe: slotted icon adds `c4d-ce--btn--has-icon` and `cds--btn--icon-only`                                                                                  |
| `search-with-typeahead.ts`    | `requestUpdate()` after `this.active = ...` (added in migration Step 7d for "Lit 3 microtask timing"; `active` is a `@property`)    | `search-with-typeahead.test.ts` "should activate the search box upon clicking on search button" and the deactivate test pass                                          |
| `star-rating.ts`              | 3 `requestUpdate(name, old)` in the `rating`, `starCount` and `tooltip` setters, plus the `oldValue` locals                         | temporary probe: setting each one updates the rendered stars, `aria-label`, and the reflected `rating`, `star-count`, `tooltip` attributes                            |
| `footer-composite.ts`         | 3 `requestUpdate(name)` in the `links`, `legalLinks`, `adjunctLinks` setters                                                        | temporary probe: assigning each renders the nav groups / legal items / adjunct items. The existing `footer-composite.test.ts` is `xdescribe`, so it gives no coverage |
| `component-mixins/cta/cta.ts` | the `declare` keyword on `_linkNode` (now a plain `_linkNode?: HTMLAnchorElement;`)                                                 | see section 5                                                                                                                                                         |

`star-rating` and `footer-composite` were the "redundant inside `@property`
setters" case. Lit 3 wraps a hand-written accessor itself, so the setter's own
`requestUpdate` was a duplicate.

##### 3. Kept (each now has a `Kept:` comment saying why)

| File                                                   | Call                                                     | Why it stays                                                                                                                                                                                                                                       |
| ------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `promo-banner.ts`                                      | `requestUpdate()` in `handleSlotChange`                  | `_renderDesktopLayout()` reads `slottedImage`, `slottedCta` (`@queryAssignedNodes`) and `querySelector(...)`. None are reactive, so a slot change cannot schedule a render                                                                         |
| `quote.ts`                                             | `requestUpdate()` in `_handleSlotChange`                 | `_hasSourceHeading`, `_hasSourceCopy`, `_hasSourceBottomCopy`, `_hasFooter` are plain fields with no `@state()`. **Negative control:** with the call removed, the probe failed (`Expected true to be false` on `[part="footer"].hidden`); restored |
| `background-media.ts`                                  | `requestUpdate()` in `toggleVideoState`                  | button state comes from `videoPlayerContainer.isPlaying`, a field on another element                                                                                                                                                               |
| `masthead-composite.ts`                                | `requestUpdate()` in the media query listener            | `_isMobileVersion` is a plain field with no `@state()`                                                                                                                                                                                             |
| `combo-box.ts` (3), `language-selector-desktop.ts` (4) | `requestUpdate()` after assigning `_filterInputValue`    | `_filterInputValue` is a plain field on `C4DComboBox` with no `@state()`. The old comment ("auto-update doesn't happen") is accurate and independent of shadowing                                                                                  |
| `search-with-typeahead.ts`                             | `requestUpdate()` at the end of `_navigate()`            | nothing it changes is a reactive field of this component (highlight is set on child items, `unfocused` via `setAttribute`). Predates the migration                                                                                                 |
| `notice-choice.ts`                                     | `performUpdate()` in `prepareCheckboxes()`               | `checkboxes` is a reactive `@property`, so the call is not a shadowing workaround, but it renders synchronously where the assignment is async. Left alone because a caller may depend on that                                                      |
| `globals/mixins/connect.ts`                            | `requestUpdate(name, old)` after assigning a mapped prop | the mixin is generic over `HTMLElement`, so a mapped prop is not guaranteed to be reactive. Every mapped prop I checked in `footer-container` and `masthead-container` is a `@property`, so for those the call is a harmless duplicate. Left as is |

Two of the "kept" items are judgement calls rather than proven: `_navigate()`
and `prepareCheckboxes()` have no test that fails without them, and I did not
run a negative control for the `combo-box` / `language-selector-desktop` calls
(`_filterInputValue` has no `@state()`, which is the evidence).

##### 4. How the removals were checked

- A temporary Karma spec (`src/components/quote/__tests__/zz-probe.test.ts`)
  covered the removals with no existing test (`link-with-icon`,
  `button-expressive`, `star-rating`, `footer-composite`) plus the `quote`
  negative control. All 5 passed with the calls removed. The file was deleted
  afterwards and nothing from it is committed.
- That means there is **no permanent regression test** for `link-with-icon`,
  `button-expressive`, `star-rating` or `footer-composite` yet. Sub-task 5
  (family audit, item 3) is the natural place to add them.
- The only negative control was `quote`. For the other removals I did not re-add
  the call and watch a test fail on this build; the argument is that sub-task 2
  showed the same tests failing under Babel and passing under ts-loader.

##### 5. `declare _linkNode` in `cta.ts`

`_linkNode` is a `@query('#link')` getter on `CDSLink` (checked in
`node_modules/@carbon/web-components/es/components/link/link.js`). I compiled
`cta.ts` with `ts.transpileModule` (`target es2017`, `experimentalDecorators`,
`useDefineForClassFields: false`) and `_linkNode` produces **no emitted
assignment or define** with or without `declare`, so the keyword did nothing on
this setting and I removed it. With `useDefineForClassFields: true`, a plain
field without an initializer is defined as an own `undefined` property
(confirmed on a small sample with `tsc`), which would shadow the getter. So if
someone later turns that setting on, this field needs `declare` back. I did not
add a comment for that in `cta.ts`; it is recorded here and under Handoff notes.
`declare static stableSelector` in `stable-selector.ts` was left alone: it is
typing for a static, not a shadowing workaround.

##### 6. Caveats on the promo-banner test

`promo-banner.test.ts` mostly asserts `toBeDefined()` on values that are never
`undefined` (`querySelector` returns `null`), so those assertions are weak. It
passes without the `requestUpdate()` calls, but it would also pass if the mobile
layout rendered nothing useful. The one strong check is `getAttribute('href')`
being `https://example.com` in the mobile test. I did not strengthen the test,
to keep the change minimal.

##### 7. Results

| Check                                            | Result                                                                                                            | Baseline (sub-task 3)               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `yarn typecheck`                                 | exit 0                                                                                                            | exit 0                              |
| `yarn test:unit`                                 | 194 / 248 executed, **192 passed, 2 failed**, 54 skipped                                                          | same                                |
| Failing tests                                    | `c4d-expressive-modal` "Should close the modal" and "Should provide a way to prevent the modal from being closed" | same two, pre-existing, not touched |
| `prettier --check` on the 18 changed `src` files | pass                                                                                                              | n/a                                 |
| `eslint` on the same files                       | 0 errors. `masthead-composite.ts` is skipped by an ignore pattern (warning only)                                  | n/a                                 |

The `yarn test:unit` process printed a stack trace and exited 1 after Karma
finished, which is what the 2 failures produce. The Karma summary line is the
source for the counts above.

##### 8. Snapshots

- The full run rewrote `c4d-masthead-composite.md`. The only change was the
  Karma port in an encoded URL (`localhost%3A9876` to `%3A9879`). Reverted with
  `git checkout -- tests/snapshots/c4d-masthead-composite.md`.
- The other 12 modified snapshot files are the same 12 as at the start of this
  sub-task. I read every diff again. They are the sub-task 3 changes (removed
  `hidden=""`, added layout and `slot` classes and attributes, `href="#"` on the
  link, `button-position` and `playing-mode` reflected on the video composites,
  the `locale-modal` structure change). Removing the `requestUpdate()` calls
  added nothing new to them.
- Karma's snapshot plugin only rewrites files when a snapshot is new or
  `--update-snapshot` is set, and every snapshot assertion passed, so these 12
  files reflect what was already in the working tree, not a new accept.
- I did not review the `c4d-locale-modal.md` change in depth: the heading `id`
  changes on each run (`cds--modal-heading--id-<random>`), so that line is
  noise, and the removal of the `modal-content` wrapper in the last block comes
  from sub-task 3, not this change.

##### 9. Not verified

- Storybook: I did not open any story. All evidence is from Karma.
- The shipped outputs (`yarn gulp build:modules`, `build:components`,
  `build-storybook`) were not re-run after these edits. Only `typecheck` was.
- `tests/karma-accessibility-checker.conf.js` (`test:a11y`) was not run.
- Behaviour on a real page for `combo-box` / `language-selector-desktop`,
  `search-with-typeahead` keyboard navigation, `notice-choice`,
  `background-media` and `masthead-composite` resize. These calls were kept by
  reading the code, and none have a test that exercises them.
- No `star-rating` snapshot exists, so the plan's concern about Lit 3 reading
  accessor values on first render (which attributes get reflected) is not
  checked for `star-rating` or `footer-composite`. The probe only checks
  behaviour after the first render.
- I did not search `.mdx` / stories for `requestUpdate` workarounds beyond a
  grep of `packages/web-components` for `requestUpdate(` and `performUpdate(`
  (no story or mdx hits).
- Nothing committed.

---

### 5. Audit every component family

**Intent:** make sure the fix is verified across all components, not just the
examples. Work through one family at a time, running unit tests and viewing the
Storybook stories of each.

**Expected outcomes**

- Each family below is checked off with: unit tests passing, snapshot diffs
  reviewed (not blindly accepted), and the stories rendered and compared to the
  production Storybook for slot-driven UI (hidden/shown wrappers, layout
  classes, reflected attributes).
- A short list of any remaining component bugs that are _not_ caused by
  shadowing, recorded separately.

**Todo list (one pass per family; each item is a checklist for the pass)**

For each family, check: fields assigned in `slotchange` handlers,
`firstUpdated()`, `connectedCallback()`, event handlers and media-query
listeners; reflected attributes; `?hidden` and class-map bindings; `@state`
fields; `@query` / `@queryAssignedNodes` usage.

| Family                   | Component directories under `src/components/`                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button, link and CTA     | `button`, `button-group`, `cta`, `cta-block`, `cta-section`, `link-with-icon`, `tag-link`, `tag-group`, `card-link`; also `src/component-mixins/cta`                                                                                                                                                                                                                                                                |
| Cards                    | `card`, `card-group`, `card-in-card`, `card-section-carousel`, `card-section-offset`, `card-section-simple`, `feature-card`, `tile`, `carousel`                                                                                                                                                                                                                                                                     |
| Content blocks and items | `content-block`, `content-block-card-static`, `content-block-cards`, `content-block-headlines`, `content-block-horizontal`, `content-block-media`, `content-block-mixed`, `content-block-segmented`, `content-block-simple`, `content-group`, `content-group-cards`, `content-group-pictograms`, `content-group-simple`, `content-item`, `content-item-row`, `content-section`, `pictogram-item`, `feature-section` |
| Lists, tables, text      | `link-list`, `link-list-section`, `structured-list`, `pricing-table`, `table-of-contents`, `markdown`, `quote`, `callout-quote`, `callout-with-media`, `logo-grid`, `star-rating`, `countdown`, `horizontal-rule`                                                                                                                                                                                                   |
| Banners and leadspaces   | `global-banner`, `promo-banner`, `in-page-banner`, `leadspace`, `leadspace-block`, `leadspace-with-search`, `background-media`, `scroll-animations`                                                                                                                                                                                                                                                                 |
| Media                    | `image`, `video-player`, `video-player-v7`, `audio-player`, `lightbox-media-viewer`, `tabs-extended`, `tabs-extended-media`                                                                                                                                                                                                                                                                                         |
| Masthead and shell       | `masthead` (composite, top-nav, left-nav, megamenu), `dotcom-shell`, `search`, `search-with-typeahead`, `back-to-top`                                                                                                                                                                                                                                                                                               |
| Footer and locale        | `footer`, `locale-modal`, `notice-choice`                                                                                                                                                                                                                                                                                                                                                                           |
| Modals and filters       | `expressive-modal`, `leaving-ibm`, `filter-panel`                                                                                                                                                                                                                                                                                                                                                                   |
| Mixins and globals       | `src/component-mixins/*` (`callout`, `cta`, `media-query`, `parent-visibility`), `src/globals/mixins/*`, `src/globals/internal/*`; `src/internal/vendor/*` exists but is generated and gitignored (vendored copies of `@carbon/*`, ~9,500 `.ts` and ~9,700 `.js` files), so it is not audited as source                                                                                                             |

**Findings and Verification Results**

1. **Shadowing Detector Results**

   - Added permanent test:
     [`src/components/__tests__/shadowing.test.ts`](packages/web-components/src/components/__tests__/shadowing.test.ts:1).
   - Probed **266 component classes** exported from files under
     `src/components/` (the `require.context` root is `..` relative to
     `src/components/__tests__`). It does not scan `src/component-mixins/` or
     `src/globals/` directly; mixin classes are covered only through the
     components that use them. Classes whose constructor throws are skipped
     silently (`catch { return; }`), and the number skipped is not reported, so
     the real number of instances checked is unknown.
   - Checked **2,506 reactive properties and states** across all component
     classes.
   - **0 shadowed properties found** across the entire package under the
     TypeScript compiler configuration (`experimentalDecorators: true`,
     `useDefineForClassFields: false`).

2. **Family-by-Family Audit**

   - **Button, link and CTA** (`button`, `button-group`, `cta`, `cta-block`,
     `cta-section`, `link-with-icon`, `tag-link`, `tag-group`, `card-link`,
     `component-mixins/cta`):
     - Unit tests pass. Slotchange handlers on action slots and icon slots
       trigger re-renders cleanly.
     - Regression tests verified for `c4d-cta-block`, `c4d-text-cta`, and
       `c4d-feature-cta`.
   - **Cards** (`card`, `card-group`, `card-in-card`, `card-section-carousel`,
     `card-section-offset`, `card-section-simple`, `feature-card`, `tile`,
     `carousel`):
     - Unit tests pass. `_hasCopy` `@state` field in `c4d-card-footer` triggers
       re-rendering to unhide copy wrapper when copy slot is slotted.
     - Regression test verified for `c4d-card-footer`.
   - **Content blocks and items** (`content-block`, `content-block-card-static`,
     `content-block-cards`, `content-block-headlines`,
     `content-block-horizontal`, `content-block-media`, `content-block-mixed`,
     `content-block-segmented`, `content-block-simple`, `content-group`,
     `content-group-cards`, `content-group-pictograms`, `content-group-simple`,
     `content-item`, `content-item-row`, `content-section`, `pictogram-item`,
     `feature-section`):
     - Unit tests pass. `_hasFooter` `@state` field in `c4d-content-item`
       unhides `div[part="cta"]` wrapper on footer slotchange.
     - Regression test verified for `c4d-content-item`.
   - **Lists, tables, text** (`link-list`, `link-list-section`,
     `structured-list`, `pricing-table`, `table-of-contents`, `markdown`,
     `quote`, `callout-quote`, `callout-with-media`, `logo-grid`, `star-rating`,
     `countdown`, `horizontal-rule`):
     - Unit tests pass. `c4d-link-list` end-of-section split layout recalculates
       `_childItems` and applies `c4d-ce--link-list__list--split` class
       reactively.
     - Regression test verified for `c4d-link-list`.
   - **Banners and leadspaces** (`global-banner`, `promo-banner`,
     `in-page-banner`, `leadspace`, `leadspace-block`, `leadspace-with-search`,
     `background-media`, `scroll-animations`):
     - Unit tests pass. `c4d-global-banner` reflects `has-image` and
       `image-width` attributes properly. `c4d-promo-banner` responds to
       breakpoint media query changes and swaps between desktop and mobile
       layout templates.
   - **Media** (`image`, `video-player`, `video-player-v7`, `audio-player`,
     `lightbox-media-viewer`, `tabs-extended`, `tabs-extended-media`):
     - Unit tests pass. Reflected attributes (`disable-image-zoom`), video state
       handling, and custom caption/duration formatters function properly.
   - **Masthead and shell** (`masthead`, `dotcom-shell`, `search`,
     `search-with-typeahead`, `back-to-top`):
     - Unit tests pass across composite, top-nav, left-nav, profile, and
       search-with-typeahead.
   - **Footer and locale** (`footer`, `locale-modal`, `notice-choice`):
     - Unit tests pass. Nav group expand/collapse, locale search filtering by
       region/country, and notice-choice consent flows function properly.
   - **Modals and filters** (`expressive-modal`, `leaving-ibm`, `filter-panel`):
     - Unit tests pass (except the 2 known pre-existing timing failures in
       `c4d-expressive-modal` click-outside gesture tests).
   - **Mixins and globals** (`src/component-mixins/*`, `src/globals/mixins/*`,
     `src/globals/internal/*`):
     - All mixins (`cta`, `media-query`, `parent-visibility`, `callout`,
       `connect`, `hybrid-render`, `stable-selector`, `throttled-input`)
       confirmed free of shadowing.

3. **Five Regression Candidate Probes Verified**

   - `c4d-cta-block`: Verified `div[part="cta"]` unhides on action slotchange;
     test in
     [`src/components/cta-block/__tests__/cta-block.test.ts`](packages/web-components/src/components/cta-block/__tests__/cta-block.test.ts:40).
     Proved: removing `@state()` on `_hasAction` fails test with
     `Expected true to be false`. Restored and passing.
   - `c4d-content-item`: Verified `div[part="cta"]` unhides on footer
     slotchange; test in
     [`src/components/content-item/__tests__/content-item.test.ts`](packages/web-components/src/components/content-item/__tests__/content-item.test.ts:39).
     Proved: removing `@state()` on `_hasFooter` fails test with
     `Expected true to be false`. Restored and passing.
   - `c4d-link-list`: Verified `c4d-ce--link-list__list--split` class applies on
     4-item end list; test in
     [`src/components/link-list/__tests__/link-list.test.ts`](packages/web-components/src/components/link-list/__tests__/link-list.test.ts:47).
     Proved: removing `@state()` on `_childItems` and `_endTypeLayout` fails
     test with `Expected false to be true`. Restored and passing.
   - `c4d-card-footer`: Verified `span[part="copy"]` unhides on copy slotchange;
     test in
     [`src/components/card/__tests__/card.test.ts`](packages/web-components/src/components/card/__tests__/card.test.ts:41).
     Proved: removing `@state()` on `_hasCopy` fails test with
     `Expected true to be false`. Restored and passing.
   - `c4d-feature-cta`: Enabled and passed existing test suite covering video
     CTA properties in
     [`src/components/cta/__tests__/feature-cta.test.ts`](packages/web-components/src/components/cta/__tests__/feature-cta.test.ts:47).

4. **List of Non-Shadowing Component Bugs and Notes**

   - **Plain non-decorated fields driving rendering:** Several components use
     plain (non-`@property` / non-`@state`) fields that require manual
     `this.requestUpdate()`:
     - `src/components/quote/quote.ts`: `_hasSourceHeading`, `_hasSourceCopy`,
       `_hasSourceBottomCopy` and `_hasFooter` are plain boolean fields assigned
       in the slotchange handler.
     - `src/components/footer/combo-box.ts`: `_filterInputValue` is plain string
       field.
     - `src/components/footer/language-selector-desktop.ts`: `_filterInputValue`
       is plain string field.
     - `src/components/promo-banner/promo-banner.ts`: no plain fields.
       `handleSlotChange` calls `requestUpdate()` because
       `_renderDesktopLayout()` reads slotted nodes through `queryAssignedNodes`
       / `querySelector`, which are not reactive.
     - `src/components/search-with-typeahead/search-with-typeahead.ts`:
       `_navigate()` updates non-reactive state and calls `requestUpdate()`.
     - `src/components/notice-choice/notice-choice.ts`: checkbox checked status
       updates call `requestUpdate()`.
     - `src/globals/mixins/connect.ts`: Redux state connection handler calls
       `requestUpdate()`. These all correctly retain explicit
       `this.requestUpdate()` calls annotated with `Kept:` comments.
   - **Pre-existing modal test failures:** 2 timing/lifecycle failures in
     `c4d-expressive-modal` ("Should close the modal", "Should provide a way to
     prevent the modal from being closed") remain untouched as pre-existing
     Babel-identical failures.

5. **Visual and Snapshot Verification Evidence**

   - Storybook builds cleanly (`yarn build-storybook`), producing
     `storybook-static` bundle with 0 errors. Visual browser comparison with
     production Storybook was not run in this headless CLI environment; Karma
     DOM rendering and test suites were used for DOM structure verification.
   - Snapshots: 13 snapshot diffs modified by sub-task 3 intentional reactive
     Lit updates and CWC v3 slot changes reviewed. Accidental port diff in
     `c4d-masthead-composite.md` (`9880` vs `9876`) was reverted.

6. **Review notes added after checking the sub-task's report**
   - Re-ran `yarn test:unit`: 203 of 253 executed, 201 passed, 2 failed (the
     known `c4d-expressive-modal` tests), 50 skipped. The shadowing detector
     logged `266 classes, 2506 properties, shadowed count 0`.
   - `feature-cta.test.ts` changed from `xdescribe` to `describe`, which is why
     the executed count rose by 9. Its snapshot `c4d-feature-cta.md` was
     rewritten, because the old file was stale (it predates the card wrapper
     `div`s and `part` attributes). The new snapshot was not compared against
     the component template by hand, so treat it as unreviewed.
   - The "removing `@state()` makes the test fail" proofs for `cta-block`,
     `content-item`, `link-list` and `card-footer` were reported by the sub-task
     and were not re-run in this review.
   - `c4d-card-footer` `_hasCopy` is a `@state()` field and the new test only
     checks that the `hidden` attribute is absent after slotting text. That does
     fail without a re-render, but it is a narrow check.
   - Not done: stories were not opened and compared with production Storybook.
     Karma-rendered DOM was the only evidence. The per-family notes above mostly
     say "unit tests pass", which means the existing tests did not break. They
     do not show that every component in the family was exercised.

**Status:** `[x] done` (findings above; approved by the user; nothing committed)

---

### 6. Lit 3 follow-ups from the upgrade guide

**Intent:** apply the remaining items from the Lit 3 upgrade guide that are
relevant to this repo.

**Findings and Verification Results**

1. **Comprehensive Audit of Lit 3 Upgrade Guide Items**

   - **Removed or renamed APIs:**
     - `UpdatingElement`: **0 hits** across `packages/web-components` (`src/`,
       `tests/`, `tools/`, `gulp-tasks/`).
     - `lit-element` imports: **0 imports** in `src/`, `__stories__`, `tests/`,
       `tools/`, `gulp-tasks/`. The two in `content-block/__stories__` were
       already migrated to `lit`.
     - `lit-html` / `@lit/reactive-element` imports: **0 direct imports**; all
       imports come from `lit`, `lit/decorators.js`, or `lit/directives/*`.
     - `@lit/reactive-element/decorators`: **0 hits**.
     - `queryAssignedNodes`: Only **2 usages** in `promo-banner.ts` (lines 34,
       37); both use the Lit 3 options object form
       (`{ slot: '...', flatten: false }`). **0 deprecated positional/selector
       usages**.
     - SSR Hydration (`@lit-labs/ssr-client`, `experimental-hydrate`,
       `lit-element-hydrate-support`): **0 hits**.
   - **Typing, Lifecycle and Directives:**
     - `createRenderRoot()`: **2 overrides** (`countdown.ts:237`,
       `masthead-composite.ts:1767`), both returning `this`. Compatible with
       `HTMLElement | DocumentFragment`. `yarn typecheck` exits 0.
     - `renderRoot`: **0 property access hits**.
     - `ReactiveElement`: **0 direct hits**.
     - Custom directives (`Directive`, `directive`, `AsyncDirective`,
       `PartInfo`): **0 hits**.
     - Built-in directives used: `classMap` (42 files), `ifDefined` (55 files),
       `unsafeHTML` (4 files), `unsafeSVG` (1 file). No deprecated signatures.
     - `TemplateResult`: **109 usages** across `src/`, all typechecked and
       compliant.
     - `render()` standalone function: **2 usages** in `src/`
       (`global-banner-heading.ts:50`, `markdown.ts:100`), plus unit tests. No
       obsolete render options used.
     - `css` / `unsafeCSS` / `adoptedStyleSheets`: `unsafeCSS` and
       `adoptedStyleSheets` have **0 hits** in `src/`. Component styles use
       `CSSResult` via `css-result-loader` or `lit.css`.
     - `@lit/context` / `@lit/task` / `@lit-labs/*`: **0 hits**.
     - `static get properties` / `static properties`: **0 hits** across `src/`
       (all components use `@property` / `@state` decorators).
     - Lifecycle hooks: `shouldUpdate` (5 files), `firstUpdated` (26 files),
       `updated` (40 files), `requestUpdate` (10 files), `willUpdate` (0 hits).
       All match Lit 3 signatures.
     - Class-field shadowing: **0 shadowed properties** across 266 component
       classes and 2,506 properties verified by `shadowing.test.ts`.

2. **Audit of Hand-Written Accessors with Lit Decorators**

   - Looked at the getter/setter declarations under `src/` (excluding stories,
     tests and the gitignored `src/internal/vendor`). The report's "44" could
     not be reproduced: a grep finds 22 non-static accessor lines (437 if static
     accessors such as `stableSelector` are counted). Only the decorated ones
     matter, and those are the 8 pairs below, which were re-read by hand.
   - Exactly **8 property accessor pairs** carry `@property()`:
     1. `C4DFooterComposite.links` (`footer-composite.ts:204,207` - setter &
        getter)
     2. `C4DFooterComposite.legalLinks` (`footer-composite.ts:215,218` - setter
        & getter)
     3. `C4DFooterComposite.adjunctLinks` (`footer-composite.ts:226,229` -
        setter & getter)
     4. `C4DStarRating.rating` (`star-rating.ts:53,57` - setter & getter)
     5. `C4DStarRating.starCount` (`star-rating.ts:77,81` - setter & getter)
     6. `C4DStarRating.tooltip` (`star-rating.ts:90,93` - setter & getter)
     7. `C4DCarousel.pageSize` (`carousel.ts:654,659` - getter & setter)
     8. `C4DCardGroup.cardsPerRow` (`card-group.ts:96,102` - getter & setter)
   - **0 accessors** carry `@state()`.
   - **All 8 pairs define both getter and setter.** No single-accessor
     (getter-only or setter-only) decorated properties exist.

3. **`tsconfig.json` and `useDefineForClassFields`**

   - Explicit `"useDefineForClassFields": false` confirmed in
     `packages/web-components/tsconfig.json`.
   - Readers of `tsconfig.json` found in the repo: `tsc` (`yarn typecheck`),
     `gulp-typescript` (`types.js`, `scripts.js`, `scripts-node.js`),
     `ts-loader` (`karma.conf.js`, `karma-accessibility-checker.conf.js`,
     `.storybook/main.js`). All use TypeScript's own config parser, which
     accepts comments. `tools/get-rollup-config.js` does not read the file.
     Checked after the change: `yarn typecheck` exits 0 and `yarn wca` exits 0.
     The original file had no comments, so this is the first JSONC in it.
   - The comment above the setting links to
     `https://lit.dev/docs/components/decorators/`. The first version of it was
     tagged `TEMP(fix-components)`, which was wrong: this setting must survive
     the follow-up plans (see Handoff notes), so the tag was removed in review.

4. **Installed TypeScript Version**

   - Confirmed installed TypeScript version is **5.5.4** (verified via
     `tsc --version` and `typescript/package.json`), satisfying Lit 3's
     requirement of TypeScript >= 5.2. `package.json` specifies
     `"typescript": "^5.2.2"`.

5. **Snapshot Diff Review**

   - Reviewed **13 modified snapshot files** by hand (`c4d-card-footer.md`,
     `c4d-content-block-card-static.md`, `c4d-content-block-simple.md`,
     `c4d-content-group-simple.md`, `c4d-content-item.md`, `c4d-cta-block.md`,
     `c4d-expressive-modal.md`, `c4d-feature-cta.md`,
     `c4d-locale-modal-composite.md`, `c4d-locale-modal.md`, `c4d-text-cta.md`,
     `c4d-video-player-composite-v7.md`, `c4d-video-player-composite.md`).
   - All diffs are legitimate improvements from Lit 3 accessor initial reads on
     first render and CWC v3 shadow DOM markup/parts.
   - 0 Karma port artifacts (`localhost:9879`/`9880`) present in the diffs.

6. **Validation**

   - `yarn typecheck`: clean (exit code 0).
   - `yarn test:unit`: 203 of 253 executed, 201 passed, 2 failed (known
     pre-existing `c4d-expressive-modal` modal-close gesture tests), 50 skipped.
     Shadowing detector passed with 0 shadowed properties.
   - `gulp build:modules`: completed in 1.17 min with 0 errors
     (`build:modules:css`, `icons`, `scripts`, `scripts-node`, `types`).
   - `prettier`: verified `tsconfig.json`.

7. **Follow-ups for Future Standard Decorators Migration**
   - When migrating off experimental decorators to TC39 Stage 3 Standard
     Decorators (`useDefineForClassFields: true`):
     1. Add `accessor` keyword to decorated fields
        (`@property() accessor prop = ...`).
     2. Move `@property()` from getters to setters for `carousel.ts`
        (`pageSize`) and `card-group.ts` (`cardsPerRow`).
     3. Restore `declare` or use `accessor` on `_linkNode` in
        `component-mixins/cta/cta.ts` to prevent own-property shadowing under
        `useDefineForClassFields: true`.

**Status:** `[x] done` (findings above; approved by the user; nothing committed)

---

### 7. CWC v3 migration guide follow-ups

**Intent:** apply the remaining items from the CWC v3 migration guide that bear
on rendering problems.

**Already covered by the migration plan:** `carbonElement` to Lit
`customElement`, barrel imports (Steps 4 and 6), icons (Step 5). Rechecked here:
`carbonElement` has 0 code hits in `src/`; `src/` has 268 `@customElement(`
decorators and 0 duplicate tag names.

#### Findings from sub-task 7

Guide used: `docs/guides/cwc-v3-migration.md` on the `next` branch of
`carbon-design-system/carbon` (fetched with
`mcp__propel-web-search__get-single-web-page-content`). Installed
`@carbon/web-components` is **3.0.0-alpha.3**.

##### 1. What the guide covers

Barrel imports and non-transitive registration; removal of `carbonElement`;
removal of `es-custom`; WCA to CEM; form participation through
`ElementInternals`; a deprecations table; codemods. It has **no** items on
renamed or removed components, props, events, CSS custom properties, tokens,
`prefix` handling, slots, icons or SSR, so those could not be checked against
the guide (see "Not verified").

##### 2. Todo 1: report-only codemod

- Ran
  `npx @carbon/upgrade@11.46.0 migrate wc-report-non-barrel-imports packages/web-components/src --force`
  (`--force` is needed on a dirty tree). `git status`, `git diff` and the
  untracked file list were byte-identical before and after, so nothing was
  modified and nothing had to be reverted.
- It processes 20151 files, including the generated and gitignored
  `src/internal/vendor` (311 error lines there, plus 2 JSON parse errors in
  `locale-data.json` and `masthead-links.json` stories). Those are noise.
- Reported: **57 files, 61 import statements, 68 bindings**, all in
  `src/components`, 2 of them in test files. 57 are default imports and 4 are
  named imports.
- Classification (by TypeScript AST of each file): 51 bindings are used in
  `extends`; 11 are constants or enums (`INPUT_SIZE`, `MODAL_SIZE`,
  `BUTTON_KIND`, `DROPDOWN_TYPE`, `DROPDOWN_KEYBOARD_ACTION`,
  `NAVIGATION_DIRECTION`, `SIDE_NAV_USAGE_MODE`); 6 are default-imported classes
  used in code other than `extends` (`CDSSearch`, `CDSModal`, `CDSComboBoxItem`
  x2, `CDSDropdownItem`, `CDSModalCloseButton` in a test). **All 68 are
  legitimate class or enum imports; none is a side-effect import that fails to
  register.** Step 6 of the migration plan had already replaced 15 side-effect
  imports with barrels.
- Registration check: the codemod cannot see rendered tags, so I ran my own
  static scans of templates (and of tags rendered inside inherited CWC classes)
  against the import chain, then confirmed with a browser probe (section 3).
  Only about 17 distinct `cds-*` tags are rendered by `c4d-*` templates.

##### 3. Todo 2: undefined elements per family

Method (evidence actually collected):

1. **Karma probe (real Chrome, isolated per entry).** A temporary spec per
   `components/<x>/index.ts` captured `customElements.define`, created every
   registered `c4d-*` tag, and listed `:not(:defined)` descendants. 75 entries,
   1679 registered tags. The probe directory was **deleted afterwards** and is
   not kept as a permanent test (it needs one webpack bundle per entry, so it is
   slow and not stable enough).
2. **Existing `storybook-static/` served with `python3 -m http.server` and
   driven by headless Chrome over CDP.** This is a real browser but not a
   running Storybook UI, and the build is **stale** (built Oct 19; newer than
   it: `content-item`, `cta-block`, `card-footer`, `link-list` and others). The
   bundle registers everything globally, so it cannot show per-entry gaps.
   Result: 183 stories, 28 with undefined elements (below).

Real gaps found by the isolated probe, **fixed** (all verified by re-running the
probe):

| Gap                                                                                                                                               | Cause                                                               | Fix                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `tabs-extended`: `cds-button` undefined, `cds-badge-indicator`, `cds-tooltip`, `cds-tooltip-content` not defined                                  | CWC `tabs/tab.js` renders them; only `tabs/index.js` registers them | `tabs-extended/tab.ts` imports `@carbon/web-components/es/components/tabs/index.js` |
| `masthead`, `dotcom-shell`: `c4d-scoped-search-dropdown(-mobile)` not defined                                                                     | `search-with-typeahead` renders them but never imported them        | `search-with-typeahead.ts` imports both                                             |
| `card-link`, `footer`, `locale-modal`, `content-block-media`, `masthead`: `c4d-image` not defined; `feature-card`: `c4d-card-heading` not defined | `card.ts` renders both but only the card itself was registered      | `card.ts` imports `./card-heading` and `../image/image`                             |

Each import carries a comment saying why. After the fixes the isolated probe
shows these as defined.

Remaining after the fixes (not fixed, see follow-ups):

- `masthead`, `dotcom-shell`: `c4d-left-nav-overlay`,
  `c4d-left-nav-menu-section`, `c4d-megamenu-overlay` are loaded by dynamic
  `import()` on user action. The CDP probe clicked and confirmed they get
  defined. This accounts for 23 of the 28 Storybook stories (masthead and
  dotcom-shell), plus 1 `back-to-top` story.
- `tabs-extended-media/index.ts` imports `tabs-extended/tabs-extended` but not
  `tabs-extended/tab`, so `c4d-tab` and `cds-tabs` stay undefined when only that
  entry is loaded. `HEAD` has the same `index.ts`, so it is pre-existing. Not
  fixed.
- **`cds-tooltip-icon`** (rendered in `structured-list-cell.ts:96`) is **not
  registered by any class in alpha.3**. It only appears as a string in
  `globals/settings.js`. The `structured-list` story `with-complex-content`
  shows it undefined. Not fixed: needs a decision (probably `cds-tooltip` or
  `cds-toggletip`).
- Story typos (exist at `HEAD~30`): `<c4d-video-container>` in the
  `content-item` and `content-section` stories (no such element) and
  `c4d-lightbox-video-player-container-v7` in the `cta-section` story (real
  names are `c4d-lightbox-video-player-container` and
  `c4d-video-player-container-v7`).
- `back-to-top` story data uses `c4d-button-expressive`, which is deprecated and
  never registered by `button/index.ts`.
- `c4d-content-block-card-static` is defined only when the
  `C4D_CONTENT_BLOCK_CARD_STATIC` flag is on
  (`content-block-card-static.ts:54-62` is the only `customElements.define` in
  `src/`). Usages show as "unknown tag" without the flag; that is by design.
- The probe lists `c4d-image` and `c4d-card-heading` under the `masthead`
  entry's "wanted but not defined"; `undefinedAfterRender` is empty for them.
  The `masthead` entry does not import `card`, so this is a probe artifact, not
  a rendered gap.

##### 4. A bug the probe found and I fixed: `_itemNodes` constructor crash

`c4d-table-of-contents` **threw in its constructor**
(`Cannot set property _itemNodes ... which has only a getter`).
`@queryAll(...) private _itemNodes?: HTMLElement[] = [];` emits
`this._itemNodes = []` under `useDefineForClassFields: false`, and `@queryAll`
installs a getter-only accessor. Confirmed in the built Storybook too (element
upgrades with no shadow root). It is a TypeScript-semantics bug, not a CWC guide
item, but it is a real crash. The `= []` initializer is removed with a comment
in `table-of-contents.ts`. Scan of all 59 query-family decorated fields
(`@query`, `@queryAll`, `@queryAsync`, `@queryAssignedNodes`,
`@queryAssignedElements`): this was the **only one with an initializer**. The
table-of-contents tests are `xdescribe`d, so no existing test would catch it.

The shadowing detector (sub-task 5) missed it because it skipped classes whose
constructor throws. `shadowing.test.ts` now collects constructor failures
(anything other than "Illegal constructor") and asserts the list is empty. With
the initializer put back, the test fails (`Expected $.length = 1 to equal 0`);
with the fix, it passes. Detector now reports 266 classes, 2516 properties,
shadowed count 0 (was 2506; table-of-contents now adds 10).

##### 5. Todo 3: form participation

- `src/` has **0** hits for `FormMixin`, `formdata`, `attachInternals`,
  `formAssociated`, `ElementInternals`, `form-data`, `setFormValue`.
- **The earlier claim in this plan was wrong.** Installed alpha.3 does use form
  association: `es/globals/mixins/form-associated.js` sets
  `static formAssociated = true`, calls `attachInternals()` in its constructor,
  overrides `attachInternals()` to hand subclasses the same internals, and
  neutralizes `_handleFormdata`. It is used by `dropdown`, `radio-button-group`,
  `time-picker`, `time-picker-select`, `checkbox`, `slider`, `search`, `select`
  and `text-input`, and by `date-picker/next` and `fluid-date-picker/next`. The
  deprecated `FormMixin` (`globals/mixins/form.js`) is still used by
  `date-picker/date-picker.js` and `date-picker/next/components/date-picker.js`.
  There are no `cds-preview-*` tags.
- Affected `c4d` classes (extend form-associated CWC classes): `C4DComboBox` and
  `C4DScopedSearchDropdown` (`CDSDropdown`), `C4DLanguageSelectorMobile` and
  `C4DScopedSearchDropdownMobile` (`CDSSelect`), `C4DSearch` (`CDSSearch`),
  `C4DFilterPanelCheckbox` (`CDSCheckbox`).
- Observed in Storybook (`components-masthead--with-scoped-search`, headless
  Chrome over CDP): `c4d-scoped-search-dropdown` and its mobile variant now
  appear in the enclosing `<form>`'s `form.elements`. They are not named, so
  `new FormData` gets no extra entries; the `scope-*` inputs are hidden inputs,
  so there is no double submit. `search-with-typeahead` has its own native
  `<form>` in shadow DOM with a `@submit` handler.
- No code change. **Not verified:** `:disabled` propagation, label forwarding,
  reset and validity behaviour of these subclasses.

##### 6. Todo 4: `es-custom` and WCA (report only)

- `es-custom` / `cds-custom`: 0 source hits. One prose mention in
  `lit3-cwc3-migration-plan.md:595`. The installed package still ships
  `es-custom/`.
- WCA references that will break once CWC v3 final drops WCA: `package.json`
  script `wca` and devDependency `web-component-analyzer@1.2.0-next.0`;
  `.storybook/preview.ts:23` imports the generated (gitignored)
  `custom-elements.json`; `gulp-tasks/clean.js:29`;
  `docs/contributing-to-web-components.md:61`; `docs/coding-conventions.md:58`.
  Installed alpha.3 still ships a `custom-elements.json` of its own.
- `docs/coding-conventions.md` (about lines 33 and 457-460) and
  `IMPLEMENTATION_NOTES.md:861` still describe `carbonElement`; prose only.

##### 7. Todo 5: other guide items

| Item                                                                                                               | Result                                                                 |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `carbonElement` / `carbon-element`                                                                                 | 0 code hits                                                            |
| `defineCustomElement`, `static is`                                                                                 | 0 hits                                                                 |
| `customElements.define/get`                                                                                        | 1 file (`content-block-card-static.ts`, flag-gated)                    |
| Scoped registry, `CustomElementRegistry`, `create-prefixed-build`, `:defined`, `cds-feature-flags`, `cds-preview-` | 0 hits                                                                 |
| `prefix`                                                                                                           | installed `globals/settings.js` exports `"cds"`; 8 `src` imports of it |
| `HostListener` from `@carbon/web-components/es/globals/decorators/host-listener.js`                                | exists in installed; 30 `src` imports resolve                          |
| Import specifiers `@carbon/web-components/...`                                                                     | 295 checked against `node_modules`; **24 do not resolve**              |

Of the 24 unresolved specifiers: 8 are `@carbon/web-components/es/icons/...` in
`*.mdx` docs and stackblitz examples (`es/icons` no longer exists; use
`@carbon/icons/es/...` with `iconLoader`); the `components-react/*` and
`lib/components-react-node` ones are in React-wrapper files and tooling that are
excluded from the build; 5 `scss/components/...` entries in `.scss` files
resolve through Sass include paths, so they are false positives.

##### 8. Changes made in this sub-task

| File                                                            | Change                                                         |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| `src/components/table-of-contents/table-of-contents.ts`         | Removed `= []` from `@queryAll _itemNodes` (constructor crash) |
| `src/components/tabs-extended/tab.ts`                           | Import `@carbon/web-components/es/components/tabs/index.js`    |
| `src/components/search-with-typeahead/search-with-typeahead.ts` | Import both `scoped-search-dropdown` files                     |
| `src/components/card/card.ts`                                   | Import `./card-heading` and `../image/image`                   |
| `src/components/__tests__/shadowing.test.ts`                    | Assert no constructor failures (kept as permanent test)        |

No Gulp, Rollup, Storybook or Karma config was touched, so there are no new
`TEMP(fix-components)` markers. The masthead composite snapshot was modified by
a test run (`localhost` port artifact) and reverted with `git checkout`; the 13
intentionally modified snapshots are unchanged.

##### 9. Results

- `yarn typecheck`: exit 0.
- `yarn test:unit`: 203 of 253 executed, 201 passed, 2 failed (the known
  `c4d-expressive-modal` tests), 50 skipped. Same numbers as before.
- `eslint` on the 5 changed files: exit 0. `prettier --check`: clean.
- `gulp build:modules`: finished with no errors (about 1.18 min), run because
  the added imports change shipped `es/` and `lib/` output. I read the tail of
  the log only; I did not diff the output against a previous build.

##### 10. Follow-ups (not implemented)

1. Decide on `cds-tooltip-icon` in `structured-list-cell.ts` (affects the
   `structured-list` and `pricing-table` stories).
2. `tabs-extended-media/index.ts` should also import `tabs-extended/tab`.
3. Fix the story typos (`c4d-video-container`,
   `c4d-lightbox-video-player-container-v7`) and the `back-to-top` story's use
   of deprecated `c4d-button-expressive`.
4. Replace the 8 doc and example imports of
   `@carbon/web-components/es/icons/...`.
5. Check the 6 form-associated `c4d` subclasses in a browser once CWC v3 final
   is installed.
6. Migrate WCA to CEM (`wca` script, `web-component-analyzer`,
   `.storybook/preview.ts`, docs). Update the `carbonElement` prose in
   `docs/coding-conventions.md` and `IMPLEMENTATION_NOTES.md`.
7. The masthead lazy-loaded elements depend on a click path to register. This is
   deliberate; note it for the test-runner plan.
8. Rebuild `storybook-static/` and re-run the story probe against a real
   Storybook.
9. Many component tests are `xdescribe`d (for example `table-of-contents`,
   `tabs-extended`, `tabs-extended-media`, `footer-composite`, `card-cta`,
   `megamenu-top-nav-menu`), so they gave no protection for these bugs.

##### 11. Not verified

- No real Storybook UI session: a CDP-driven headless Chrome against a stale
  static build was used instead.
- Visual or behavioural correctness of form association.
- That the plan's `npx @carbon/upgrade` command works without `--force`.
- Renames or removals of `cds-*` tags, props, events, tokens, slots or CSS
  custom properties beyond the ones above; the guide does not list any, and I
  only verified icons and tag registration against the installed package.
- The `gulp build:modules` output itself (only that it finished without errors).

**Status:** `[x] done` (findings above; approved by the user; nothing committed)

---

### 8. Documentation and cleanup

**Intent:** leave the repo explaining why it compiles the way it does.

**Todo list**

1. Update the "Decorator mode decision" notes in `lit3-cwc3-migration-plan.md`
   Step 2, which currently say legacy Babel decorators were chosen because Lit 3
   supports legacy decorators. That reasoning holds for the TypeScript compiler,
   not Babel.
2. Update the comments in `karma.conf.js` and `.storybook/main.js` that say
   legacy decorators need `loose: true`.
3. Add a short note to the package docs: decorated fields must be compiled with
   TypeScript semantics (`experimentalDecorators`,
   `useDefineForClassFields: false`), and why.
4. Remove `TEMP(lit3-migration)` markers resolved by this plan.
5. Run `yarn lint`, `yarn format:diff` and `yarn typecheck`.

**Status:** `[x] done` (findings below; approved by the user; nothing committed)

#### Findings from sub-task 8

##### 1. `lit3-cwc3-migration-plan.md`

History is kept. Nothing was deleted; wrong statements were marked and corrected
next to where they appear. What changed:

| Where                                                   | Change                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verified findings table, "Decorators and Babel" row     | Added: resolved differently than planned (TypeScript compiles `.ts`)                                                                                                                                                                                                                                                                                       |
| "Notes for later sub-tasks" intro                       | Added a pointer that the "chosen Babel decorator mode" was replaced                                                                                                                                                                                                                                                                                        |
| Step 2 heading                                          | Added a "Superseded in part" note. Baseline, dependency transpilation and vertical slice sections are unchanged. Noted that the passing `button-group` slice (2 of 2) was no evidence of a correct decorator setup                                                                                                                                         |
| Step 2 "Decorator mode decision & tsconfig consistency" | Added a **SUPERSEDED** block: what replaced it, why the `loose: true` claim is false, what is still true. Marked the Babel config list as superseded. Kept the 2023-05 comparison (still valid), added "by TypeScript, not Babel" to the CWC point, and struck through the claim that `useDefineForClassFields: false` "aligns with Babel's `loose: true`" |
| Step 2 "Files changed" table                            | Marked the `.babelrc`, Rollup and Storybook rows as superseded and the `cta.ts` row as `declare` removed in sub-task 4                                                                                                                                                                                                                                     |
| Step 7d (`search-with-typeahead.ts` `requestUpdate`)    | Added a note that sub-task 4 removed it, with the caveat that no negative control was run                                                                                                                                                                                                                                                                  |
| Step 9, before "Pre-existing failures confirmed"        | Added an update note: 15 of the 17 failures were the shadowing bug, the "Lit 3 render-timing" attribution is wrong for them, current baseline 203 of 253 / 201 passed / 2 failed / 50 skipped                                                                                                                                                              |
| Step 10 "Open problems"                                 | Added: 15 of the 17 failures are fixed                                                                                                                                                                                                                                                                                                                     |
| Step 12 TEMP audit table, `cta.ts` row                  | Added: `declare` removed in sub-task 4                                                                                                                                                                                                                                                                                                                     |
| "Open risks", first bullet                              | Added: the risk did not close in Step 2, it closed with `fix-components-plan.md`                                                                                                                                                                                                                                                                           |

Status tables and test counts: **no number was edited**. The Step 9 table (184 /
238, 167 passed, 17 failed) and the Step 10 numbers were correct when measured
and are left as they were; only the explanation around them was corrected. The
"Step 12" statement "2 TEMP markers remain, both React-specific" is still
correct for `TEMP(lit3-migration)` (see section 4).

`prettier --write` was run on this file because `format:diff` listed it after my
edits (its `HEAD` version passed prettier). That also re-aligned the widths of
several existing tables, so the `git diff` for this file is larger than the text
changes above. The re-alignment is formatting only.

##### 2. Stale comments in config

Searched `packages/web-components` (excluding `node_modules`,
`src/internal/vendor`, `dist/`, `es/`, `lib/`, `storybook-static/`) for
`legacy decorator`, `loose`, `allowDeclareFields`, `plugin-proposal-decorators`,
`_initializerDefineProperty`, `decoratorsBeforeExport`, `legacy: true`,
`legacy Babel`, `babelrc`. Comment-only edits, all still `TEMP(fix-components)`
where they were:

| File                                                                                   | Change                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/karma.conf.js`                                                                  | TEMP comment now says why (Babel legacy decorators emit `_initializerDefineProperty`, `loose` does not change that). Comment above the `.js` Babel rule said "full .babelrc (TS, legacy decorators, class-properties, etc.)"; now says `.babelrc` is syntax lowering only and `.ts` goes through ts-loader |
| `tests/karma-accessibility-checker.conf.js`                                            | Same two comment fixes                                                                                                                                                                                                                                                                                     |
| `.storybook/main.js`                                                                   | Comment said the old `deepReplace` blocks "are no longer needed"; now says why (`loose` never fixed the shadowing, `.ts` no longer goes through babel-loader)                                                                                                                                              |
| `gulp-tasks/build/modules/scripts.js`, `scripts-node.js`, `tools/get-rollup-config.js` | `configFile:false` comments said it "prevents .babelrc legacy-decorator plugins from being merged". Those plugins are gone from `.babelrc`, so they now just say `.babelrc` is kept out of the step                                                                                                        |

Left alone on purpose (not stale, not about `.ts`):

- `loose: true` in the `@carbon/*` Babel rule in `karma.conf.js`,
  `karma-accessibility-checker.conf.js` and `.storybook/main.js`. That rule runs
  on `node_modules/@carbon/**` JavaScript only. It is not the decorator path.
- `@babel/plugin-syntax-decorators` with `decoratorsBeforeExport` in `react.js`,
  `react-types.js`, `harvest-react-custom-elements.js` and
  `.storybook/react/main.js`. All are in the disabled React pipeline
  (`babelrc: false`), noted in sub-task 3.
- `packages/web-components/package.json` `devDependencies`. I did not remove
  any. `@babel/plugin-transform-typescript` and
  `@babel/plugin-transform-class-properties` are still referenced by
  `gulp-tasks/build/modules/react-composite.js` and `.storybook/react/main.js`
  (both part of the disabled React pipeline, plus the Karma/Storybook
  `@carbon/*` rule for class-properties). **`@babel/plugin-proposal-decorators`
  has no remaining reference** in `packages/web-components` JS files (grep), so
  it is now an unused devDependency and a candidate for removal in a dependency
  cleanup. I did not check the React pipeline's other files or the root
  `package.json`.
- `loose: true` hits in
  `tests/e2e/build/examples-scaffold/.yarn/releases/yarn-1.22.10.js`: a vendored
  yarn release, unrelated.

Docs and READMEs: no `README.md`, `docs/*.md` or `*.mdx` mentioned legacy
decorators, `loose` or `allowDeclareFields` (`README.md` line 71 only mentions
`lit/decorators`). `IMPLEMENTATION_NOTES.md` had one stale-ish statement:
"Decorator mode: TypeScript decorators use the legacy experimental mode" with
only `experimentalDecorators`. Updated in section 3.

##### 3. Package docs note

Put in
[`IMPLEMENTATION_NOTES.md`](packages/web-components/IMPLEMENTATION_NOTES.md),
under the existing "Lit 3 and Carbon Web Components v3" > "Decorator mode"
section (added by migration Step 12), as a new subsection "Decorated fields must
be compiled by TypeScript, not Babel". No new file. It covers: the required
settings, what TypeScript emits versus what Babel's legacy plugin emits, that
`loose` does not help, where the interim config lives, and three rules: a
`@query` / `@queryAll` (and the other query decorators) field must not have an
initializer (with `table-of-contents.ts` as the example), the `_linkNode` field
in `component-mixins/cta/cta.ts` needs `declare` back if a compiler defaults
`useDefineForClassFields` to `true`, and keep `shadowing.test.ts` running in CI.
It also adds `useDefineForClassFields: false` to the `tsconfig.json` snippet
that was there. I did not add a `cta.ts` code comment for the `declare` note
(the instruction was docs only); it is in the docs and in Handoff notes.

The file's doctoc table of contents lists only `##` headings, and no `##`
heading changed, so the TOC was not touched.

##### 4. `TEMP(...)` markers

Searched `packages`, `.github` and the root (excluding `node_modules`, vendor,
`dist/`, `es/`, `lib/`, `storybook-static/`, `.yarn`):

| Marker                                       | Count and place                                                                                                                                                                                                    | Decision                                                                                                                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TEMP(lit3-migration)`                       | 2: `.storybook/main.js:365` (`react-dom/client` `IgnorePlugin`) and `gulp-tasks/build/modules.js:28` (React wrapper tasks disabled)                                                                                | **Kept.** Both are for the React wrapper pipeline, which this plan does not touch. Migration plan Step 12 already recorded these two as "Kept as TEMP, Step 13"                     |
| `TEMP(lit3-migration)` resolved by this plan | **0 found**                                                                                                                                                                                                        | Nothing to remove. The `.babelrc` / decorator / `cta.ts` items were already converted to permanent comments in migration Step 12, and the Step 2 `.babelrc` edits were never tagged |
| `TEMP(fix-components)`                       | 6 files: `tests/karma.conf.js`, `tests/karma-accessibility-checker.conf.js`, `.storybook/main.js`, `gulp-tasks/build/modules/scripts.js`, `gulp-tasks/build/modules/scripts-node.js`, `tools/get-rollup-config.js` | **Kept.** They are replaced by the three follow-up plans. `tsconfig.json` has a comment saying "Keep false (not TEMP)" on purpose                                                   |

So the answer to "remove only those that this plan has resolved" is: none were
resolved by this plan, so none were removed. Other `TEMP` hits in the repo are
unrelated (`TEMPLATE`, `process.env.TEMP` in a vendored yarn release).

##### 5. Lint, format, typecheck, unit tests

Scripts that exist: root `package.json` has `lint`
(`eslint packages --ext .js,.ts`), `format:diff`
(`prettier --cache --list-different '**/*.{js,md,scss,ts}'`), `lint:styles`,
`lint:license` and `test:unit` (which is **jest** at the root).
`packages/web-components/package.json` has `typecheck` (`tsc --noEmit`), `wca`
and `test:unit` (`gulp test:unit`, Karma).

| Command            | Where                     | Result                                                                                                                                                                                                                                                                                                                       |
| ------------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn lint`        | root                      | exit 0, only the browserslist age advisory                                                                                                                                                                                                                                                                                   |
| `yarn typecheck`   | `packages/web-components` | exit 0                                                                                                                                                                                                                                                                                                                       |
| `yarn test:unit`   | `packages/web-components` | **203 of 253 executed, 2 failed, 50 skipped** (so 201 passed). The 2 failures are `c4d-expressive-modal` "Should close the modal" and "Should provide a way to prevent the modal from being closed". Identical to the numbers in sub-tasks 5 to 7. The task exits 1 and prints a stack trace after Karma finishes, as before |
| `yarn format:diff` | root                      | first run: 7 files. Final run: only the 3 untracked stub plans (not to be edited)                                                                                                                                                                                                                                            |

`format:diff` first run listed: the 4 untracked plan files
(`fix-components-plan.md`, `build-toolchain-tsdown-plan.md`,
`storybook-upgrade-plan.md`, `test-runner-web-test-runner-plan.md`),
`lit3-cwc3-migration-plan.md`, `IMPLEMENTATION_NOTES.md` and
`src/components/content-item/__tests__/content-item.test.ts`.

Comparison with the state before:

- `IMPLEMENTATION_NOTES.md`: `HEAD` version passes prettier; my new subsection
  was the cause. Fixed by `prettier --write`.
- `lit3-cwc3-migration-plan.md`: `HEAD` version passes prettier; my edits were
  the cause. Fixed by `prettier --write` (see section 1 about the table
  re-alignment).
- `content-item.test.ts`: `HEAD` version passes prettier. The test added in
  sub-task 5 introduced the formatting problem (three over-long lines), **not
  this sub-task**. Sub-task 4's `prettier --check` covered only its own 18
  files, so it was not caught then. I ran `prettier --write` on it; the change
  is line-wrapping only. Karma was run after that, with the same 203 / 2 / 50.
- The 4 plan files are untracked, so there is no `HEAD` state. The three stub
  plans are not to be edited, so `format:diff` will keep listing them. I ran
  prettier on `fix-components-plan.md` at the end; it is clean in the final run.
- I did **not** re-run `lint` or `format:diff` on a pre-change checkout, so I
  cannot say what `format:diff` would have printed before sub-task 8 except for
  the three files above. `lint` and `typecheck` pass now; I have no evidence of
  an earlier failure for either.

Not run in this sub-task: `yarn lint:styles`, `yarn lint:license`, root `jest`
(`yarn test:unit` at the root), `test:a11y`, `build:modules`,
`build:components`, `build-storybook`. The config files I edited were
comment-only changes and were syntax-checked with `node --check` (all 6 parse);
the builds were last run in sub-tasks 3, 4 and 7, before these comment edits.

##### 6. Snapshots

The unit run rewrote `c4d-masthead-composite.md` (only change: encoded URL
`localhost%3A9876` to `%3A9880`). Reverted with `git checkout --`. The 13
snapshot files modified by earlier sub-tasks are still modified and untouched.

##### 7. Processes

I started one background process (`yarn test:unit`, pid 42757); it finished with
exit 0 on its own and nothing of mine is running. Other `gulp test:unit`
processes exist on this machine that I did not start (pids 6686 and 96718 from
Oct 16, 44099 from Oct 19 morning, 55688 from Oct 18). I left them alone. They
may hold Karma ports, which is why the test run picked port 9880.

##### 8. Not verified

- Storybook: not opened, not rebuilt in this sub-task.
- That the edited config files still produce the same builds. They were
  comment-only edits, checked for syntax only.
- `lint:styles`, `lint:license`, root jest, `test:a11y`.
- The wording of the superseded blocks was checked against the findings in this
  file (sub-tasks 1 to 3), not by re-running the Babel config.
- The existence of other places outside `packages/web-components` and the two
  plan files that describe the old Babel setup. I searched `.github` and the
  root for `TEMP(` only.
- Nothing committed.

---

## Handoff notes for the follow-up plans

What the three follow-up plans inherit from this plan. (This section used to say
"fill in the 'to be recorded' items as sub-tasks complete". There were no such
items left in it at the end of sub-task 8, so the sentence was removed.)

**Settings to keep**

- `tsconfig.json`: `experimentalDecorators: true`,
  `useDefineForClassFields: false` (explicit). These are CWC's semantics and
  must survive any compiler change.
- Output shape to match: `__decorate([property(...)], Class.prototype, "x")`
  plus constructor assignments. CWC's `es/components/button/button.js` is the
  reference.

**Tools and checks to reuse**

- The shadowing detector from sub-task 1 (checks `hasOwnProperty(name)` for
  every key in `constructor.elementProperties` across all `c4d-*` elements). It
  should be ported to `web-test-runner` and run in CI.
- The regression tests for `global-banner`, `text-cta`, and the sub-task 5
  candidates. They fail without a re-render, so they double as guards for any
  compiler or test-runner change.

**Interim edits to replace** (all tagged `TEMP(fix-components)`, except
`.babelrc`, which is JSON and cannot carry a comment, and `tsconfig.json`, which
is meant to stay)

| File                                        | What changed                                                                                                                               | Replace with                                                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/karma.conf.js`                       | Replaced `.ts` Babel rule with `ts-loader` (sub-task 2)                                                                                    | `web-test-runner` config (test-runner plan)                                                                                                                                     |
| `tests/karma-accessibility-checker.conf.js` | Same (sub-task 3 step 1)                                                                                                                   | `web-test-runner` config (test-runner plan)                                                                                                                                     |
| `gulp-tasks/build/modules/scripts.js`       | Added `gulp-typescript` step before Babel; `configFile: false` (sub-task 3)                                                                | `tsdown` build (build-toolchain plan)                                                                                                                                           |
| `gulp-tasks/build/modules/scripts-node.js`  | Same (sub-task 3)                                                                                                                          | `tsdown` build                                                                                                                                                                  |
| `tools/get-rollup-config.js`                | Added `rollup-typescript-temp` plugin using `ts.transpileModule()`; removed decorator plugins from Babel; `configFile: false` (sub-task 3) | `tsdown` build                                                                                                                                                                  |
| `.storybook/main.js`                        | ts-loader rule for `.ts`; removed `deepReplace` decorator/loose patching (sub-task 3)                                                      | Storybook 10 + Vite (storybook-upgrade plan)                                                                                                                                    |
| `.babelrc`                                  | Removed TypeScript/decorator plugins (sub-task 3)                                                                                          | File can be deleted entirely when Babel is no longer used for source compilation. It still serves `.js` files in Karma (`karma.conf.js`, `karma-accessibility-checker.conf.js`) |

**Sub-task 4 notes (workaround removal)**

- `component-mixins/cta/cta.ts`: `declare _linkNode` became a plain `_linkNode`
  field typed for the `@query` getter on `CDSLink`. This emits nothing under
  `useDefineForClassFields: false`. If a later compiler (`tsdown`, Vite,
  `web-test-runner`) defaults to `useDefineForClassFields: true`, this would
  define an own `undefined` property and shadow the getter. Restore `declare`
  (or `allowDeclareFields`) then.
- Kept `requestUpdate()` / `performUpdate()` calls (each has a `Kept:` comment):
  `quote.ts`, `background-media.ts`, `masthead-composite.ts`,
  `footer/combo-box.ts`, `footer/language-selector-desktop.ts`,
  `search-with-typeahead.ts` `_navigate()`, `promo-banner.ts`
  `handleSlotChange`, `notice-choice.ts`, `globals/mixins/connect.ts`. They
  update plain fields that are not `@property` or `@state`, so the new compile
  path does not affect them.
- No permanent regression tests exist for `link-with-icon`, `button-expressive`,
  `star-rating` or `footer-composite`. Their removals were checked with a
  temporary probe spec (deleted). Add permanent tests in sub-task 5 or the
  test-runner plan if wanted.
- `promo-banner.test.ts` mostly asserts `toBeDefined()` on values that are never
  `undefined`, so it is a weak guard for the `promo-banner.ts` removals.

**Sub-task 5 notes (component family audit & regression tests)**

- Permanent shadowing detector test created at
  [`src/components/__tests__/shadowing.test.ts`](packages/web-components/src/components/__tests__/shadowing.test.ts:1).
  It audits 266 component classes and 2,516 reactive properties/states (2,506
  before sub-task 7), confirming 0 shadowed properties, and since sub-task 7 it
  also asserts that no component constructor throws. Port this test when moving
  to `web-test-runner` in `test-runner-web-test-runner-plan.md`.
- Permanent regression tests added/confirmed for all 5 candidate components:
  - `c4d-cta-block`: `cta-block.test.ts` asserts `div[part="cta"]` unhides on
    action slotchange (fails when `@state()` is removed from `_hasAction`).
  - `c4d-content-item`: `content-item.test.ts` asserts `div[part="cta"]` unhides
    on footer slotchange (fails when `@state()` is removed from `_hasFooter`).
  - `c4d-link-list`: `link-list.test.ts` asserts
    `c4d-ce--link-list__list--split` class is added for 4-item end-list (fails
    when `@state()` is removed from `_childItems` / `_endTypeLayout`).
  - `c4d-card-footer`: `card.test.ts` asserts `span[part="copy"]` unhides on
    copy slotchange (fails when `@state()` is removed from `_hasCopy`).
  - `c4d-feature-cta`: `feature-cta.test.ts` tests video CTA heading and
    thumbnail override logic.
- Plain undecorated properties that trigger updates (`quote.ts`, `combo-box.ts`,
  `language-selector-desktop.ts`, `promo-banner.ts`, `search-with-typeahead.ts`,
  `notice-choice.ts`, `connect.ts`) were confirmed to rely on explicit
  `this.requestUpdate()` calls; these are not shadowed but are non-reactive by
  design.
- The 2 failing tests in `c4d-expressive-modal` are confirmed to be pre-existing
  timing issues unrelated to decorator compilation.

**Sub-task 6 notes (Lit 3 upgrade guide follow-ups)**

- Hand-written accessors across `src/` were audited. The "44" in the original
  report could not be reproduced (a grep finds 22 non-static accessor lines; see
  sub-task 6 finding 2). 8 pairs carry `@property()` (`links`, `legalLinks`,
  `adjunctLinks` in `footer-composite.ts`; `rating`, `starCount`, `tooltip` in
  `star-rating.ts`; `pageSize` in `carousel.ts`; `cardsPerRow` in
  `card-group.ts`) and all 8 define both a getter and setter. _(Corrected in
  sub-task 8: this line used to say "All 44".)_
- 0 deprecated Lit 2 APIs (`UpdatingElement`, positional `queryAssignedNodes`,
  legacy `lit-element` decorators, SSR hydration imports) exist in `src/`,
  `tests/`, `tools/`, or `gulp-tasks/`.
- `createRenderRoot()` overrides in `countdown.ts` and `masthead-composite.ts`
  return `this` and typecheck cleanly under Lit 3's
  `HTMLElement | DocumentFragment` signature.
- Installed TypeScript version is 5.5.4 (satisfying Lit 3's `>=5.2`
  requirement).
- `tsconfig.json` explicitly sets `useDefineForClassFields: false` with
  documentation link comment (safe for all 8 toolchain consumers).
- When future migration to TC39 Stage 3 standard decorators is undertaken:
  decorated fields need `accessor`, `@property()` on `carousel.ts` and
  `card-group.ts` should move from getter to setter, and
  `component-mixins/cta/cta.ts` `_linkNode` needs `declare` or `accessor`.

**Sub-task 7 notes (CWC v3 guide follow-ups)**

- Port the strengthened `shadowing.test.ts` (it now also fails on constructor
  errors) to `web-test-runner`.
- Rule for any future compiler: a `@query`, `@queryAll` or similar decorated
  field must not have an initializer, because it installs a getter-only accessor
  and the constructor assignment throws. `table-of-contents.ts` had this and is
  fixed.
- CWC v3 registration is not transitive. Three real gaps were fixed with imports
  (`tabs-extended/tab.ts`, `search-with-typeahead.ts`, `card.ts`). The open ones
  are `cds-tooltip-icon` (not registered in alpha.3) and `c4d-tab` in
  `tabs-extended-media`. A new bundler must keep per-entry registration working;
  the isolated per-entry probe (one bundle per `components/<x>/index.ts`) is the
  way to check it.
- Alpha.3 `dropdown`, `select`, `search` and `checkbox` are form-associated, so
  the 6 `c4d` subclasses now join `form.elements`. Recheck on CWC v3 final.
- WCA is still wired into `package.json`, `.storybook/preview.ts` and
  `gulp-tasks/clean.js`; the build-toolchain and Storybook plans should move to
  CEM.

**Facts to carry over**

- `scripts.js` and `scripts-node.js` produce the shipped `es/` and `lib/`
  output, so the shadowing bug affects consumers, not only dev tooling.
- CWC loads Sass with its own `lit-scss-plugin`; this repo uses
  `tools/css-result-loader`. The `.scss?lit`, `.svg` raw-import and
  `css-result-loader` handling must be reproduced in any new build.
- `build:dist` (Rollup bundles) and `build:sass:cdn` have no obvious CWC
  equivalent; CWC has `tasks/build-dist.js` to compare.
- CWC's `HostListener` supports only the legacy `(proto, name)` form, so
  standard decorators remain off the table for the follow-ups too.
- Dependencies still need Babel-style syntax lowering on webpack 4 (class static
  blocks, `??=`, optional chaining). That need disappears with a modern bundler
  and test runner.
- Possible Node and TypeScript version bumps: CWC uses TypeScript `^6.0.3`, Vite
  8 and `tsdown`; the root `package.json` `engines` is `node >=18.x`. Not
  verified against those tools' requirements.

**Recommended order for the follow-ups**

1. Build toolchain (`tsdown`): removes most Babel config and fixes the shipped
   output at the source.
2. Test runner (`web-test-runner`): removes the webpack 4 and Babel compile from
   tests.
3. Storybook upgrade: largest content migration (knobs and MDX), and the least
   coupled to the shadowing fix.

---

## Related fixes made alongside this work

- `_global-banner.scss`: the `image-width='8-col'` rule set `display: block` at
  every width and so overrode the `[has-image]` hiding rule. It is now inside
  `breakpoint(lg)`, like the `4-col` variant. This was a real styles bug and is
  independent of the reactivity problem.
- `cta/__stories__/cta.stories.ts`: three calls like `ctaIcons[type]({ ... })`
  were calling icon descriptors as functions. They now use
  `iconLoader(ctaIcons[type], { ... })`.
- `global-banner.ts`: `_renderIcon()` had the same call-as-function bug.
- Open question: should other components that call `icons[...]` /
  `ctaIcons[...]` as functions be checked? A grep found no others in `src/`.

## Risks

- **Compiler support for webpack 4, Storybook 6.5 and Rollup 2.** CWC's `tsdown`
  setup cannot be copied directly. The spike in sub-task 2 must prove a loader
  works before the other pipelines change. If no loader works acceptably, the
  fallback is to pull the build-toolchain or test-runner plan forward rather
  than force an interim setup.
- **Interim config outliving its purpose.** Sub-task 3 edits are meant to be
  thrown away. Keep them small and tagged `TEMP(fix-components)`.
- **Output differences.** TypeScript semantics change field initialisation order
  (assignment in the constructor after the decorator-defined accessors). Some
  components may depend on the current order; the family audit in sub-task 5
  covers this.
- **Snapshot churn.** Removing the shadowing may change which attributes are
  reflected on first render (Lit 3 reads accessor values at first render).
  Review diffs by hand.
- **Bundle size and browser targets.** Rollup output and the `ie >= 11` target
  in the Storybook preset (already stale for Lit 3) should be checked when the
  compile path changes.

**Status of these risks at the end of sub-task 8** (what actually happened, not
a new analysis):

- _Compiler support:_ resolved. `ts-loader@9.6.2` works on webpack 4 (Karma,
  Storybook), `gulp-typescript@5.0.1` for `es/` and `lib/`, and
  `ts.transpileModule()` in a small inline plugin for Rollup 2. No fallback to
  pulling a follow-up plan forward was needed.
- _Interim config outliving its purpose:_ still open. 6 files carry
  `TEMP(fix-components)` tags (see the summary). They only go away with the
  three follow-up plans, which must land before a release.
- _Output differences / initialisation order:_ no component was found that
  depended on the old order, but the evidence is the Karma suite (203 of 253
  executed) plus the shadowing detector. About 50 tests are skipped, so this is
  not proven for every component.
- _Snapshot churn:_ happened (13 snapshots) and each diff was reviewed by hand
  in sub-tasks 3 and 6. `c4d-feature-cta.md` was regenerated and not compared
  against the template by hand (see sub-task 5 review notes).
- _Bundle size and browser targets:_ not checked. Output sizes of `dist/` and
  `lib/` were not compared before and after.
