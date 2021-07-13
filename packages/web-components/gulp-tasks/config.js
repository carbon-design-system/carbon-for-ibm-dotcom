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
const program = require('commander');

const collect = (v, a) => a.add(v);

program
  .option('-b, --browser [browser]', 'Browser to test with (ChromeHeadless or Chrome) for Karma testing', collect, new Set())
  .option(
    '-d, --debug',
    'Disables collection of code coverage for Karma testing, useful for runinng debugger against specs or sources'
  )
  .option('-k, --keepalive', 'Keeps browser open after first run of Karma test finishes')
  .option('-r, --random', 'Enable random execution order of tests')
  .option('-s, --spec [file]', 'Spec files to run for Karma testing', collect, new Set())
  .option('--no-prune-snapshot', 'Avoid pruning unused snapshot')
  .option('--update-snapshot', 'Updates snapshot')
  .option('--verbose', 'Enables verbose output')
  .parse(process.argv);

const cloptions = { browsers: [], specs: [], ...program.opts() };

module.exports = {
  ENV_PRODUCTION: 'production',
  cloptions,
  srcDir: 'src',
  iconsDir: path.resolve(path.dirname(require.resolve('@carbon/ibmdotcom-styles/package.json')), 'icons/svg'),
  bundleDestDir: 'dist',
  cjsDestDir: 'lib',
  jsDestDir: 'es',
  sassDestDir: 'scss',
  tasksDir: 'gulp-tasks',
  testsDir: 'tests',
  servicesStoreCJSSrcDir: path.resolve(path.dirname(require.resolve('@carbon/ibmdotcom-services-store/package.json')), 'lib'),
  servicesStoreESSrcDir: path.resolve(path.dirname(require.resolve('@carbon/ibmdotcom-services-store/package.json')), 'es'),
  servicesStoreVendorSrcDir: path.resolve(__dirname, '../src/internal/vendor/@carbon/ibmdotcom-services-store'),
  servicesStoreVendorESDstDir: path.resolve(__dirname, '../es/internal/vendor/@carbon/ibmdotcom-services-store'),
  servicesStoreVendorCJSDstDir: path.resolve(__dirname, '../lib/internal/vendor/@carbon/ibmdotcom-services-store'),
};
