/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const sass = require('node-sass');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');
const deepReplace = require('../../../tasks/deep-replace');
const { getPaths } = deepReplace;

const useStyleSourceMap = process.env.STORYBOOK_USE_STYLE_SOURCEMAP === 'true';
const useRtl = process.env.STORYBOOK_USE_RTL === 'true';

module.exports = {
  stories: ['../docs/*.mdx', '../src/**/*.stories.ts', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@carbon/storybook-addon-theme/es/register',
    path.resolve(__dirname, 'addon-knobs-args'),
  ],
  framework: '@storybook/web-components',
  managerWebpack(config) {
    // `@storybook/react` NPM installation seems to add `@babel/preset-react` automatically
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        IBMDOTCOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent) => key === 'options' && /babel-loader/i.test(parent.loader),
      value => ({
        ...value,
        babelrc: false,
        configFile: false,
      })
    );
    return config;
  },
  webpackFinal(config, mode) {
    config.devtool = useStyleSourceMap ? 'source-map' : '';

    if (mode === 'PRODUCTION') {
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
    }

    // Uses our own option for `@babel/preset-env`
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.presets' && Array.isArray(value) && /@babel\/preset-env/i.test(value[0]),
      value => [
        value[0],
        {
          modules: false,
          targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
        },
      ]
    );
    // Uses `@babel/plugin-proposal-decorators` configuration in our `.babelrc`
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.plugins' &&
        Array.isArray(value) &&
        /@babel\/plugin-proposal-decorators/i.test(value[0]),
      () => deepReplace.DELETE
    );
    // Normalizes several plugins with `loose: false` option
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.plugins' && Array.isArray(value) && value[1] && value[1].loose,
      value => [
        value[0],
        {
          ...value[1],
          loose: false,
        },
      ]
    );

    // `@carbon/ibmdotcom-web-components` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
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
        test: /[\\/]styles[\\/]icons[\\/]/i,
        use: [...babelLoaderRule.use, require.resolve('../tools/svg-result-ibmdotcom-icon-loader')],
      },
      {
        test: /\.stories\.[jt]sx?$/,
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
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-modules'],
              plugins: [
                [
                  'babel-plugin-emotion',
                  {
                    sourceMap: useStyleSourceMap,
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
          'cache-loader',
          require.resolve('../tools/css-result-loader'),
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                const hostPseudo = require('../tools/postcss-fix-host-pseudo')();
                const autoPrefixer = require('autoprefixer')({
                  overrideBrowserslist: ['last 1 version', 'ie >= 11'],
                });
                return !useRtl ? [hostPseudo, autoPrefixer] : [rtlcss, hostPseudo, autoPrefixer];
              },
              sourceMap: useStyleSourceMap,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
              $feature-flags: (
                enable-css-custom-properties: true,
                grid-columns-16: true,
              );
            `,
              implementation: sass,
              sourceMap: useStyleSourceMap,
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
        test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader',
      }
    );

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        TRANSLATION_HOST: '',
      })
    );

    config.resolve.extensions.push('.ts', '.tsx', '.d.ts');

    return config;
  },
};
