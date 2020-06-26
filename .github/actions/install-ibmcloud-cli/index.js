/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { debug, info, setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');
const { downloadTool } = require('@actions/tool-cache');

(async () => {
  const execOptions = {
    listeners: {
      stdout(data) {
        debug(data.toString().trim());
      },
      stderr(data) {
        info(data.toString().trim());
      },
    }
  };
  const cliPath = await downloadTool('https://clis.cloud.ibm.com/install/linux');
  await exec('bash', [cliPath], execOptions);
  await exec('ibmcloud', ['cf', 'install'], execOptions);
  await exec('ibmcloud', ['cf', 'add-plugin-repo', 'CF-Community', 'https://plugins.cloudfoundry.org'], execOptions);
  await exec('ibmcloud', ['cf', 'install-plugin', 'blue-green-deploy', '-f', '-r', 'CF-Community'], execOptions);
})().catch(error => {
  setFailed(`Error installing IBM Cloud CLI: ${error.stack}`);
});
