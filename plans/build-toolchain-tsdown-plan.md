# Replace the Gulp build with CWC v3's `tsdown` build

> **Stub.** Created from the discussion in
> [`fix-components-plan.md`](fix-components-plan.md). Sub-tasks are to be filled
> out in a separate conversation thread. Do not start implementation from this
> file alone.

## Top-level overview

**Goal:** build `packages/web-components` the way `@carbon/web-components` (CWC)
v3 builds itself: TypeScript-semantics compilation through `tsdown`, with `tsc`
for declarations, replacing the Gulp tasks, `gulp-babel` and the Babel-based
TypeScript compile.

**Why this is a separate plan:** it replaces the whole `gulp-tasks/` tree and
Rollup setup and decides what ships in `es/`, `lib/` and `dist/`. It is a
standalone project with its own risk profile, and it should not be mixed into
the shadowed-field fix.

**Relationship to the fix plan**

- [`fix-components-plan.md`](fix-components-plan.md) applies an **interim**
  TypeScript-semantics compile to Karma and the shipped outputs. The edits to
  `gulp-tasks/build/modules/scripts.js`, `scripts-node.js` and
  `tools/get-rollup-config.js` are tagged `TEMP(fix-components)` and are
  replaced by this plan.
- This plan is the **recommended first** of the three follow-ups: it removes
  most of the Babel config and fixes the shipped output at the source.
- Must keep: `experimentalDecorators: true`, `useDefineForClassFields: false`,
  and the `__decorate` plus constructor-assignment output shape.

## Verified facts

- CWC builds with `tsdown` in `tasks/build.js` (`target: 'es2022'`,
  `preserveModules`, ESM to `es/` and CJS to `lib/`), passes `tsconfig.json`
  through, and uses `tsc` for declaration emit because the `tsdown` dts plugin
  mishandles mixin patterns such as `HostListenerMixin`. No Babel in the build.
  (Upstream `packages/web-components/tasks/build.js`.)
- CWC's compiled output is the reference shape, for example
  `node_modules/@carbon/web-components/es/components/button/button.js`
  (`__decorate([property({...})], CDSButton.prototype, "kind", void 0)` and
  `static { this.is = ... }` blocks).
- CWC compiles Sass into Lit styles with its own `tools/lit-scss-plugin.js`
  (autoprefixer + cssnano). This repo uses `tools/css-result-loader`.
- CWC's package: `"type": "module"`, TypeScript `^6.0.3`, `tsdown ^0.23.0`,
  `vite ^8.0.0`. Not verified against this repo's Node `engines` (`>=18.x`).
- This repo today:
  `gulp-tasks/build/modules/{scripts,scripts-node,types,css,icons}.js`,
  `build/dist.js` (Rollup via `tools/get-rollup-config.js`), `build/sass.js`,
  `build/sass-cdn.js`, `build/components.js`. React-related tasks are disabled
  (migration plan Step 3).
- `package.json` `exports` here differ from CWC's (`./es/components-react/*`,
  `./es/components/*` with a `node` condition, `./dist/`).

## Open questions (to resolve when filling out the plan)

1. Does `tsdown` (and the Node and TypeScript versions it needs) work in this
   monorepo (Yarn 4, Node `>=18.x` today)?
2. What replaces `build:dist` (Rollup bundles for the CDN) and `build:sass:cdn`?
   CWC has `tasks/build-dist.js` to compare.
3. How are `.scss?lit`, raw `.svg` imports and the existing resource-path Babel
   plugins (`babel-plugin-resource-js-paths`, `babel-plugin-resource-cjs-paths`,
   `babel-plugin-undef-custom-elements`) reproduced?
4. Does the published `exports` map and the `lib/` (CJS) output stay compatible?
5. What happens to the React wrapper pipeline (migration plan Step 13)?
6. TypeScript 5 to 6: needed, or can the build stay on the current version?

## Sub-tasks

To be filled out. Suggested starting points:

1. Spike: build one component family with `tsdown` and compare against CWC and
   against the current `es/` output.
2. Sass/Lit style loading parity.
3. ESM `es/` and CJS `lib/` outputs, `exports` map and type declarations.
4. `dist/` and CDN bundles.
5. Remove Gulp, `gulp-babel`, `.babelrc` and resolved `TEMP(fix-components)`
   edits.
6. CI workflow and docs updates.

**Status:** `[ ] not started (stub)`
