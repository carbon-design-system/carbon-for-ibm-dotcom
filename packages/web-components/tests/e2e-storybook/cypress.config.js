/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'carbon-for-ibmdotcom-wc',
  fixturesFolder: 'tests/e2e-storybook/cypress/fixtures',
  screenshotsFolder: 'tests/e2e-storybook/cypress/screenshots',
  videosFolder: 'tests/e2e-storybook/cypress/videos',
  fileServerFolder: 'storybook-static',
  includeShadowDom: true,
  screenshotOnRunFailure: false,
  video: false,
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 4000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  numTestsKeptInMemory: 0,
  e2e: {
    baseUrl: 'http://localhost:8081',
    specPattern: 'tests/e2e-storybook/cypress/integration/**/*.e2e.js',
    supportFile: 'tests/e2e-storybook/cypress/support/index.js',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
