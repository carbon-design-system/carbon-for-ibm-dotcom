/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass')(require('sass')),
  path = require('path');

/**
 * @name _sass
 * @function
 * @description
 * Compile .scss files into build css directory with autoprefixer,
 * then live reload the browser
 * @returns {object} The gulp task stream
 * @private
 */
function _sass() {
  // prettier-ignore
  return gulp
    .src(global.config.primitivesEntry)
    .pipe(sass({
      includePaths: [
        path.resolve(__dirname, '../../', 'node_modules'), // styles
        path.resolve(__dirname, '../../../../', 'node_modules'), // styles
      ]
    }).on('error', sass.logError))
    .pipe(
      prefix(['> 1%', 'last 2 versions'], {
        cascade: true,
      })
    )
}

/**
 * @name primitives
 * @function
 * @description
 * Compile the regular versions of the css primitives into the dist folder
 * @returns {object} the gulp task stream
 * @private
 */
function primitives() {
  return _sass()
    .pipe(
      cleanCSS({
        format: 'beautify',
        level: {
          1: { specialComments: 'none' },
          2: { removeDuplicateRules: true },
        },
      })
    )
    .pipe(gulp.dest('dist/primitives'))
    .pipe(cleanCSS())
    .pipe(
      rename(function (path) {
        path.extname = '.min.css';
      })
    )
    .pipe(gulp.dest('dist/primitives'));
}

/**
 * Gulp task export
 *
 * @module sass-primitives
 */
module.exports = gulp.task('sass-primitives', primitives);
