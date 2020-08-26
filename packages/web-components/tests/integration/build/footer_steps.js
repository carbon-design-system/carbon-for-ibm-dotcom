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

describe('<dds-footer> example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../../../..');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/components/footer');
    const tmpDir = process.env.DDS_EXAMPLE_TMPDIR;
    const isOpenAlready = await isPortReachable(Number(process.env.PORT), { host: 'localhost' });
    if (!isOpenAlready) {
      await setupDevServer({
        command: [
          `cp -r '${src}' ${tmpDir}`,
          `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/footer/package.json`,
          `cd ${tmpDir}/footer`,
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

  it('should launch and close the locale modal', async () => {
    const localeButton = await page.evaluateHandle(() =>
      document.querySelector('dds-locale-button').shadowRoot.querySelector('.bx--locale-btn')
    );
    await localeButton.click();
    await page.waitForSelector('dds-locale-modal', {
      timeout: Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT),
      visible: true,
    });
    const modalCloseButton = await page.evaluateHandle(() =>
      document
        .querySelector('dds-locale-modal')
        .shadowRoot.querySelector('dds-modal-close-button')
        .shadowRoot.querySelector('.bx--modal-close')
    );
    await modalCloseButton.click();
    await page.waitForSelector('dds-locale-modal', {
      timeout: Number(process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT),
      visible: false,
    });
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
