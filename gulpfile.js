/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const lint = require('./gulp-tasks/lint');

gulp.task('lint:license:src', lint.license.src);
gulp.task('lint:license', gulp.task('lint:license:src'));

process.once('SIGINT', () => {
  process.exit(0);
});
