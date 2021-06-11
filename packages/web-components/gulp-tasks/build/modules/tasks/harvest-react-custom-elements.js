/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const babel = require('gulp-babel');
// eslint-disable-next-line max-len
const babelPluginScanCreateReactCustomElementTypeCandidates = require('../../../../tools/babel-plugin-scan-create-react-custom-element-type-candidates');

const config = require('../../../config');

const promisifyStream = promisify(asyncDone);

/**
 * @returns {object} Target files for building React wrappers.
 */
async function harvestReactCustomElementTypeCandidates() {
  const candidates = new Set();
  const dependencies = new Set();
  await promisifyStream(() =>
    gulp.src([`${config.srcDir}/components/**/*.ts`]).pipe(
      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
          '@babel/plugin-syntax-typescript',
          [babelPluginScanCreateReactCustomElementTypeCandidates, { candidates, dependencies }],
        ],
      })
    )
  );
  return {
    candidates: Array.from(candidates).map(candidate => (path.extname(candidate) ? candidate : `${candidate}.ts`)),
    dependencies: Array.from(dependencies).map(dependency => (path.extname(dependency) ? dependency : `${dependency}.ts`)),
  };
}

module.exports = {
  harvestReactCustomElementTypeCandidates,
};
