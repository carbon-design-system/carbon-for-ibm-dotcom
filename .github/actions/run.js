/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { exec } = require('@actions/exec');

/**
 * Runs a simple command line.
 * @param {string} line The command line.
 * @param {object} options The options for `@actions/exec`.
 */
async function run(line, options) {
  const tokens = line.split(' ');
  const command = tokens.shift();
  return exec(command, tokens, options);
}

module.exports = run;
