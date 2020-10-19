/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const { servicesStoreESSrcDir, servicesStoreVendorSrcDir, servicesStoreVendorESDstDir } = require('./config');

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

module.exports = {
  servicesStore: gulp.parallel(servicesStoreVendorSrc, servicesStoreVendorESDst),
};
