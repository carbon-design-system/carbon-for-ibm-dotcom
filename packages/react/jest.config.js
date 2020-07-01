/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.js',
    'src/patterns/blocks/**/*.js',
    'src/patterns/sections/**/*.js',
    'src/internal/components/**/*.js',
    '!src/components/**/*.stories.js',
    '!src/patterns/blocks/**/*.stories.js',
    '!src/patterns/sections/**/*.stories.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  setupFiles: ['<rootDir>/config/jest/setup.js', 'raf/polyfill'],
  setupFilesAfterEnv: ['../../tasks/jest/setupafter.js'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.js?(x)',
    '<rootDir>/**/?(*-)(spec|test).js?(x)',
    '!<rootDir>/**/bundle-size.test.js',
  ],
  testRunner: 'jest-circus/runner',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/config/jest/jsTransform.js',
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/config/',
    '/lib/',
    '/es/',
    '/cjs/',
    '/gulp-tasks/',
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!(carbon-icons)).+\\.(js|jsx)$',
  ],
  moduleFileExtensions: ['js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
