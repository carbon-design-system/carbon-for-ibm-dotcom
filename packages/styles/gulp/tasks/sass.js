/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  // cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  path = require('path');
// sourcemaps = require('gulp-sourcemaps');

/**
 * @name _sass
 * @function
 * @description
 * Compile .scss files into build css directory with autoprefixer,
 * then live reload the browser
 *
 * @returns {object} The gulp task stream
 * @private
 */
function _sass() {
  // prettier-ignore
  return gulp
    .src(global.config.scssEntry)
    // .pipe(sourcemaps.init())
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
    .pipe(rename(global.config.distCss))
    .pipe(gulp.dest('dist'))
    /*.pipe(
      cleanCSS({
        level: 2,
      })
    )*/
    .pipe(rename(global.config.distCssMin))
    .pipe(gulp.dest('dist'));
}

/**
 * Gulp task export
 *
 * @module sass
 */
module.exports = gulp.task('sass', _sass);
