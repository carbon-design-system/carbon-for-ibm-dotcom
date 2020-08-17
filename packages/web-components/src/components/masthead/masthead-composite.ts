/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import throttle from 'lodash-es/throttle';
import { html, property, query, customElement, LitElement } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { MastheadLink, Translation } from '../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS } from '../../globals/services-store/types/profileAPI';
import store from '../../globals/services-store/store';
import './masthead';
import './masthead-logo';
import './masthead-menu-button';
import './masthead-search';
import './masthead-search-item';
import './masthead-global-bar';
import './masthead-profile';
import './masthead-profile-item';
import './top-nav';
import './top-nav-name';
import './top-nav-item';
import './top-nav-menu';
import './top-nav-menu-item';
import './left-nav';
import './left-nav-name';
import './left-nav-item';
import './left-nav-menu';
import './left-nav-menu-item';
import './left-nav-overlay';
import styles from './masthead.scss';

export { default as reducers } from '../../globals/services-store/reducers';
export { store };

const { stablePrefix: ddsPrefix } = ddsSettings;

interface Cancelable {
  cancel(): void;
}

/**
 * Rendering target for masthead navigation items.
 */
enum NAV_ITEMS_RENDER_TARGET {
  /**
   * For top navigation.
   */
  TOP_NAV = 'tpo-nav',

  /**
   * For left navigation.
   */
  LEFT_NAV = 'left-nav',
}

/**
 * An profile item in masthead.
 */
export interface MastheadProfileItem {
  /**
   * `true` if this profile item is for logging in.
   */
  isLoginItem?: boolean;

  /**
   * The key identifying this profile item within the menu.
   */
  key: string;

  /**
   * The title text.
   */
  title: string;

  /**
   * The link URL.
   */
  url?: string;
}

/**
 * The default nav items for authenticated state.
 */
const defaultAuthenticateProfileItems: MastheadProfileItem[] = [
  {
    title: 'My IBM',
    key: 'my-ibm',
    url: 'https://myibm.ibm.com/?lnk=mmi',
  },
  {
    title: 'Profile',
    key: 'profile',
    url: 'https://myibm.ibm.com/profile/?lnk=mmi',
  },
  {
    title: 'Billing',
    key: 'billing',
    url: 'https://myibm.ibm.com/billing/?lnk=mmi',
  },
  {
    title: 'Log out',
    key: 'logout',
    url: 'https://myibm.ibm.com/pkmslogout?filename=accountRedir.html',
  },
];

/**
 * The default nav items for unauthenticated state.
 */
const defaultUnauthenticateProfileItems: MastheadProfileItem[] = [
  {
    title: 'Log in',
    key: 'login',
    isLoginItem: true,
  },
];

/**
 * Component that rendres masthead from links, etc. data.
 *
 * @element dds-masthead-composite
 */
@customElement(`${ddsPrefix}-masthead-composite`)
class DDSMastheadComposite extends LitElement {
  /**
   * The DOM element of the search UI.
   */
  @query(`${ddsPrefix}-masthead-search`)
  private _searchNode?: HTMLElement;

  /**
   * The placeholder for `loadLanguage()` Redux action that will be mixed in.
   */
  protected _loadLanguage!: () => Promise<string>;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   */
  private _setLanguage!: (string) => void;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   */
  private _loadTranslation!: () => Promise<Translation>;

  /**
   * The placeholder for `monitorUserStatus()` Redux action that will be mixed in.
   */
  private _monitorUserStatus!: () => void;

  /**
   * The placeholder for `_handleInputImpl()`, throttled version of `_handleInput()`, that should be overriden.
   */
  protected _handleInputImpl() {} // eslint-disable-line class-methods-use-this

  /**
   * `true` to open the search dropdown.
   */
  protected _openSearchDropdown = false;

  /**
   * The search results to show in the UI.
   */
  protected _currentSearchResults: string[] = [];

  /**
   * The query results.
   */
  protected _searchResults: Map<string, string[]> = new Map();

  /**
   * The query string in the search box.
   */
  protected get _searchQueryString() {
    return (this._searchNode as any) /* DDSMastheadSearch */?.searchQueryString ?? '';
  }

  /**
   * The handle for the throttled listener of `mousemove` event.
   */
  private _throttledHandleInputImpl: (((event: InputEvent) => void) & Cancelable) | null = null;

  /**
   * Handles `input` event on the search form.
   *
   * @param event The event.
   */
  private async _handleInputSearch(event: InputEvent) {
    this._throttledHandleInputImpl?.(event);
  }

  /**
   * @param options The options.
   * @param options.target The target of rendering navigation items.
   * @returns The nav items.
   */
  private _renderNavItems({ target }: { target: NAV_ITEMS_RENDER_TARGET }) {
    const { navLinks } = this;
    return !navLinks
      ? undefined
      : navLinks.map((link, i) => {
          const { menuSections = [], title, url } = link;
          const sections = menuSections
            // eslint-disable-next-line no-use-before-define
            .reduce((acc: typeof menuItems, { menuItems }) => acc.concat(menuItems), [])
            .map(({ title: menuItemTitle, url: menuItemUrl }, j) =>
              target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
                ? html`
                    <dds-top-nav-menu-item
                      href="${menuItemUrl}"
                      title="${menuItemTitle}"
                      data-autoid="${ddsPrefix}--masthead__l0-nav--subnav-col${i}-item${j}"
                    ></dds-top-nav-menu-item>
                  `
                : html`
                    <dds-left-nav-menu-item
                      href="${menuItemUrl}"
                      title="${menuItemTitle}"
                      data-autoid="${ddsPrefix}--masthead__l0-sidenav--subnav-col${i}-item${j}"
                    ></dds-left-nav-menu-item>
                  `
            );
          if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
            return sections.length === 0
              ? html`
                  <dds-top-nav-item
                    href="${url}"
                    title="${title}"
                    data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                  ></dds-top-nav-item>
                `
              : html`
                  <dds-top-nav-menu
                    menu-label="${title}"
                    trigger-content="${title}"
                    data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                  >
                    ${sections}
                  </dds-top-nav-menu>
                `;
          }
          return sections.length === 0
            ? html`
                <dds-left-nav-item
                  href="${url}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}"
                ></dds-left-nav-item>
              `
            : html`
                <dds-left-nav-menu title="${title}" data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}">
                  ${sections}
                </dds-left-nav-menu>
              `;
        });
  }

  /**
   * `true` to activate the search box.
   */
  @property({ attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state.
   */
  @property({ attribute: false })
  authenticateProfileItems = defaultAuthenticateProfileItems;

  /**
   * The brand name.
   */
  @property({ attribute: 'brand-name' })
  brandName!: string;

  /**
   * The `aria-label` attribute for the top-level container.
   */
  @property({ attribute: 'masthead-assistive-text' })
  mastheadAssistiveText!: string;

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  @property({ attribute: 'menu-bar-assistive-text' })
  menuBarAssistiveText!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-assistive-text-active' })
  menuButtonAssistiveTextActive!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-assistive-text-inactive' })
  menuButtonAssistiveTextInactive!: string;

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedProfileItems = defaultUnauthenticateProfileItems;

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number })
  inputTimeout = 200;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * The nonce used for logging in.
   */
  @property({ attribute: 'login-nonce' })
  loginNonce?: string;

  /**
   * The navigation links.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

  /**
   * The user authentication status.
   */
  @property({ attribute: 'user-status' })
  userStatus?: USER_AUTHENTICATION_STATUS;

  createRenderRoot() {
    // We render child elements of `<dds-masthead-container>` by ourselves
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    if (this._throttledHandleInputImpl) {
      this._throttledHandleInputImpl.cancel();
      this._throttledHandleInputImpl = null;
    }
    super.disconnectedCallback();
  }

  firstUpdated() {
    const { language, navLinks } = this;
    if (language) {
      this._setLanguage(language);
    }
    if (!navLinks) {
      this._loadTranslation().catch(() => {}); // The error is logged in the Redux store
    }
    this._monitorUserStatus();
  }

  updated(changedProperties) {
    if (changedProperties.has('inputTimeout')) {
      if (this._throttledHandleInputImpl) {
        this._throttledHandleInputImpl.cancel();
        this._throttledHandleInputImpl = null;
      }
      this._throttledHandleInputImpl = throttle(this._handleInputImpl, this.inputTimeout);
    }
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage(language);
      }
    }
  }

  render() {
    const {
      activateSearch,
      authenticateProfileItems,
      brandName,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      loginNonce,
      unauthenticatedProfileItems,
      userStatus,
      _currentSearchResults: currentSearchResults,
      _handleInputSearch: handleInputSearch,
      _openSearchDropdown: openSearchDropdown,
    } = this;
    const searchParams = new URLSearchParams();
    const authenticated = userStatus === USER_AUTHENTICATION_STATUS.AUTHENTICATED;
    if (!authenticated) {
      searchParams.append('response_type', 'token');
      searchParams.append('client_id', 'v18loginprod');
      searchParams.append('state', this.ownerDocument!.defaultView!.location.href);
      searchParams.append('redirect_uri', 'https://myibm.ibm.com/OIDCHandler.html');
      searchParams.append('scope', 'openid');
      if (loginNonce) {
        searchParams.append('nonce', loginNonce);
      }
    }
    const loginUrl = `https://idaas.iam.ibm.com/idaas/oidc/endpoint/default/authorize?${searchParams.toString()}`;
    const profileItems = authenticated ? authenticateProfileItems : unauthenticatedProfileItems;
    return html`
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
        >
        </dds-masthead-menu-button>
        <dds-masthead-logo></dds-masthead-logo>
        ${!brandName
          ? undefined
          : html`
              <dds-top-nav-name>${brandName}</dds-top-nav-name>
            `}
        <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}">
          ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
        </dds-top-nav>
        <dds-masthead-search ?active="${activateSearch}" ?open="${openSearchDropdown}" @input="${handleInputSearch}">
          ${currentSearchResults.map(
            item =>
              html`
                <dds-masthead-search-item text="${item}"></dds-masthead-search-item>
              `
          )}
        </dds-masthead-search>
        <dds-masthead-global-bar>
          <dds-masthead-profile ?authenticated="${authenticated}">
            ${profileItems.map(({ isLoginItem, key, title, url }) => {
              const href = !isLoginItem ? url : loginUrl;
              return html`
                <dds-masthead-profile-item href="${ifNonNull(href)}" key="${key}">${title}</dds-masthead-profile-item>
              `;
            })}
          </dds-masthead-profile>
        </dds-masthead-global-bar>
      </dds-masthead>
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${!brandName
          ? undefined
          : html`
              <dds-left-nav-name>${brandName}</dds-left-nav-name>
            `}
        ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
      </dds-left-nav>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadComposite;
