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
import './left-nav-menu-item-highlighted';
import './left-nav-menu-highlighted';
import './left-nav-overlay';
import './masthead-search-composite';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Rendering target for masthead navigation items.
 */
enum NAV_ITEMS_RENDER_TARGET {
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
 * Component that rendres masthead from links, etc. data.
 *
 * @element dds-masthead-composite
 */
@customElement(`${ddsPrefix}-masthead-composite`)
class DDSMastheadComposite extends LitElement {
  /**
   * Renders the L1 Items
   *
   * @param options The options.
   * @param [options.selectedMenuItem] The selected nav item.
   * @param options.target The target of rendering navigation items.
   */
  private _renderL1Items({ selectedMenuItem, target }: { selectedMenuItem?: string; target: NAV_ITEMS_RENDER_TARGET }) {
    if (!this.l1Data) return undefined;
    const { menuItems } = this.l1Data;
    if (menuItems) {
      return target === NAV_ITEMS_RENDER_TARGET.TOP_NAV
        ? html`
            <dds-top-nav-l1>
              ${menuItems.map((elem, i) => {
                return elem.menuItems
                  ? html`
                      <dds-top-nav-menu
                        ?active="${selectedMenuItem && elem.titleEnglish === selectedMenuItem}"
                        menu-label="${elem.title}"
                        trigger-content="${elem.title}"
                        data-autoid="${ddsPrefix}--masthead__l1-nav--nav-${i}"
                      >
                        ${elem.menuItems.map(
                          (item, j) => html`
                            <dds-top-nav-menu-item
                              href="${item.url}"
                              title="${item.title}"
                              data-autoid="${ddsPrefix}--masthead__l1-nav--subnav-col${i}-item${j}"
                            ></dds-top-nav-menu-item>
                          `
                        )}
                      </dds-top-nav-menu>
                    `
                  : html`
                      <dds-top-nav-item
                        ?active="${selectedMenuItem && elem.titleEnglish === selectedMenuItem}"
                        href="${elem.url}"
                        title="${elem.title}"
                        data-autoid="${ddsPrefix}--masthead__l1-nav--nav-${i}"
                      ></dds-top-nav-item>
                    `;
              })}
            </dds-top-nav-l1>
          `
        : menuItems.map((elem, i) =>
            elem.menuItems
              ? html`
                  <dds-left-nav-menu
                    ?active="${selectedMenuItem && elem.titleEnglish === selectedMenuItem}"
                    title="${elem.title}"
                    data-autoid="${ddsPrefix}--masthead__l1-sidenav--nav-${i}"
                  >
                    ${elem.menuItems.map(
                      (item, j) => html`
                        <dds-left-nav-menu-item
                          href="${item.url}"
                          title="${item.title}"
                          data-autoid="${ddsPrefix}--masthead__l1-sidenav--subnav-col${i}-item${j}"
                        ></dds-left-nav-menu-item>
                      `
                    )}
                  </dds-left-nav-menu>
                `
              : html`
                  <dds-left-nav-item
                    ?active="${selectedMenuItem && elem.titleEnglish === selectedMenuItem}"
                    href="${elem.url}"
                    title="${elem.title}"
                    data-autoid="${ddsPrefix}--masthead__l1-sidenav--nav-${i}"
                  ></dds-left-nav-item>
                `
          );
    }

    return undefined;
  }

  /**
   * Renders L1 menu based on l1Data
   *
   * @param [options] The options.
   * @param [options.selectedMenuItem] The selected nav item.
   * @returns The L1 nav.
   */
  private _renderL1({ selectedMenuItem }: { selectedMenuItem?: string } = {}) {
    if (!this.l1Data) return undefined;
    const { url, title } = this.l1Data;
    return html`
      <dds-masthead-l1 slot="masthead-l1">
        ${!title
          ? undefined
          : html`
              <dds-masthead-l1-name title="${title}" url="${url}"></dds-masthead-l1-name>
            `}
        ${this._renderL1Items({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
      </dds-masthead-l1>
    `;
  }

  /**
   * Renders masthead logo
   *
   */
  private _renderLogo() {
    if (!this.logoData)
      return html`
        <dds-masthead-logo></dds-masthead-logo>
      `;
    const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(this.logoData);
    const { tooltip, svg } = this.logoData;
    return html`
      <dds-masthead-logo ?hasTooltip="${tooltip}" aria-label="${ifNonNull(tooltip)}"
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
  private _getHighlightedMenuItems(sections) {
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
  private _renderMegaMenu(sections) {
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
  private _renderMobileMegaMenu(sections) {
    const { viewAllLink, highlightedItems, menu } = this._getHighlightedMenuItems(sections);
    const menuItems = viewAllLink ? menu.concat(viewAllLink) : menu;

    return html`
      ${sections[0]?.heading &&
        html`
          <dds-left-nav-menu-category-heading>${sections[0]?.heading}</dds-left-nav-menu-category-heading>
        `}
      ${highlightedItems.map((item, i) => {
        return item.megapanelContent?.quickLinks?.links.length !== 0
          ? html`
              <dds-left-nav-menu-highlighted
                highlighted=${ifNonNull(item.highlighted)}
                title="${item.title}"
                data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}"
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
              </dds-left-nav-menu-highlighted>
            `
          : html`
              <dds-left-nav-menu-item-highlighted
                highlighted=${ifNonNull(item.highlighted)}
                href="${item.url}"
                title="${item.title}"
                data-autoid="${ddsPrefix}--masthead__l0-sidenav--subnav-col${i}-item${i}"
              ></dds-left-nav-menu-item-highlighted>
            `;
      })}
      ${menuItems.map((item, i) => {
        return item.megapanelContent?.quickLinks?.links
          ? html`
              <dds-left-nav-menu title="${item.title}" data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}">
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
  private _renderNavItems({ selectedMenuItem, target }: { selectedMenuItem?: string; target: NAV_ITEMS_RENDER_TARGET }) {
    const { navLinks } = this;
    return !navLinks
      ? undefined
      : navLinks.map((link, i) => {
          const { menuSections = [], title, titleEnglish, url } = link;
          let sections;
          let mobileSections;
          if (link.hasMegapanel) {
            sections = this._renderMegaMenu(menuSections);
            mobileSections = this._renderMobileMegaMenu(menuSections);
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
          }
          if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
            if (sections.length === 0) {
              return html`
                <dds-top-nav-item
                  ?active="${selectedMenuItem && titleEnglish === selectedMenuItem}"
                  href="${url}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                ></dds-top-nav-item>
              `;
            }
            if (link.hasMegapanel) {
              return html`
                <dds-megamenu-top-nav-menu
                  ?active="${selectedMenuItem && titleEnglish === selectedMenuItem}"
                  menu-label="${title}"
                  trigger-content="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-nav--nav-${i}"
                >
                  ${sections}
                </dds-megamenu-top-nav-menu>
              `;
            }
            return html`
              <dds-top-nav-menu
                ?active="${selectedMenuItem && titleEnglish === selectedMenuItem}"
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
                  ?active="${selectedMenuItem && titleEnglish === selectedMenuItem}"
                  href="${url}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}"
                ></dds-left-nav-item>
              `
            : html`
                <dds-left-nav-menu
                  ?active="${selectedMenuItem && titleEnglish === selectedMenuItem}"
                  title="${title}"
                  data-autoid="${ddsPrefix}--masthead__l0-sidenav--nav-${i}"
                >
                  ${mobileSections}
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
  _loadTranslation?: (language?: string) => Promise<Translation>;

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
   * `true` to activate the search box.
   */
  @property({ type: Boolean, attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state.
   */
  @property({ attribute: false })
  authenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The brand name.
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
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
    this._loadUserStatus?.();
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
        this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
      }
    }
  }

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      currentSearchResults,
      brandName,
      inputTimeout,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      language,
      openSearchDropdown,
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
        ${!brandName
          ? undefined
          : html`
              <dds-left-nav-name>${brandName}</dds-left-nav-name>
            `}
        ${l1Data ? undefined : this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV })}
        ${l1Data ? this._renderL1Items({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV }) : undefined}
      </dds-left-nav>
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
        >
        </dds-masthead-menu-button>

        ${this._renderLogo()}
        ${!brandName
          ? undefined
          : html`
              <dds-top-nav-name>${brandName}</dds-top-nav-name>
            `}
        ${l1Data
          ? undefined
          : html`
              <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}">
                ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV })}
              </dds-top-nav>
            `}
        <dds-masthead-search-composite
          ?active="${activateSearch}"
          input-timeout="${inputTimeout}"
          language="${ifNonNull(language)}"
          ?open="${openSearchDropdown}"
          placeholder="${ifNonNull(searchPlaceholder)}"
          .currentSearchResults="${ifNonNull(currentSearchResults)}"
          ._loadSearchResults="${ifNonNull(loadSearchResults)}"
        ></dds-masthead-search-composite>
        <dds-masthead-global-bar>
          <dds-masthead-profile ?authenticated="${authenticated}">
            ${profileItems?.map(
              ({ title, url }) =>
                html`
                  <dds-masthead-profile-item href="${ifNonNull(url)}">${title}</dds-masthead-profile-item>
                `
            )}
          </dds-masthead-profile>
        </dds-masthead-global-bar>
        ${!l1Data ? undefined : this._renderL1()}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadComposite;
