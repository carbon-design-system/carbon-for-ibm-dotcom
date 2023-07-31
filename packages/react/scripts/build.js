/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { execSync } = require('child_process');
const path = require('path');

const babelPath = path
  .resolve(__dirname, '../../../node_modules/.bin/babel')
  .replace(/ /g, '\\ ');
const rollupPath = path
  .resolve(__dirname, '../../../node_modules/.bin/rollup')
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

const ignoreGlobs = [
  '**/vendor/*',
  '**/__tests__/*',
  '**/*.test.js',
  '**/*.stories.js',
].join(',');

try {
  exec(`${babelPath} src --quiet -d es --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'es',
  });
  exec(`${babelPath} src --quiet -d lib --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'cjs',
  });
  exec(
    `${rollupPath} -c scripts/rollup.config.js -o umd/ibmdotcom-components-react.js`,
    {
      NODE_ENV: 'development',
    }
  );
  exec(
    `${rollupPath} -c scripts/rollup.config.js -o umd/ibmdotcom-components-react.min.js`,
    {
      NODE_ENV: 'production',
    }
  );
} catch (error) {
  console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
  process.exit(1);
}
