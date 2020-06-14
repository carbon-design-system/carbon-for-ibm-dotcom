/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const commander = require('commander');

/**
 * @param {*} v The value.
 * @param {*[]} a The accumulator.
 * @returns {*[]} The accumulator with the given value added.
 */
const collect = (v, a) => a.add(v);

const { browser: browsers, spec: specs, ...rest } = commander
  .option(
    '-b, --browser [browser]',
    'Browser to test with (ChromeHeadless or Chrome) for Karma testing',
    collect,
    new Set()
  )
  .option(
    '-d, --debug',
    'Disables collection of code coverage for Karma testing, useful for runinng debugger against specs or sources'
  )
  .option(
    '-k, --keepalive',
    'Keeps browser open after first run of Karma test finishes'
  )
  .option(
    '-s, --spec [file]',
    'Spec files to run for Karma testing',
    collect,
    new Set()
  )
  .option('--verbose', 'Enables verbose output')
  .parse(process.argv);
const cloptions = {
  browsers: Array.from(browsers),
  specs: Array.from(specs),
  ...rest,
};

module.exports = {
  cloptions,
  srcDir: 'src',
  iconsDir: path.dirname(require.resolve('@carbon/icons/lib')),
  testsDir: 'tests',
  tasksDir: 'gulp-tasks',
  carbonComponetsReactESSrcDir: path.resolve(
    path.dirname(require.resolve('carbon-components-react/package.json')),
    'es'
  ),
  carbonComponetsReactCJSSrcDir: path.resolve(
    path.dirname(require.resolve('carbon-components-react/package.json')),
    'lib'
  ),
  carbonComponetsReactVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/carbon-components-react'
  ),
  carbonComponetsReactVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/carbon-components-react'
  ),
  carbonComponetsReactVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/carbon-components-react'
  ),
};
