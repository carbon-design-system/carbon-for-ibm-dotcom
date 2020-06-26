/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, getInput, warning, setFailed, setSecret } = require('@actions/core');
const { exec } = require('@actions/exec');

(async () => {
  const cloudAPIKey = getInput('cloud-api-key');
  setSecret(cloudAPIKey);
  await exec('ibmcloud', [
    'login',
    '-a',
    'https://cloud.ibm.com',
    '-u',
    'apikey',
    '-p',
    cloudAPIKey,
    '-o',
    'ibm-digital-design',
    '-s',
    'ibmdotcom-production',
    '-r',
    'us-east',
  ], {
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
  setFailed(`Error logging into IBM Cloud: ${error.stack}`);
});
