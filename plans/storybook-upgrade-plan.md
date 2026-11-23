# Upgrade Storybook 6.5 to CWC v3's version (Storybook 10 + Vite)

> **Stub.** Created from the discussion in
> [`fix-components-plan.md`](fix-components-plan.md). Sub-tasks are to be filled
> out in a separate conversation thread. Do not start implementation from this
> file alone.

## Top-level overview

**Goal:** move `packages/web-components` Storybook from 6.5 on webpack 4 to the
setup `@carbon/web-components` (CWC) v3 uses: Storybook 10 with the
`@storybook/web-components-vite` framework (Vite 8).

**Why this is a separate plan:** the cost is much bigger than a version bump
(knobs, MDX, custom addons, webpack-specific config, visual-test dependencies).
It is the largest content migration of the three follow-ups and the least
coupled to the shadowed-field fix.

**Relationship to the fix plan**

- Moving to Vite helps: Vite compiles TypeScript with an esbuild-style transform
  that respects `experimentalDecorators` and `useDefineForClassFields`, so
  Storybook would get the right semantics without Babel.
- [`fix-components-plan.md`](fix-components-plan.md) therefore limits Storybook
  work to a minimal, **interim** `.ts` rule change (tagged
  `TEMP(fix-components)`) so the component audit can run. That edit is discarded
  here.
- Recommended as the **third** of the three follow-ups.

## Verified facts

- CWC uses `storybook ^10.3.5`, `@storybook/web-components-vite ^10.3.5`,
  `@storybook/addon-docs`, `@storybook/addon-links`,
  `storybook-addon-accessibility-checker`, and `vite ^8.0.0` (`yarn storybook`
  on port 6011; separate `.storybook-v12` config). (Upstream
  `packages/web-components/package.json`.)
- This repo: `@storybook/web-components`, `@storybook/react`,
  `@storybook/addon-{actions,docs,essentials,knobs,links,storysource}` and
  `@storybook/source-loader`, all `^6.5.15` (knobs `^6.4.0`). Scripts call
  `node ../../node_modules/@storybook/web-components/bin/*.js`.
- `.storybook/main.js` is webpack-4 specific: it rewrites Babel options at
  runtime with `deepReplace`, adds `node_modules` Babel rules for Lit and CWC,
  configures Sass, `TerserPlugin` and `splitChunks`. Terser/esbuild mangling of
  Lit 3 internals in dev mode was already a problem (migration plan Step 2).
- 57 story files import `@storybook/addon-knobs`, which later Storybook versions
  do not support; those need rewriting to args and controls.
- 128 `.stories.mdx` files (about half are `.react.mdx` and are currently
  excluded from the Storybook build) use the old MDX docs format.
- Custom addons: `addon-knobs-args` (local), `storybook-addon-rtl`,
  `@carbon/storybook-addon-theme`.
- Cypress and Percy tests (`tests/e2e-storybook`) run against
  `storybook-static`, so output structure and story IDs matter.
- Node requirements of Storybook 10 and Vite 8 have not been checked against the
  root `engines` (`node >=18.x`).

## Open questions (to resolve when filling out the plan)

1. Does the React Storybook (`.storybook/react`, `build-storybook:react`) stay
   disabled, move, or get dropped? (Linked to migration plan Step 13.)
2. Replacement for knobs: args/controls rewrite for 57 story files, or a shim?
3. MDX: automated codemod or manual rewrite for the story docs?
4. Replacements or ports for `addon-knobs-args`, `storybook-addon-rtl` and
   `@carbon/storybook-addon-theme`.
5. How Sass, `.scss?lit`, raw `.svg` and the resource-path handling work under
   Vite (depends on the build-toolchain plan).
6. Impact on `build-storybook:rtl` / `:experimental` variants and the e2e
   Storybook tests (story IDs, URLs).
7. Should it follow CWC's `.storybook` structure (including a v12 config)?

## Sub-tasks

To be filled out. Suggested starting points:

1. Spike: Storybook 10 + Vite rendering a few stories (`button`,
   `global-banner`).
2. Knobs to args/controls migration, family by family.
3. MDX docs migration.
4. Addons: RTL, theme, accessibility checker.
5. Build, deploy and e2e (Cypress/Percy) updates; remove webpack 4 Storybook
   config and `TEMP(fix-components)` edits.

**Status:** `[ ] not started (stub)`
