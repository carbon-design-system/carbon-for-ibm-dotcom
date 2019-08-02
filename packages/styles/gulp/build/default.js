'use strict';

const gulp = require('gulp');

/**
 * Gulp task export
 * @module default
 */
module.exports = gulp.task('default', gulp.series('clean', 'sass'));
