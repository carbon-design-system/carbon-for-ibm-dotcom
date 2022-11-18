/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rtlcss = require('rtlcss');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const replace = require('@rollup/plugin-replace');
const { terser } = require('rollup-plugin-terser');
const multiInput = require('rollup-plugin-multi-input').default;
const injectProcessEnv = require('rollup-plugin-inject-process-env');

const ibmdotcomIcon = require('./rollup-plugin-ibmdotcom-icon');
const litSCSS = require('./rollup-plugin-lit-scss');
const fixHostPseudo = require('./postcss-fix-host-pseudo');
const license = require('./rollup-plugin-license');

const readFile = promisify(fs.readFile);

/**
 * Stores the suffix to append depending on build mode
 *
 * @type {{development: string, production: string}}
 */
const modeSuffixes = {
  development: '',
  production: '.min',
};

/**
 * Stores the suffix to append for render direction setting
 *
 * @type {{ltr: string, rtl: string}}
 */
const dirSuffixes = {
  ltr: '',
  rtl: '.rtl',
};

/**
 * Sets the rollup configuration based on various settings
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=development] The UI direction.
 * @param {Array} [options.folders] Package names as inputs
 * @returns {object} The Rollup config.
 */
function getRollupConfig({
  mode = 'development',
  dir = 'ltr',
  folders = ['dotcom-shell'],
} = {}) {
  const postCSSPlugins = [
    fixHostPseudo(),
    autoprefixer({
      overrideBrowsersList: [
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
  ];

  if (mode !== 'development') {
    postCSSPlugins.push(cssnano());
  }

  if (dir === 'rtl') {
    postCSSPlugins.push(rtlcss);
  }

  const licenseOptions = {
    whitelist: /^(carbon-components|carbon-web-components|@carbon*)$/i,
    async licenseSelf() {
      return readFile(
        path.resolve(__dirname, '../../../tasks/license.js'),
        'utf8'
      );
    },
  };

  const inputs = {};

  // retaining old dotcom-shell for legacy support
  inputs[
    `ibmdotcom-web-components-dotcom-shell${dirSuffixes[dir]}${modeSuffixes[mode]}`
  ] = 'src/components/dotcom-shell/index.ts';

  // adding the cloud masthead
  inputs[`cloud-masthead${dirSuffixes[dir]}${modeSuffixes[mode]}`] =
    'src/components/masthead/cloud/index.ts';

  folders.forEach((folder) => {
    if (folder === 'cta') {
      inputs[
        `button-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/button-cta.ts`;
      inputs[
        `card-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/card-cta.ts`;
      inputs[
        `card-link-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/card-link-cta.ts`;
      inputs[
        `link-list-item-card-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/link-list-item-card-cta.ts`;
      inputs[
        `link-list-item-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/link-list-item-cta.ts`;
      inputs[
        `feature-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/feature-cta.ts`;
      inputs[
        `text-cta${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/text-cta.ts`;
      inputs[
        `video-cta-container${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/cta/video-cta-container.ts`;
    } else if (folder === 'lightbox-media-viewer') {
      inputs[
        `lightbox-image-viewer${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/lightbox-media-viewer/lightbox-image-viewer.ts`;
      inputs[
        `lightbox-video-player${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/lightbox-media-viewer/lightbox-video-player-container.ts`;
    } else {
      inputs[
        `${folder}${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/${folder}/index.ts`;
    }

    if (folder === 'callout-with-media') {
      inputs[
        `callout-with-media-image${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/callout-with-media/callout-with-media-image.ts`;
      inputs[
        `callout-with-media-video${dirSuffixes[dir]}${modeSuffixes[mode]}`
      ] = `src/components/callout-with-media/callout-with-media-video.ts`;
    }
  });

  const rollupConfig = {
    input: inputs,
    plugins: [
      multiInput(),
      nodeResolve({
        browser: true,
        mainFields: ['jsnext', 'module', 'main'],
        dedupe: [
          '@carbon/ibmdotcom-utilities',
          '@carbon/ibmdotcom-services',
          '@carbon/ibmdotcom-styles',
          'carbon-web-components',
          'carbon-components',
        ],
        extensions: ['.js', '.ts'],
      }),
      json(),
      commonjs({
        include: [/node_modules/],
        sourceMap: true,
      }),
      ibmdotcomIcon(),
      injectProcessEnv(
        {
          DDS_CONTENT_BLOCK_HEADLINES: 'true',
          DDS_CONTENT_BLOCK_CARD_STATIC: 'true',
          DDS_CLOUD_MASTHEAD: 'true',
        },
        {
          include: ['**/feature-flags.ts'],
        }
      ),
      babel.babel({
        babelHelpers: 'inline',
        extensions: ['.ts'],
        exclude: ['node_modules/**'], // only transpile our source code
        presets: ['@babel/preset-modules'],
        plugins: [
          '@babel/plugin-transform-typescript',
          '@babel/plugin-proposal-class-properties',
          [
            '@babel/plugin-proposal-decorators',
            { decoratorsBeforeExport: true },
          ],
          '@babel/plugin-proposal-nullish-coalescing-operator',
          ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
          '@babel/plugin-proposal-optional-chaining',
          ...(mode === 'development'
            ? []
            : [
                [
                  'template-html-minifier',
                  {
                    modules: {
                      'lit-html': ['html'],
                      'lit-element': ['html'],
                    },
                    htmlMinifier: {
                      collapseWhitespace: true,
                      conservativeCollapse: true,
                      removeComments: true,
                      caseSensitive: true,
                      minifyCSS: true,
                    },
                  },
                ],
              ]),
        ],
      }),
      // We are using `carbon-web-components` code merely as the source of inheritance,
      // and we don't want to affect `carbon-web-components`' components application may define elsewhere
      babel.babel({
        babelHelpers: 'inline',
        include: [/carbon-web-components\/es\/components\//i],
        plugins: [
          path.resolve(__dirname, 'babel-plugin-undef-custom-elements'),
        ],
      }),
      litSCSS({
        includePaths: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../../../node_modules'),
        ],
        async preprocessor(contents, id) {
          return (await postcss(postCSSPlugins).process(contents, { from: id }))
            .css;
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(mode),
        preventAssignment: true,
      }),
      ...(mode === 'development'
        ? [license(licenseOptions)]
        : [terser(), license(licenseOptions)]),
    ],
  };

  return rollupConfig;
}

module.exports = getRollupConfig;
