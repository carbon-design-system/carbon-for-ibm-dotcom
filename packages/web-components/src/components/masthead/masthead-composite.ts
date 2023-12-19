/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, TemplateResult } from 'lit';
import { state, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import ArrowRight16 from '../../internal/vendor/@carbon/web-components/icons/arrow--right/16.js';
import ifNonEmpty from '../../internal/vendor/@carbon/web-components/globals/directives/if-non-empty.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import root from 'window-or-global';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { globalInit } from '../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import MastheadLogoAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/MastheadLogo/MastheadLogo';
import {
  BasicLink,
  MastheadL1,
  MastheadLogoData,
  MastheadProfileItem,
  Translation,
  L0MenuItem,
  L0Megamenu,
  Megapanel,
  MegapanelLinkGroup,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import {
  UNAUTHENTICATED_STATUS,
  CLOUD_UNAUTHENTICATED_STATUS,
  MASTHEAD_AUTH_METHOD,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME } from './megamenu-right-navigation';
import { C4D_CUSTOM_PROFILE_LOGIN } from '../../globals/internal/feature-flags';
import C4DMastheadLogo from './masthead-logo';
import C4DMegaMenuTabs from './megamenu-tabs';
import C4DMegamenuTopNavMenu from './megamenu-top-nav-menu';
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
import './megamenu-heading';
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
import layoutBreakpoint from './masthead-breakpoint';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

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
 * Globally-scoped Contact Module variable.
 *
 * @see https://github.ibm.com/live-advisor/cm-app
 */
export interface CMApp {
  version: string;
  ready: boolean;
  init: Function;
  refresh: Function;
  register: Function;
  deregister: Function;
  fireEvent: Function;
  update: Function;
  props: {
    eventHandlers: any;
    events: CustomEvent[];
    getLoadedBundle: Function;
  };
}

/**
 * Component that renders masthead from links, etc. data.
 *
 * @element c4d-masthead-composite
 */
@customElement(`${c4dPrefix}-masthead-composite`)
class C4DMastheadComposite extends HostListenerMixin(LitElement) {
  /**
   * Renders L1 menu based on l1Data & screen width.
   *
   * @returns {TemplateResult | undefined} The L1 nav.
   */
  protected _renderL1() {
    const { l1Data, selectedMenuItemL1 } = this;
    return !l1Data
      ? undefined
      : html`
          <c4d-masthead-l1
            slot="masthead-l1"
            .l1Data=${l1Data}
            selected-menu-item=${selectedMenuItemL1 || ''}>
          </c4d-masthead-l1>
        `;
  }

  /**
   * Renders masthead logo
   *
   * @returns TemplateResult
   */
  protected _renderLogo() {
    if (!this.logoData) {
      return html`
        <c4d-masthead-logo
          ?hide-logo="${this.activateSearch}"></c4d-masthead-logo>
      `;
    }
    const useAlternateLogo = MastheadLogoAPI.setMastheadLogo(this.logoData);
    const { tooltip, svg, href } = this.logoData;
    return html`
      <c4d-masthead-logo
        ?hide-logo="${this.activateSearch}"
        ?hasTooltip="${tooltip}"
        aria-label="${ifDefined(tooltip)}"
        href="${href || C4DMastheadLogo.hrefDefault}"
        >${useAlternateLogo ? unsafeSVG(svg) : ''}</c4d-masthead-logo
      >
    `;
  }

  /**
   * Render MegaMenu content
   *
   * @param menu megamenu data object
   * @param _parentKey parent key
   * @param layout layout selection to render the megamenu with
   * @returns TemplateResult
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenu(
    menu: L0Megamenu,
    _parentKey,
    layout: MEGAMENU_LAYOUT_SCHEME = MEGAMENU_LAYOUT_SCHEME.LIST
  ): TemplateResult {
    const { _megamenuRenderMap } = this;
    if (_megamenuRenderMap.has(layout)) {
      return (_megamenuRenderMap.get(layout) as Function)(menu, _parentKey);
    }
    return this._renderMegaMenuListing(menu, _parentKey);
  }

  /**
   *  Render MegaMenu content in tabbed layout.
   *
   * @param menu megamenu data object
   * @param _parentKey key that identifies parent nav item
   * @returns TemplateResult
   */
  protected _renderMegaMenuTabbed(menu: L0Megamenu, _parentKey) {
    const { viewAll, sections } = menu;
    type menuItem = Megapanel & { itemKey: String };
    const sortedMenuItems: menuItem[] = [];
    sections.forEach((section, i) => {
      return sortedMenuItems.push({
        ...section,
        itemKey: `${_parentKey}-${i}`,
      });
    });

    const activeMenuItem = this._activeMegamenuTabKey
      ? sortedMenuItems.find(
          (item) => item.itemKey === this._activeMegamenuTabKey
        )
      : sortedMenuItems[0];

    return html`
      <c4d-megamenu layout="${MEGAMENU_LAYOUT_SCHEME.TAB}">
        <c4d-megamenu-left-navigation>
          <c4d-megamenu-tabs
            value="${ifNonEmpty(activeMenuItem?.heading?.title)}">
            ${sortedMenuItems.map((item) => {
              return item?.heading?.title
                ? html`
                    <c4d-megamenu-tab
                      id="tab-${item.itemKey}"
                      target="panel-${item.itemKey}"
                      value="${item.heading.title}">
                      ${item.heading.title}
                    </c4d-megamenu-tab>
                  `
                : '';
            })}
          </c4d-megamenu-tabs>
          ${viewAll?.url && viewAll?.title
            ? html`
                <c4d-megamenu-link-with-icon
                  href="${viewAll.url}"
                  part="view-all view-all-left"
                  slot="view-all">
                  <span>${viewAll.title}</span>${ArrowRight16({ slot: 'icon' })}
                </c4d-megamenu-link-with-icon>
              `
            : null}
        </c4d-megamenu-left-navigation>
        ${this._renderMegamenuTabPanel(activeMenuItem)}
      </c4d-megamenu>
    `;
  }

  protected _renderMegamenuTabPanel(menuItem) {
    const { itemKey, groups, heading, viewAll: itemViewAll } = menuItem;
    return html`
      <div
        id="panel-${itemKey}"
        role="tabpanel"
        aria-labelledby="tab-${itemKey}">
        <c4d-megamenu-right-navigation
          class="${c4dPrefix}--masthead__tabpanel-child"
          style-scheme="${MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.HAS_SIDEBAR}">
          ${heading?.title
            ? html`
                <c4d-megamenu-heading
                  href="${ifNonEmpty(heading?.url)}"
                  title="${heading?.title}"
                  slot="heading">
                  ${heading?.description}
                </c4d-megamenu-heading>
              `
            : ''}
          ${groups
            ? groups.map((group, i) =>
                this._renderMegapanelLinkGroup(group, {
                  autoid: `panel-${itemKey}-${i}`,
                })
              )
            : ''}
          ${itemViewAll?.url && itemViewAll?.title
            ? html`
                <c4d-megamenu-link-with-icon
                  href="${itemViewAll.url}"
                  part="view-all view-all-right"
                  slot="view-all">
                  <span>${itemViewAll.title}</span>${ArrowRight16({
                    slot: 'icon',
                  })}
                </c4d-megamenu-link-with-icon>
              `
            : null}
        </c4d-megamenu-right-navigation>
      </div>
    `;
  }

  /**
   * Render MegaMenu content in listing layout.
   *
   * @param menu megamenu data object
   * @param _parentKey key that identifies parent nav item
   * @returns TemplateResult
   */
  // eslint-disable-next-line
  protected _renderMegaMenuListing(menu: L0Megamenu, _parentKey) {
    const megapanel = menu.sections[0];
    const { heading } = megapanel;
    const { viewAll, highlights } = menu;

    return html`
      <c4d-megamenu layout="${MEGAMENU_LAYOUT_SCHEME.LIST}">
        ${highlights
          ? html`
              <c4d-megamenu-left-navigation>
                ${highlights.map((group, i) =>
                  this._renderMegapanelLinkGroup(group, {
                    headingLevel: 2,
                    autoid: `${c4dPrefix}--masthead__l0-nav-list${i}`,
                  })
                )}
              </c4d-megamenu-left-navigation>
            `
          : null}
        <c4d-megamenu-right-navigation
          style-scheme="${highlights
            ? MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.HAS_SIDEBAR
            : MEGAMENU_RIGHT_NAVIGATION_STYLE_SCHEME.FULL}">
          ${heading && !highlights
            ? html`
                <c4d-megamenu-heading
                  href="${ifNonEmpty(heading.url)}"
                  title="${ifNonEmpty(heading.title)}"
                  slot="heading">
                  ${heading.description}
                </c4d-megamenu-heading>
              `
            : ''}
          ${megapanel.groups.map((group, i) =>
            this._renderMegapanelLinkGroup(group, {
              headingLevel: heading ? 3 : 2,
              autoid: `${c4dPrefix}--masthead__l0-nav-list${
                i + (highlights ? highlights.length : 0)
              }`,
            })
          )}
          ${viewAll?.url && viewAll?.title
            ? html`
                <c4d-megamenu-link-with-icon
                  href="${viewAll.url}"
                  part="view-all view-all-right"
                  slot="view-all">
                  <span>${viewAll.title}</span>${ArrowRight16({ slot: 'icon' })}
                </c4d-megamenu-link-with-icon>
              `
            : null}
        </c4d-megamenu-right-navigation>
        ${viewAll?.url && viewAll?.title
          ? html`
              <c4d-megamenu-link-with-icon
                href="${viewAll.url}"
                part="view-all view-all-bottom">
                <span>${viewAll.title}</span>${ArrowRight16({ slot: 'icon' })}
              </c4d-megamenu-link-with-icon>
            `
          : null}
      </c4d-megamenu>
    `;
  }

  /**
   * Render a Megapanel link group.
   *
   * @param group megamenu link group
   * @returns TemplateResult
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegapanelLinkGroup(
    group: MegapanelLinkGroup,
    options: { headingLevel?: Number; autoid?: String } = { headingLevel: 3 }
  ) {
    const { links, heading } = group;
    const { headingLevel, autoid } = options;
    return html`
      <c4d-megamenu-category-group data-autoid="${ifNonEmpty(autoid)}">
        ${heading?.title
          ? html`
              <c4d-megamenu-category-heading
                title="${heading.title}"
                href="${ifNonEmpty(heading?.url)}"
                slot="heading"
                heading-level="${ifNonEmpty(headingLevel)}">
                ${heading?.description}
              </c4d-megamenu-category-heading>
            `
          : ''}
        ${links &&
        links.map((link, i) => {
          const linkAutoId = autoid ? `${autoid}-item${i}` : null;
          if (link?.description) {
            return html`
              <c4d-megamenu-category-link
                title="${link?.title}"
                href="${ifNonEmpty(link?.url)}"
                data-autoid="${ifNonEmpty(linkAutoId)}">
                ${link?.description}
              </c4d-megamenu-category-link>
            `;
          }
          return html`
            <c4d-megamenu-category-link
              href="${ifNonEmpty(link?.url)}"
              data-autoid="${ifNonEmpty(linkAutoId)}">
              ${link?.title}
            </c4d-megamenu-category-link>
          `;
        })}
      </c4d-megamenu-category-group>
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
    heading,
    isSubmenu = false,
    showBackButton = false,
    sectionTitle = '',
    sectionUrl = '',
    sectionId = '',
  }) {
    const items = menuItems.map((elem) => {
      if (elem.menu) {
        return html`
          <c4d-left-nav-menu
            ?last-highlighted=${elem.lastHighlightedItem}
            panel-id=${elem.panelId}
            ?active="${elem.selected}"
            title="${elem.title}"
            data-autoid="${elem.autoid}">
          </c4d-left-nav-menu>
        `;
      }

      return html`
        <c4d-left-nav-menu-item
          ?last-highlighted=${elem.lastHighlightedItem}
          ?active="${elem.selected}"
          href="${elem.url}"
          title="${elem.title}"
          data-autoid="${elem.autoid}"
          .isHeading=${elem.isHeading ?? false}
          .isViewAll=${elem.isViewAll ?? false}></c4d-left-nav-menu-item>
      `;
    });

    if (heading) {
      if (typeof heading === 'string') {
        items.unshift(
          html`
            <c4d-left-nav-menu-category-heading
              title="${heading}"></c4d-left-nav-menu-category-heading>
          `
        );
      } else {
        const { title, description, url } = heading;
        items.unshift(
          html`
            <c4d-left-nav-menu-category-heading
              .boostSize=${true}
              title="${title}"
              url="${ifDefined(url)}">
              ${description ?? ''}
            </c4d-left-nav-menu-category-heading>
          `
        );
      }
    }

    if (ctas) {
      ctas.forEach((cta) => {
        items.push(html`
          <c4d-left-nav-cta-item href="${ifNonEmpty(cta.url)}">
            ${cta.title}
          </c4d-left-nav-cta-item>
        `);
      });
    }

    return html`
      <c4d-left-nav-menu-section
        section-id="${sectionId}"
        ?is-submenu=${ifDefined(isSubmenu)}
        title=${ifDefined(sectionTitle)}
        titleUrl=${ifDefined(sectionUrl)}
        ?show-back-button=${ifDefined(showBackButton)}>
        ${items}
      </c4d-left-nav-menu-section>
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
      menu = [
        { url: '', megapanelContent: { quickLinks: { links: [{ url: '' }] } } },
      ],
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
  protected _renderLeftNav() {
    const { ctaButtons, platform } = this;
    const menu: any[] = [];
    const menuItems = this._getl0Data();
    const autoid = `${c4dPrefix}--masthead__l0`;
    const level0Items = menuItems.map((elem: L0MenuItem, i) => {
      // Instantiate bucket for first level submenus.
      const level1Items: {
        title: string;
        panelId: string;
        autoid: string;
        lastHighlightedItem: boolean;
        url?: string;
        menu: boolean;
        selected: boolean;
        isHeading?: boolean;
        isViewAll?: boolean;
        heading?: string;
        description?: string;
      }[] = [];

      // If it's a "simple" menu, no megapanels.
      if (elem?.submenu instanceof Array) {
        elem.submenu.forEach((link, j) => {
          level1Items.push({
            title: link.title,
            url: link.url,
            autoid: `${autoid}--sidenav--nav${i}-list${j}`,
            lastHighlightedItem: false,
            panelId: `${i}, ${j}`,
            menu: false,
            selected: false,
          });
        });

        if (level1Items.length !== 0) {
          menu.push(
            this._renderLeftNavMenuSections({
              ctas: undefined,
              menuItems: level1Items,
              isSubmenu: true,
              showBackButton: true,
              sectionTitle: elem.title,
              sectionUrl: elem.url,
              sectionId: `${i}, -1`,
              heading: elem.title,
            })
          );
        }
      }

      // If it's a megapanel.
      const submenu = elem.submenu as L0Megamenu;
      if (submenu?.sections) {
        // Check if other types of links exist.
        const highlightedItems = submenu?.highlights || [];
        const viewAll = submenu?.viewAll;

        // 1. Add highlighted items to top of menu.
        if (highlightedItems.length !== 0) {
          highlightedItems.forEach((highlight: MegapanelLinkGroup, j) => {
            const { heading, links } = highlight;
            const lastHighlighted = j + 1 === highlightedItems.length;

            if (heading) {
              level1Items.push({
                title: heading.title,
                url: heading.url,
                autoid: `${autoid}--sidenav--nav${i}-list${j}`,
                lastHighlightedItem: lastHighlighted,
                panelId: `${i}, ${j}`,
                menu: false,
                selected: false,
                isHeading: true,
              });
            }
            if (links) {
              links.forEach((link, k) => {
                level1Items.push({
                  title: link.title,
                  url: link.url,
                  autoid: `${autoid}--sidenav--nav${i}-list${j}-item${k}`,
                  lastHighlightedItem: lastHighlighted,
                  panelId: `${i}, ${j}`,
                  menu: false,
                  selected: false,
                });
              });
            }
          });
        }

        /**
         * 2. Add megamenu links to menu.
         *
         * `sections`' length implies a tabbed or listing megamenu, which must
         * be handled in different ways and have slightly different content
         * requirements.
         */
        if (submenu.sections.length > 1) {
          submenu.sections.map((item: Megapanel, j) => {
            const { heading, groups } = item;
            const lastHighlighted = j + 1 === highlightedItems.length;
            const level2Items: {
              title: string;
              url?: string;
              autoid: string;
              selected: boolean;
              isHeading?: boolean;
            }[] = [];

            groups.forEach((linkGroup: MegapanelLinkGroup, k) => {
              const { heading: groupHeading, links } = linkGroup;

              if (groupHeading) {
                level2Items.push({
                  title: groupHeading.title,
                  url: groupHeading.url,
                  autoid: `${autoid}--sidenav--nav${i}-list${j}-heading${k}`,
                  selected: false,
                  isHeading: true,
                });
              }
              if (links) {
                links.forEach((link, l) => {
                  level2Items.push({
                    title: link.title,
                    url: link.url,
                    autoid: `${autoid}--sidenav--nav${i}-list${j}-heading${k}-item${l}`,
                    selected: false,
                  });
                });
              }
            });

            if (level2Items.length !== 0) {
              menu.push(
                this._renderLeftNavMenuSections({
                  ctas: undefined,
                  menuItems: level2Items,
                  isSubmenu: true,
                  showBackButton: true,
                  sectionTitle: heading?.title,
                  sectionUrl: heading?.url,
                  sectionId: `${i}, ${j}`,
                  heading,
                })
              );
            }

            return level1Items.push({
              title: (heading as BasicLink).title, // headings are required in tabbed layout
              url: heading?.url,
              autoid: `${autoid}--sidenav--nav${i}-list${j}`,
              lastHighlightedItem: lastHighlighted,
              panelId: `${i}, ${j}`,
              selected: false,
              menu: groups && groups.length !== 0,
            });
          });
        } else {
          submenu.sections[0].groups.forEach((group: MegapanelLinkGroup, j) => {
            const { heading, links } = group;
            const lastHighlighted = j + 1 === highlightedItems.length;

            if (heading) {
              level1Items.push({
                title: heading.title,
                url: heading.url,
                lastHighlightedItem: lastHighlighted,
                panelId: `${i}, ${j}`,
                autoid: `${autoid}--sidenav--nav${i}-list${j}`,
                menu: false,
                selected: false,
                isHeading: true,
              });
            }

            if (links) {
              links.forEach((link, k) => {
                level1Items.push({
                  title: link.title,
                  url: link.url,
                  lastHighlightedItem: lastHighlighted,
                  panelId: `${i}, ${j}, ${k}`,
                  autoid: `${autoid}--sidenav--nav${i}-list${j}-item${k}`,
                  menu: false,
                  selected: false,
                });
              });
            }
          });
        }

        // 3. Add view all link to bottom of menu.
        if (viewAll) {
          level1Items.push({
            title: viewAll.title,
            url: viewAll.url,
            lastHighlightedItem: false,
            panelId: `${i}`,
            autoid: `${autoid}--sidenav--nav${i}-list${level1Items.length}`,
            menu: false,
            selected: false,
            isViewAll: true,
          });
        }

        if (level1Items.length !== 0) {
          const isNotFaceted = submenu.sections.length === 1;
          const megapanelHeading = submenu.sections[0].heading;

          const heading =
            isNotFaceted && !!megapanelHeading ? megapanelHeading : elem.title;

          menu.push(
            this._renderLeftNavMenuSections({
              ctas: undefined,
              menuItems: level1Items,
              isSubmenu: true,
              showBackButton: true,
              sectionTitle: elem.title,
              sectionUrl: elem.url,
              sectionId: `${i}, -1`,
              heading,
            })
          );
        }
      }

      return {
        title: elem.title,
        titleEnglish: elem.titleEnglish,
        url: elem?.url,
        menu: Boolean(elem?.submenu),
        panelId: `${i}, -1`,
        autoid: `${autoid}--sidenav--nav${i}`,
        selected: false,
      };
    });

    return html`
      <c4d-left-nav-overlay></c4d-left-nav-overlay>
      <c4d-left-nav>
        ${!platform
          ? undefined
          : html`
              <c4d-left-nav-name href="${ifNonEmpty(this._getPlatformUrl())}">
                ${platform}
              </c4d-left-nav-name>
            `}
        ${this._renderLeftNavMenuSections({
          ctas: ctaButtons,
          menuItems: level0Items,
          sectionId: '-1, -1',
          heading: false,
        })}
        ${menu}
      </c4d-left-nav>
    `;
  }

  /**
   * Renders the mobile menu button.
   *
   * @returns A template fragment representing the menu button.
   */
  protected _renderMenuButton() {
    const {
      activateSearch,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
    } = this;
    return html`
      <c4d-masthead-menu-button
        button-label-active="${ifNonEmpty(menuButtonAssistiveTextActive)}"
        button-label-inactive="${ifNonEmpty(menuButtonAssistiveTextInactive)}"
        ?hide-menu-button="${activateSearch}">
      </c4d-masthead-menu-button>
    `;
  }

  /**
   * Checks if there is a child item in the menu section that matches current
   * url and returns true for first valid result.
   *
   * @param menuItem a top level L0 menu item
   * @returns boolean
   */
  protected _isActiveMenuItem(menuItem: L0MenuItem) {
    const { currentUrlPath } = this;
    const { submenu } = menuItem;
    let matchFound = false;

    if (!submenu) {
      matchFound = menuItem?.url === currentUrlPath;
    } else if (submenu instanceof Array) {
      matchFound = Boolean(
        (submenu as BasicLink[]).find((link) => link.url === currentUrlPath)
      );
    } else if (submenu.sections) {
      const { highlights, viewAll, sections } = submenu;
      const flattenedLinks: BasicLink[] = [];
      const flattenLinkGroup = (group: MegapanelLinkGroup): BasicLink[] => {
        const links: BasicLink[] = [];
        if (group.heading) {
          links.push(group.heading);
        }
        if (group.links) {
          group.links.forEach((link) => {
            links.push(link);
          });
        }
        return links;
      };

      // Flatten all data into array of BasicLinks.
      if (highlights) {
        highlights.forEach((highlight) => {
          flattenedLinks.push(...flattenLinkGroup(highlight));
        });
      }
      if (sections.length > 0) {
        sections.forEach((section) => {
          if (section.heading) {
            flattenedLinks.push(section.heading);
          }
          section.groups.forEach((group) => {
            flattenedLinks.push(...flattenLinkGroup(group));
          });
        });
      }
      if (viewAll) {
        flattenedLinks.push(viewAll);
      }

      // Check flattened list for matching URL.
      matchFound = Boolean(
        flattenedLinks.find((link) => link.url === currentUrlPath)
      );
    }

    return matchFound;
  }

  /**
   * Renders the top navigation bar.
   *
   * @returns A template fragment representing the top nav.
   */
  protected _renderTopNav() {
    const { selectedMenuItem, menuBarAssistiveText, activateSearch } = this;
    return !this._getl0Data()
      ? undefined
      : html`
          <c4d-top-nav
            selected-menu-item=${selectedMenuItem}
            menu-bar-label="${ifNonEmpty(menuBarAssistiveText)}"
            ?hideNav="${activateSearch}">
            ${this._getl0Data().map((link, i) => {
              return this._renderNavItem(link, i, `${c4dPrefix}--masthead__l0`);
            })}
          </c4d-top-nav>
        `;
  }

  /**
   * Renders a nav item.
   *
   * @param item The item to render
   * @param i The index of the item in a series
   * @param autoid The unique id to assign to the item
   * @returns A template fragment representing a nav item.
   */
  protected _renderNavItem(item: L0MenuItem, i, autoid): TemplateResult {
    const { selectedMenuItem, currentUrlPath, _activeMegamenuIndex } = this;
    const { submenu, title, titleEnglish, url } = item;
    let selected;

    if (selectedMenuItem) {
      selected =
        titleEnglish?.trim()?.toLowerCase() ===
        selectedMenuItem?.trim()?.toLowerCase();
    } else {
      selected = this._isActiveMenuItem(item);
    }

    if (submenu instanceof Array) {
      return html`
        <c4d-top-nav-menu
          ?active="${selected}"
          menu-label="${title}"
          trigger-content="${title}"
          data-autoid="${autoid}-nav--nav${i}">
          ${submenu.map(
            ({ title: linkTitle, url: linkUrl }, j) =>
              html`
                <c4d-top-nav-menu-item
                  ?active="${selectedMenuItem
                    ? selected
                    : linkUrl === currentUrlPath}"
                  href="${ifDefined(linkUrl)}"
                  title="${linkTitle}"
                  data-autoid="${autoid}-nav--subnav-col${i}-item${j}"></c4d-top-nav-menu-item>
              `
          )}
        </c4d-top-nav-menu>
      `;
    }

    if (submenu?.sections) {
      const layout =
        submenu.sections.length > 1
          ? MEGAMENU_LAYOUT_SCHEME.TAB
          : MEGAMENU_LAYOUT_SCHEME.LIST;

      // Render nav menu, but only render megamenu if it is active.
      return html`
        <c4d-megamenu-top-nav-menu
          ?active="${selected}"
          menu-label="${title}"
          trigger-content="${title}"
          data-autoid="${autoid}-nav--nav${i}"
          .menuIndex=${i}>
          ${_activeMegamenuIndex === i
            ? this._renderMegaMenu(submenu, i, layout)
            : null}
        </c4d-megamenu-top-nav-menu>
      `;
    }

    // Fallback render as simple link.
    return html`
      <c4d-top-nav-item
        ?active="${selectedMenuItem ? selected : url === currentUrlPath}"
        href="${ifDefined(url)}"
        title="${title}"
        data-autoid="${autoid}-nav--nav${i}"></c4d-top-nav-item>
    `;
  }

  /**
   * Sets the active megamenu upon user interaction.
   *
   * @param event The event.
   */
  @HostListener(C4DMegamenuTopNavMenu.eventMegaMenuToggled)
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _loadMegamenu = (event: CustomEvent) => {
    const {
      detail: { active, resolveFn, index: menuIndex },
    } = event;

    // Open a megamenu by updating state to trigger a re-render. This also closes
    // any previously opened megamenu.
    if (active && menuIndex !== undefined) {
      this._activeMegamenuIndex = menuIndex;
    }

    // If clicking the same nav item to close megamenu, reset state to prune its
    // markup from the DOM.
    if (!active && menuIndex === this._activeMegamenuIndex) {
      this._activeMegamenuIndex = undefined;
    }

    // Reset active tab when closing any megamenu.
    if (!active && this._activeMegamenuTabKey) {
      this._activeMegamenuTabKey = undefined;
    }

    resolveFn();
  };

  /**
   * Sets the active megamenu tabpanel upon user interaction.
   *
   * @param event The event.
   */
  @HostListener(C4DMegaMenuTabs.eventBeforeSelect)
  protected _loadMegamenuTabPanel(event) {
    const { detail } = event;
    const panelId = detail.item.id.split('tab-')[1];
    this._activeMegamenuTabKey = panelId;
  }

  /**
   * Stores a reference of the globally-scoped CM_APP object within the masthead.
   */
  @HostListener('document:cm-app-ready')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _getContactModuleReference = () => {
    // @ts-ignore: CM_APP will definitely exist if this event is fired
    this.contactModuleApp = window.CM_APP;
  };

  contactModuleApp?: CMApp;

  /**
   * Gets localized platform URL.
   *
   * @returns {string} A URL.
   */
  private _getPlatformUrl(): string {
    const { language, platformUrl } = this;
    const formattedLang = language
      ?.toLowerCase()
      .replace(/-(.*)/, (m) => m.toUpperCase());
    let url = platformUrl;
    if (platformUrl && formattedLang) {
      if (
        typeof platformUrl === 'object' &&
        Object.prototype.hasOwnProperty.call(platformUrl, formattedLang)
      ) {
        url = platformUrl[formattedLang].url || platformUrl;
      }
    }
    return url;
  }

  /**
   * Renders the platform title.
   */
  protected _renderPlatformTitle() {
    const { l1Data, platform } = this;
    return !platform || l1Data
      ? undefined
      : html`
          <c4d-top-nav-name href="${ifDefined(this._getPlatformUrl())}">
            ${platform}
          </c4d-top-nav-name>
        `;
  }

  /**
   * Renders the masthead search.
   *
   * @returns A template fragment representing the search bar.
   */
  protected _renderSearch() {
    const {
      activateSearch,
      currentSearchResults,
      customTypeaheadAPI,
      hasSearch,
      inputTimeout,
      language,
      openSearchDropdown,
      scopeParameters,
      searchPlaceholder,
    } = this;
    return hasSearch === 'false'
      ? ''
      : html`
          <c4d-search-with-typeahead
            ?active="${activateSearch}"
            .currentSearchResults="${ifDefined(currentSearchResults)}"
            ?custom-typeahead-api="${ifDefined(customTypeaheadAPI)}"
            input-timeout="${inputTimeout}"
            language="${ifDefined(language)}"
            ?open="${openSearchDropdown}"
            placeholder="${ifDefined(searchPlaceholder)}"
            .scopeParameters="${ifDefined(scopeParameters)}"
            ?searchOpenOnload="${activateSearch}"></c4d-search-with-typeahead>
        `;
  }

  /**
   * Renders the contact button.
   *
   * @returns A template fragment representing the contact button.
   */
  protected _renderContact() {
    const { contactUsButton, hasContact } = this;
    return hasContact === 'false'
      ? undefined
      : html`
          <c4d-masthead-contact
            data-ibm-contact="contact-link"
            trigger-label="${ifDefined(
              contactUsButton?.title
            )}"></c4d-masthead-contact>
        `;
  }

  /**
   * Gets the appropriate profile items for the current masthead state.
   *
   * @returns An array of profile items or undefined.
   */
  protected _getProfileItems(): MastheadProfileItem[] | undefined {
    const {
      customProfileLogin,
      userIsAuthenticated,
      authenticatedProfileItems,
      unauthenticatedProfileItems,
    } = this;

    let profileItems;
    if (
      C4D_CUSTOM_PROFILE_LOGIN &&
      customProfileLogin &&
      !userIsAuthenticated
    ) {
      profileItems = unauthenticatedProfileItems?.map((item) => {
        if (item?.id === 'signin') {
          return { ...item, url: customProfileLogin };
        }
        return item;
      });
    } else {
      profileItems = userIsAuthenticated
        ? authenticatedProfileItems
        : unauthenticatedProfileItems;
    }
    return profileItems;
  }

  /**
   * Renders the profile menu.
   *
   * @returns A template fragment representing the profile menu.
   */
  protected _renderProfileMenu() {
    const { hasProfile, userIsAuthenticated } = this;
    return hasProfile === 'false'
      ? ''
      : html`
          <c4d-masthead-profile ?authenticated="${userIsAuthenticated}">
            ${this._getProfileItems()?.map(
              ({ title, url }) =>
                html`
                  <c4d-masthead-profile-item href="${ifDefined(url)}">
                    ${title}
                  </c4d-masthead-profile-item>
                `
            )}
          </c4d-masthead-profile>
        `;
  }

  /**
   * Renders the CTA buttons.
   *
   * @returns A template fragment representing the CTA buttons.
   */
  protected _renderCtaButtons() {
    const { ctaButtons } = this;
    return !ctaButtons
      ? undefined
      : html`
          ${ctaButtons?.map(
            ({ title, url }) =>
              html`
                <c4d-masthead-button-cta href="${ifNonEmpty(url)}" kind="ghost">
                  ${title}
                </c4d-masthead-button-cta>
              `
          )}
        `;
  }

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
  _loadTranslation?: (
    language?: string,
    dataEndpoint?: string
  ) => Promise<Translation>;

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
   * The index of a megamenu that should be visible.
   */
  @state()
  _activeMegamenuIndex?: number;

  /**
   * The index of a megamenu's tabpanel that should be visible.
   */
  @state()
  _activeMegamenuTabKey?: string;

  /**
   * `true` if there is a profile.
   */
  @property({ type: String, reflect: true, attribute: 'has-profile' })
  hasProfile = 'true';

  /**
   * `true` if there is a search.
   */
  @property({ type: String, reflect: true, attribute: 'has-search' })
  hasSearch = 'true';

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
   * The English title of the selected nav item in the L1.
   */
  @property({ attribute: 'selected-menu-item-l1' })
  selectedMenuItemL1!: string;

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
   * Specify translation endpoint if not using default c4d endpoint.
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
   * Logo data
   */
  @property({ attribute: false })
  logoData?: MastheadLogoData;

  /**
   * The navigation links.
   *
   * @deprecated This property name is ambiguous. Use the l0Data prop instead.
   */
  @property({ attribute: false })
  navLinks?: L0MenuItem[];

  /**
   * Data for l0.
   */
  @property({ attribute: false })
  l0Data?: L0MenuItem[];

  /**
   * Temporary getter to fetch data until navLinks prop is phased out.
   */
  private _getl0Data() {
    const { l0Data, navLinks } = this;
    if (navLinks) {
      console.warn(
        `Warning: ${c4dPrefix}-masthead's "navLinks" property is deprecated. Use "l0Data" property instead.`
      );
    }
    return (l0Data || navLinks) as L0MenuItem[];
  }

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
  userStatus =
    this.authMethod === MASTHEAD_AUTH_METHOD.DEFAULT
      ? UNAUTHENTICATED_STATUS
      : CLOUD_UNAUTHENTICATED_STATUS;

  get userIsAuthenticated(): boolean {
    const { userStatus } = this;
    return (
      userStatus !== UNAUTHENTICATED_STATUS &&
      userStatus !== CLOUD_UNAUTHENTICATED_STATUS
    );
  }

  get ctaButtons(): MastheadProfileItem[] | undefined {
    const {
      userIsAuthenticated,
      authenticatedCtaButtons,
      unauthenticatedCtaButtons,
    } = this;
    return userIsAuthenticated
      ? authenticatedCtaButtons
      : unauthenticatedCtaButtons;
  }

  firstUpdated() {
    const { language, dataEndpoint } = this;
    globalInit();
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language, dataEndpoint).catch(() => {}); // The error is logged in the Redux store
    if (this.userStatus === UNAUTHENTICATED_STATUS) {
      this._loadUserStatus?.(this.authMethod);
    }

    // This is a temp fix until we figure out why we can't set styles to the :host(c4d-masthead-container) in stylesheets
    this.style.zIndex = '900';

    // Allows conditional rendering of left/top navs.
    layoutBreakpoint.addEventListener('change', () => {
      this._isMobileVersion = layoutBreakpoint.matches;
      this.requestUpdate();
    });
  }

  updated(changedProperties) {
    if (
      changedProperties.has('language') ||
      changedProperties.has('dataEndpoint')
    ) {
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
      mastheadAssistiveText,
      skipToContentText,
      skipToContentHref,
    } = this;

    return html`
      ${isMobileVersion ? this._renderLeftNav() : ''}
      <c4d-masthead
        ?has-l1=${this.l1Data}
        aria-label="${ifNonEmpty(mastheadAssistiveText)}">
        <c4d-skip-to-content
          href="${skipToContentHref}"
          link-assistive-text="${skipToContentText}"></c4d-skip-to-content>
        ${isMobileVersion ? this._renderMenuButton() : ''} ${this._renderLogo()}
        ${this._renderPlatformTitle()}
        ${!isMobileVersion ? this._renderTopNav() : ''}
        <c4d-masthead-global-bar ?has-search-active=${activateSearch}>
          ${this._renderContact()} ${this._renderProfileMenu()}
          ${this._renderCtaButtons()}
        </c4d-masthead-global-bar>
        ${this._renderL1()}
        <c4d-megamenu-overlay></c4d-megamenu-overlay>
      </c4d-masthead>
    `;
  }

  // @TODO: check if needed after merge
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DMastheadComposite;
