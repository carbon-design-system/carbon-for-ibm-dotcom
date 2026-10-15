/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const sass = require('sass');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const deepReplace = require('../../../tasks/deep-replace');
const { getPaths } = deepReplace;

const useStyleSourceMap = process.env.STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

module.exports = {
  // React stories (`*.stories.react.tsx` / `*.stories.react.mdx`) are not
  // matched by these globs, so they stay out of the build until step 13.
  // Note: Storybook 6.5 (webpack 4) does not support `!` negated globs here
  // (they produce `Can't resolve '../src'`), so none are used.
  stories: process.env.STORYBOOK_STORIES
    ? [process.env.STORYBOOK_STORIES]
    : ['../docs/*.mdx', '../src/**/*.stories.ts'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    'storybook-addon-rtl',
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
      (value, key, parent) =>
        key === 'options' && /babel-loader/i.test(parent.loader),
      (value) => ({
        ...value,
        babelrc: false,
        configFile: false,
      })
    );
    return config;
  },
  webpackFinal(config, options) {
    config.devtool = useStyleSourceMap ? 'source-map' : '';

    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: 1024 * 1024,
      },
      // Only minify in production. Running TerserPlugin/esbuild in dev mode
      // mangles Lit 3 internal names (e.g. reactive-property descriptors),
      // causing "ReferenceError: k is not defined" in the browser.
      ...(options?.configType === 'PRODUCTION' && {
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.esbuildMinify,
            sourceMap: useStyleSourceMap,
            terserOptions: {
              minify: true,
            },
          }),
        ],
      }),
    };

    // Uses our own option for `@babel/preset-env`
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.presets' &&
        Array.isArray(value) &&
        /@babel\/preset-env/i.test(value[0]),
      (value) => [
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
    // Normalizes several plugins with `loose: false` option, except
    // class features which require loose: true with legacy decorators
    config.module.rules = deepReplace(
      config.module.rules,
      (value, key, parent, parents) =>
        getPaths(parents) === 'use.options.plugins' &&
        Array.isArray(value) &&
        value[1] &&
        value[1].loose &&
        !/@babel\/plugin-(proposal|transform)-(class-properties|private-methods|private-property-in-object)/i.test(
          value[0]
        ),
      (value) => [
        value[0],
        {
          ...value[1],
          loose: false,
        },
      ]
    );

    // `@carbon/ibmdotcom-web-components` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
    const htmlRuleIndex = config.module.rules.findIndex(
      (item) =>
        item.use &&
        item.use.some &&
        item.use.some((use) => /polymer-webpack-loader/i.test(use.loader))
    );
    if (htmlRuleIndex >= 0) {
      config.module.rules.splice(htmlRuleIndex, 1);
    }

    // We use `CSSResult` instead of raw CSS
    const sassLoaderRuleIndex = config.module.rules.findIndex(
      (item) =>
        item.use &&
        item.use.some &&
        item.use.some((use) => /sass-loader/i.test(use.loader))
    );
    if (sassLoaderRuleIndex >= 0) {
      config.module.rules.splice(sassLoaderRuleIndex, 1);
    }

    const fileLoaderRuleIndex = config.module.rules.findIndex(
      (item) =>
        (item.use &&
          item.use.some &&
          item.use.some((use) => /file-loader/i.test(use.loader))) ||
        /file-loader/i.test(item.loader)
    );
    if (fileLoaderRuleIndex >= 0) {
      config.module.rules.splice(fileLoaderRuleIndex, 1);
    }

    // Add a Babel rule for node_modules dependencies that ship modern syntax
    // (class static blocks, nullish coalescing, optional chaining) which
    // webpack 4 cannot parse natively. We use our own plugin list rather than
    // reusing Storybook's babelLoaderRule so that class-static-block is
    // included (needed for CWC v3's `static { this.is = "cds-*" }` pattern).
    // Remove when webpack 5 is adopted.
    config.module.rules.unshift({
      test: /\.js$/,
      include: [
        path.dirname(require.resolve('lit')),
        /[\\/]node_modules[\\/](lit|@lit|lit-html|lit-element|@carbon[\\/])/,
      ],
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          sourceType: 'unambiguous',
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-private-methods', { loose: true }],
            [
              '@babel/plugin-transform-private-property-in-object',
              { loose: true },
            ],
            '@babel/plugin-transform-class-static-block',
            '@babel/plugin-transform-logical-assignment-operators',
            '@babel/plugin-transform-nullish-coalescing-operator',
            '@babel/plugin-transform-optional-chaining',
          ],
        },
      },
    });

    config.module.rules.push(
      {
        // We load Web Components polyfills by our own (See `src/polyfills/index.js`)
        test: /@webcomponents[\\/]webcomponentsjs[\\/]webcomponents-lite/i,
        use: 'null-loader',
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'raw-loader' }],
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
                const hostPseudo =
                  require('../tools/postcss-fix-host-pseudo')();
                const autoPrefixer = require('autoprefixer')({
                  overrideBrowserslist: ['last 1 version', 'ie >= 11'],
                });
                return [hostPseudo, autoPrefixer];
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
                // quietDeps suppresses Sass deprecation warnings from @carbon/* and
                // other third-party dependencies (kept deliberately for Carbon v12
                // alpha).  silenceDeprecations: ['legacy-js-api'] silences the
                // API-level notice that quietDeps cannot cover.
                quietDeps: true,
                silenceDeprecations: ['legacy-js-api'],
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

    // TEMP(lit3-migration): @storybook/react v6.5 has a dynamic import of
    // react-dom/client that only exists in React 18.  When the framework is
    // @storybook/web-components the @storybook/react framework-preset-react-dom-hack
    // IgnorePlugin is not automatically applied, so we add it here manually.
    // This can be removed once React wrappers are re-enabled in Step 13 with
    // a React 18 upgrade, or when @storybook/react is removed as a dependency.
    const reactDomPkg = require('react-dom/package.json');
    if (!reactDomPkg.version.startsWith('18')) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /react-dom\/client$/,
          contextRegExp: /(app[\\/]react|@storybook[\\/]react)/,
        })
      );
    }

    return config;
  },
};
