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
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const test = require('./gulp-tasks/test');
const vendor = require('./gulp-tasks/vendor');

gulp.task('vendor:services-store', vendor.servicesStore);
gulp.task('vendor', gulp.task('vendor:services-store'));

gulp.task('build:bundles:scripts:ltr:dev', build.bundles.scripts.ltr.dev);
gulp.task('build:bundles:scripts:ltr:prod', build.bundles.scripts.ltr.prod);
gulp.task(
  'build:bundles:scripts:ltr',
  gulp.parallel(gulp.task('build:bundles:scripts:ltr:dev'), gulp.task('build:bundles:scripts:ltr:prod'))
);
gulp.task('build:bundles:scripts:rtl:dev', build.bundles.scripts.rtl.dev);
gulp.task('build:bundles:scripts:rtl:prod', build.bundles.scripts.rtl.prod);
gulp.task(
  'build:bundles:scripts:rtl',
  gulp.parallel(gulp.task('build:bundles:scripts:rtl:dev'), gulp.task('build:bundles:scripts:rtl:prod'))
);
gulp.task('build:bundles', gulp.parallel(gulp.task('build:bundles:scripts:ltr'), gulp.task('build:bundles:scripts:rtl')));
gulp.task('build:modules:css', build.modules.css);
gulp.task('build:modules:icons', build.modules.icons);
gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task('build:modules:types', build.modules.types);
gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:css'),
    gulp.task('build:modules:icons'),
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:types')
  )
);
gulp.task('build:sass', build.sass);
gulp.task(
  'build',
  gulp.series(gulp.task('vendor'), gulp.parallel(gulp.task('build:bundles'), gulp.task('build:modules'), gulp.task('build:sass')))
);

gulp.task('clean', clean);

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
