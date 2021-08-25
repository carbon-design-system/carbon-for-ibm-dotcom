/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  extends: ['../eslint-config-ibmdotcom'],
  overrides: [
    {
      files: [
        'src/components/carbon-components-react/**/*.js',
        'src/internal/keyboard/**/*.js',
        'src/prop-types/**/*.js',
      ],
      rules: {
        'sort-imports': 0,
        'jsdoc/require-param-description': 0,
        'react/prop-types': 0,
      },
    },
    {
      files: ['tests/**/*.js'],
      globals: {
        describe: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        aChecker: true,
      },
      rules: {
        'no-new': 0,
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
    {
      files: ['tests/e2e/cypress/**/*.js'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['tests/e2e/**/*.e2e.js', 'tests/e2e/**/*.cdn.e2e.js'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
