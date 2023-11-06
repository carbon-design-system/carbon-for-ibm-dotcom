/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  presets: ['./scripts/env', '@babel/preset-react'],
  plugins: [
    'macros',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    '@babel/plugin-transform-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-optional-chaining',
    'inline-react-svg',
    [
      '@babel/plugin-transform-runtime',
      {
        runtimeHelpers: true,
      },
    ],
  ],
};
