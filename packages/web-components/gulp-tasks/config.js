/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const program = require('commander');

const collect = (v, a) => a.add(v);

program
  .option(
    '-b, --browser [browser]',
    'Browser to test with (ChromeHeadless or Chrome) for Karma testing',
    collect,
    new Set()
  )
  .option(
    '-d, --debug',
    'Disables collection of code coverage for Karma testing, useful for running debugger against specs or sources'
  )
  .option(
    '-k, --keepalive',
    'Keeps browser open after first run of Karma test finishes'
  )
  .option('-r, --random', 'Enable random execution order of tests')
  .option(
    '-s, --spec [file]',
    'Spec files to run for Karma testing',
    collect,
    new Set()
  )
  .option('--no-prune-snapshot', 'Avoid pruning unused snapshot')
  .option('--update-snapshot', 'Updates snapshot')
  .option('--verbose', 'Enables verbose output')
  .parse(process.argv);

const { browser: browsers, spec: specs, ...rest } = program.opts();

const cloptions = {
  browsers: (browsers && Array.from(browsers)) || [],
  specs: (specs && Array.from(specs)) || [],
  ...rest,
};

module.exports = {
  ENV_PRODUCTION: 'production',
  cloptions,
  srcDir: 'src',
  iconsDir: path.resolve(
    path.dirname(require.resolve('@carbon/ibmdotcom-styles/package.json')),
    'icons/svg'
  ),
  bundleDestDir: 'dist',
  cjsDestDir: 'lib',
  jsDestDir: 'es',
  sassDestDir: 'scss',
  tasksDir: 'gulp-tasks',
  testsDir: 'tests',
  vendorSrcDirBase: path.resolve(__dirname, '../src/internal/vendor'),
  carbonWebComponentsCJSSrcDir: path.resolve(
    __dirname,
    '../../carbon-web-components/lib'
  ),
  carbonWebComponentsESSrcDir: path.resolve(
    __dirname,
    '../../carbon-web-components/es'
  ),
  carbonWebComponentsVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/@carbon/web-components'
  ),
  carbonWebComponentsVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/@carbon/web-components'
  ),
  carbonWebComponentsVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/@carbon/web-components'
  ),
  servicesCJSSrcDir: path.resolve(__dirname, '../../services/lib'),
  servicesESSrcDir: path.resolve(__dirname, '../../services/es'),
  servicesVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/@carbon/ibmdotcom-services'
  ),
  servicesVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/@carbon/ibmdotcom-services'
  ),
  servicesVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/@carbon/ibmdotcom-services'
  ),
  servicesStoreCJSSrcDir: path.resolve(
    path.dirname(
      require.resolve('@carbon/ibmdotcom-services-store/package.json')
    ),
    'lib'
  ),
  servicesStoreESSrcDir: path.resolve(
    path.dirname(
      require.resolve('@carbon/ibmdotcom-services-store/package.json')
    ),
    'es'
  ),
  servicesStoreVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/@carbon/ibmdotcom-services-store'
  ),
  servicesStoreVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/@carbon/ibmdotcom-services-store'
  ),
  servicesStoreVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/@carbon/ibmdotcom-services-store'
  ),
  utilitiesCJSSrcDir: path.resolve(__dirname, '../../utilities/lib'),
  utilitiesESSrcDir: path.resolve(__dirname, '../../utilities/es'),
  utilitiesVendorSrcDir: path.resolve(
    __dirname,
    '../src/internal/vendor/@carbon/ibmdotcom-utilities'
  ),
  utilitiesVendorESDstDir: path.resolve(
    __dirname,
    '../es/internal/vendor/@carbon/ibmdotcom-utilities'
  ),
  utilitiesVendorCJSDstDir: path.resolve(
    __dirname,
    '../lib/internal/vendor/@carbon/ibmdotcom-utilities'
  ),
};
