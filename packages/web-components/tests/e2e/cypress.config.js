/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'tests/e2e/cypress/fixtures',
  screenshotsFolder: 'tests/e2e/cypress/screenshots',
  videosFolder: 'tests/e2e/cypress/videos',
  fileServerFolder: 'tests/e2e/dist',
  includeShadowDom: true,
  screenshotOnRunFailure: false,
  video: false,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 90000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://0.0.0.0:8080',
    specPattern: 'tests/e2e/cypress/integration/**/*.e2e.js',
    supportFile: 'tests/e2e/cypress/support/index.js',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
