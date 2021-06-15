/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const babelPluginResourceJSPaths = require('../../../tools/babel-plugin-resource-js-paths');
const babelPluginResourceCJSPaths = require('../../../tools/babel-plugin-resource-cjs-paths');
const config = require('../../config');

const promisifyStream = promisify(asyncDone);

/**
 * Builds composite/container components that is implemented natively with React (instead of as wrappers).
 *
 * @param {object} [options] The build options.
 * @param {string} [options.targetEnv=browser] The target environment.
 */
function buildModulesReactComposite({ targetEnv = 'browser' } = {}) {
  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  const plugins = [
    ['@babel/plugin-transform-typescript', { isTSX: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-optional-chaining',
    // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
    ['@babel/plugin-transform-runtime', { useESModules: targetEnv === 'browser', version: '7.3.0' }],
  ];

  plugins.push(
    ...{
      browser: [babelPluginResourceJSPaths],
      // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
      node: [babelPluginResourceCJSPaths, '@babel/plugin-transform-modules-commonjs'],
    }[targetEnv]
  );

  return gulp
    .src([`${config.srcDir}/components-react/**/*.ts*`])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        babelrc: false,
        presets: ['@babel/preset-react', '@babel/preset-modules'],
        plugins,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destDir));
}

/**
 * Builds the react composite modules
 *
 * @returns {Promise<void>} Gulp stream
 */
async function reactComposite() {
  await Promise.all([
    promisifyStream(() => buildModulesReactComposite()),
    promisifyStream(() => buildModulesReactComposite({ targetEnv: 'node' })),
  ]);
}

gulp.task('build:modules:react-composite', reactComposite);
