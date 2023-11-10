/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gzip = require('gzip-size');

const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const builtins = require('rollup-plugin-node-builtins');
const babel = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');

const packageJson = require('../package.json');

const env = process.env.NODE_ENV || 'development';
const prodSettings =
  env === 'development'
    ? []
    : [
        terser(),
        {
          generateBundle(options, bundle) {
            const gzipSize = gzip.sync(
              bundle['ibmdotcom-services.min.js'].code
            );
            const { bundleSizeThreshold } = packageJson;
            console.log('Total size (gzipped):', gzipSize); // eslint-disable-line no-console
            if (gzipSize > bundleSizeThreshold) {
              throw new RangeError(
                `Exceeded size threshold of ${bundleSizeThreshold} bytes (gzipped)!`
              );
            }
          },
        },
      ];

process.env.BABEL_ENV = 'es';

module.exports = {
  input: 'src/index.js',
  plugins: [
    nodeResolve({
      browser: true,
      mainFields: ['jsnext', 'module', 'main'],
    }),
    commonjs({
      include: [/node_modules/],
      sourceMap: true,
    }),
    babel.babel({
      babelHelpers: 'runtime',
      exclude: ['node_modules/**'], // only transpile our source code
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: true,
    }),
    builtins(),
    json(),
    ...prodSettings,
  ],
  output: {
    name: 'IBMDotcomServices',
    format: 'umd',
    globals: {},
  },
};
