/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const {
  utilitiesCJSSrcDir,
  utilitiesESSrcDir,
  utilitiesVendorSrcDir,
  utilitiesVendorCJSDstDir,
  utilitiesVendorESDstDir,
} = require('./config');

/**
 * Generates `src/internal/vendor` contents.
 */
const utilitiesVendorSrc = () =>
  gulp
    .src([`${utilitiesESSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(utilitiesVendorSrcDir));

/**
 * Generate `es/internal/vendor` contents.
 */
const utilitiesVendorESDst = () =>
  gulp
    .src([`${utilitiesESSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(utilitiesVendorESDstDir));

/**
 * Generate `lib/internal/vendor` contents.
 */
const utilitiesVendorCJSDst = () =>
  gulp
    .src([`${utilitiesCJSSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(utilitiesVendorCJSDstDir));

// Vendor builds

gulp.task(
  'vendor:utilities',
  gulp.parallel(utilitiesVendorSrc, utilitiesVendorCJSDst, utilitiesVendorESDst)
);

gulp.task('vendor', gulp.series(gulp.task('vendor:utilities')));
