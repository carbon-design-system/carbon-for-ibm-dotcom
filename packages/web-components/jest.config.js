/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  coverageReporters: ['text', 'html'],
  coverageDirectory: '<rootDir>/tests/coverage-jest',
  rootDir: '.',
  roots: ['src/globals/services-store'],
  testMatch: ['<rootDir>/**/__tests__/**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.[jt]s$': '<rootDir>/config/jest/jsTransform.js',
  },
};
