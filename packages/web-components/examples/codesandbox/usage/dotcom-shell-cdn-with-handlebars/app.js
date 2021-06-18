/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const acceptLanguageParser = require('accept-language-parser');
const express = require('express');
const Handlebars = require('handlebars');
const { default: LocaleAPI } = require('@carbon/ibmdotcom-services/lib/services/Locale/Locale');
const { default: TranslateAPI } = require('@carbon/ibmdotcom-services/lib/services/Translation/Translation');

const readFile = promisify(fs.readFile);
const templateCache = {};
const templateFile = path.resolve(__dirname, 'index.hbs');

const app = express();

global.sessionStorage = {
  getItem() {
    return '""';
  },
  setItem() {},
};

app.get('/', async function topRoute(req, res) {
  // Determines user's preferred language
  const { code = 'en', region = 'US' } = acceptLanguageParser.parse(req.headers['accept-language'])[0] || {};
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
  if (!templateCache[templateFile]) {
    templateCache[templateFile] = Handlebars.compile(await readFile(templateFile, 'utf8'));
  }
  const { mastheadNav, profileMenu, footerMenu, footerThin } = translation;
  const { localeModal, regionList } = localeList;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.send(
    templateCache[templateFile]({
      allCountryList: Array.from(locales.values()),
      langDisplay,
      navLinks: mastheadNav.links.map(link => ({
        ...link,
        menuItems: !link.menuSections ? undefined : link.menuSections.reduce((acc, { menuItems }) => acc.concat(menuItems), []),
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

const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}.`);
});
