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
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const babelPluginCreateReactCustomElementTypeDef = require('../../../tools/babel-plugin-create-react-custom-element-type-def');

const config = require('../../config');

const readFileAsync = promisify(fs.readFile);
const promisifyStream = promisify(asyncDone);
const { harvestReactCustomElementTypeCandidates } = require('./tasks/harvest-react-custom-elements');

/**
 * Builds the React types
 *
 * @returns {Promise<void>} Gulp stream
 */
async function reactTypes() {
  const [banner, harvested] = await Promise.all([
    readFileAsync(path.resolve(__dirname, '../../../../../tasks/license.js'), 'utf8'),
    harvestReactCustomElementTypeCandidates(),
  ]);
  const { candidates } = harvested;
  await promisifyStream(() =>
    gulp
      .src(candidates, { base: `${config.srcDir}/components` })
      .pipe(
        babel({
          babelrc: false,
          plugins: [
            ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
            '@babel/plugin-syntax-typescript',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
            babelPluginCreateReactCustomElementTypeDef,
          ],
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(
        rename(pathObj => {
          pathObj.extname = '.d.ts';
        })
      )
      .pipe(gulp.dest(`${config.jsDestDir}/components-react`))
  );
}

gulp.task('build:modules:react-types', reactTypes);
