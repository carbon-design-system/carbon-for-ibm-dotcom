/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const vendor = require('./gulp-tasks/vendor');

gulp.task('vendor', vendor.utilitiesVendor);

process.once('SIGINT', () => {
  process.exit(0);
});
