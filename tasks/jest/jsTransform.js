/**
 * Copyright IBM Corp. 2018, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { createTransformer } = require('babel-jest');

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'macros',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    path.resolve(__dirname, '../babel-plugin-module-js-paths'),
  ],
};

module.exports = createTransformer(babelOptions);
