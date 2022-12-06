/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');

gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task('build:modules:types', build.modules.types);
gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:types')
  )
);
gulp.task('build', gulp.task('build:modules'));

gulp.task('clean', clean);

process.once('SIGINT', () => {
  process.exit(0);
});
