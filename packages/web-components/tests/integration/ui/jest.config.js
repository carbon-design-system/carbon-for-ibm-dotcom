/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

if (!process.env.DEBUG) {
  process.env.DEBUG = 'pw:browser*';
}
process.env.JEST_PLAYWRIGHT_CONFIG = `${__dirname}/jest-playwright.config.js`;

module.exports = {
  globalSetup: '<rootDir>/tests/integration/ui/setup',
  globalTeardown: '<rootDir>/tests/integration/ui/teardown',
  setupFilesAfterEnv: ['expect-playwright', '<rootDir>/tests/integration/ui/setup-env'],
  rootDir: '../../../',
  roots: ['<rootDir>/src/components'],
  testEnvironment: 'jest-playwright-preset',
  testRunner: 'jest-circus/runner',
  testRegex: '.*\\.steps\\.js$',
  transform: {
    '^.+\\.[jt]s$': '<rootDir>/config/jest/jsTransform.js',
  },
};
