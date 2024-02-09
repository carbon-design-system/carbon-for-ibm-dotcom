/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const { rollup } = require('rollup');
const getRollupConfig = require('../../tools/get-rollup-config');

const config = require('../config');

/**
 * Builds a Rollup bundle.
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=ltr] The UI direction.
 * @private
 */
async function _buildBundle({ mode = 'development' } = {}) {
  const conf = getRollupConfig({ mode });
  const bundle = await rollup(conf);
  await bundle.write({
    format: 'es',
    dir: config.bundleDestDir,
    // FIXME: Figure out how to handle `process.env` without build toolstack
    banner: 'let process = { env: {} };',
  });
}

/**
 * Scripts to run for the gulp tasks
 *
 * @type {{ltr: object}}
 * @private
 */
const _scripts = {
  ltr: {
    dev() {
      return _buildBundle();
    },
    prod() {
      return _buildBundle({ mode: 'production' });
    },
  },
};

// Gulp tasks
gulp.task('build:dist:ltr:dev', _scripts.ltr.dev);
gulp.task('build:dist:ltr:prod', _scripts.ltr.prod);
gulp.task('build:dist:ltr', gulp.parallel(gulp.task('build:dist:ltr:dev'), gulp.task('build:dist:ltr:prod')));

// Gulp dist build task
gulp.task('build:dist', gulp.parallel(gulp.task('build:dist:ltr')));
