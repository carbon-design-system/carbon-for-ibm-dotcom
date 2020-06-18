/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');

const useStyleSourceMap = process.env.STORYBOOK_IBMDOTCOM_ELEMENTS_USE_STYLE_SOURCEMAP === 'true';
const useRtl = process.env.STORYBOOK_IBMDOTCOM_ELEMENTS_USE_RTL === 'true';

module.exports = ({ config, mode }) => {
  config.devtool = useStyleSourceMap ? 'source-map' : '';

  if (mode === 'PRODUCTION') {
    config.optimization = {
      ...config.optimization,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    };
  }

  // `carbon-custom-elements` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
  const htmlRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /polymer-webpack-loader/i.test(use.loader))
  );
  if (htmlRuleIndex >= 0) {
    config.module.rules.splice(htmlRuleIndex, 1);
  }

  // We use `CSSResult` instead of raw CSS
  const sassLoaderRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /sass-loader/i.test(use.loader))
  );
  if (sassLoaderRuleIndex >= 0) {
    config.module.rules.splice(sassLoaderRuleIndex, 1);
  }

  const fileLoaderRuleIndex = config.module.rules.findIndex(
    item =>
      (item.use && item.use.some && item.use.some(use => /file-loader/i.test(use.loader))) || /file-loader/i.test(item.loader)
  );
  if (fileLoaderRuleIndex >= 0) {
    config.module.rules.splice(fileLoaderRuleIndex, 1);
  }

  const babelLoaderRule = config.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
  );
  if (babelLoaderRule) {
    config.module.rules.unshift({
      use: babelLoaderRule.use,
      include: [path.dirname(require.resolve('lit-html')), path.dirname(require.resolve('lit-element'))],
    });
  }

  config.module.rules.push(
    {
      // We load Web Components polyfills by our own (See `src/polyfills/index.js`)
      test: /@webcomponents[\\/]webcomponentsjs[\\/]webcomponents-lite/i,
      use: 'null-loader',
    },
    {
      test: /@carbon[\\/]ibmdotcom-styles[\\/]icons[\\/]/i,
      use: [...babelLoaderRule.use, require.resolve('../tools/svg-result-ibmdotcom-icon-loader')],
    },
    {
      test: /-story\.[jt]s$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            parser: 'typescript',
            prettierConfig: {
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
    },
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-modules'],
            plugins: [
              [
                'babel-plugin-emotion',
                {
                  sourceMap: true,
                  autoLabel: true,
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
        require.resolve('../tools/css-result-loader'),
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('../tools/postcss-fix-host-pseudo')(),
              require('autoprefixer')({
                overrideBrowsersList: ['last 1 version', 'ie >= 11'],
              }),
              ...(useRtl ? [rtlcss] : []),
            ],
            sourceMap: useStyleSourceMap,
          },
        },
        {
          loader: 'fast-sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
            data: `
              $feature-flags: (
                enable-css-custom-properties: true,
              );
            `,
            sourceMap: useStyleSourceMap,
          },
        },
      ],
    }
  );

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      TRANSLATION_HOST: '',
      CORS_PROXY: '',
    })
  );

  config.resolve.extensions.push('.ts', '.d.ts');

  return config;
};
