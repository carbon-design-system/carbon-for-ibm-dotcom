/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const Table = require('cli-table');
const gzip = require('gzip-size');

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const builtins = require('rollup-plugin-node-builtins');
const babel = require('rollup-plugin-babel');
const scss = require('rollup-plugin-scss');
const replace = require('rollup-plugin-replace');
const json = require('rollup-plugin-json');
const { terser } = require('rollup-plugin-terser');
const sizes = require('rollup-plugin-sizes');
const visualizer = require('rollup-plugin-visualizer');

const packageJson = require('../package.json');
const peerDependencies = Object.keys(packageJson.peerDependencies || {}).concat(
  ['classnames', 'prop-types']
);

const env = process.env.NODE_ENV || 'development';
const prodSettings =
  env === 'development'
    ? []
    : [
        terser(),
        visualizer(),
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
              .map(item => [chalk.white.bold(item.name), item.size])
              .forEach(item => {
                table.push(item);
              });
            console.log(`Sizes of app/dependencies:\n${table}`); // eslint-disable-line no-console
            console.log('Total size:', details.total); // eslint-disable-line no-console
          },
        }),
        {
          generateBundle(options, bundle) {
            const gzipSize = gzip.sync(
              bundle['ibmdotcom-components-react.min.js'].code
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
    resolve({
      mainFields: ['jsnext', 'module', 'main'],
    }),
    commonjs({
      include: [/node_modules/, /icons-react\/lib/],
      sourceMap: true,
      namedExports: {
        'react/index.js': [
          'Children',
          'Component',
          'PureComponent',
          'Fragment',
          'PropTypes',
          'cloneElement',
          'createElement',
          'useCallback',
          'useEffect',
          'useState',
          'useReducer',
          'useRef',
        ],
        'react-dom/index.js': ['render'],
        'react-is/index.js': ['isForwardRef'],
      },
    }),
    babel({
      runtimeHelpers: true,
      exclude: ['node_modules/**'], // only transpile our source code
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    builtins(),
    scss(),
    json(),
    ...prodSettings,
  ],
  treeshake: {
    propertyReadSideEffects: false,
    pureExternalModules: true,
  },
  external: peerDependencies,
  output: {
    name: 'IBMDotcomReact',
    format: 'umd',
    globals: {
      classnames: 'classNames',
      'prop-types': 'PropTypes',
      react: 'React',
      'react-dom': 'ReactDOM',
      'carbon-icons': 'CarbonIcons',
      'carbon-components': 'CarbonComponents',
      'carbon-components-react': 'CarbonComponentsReact',
    },
  },
};
