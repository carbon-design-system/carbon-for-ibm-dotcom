/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { promisify } = require('util');
const { exec } = require('child-process-promise');
const { setup } = require('jest-environment-puppeteer');
const { mkdir, track } = require('temp');

const packs = {
  react: path.resolve(__dirname, '../../..'),
  services: path.resolve(__dirname, '../../../../services'),
  styles: path.resolve(__dirname, '../../../../styles'),
  utilities: path.resolve(__dirname, '../../../../utilities'),
};

const projectRoot = path.resolve(__dirname, '../../../../..');

/**
 * Puts the build artifacts in the given temporary directory
 * and resolves dependencies in `package.json` to use such build artifacts.
 *
 * @param {string} tmpDir The temporary directory.
 */
async function setupPackages(tmpDir) {
  const commands = Object.keys(packs).reduce((commands, pack) => {
    commands.push(
      `cd ${packs[pack]} && yarn pack --filename ${tmpDir}/carbon-ibmdotcom-${pack}.tar.gz`,
      `tar xzf ${tmpDir}/carbon-ibmdotcom-${pack}.tar.gz --directory ${tmpDir}`,
      `mv ${tmpDir}/package ${tmpDir}/ibmdotcom-${pack}`,
      `node ${projectRoot}/tasks/replace-dependencies.js ${tmpDir}/ibmdotcom-${pack}/package.json`,
    );
    return commands;
  }, []);
  for (const command of commands) {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.error(stderr);
  }
}

module.exports = async config => {
  if (!process.env.LAUNCH_TIMEOUT) {
    process.env.LAUNCH_TIMEOUT = 600000;
  }
  if (!process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT) {
    process.env.DDS_BUILD_INTEGRATION_TEST_NAVIGATION_TIMEOUT = 30000;
  }
  const tmpDir = await promisify(mkdir)('dds-');
  process.env.DDS_EXAMPLE_TMPDIR = tmpDir;
  track();
  await setup(config);
  await setupPackages(tmpDir);
};
