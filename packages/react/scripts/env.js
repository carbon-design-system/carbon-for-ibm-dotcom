/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const BABEL_ENV = process.env.BABEL_ENV;

module.exports = () => ({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: BABEL_ENV === 'es' ? false : 'commonjs',
        targets: {
          browsers: ['extends browserslist-config-carbon'],
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ...(BABEL_ENV === 'es'
      ? [require('../../../tasks/babel-plugin-pure-annotate-react-prop-types')]
      : [require('../../../tasks/babel-plugin-module-js-paths')]),
  ],
});
