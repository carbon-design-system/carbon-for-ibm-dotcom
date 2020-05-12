const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');

/**
 * Flag to enable the expressive theme
 *
 * @type {boolean}
 */
const useCarbonExpressive =
  process.env.REACT_STORYBOOK_CARBON_EXPRESSIVE === 'true';

/**
 * Flag to switch to use the miniextract plugin
 *
 * @type {boolean}
 */
const useExternalCss = process.env.REACT_STORYBOOK_USE_EXTERNAL_CSS === 'true';

/**
 * Determines if sourcemaps should be turned on or off
 *
 * @type {boolean}
 */
const useStyleSourceMap = process.env.REACT_STORYBOOK_SOURCEMAPS === 'true';

/**
 * Sets the document direction (https://developer.mozilla.org/en-US/docs/Web/API/Document/dir)
 *
 * @type {boolean}
 */
const useRtl = process.env.REACT_STORYBOOK_USE_RTL === 'true';

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
    loader: 'sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, '..', 'node_modules'),
        path.resolve(__dirname, '../../../', 'node_modules'),
      ],
      data: `
        $feature-flags: (
          ui-shell: true,
          enable-css-custom-properties: ${useCarbonExpressive}
        );
        $dds-feature-flags: (
          carbon-expressive: ${useCarbonExpressive},
        );
      `,
      sourceMap: useStyleSourceMap,
    },
  },
];

module.exports = ({ config, mode }) => {
  config.devtool = useStyleSourceMap ? 'source-map' : '';
  config.optimization = {
    ...config.optimization,
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

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      TRANSLATION_HOST: '',
      CORS_PROXY: '',
      REACT_STORYBOOK_USE_RTL: 'false',
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
};
