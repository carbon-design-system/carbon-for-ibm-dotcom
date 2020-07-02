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

describe('Footer example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/Footer');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r '${src}' ${tmpDir}`,
        `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/Footer/package.json`,
        `cd ${tmpDir}/Footer`,
        'yarn install',
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
