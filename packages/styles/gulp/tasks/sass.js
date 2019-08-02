'use strict';

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

/**
 * @name _sass
 * @function
 * @description
 * Compile .scss files into build css directory with autoprefixer,
 * then live reload the browser
 *
 * @returns {object} The gulp task stream
 * @private
 */
function _sass() {
  return gulp
    .src(global.config.scssEntry)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      prefix(['> 1%', 'last 2 versions'], {
        cascade: true,
      })
    )
    .pipe(rename(global.config.distCss))
    .pipe(gulp.dest('dist'))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename(global.config.distCssMin))
    .pipe(gulp.dest('dist'));
}

/**
 * Gulp task export
 *
 * @module sass
 */
module.exports = gulp.task('sass', _sass);
