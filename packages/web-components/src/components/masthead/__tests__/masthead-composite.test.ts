/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import EventManager from '../../../../tests/utils/event-manager';
import { MastheadLink } from '../../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS } from '../../../globals/services-store/types/profileAPI';
import DDSMastheadComposite from '../masthead-composite';

const template = (props?) => {
  const { language, loginNonce, userStatus, navLinks } = props ?? {};
  return html`
    <dds-masthead-composite
      language="${ifNonNull(language)}"
      login-nonce="${ifNonNull(loginNonce)}"
      user-status="${ifNonNull(userStatus)}"
      .navLinks="${navLinks}"
    >
    </dds-masthead-composite>
  `;
};

const navLinksFoo: MastheadLink[] = [
  { title: 'item-title-foo', url: 'https://ibmdotcom-webcomponents.mybluemix.net/foo' },
  {
    title: 'menu-title-foo',
    menuSections: [{ menuItems: [{ title: 'menu-item-title-bar', url: 'https://ibmdotcom-webcomponents.mybluemix.net/bar' }] }],
  },
];

describe('dds-masthead-composite', function() {
  const events = new EventManager();

  describe('Rendering global bar', function() {
    it('should render unauthenticated state', async function() {
      render(template({ loginNonce: 'login-nonce-foo' }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector('dds-masthead-composite');
      expect(mastheadComposite!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });

    it('should render authenticated state', async function() {
      render(template({ userStatus: USER_AUTHENTICATION_STATUS.AUTHENTICATED }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector('dds-masthead-composite');
      expect(mastheadComposite!.querySelector('dds-masthead-global-bar')).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function() {
    it('should render nothing if there is no given/default nav items', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector('dds-masthead-composite');
      expect(mastheadComposite!.querySelector('dds-top-nav')!.children.length).toBe(0);
      expect(mastheadComposite!.querySelector('dds-left-nav')!.children.length).toBe(0);
    });

    it('should render the given nav items to the top', async function() {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-composite')!.querySelector('dds-top-nav')).toMatchSnapshot();
    });

    it('should render the given nav items to the left', async function() {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('dds-masthead-composite')!.querySelector('dds-left-nav')).toMatchSnapshot();
    });
  });

  describe('Determining the nav/search language', function() {
    it('should use the given language', async function() {
      (DDSMastheadComposite.prototype as any)._setLanguage = jasmine.createSpy();
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect((DDSMastheadComposite.prototype as any)._setLanguage).toHaveBeenCalled();
    });

    afterEach(function() {
      (DDSMastheadComposite.prototype as any)._setLanguage = undefined;
    });
  });

  describe('Handling nav links', function() {
    it('should use the given nav links', async function() {
      (DDSMastheadComposite.prototype as any)._loadTranslation = jasmine.createSpy();
      render(template({ language: 'en-US', navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect((DDSMastheadComposite.prototype as any)._loadTranslation).not.toHaveBeenCalled();
    });

    afterEach(function() {
      (DDSMastheadComposite.prototype as any)._loadTranslation = undefined;
    });
  });

  describe('Providing data for search', function() {
    it('should trigger search API call', async function() {
      (DDSMastheadComposite.prototype as any)._setLanguage = jasmine.createSpy().and.returnValue(Promise.resolve());
      (DDSMastheadComposite.prototype as any)._loadTranslation = jasmine.createSpy().and.returnValue(Promise.resolve());
      (DDSMastheadComposite.prototype as any)._monitorUserStatus = jasmine.createSpy();
      (DDSMastheadComposite.prototype as any)._loadSearchResults = jasmine.createSpy().and.returnValue(Promise.resolve());
      render(template({ language: 'en-US' }), document.body);
      await Promise.resolve(); // Update cycle of `<dds-masthead-composite>`
      await Promise.resolve(); // Update cycle of `<dds-masthead-search>`
      const search = document.querySelector('dds-masthead-search');
      (search!.shadowRoot!.querySelector('.bx--header__search--search') as HTMLElement).click();
      await Promise.resolve();
      const searchInputNode = search!.shadowRoot!.querySelector('.bx--header__search--input') as HTMLInputElement;
      searchInputNode.value = 'search-query-foo';
      searchInputNode.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      expect((DDSMastheadComposite.prototype as any)._loadSearchResults).toHaveBeenCalledWith('search-query-foo');
    });

    afterEach(function() {
      (DDSMastheadComposite.prototype as any)._loadSearchResults = undefined;
      (DDSMastheadComposite.prototype as any)._monitorUserStatus = undefined;
      (DDSMastheadComposite.prototype as any)._loadTranslation = undefined;
      (DDSMastheadComposite.prototype as any)._setLanguage = undefined;
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
    events.reset();
  });
});
