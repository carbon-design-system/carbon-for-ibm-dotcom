/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs-extra');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');
const exec = require('../exec');
const replaceDependencies = require('../replace-dependencies');

const PORT = 3001;

describe('React SSR example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/react-ssr');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await fs.copy(src, `${tmpDir}/react-ssr`);
    await replaceDependencies([`${tmpDir}/react-ssr/package.json`]);
    await exec('yarn', ['install'], { cwd: `${tmpDir}/react-ssr` });
    await setupDevServer({
      command: `cd ${tmpDir}/react-ssr && cross-env PORT=${PORT} yarn start`,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have dropdown interactive', async () => {
    await expect(page).toClick('cds-dropdown');
    await expect(page).toMatchElement('cds-dropdown[open]');
    await expect(page).toClick('cds-dropdown');
    await expect(page).toMatchElement('cds-dropdown:not([open])');
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
