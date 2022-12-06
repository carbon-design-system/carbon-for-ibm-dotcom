/**
 * Copyright IBM Corp. 2020, 2022
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
  // This can be changed to `dart-sass` once Carbon V11 is used require('sass')
  sass = require('gulp-sass')(require('node-sass')),
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
}

/**
 * @name rtl
 * @function
 * @description
 * Compile the RTL versions of the css directory into the dist folder
 * @returns {object} the gulp task stream
 * @private
 */
function rtl() {
  return _sass()
    .pipe(rtlcss())
    .pipe(rename(global.config.distRtlCss))
    .pipe(
      cleanCSS({
        format: 'beautify',
        level: {
          1: { specialComments: 'none' },
          2: { removeDuplicateRules: true },
        },
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(rename(global.config.distRtlCssMin))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
}

/**
 * Gulp task export
 *
 * @module sass-rtl
 */

module.exports = gulp.task('sass-rtl', rtl);
