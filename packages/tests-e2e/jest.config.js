/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['<rootDir>/**/__tests__/**/*.e2e.js'],
  testRunner: 'jest-circus/runner',
  testURL: 'http://localhost',
  testTimeout: 30000,
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['dotenv/config'],
};
