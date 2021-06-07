/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const { rollup } = require('rollup');
const getRollupConfig = require('../../tools/get-rollup-config');

const config = require('../config');

/**
 * Gets all of the folders and returns out
 *
 * @param {string} dir Directory to check
 * @returns {string[]} List of folders
 * @private
 */
function _getFolders(dir) {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

/**
 * Builds all of the rollup bundles for all components
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=ltr] The UI direction.
 */
async function _buildComponents({ mode = 'development', dir = 'ltr' } = {}) {
  let folders = _getFolders(`${config.srcDir}/components`);

  folders = folders.filter(item => {
    return item !== 'layout';
  });

  const configs = [];

  folders.forEach(folder => {
    configs.push(getRollupConfig({ mode, dir, folder }));
  });

  await Promise.all(
    configs.map(async conf => {
      await rollup(conf);
    }),
  );
}

/**
 * Defined scripts to return as gulp tasks
 *
 * @type {{ltr: object, rtl: object}}
 * @private
 */
const _scripts = {
  ltr: {
    dev() {
      return _buildComponents();
    },
    prod() {
      return _buildComponents({ mode: 'production' });
    },
  },
  rtl: {
    dev() {
      return _buildComponents({ dir: 'rtl' });
    },
    prod() {
      return _buildComponents({ mode: 'production', dir: 'rtl' });
    },
  },
};

// Gulp tasks (LTR)
gulp.task('build:components:ltr:dev', _scripts.ltr.dev);
gulp.task('build:components:ltr:prod', _scripts.ltr.prod);
gulp.task('build:components:ltr', gulp.parallel(gulp.task('build:components:ltr:dev'), gulp.task('build:components:ltr:prod')));

// Gulp tasks (RTL)
gulp.task('build:components:rtl:dev', _scripts.rtl.dev);
gulp.task('build:components:rtl:prod', _scripts.rtl.prod);
gulp.task('build:components:rtl', gulp.parallel(gulp.task('build:components:rtl:dev'), gulp.task('build:components:rtl:prod')));

// Build all components
gulp.task(
  'build:components',
  gulp.series(gulp.task('vendor'), gulp.parallel(gulp.task('build:components:ltr'), gulp.task('build:components:rtl')))
);
