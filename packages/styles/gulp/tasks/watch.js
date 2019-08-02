'use strict';

const gulp = require('gulp');

/**
 * Gulp task responsible for watching the sass, JS and HTML and when any files change, rebuild the package
 *
 * @module watch
 */
module.exports = gulp.task('watch', () => {
  gulp.watch(global.config.scssFiles, gulp.task('sass'));
});
