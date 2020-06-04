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
const DEST_DIRS_REACT = ['es', 'lib', 'umd'];
const DEST_DIRS_SERVICES = ['es', 'lib', 'umd'];
const DEST_DIRS_STYLES = ['scss'];
const DEST_DIRS_UTILITIES = ['es', 'lib', 'umd'];

describe('Footer example', () => {
  beforeAll(async () => {
    const reactRoot = path.resolve(__dirname, '../../..');
    const servicesRoot = path.resolve(__dirname, '../../../../services');
    const stylesRoot = path.resolve(__dirname, '../../../../styles');
    const utilitiesRoot = path.resolve(__dirname, '../../../../utilities');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/footer');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r '${src}' ${tmpDir}`,
        `cd ${tmpDir}/footer`,
        'yarn install',
        ...DEST_DIRS_REACT.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-react/${dir}`),
        ...DEST_DIRS_REACT.map(dir => `cp -r '${reactRoot}/${dir}' node_modules/@carbon/ibmdotcom-react`),
        ...DEST_DIRS_SERVICES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-services/${dir}`),
        ...DEST_DIRS_SERVICES.map(dir => `cp -r '${servicesRoot}/${dir}' node_modules/@carbon/ibmdotcom-services`),
        ...DEST_DIRS_STYLES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-styles/${dir}`),
        ...DEST_DIRS_STYLES.map(dir => `cp -r '${stylesRoot}/${dir}' node_modules/@carbon/ibmdotcom-styles`),
        ...DEST_DIRS_UTILITIES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-utilities/${dir}`),
        ...DEST_DIRS_UTILITIES.map(dir => `cp -r '${utilitiesRoot}/${dir}' node_modules/@carbon/ibmdotcom-utilities`),
        'yarn parcel build index.html',
        `cp -r dist ${tmpDir}`,
        `cd ${tmpDir}/dist`,
        `echo '{}' > package.json`,
        'yarn add -D http-server@^0.12.0',
        `yarn http-server -p ${PORT}`,
      ].join(' && '),
      debug: true,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.setDefaultNavigationTimeout(Number(process.env.NAVIGATION_TIMEOUT));
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should have search box styled correctly', async () => {
    const button = await page.waitForSelector('.bx--locale-btn', { timeout: Number(process.env.NAVIGATION_TIMEOUT), visible: true });
    const height = await page.evaluate(button => button.offsetHeight, button);
    expect(height).toBe(48);
  }, Number(process.env.NAVIGATION_TIMEOUT));

  afterAll(async () => {
    await teardownDevServer();
  });
});
