/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');

/**
 * Gulp task export
 *
 * @module dev
 */
module.exports = gulp.task('dev', gulp.series('default', 'watch'));
