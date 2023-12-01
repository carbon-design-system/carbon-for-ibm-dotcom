/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const Table = require('cli-table');
const gzip = require('gzip-size');
const path = require('path');

const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const builtins = require('rollup-plugin-node-builtins');
const babel = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');
const sizes = require('rollup-plugin-sizes');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const litSCSS = require('../../web-components/tools/rollup-plugin-lit-scss');
const fixHostPseudo = require('../../web-components/tools/postcss-fix-host-pseudo');

const packageJson = require('../package.json');

const env = process.env.NODE_ENV || 'development';
const prodSettings =
  env === 'development'
    ? []
    : [
        terser(),
        sizes({
          report(details) {
            const table = new Table({
              head: [
                chalk.gray.yellow('Dependency/app'),
                chalk.gray.yellow('Size'),
              ],
              colAligns: ['left', 'right'],
            });
            details.totals
              .map((item) => [chalk.white.bold(item.name), item.size])
              .forEach((item) => {
                table.push(item);
              });
            console.log(`Sizes of app/dependencies:\n${table}`); // eslint-disable-line no-console
            console.log('Total size:', details.total); // eslint-disable-line no-console
          },
        }),
        {
          generateBundle(options, bundle) {
            const gzipSize = gzip.sync(
              bundle['ibmdotcom-utilities.min.js'].code
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

const postCSSPlugins = [
  fixHostPseudo(),
  autoprefixer({
    overrideBrowsersList: [
      '> 0.5%',
      'last 2 versions',
      'Firefox ESR',
      'not dead',
    ],
  }),
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
      babelHelpers: 'bundled',
      exclude: ['node_modules/**'], // only transpile our source code
    }),
    litSCSS({
      includePaths: [path.resolve(__dirname, '../../../node_modules')],
      async preprocessor(contents, id) {
        return (await postcss(postCSSPlugins).process(contents, { from: id }))
          .css;
      },
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
    name: 'IBMDotcomUtilities',
    format: 'umd',
    globals: {},
  },
};
