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
import fetchMock from 'fetch-mock';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import EventManager from '../../../../tests/utils/event-manager';
import getSearchParams from '../../../../tests/utils/search-params';
import { MastheadLink } from '../masthead-container';

const template = (props?) => {
  const { authenticated, language, loginNonce, navLinks } = props ?? {};
  return html`
    <dds-masthead-container
      ?authenticated="${authenticated}"
      language="${ifNonNull(language)}"
      login-nonce="${ifNonNull(loginNonce)}"
      .navLinks="${navLinks}"
    >
    </dds-masthead-container>
  `;
};

const navLinksFoo: MastheadLink[] = [
  { title: 'item-title-foo', url: 'https://ibmdotcom-webcomponents.mybluemix.net/foo' },
  {
    title: 'menu-title-foo',
    menuSections: [{ menuItems: [{ title: 'menu-item-title-bar', url: 'https://ibmdotcom-webcomponents.mybluemix.net/bar' }] }],
  },
];

const navLinksBar: MastheadLink[] = [
  { title: 'item-title-bar', url: 'https://ibmdotcom-webcomponents.mybluemix.net/foo' },
  {
    title: 'menu-title-bar',
    menuSections: [{ menuItems: [{ title: 'menu-item-title-bar', url: 'https://ibmdotcom-webcomponents.mybluemix.net/bar' }] }],
  },
];

describe('dds-masthead-container', function() {
  const events = new EventManager();

  describe('Rendering global bar', function() {
    it('should render unauthenticated state', async function() {
      spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template({ loginNonce: 'login-nonce-foo' }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.shadowRoot!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });

    it('should render authenticated state', async function() {
      spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve());
      render(template({ authenticated: true }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.shadowRoot!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function() {
    it('should render nothing if there is no given/default nav items', async function() {
      spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template(), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.shadowRoot!.querySelector('dds-top-nav')!.children.length).toBe(0);
      expect(mastheadContainer!.shadowRoot!.querySelector('dds-left-nav')!.children.length).toBe(0);
    });

    it('should render the given nav items to the top', async function() {
      spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-container')!.shadowRoot!.querySelector('dds-top-nav')).toMatchSnapshot();
    });

    it('should render the given nav items to the left', async function() {
      spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-container')!.shadowRoot!.querySelector('dds-left-nav')).toMatchSnapshot();
    });
  });

  describe('Determining the nav/search language', function() {
    it('should use the given language', async function() {
      spyOn(LocaleAPI, 'getLang');
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLang).not.toHaveBeenCalled();
    });

    it('should minimize the `LocaleAPI` calls', async function() {
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
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
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      const promiseResults = Promise.all([
        (mastheadContainer as any)._fetchDefaultLanguageAsNeeded(),
        (mastheadContainer as any)._fetchDefaultLanguageAsNeeded(),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise'));
      const results = await promiseResults;
      expect(LocaleAPI.getLang).toHaveBeenCalledTimes(1);
      expect(results).toEqual(['en-US', 'en-US']);
    });
  });

  describe('Loading nav links', function() {
    it('should use the given nav links', async function() {
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      render(template({ language: 'en-US', navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(TranslationAPI.getTranslation).not.toHaveBeenCalled();
    });

    it('should minimize the `TranslationAPI` calls', async function() {
      const eventTarget = new EventTarget();
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(
        new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', () => {
            resolve({ mastheadNav: { links: navLinksFoo } });
          });
        })
      );
      render(template({ language: 'en-US' }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      const promiseResults = Promise.all([
        (mastheadContainer as any)._fetchDefaultNavLinksAsNeeded('en-US'),
        (mastheadContainer as any)._fetchDefaultNavLinksAsNeeded('en-US'),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise'));
      const results = await promiseResults;
      expect(TranslationAPI.getTranslation).toHaveBeenCalledTimes(1);
      expect(results).toEqual([navLinksFoo, navLinksFoo]);
    });

    it('should manage `TranslationAPI` calls per locale', async function() {
      const eventTarget = new EventTarget();
      spyOn(TranslationAPI, 'getTranslation').and.callFake(({ cc, lc }) => {
        const language = `${lc}-${cc.toUpperCase()}`;
        const navLinks = {
          'en-US': navLinksFoo,
          'ko-KR': navLinksBar,
        }[language];
        return new Promise(resolve => {
          events.on(eventTarget, 'drain-promise', event => {
            if (language === event.detail.language) {
              resolve({ mastheadNav: { links: navLinks } });
            }
          });
        });
      });
      render(template({ language: 'en-US' }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      const promiseResults = Promise.all([
        (mastheadContainer as any)._fetchDefaultNavLinksAsNeeded('en-US'),
        (mastheadContainer as any)._fetchDefaultNavLinksAsNeeded('ko-KR'),
      ]);
      eventTarget.dispatchEvent(new CustomEvent('drain-promise', { detail: { language: 'en-US' } }));
      eventTarget.dispatchEvent(new CustomEvent('drain-promise', { detail: { language: 'ko-KR' } }));
      const results = await promiseResults;
      expect(TranslationAPI.getTranslation).toHaveBeenCalledTimes(2);
      expect(results).toEqual([navLinksFoo, navLinksBar]);
    });
  });

  describe('Providing data for search', function() {
    let mock;
    let mastheadContainer;
    let search;
    const promisesFetchResults: Promise<void>[] = [];

    function drainPromisesFetchResults() {
      return Promise.all(promisesFetchResults.splice(0, promisesFetchResults.length));
    }

    beforeEach(async function() {
      spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
      mock = fetchMock.mock(
        { method: 'get', url: 'https://www-api.ibm.com/search/typeahead/v1', query: {} },
        { response: [['foo']] }
      );
      render(template({ language: 'en-US' }), document.body);
      await Promise.resolve(); // Update cycle for `<dds-masthead-container>`
      await Promise.resolve(); // Update cycle for `<dds-masthead-search>`
      mastheadContainer = document.body.querySelector('dds-masthead-container');
      // Let `input` event be handled synchronously
      spyOn(mastheadContainer as any, '_throttledHandleInputImpl').and.callFake(function(event) {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        this._handleInputImpl(event);
      });
      const origFetchResults = (mastheadContainer as any)._fetchResults;
      spyOn(mastheadContainer as any, '_fetchResults').and.callFake(function() {
        // TODO: See if there is a way to fix TS2683
        // @ts-ignore
        const promise = origFetchResults.call(this);
        promisesFetchResults.push(promise);
        return promise;
      });
      search = mastheadContainer!.shadowRoot!.querySelector('dds-masthead-search');
      (search!.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      await Promise.resolve();
    });

    it('should generate search query URL', async function() {
      const searchInputNode = search!.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      await drainPromisesFetchResults();
      const [url] = mock.calls()[0];
      expect(getSearchParams(url)).toEqual({
        lang: 'en',
        cc: 'US',
        query: 'search-query-foo',
      });
    });

    it('should set the search results', async function() {
      const searchInputNode = search!.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      await drainPromisesFetchResults();
      expect((mastheadContainer as any)._currentSearchResults).toEqual(['foo']);
    });

    it('should minimize API calls', async function() {
      const searchInputNode = search!.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      await drainPromisesFetchResults();
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      await drainPromisesFetchResults();
      expect(mock.calls().length).toBe(1);
    });

    afterEach(async function() {
      await drainPromisesFetchResults();
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
    fetchMock.restore();
  });
});
