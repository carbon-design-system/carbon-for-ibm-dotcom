/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { promisify } = require('util');
const { setup } = require('jest-environment-puppeteer');
const { mkdir, track } = require('temp');

module.exports = async config => {
  if (!process.env.LAUNCH_TIMEOUT) {
    process.env.LAUNCH_TIMEOUT = 600000;
  }
  if (!process.env.NAVIGATION_TIMEOUT) {
    process.env.NAVIGATION_TIMEOUT = 30000;
  }
  process.env.DDS_EXAMPLE_TMPDIR = await promisify(mkdir)('dds-');
  track();
  await setup(config);
};
