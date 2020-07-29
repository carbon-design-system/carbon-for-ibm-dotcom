/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { setup: setupDevServer } = require('jest-dev-server');
const setup = require('jest-playwright-preset/setup');
const isPortReachable = require('is-port-reachable');

module.exports = async config => {
  if (!process.env.LAUNCH_TIMEOUT) {
    process.env.LAUNCH_TIMEOUT = 300000;
  }
  if (!process.env.PORT) {
    process.env.PORT = 9000;
  }
  await setup(config);
  const isOpenAlready = await isPortReachable(Number(process.env.PORT), {
    host: 'localhost',
  });
  if (!isOpenAlready) {
    await setupDevServer({
      // `NODE_ENV=test`/`BABEL_ENV=test` causes adverse effect to `babel-plugin-macros`
      command: `unset NODE_ENV && unset BABEL_ENV && yarn storybook --ci --port=${process.env.PORT}`,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: process.env.PORT,
    });
    await isPortReachable(Number(process.env.PORT), {
      host: 'localhost',
      timeout: Number(process.env.LAUNCH_TIMEOUT),
    });
  }
};
