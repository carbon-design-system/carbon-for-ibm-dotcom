/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint-disable global-require */

const path = require('path');

module.exports = function setupKarmaIBMa(config) {
  const { browsers, random, specs, useExperimentalFeatures, verbose } =
    config.customConfig;

  config.set({
    basePath: '..',

    browsers: browsers.length > 0 ? browsers : ['ChromeHeadless'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    frameworks: ['jasmine', 'aChecker'],

    files: [
      'tests/utils/achecker-compliance.js',
      'tests/a11y/karma-setup-context.js',
      'tests/a11y/karma-test-shim.js',
    ],

    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'tests/a11y/**/*.js': ['webpack', 'sourcemap'],
      'tests/utils/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      module: {
        rules: [
          {
            test: /@storybook[\\/]addon-/i,
            use: 'null-loader',
          },
          {
            test: /\.mdx$/,
            use: 'null-loader',
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.js$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  configFile: false,
                  presets: [
                    '@babel/preset-react',
                    [
                      '@babel/preset-env',
                      {
                        modules: false,
                        targets: {
                          browsers: [
                            'last 1 version',
                            'Firefox ESR',
                            'not opera > 0',
                            'not op_mini > 0',
                            'not op_mob > 0',
                            'not android > 0',
                            'not edge > 0',
                            'not ie > 0',
                            'not ie_mob > 0',
                          ],
                        },
                      },
                    ],
                  ],
                  plugins: [
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                    '@babel/plugin-proposal-optional-chaining',
                    [
                      'babel-plugin-transform-define',
                      {
                        'process.env.AAT_STORIES_REGEXP':
                          specs.length > 0
                            ? new RegExp(specs[0])
                            : /\.stories\.js$/,
                        'process.env.AAT_VERBOSE': !!verbose,
                      },
                    ],
                  ],
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            sideEffects: true,
            use: [
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      browsers: [
                        'last 1 version',
                        'Firefox ESR',
                        'not opera > 0',
                        'not op_mini > 0',
                        'not op_mob > 0',
                        'not android > 0',
                        'not edge > 0',
                        'not ie > 0',
                        'not ie_mob > 0',
                      ],
                    }),
                  ],
                },
              },
              {
                loader: 'fast-sass-loader',
                options: {
                  includePaths: [
                    path.resolve(__dirname, '../node_modules'),
                    path.resolve(__dirname, '../../../node_modules'),
                  ],
                  data: `
                    $feature-flags: (
                      grid: ${useExperimentalFeatures},
                      ui-shell: true,
                    );
                  `,
                },
              },
            ],
          },
          {
            test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
            loader: 'file-loader',
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    plugins: [
      require('karma-accessibility-checker'),
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
    ],

    reporters: ['spec', 'aChecker'],

    port: 9000,

    colors: true,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browserNoActivityTimeout: 60000,

    concurrency: Infinity,
  });
};
