/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const commander = require('commander');

const collect = (v, a) => a.add(v);
const { browser: browsers, spec: specs, ...rest } = commander
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
const cloptions = { browsers: Array.from(browsers), specs: Array.from(specs), ...rest };

module.exports = {
  ENV_PRODUCTION: 'production',
  cloptions,
  srcDir: 'src',
  jsDestDir: 'es',
  sassDestDir: 'scss',
  tasksDir: 'gulp-tasks',
  testsDir: 'tests',
};
