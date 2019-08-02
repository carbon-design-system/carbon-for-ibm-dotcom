'use strict';

const gulp = require('gulp');

/**
 * Gulp task export
 *
 * @module dev
 */
module.exports = gulp.task('dev', gulp.series('default', 'watch'));
