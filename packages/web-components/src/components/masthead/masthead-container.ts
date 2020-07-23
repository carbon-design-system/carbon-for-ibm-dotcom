/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import throttle from 'lodash-es/throttle';
import { ActionCreatorsMapObject, Dispatch, Store, bindActionCreators } from 'redux';
import { html, property, query, customElement, LitElement } from 'lit-element';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { LocaleAPIState } from '../../globals/services-store/types/localeAPI';
import { MastheadLink, Translation, TranslateAPIState } from '../../globals/services-store/types/translateAPI';
import store from '../../globals/services-store/store';
import { loadLanguage, setLanguage } from '../../globals/services-store/actions/localeAPI';
import { loadTranslation } from '../../globals/services-store/actions/translateAPI';
import ConnectMixin from '../../globals/mixins/connect';
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
   * The title text.
   */
  title: string;

  /**
   * The link URL.
   */
  url?: string;
}

/**
 * The Redux state used for `<dds-masthead-container>`.
 */
export interface MastheadContainerState {
  /**
   * The Redux state for `LocaleAPI`.
   */
  localeAPI?: LocaleAPIState;

  /**
   * The Redux state for `TranslateAPI`.
   */
  translateAPI?: TranslateAPIState;
}

/**
 * The properties for `<dds-masthead-container>` from Redux state.
 */
interface MastheadContainerStateProps {
  /**
   * The nav links.
   */
  navLinks?: MastheadLink[];
}

type MastheadActions = ReturnType<typeof loadLanguage> | ReturnType<typeof setLanguage> | ReturnType<typeof loadTranslation>;

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
 * @param state The Redux state for masthead.
 * @returns The converted version of the given state, tailored for `<dds-masthead-container>`.
 */
function mapStateToProps(state: MastheadContainerState): MastheadContainerStateProps {
  const { localeAPI, translateAPI } = state;
  const { language } = localeAPI ?? {};
  const { translations } = translateAPI ?? {};
  return {
    navLinks: !language ? undefined : translations?.[language]?.mastheadNav?.links,
  };
}

/**
 * @param dispatch The Redux `dispatch()` API.
 * @returns The methods in `<dds-masthead-container>` to dispatch Redux actions.
 */
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators<MastheadActions, ActionCreatorsMapObject<MastheadActions>>(
    {
      _loadLanguage: loadLanguage,
      _setLanguage: setLanguage,
      _loadTranslation: loadTranslation,
    },
    dispatch
  );
}

/**
 * Container component for masthead.
 *
 * @element dds-masthead-container
 */
@customElement(`${ddsPrefix}-masthead-container`)
class DDSMastheadContainer extends ConnectMixin<
  MastheadContainerState,
  MastheadContainerStateProps,
  ActionCreatorsMapObject<MastheadActions>
>(
  store as Store<MastheadContainerState>,
  mapStateToProps,
  mapDispatchToProps
)(LitElement) {
  /**
   * The DOM element of the search UI.
   */
  @query(`${ddsPrefix}-masthead-search`)
  private _searchNode?: HTMLElement;

  /**
   * The placeholder for `loadLanguage()` Redux action that will be mixed in.
   */
  private _loadLanguage!: () => Promise<string>;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   */
  private _setLanguage!: (string) => void;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   */
  private _loadTranslation!: () => Promise<Translation>;

  /**
   * `true` to open the search dropdown.
   */
  private _openSearchDropdown = false;

  /**
   * `true` to stop further fetch operations. Should be set when this is detached from render tree.
   */
  private _shouldPreventFetch = false;

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
   * @returns The endpoint to process the search query.
_  */
  private async _getSearchEndpoint() {
    const { _searchQueryString: searchQueryString } = this;
    const language = await this._loadLanguage();
    const [primary, country] = language!.split('-');
    return `https://www-api.ibm.com/search/typeahead/v1?lang=${primary}&cc=${country}&query=${searchQueryString}`;
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
   * The brand name.
   */
  @property({ attribute: 'brand-name' })
  brandName!: string;

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

  createRenderRoot() {
    // We render child elements of `<dds-masthead-container>` by ourselves
    return this;
  }

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

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage(language);
    }
    this._loadTranslation();
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
      authenticated,
      authenticateProfileItems,
      brandName,
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
          button-label="Open menu"
          title="Open menu"
        >
        </dds-masthead-menu-button>
        <dds-masthead-logo href="javascript:void 0"></dds-masthead-logo>
        ${!brandName
          ? undefined
          : html`
              <dds-top-nav-name>${brandName}</dds-top-nav-name>
            `}
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

export default DDSMastheadContainer;
