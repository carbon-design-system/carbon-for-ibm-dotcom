/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');

/**
 * Flag to switch to use the miniextract plugin
 *
 * @type {boolean}
 */
const useExternalCss =
  process.env.CARBON_EXPRESSIVE_STORYBOOK_USE_EXTERNAL_CSS === 'true';

/**
 * Determines if sourcemaps should be turned on or off
 *
 * @type {boolean}
 */
const useStyleSourceMap =
  process.env.CARBON_EXPRESSIVE_STORYBOOK_SOURCEMAPS === 'true';

const useControlledStateWithEventListener =
  process.env.CARBON_EXPRESSIVE_USE_CONTROLLED_STATE_WITH_EVENT_LISTENER ===
  'true';

/**
 * Sets the document direction (https://developer.mozilla.org/en-US/docs/Web/API/Document/dir)
 *
 * @type {boolean}
 */
const useRtl = process.env.CARBON_EXPRESSIVE_STORYBOOK_USE_RTL === 'true';

const replaceTable = {
  useControlledStateWithEventListener,
};

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
  {
    loader:
      process.env.NODE_ENV === 'production'
        ? 'sass-loader'
        : 'fast-sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, '..', 'node_modules'),
        path.resolve(__dirname, '../../../', 'node_modules'),
      ],
      data: `
        $feature-flags: (
          ui-shell: true,
          enable-css-custom-properties: true
        );
      `,
      sourceMap: useStyleSourceMap,
    },
  },
];

class FeatureFlagProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request
   * for `carbon-components/es/globals/js/settings` to `./settings`.
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      if (/[\\/]globals[\\/]js[\\/]settings$/.test(request.path)) {
        request.path = path.resolve(__dirname, './settings');
      }
      callback();
    });
  }
}

module.exports = ({ config, mode }) => {
  config.devtool = useStyleSourceMap ? 'source-map' : '';
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

  config.module.rules.push({
    test: /(\/|\\)FeatureFlags\.js$/,
    loader: 'string-replace-loader',
    options: {
      multiple: Object.keys(replaceTable).map(key => ({
        search: `export\\s+const\\s+${key}\\s*=\\s*false`,
        replace: `export const ${key} = ${replaceTable[key]}`,
        flags: 'i',
      })),
    },
  });

  config.module.rules.push({
    test: /-story\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
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

  config.module.rules = config.module.rules.map(rule => {
    if (!rule.test.test('.svg')) {
      return rule;
    }

    const newRule = rule;
    // Changes existing default rule to not handle SVG files
    newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/;
    return newRule;
  });

  // Adds new SVG loader
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  });

  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: [
      { loader: useExternalCss ? MiniCssExtractPlugin.loader : 'style-loader' },
      ...styleLoaders,
    ],
  });

  if (useExternalCss) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })
    );
  }

  config.resolve = {
    modules: ['node_modules'],
    plugins: [new FeatureFlagProxyPlugin()],
  };

  return config;
};
