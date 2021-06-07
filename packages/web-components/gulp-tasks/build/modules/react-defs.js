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
const filter = require('gulp-filter');
const babel = require('gulp-babel');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const through2 = require('through2');
const replaceExtension = require('replace-ext');

const config = require('../../config');

const readFileAsync = promisify(fs.readFile);
const promisifyStream = promisify(asyncDone);
const { harvestReactCustomElementTypeCandidates } = require('./tasks/harvest-react-custom-elements');

/**
 * Builds enums for React.
 *
 * @param {object} options The build options.
 * @param {string} options.banner The banner content.
 * @param {string} [options.targetEnv=browser] The target environment.
 * @private
 */
async function _buildModulesReactDefs({ banner, targetEnv = 'browser' }) {
  const { dependencies } = await harvestReactCustomElementTypeCandidates();

  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  const componentDestDir = {
    browser: `${config.jsDestDir}/components`,
    node: `${config.cjsDestDir}/components`,
  }[targetEnv];

  let stream = gulp
    .src(
      [
        ...dependencies,
        `${config.srcDir}/components/**/*-connect.ts`,
        `!${config.srcDir}/globals/*.ts`,
        `!${config.srcDir}/globals/**/*.ts`,
        `!${config.srcDir}/**/*.scss`,
      ],
      { allowEmpty: true, base: `${config.srcDir}/components` }
    )
    .pipe(filter(file => /\/defs\.ts$/i.test(file.path) || /\/.*-connect\.ts$/i.test(file.path)))
    .pipe(
      through2.obj((file, enc, done) => {
        const importSource = replaceExtension(
          path.relative(
            path.dirname(path.resolve(__dirname, '..', destDir, file.relative)),
            path.resolve(__dirname, '..', componentDestDir, file.relative)
          ),
          '.js'
        );
        file.contents = Buffer.from(`export * from ${JSON.stringify(importSource)}`);
        file.path = replaceExtension(file.path, '.js');
        done(null, file);
      })
    );

  if (targetEnv === 'node') {
    stream = stream.pipe(
      babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    );
  }

  return stream
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(destDir));
}

/**
 * Builds the React defs
 *
 * @returns {Promise<void>} Gulp stream
 */
async function reactDefs() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../../../tasks/license.js'), 'utf8');
  await Promise.all([
    promisifyStream(() => _buildModulesReactDefs({ banner })),
    promisifyStream(() => _buildModulesReactDefs({ banner, targetEnv: 'node' })),
  ]);
}

gulp.task('build:modules:react-defs', reactDefs);
