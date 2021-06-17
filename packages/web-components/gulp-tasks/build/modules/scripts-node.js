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
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const stripComments = require('strip-comments');
const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');

const config = require('../../config');
const { harvestReactCustomElementTypeCandidates } = require('./tasks/harvest-react-custom-elements');

/**
 * Builds the scripts node modules
 *
 * @returns {Promise<*>} gulp stream
 */
async function scriptsNode() {
  const { dependencies } = await harvestReactCustomElementTypeCandidates();
  return (
    gulp
      .src(
        [
          ...dependencies,
          `${config.srcDir}/components/**/*-connect.ts`,
          `!${config.srcDir}/globals/internal/**/*.ts`,
          `!${config.srcDir}/globals/mixins/**/*.ts`,
          `!${config.srcDir}/globals/ibmdotcom-web-components-dotcom-shell.ts`,
          `!${config.srcDir}/**/*.scss`,
        ],
        { allowEmpty: true, base: config.srcDir }
      )
      .pipe(filter(file => /\/defs\.ts$/i.test(file.path) || /\/.*-connect\.ts$/i.test(file.path)))
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-modules'],
          // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
          plugins: [
            // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
            ['@babel/plugin-transform-runtime', { useESModules: false, version: '7.8.0' }],
            babelPluginResourceCJSPaths,
            '@babel/plugin-transform-modules-commonjs',
          ],
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter(file => stripComments(file.contents.toString()).replace(/\s/g, '')))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.cjsDestDir))
  );
}

gulp.task('build:modules:scripts-node', scriptsNode);
