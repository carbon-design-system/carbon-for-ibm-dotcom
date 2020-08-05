/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const { promisify } = require('util');
const { getInput, setFailed } = require('@actions/core');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

(async () => {
  const envFile = getInput('env-file');
  const contents = {};
  try {
    (await readFile(envFile, 'utf8')).split('\n').map(item => item.split('=')).reduce((acc, [name, value]) => {
      contents[name] = value;
      return contents;
    }, contents);
  } catch (error) {}
  const env = Object.assign(contents, process.env);
  await writeFile(envFile, Object.keys(env).map(name => `${name}=${env[name]}`).join('\n'), 'utf8');
})().catch(error => {
  setFailed(`Error updating .env file: ${error.stack}`);
});
