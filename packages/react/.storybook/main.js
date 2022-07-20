/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');

const NODE_ENV = 'development';

/**
 * Flag to switch to use the miniextract plugin
 *
 * @type {boolean}
 */
const useExternalCss = process.env.STORYBOOK_USE_EXTERNAL_CSS === 'true';

/**
 * Determines if sourcemaps should be turned on or off
 *
 * @type {boolean}
 */
const useStyleSourceMap = process.env.STORYBOOK_SOURCEMAPS === 'true';

/**
 * Sets the document direction (https://developer.mozilla.org/en-US/docs/Web/API/Document/dir)
 *
 * @type {boolean}
 */
const useRtl = process.env.STORYBOOK_USE_RTL === 'true';

const styleLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: useStyleSourceMap,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        const autoPrefixer = require('autoprefixer')({
          overrideBrowserslist: ['last 1 version', 'ie >= 11'],
        });
        return !useRtl ? [autoPrefixer] : [autoPrefixer, rtlcss];
      },
      sourceMap: useStyleSourceMap,
    },
  },
];

module.exports = {
  stories: ['../src/**/*.stories.js', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-a11y',
    // '@storybook/addon-actions',
    // '@storybook/addon-docs',
    // '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@carbon/storybook-addon-theme/es/register',
    // path.resolve(__dirname, 'addon-knobs-args'),
  ],
  // core: {
  //   builder: 'webpack5',
  // },
  webpack: async (config, { configType }) => {
    config.devtool = configType === 'DEVELOPMENT' ? 'source-map' : '';
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: 1024 * 1024,
      },
      minimizer: [
        new TerserPlugin({
          sourceMap: useStyleSourceMap,
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    };

    config.module.rules.push({
      test: /.stories\.jsx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            prettierConfig: {
              parser: 'babylon',
              printWidth: 80,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            },
          },
        },
      ],
      enforce: 'pre',
    });

    const sassLoader = {
      loader: 'sass-loader',
      options: {
        includePaths: [
          path.resolve(__dirname, '..', 'node_modules'),
          path.resolve(__dirname, '../../../', 'node_modules'),
        ],
        data: `
          $feature-flags: (
            enable-css-custom-properties: true
          );
        `,
        sourceMap: useStyleSourceMap,
      },
    };

    const fastSassLoader = {
      loader: 'fast-sass-loader',
      options: {
        includePaths: [
          path.resolve(__dirname, '..', 'node_modules'),
          path.resolve(__dirname, '../../../', 'node_modules'),
        ],
        data: `
        $feature-flags: (
          enable-css-custom-properties: true
        );
      `,
      },
    };

    config.module.rules.push({
      test: /\.scss$/,
      sideEffects: true,
      use: [
        'cache-loader',
        {
          loader: useExternalCss ? MiniCssExtractPlugin.loader : 'style-loader',
        },
        ...styleLoaders,
        NODE_ENV === 'production' ? sassLoader : fastSassLoader,
      ],
    });

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        TRANSLATION_HOST: '',
        STORYBOOK_USE_RTL: false,
      }),
      new webpack.DefinePlugin({
        STORYBOOK_USE_RTL: useRtl,
      })
    );

    if (useExternalCss) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
        })
      );
    }

    config.resolve = {
      modules: ['node_modules'],
    };

    return config;
  },
};
