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

const PORT = 9000;

describe('<dds-dotcom-shell> example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/dotcom-shell');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    const isOpenAlready = await isPortReachable(Number(process.env.PORT), { host: 'localhost' });
    if (!isOpenAlready) {
      await setupDevServer({
        command: [
          `cp -r '${src}' ${tmpDir}`,
          `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/dotcom-shell/package.json`,
          `cd ${tmpDir}/dotcom-shell`,
          `echo 'SASS_PATH=node_modules' > .env`,
          'mkdir src/data',
          `cp ${projectRoot}/packages/services/src/services/Locale/__tests__/data/response.json src/data/locale-list.json`,
          `cp ${projectRoot}/packages/services/src/services/Translation/__tests__/data/response.json src/data/translation.json`,
          `cat ${__dirname}/mock-entrypoint.js >> src/index.js`,
          'yarn install',
          'yarn add -D axios-mock-adapter',
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
    }
    await page.setDefaultNavigationTimeout(Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT));
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should populate the current language into the locale button', async () => {
    await page.waitForFunction(() => {
      const elem = document.querySelector('dds-locale-button');
      return elem.textContent && elem.textContent.trim();
    });
  });

  it('should have search box styled correctly', async () => {
    const search = await page.waitForSelector('dds-masthead-search', {
      timeout: Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT),
      visible: true,
    });
    const height = await page.evaluate(elem => {
      return elem.offsetHeight;
    }, search);
    expect(height).toBe(48);
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
