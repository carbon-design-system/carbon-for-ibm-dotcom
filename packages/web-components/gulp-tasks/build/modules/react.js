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
const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const babel = require('gulp-babel');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const babelPluginCreateReactCustomElementType = require('../../../tools/babel-plugin-create-react-custom-element-type');
const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');

const config = require('../../config');

const readFileAsync = promisify(fs.readFile);
const promisifyStream = promisify(asyncDone);
const { harvestReactCustomElementTypeCandidates } = require('./tasks/harvest-react-custom-elements');

/**
 * Builds React modules.
 *
 * @param {object} options The build options.
 * @param {string} options.banner The banner content.
 * @param {string} [options.targetEnv=browser] The target environment.
 * @private
 */
async function _buildModulesReact({ banner, targetEnv = 'browser' }) {
  const { candidates } = await harvestReactCustomElementTypeCandidates();
  let stream = gulp.src(candidates, { base: `${config.srcDir}/components` }).pipe(
    babel({
      babelrc: false,
      plugins: [
        ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
        '@babel/plugin-syntax-typescript',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        [babelPluginCreateReactCustomElementType, { nonUpgradable: targetEnv === 'node' }],
      ],
    })
  );

  if (targetEnv === 'node') {
    stream = stream.pipe(
      babel({
        babelrc: false,
        // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
        plugins: [babelPluginResourceCJSPaths, '@babel/plugin-transform-modules-commonjs'],
      })
    );
  }

  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  return stream
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(destDir));
}

/**
 * Builds the react modules
 *
 * @returns {Promise<void>} Gulp stream
 */
async function react() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../../../tasks/license.js'), 'utf8');
  await Promise.all([
    promisifyStream(() => _buildModulesReact({ banner })),
    promisifyStream(() => _buildModulesReact({ banner, targetEnv: 'node' })),
  ]);
}

gulp.task('build:modules:react', react);
