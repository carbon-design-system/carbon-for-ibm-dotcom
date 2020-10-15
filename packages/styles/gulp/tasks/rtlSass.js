/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  rtlcss = require('gulp-rtlcss'),
  sass = require('gulp-sass'),
  path = require('path');

/**
 * @name _rtlSass
 * @function
 * @description
 * Compile RTL .scss files into build css directory with autoprefixer,
 * then live reload the browser
 *
 * @returns {object} The gulp task stream
 * @private
 */
function _rtlSass() {
  // prettier-ignore
  return gulp
    .src(global.config.scssEntry)
    .pipe(sass({
      includePaths: [
        path.resolve(__dirname, '../../', 'node_modules'),
        path.resolve(__dirname, '../../../../', 'node_modules'),
      ]
    }).on('error', sass.logError))
    .pipe(
      prefix(['> 1%', 'last 2 versions'], {
        cascade: true,
      })
    )
    .pipe(rtlcss())
    .pipe(rename(global.config.distRtlCss))
    .pipe(gulp.dest('dist'))
    .pipe(cleanCSS())
    .pipe(rename(global.config.distRtlCssMin))
    .pipe(gulp.dest('dist'));
}

/**
 * Gulp task export
 *
 * @module rtlSass
 */
module.exports = gulp.task('rtlSass', _rtlSass);
