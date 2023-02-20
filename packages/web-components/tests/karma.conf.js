/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* eslint-disable global-require */

const path = require('path');
const sass = require('node-sass');
const webpack = require('webpack');

function normalizeBrowser(browser) {
  return (
    {
      chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
      firefox: 'Firefox',
      safari: 'Safari',
      ie: 'IE',
    }[browser.toLowerCase()] || browser
  );
}

const serviceMocks = {
  '@carbon/ibmdotcom-services/es/services/Locale/Locale': path.resolve(
    __dirname,
    'mocks/LocaleAPI'
  ),
  '@carbon/ibmdotcom-services/es/services/Translation/Translation':
    path.resolve(__dirname, 'mocks/TranslationAPI'),
  '@carbon/ibmdotcom-services/es/services/KalturaPlayer/KalturaPlayer':
    path.resolve(__dirname, 'mocks/KalturaPlayerAPI'),
};

const reServices = /^@carbon\/ibmdotcom-services/i;

module.exports = function setupKarma(config) {
  const {
    browsers,
    collectCoverage,
    noPruneShapshot,
    specs,
    random,
    updateSnapshot,
    verbose,
  } = config.customConfig;

  config.set({
    basePath: '..',

    browsers: (browsers.length > 0 ? browsers : ['ChromeHeadless']).map(
      normalizeBrowser
    ),

    frameworks: ['jasmine', 'snapshot'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    files: [
      'src/polyfills/index.ts',
      'tests/utils/snapshot.js',
      'tests/snapshots/**/*.md',
    ].concat(specs.length > 0 ? specs : ['tests/karma-test-shim.js']),

    preprocessors: {
      'src/**/*.[jt]s': ['webpack', 'sourcemap'], // For generatoring coverage report for untested files
      'tests/karma-test-shim.js': ['webpack', 'sourcemap'],
      'tests/utils/**/*.js': ['webpack', 'sourcemap'],
      'tests/snapshots/**/*.md': ['snapshot'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        extensions: ['.js', '.ts'],
      },
      module: {
        rules: [
          {
            test: /@storybook[\\/]addon-/i,
            use: 'null-loader',
          },
          {
            test: /[\\/]styles[\\/]icons[\\/]/i,
            use: [require.resolve('../tools/svg-result-ibmdotcom-icon-loader')],
          },
          {
            test: /\.ts$/,
            use: [
              {
                // Build note: Locking down `@babel/plugin-transform-typescript` to `~7.6.0`
                // given `7.7` or later versions seems to have a problem with using decorator with fields without an initializer
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(__dirname, '..', '.babelrc'),
                },
              },
            ],
          },
          !collectCoverage
            ? {}
            : {
                test: /\.[jt]s$/,
                exclude: [
                  __dirname,
                  /__tests__/,
                  path.resolve(__dirname, '../node_modules'),
                ],
                enforce: 'post',
                use: {
                  loader: 'istanbul-instrumenter-loader',
                  options: {
                    esModules: true,
                  },
                },
              },
          {
            test: /\.js$/,
            include: [
              __dirname,
              path.dirname(require.resolve('lit-html')),
              path.dirname(require.resolve('lit-element')),
            ],
            use: {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '..', '.babelrc'),
              },
            },
          },
          {
            test: /\.scss$/,
            sideEffects: true,
            use: [
              require.resolve('../tools/css-result-loader'),
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      overrideBrowsersList: ['last 1 version', 'ie >= 11'],
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  implementation: sass,
                  webpackImporter: false,
                  sassOptions: {
                    includePaths: [
                      path.resolve(__dirname, '..', 'node_modules'),
                      path.resolve(__dirname, '../../..', 'node_modules'),
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.mdx$/,
            use: 'null-loader',
          },
          {
            test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader',
          },
        ],
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          'process.env.DDS_CLOUD_MASTHEAD': JSON.stringify('true'),
        }),
        new webpack.NormalModuleReplacementPlugin(reServices, (resource) => {
          const { request } = resource;
          resource.request = serviceMocks[request] || request;
        }),
      ],
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-snapshot'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ],

    reporters: ['spec', ...(!collectCoverage ? [] : ['coverage-istanbul'])],

    coverageIstanbulReporter: {
      reports: ['html', 'text'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose,
    },

    snapshot: {
      prune: !noPruneShapshot,
      update: updateSnapshot,
      pathResolver(basePath, suiteName) {
        return path.resolve(basePath, `tests/snapshots/${suiteName}.md`);
      },
    },

    port: 9876,

    colors: true,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    concurrency: Infinity,
  });
};
