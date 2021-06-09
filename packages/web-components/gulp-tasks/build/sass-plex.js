/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const config = require('../config');

sass.compiler = require('node-sass');

/**
 * Builds the sass file for the plex font
 *
 * @returns {*} gulp stream
 */
function sassPlex() {
  return gulp
    .src([`${config.srcDir}/globals/scss/plex.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

gulp.task('build:sass:plex', sassPlex);
