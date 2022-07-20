/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  presets: ['./scripts/env', '@babel/preset-react'],
  plugins: [
    // 'dev-expression',
    'macros',
    // '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    'inline-react-svg',
    [
      '@babel/plugin-transform-runtime',
      {
        runtimeHelpers: true,
      },
    ],
  ],
};
