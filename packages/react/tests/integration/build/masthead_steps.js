/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');

const PORT = 1234;
const DEST_DIRS_STYLES = ['scss'];
const DEST_DIRS_REACT = ['es', 'lib', 'umd'];

describe('Basic example', () => {
  beforeAll(async () => {
    const stylesRoot = path.resolve(__dirname, '../../../../styles');
    const reactRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/masthead');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}`,
        `cd ${tmpDir}/masthead`,
        'yarn install',
        ...DEST_DIRS_STYLES.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-styles/${dir}`),
        ...DEST_DIRS_STYLES.map(dir => `cp -r ${stylesRoot}/${dir} node_modules/@carbon/ibmdotcom-styles`),
        ...DEST_DIRS_REACT.map(dir => `rm -Rf node_modules/@carbon/ibmdotcom-react/${dir}`),
        ...DEST_DIRS_REACT.map(dir => `cp -r ${reactRoot}/${dir} node_modules/@carbon/ibmdotcom-react`),
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
    const input = await expect(page).toMatchElement('.bx--masthead__search .bx--header__search--actions');
    const height = await page.evaluate(input => input.offsetHeight, input);
    expect(height).toBe(48);
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
