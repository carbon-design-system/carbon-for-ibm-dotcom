/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  extends: ['eslint-config-carbon', 'plugin:lit/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 0,
        'jsdoc/check-tag-names': [
          'error',
          { definedTags: ['category', 'csspart', 'element', 'slot'] },
        ],
        'lit/no-native-attributes': 0,
      },
    },
    {
      files: ['**/*_steps.js', '**/*.steps.js', '**/tests/**'],
      globals: {
        aChecker: true,
        after: true,
        before: true,
        beforeAll: true,
        beforeEach: true,
        cy: true,
        describe: true,
        afterAll: true,
        afterEach: true,
        it: true,
        expect: true,
        page: true,
      },
    },
  ],
};
