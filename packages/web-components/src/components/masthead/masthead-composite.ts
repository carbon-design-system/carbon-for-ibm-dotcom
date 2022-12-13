/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement, TemplateResult } from 'lit-element';
import { nothing, render } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import ArrowRight16 from 'carbon-web-components/es/icons/arrow--right/16.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import root from 'window-or-global';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { globalInit } from '../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import MastheadLogoAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/MastheadLogo/MastheadLogo';
import {
  MastheadL1,
  MastheadLink,
  MastheadLogoData,
  MastheadMenuItem,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import {
  UNAUTHENTICATED_STATUS,
  CLOUD_UNAUTHENTICATED_STATUS,
  MASTHEAD_AUTH_METHOD,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME } from './megamenu-right-navigation';
import { DDS_CUSTOM_PROFILE_LOGIN } from '../../globals/internal/feature-flags';
import DDSMastheadLogo from './masthead-logo';
import './masthead';
import './masthead-button-cta';
import './masthead-l1';
import './masthead-l1-name';
import './masthead-menu-button';
import './masthead-contact';
import './masthead-global-bar';
import './masthead-profile';
import './masthead-profile-item';
import './megamenu';
import './megamenu-top-nav-menu';
import './skip-to-content';
import './top-nav';
import './top-nav-l1';
import './top-nav-name';
import './top-nav-item';
import './top-nav-menu';
import './top-nav-menu-item';
import './left-nav';
import '../search-with-typeahead/search-with-typeahead';
import '../search-with-typeahead/search-with-typeahead-item';
import styles from './masthead.scss';
import { MEGAMENU_LAYOUT_SCHEME } from './defs';

const { stablePrefix: ddsPrefix } = ddsSettings;

// Magic Number: 799px matches masthead.scss's `$breakpoint--desktop-nav`.
const layoutBreakpoint = window.matchMedia(`(max-width: 799px)`);

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
class DDSMastheadComposite extends HostListenerMixin(LitElement) {
  /**
   * Renders L1 menu based on l1Data
   *
   * @returns The L1 nav.
   */
  protected _renderL1() {
    const { selectedMenuItem } = this;
    if (!this.l1Data) return undefined;
    const { url, title } = this.l1Data;
    const isSelected = !this._hasAutoSelectedItems && !selectedMenuItem;
    return html`
      <dds-masthead-l1 slot="masthead-l1">
        ${!title
          ? undefined
          : html`
              <dds-masthead-l1-name title="${title}" aria-selected="${isSelected}" url="${ifDefined(url)}"></dds-masthead-l1-name>
            `}
        <dds-top-nav-l1 selected-menu-item=${selectedMenuItem}
          >${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, hasL1: true })}</dds-top-nav-l1
        >
      </dds-masthead-l1>
    `;
  }

  /**
   * Renders masthead logo
   *
   */
  protected _renderLogo() {
    if (!this.logoData) {
      return html`
        <dds-masthead-logo ?hide-logo="${this.activateSearch}"></dds-masthead-logo>
      `;
    }
    const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(this.logoData);
    const { tooltip, svg, href } = this.logoData;
    return html`
      <dds-masthead-logo
        ?hide-logo="${this.activateSearch}"
        ?hasTooltip="${tooltip}"
        aria-label="${ifNonNull(tooltip)}"
        href="${href || DDSMastheadLogo.hrefDefault}"
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
   * Render MegaMenu content
   *
   * @param sections menu section data object
   * @param _parentKey parent key
   * @param layout layout selection to render the megamenu with
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenu(sections, _parentKey, layout: MEGAMENU_LAYOUT_SCHEME = MEGAMENU_LAYOUT_SCHEME.LIST) {
    const { _megamenuRenderMap } = this;
    if (_megamenuRenderMap.has(layout)) {
      return (_megamenuRenderMap.get(layout) as Function)(sections, _parentKey);
    }
    return this._renderMegaMenuListing(sections, _parentKey);
  }

  /**
   *  Render MegaMenu content in tabbed layout.
   *
   * @param sections menu section data object
   * @param parentKey parent key
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenuTabbed(sections, parentKey) {
    let viewAllLink;
    type menuItem = MastheadMenuItem & { itemKey: String };
    const sortedMenuItems: menuItem[] = [];
    sections[0].menuItems?.forEach((item, i) => {
      if (item.megaPanelViewAll) {
        viewAllLink = item;
        return viewAllLink;
      }

      return sortedMenuItems.push({ ...item, itemKey: `${parentKey}-${i}` });
    });

    return html`
      <dds-megamenu layout="${MEGAMENU_LAYOUT_SCHEME.TAB}">
        <dds-megamenu-left-navigation
          view-all-href="${ifNonNull(viewAllLink?.url)}"
          view-all-title="${ifNonNull(viewAllLink?.title)}"
        >
          <dds-megamenu-tabs value="${sortedMenuItems[0]?.title}">
            ${sortedMenuItems.map(item => {
              return html`
                <dds-megamenu-tab id="tab-${item.itemKey}" target="panel-${item.itemKey}" value="${item.title}"
                  >${item.title}</dds-megamenu-tab
                >
              `;
            })}
          </dds-megamenu-tabs>
        </dds-megamenu-left-navigation>
        <dds-megamenu-right-navigation style-scheme="${MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.TAB}">
          ${sortedMenuItems.map(item => {
            return html`
              <div id="panel-${item.itemKey}" role="tabpanel" aria-labelledby="tab-${item.itemKey}" hidden>
                <dds-megamenu-category-heading
                  href="${ifDefined(item.megapanelContent?.headingUrl)}"
                  title="${ifDefined(item.megapanelContent?.headingTitle)}"
                  >${item.megapanelContent?.description}</dds-megamenu-category-heading
                >
                <dds-megamenu-category-link-group>
                  ${item?.megapanelContent?.quickLinks?.links.map(
                    link =>
                      html`
                        <dds-megamenu-category-link
                          href="${ifDefined(link.url)}"
                          title="${link.title}"
                          target="${ifDefined(link?.target)}"
                        >
                          ${link.description}
                        </dds-megamenu-category-link>
                      `
                  )}
                </dds-megamenu-category-link-group>
              </div>
            `;
          })}
        </dds-megamenu-right-navigation>
      </dds-megamenu>
    `;
  }

  /**
   * Render MegaMenu content in listing layout.
   *
   * @param sections menu section data object
   * @param _parentKey parent menu key (used for the cloud-masthead-composite component)
   */
  // eslint-disable-next-line
  protected _renderMegaMenuListing(sections, _parentKey) {
    const { viewAllLink, highlightedItems, menu } = this._getHighlightedMenuItems(sections);
    const hasHighlights = highlightedItems.length !== 0;
    return html`
      <dds-megamenu layout="${MEGAMENU_LAYOUT_SCHEME.LIST}">
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
                    <dds-megamenu-category-group data-autoid="${autoid}" href="${ifDefined(item.url)}" title="${item.title}">
                      <dds-megamenu-category-group-copy>${item.megapanelContent?.description}</dds-megamenu-category-group-copy>
                      ${item.megapanelContent?.quickLinks?.links.map(({ title, url, highlightedLink }, key) => {
                        return html`
                          ${highlightedLink
                            ? html`
                                <dds-megamenu-link-with-icon
                                  data-autoid="${autoid}-item${key}"
                                  href="${ifDefined(url)}"
                                  style-scheme="category-sublink"
                                  title="${title}"
                                >
                                  <span>${title}</span>${ArrowRight16({ slot: 'icon' })}
                                </dds-megamenu-link-with-icon>
                              `
                            : html`
                                <dds-megamenu-category-link
                                  data-autoid="${autoid}-item${key}"
                                  title="${title}"
                                  href="${ifDefined(url)}"
                                >
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
              <dds-megamenu-category-group data-autoid="${autoid}" href="${ifDefined(item.url)}" title="${item.title}">
                ${item.megapanelContent?.quickLinks?.links.map(({ title, url }, key) => {
                  return html`
                    <dds-megamenu-category-link data-autoid="${autoid}-item${key}" title="${title}" href="${ifDefined(url)}">
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
   * Renders the left nav menus sections
   *
   * @param object heading heading of menu section
   * @param object.ctas cta items
   * @param object.menuItems menu items
   * @param object.heading heading heading of menu section
   * @param object.isSubmenu determines whether menu section is a submenu section
   * @param object.showBackButton Determines whether to show back button
   * @param object.sectionTitle title of menu section
   * @param object.sectionUrl section title url of menu section
   * @param object.sectionId id of menu section
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderLeftNavMenuSections({
    ctas,
    menuItems,
    heading = '',
    isSubmenu = false,
    showBackButton = false,
    sectionTitle = '',
    sectionUrl = '',
    sectionId = '',
  }) {
    const items = menuItems.map(elem => {
      if (elem.menu) {
        return html`
          <dds-left-nav-menu
            ?last-highlighted=${elem.lastHighlightedItem}
            panel-id=${elem.panelId}
            ?active="${elem.selected}"
            title="${elem.title}"
            data-autoid="${elem.autoid}"
          >
          </dds-left-nav-menu>
        `;
      }

      return html`
        <dds-left-nav-menu-item
          ?last-highlighted=${elem.lastHighlightedItem}
          ?active="${elem.selected}"
          href="${elem.url}"
          title="${elem.title}"
          data-autoid="${elem.autoid}"
        ></dds-left-nav-menu-item>
      `;
    });

    if (heading) {
      items.unshift(
        html`
          <dds-left-nav-menu-category-heading>${heading}</dds-left-nav-menu-category-heading>
        `
      );
    }

    if (ctas) {
      ctas.forEach(cta => {
        items.push(html`
          <dds-left-nav-cta-item href="${ifNonNull(cta.url)}">
            ${cta.title}
          </dds-left-nav-cta-item>
        `);
      });
    }

    return html`
      <dds-left-nav-menu-section
        section-id="${sectionId}"
        ?is-submenu=${ifNonNull(isSubmenu)}
        title=${ifNonNull(sectionTitle)}
        titleUrl=${ifNonNull(sectionUrl)}
        ?show-back-button=${ifNonNull(showBackButton)}
      >
        ${items}
      </dds-left-nav-menu-section>
    `;
  }

  /**
   * checks if menu item's children url match the current url path, if so return the menu item and its children
   *
   * @returns {object} selectedItems
   */
  // eslint-disable-next-line class-methods-use-this
  protected _selectedLeftNavItems() {
    const { currentUrlPath } = this;
    let matchFound = false;
    const selectedItems = { level0: '', level1: '', level2: '' };

    return ({
      menu = [{ url: '', megapanelContent: { quickLinks: { links: [{ url: '' }] } } }],
      key = '',
      parentItemUrl = '',
    }) => {
      if (!matchFound) {
        if (parentItemUrl === currentUrlPath) {
          selectedItems.level0 = `${key}`;
          matchFound = true;
        }
        // check if child url matches current url path
        else {
          for (let i = 0; i < menu?.length; i++) {
            if (menu[i]?.url === currentUrlPath) {
              selectedItems.level0 = `${key}`;
              selectedItems.level1 = `${key}-${i}`;
              matchFound = true;
              break;
            } else {
              const links = menu[i]?.megapanelContent?.quickLinks?.links;
              for (let k = 0; k < links?.length; k++) {
                if (links[k]?.url === currentUrlPath) {
                  selectedItems.level0 = `${key}`;
                  selectedItems.level1 = `${key}-${i}`;
                  selectedItems.level2 = `${key}-${i}-${k}`;
                  matchFound = true;
                  break;
                }
              }
            }
          }
        }
        this._hasAutoSelectedItems = matchFound;
        return selectedItems;
      }
      return selectedItems;
    };
  }

  /**
   * Renders the left nav menus
   *
   * @param menuItems The options.
   * @param autoid Base autoid to be applied to the menu items
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderLeftNav(menuItems, autoid) {
    const { selectedMenuItem, ctaButtons } = this;

    const menu: any[] = [];
    const selectedItemUrl = this._selectedLeftNavItems();
    const level0Items = menuItems.map((elem, i) => {
      if (elem.menuSections) {
        const level1Items: {
          title: string;
          panelId: string;
          autoid: string;
          lastHighlightedItem: boolean;
          url?: string;
          menu: boolean;
          selected: boolean;
        }[] = [];

        let menuElems = elem.menuSections[0]?.menuItems;
        let highlightedItems: MastheadMenuItem[] = [];

        if (elem.hasMegapanel) {
          const { viewAllLink, highlightedItems: hightlighted, menu: nonHighlightedMenuItems } = this._getHighlightedMenuItems(
            elem.menuSections
          );
          highlightedItems = hightlighted;
          menuElems = hightlighted.concat(nonHighlightedMenuItems);
          if (viewAllLink) {
            menuElems.push(viewAllLink);
          }
        }

        const selectedItems = selectedItemUrl({ menu: menuElems, key: i, parentItemUrl: elem.url });

        // render level 1 menu sections
        menuElems?.map((item, k) => {
          const level2Items: {
            title: string;
            url?: string;
            autoid: string;
            selected: boolean;
          }[] = [];

          const lastHighlighted = k + 1 === highlightedItems.length;

          // render level 2 menu sections
          item.megapanelContent?.quickLinks?.links.map((submenu, j) => {
            return level2Items.push({
              title: submenu.title,
              url: submenu.url,
              autoid: `${autoid}--sidenav--nav${i}-list${k}-item${j}`,
              selected: !selectedMenuItem
                ? selectedItems?.level2 === `${i}-${k}-${j}`
                : selectedMenuItem === submenu.titleEnglish,
            });
          });

          if (level2Items.length !== 0) {
            menu.push(
              this._renderLeftNavMenuSections({
                ctas: undefined,
                menuItems: level2Items,
                isSubmenu: true,
                showBackButton: true,
                sectionTitle: item.title,
                sectionUrl: item.url,
                sectionId: `${i}, ${k}`,
              })
            );
          }

          return level1Items.push({
            title: item.title,
            autoid: `${autoid}--sidenav--nav${i}-list${k}`,
            lastHighlightedItem: lastHighlighted,
            url: item.url,
            panelId: `${i}, ${k}`,
            selected: !selectedMenuItem ? selectedItems?.level1 === `${i}-${k}` : selectedMenuItem === item.titleEnglish,
            menu: item.megapanelContent?.quickLinks?.links && item.megapanelContent?.quickLinks?.links.length !== 0,
          });
        });

        if (level1Items.length !== 0) {
          menu.push(
            this._renderLeftNavMenuSections({
              ctas: undefined,
              menuItems: level1Items,
              heading: elem.menuSections[0]?.heading,
              isSubmenu: true,
              showBackButton: true,
              sectionTitle: elem.title,
              sectionUrl: elem.url,
              sectionId: `${i}, -1`,
            })
          );
        }
      }

      const selectedItems = selectedItemUrl({ key: i, parentItemUrl: elem.url });

      return {
        title: elem.title,
        titleEnglish: elem.titleEnglish,
        menu: elem.menuSections && elem.menuSections.length !== 0,
        url: elem.url,
        panelId: `${i}, -1`,
        autoid: `${autoid}--sidenav--nav${i}`,
        selected: !selectedMenuItem ? selectedItems?.level0 === `${i}` : selectedMenuItem === elem.titleEnglish,
      };
    });

    return html`
      ${this._renderLeftNavMenuSections({
        ctas: ctaButtons,
        menuItems: level0Items,
        sectionId: '-1, -1',
      })}
      ${menu}
    `;
  }

  /**
   * checks if there is a child item in the menu section that matches current url and returns true for first valid result
   *
   * @returns function that returns true or false
   */
  // eslint-disable-next-line class-methods-use-this
  protected _childLinkChecker() {
    const { currentUrlPath } = this;
    let matchFound = false;

    return sections => {
      if (!matchFound) {
        if (sections.length) {
          const { menuItems } = sections[0];

          for (let i = 0; i < menuItems.length; i++) {
            if (
              menuItems[i]?.url === currentUrlPath ||
              menuItems[i]?.megapanelContent?.quickLinks?.links?.filter(link => link.url === currentUrlPath).length
            ) {
              matchFound = true;
            }
          }
        }

        return matchFound;
      }

      return false;
    };
  }

  /**
   * @param options The options.
   * @param [options.selectedMenuItem] The selected nav item.
   * @param options.target The target of rendering navigation items.
   * @param options.hasL1 If an L1 menu is present
   * @returns The nav items.
   */
  protected _renderNavItems({ target, hasL1 }: { target: NAV_ITEMS_RENDER_TARGET; hasL1: boolean }) {
    const { navLinks, l1Data } = this;
    let menu: MastheadLink[] | undefined = navLinks;
    if (hasL1) {
      menu = l1Data?.menuItems;
    }
    const autoid = `${ddsPrefix}--masthead__${l1Data?.menuItems ? 'l1' : 'l0'}`;

    if (target === NAV_ITEMS_RENDER_TARGET.TOP_NAV) {
      return !menu
        ? undefined
        : menu.map((link, i) => {
            return this._renderNavItem(link, i, autoid);
          });
    }

    return !menu ? undefined : this._renderLeftNav(menu, autoid);
  }

  /**
   * Renders a nav item.
   *
   * @param link The link to render
   * @param i The index of the link in a series
   * @param autoid The unique id to assign to the link
   * @returns A template fragment representing a nav item.
   */
  protected _renderNavItem(link, i, autoid): TemplateResult {
    const { selectedMenuItem, currentUrlPath } = this;
    const { menuSections = [], title, titleEnglish, url, megamenuLayout, hasMegapanel } = link;
    const hasChildLink = this._childLinkChecker();
    let selected;

    if (selectedMenuItem) {
      selected = selectedMenuItem && titleEnglish === selectedMenuItem;
    } else {
      selected = hasChildLink(menuSections);
    }

    if (menuSections.length === 0) {
      return html`
        <dds-top-nav-item
          ?active="${selectedMenuItem ? selected : url === currentUrlPath}"
          href="${url}"
          title="${title}"
          data-autoid="${autoid}-nav--nav${i}"
        ></dds-top-nav-item>
      `;
    }

    if (hasMegapanel) {
      if (menuSections) {
        this.megamenuSet[i] = this._renderMegaMenu(menuSections, i, megamenuLayout as MEGAMENU_LAYOUT_SCHEME);
      }

      return html`
        <dds-megamenu-top-nav-menu
          ?active="${selected}"
          menu-label="${title}"
          trigger-content="${title}"
          data-autoid="${autoid}-nav--nav${i}"
        >
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
        ${menuSections
          // eslint-disable-next-line no-use-before-define
          .reduce((acc: typeof menuItems, { menuItems }) => acc.concat(menuItems), [])
          .map(
            ({ title: menuItemTitle, url: menuItemUrl }, j) =>
              html`
                <dds-top-nav-menu-item
                  ?active="${selectedMenuItem ? selected : menuItemUrl === currentUrlPath}"
                  href="${menuItemUrl}"
                  title="${menuItemTitle}"
                  data-autoid="${autoid}-nav--subnav-col${i}-item${j}"
                ></dds-top-nav-menu-item>
              `
          )}
      </dds-top-nav-menu>
    `;
  }

  /**
   * Handles the rendering of the megamenu once it is active
   *
   * @param event The event.
   */
  @HostListener('eventMegamenuActive')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _loadMegamenu = (event: CustomEvent) => {
    const {
      target,
      detail: { active, resolveFn },
    } = event;
    const { autoid } = (target as HTMLElement).dataset;
    const index = autoid?.slice(-1);
    const currentMenu = this.megamenuSet[index!];
    render(active ? currentMenu : nothing, target as HTMLElement);
    resolveFn();
  };

  /**
   * Whether or not a nav item has automatically been designated as "selected".
   *
   * @internal
   */
  _hasAutoSelectedItems = false;

  /**
   * Whether the nav should load as `left-nav` or `top-nav`
   */
  _isMobileVersion = layoutBreakpoint.matches;

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
  _loadUserStatus?: (authMethod?: string) => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

  /**
   * Map of megamenu layout options to corresponding render methods.
   *
   * @internal
   */
  _megamenuRenderMap = new Map([
    [MEGAMENU_LAYOUT_SCHEME.LIST, this._renderMegaMenuListing.bind(this)],
    [MEGAMENU_LAYOUT_SCHEME.TAB, this._renderMegaMenuTabbed.bind(this)],
  ]);

  /**
   * `true` if there is a profile.
   */
  @property({ type: String, reflect: true, attribute: 'has-profile' })
  hasProfile = 'true';

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
   * The cta buttons for authenticated state.
   */
  @property({ attribute: false })
  authenticatedCtaButtons?: MastheadProfileItem[];

  /**
   * Text for Contact us button
   */
  @property({ attribute: false })
  contactUsButton?: MastheadProfileItem;

  /**
   * The platform name.
   */
  @property()
  platform!: string;

  /**
   * The platform url. Accepts both a string or an object with a specific URL for each locale.
   */
  @property({ attribute: false })
  platformUrl?;

  /**
   * The search results to show in the UI.
   */
  @property({ attribute: false })
  currentSearchResults: string[] = [];

  @property({ attribute: false })
  currentUrlPath?: string = root.location?.href;

  /**
   * The custom profile login link.
   */
  @property({ attribute: 'custom-profile-login' })
  customProfileLogin?: string;

  /**
   * The boolean to use a custom search API.
   */
  @property({ attribute: 'custom-typeahead-api', type: Boolean })
  customTypeaheadAPI = false;

  /**
   * The `aria-label` attribute for the top-level container.
   */
  @property({ attribute: 'masthead-assistive-text' })
  mastheadAssistiveText!: string;

  /**
   * The array containing all the megamenus to be loaded in.
   */
  @property()
  megamenuSet: TemplateResult[] = [];

  /**
   * The `aria-label` attribute for the menu bar UI.
   */
  @property({ attribute: 'menu-bar-assistive-text' })
  menuBarAssistiveText!: string;

  /**
   * The skip-to-content link text.
   */
  @property({ attribute: 'skip-to-content-text' })
  skipToContentText = 'Skip to content';

  /**
   * The skip-to-content href.
   */
  @property({ attribute: 'skip-to-content-href' })
  skipToContentHref = '#main-content';

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
   * The parameters passed to the search-with-typeahead for search scope
   */
  @property()
  scopeParameters;

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
   * The cta buttons for authenticated state.
   */
  @property({ attribute: false })
  unauthenticatedCtaButtons?: MastheadProfileItem[];

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
   * `true` if Contact us should be shown.
   */
  @property({ type: String, reflect: true, attribute: 'has-contact' })
  hasContact = 'true';

  /**
   * The selected authentication method, either `profile-api` (default), `cookie`, or `docs-api`.
   */
  @property({ attribute: 'auth-method' })
  authMethod = MASTHEAD_AUTH_METHOD.DEFAULT;

  /**
   * The user authentication status.
   */
  @property({ attribute: 'user-status' })
  userStatus = this.authMethod === MASTHEAD_AUTH_METHOD.DEFAULT ? UNAUTHENTICATED_STATUS : CLOUD_UNAUTHENTICATED_STATUS;

  get userIsAuthenticated(): boolean {
    const { userStatus } = this;
    return userStatus !== UNAUTHENTICATED_STATUS && userStatus !== CLOUD_UNAUTHENTICATED_STATUS;
  }

  get ctaButtons(): MastheadProfileItem[] | undefined {
    const { userIsAuthenticated, authenticatedCtaButtons, unauthenticatedCtaButtons } = this;
    return userIsAuthenticated ? authenticatedCtaButtons : unauthenticatedCtaButtons;
  }

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
    this._loadUserStatus?.(this.authMethod);

    // This is a temp fix until we figure out why we can't set styles to the :host(dds-masthead-container) in stylesheets
    this.style.zIndex = '900';

    // Allows conditional rendering of left/top navs.
    layoutBreakpoint.addEventListener('change', () => {
      this._isMobileVersion = layoutBreakpoint.matches;
      this.requestUpdate();
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('language') || changedProperties.has('dataEndpoint')) {
      const { language, dataEndpoint } = this;
      if (language) {
        this._setLanguage?.(language);
        this._loadTranslation?.(language, dataEndpoint).catch(() => {}); // The error is logged in the Redux store
      }
    }
  }

  render() {
    const {
      _isMobileVersion: isMobileVersion,
      activateSearch,
      authenticatedProfileItems,
      ctaButtons,
      contactUsButton,
      currentSearchResults,
      customTypeaheadAPI,
      customProfileLogin,
      platform,
      platformUrl,
      hasProfile,
      inputTimeout,
      userIsAuthenticated,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      navLinks,
      language,
      openSearchDropdown,
      hasSearch,
      scopeParameters,
      searchPlaceholder,
      selectedMenuItem,
      skipToContentText,
      skipToContentHref,
      unauthenticatedProfileItems,
      l1Data,
      hasContact,
    } = this;

    let profileItems;
    if (DDS_CUSTOM_PROFILE_LOGIN && customProfileLogin && !userIsAuthenticated) {
      profileItems = unauthenticatedProfileItems?.map(item => {
        if (item?.id === 'signin') {
          return { ...item, url: customProfileLogin };
        }
        return item;
      });
    } else {
      profileItems = userIsAuthenticated ? authenticatedProfileItems : unauthenticatedProfileItems;
    }
    const formattedLang = language?.toLowerCase().replace(/-(.*)/, m => m.toUpperCase());
    let platformAltUrl = platformUrl;
    if (platformUrl && formattedLang) {
      if (typeof platformUrl === 'object' && Object.prototype.hasOwnProperty.call(platformUrl, formattedLang)) {
        platformAltUrl = platformUrl[formattedLang].url || platformUrl;
      }
    }

    return html`
      ${isMobileVersion
        ? html`
            <dds-left-nav-overlay></dds-left-nav-overlay>
            <dds-left-nav>
              ${!platform
                ? undefined
                : html`
                    <dds-left-nav-name href="${ifNonNull(platformAltUrl)}">${platform}</dds-left-nav-name>
                  `}
              ${!l1Data?.title
                ? undefined
                : html`
                    <dds-left-nav-name href="${ifNonNull(l1Data.url)}">${l1Data.title}</dds-left-nav-name>
                  `}
              ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV, hasL1: !!l1Data })}
            </dds-left-nav>
          `
        : ''}
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-skip-to-content href="${skipToContentHref}" link-assistive-text="${skipToContentText}"></dds-skip-to-content>

        ${isMobileVersion
          ? html`
              <dds-masthead-menu-button
                button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
                button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
                ?hide-menu-button="${activateSearch}"
              >
              </dds-masthead-menu-button>
            `
          : ''}
        ${this._renderLogo()}
        ${!platform || l1Data
          ? undefined
          : html`
              <dds-top-nav-name href="${ifNonNull(platformAltUrl)}">${platform}</dds-top-nav-name>
            `}
        ${navLinks && !isMobileVersion
          ? html`
              <dds-top-nav
                selected-menu-item=${selectedMenuItem}
                menu-bar-label="${ifNonNull(menuBarAssistiveText)}"
                ?hideNav="${activateSearch}"
              >
                ${this._renderNavItems({ target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, hasL1: false })}
              </dds-top-nav>
            `
          : ''}
        ${!hasSearch
          ? undefined
          : html`
              <dds-search-with-typeahead
                ?active="${activateSearch}"
                input-timeout="${inputTimeout}"
                language="${ifNonNull(language)}"
                ?open="${openSearchDropdown}"
                ?searchOpenOnload="${activateSearch}"
                placeholder="${ifNonNull(searchPlaceholder)}"
                .currentSearchResults="${ifNonNull(currentSearchResults)}"
                ?custom-typeahead-api="${ifNonNull(customTypeaheadAPI)}"
                .scopeParameters="${ifNonNull(scopeParameters)}"
              ></dds-search-with-typeahead>
            `}
        <dds-masthead-global-bar ?has-search-active=${activateSearch}>
          ${hasContact === 'false'
            ? ''
            : html`
                <dds-masthead-contact
                  data-ibm-contact="contact-link"
                  trigger-label="${ifDefined(contactUsButton?.title)}"
                ></dds-masthead-contact>
              `}
          ${hasProfile === 'false'
            ? ''
            : html`
                <dds-masthead-profile ?authenticated="${userIsAuthenticated}">
                  ${profileItems?.map(
                    ({ title, url }) =>
                      html`
                        <dds-masthead-profile-item href="${ifNonNull(url)}">${title}</dds-masthead-profile-item>
                      `
                  )}
                </dds-masthead-profile>
              `}
          ${ctaButtons?.map(
            ({ title, url }) =>
              html`
                <dds-masthead-button-cta href="${ifNonNull(url)}" kind="ghost">
                  ${title}
                </dds-masthead-button-cta>
              `
          )}
        </dds-masthead-global-bar>
        ${!l1Data ? undefined : this._renderL1()}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  /**
   * The name of the custom event fired when a top nav menu is clicked
   */
  static get eventMegamenuActive() {
    return `${ddsPrefix}-megamenu-top-nav-menu-toggle`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSMastheadComposite;
