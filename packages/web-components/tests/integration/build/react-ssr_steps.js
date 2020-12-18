/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const isPortReachable = require('is-port-reachable');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');

const PORT = 9001;

describe('React SSR example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/usage/react-ssr');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    const isOpenAlready = await isPortReachable(Number(process.env.PORT), { host: 'localhost' });
    if (!isOpenAlready) {
      await setupDevServer({
        command: [
          `cp -r '${src}' ${tmpDir}`,
          `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/react-ssr/package.json`,
          `cd ${tmpDir}/react-ssr`,
          'yarn install',
          `cross-env PORT=${PORT} yarn start`,
        ].join(' && '),
        debug: true,
        launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
        port: PORT,
      });
    }
    await page.setDefaultNavigationTimeout(Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT));
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should handle paging', async () => {
    await page.waitForSelector('dds-card:nth-of-type(1)', {
      visible: true,
    });
    const nextButton = await page.evaluateHandle(() =>
      document.querySelector('dds-carousel').shadowRoot.querySelector('button[part="next-button"]')
    );
    await nextButton.click();
    await page.waitForSelector('dds-card:nth-of-type(1)', {
      visible: false,
    });
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
