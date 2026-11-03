/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const gulp = require('gulp');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
// TEMP(fix-components): compile .ts with TypeScript experimental-decorator semantics
// (__decorate on prototype + plain constructor assignments) instead of Babel legacy
// decorators (_initializerDefineProperty, own-property shadowing). gulp-typescript
// runs first; downstream Babel steps keep the same path rewrites and runtime helpers.
// Replace with tsdown when build-toolchain-tsdown-plan.md lands.
const typescript = require('gulp-typescript');
const stripComments = require('strip-comments');
const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');

const config = require('../../config');
const { harvestReactCustomElementTypeCandidates } = require('./tasks/harvest-react-custom-elements');

/**
 * Builds the scripts node modules
 *
 * @returns {Promise<*>} gulp stream
 */
async function scriptsNode() {
  const { dependencies } = await harvestReactCustomElementTypeCandidates();

  // TEMP(fix-components): isolatedModules skips type-checking for speed; declaration:false
  // avoids emitting .d.ts here (types.js handles that); module:esnext preserves ESM so the
  // downstream @babel/plugin-transform-modules-commonjs step converts to CJS.
  const tsProject = typescript.createProject(
    path.resolve(__dirname, '../../../tsconfig.json'),
    {
      isolatedModules: true,
      declaration: false,
      module: 'esnext',
    }
  );

  const tsResult = gulp
    .src(
      [
        ...dependencies,
        `${config.srcDir}/components/**/*-connect.ts`,
        `!${config.srcDir}/globals/internal/**/*.ts`,
        `!${config.srcDir}/globals/mixins/**/*.ts`,
        `!${config.srcDir}/globals/ibmdotcom-web-components-dotcom-shell.ts`,
        `!${config.srcDir}/**/*.scss`,
      ],
      { allowEmpty: true, base: config.srcDir }
    )
    .pipe(filter(file => /\/defs\.ts$/i.test(file.path) || /\/.*-connect\.ts$/i.test(file.path)))
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return (
    tsResult.js
      .pipe(
        babel({
          // configFile:false keeps .babelrc out of this step — the incoming code is
          // already JS from gulp-typescript.
          configFile: false,
          presets: ['@babel/preset-modules'],
          // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
          plugins: [
            // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
            ['@babel/plugin-transform-runtime', { useESModules: false, version: '7.8.0' }],
            babelPluginResourceCJSPaths,
            '@babel/plugin-transform-modules-commonjs',
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter(file => stripComments(file.contents.toString()).replace(/\s/g, '')))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.cjsDestDir))
  );
}

gulp.task('build:modules:scripts-node', scriptsNode);
