/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  fixturesFolder: 'tests/cdn-build/cypress/fixtures',
  screenshotsFolder: 'tests/cdn-build/cypress/screenshots',
  videosFolder: 'tests/cdn-build/cypress/videos',
  fileServerFolder: 'test/cdn-build/app',
  includeShadowDom: true,
  pageLoadTimeout: 90000,
  defaultCommandTimeout: 90000,
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/cdn-build/cypress/integration/**/*.e2e.js',
    supportFile: 'tests/cdn-build/cypress/support/index.js',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
