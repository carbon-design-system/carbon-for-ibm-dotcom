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
const path = require('path');
const { Server } = require('karma');

const config = require('./config');

const { cloptions, testsDir } = config;
const { browsers, debug, specs, keepalive, noPruneSnapshot, random, updateSnapshot, verbose } = cloptions;

/**
 * Runs the unit tests
 *
 * @param {Function} done done callback
 */
function unit(done) {
  new Server(
    {
      configFile: path.resolve(__dirname, '..', testsDir, 'karma.conf.js'),
      singleRun: !keepalive,
      customConfig: {
        browsers, // We'll massage browser list in `karma.config.js`
        collectCoverage: !debug,
        noPruneSnapshot,
        specs,
        random,
        updateSnapshot,
        verbose,
      },
    },
    done
  ).start();
}

gulp.task('test:unit', unit);
gulp.task('test', gulp.task('test:unit'));

/**
 * Runs the a11y tests
 *
 * @param {Function} done done callback
 */
function a11y(done) {
  if (specs.length > 1) {
    throw new RangeError('test:a11y can take only one -s option, which is a regular expression of target stories.');
  }
  new Server(
    {
      configFile: path.resolve(__dirname, '..', testsDir, 'karma-accessibility-checker.conf.js'),
      singleRun: !keepalive,
      customConfig: {
        browsers, // We'll massage browser list in `karma.config.js`
        specs,
        verbose,
      },
    },
    done
  ).start();
}

gulp.task('test:a11y', a11y);
gulp.task('test', gulp.task('test:a11y'));
