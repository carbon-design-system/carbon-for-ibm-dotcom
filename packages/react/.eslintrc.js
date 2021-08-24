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
      files: ['tests/e2e/cypress/**/*.js'],
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
