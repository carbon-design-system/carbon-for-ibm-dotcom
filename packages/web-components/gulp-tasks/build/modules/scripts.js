/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const stripComments = require('strip-comments');
const babelPluginResourceJSPaths = require('../../../tools/babel-plugin-resource-js-paths');

const config = require('../../config');

/**
 * Builds the module script files
 *
 * @returns {*} Gulp stream
 */
function scripts() {
  return (
    gulp
      .src([
        `${config.srcDir}/**/*.ts`,
        `!${config.srcDir}/**/__stories__/*.ts`,
        `!${config.srcDir}/**/__tests__/*.ts`,
        `!${config.srcDir}/**/*.d.ts`,
        `!${config.srcDir}/**/ibmdotcom-web-components-*.ts`,
      ])
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-modules', '@babel/preset-env'],
          // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
          plugins: [
            ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.3.0' }],
            '@babel/plugin-syntax-dynamic-import',
            babelPluginResourceJSPaths,
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter(file => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.jsDestDir))
  );
}

gulp.task('build:modules:scripts', scripts);
