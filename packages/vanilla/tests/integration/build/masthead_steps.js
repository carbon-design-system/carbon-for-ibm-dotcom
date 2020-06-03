/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');

const PORT = 9000;
const DEST_DIRS_SERVICES = ['es', 'lib', 'umd'];
const DEST_DIRS_STYLES = ['scss'];
const DEST_DIRS_UTILITIES = ['es', 'lib', 'umd'];
const DEST_DIRS_VANILLA = ['es', 'lib', 'umd'];

describe('Masthead example', () => {
  beforeAll(async () => {
    const servicesRoot = path.resolve(__dirname, '../../../../services');
    const stylesRoot = path.resolve(__dirname, '../../../../styles');
    const utilitiesRoot = path.resolve(__dirname, '../../../../utilities');
    const vanillaRoot = path.resolve(__dirname, '../../../../vanilla');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/masthead');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}`,
        `cd ${tmpDir}/masthead`,
        `echo 'CORS_PROXY=${process.env.CORS_PROXY}' > .env`,
        'yarn install',
        ...DEST_DIRS_SERVICES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-services/${dir}`),
        ...DEST_DIRS_SERVICES.map(dir => `cp -r ${servicesRoot}/${dir} node_modules/@carbon/ibmdotcom-services`),
        ...DEST_DIRS_STYLES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-styles/${dir}`),
        ...DEST_DIRS_STYLES.map(dir => `cp -r ${stylesRoot}/${dir} node_modules/@carbon/ibmdotcom-styles`),
        ...DEST_DIRS_UTILITIES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-utilities/${dir}`),
        ...DEST_DIRS_UTILITIES.map(dir => `cp -r ${utilitiesRoot}/${dir} node_modules/@carbon/ibmdotcom-utilities`),
        ...DEST_DIRS_VANILLA.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-vanilla/${dir}`),
        ...DEST_DIRS_VANILLA.map(dir => `cp -r ${vanillaRoot}/${dir} node_modules/@carbon/ibmdotcom-vanilla`),
        `yarn parcel --port ${PORT} index.html`,
      ].join(' && '),
      debug: true,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.setDefaultNavigationTimeout(Number(process.env.LAUNCH_TIMEOUT));
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should have search box styled correctly', async () => {
    const button = await expect(page).toMatchElement('.bx--masthead__search .bx--header__search--search', { timeout: Number(process.env.LAUNCH_TIMEOUT), visible: true });
    const height = await page.evaluate(button => button.offsetHeight, button);
    expect(height).toBe(48);
  }, Number(process.env.LAUNCH_TIMEOUT));

  afterAll(async () => {
    await teardownDevServer();
  });
});
