/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
// This can be changed to `dart-sass` once Carbon V11 is used require('sass')
const sass = require('gulp-sass')(require('node-sass'));
const config = require('../config');

/**
 * Builds the sass file for the plex font / carbon reset
 *
 * @returns {*} gulp stream
 */
function _buildPlex() {
  return gulp
    .src([`${config.srcDir}/globals/scss/plex.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for the carbon grid
 *
 * @returns {*} gulp stream
 */
function _buildGrid() {
  return gulp
    .src([`${config.srcDir}/globals/scss/grid.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for the theme zone classes
 *
 * @returns {*} gulp stream
 */
function _buildThemes() {
  return gulp
    .src([`${config.srcDir}/globals/scss/themes.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for scroll animation
 *
 * @returns {*} gulp stream
 */
function _buildScroll() {
  return gulp
    .src([`${config.srcDir}/components/scroll-animations/scroll-animations-cdn.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(rename('scroll-animations.css'))
    .pipe(gulp.dest(config.bundleDestDir));
}

/**
 * Builds the sass file for table of contents
 *
 * @returns {*} gulp stream
 */
function _buildTOC() {
  return gulp
    .src([`${config.srcDir}/components/table-of-contents/table-of-contents-cdn.scss`])
    .pipe(
      sass({
        includePaths: ['node_modules', '../../node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(rename('table-of-contents.css'))
    .pipe(gulp.dest(config.bundleDestDir));
}

gulp.task('build:sass:cdn:plex', _buildPlex);
gulp.task('build:sass:cdn:grid', _buildGrid);
gulp.task('build:sass:cdn:themes', _buildThemes);
gulp.task('build:sass:cdn:scroll', _buildScroll);
gulp.task('build:sass:cdn:toc', _buildTOC);
gulp.task(
  'build:sass:cdn',
  gulp.parallel(
    'build:sass:cdn:plex',
    'build:sass:cdn:grid',
    'build:sass:cdn:themes',
    'build:sass:cdn:scroll',
    'build:sass:cdn:toc'
  )
);
