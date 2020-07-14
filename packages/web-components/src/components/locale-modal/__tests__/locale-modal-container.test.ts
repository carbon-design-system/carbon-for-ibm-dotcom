/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import { EventTarget } from 'event-target-shim';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import { forEach } from '../../../globals/internal/collection-helpers';
import EventManager from '../../../../tests/utils/event-manager';
/* eslint-disable import/no-duplicates */
import { LocaleModalLocaleList } from '../locale-modal-container';
// Above import is interface-only ref and thus code won't be brought into the build
import '../locale-modal-container';
/* eslint-enable import/no-duplicates */
import localeData from '../__stories__/locale-data.json';

const minimumLocaleList: LocaleModalLocaleList = {
  regionList: [],
  localeModal: localeData.localeModal,
};

const localeListFoo: LocaleModalLocaleList = {
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
  const events = new EventManager();

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

  describe('Determining the locale list language', function() {
    it('should use the given language', async function() {
      spyOn(LocaleAPI, 'getLang');
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLang).not.toHaveBeenCalled();
    });

    it('should minimize the `LocaleAPI` calls', async function() {
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      const eventTarget = new EventTarget();
      spyOn(LocaleAPI, 'getLang').and.returnValue(
        new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', () => {
            resolve({ cc: 'US', lc: 'en' });
          });
        })
      );
      render(template(), document.body);
      await Promise.resolve();
      const localeModalContainer = document.body.querySelector('dds-locale-modal-container');
      const promiseResults = Promise.all([
        (localeModalContainer as any)._fetchDefaultLanguageAsNeeded(),
        (localeModalContainer as any)._fetchDefaultLanguageAsNeeded(),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise'));
      const results = await promiseResults;
      expect(LocaleAPI.getLang).toHaveBeenCalledTimes(1);
      expect(results).toEqual(['en-US', 'en-US']);
    });
  });

  describe('Loading lang display', function() {
    it('should use the given lang display', async function() {
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(Promise.resolve(''));
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ langDisplay: 'lang-display-foo' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLangDisplay).not.toHaveBeenCalled();
    });

    it('should minimize the `LocaleAPI.getLangDisplay()` calls', async function() {
      const eventTarget = new EventTarget();
      spyOn(LocaleAPI, 'getLangDisplay').and.returnValue(
        new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', () => {
            resolve('lang-display-foo');
          });
        })
      );
      render(template({ localeList: minimumLocaleList }), document.body);
      await Promise.resolve();
      const localeModalContainer = document.body.querySelector('dds-locale-modal-container');
      const promiseResults = Promise.all([
        (localeModalContainer as any)._fetchDefaultLangDisplayAsNeeded(),
        (localeModalContainer as any)._fetchDefaultLangDisplayAsNeeded(),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise'));
      const results = await promiseResults;
      expect(LocaleAPI.getLangDisplay).toHaveBeenCalledTimes(1);
      expect(results).toEqual(['lang-display-foo', 'lang-display-foo']);
    });
  });

  describe('Loading locale list', function() {
    it('should use the given locale list', async function() {
      spyOn(LocaleAPI, 'getList').and.returnValue(Promise.resolve(localeListFoo));
      render(template({ language: 'en-US', localeList: minimumLocaleList }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getList).not.toHaveBeenCalled();
    });

    it('should minimize the `LocaleAPI.getList()` calls', async function() {
      const eventTarget = new EventTarget();
      spyOn(LocaleAPI, 'getList').and.returnValue(
        new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', () => {
            resolve(localeListFoo);
          });
        })
      );
      render(template({ langDisplay: 'lang-display-foo', language: 'en-US' }), document.body);
      await Promise.resolve();
      const localeModalContainer = document.body.querySelector('dds-locale-modal-container');
      const promiseResults = Promise.all([
        (localeModalContainer as any)._fetchDefaultLocaleListAsNeeded('en-US'),
        (localeModalContainer as any)._fetchDefaultLocaleListAsNeeded('en-US'),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise'));
      const results = await promiseResults;
      expect(LocaleAPI.getList).toHaveBeenCalledTimes(1);
      expect(results).toEqual([localeListFoo, localeListFoo]);
    });

    it('should manage `LocaleAPI.getList()` calls per locale', async function() {
      const eventTarget = new EventTarget();
      spyOn(LocaleAPI, 'getList').and.callFake(({ cc, lc }) => {
        const language = `${lc}-${cc.toUpperCase()}`;
        return new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', event => {
            if (language === event.detail.language) {
              resolve(
                {
                  'en-US': minimumLocaleList,
                  'ko-KR': localeListFoo,
                }[language]
              );
            }
          });
        });
      });
      render(template({ language: 'en-US' }), document.body);
      await Promise.resolve();
      const localeModalContainer = document.body.querySelector('dds-locale-modal-container');
      const promiseResults = Promise.all([
        (localeModalContainer as any)._fetchDefaultLocaleListAsNeeded('en-US'),
        (localeModalContainer as any)._fetchDefaultLocaleListAsNeeded('ko-KR'),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise', { detail: { language: 'en-US' } }));
      eventTarget.dispatchEvent(new CustomEvent('drain-promise', { detail: { language: 'ko-KR' } }));
      const results = await promiseResults;
      expect(LocaleAPI.getList).toHaveBeenCalledTimes(2);
      expect(results).toEqual([minimumLocaleList, localeListFoo]);
    });
  });

  afterEach(function() {
    setupLinkAlternate(false);
    render(undefined!, document.body);
    events.reset();
  });
});
