/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const acceptLanguageParser = require('accept-language-parser');
const autoprefixer = require('autoprefixer');
const Handlebars = require('handlebars');
const sass = require('node-sass');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: LocaleAPI } = require('@carbon/ibmdotcom-services/lib/services/Locale/Locale');
const { default: TranslateAPI } = require('@carbon/ibmdotcom-services/lib/services/Translation/Translation');

const templateCache = {};

global.sessionStorage = {
  getItem() {
    return '""';
  },
  setItem() {},
};

const devServer = {
  contentBase: path.resolve(__dirname, 'src'),
  setup(app, server) {
    app.get('/', (req, res) => {
      const { fileSystem, waitUntilValid } = server.middleware;
      waitUntilValid(async () => {
        // Determins user's preferred language
        const { code, region } = acceptLanguageParser.parse(req.headers['accept-language'])[0];
        // Loads translation, etc. data from IBM.com services
        const [langDisplay, localeList, translation] = await Promise.all([
          LocaleAPI.getLangDisplay({
            cc: region,
            lc: code,
          }),
          LocaleAPI.getList({
            cc: region,
            lc: code,
          }),
          TranslateAPI.getTranslation({
            cc: region,
            lc: code,
          }),
        ]);
        // Creates the sorted list of available locales
        const collator = new Intl.Collator(`${code}-${region}`);
        const sortCountries = countries => countries.sort((lhs, rhs) => collator.compare(lhs.name, rhs.name));
        const locales = new Map();
        localeList.regionList.forEach(({ countryList, name: regionItem }) => {
          sortCountries(countryList).forEach(({ name: countryItem, locale: localeItems }) => {
            localeItems.forEach(([localeItem, languageItem]) => {
              const localeTokens = /^(\w+)-(\w+)$/.exec(localeItem) || [];
              locales.set(localeItem, {
                locale: localeItem,
                region: regionItem,
                country: countryItem,
                href: `https://www.ibm.com/${localeTokens[2]}-${localeTokens[1]}`,
                language: languageItem,
              });
            });
          });
        });
        // Renders the Handlebars template from the data
        const filename = path.resolve(__dirname, 'dist/index.hbs');
        if (!templateCache[filename]) {
          templateCache[filename] = Handlebars.compile(fileSystem.readFileSync(filename).toString());
        }
        const { mastheadNav, profileMenu, footerMenu, footerThin } = translation;
        const { localeModal, regionList } = localeList;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'public, max-age=0');
        res.send(
          templateCache[filename]({
            allCountryList: Array.from(locales.values()),
            langDisplay,
            navLinks: mastheadNav.links.map(link => ({
              ...link,
              menuItems: !link.menuSections
                ? undefined
                : link.menuSections.reduce((acc, { menuItems }) => acc.concat(menuItems), []),
            })),
            profileItems: profileMenu.signedin,
            footerLinks: footerMenu,
            legalLinks: footerThin,
            regionList,
            localeModal,
          })
        );
        res.end();
      });
    });
  },
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // `autoprefixer` is a requirement for Carbon core Sass code
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                includePaths: ['node_modules'],
                // `enable-css-custom-properties` and `grid-columns-16` feature flags
                // are requirements for Carbon for IBM.com styles
                data: `
                  $feature-flags: (
                    enable-css-custom-properties: true,
                    grid-columns-16: true,
                  );
                `,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Puts `.hbs` file into WebPack Dev Server's virtual file system.
    // If you have other means to load `.hbs` file, this is not needed.
    new HtmlWebpackPlugin({
      template: 'index.hbs',
      filename: 'index.hbs',
    }),
  ],
  devServer,
};
