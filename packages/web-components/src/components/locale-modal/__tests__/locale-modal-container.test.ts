/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { forEach } from '../../../globals/internal/collection-helpers';
/* eslint-disable import/no-duplicates */
import { LocaleList } from '../../../globals/services-store/types/localeAPI';
// Above import is interface-only ref and thus code won't be brought into the build
import '../locale-modal-container';
/* eslint-enable import/no-duplicates */
import localeData from '../__stories__/locale-data.json';

const minimumLocaleList: LocaleList = {
  regionList: [],
  localeModal: localeData.localeModal,
};

const localeListFoo: LocaleList = {
  regionList: [
    {
      name: 'region-name-foo',
      key: 'region-key-foo',
      countryList: [
        {
          name: 'country-name-foo',
          locale: [
            ['locale-id-foo', 'language-foo'],
            ['locale-id-bar', 'language-bar'],
          ],
        },
      ],
    },
    {
      name: 'region-name-bar',
      key: 'region-key-bar',
      countryList: [
        {
          name: 'country-name-bar',
          locale: [['locale-id-baz', 'language-baz']],
        },
        {
          name: 'country-name-baz',
          locale: [
            ['locale-id-qux', 'language-qux'],
            ['locale-id-quux', 'language-quux'],
          ],
        },
      ],
    },
  ],
  localeModal: {
    headerTitle: 'header-title-foo',
    modalClose: 'modal-close-foo',
    searchLabel: 'search-label-foo',
    searchClearText: 'search-clear-text-foo',
    searchPlaceholder: 'search-placeholder-foo',
    availabilityText: 'availability-text-foo',
    unavailabilityText: 'unavailability-text-foo',
  },
};

const template = (props?) => {
  const { langDisplay, language, open, localeList } = props ?? {};
  return html`
    <dds-locale-modal-container
      lang-display="${ifNonNull(langDisplay)}"
      language="${ifNonNull(language)}"
      ?open="${open}"
      .localeList="${ifNonNull(localeList)}"
    >
    </dds-locale-modal-container>
  `;
};

const setupLinkAlternate = (set: boolean = true) => {
  if (!set) {
    forEach(document.querySelectorAll('link[rel="alternate][hreflang]'), item => {
      item.parentNode!.removeChild(item);
    });
  } else {
    document.head.insertAdjacentHTML(
      'beforeend',
      `
        <link rel="alternate" hreflang="locale-id-foo" href="https://example.com/locale-id-foo">
        <link rel="alternate" hreflang="locale-id-bar" href="https://example.com/locale-id-bar">
        <link rel="alternate" hreflang="locale-id-baz" href="https://example.com/locale-id-baz">
        <link rel="alternate" hreflang="locale-id-qux" href="https://example.com/locale-id-qux">
        <link rel="alternate" hreflang="locale-id-quux" href="https://example.com/locale-id-quux">
      `
    );
  }
};

describe('dds-locale-modal-container', function() {
  describe('Misc attributes', function() {
    it('should render minimum attributes', async function() {
      render(template({ localeList: minimumLocaleList }), document.body);
      await Promise.resolve();
      expect(document.querySelector('dds-locale-modal')).toMatchSnapshot();
    });

    it('should render various attributes', async function() {
      setupLinkAlternate();
      render(
        template({
          langDisplay: 'lang-display-foo',
          open: true,
          localeList: localeListFoo,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.querySelector('dds-locale-modal')).toMatchSnapshot();
    });
  });

  describe('Using data', function() {
    it('should use the given language', async function() {
      spyOn(LocaleAPI, 'getLang');
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLang).not.toHaveBeenCalled();
    });

    it('should use the given lang display', async function() {
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ langDisplay: 'lang-display-foo' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLangDisplay).not.toHaveBeenCalled();
    });

    it('should use the given locale list', async function() {
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ language: 'en-US', localeList: minimumLocaleList }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getList).not.toHaveBeenCalled();
    });
  });

  afterEach(function() {
    setupLinkAlternate(false);
    render(undefined!, document.body);
  });
});
