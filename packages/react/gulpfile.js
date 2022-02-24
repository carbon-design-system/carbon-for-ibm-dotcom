/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const test = require('./gulp-tasks/test');
const vendor = require('./gulp-tasks/vendor');

gulp.task('vendor:carbon-components-react', vendor.carbonComponentsReact);
gulp.task('vendor:services', vendor.servicesVendor);
gulp.task('vendor:utilities', vendor.utilitiesVendor);

gulp.task(
  'vendor',
  gulp.series(
    gulp.task('vendor:carbon-components-react'),
    gulp.task('vendor:services'),
    gulp.task('vendor:utilities')
  )
);

gulp.task('test:a11y', test.a11y);
gulp.task('test', gulp.task('test:a11y'));

process.once('SIGINT', () => {
  process.exit(0);
});
