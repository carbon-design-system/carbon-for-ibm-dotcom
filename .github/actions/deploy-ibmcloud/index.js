/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, getInput, warning, setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');

const cfApp = getInput('cf-app');

(async () => {
  const manifestFile = getInput('cf-manifest');
  const packageToDeplay = getInput('package-to-deploy');
  await exec('ibmcloud', [
    'cf',
    'blue-green-deploy',
    cfApp,
    ...(!manifestFile ? [] : ['-f', manifestFile]),
    '--delete-old-apps',
  ], {
    cwd: `packages/${packageToDeplay}`,
    listeners: {
      stdout(data) {
        debug(data.toString().trim());
      },
      stderr(data) {
        warning(data.toString().trim());
      },
    }
  });
})().catch(error => {
  setFailed(`Deploying ${cfApp} to IBM Cloud failed: ${error.stack}`);
});
