/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  presets: ['@babel/preset-modules'],
  plugins: [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-modules-commonjs',
  ],
});
