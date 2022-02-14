/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('dotenv').config({ path: `${__dirname}/../../../../.env` });

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  config.env.DDS_CLOUD_MASTHEAD = process.env.DDS_CLOUD_MASTHEAD;
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    launchOptions.preferences.darkTheme = true;
    if (browser.name === 'chrome') {
      launchOptions.args.push('--disable-dev-shm-usage');
      return launchOptions;
    }
  });

  on('task', {
    log(message) {
      console.log(message);

      return null;
    },
    table(message) {
      console.table(message);

      return null;
    },
  });

  return config;
};
