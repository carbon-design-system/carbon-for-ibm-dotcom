/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const {
  servicesCJSSrcDir,
  servicesESSrcDir,
  servicesVendorCJSDstDir,
  servicesVendorESDstDir,
  servicesStoreCJSSrcDir,
  servicesStoreESSrcDir,
  servicesStoreVendorCJSDstDir,
  servicesStoreVendorESDstDir,
  utilitiesCJSSrcDir,
  utilitiesESSrcDir,
  utilitiesVendorCJSDstDir,
  utilitiesVendorESDstDir,
} = require('./config');

/**
 * Generate `es/internal/vendor` contents.
 */
const servicesVendorESDst = () =>
  gulp
    .src([`${servicesESSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(servicesVendorESDstDir));

/**
 * Generate `lib/internal/vendor` contents.
 */
const servicesVendorCJSDst = () =>
  gulp
    .src([`${servicesCJSSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(servicesVendorCJSDstDir));

/**
 * Generate `es/internal/vendor` contents.
 */
const servicesStoreVendorESDst = () =>
  gulp
    .src([`${servicesStoreESSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(servicesStoreVendorESDstDir));

/**
 * Generate `lib/internal/vendor` contents.
 */
const servicesStoreVendorCJSDst = () =>
  gulp
    .src([`${servicesStoreCJSSrcDir}/**/*`, '!**/*-{test,story}.js'])
    .pipe(gulp.dest(servicesStoreVendorCJSDstDir));

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
  gulp.parallel(utilitiesVendorCJSDst, utilitiesVendorESDst)
);
gulp.task(
  'vendor:services',
  gulp.parallel(servicesVendorCJSDst, servicesVendorESDst)
);
gulp.task(
  'vendor:services-store',
  gulp.parallel(servicesStoreVendorCJSDst, servicesStoreVendorESDst)
);
gulp.task(
  'vendor',
  gulp.series(
    gulp.task('vendor:utilities'),
    gulp.task('vendor:services'),
    gulp.task('vendor:services-store')
  )
);
