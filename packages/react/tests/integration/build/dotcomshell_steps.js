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

describe('Dotcomshell example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/DotcomShell');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r '${src}' ${tmpDir}`,
        `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/DotcomShell/package.json`,
        `cd ${tmpDir}/DotcomShell`,
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
    await page.setDefaultNavigationTimeout(Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT));
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should have search box styled correctly', async () => {
    await page.waitForSelector('[data-autoid="dds--masthead-eco__l0-search"]', { timeout: Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT), visible: true });
    const search = await page.$('[data-autoid="dds--masthead-eco__l0-search"]');
    const searchbox = await search.boundingBox();
    expect(searchbox.height).toBe(48);
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
