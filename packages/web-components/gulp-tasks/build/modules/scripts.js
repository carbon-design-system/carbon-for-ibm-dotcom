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
const babelPluginResourceJSPaths = require('../../../tools/babel-plugin-resource-js-paths');

const config = require('../../config');

/**
 * Builds the module script files
 *
 * @returns {*} Gulp stream
 */
function scripts() {
  // TEMP(fix-components): isolatedModules skips type-checking (matches transpileOnly in
  // ts-loader) for speed; declaration:false avoids emitting .d.ts here (types.js handles
  // that separately). module:esnext preserves ESM import/export for downstream Babel.
  const tsProject = typescript.createProject(
    path.resolve(__dirname, '../../../tsconfig.json'),
    {
      isolatedModules: true,
      declaration: false,
      module: 'esnext',
    }
  );

  const tsResult = gulp
    .src([
      `${config.srcDir}/**/*.ts`,
      `!${config.srcDir}/**/__stories__/*.ts`,
      `!${config.srcDir}/**/__tests__/*.ts`,
      `!${config.srcDir}/**/*.d.ts`,
      `!${config.srcDir}/**/ibmdotcom-web-components-*.ts`,
    ])
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
          // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              { useESModules: true, version: '7.3.0' },
            ],
            '@babel/plugin-syntax-dynamic-import',
            babelPluginResourceJSPaths,
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(
        filter((file) =>
          stripComments(file.contents.toString(), {
            sourceType: 'module',
          }).replace(/\s/g, '')
        )
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.jsDestDir))
  );
}

gulp.task('build:modules:scripts', scripts);
