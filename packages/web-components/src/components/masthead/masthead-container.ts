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
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import TranslationAPI from '@carbon/ibmdotcom-services/es/services/Translation/Translation';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import 'carbon-custom-elements/es/components/ui-shell/header';
import './masthead';
import './masthead-logo';
import './masthead-menu-button';
import './masthead-search';
import './masthead-search-item';
import './masthead-global-bar';
import './masthead-profile';
import './masthead-profile-item';
import './top-nav';
import './top-nav-item';
import './top-nav-menu';
import './top-nav-menu-item';
import './left-nav';
import './left-nav-item';
import './left-nav-menu';
import './left-nav-menu-item';
import './left-nav-overlay';
import styles from './masthead.scss';

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
 * A quick link item in mega panel.
 */
export interface MegapanelQuickLink {
  title: string;
  url?: string;
}

/**
 * A quick links in mega panel.
 */
export interface MegapanelQuickLinks {
  title: string;
  links: MegapanelQuickLink[];
}

/**
 * A feature in mega panel.
 */
export interface MegapanelFeature {
  heading?: string;
  imageUrl?: string;
  linkTitle?: string;
  linkUrl?: string;
}

/**
 * A content in mega panel.
 */
export interface MegapanelContent {
  headingTitle?: string;
  headingUrl?: string;
  description?: string;
  quickLinks: MegapanelQuickLinks;
  feature: MegapanelFeature;
}

/**
 * A menu item in masthead.
 */
export interface MastheadMenuItem {
  title: string;
  url?: string;
  megapanelContent?: MegapanelContent;
}

/**
 * A menu section in masthead.
 */
export interface MastheadMenuSection {
  heading?: string;
  menuItems: MastheadMenuItem[];
}

/**
 * An item in masthead.
 */
export interface MastheadLink {
  title: string;
  url?: string;
  hasMenu?: boolean;
  hasMegapanel?: boolean;
  menuSections?: MastheadMenuSection[];
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
    url: 'https://myibm.ibm.com/?lnk=mmi',
  },
  {
    title: 'Profile',
    url: 'https://myibm.ibm.com/profile/?lnk=mmi',
  },
  {
    title: 'Billing',
    url: 'https://myibm.ibm.com/billing/?lnk=mmi',
  },
  {
    title: 'Log out',
    url: 'https://myibm.ibm.com/pkmslogout?filename=accountRedir.html',
  },
];

/**
 * The default nav items for unauthenticated state.
 */
const defaultUnauthenticateProfileItems: MastheadProfileItem[] = [
  {
    title: 'Log in',
    isLoginItem: true,
  },
];

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends LitElement {
  /**
   * The DOM element of the search UI.
   */
  @query(`${ddsPrefix}-masthead-search`)
  private _searchNode?: HTMLElement;

  /**
   * `true` to open the search dropdown.
   */
  private _openSearchDropdown = false;

  /**
   * `true` to stop further fetch operations. Should be set when this is detached from render tree.
   */
  private _shouldPreventFetch = false;

  /**
   * The promise to fetch default language.
   */
  private _promiseDefaultLanguage?: Promise<string>;

  /**
   * The promise to fetch default nav links, keyed by language.
   */
  private _promiseDefaultNavLinks: { [lang: string]: Promise<MastheadLink[]> } = {};

  /**
   * The default language.
   */
  private _defaultLanguage?: string;

  /**
   * The default nav links, keyed by language.
   */
  private _defaultNavLinks: { [lang: string]: MastheadLink[] } = {};

  /**
   * The search results to show in the UI.
   */
  private _currentSearchResults: string[] = [];

  /**
   * The query results.
   */
  private _searchResults: Map<string, string[]> = new Map();

  /**
   * The handle for the throttled listener of `mousemove` event.
   */
  private _throttledHandleInputImpl: (((event: InputEvent) => void) & Cancelable) | null = null;

  /**
   * The effective language, that reflects the real-time state (without loading).
   */
  private get _currentEffectiveLanguage() {
    return this.language || this._defaultLanguage;
  }

  /**
   * The effective nav links, that reflects the real-time state (without loading).
   */
  private get _currentEffectiveNavLinks() {
    return this.navLinks || this._defaultNavLinks[this._currentEffectiveLanguage!];
  }

  /**
   * @returns The endpoint to process the search query.
_  */
  private async _getSearchEndpoint() {
    const { _searchQueryString: searchQueryString } = this;
    const [primary, country] = (await this._getEffectiveLanguage()).split('-');
    return `https://www-api.ibm.com/search/typeahead/v1?lang=${primary}&cc=${country}&query=${searchQueryString}`;
  }

  /**
   * @returns The default language data, fetched from `LocaleAPI`. MUST BE USED FROM `._fetchDefaultLanguageAsNeeded()`.
   */
  private async _fetchDefaultLanguage() {
    const { cc: country, lc: primary } = await LocaleAPI.getLang();
    const defaultLanguage = `${primary}-${country}`;
    this._defaultLanguage = defaultLanguage;
    return defaultLanguage;
  }

  /**
   * Fetches the default language data, if it's not loaded yet.
   *
   * @returns The defualt language data.
   */
  private async _fetchDefaultLanguageAsNeeded() {
    if (!this._promiseDefaultLanguage) {
      this._promiseDefaultLanguage = this._fetchDefaultLanguage();
    }
    return this._promiseDefaultLanguage!;
  }

  /**
   * @returns The language to use in this UI.
   */
  private async _getEffectiveLanguage() {
    // If `this.language` is there, don't bother fetching the default language
    const fetchedLanguage = this.language ? undefined : await this._fetchDefaultLanguageAsNeeded();
    // If `this.language` is set while we are fetching the default language, use `this.language`
    return (this.language || fetchedLanguage)!;
  }

  /**
   * @param language The language.
   * @returns The default nav links for the given language, fetched from `TranslationAPI`.
   */
  private async _fetchDefaultNavLinks(language: string) {
    const [primary, country] = language.split('-');
    const {
      mastheadNav: { links: navLinks },
    } = await TranslationAPI.getTranslation({ cc: country.toLowerCase(), lc: primary.toLowerCase() });
    this._defaultNavLinks[language] = navLinks;
    return navLinks;
  }

  /**
   * Fetches default nav links for the given language, if it's not loaded yet.
   *
   * @param language The language.
   * @returns The default nav links for the given language.
   */
  private async _fetchDefaultNavLinksAsNeeded(language: string) {
    if (!this._promiseDefaultNavLinks[language]) {
      this._promiseDefaultNavLinks[language] = this._fetchDefaultNavLinks(language);
    }
    return this._promiseDefaultNavLinks[language]!;
  }

  /**
   * @returns The nav links to use in this UI.
   */
  private async _getEffectiveNavLinks() {
    // If `this.navLinks` is there, don't bother fetching the default nav links
    if (this.navLinks) {
      return this.navLinks;
    }
    const language = await this._getEffectiveLanguage();
    if (this._shouldPreventFetch) {
      return undefined;
    }
    // If `this.navLinks` is set while we are fetching the default language, don't bother fetching the default nav links
    const fetchedNavLinks = this.navLinks ? undefined : await this._fetchDefaultNavLinksAsNeeded(language);
    // If `this.navLinks` is set while we are fetching the default nav links, use `this.navLinks`
    return (this.navLinks ?? fetchedNavLinks)!;
  }

  /**
   * Ensures nav links are rendered.
   */
  private async _ensureNavLinks() {
    const effectiveNavLinks = await this._getEffectiveNavLinks();
    if (effectiveNavLinks !== this.navLinks) {
      this.requestUpdate();
    }
  }

  /**
   * Fetches results for the current search query string.
   */
  private async _fetchResults() {
    const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
    const endpoint = await this._getSearchEndpoint();
    if (this._shouldPreventFetch) {
      return;
    }
    const items = (await (await fetch(endpoint)).json()).response.map(([result]) => result);
    searchResults.set(searchQueryString, items);
    this._setCurrentSearchResults();
  }

  /**
   * Updates the search results to show in the UI.
   */
  private _setCurrentSearchResults() {
    const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
    for (let { length } = searchQueryString; length > 0; --length) {
      const items = searchResults.get(searchQueryString.slice(0, length));
      if (items) {
        this._currentSearchResults = items;
        this._openSearchDropdown = true;
        this.requestUpdate();
        return;
      }
    }
  }

  /**
   * Throttled version of `_handleInput()`.
   */
  private async _handleInputImpl() {
    const { _searchQueryString: searchQueryString, _searchResults: searchResults } = this;
    const cachedSearchResults = searchResults.get(searchQueryString);
    if (!cachedSearchResults) {
      this._fetchResults();
    }
    // While we fetch the search results, we see if there is a cached search results for partial search query string.
    // If so, updates the UI with the cached search results.
    this._setCurrentSearchResults();
  }

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
    const { _currentEffectiveNavLinks: currentEffectiveNavLinks } = this;
    return !currentEffectiveNavLinks
      ? undefined
      : currentEffectiveNavLinks.map(link => {
          const { menuSections = [], title, url } = link;
          const sections = menuSections
            // eslint-disable-next-line no-use-before-define
            .reduce((acc: typeof menuItems, { menuItems }) => acc.concat(menuItems), [])
            .map(({ title: menuItemTitle, url: menuItemUrl }) =>
              target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
                ? html`
                    <dds-top-nav-menu-item href="${menuItemUrl}">${menuItemTitle}</dds-top-nav-menu-item>
                  `
                : html`
                    <dds-left-nav-menu-item href="${menuItemUrl}">${menuItemTitle}</dds-left-nav-menu-item>
                  `
            );
          if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
            return sections.length === 0
              ? html`
                  <dds-top-nav-item href="${url}">${title}</dds-top-nav-item>
                `
              : html`
                  <dds-top-nav-menu menu-label="${title}" trigger-content="${title}">${sections}</dds-top-nav-menu>
                `;
          }
          return sections.length === 0
            ? html`
                <dds-left-nav-item href="${url}">${title}</dds-left-nav-item>
              `
            : html`
                <dds-left-nav-menu title="${title}">${sections}</dds-left-nav-menu>
              `;
        });
  }

  /**
   * The query string in the search box.
   */
  private get _searchQueryString() {
    return (this._searchNode as any) /* DDSMastheadSearch */?.searchQueryString ?? '';
  }

  /**
   * `true` if this masthead UI should show the authenticated status.
   */
  @property({ type: Boolean, reflect: true })
  authenticated = false;

  /**
   * The profile items for authenticated state.
   */
  @property({ attribute: false })
  authenticateProfileItems = defaultAuthenticateProfileItems;

  /**
   * The `aria-label` attribute for the top-level container.
   */
  @property({ attribute: 'masthead-label' })
  mastheadLabel!: string;

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  @property({ attribute: 'menu-bar-label' })
  menuBarLabel!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-label-active' })
  menuButtonLabelActive!: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state.
   */
  @property({ attribute: 'menu-button-label-inactive' })
  menuButtonLabelInactive!: string;

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

  connectedCallback() {
    this._shouldPreventFetch = false;
    super.connectedCallback();
  }

  disconnectedCallback() {
    if (this._throttledHandleInputImpl) {
      this._throttledHandleInputImpl.cancel();
      this._throttledHandleInputImpl = null;
    }
    this._shouldPreventFetch = true;
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('language') || changedProperties.has('navLinks')) {
      this._ensureNavLinks();
    }
    return true;
  }

  firstUpdated() {
    this._ensureNavLinks();
  }

  updated(changedProperties) {
    if (changedProperties.has('inputTimeout')) {
      if (this._throttledHandleInputImpl) {
        this._throttledHandleInputImpl.cancel();
        this._throttledHandleInputImpl = null;
      }
      this._throttledHandleInputImpl = throttle(this._handleInputImpl, this.inputTimeout);
    }
  }

  render() {
    const {
      authenticated,
      authenticateProfileItems,
      mastheadLabel,
      menuBarLabel,
      menuButtonLabelActive,
      menuButtonLabelInactive,
      loginNonce,
      unauthenticatedProfileItems,
      _currentSearchResults: currentSearchResults,
      _handleInputSearch: handleInputSearch,
      _openSearchDropdown: openSearchDropdown,
    } = this;
    const searchParams = new URLSearchParams();
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
      <dds-masthead aria-label="${ifNonNull(mastheadLabel)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonLabelActive)}"
          button-label-inactive="${ifNonNull(menuButtonLabelInactive)}"
        >
        </dds-masthead-menu-button>
        <dds-masthead-logo href="javascript:void 0"></dds-masthead-logo>
        <dds-top-nav menu-bar-label="${ifNonNull(menuBarLabel)}">
          ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
        </dds-top-nav>
        <dds-masthead-search ?open="${openSearchDropdown}" @input="${handleInputSearch}">
          ${currentSearchResults.map(
            item =>
              html`
                <dds-masthead-search-item text="${item}"></dds-masthead-search-item>
              `
          )}
        </dds-masthead-search>
        <dds-masthead-global-bar>
          <dds-masthead-profile ?authenticated="${authenticated}">
            ${profileItems.map(({ isLoginItem, title, url }) => {
              const href = !isLoginItem ? url : loginUrl;
              return html`
                <dds-masthead-profile-item href="${ifNonNull(href)}">${title}</dds-masthead-profile-item>
              `;
            })}
          </dds-masthead-profile>
        </dds-masthead-global-bar>
      </dds-masthead>
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
      </dds-left-nav>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadContainer;
