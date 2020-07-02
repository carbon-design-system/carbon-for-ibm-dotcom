/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, getInput, warning, setFailed, setSecret } = require('@actions/core');
const { exec } = require('@actions/exec');
const run = require('../run');

(async () => {
  const cloudAPIKey = getInput('cloud-api-key');
  setSecret(cloudAPIKey);
  const execOptions = {
    listeners: {
      stdout(data) {
        debug(data.toString().trim());
      },
      stderr(data) {
        warning(data.toString().trim());
      },
    }
  };
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
    'us-south',
  ], execOptions);
  await run('ibmcloud cf add-plugin-repo CF-Community https://plugins.cloudfoundry.org', execOptions);
  await run('ibmcloud cf install-plugin blue-green-deploy -f -r CF-Community', execOptions);
})().catch(error => {
  setFailed(`Error logging into IBM Cloud: ${error.stack}`);
});
