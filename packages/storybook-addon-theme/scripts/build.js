/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const path = require('path');

if (inInstall()) {
  process.exit(0);
}

const babelPath = path
  .resolve(__dirname, '../node_modules/.bin/babel')
  .replace(/ /g, '\\ ');

/**
 * Executes the corresponding comment
 *
 * @param {string} command Command to run
 * @param {object} extraEnv Additional environment configurations
 * @returns {Buffer} Buffer stream
 */
const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

try {
  exec(`${babelPath} src --quiet -d es`, {
    BABEL_ENV: 'es',
  });
} catch (error) {
  console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
  process.exit(1);
}
