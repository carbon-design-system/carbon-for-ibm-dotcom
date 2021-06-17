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
const {
  servicesStoreCJSSrcDir,
  servicesStoreESSrcDir,
  servicesStoreVendorSrcDir,
  servicesStoreVendorCJSDstDir,
  servicesStoreVendorESDstDir,
} = require('./config');

/**
 * Generates `src/internal/vendor` contents.
 */
const servicesStoreVendorSrc = () =>
  gulp.src([`${servicesStoreESSrcDir}/**/*`, '!**/*-{test,story}.js']).pipe(gulp.dest(servicesStoreVendorSrcDir));

/**
 * Generate `es/internal/vendor` contents.
 */
const servicesStoreVendorESDst = () =>
  gulp.src([`${servicesStoreESSrcDir}/**/*`, '!**/*-{test,story}.js']).pipe(gulp.dest(servicesStoreVendorESDstDir));

/**
 * Generate `lib/internal/vendor` contents.
 */
const servicesStoreVendorCJSDst = () =>
  gulp.src([`${servicesStoreCJSSrcDir}/**/*`, '!**/*-{test,story}.js']).pipe(gulp.dest(servicesStoreVendorCJSDstDir));

// Vendor builds
gulp.task('vendor:services-store', gulp.parallel(servicesStoreVendorSrc, servicesStoreVendorCJSDst, servicesStoreVendorESDst));
gulp.task('vendor', gulp.task('vendor:services-store'));
