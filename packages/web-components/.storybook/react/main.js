/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { addons, managerWebpack, webpackFinal } = require('../main');
const { readFile, writeFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const { transformAsync } = require('@babel/core');
const babelPluginCreateReactCustomElementType = require('../../tools/babel-plugin-create-react-custom-element-type');
const deepReplace = require('../../../../tasks/deep-replace');

const regexComponentsReactPath =
  /(@carbon[\\/]ibmdotcom-web-components[\\/]es|packages[\\/]web-components[\\/](es|src))[\\/]components-react[\\/](?!(.*-(composite|container)))(.*?)(\.[jt]sx?)?$/;
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirpAsync = promisify(mkdirp);

const arrayify = (value) =>
  Array.isArray(value) ? value : value != null ? [value] : []; // eslint-disable-line no-nested-ternary
const testMatches = (test, s) =>
  arrayify(test).some((item) => item.test && item.test(s));

const buildCreateReactCustomElementTypeBabelOpts = {
  babelrc: false,
  plugins: [
    ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-syntax-typescript',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    babelPluginCreateReactCustomElementType,
  ],
};

/**
 * Generates React wrapper module for the given custom element module.
 * @param {string} dst The file path of the generated React wrapper module.
 * @param {string} src The file path of the custom element module.
 */
const buildReactCustomElementTypeOnTheFly = async (dst, src) => {
  await mkdirpAsync(path.dirname(dst));
  const transformed = await transformAsync(await readFileAsync(src), {
    ...buildCreateReactCustomElementTypeBabelOpts,
    filename: src,
  });
  await writeFileAsync(dst, transformed.code);
};

class CreateReactCustomElementTypeProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request for:
   *
   * * `@carbon/web-components/es/components-react/**` to the corresponsing local path in this project
   * * `es/components`/`es/globals` to the corresponding source code, given the former may not have been built yet
   * * `{es,src}/components-react/componentname/{defs,*-connect}` to `src/components/componentname/{defs,*-connect}`,
   *   given the former may not have been built yet
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      request.path = request.path
        .replace(
          /@carbon[\\/]ibmdotcom-web-components[\\/]es[\\/](components|globals)[\\/]/i,
          '@carbon/ibmdotcom-web-components/src/$1/'
        )
        .replace(
          /[\\/]packages[\\/]web-components[\\/]es[\\/](components|globals)[\\/](.*?)(\.[jt]s)?$/i,
          '/packages/web-components/src/$1/$2'
        )
        .replace(
          /[\\/]packages[\\/]web-components[\\/](es|src)[\\/]components-react[\\/](.*)[\\/](defs|(.*)-connect)(\.[jt]s)?$/i,
          '/packages/web-components/src/components/$2/$3'
        );
      const tokens = regexComponentsReactPath.exec(request.path);
      if (!tokens) {
        // Bails if the request is not of the React wrapper module
        callback();
        return;
      }
      const src = path.resolve(
        __dirname,
        '../../src/components',
        `${tokens[5]}.ts`
      );
      const dst = path.resolve(
        __dirname,
        '../../es/components-react',
        `${tokens[5]}.js`
      );
      (process.env.NODE_ENV === 'production'
        ? Promise.resolve()
        : buildReactCustomElementTypeOnTheFly(dst, src)
      ).then(() => {
        request.path = dst;
        callback();
      }, callback);
    });
  }
}

module.exports = {
  stories: [
    '../../docs/*.mdx',
    '../../src/**/*.stories.react.tsx',
    '../../src/**/*.stories.react.mdx',
  ],
  addons,
  framework: '@storybook/react',
  managerWebpack,
  webpackFinal(config, mode) {
    const massagedConfig = webpackFinal(config, mode);
    if (!massagedConfig.resolve.extensions) {
      massagedConfig.resolve.extensions = [];
    }
    if (!massagedConfig.resolve.extensions.indexOf('.tsx') < 0) {
      massagedConfig.resolve.extensions.push('.tsx');
    }
    if (!massagedConfig.resolve.plugins) {
      massagedConfig.resolve.plugins = [];
    }
    massagedConfig.resolve.plugins.push(
      new CreateReactCustomElementTypeProxyPlugin()
    );
    massagedConfig.module.rules = deepReplace(
      massagedConfig.module.rules,
      (value, key) =>
        key === 'test' &&
        testMatches(value, 'button.stories.mdx') &&
        !testMatches(value, 'button.stories.react.mdx'),
      (value) => [...arrayify(value), /\.stories\.react.mdx$/]
    );
    massagedConfig.module.rules = deepReplace(
      massagedConfig.module.rules,
      (value, key) =>
        key === 'exclude' &&
        testMatches(value, 'button.stories.mdx') &&
        !testMatches(value, 'button.stories.react.mdx'),
      (value) => [...arrayify(value), /\.stories\.react.mdx$/]
    );
    massagedConfig.module.rules.unshift({
      test: /components-react/i,
      exclude: [/node_modules/i, /-(composite|container)/i],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-modules', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              [
                'babel-plugin-react-docgen',
                {
                  DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
                },
              ],
            ],
          },
        },
        require.resolve('../../tools/react-docgen-custom-element-type-loader'),
      ],
    });
    massagedConfig.module.rules.unshift({
      test: /components-react\/.*\/.*-composite/i,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-modules', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              [
                'babel-plugin-react-docgen',
                {
                  DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
                },
              ],
            ],
          },
        },
      ],
    });
    return massagedConfig;
  },
};
