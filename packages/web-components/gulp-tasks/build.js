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
require('./vendor');
require('./build/dist');
require('./build/components');
require('./build/modules');
require('./build/sass');
require('./build/sass-cdn');

gulp.task(
  'build',
  gulp.series(gulp.task('vendor'), gulp.parallel(gulp.task('build:dist'), gulp.task('build:modules'), gulp.task('build:sass')))
);
