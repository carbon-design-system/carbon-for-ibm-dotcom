/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp'),
  del = require('del');

/**
 * @name _clean
 * @function
 * @description
 * Clean build and export folders
 * @returns {object} The gulp task stream
 * @private
 */
function _clean() {
  return del([global.config.distPath]);
}

/**
 * Gulp task export
 *
 * @module clean
 */
module.exports = gulp.task('clean', _clean);
