/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import fetchMock from 'fetch-mock';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import EventManager from '../../../../tests/utils/event-manager';
import getSearchParams from '../../../../tests/utils/search-params';
import { MastheadLink } from '../../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS } from '../../../globals/services-store/types/profileAPI';

const template = (props?) => {
  const { language, loginNonce, userStatus, navLinks } = props ?? {};
  return html`
    <dds-masthead-container
      language="${ifNonNull(language)}"
      login-nonce="${ifNonNull(loginNonce)}"
      user-status="${ifNonNull(userStatus)}"
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

describe('dds-masthead-container', function() {
  const events = new EventManager();

  beforeEach(function() {
    spyOn(LocaleAPI, 'getLang').and.returnValue(Promise.resolve({}));
    spyOn(TranslationAPI, 'getTranslation').and.returnValue(Promise.resolve({ mastheadNav: {} }));
  });

  describe('Rendering global bar', function() {
    it('should render unauthenticated state', async function() {
      render(template({ loginNonce: 'login-nonce-foo' }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });

    it('should render authenticated state', async function() {
      render(template({ userStatus: USER_AUTHENTICATION_STATUS.AUTHENTICATED }), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function() {
    it('should render nothing if there is no given/default nav items', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadContainer = document.body.querySelector('dds-masthead-container');
      expect(mastheadContainer!.querySelector('dds-top-nav')!.children.length).toBe(0);
      expect(mastheadContainer!.querySelector('dds-left-nav')!.children.length).toBe(0);
    });

    it('should render the given nav items to the top', async function() {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-container')!.querySelector('dds-top-nav')).toMatchSnapshot();
    });

    it('should render the given nav items to the left', async function() {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-container')!.querySelector('dds-left-nav')).toMatchSnapshot();
    });
  });

  describe('Determining the nav/search language', function() {
    it('should use the given language', async function() {
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(LocaleAPI.getLang).not.toHaveBeenCalled();
    });
  });

  describe('Handling nav links', function() {
    it('should use the given nav links', async function() {
      render(template({ language: 'en-US', navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(TranslationAPI.getTranslation).not.toHaveBeenCalled();
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
      search = mastheadContainer!.querySelector('dds-masthead-search');
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
