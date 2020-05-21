/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/{bundler,cli,components,sketch}/**',
    '!packages/**/{examples,stories}/**',
    '!**/*-story.js',
  ],
  moduleFileExtensions: ['js', 'json'],
  reporters: ['default', 'jest-junit'],
  setupFiles: ['./tasks/jest/setup.js'],
  setupFilesAfterEnv: ['./tasks/jest/setupafter.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.test.js?(x)',
    '<rootDir>/**/?(*.)(spec|test).js?(x)',
    '<rootDir>/**/?(*-)(spec|test).js?(x)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': './tasks/jest/jsTransform.js',
    '^.+\\.template\\.(js|jsx)$': './tasks/jest/jsTransform.js',
    '^.+\\.css$': './tasks/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': './tasks/jest/fileTransform.js',
  },
  testRunner: 'jest-circus/runner',
  testPathIgnorePatterns: [
    '/cjs/',
    '/dist/',
    '/es/',
    '/lib/',
    'e2e',
    'examples',
    '/umd/',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  watchPathIgnorePatterns: [
    '/cjs/',
    '/dist/',
    '/es/',
    '/examples/',
    '/lib/',
    '/storybook/',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  testURL: 'http://localhost',
};
