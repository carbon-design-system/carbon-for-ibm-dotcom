/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  setupFiles: ['<rootDir>/../../../config/jest/setup.js'],
  testMatch: ['<rootDir>/**/bundle-size.test.js?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/../../../config/jest/jsTransform.js',
    '^.+\\.s?css$': '<rootDir>/../../../config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)':
      '<rootDir>/../../../config/jest/fileTransform.js',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/config/',
    '/lib/',
    '/es/',
    '/cjs/',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!(carbon-icons)).+\\.(js|jsx)$',
  ],
  moduleFileExtensions: ['js', 'json'],
};
