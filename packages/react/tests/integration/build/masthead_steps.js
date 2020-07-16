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

describe('Masthead example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/Masthead');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r '${src}' ${tmpDir}`,
        `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/Masthead/package.json`,
        `cd ${tmpDir}/Masthead`,
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
    const input = await page.waitForSelector('.bx--masthead__search .bx--header__search--actions', { timeout: Number(process.env.NAVIGATION_TIMEOUT), visible: true });
    const height = await page.evaluate(input => input.offsetHeight, input);
    expect(height).toBe(48);
  }, Number(process.env.NAVIGATION_TIMEOUT));

  afterAll(async () => {
    await teardownDevServer();
  });
});
