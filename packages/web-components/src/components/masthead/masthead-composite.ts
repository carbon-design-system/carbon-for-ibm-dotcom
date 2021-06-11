/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import { nothing } from 'lit-html';
import ArrowRight16 from 'carbon-web-components/es/icons/arrow--right/16.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { globalInit } from '@carbon/ibmdotcom-services/es/services/global/global';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg';
import MastheadLogoAPI from '@carbon/ibmdotcom-services/es/services/MastheadLogo/MastheadLogo';
import {
  MastheadL1,
  MastheadLink,
  MastheadLogoData,
  MastheadMenuItem,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { UNAUTHENTICATED_STATUS } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME } from './megamenu-right-navigation';
import './masthead';
import './masthead-logo';
import './masthead-l1';
import './masthead-l1-name';
import './masthead-menu-button';
import './masthead-global-bar';
import './masthead-profile';
import './masthead-profile-item';
import './megamenu';
import './megamenu-top-nav-menu';
import './megamenu-left-navigation';
import './megamenu-category-link';
import './megamenu-category-group';
import './megamenu-category-group-copy';
import './megamenu-link-with-icon';
import './megamenu-overlay';
import './top-nav';
import './top-nav-l1';
import './top-nav-name';
import './top-nav-item';
import './top-nav-menu';
import './top-nav-menu-item';
import './left-nav';
import './left-nav-name';
import './left-nav-item';
import './left-nav-menu';
import './left-nav-menu-item';
import './left-nav-menu-category-heading';
import './left-nav-overlay';
import './masthead-search-composite';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Rendering target for masthead navigation items.
 */
export enum NAV_ITEMS_RENDER_TARGET {
  /**
   * For top navigation.
   */
  TOP_NAV = 'top-nav',

  /**
   * For left navigation.
   */
  LEFT_NAV = 'left-nav',
}

/**
 * Component that renders masthead from links, etc. data.
 *
 * @element dds-masthead-composite
 */
@customElement(`${ddsPrefix}-masthead-composite`)
class DDSMastheadComposite extends LitElement {
  /**
   * Renders L1 menu based on l1Data
   *
   * @param [options] The options.
   * @param [options.selectedMenuItem] The selected nav item.
   * @returns The L1 nav.
   */
  protected _renderL1({ selectedMenuItem }: { selectedMenuItem?: string } = {}) {
    if (!this.l1Data) return undefined;
    const { url, title } = this.l1Data;
    return html`
      <dds-masthead-l1 slot="masthead-l1">
        ${!title
          ? undefined
          : html`
              <dds-masthead-l1-name title="${title}" aria-selected="${!selectedMenuItem}" url="${url}"></dds-masthead-l1-name>
            `}
        <dds-top-nav-l1
          >${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, hasL1: true })}</dds-top-nav-l1
        >
      </dds-masthead-l1>
    `;
  }

  /**
   * Renders masthead logo
   *
   */
  protected _renderLogo() {
    if (!this.logoData)
      return html`
        <dds-masthead-logo ?hide-logo="${this.activateSearch}"></dds-masthead-logo>
      `;
    const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(this.logoData);
    const { tooltip, svg } = this.logoData;
    return html`
      <dds-masthead-logo
        ?hide-logo="${this.activateSearch}"
        ?hasTooltip="${tooltip}"
        aria-label="${ifNonNull(tooltip)}"
        tabIndex="0"
        >${useAlternateLogo ? unsafeSVG(svg) : nothing}</dds-masthead-logo
      >
    `;
  }

  /**
   * Sorts highlighted and regular menu items in separate arrays
   * and returns view all link
   *
   * @param sections menu section data object
   */
  // eslint-disable-next-line class-methods-use-this
  protected _getHighlightedMenuItems(sections) {
    const highlightedItems: MastheadMenuItem[] = [];
    let viewAllLink;
    const menu: MastheadMenuItem[] = [];

    sections[0]?.menuItems?.forEach((item: MastheadMenuItem) => {
      if (item.highlighted) return highlightedItems.push(item);
      if (item.megaPanelViewAll) {
        viewAllLink = item;
        return viewAllLink;
      }
      return menu.push(item);
    });

    return { viewAllLink, highlightedItems, menu };
  }

  /**
   *  Render MegaMenu content
   *
   * @param sections menu section data object
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenu(sections) {
    const { viewAllLink, highlightedItems, menu } = this._getHighlightedMenuItems(sections);

    const hasHighlights = highlightedItems.length !== 0;
    return html`
      <dds-megamenu>
        ${hasHighlights
          ? html`
              <dds-megamenu-left-navigation>
                ${sections[0]?.heading &&
                  html`
                    <dds-megamenu-category-group-copy>${sections[0]?.heading}</dds-megamenu-category-group-copy>
                  `}
                ${highlightedItems.map((item, i) => {
                  const autoid = `${ddsPrefix}--masthead__l0-nav-list${i}`;
                  return html`
                    <dds-megamenu-category-group data-autoid="${autoid}" href="${item.url}" title="${item.title}">
                      <dds-megamenu-category-group-copy>${item.megapanelContent?.description}</dds-megamenu-category-group-copy>
                      ${item.megapanelContent?.quickLinks?.links.map(({ title, url, highlightedLink }, key) => {
                        return html`
                          ${highlightedLink
                            ? html`
                                <dds-megamenu-link-with-icon
                                  data-autoid="${autoid}-item${key}"
                                  href="${url}"
                                  style-scheme="category-sublink"
                                  title="${title}"
                                >
                                  <span>${title}</span>${ArrowRight16({ slot: 'icon' })}
                                </dds-megamenu-link-with-icon>
                              `
                            : html`
                                <dds-megamenu-category-link data-autoid="${autoid}-item${key}" title="${title}" href="${url}">
                                </dds-megamenu-category-link>
                              `}
                        `;
                      })}
                    </dds-megamenu-category-group>
                  `;
                })}
              </dds-megamenu-left-navigation>
            `
          : null}
        <dds-megamenu-right-navigation
          style-scheme="${hasHighlights
            ? MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.LEFT_SECTION
            : MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.REGULAR}"
          view-all-href="${ifNonNull(viewAllLink?.url)}"
          view-all-title="${ifNonNull(viewAllLink?.title)}"
        >
          ${menu.map((item, j) => {
            const autoid = `${ddsPrefix}--masthead__l0-nav-list${j + highlightedItems.length}`;
            return html`
              <dds-megamenu-category-group data-autoid="${autoid}" href="${item.url}" title="${item.title}">
                ${item.megapanelContent?.quickLinks?.links.map(({ title, url }, key) => {
                  return html`
                    <dds-megamenu-category-link data-autoid="${autoid}-item${key}" title="${title}" href="${url}">
                    </dds-megamenu-category-link>
                  `;
                })}
              </dds-megamenu-category-group>
            `;
          })}
        </dds-megamenu-right-navigation>
      </dds-megamenu>
    `;
  }

  /**
   *  Render MegaMenu mobile content
   *
   * @param sections menu section data object
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMobileMegaMenu(sections) {
    const { viewAllLink, highlightedItems, menu } = this._getHighlightedMenuItems(sections);
    const menuItems = highlightedItems.concat(menu);
    if (viewAllLink) {
      menuItems.push(viewAllLink);
    }

    return html`
      ${sections[0]?.heading &&
        html`
          <dds-left-nav-menu-category-heading>${sections[0]?.heading}</dds-left-nav-menu-category-heading>
        `}
      ${menuItems.map((item, i) => {
        const lastHighlighted = i + 1 === highlightedItems.length;
        return item.megapanelContent?.quickLinks?.links
          ? html`
              <dds-left-nav-menu
                ?last-highlighted=${lastHighlighted}
                title="${item.title}"
                data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav${i}"
              >
                ${item.megapanelContent?.quickLinks?.links.map(({ title, url }, j) => {
                  return html`
                    <dds-left-nav-menu-item
                      href="${url}"
                      title="${title}"
                      data-autoid="${ddsPrefix}--masthead__l0-sidenav--subnav-col${j}-item${j}"
                    ></dds-left-nav-menu-item>
                  `;
                })}
              </dds-left-nav-menu>
            `
          : html`
              <dds-left-nav-menu-item
                ?last-highlighted=${lastHighlighted}
                href="${item.url}"
                title="${item.title}"
                data-autoid="${ddsPrefix}--masthead__l0-sidenav--subnav-col${i}-item${i}"
              ></dds-left-nav-menu-item>
            `;
      })}
    `;
  }

  /**
   * @param options The options.
   * @param [options.selectedMenuItem] The selected nav item.
   * @param options.target The target of rendering navigation items.
   * @returns The nav items.
   */
  protected _renderNavItems({
    selectedMenuItem,
    target,
    hasL1,
  }: {
    selectedMenuItem?: string;
    target: NAV_ITEMS_RENDER_TARGET;
    hasL1: boolean;
  }) {
    const { navLinks, l1Data } = this;
    let menu: MastheadLink[] | undefined = navLinks;
    const autoid = `${ddsPrefix}--masthead__${l1Data?.menuItems ? 'l1' : 'l0'}`;
    if (hasL1) {
      menu = l1Data?.menuItems;
    }
    return !menu
      ? undefined
      : menu.map((link, i) => {
          const { menuSections = [], title, titleEnglish, url } = link;
          const selected = selectedMenuItem && titleEnglish === selectedMenuItem;
          let sections;
          if (link.hasMegapanel) {
            sections =
              target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
                ? this._renderMegaMenu(menuSections)
                : this._renderMobileMegaMenu(menuSections);
          } else {
            sections = menuSections
              // eslint-disable-next-line no-use-before-define
              .reduce((acc: typeof menuItems, { menuItems }) => acc.concat(menuItems), [])
              .map(({ title: menuItemTitle, url: menuItemUrl }, j) =>
                target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
                  ? html`
                      <dds-top-nav-menu-item
                        href="${menuItemUrl}"
                        title="${menuItemTitle}"
                        data-autoid="${autoid}-nav--subnav-col${i}-item${j}"
                      ></dds-top-nav-menu-item>
                    `
                  : html`
                      <dds-left-nav-menu-item
                        href="${menuItemUrl}"
                        title="${menuItemTitle}"
                        data-autoid="${autoid}-sidenav--subnav-col${i}-item${j}"
                      ></dds-left-nav-menu-item>
                    `
              );
          }
          if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
            if (sections.length === 0) {
              return html`
                <dds-top-nav-item
                  ?active="${selected}"
                  href="${url}"
                  title="${title}"
                  data-autoid="${autoid}-nav--nav${i}"
                ></dds-top-nav-item>
              `;
            }
            if (link.hasMegapanel) {
              return html`
                <dds-megamenu-top-nav-menu
                  ?active="${selected}"
                  menu-label="${title}"
                  trigger-content="${title}"
                  data-autoid="${autoid}-nav--nav${i}"
                >
                  ${sections}
                </dds-megamenu-top-nav-menu>
              `;
            }
            return html`
              <dds-top-nav-menu
                ?active="${selected}"
                menu-label="${title}"
                trigger-content="${title}"
                data-autoid="${autoid}-nav--nav${i}"
              >
                ${sections}
              </dds-top-nav-menu>
            `;
          }
          return sections.length === 0
            ? html`
                <dds-left-nav-item
                  ?active="${selected}"
                  href="${url}"
                  title="${title}"
                  data-autoid="${autoid}-sidenav--nav${i}"
                ></dds-left-nav-item>
              `
            : html`
                <dds-left-nav-menu ?active="${selected}" title="${title}" data-autoid="${autoid}-sidenav--nav${i}">
                  ${sections}
                </dds-left-nav-menu>
              `;
        });
  }

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string, dataEndpoint?: string) => Promise<Translation>;

  /**
   * The placeholder for `loadUserStatus()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadUserStatus?: () => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

  /**
   * `true` if there is a profile.
   */
  @property({ type: Boolean, attribute: 'has-profile' })
  hasProfile = true;

  /**
   * `true` if there is a search.
   */
  @property({ type: Boolean, attribute: 'has-search' })
  hasSearch = true;

  /**
   * `true` to activate the search box.
   */
  @property({ type: Boolean, attribute: 'activate-search' })
  activateSearch = false;

  /**
   * `true` sets search to active when page loads.
   */
  @property({ attribute: 'search-open-on-load' })
  searchOpenOnload = this.activateSearch;

  /**
   * The profile items for authenticated state.
   */
  @property({ attribute: false })
  authenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The platform name.
   */
  @property()
  platform!: string;

  /**
   * The platform url.
   */
  @property({ attribute: 'platform-url' })
  platformUrl?: string;

  /**
   * The brand name.
   *
   * @deprecated brandName use platform instead
   */
  @property({ attribute: 'brand-name' })
  brandName!: string;

  /**
   * The search results to show in the UI.
   */
  @property({ attribute: false })
  currentSearchResults: string[] = [];

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
   * The English title of the selected nav item.
   */
  @property({ attribute: 'selected-menu-item' })
  selectedMenuItem!: string;

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedProfileItems?: MastheadProfileItem[];

  /**
   * Specify translation endpoint if not using default dds endpoint.
   */
  @property({ attribute: 'data-endpoint' })
  dataEndpoint?: string;

  /**
   * The throttle timeout to run query upon user input.
   */
  @property({ type: Number, attribute: 'input-timeout' })
  inputTimeout = 200;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * The navigation links.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

  /**
   * Logo data
   */
  @property({ attribute: false })
  logoData?: MastheadLogoData;

  /**
   * Data for l1.
   */
  @property({ attribute: false })
  l1Data?: MastheadL1;

  /**
   * `true` to open the search dropdown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'open-search-dropdown' })
  openSearchDropdown = false;

  /**
   * Value to display when the input has an empty `value`.
   */
  @property()
  searchPlaceholder?: string;

  /**
   * The user authentication status.
   */
  @property({ attribute: 'user-status' })
  userStatus = UNAUTHENTICATED_STATUS;

  createRenderRoot() {
    // We render child elements of `<dds-masthead-container>` by ourselves
    return this;
  }

  firstUpdated() {
    const { language, dataEndpoint } = this;
    globalInit();
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language, dataEndpoint).catch(() => {}); // The error is logged in the Redux store
    this._loadUserStatus?.();
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language, dataEndpoint } = this;
      if (language) {
        this._setLanguage?.(language);
        this._loadTranslation?.(language, dataEndpoint).catch(() => {}); // The error is logged in the Redux store
      }
    }
    if (changedProperties.has('brandName')) {
      this.platform = this.brandName;
      // eslint-disable-next-line no-console
      console.warn('`brand-name` will be deprecated in the future use `platform` instead.');
    }
  }

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      currentSearchResults,
      platform,
      platformUrl,
      hasProfile,
      inputTimeout,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      language,
      openSearchDropdown,
      hasSearch,
      searchPlaceholder,
      selectedMenuItem,
      unauthenticatedProfileItems,
      userStatus,
      l1Data,
      _loadSearchResults: loadSearchResults,
    } = this;
    const authenticated = userStatus !== UNAUTHENTICATED_STATUS;
    const profileItems = authenticated ? authenticatedProfileItems : unauthenticatedProfileItems;
    return html`
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${!platform
          ? undefined
          : html`
              <dds-left-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-left-nav-name>
            `}
        ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV, hasL1: !!l1Data })}
      </dds-left-nav>
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
          ?hide-menu-button="${activateSearch}"
        >
        </dds-masthead-menu-button>

        ${this._renderLogo()}
        ${!platform || l1Data
          ? undefined
          : html`
              <dds-top-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-top-nav-name>
            `}
        ${l1Data
          ? undefined
          : html`
              <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}" ?hideNav="${activateSearch}">
                ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, hasL1: false })}
              </dds-top-nav>
            `}
        ${!hasSearch
          ? undefined
          : html`
              <dds-masthead-search-composite
                ?active="${activateSearch}"
                input-timeout="${inputTimeout}"
                language="${ifNonNull(language)}"
                ?open="${openSearchDropdown}"
                ?searchOpenOnload="${activateSearch}"
                placeholder="${ifNonNull(searchPlaceholder)}"
                .currentSearchResults="${ifNonNull(currentSearchResults)}"
                ._loadSearchResults="${ifNonNull(loadSearchResults)}"
              ></dds-masthead-search-composite>
            `}
        <dds-masthead-global-bar>
          ${!hasProfile
            ? undefined
            : html`
                <dds-masthead-profile ?authenticated="${authenticated}">
                  ${profileItems?.map(
                    ({ title, url }) =>
                      html`
                        <dds-masthead-profile-item href="${ifNonNull(url)}">${title}</dds-masthead-profile-item>
                      `
                  )}
                </dds-masthead-profile>
              `}
        </dds-masthead-global-bar>
        ${!l1Data ? undefined : this._renderL1({ selectedMenuItem })}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadComposite;
