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
 * Stores the suffix to append depending on build mode
 *
 * @type {{development: string, production: string}}
 */
const modeSuffixes = {
  development: '',
  production: '.min',
};

/**
 * Stores the suffix to append for render direction setting
 *
 * @type {{ltr: string, rtl: string}}
 */
const dirSuffixes = {
  ltr: '',
  rtl: '.rtl',
};

/**
 * Builds a Rollup bundle.
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=ltr] The UI direction.
 * @private
 */
async function _buildBundle({ mode = 'development', dir = 'ltr' } = {}) {
  const conf = getRollupConfig({ mode, dir });
  const bundle = await rollup(conf);
  await bundle.write({
    format: 'es',
    // name: 'IBMDotcomWebComponentsDotcomShell',
    dir: config.bundleDestDir,
    // file: `${config.bundleDestDir}/ibmdotcom-web-components-dotcom-shell${dirSuffixes[dir]}${modeSuffixes[mode]}.js`,
    // FIXME: Figure out how to handle `process.env` without build toolstack
    banner: 'let process = { env: {} };',
  });
}

/**
 * Scripts to run for the gulp tasks
 *
 * @type {{ltr: object, rtl: object}}
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
  rtl: {
    dev() {
      return _buildBundle({ dir: 'rtl' });
    },
    prod() {
      return _buildBundle({ mode: 'production', dir: 'rtl' });
    },
  },
};

// Gulp tasks (LTR)
gulp.task('build:dist:ltr:dev', _scripts.ltr.dev);
gulp.task('build:dist:ltr:prod', _scripts.ltr.prod);
gulp.task('build:dist:ltr', gulp.parallel(gulp.task('build:dist:ltr:dev'), gulp.task('build:dist:ltr:prod')));

// Gulp tasks (RTL)
gulp.task('build:dist:rtl:dev', _scripts.rtl.dev);
gulp.task('build:dist:rtl:prod', _scripts.rtl.prod);
gulp.task('build:dist:rtl', gulp.parallel(gulp.task('build:dist:rtl:dev'), gulp.task('build:dist:rtl:prod')));

// Gulp dist build task
gulp.task('build:dist', gulp.parallel(gulp.task('build:dist:ltr'), gulp.task('build:dist:rtl')));
