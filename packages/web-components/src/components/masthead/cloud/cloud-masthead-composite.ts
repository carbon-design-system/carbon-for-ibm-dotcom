/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { globalInit } from '../../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import './cloud-button-cta';
import './cloud-left-nav-item';
import './cloud-masthead-global-bar';
import './cloud-masthead-profile';
import './cloud-top-nav-name';
import './cloud-megamenu';
import './cloud-megamenu-tabs';
import './cloud-megamenu-tab';
import './cloud-megamenu-left-navigation';
import './cloud-megamenu-right-navigation';
import './cloud-megamenu-category-heading';
import './cloud-megamenu-category-link';
import './cloud-megamenu-category-link-group';
import {
  MastheadMenuItem,
  MastheadProfileItem,
} from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/cloudAccountAuthAPI';
import { MASTHEAD_AUTH_METHOD } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import styles from './cloud-masthead.scss';
import C4DMastheadComposite from '../masthead-composite';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: c4dPrefix } = settings;

// Magic Number: 960px matches masthead.scss's `$breakpoint--desktop-nav`.
const layoutBreakpoint = window.matchMedia(`(max-width: 959px)`);

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
 * @element c4d-cloud-masthead-composite
 */

@customElement(`${c4dPrefix}-cloud-masthead-composite`)
class C4DCloudMastheadComposite extends C4DMastheadComposite {
  /**
   * The placeholder for `loadUserStatus()` Redux action that will be mixed in.
   *
   * @internal
   */
  _loadUserStatus?: (authMethod?: string) => void;

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  authenticatedCtaButtons?: MastheadProfileItem[];

  /**
   * Text for Contact us button
   */
  @property({ attribute: false })
  contactUsButton?: MastheadProfileItem;

  /**
   * `true` if Contact us should be shown.
   */
  @property({ type: String, reflect: true, attribute: 'has-contact' })
  hasContact = 'true';

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedCtaButtons?: MastheadProfileItem[];

  /**
   * The selected authentication method, either 'cookie' or 'api'.
   */
  @property({ attribute: 'auth-method' })
  authMethod = MASTHEAD_AUTH_METHOD.COOKIE;

  /**
   * The user authentication status.
   */
  @property({ attribute: 'user-status' })
  userStatus = UNAUTHENTICATED_STATUS;

  /**
   * The path to which a user will be redirected after successful login.
   */
  @property({ type: String, reflect: false, attribute: 'redirect-path' })
  redirectPath? = '';

  /**
   * Whether the nav should load as `left-nav` or `top-nav`
   */
  _isMobileVersion = layoutBreakpoint.matches;

  /**
   *  Render MegaMenu content
   *
   * @param sections menu section data object
   * @param parentKey parent key
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenu(sections, parentKey) {
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
      <c4d-cloud-megamenu>
        <c4d-cloud-megamenu-left-navigation
          view-all-href="${ifDefined(viewAllLink?.url)}"
          view-all-title="${ifDefined(viewAllLink?.title)}">
          <c4d-cloud-megamenu-tabs value="${sortedMenuItems[0]?.title}">
            ${sortedMenuItems.map((item) => {
              return html`
                <c4d-cloud-megamenu-tab
                  id="tab-${item.itemKey}"
                  target="panel-${item.itemKey}"
                  value="${item.title}"
                  >${item.title}</c4d-cloud-megamenu-tab
                >
              `;
            })}
          </c4d-cloud-megamenu-tabs>
        </c4d-cloud-megamenu-left-navigation>
        <c4d-cloud-megamenu-right-navigation>
          ${sortedMenuItems.map((item) => {
            return html`
              <div
                id="panel-${item.itemKey}"
                role="tabpanel"
                aria-labelledby="tab-${item.itemKey}"
                hidden>
                <c4d-cloud-megamenu-category-heading
                  href="${item.megapanelContent?.headingUrl}"
                  title="${item.megapanelContent?.headingTitle}"
                  >${item.megapanelContent
                    ?.description}</c4d-cloud-megamenu-category-heading
                >
                <c4d-cloud-megamenu-category-link-group>
                  ${item?.megapanelContent?.quickLinks?.links.map(
                    (link) =>
                      html`
                        <c4d-cloud-megamenu-category-link
                          href="${link.url}"
                          title="${link.title}"
                          >${link.description}</c4d-cloud-megamenu-category-link
                        >
                      `
                  )}
                </c4d-cloud-megamenu-category-link-group>
              </div>
            `;
          })}
        </c4d-cloud-megamenu-right-navigation>
      </c4d-cloud-megamenu>
    `;
  }

  /**
   * Renders the left nav menus sections
   *
   * @param object heading heading of menu section
   * @param object.menuItems menu items
   * @param object.heading heading heading of menu section
   * @param object.isSubmenu determines whether menu section is a submenu section
   * @param object.showBackButton Determines whether to show back button
   * @param object.sectionTitle title of menu section
   * @param object.sectionUrl section title url of menu section
   * @param object.sectionId id of menu section
   */
  protected _renderLeftNavMenuSections({
    menuItems,
    heading = '',
    isSubmenu = false,
    showBackButton = false,
    sectionTitle = '',
    sectionUrl = '',
    sectionId = '',
  }) {
    const {
      userStatus,
      authenticatedProfileItems,
      unauthenticatedProfileItems,
      authenticatedCtaButtons,
      unauthenticatedCtaButtons,
    } = this;
    const authenticated = userStatus !== 'anonymous';
    const profileItems = authenticated
      ? authenticatedProfileItems
      : unauthenticatedProfileItems;
    const ctaButtons = authenticated
      ? authenticatedCtaButtons
      : unauthenticatedCtaButtons;

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
          data-autoid="${elem.autoid}"></c4d-left-nav-menu-item>
      `;
    });

    if (heading) {
      items.unshift(
        html`
          <c4d-left-nav-menu-category-heading
            >${heading}</c4d-left-nav-menu-category-heading
          >
        `
      );
    }

    if (!isSubmenu) {
      items.push(
        html`
          ${authenticated
            ? null
            : html`
                ${profileItems?.map((item) => {
                  return html`
                    <c4d-cloud-left-nav-item
                      href="${item.url}"
                      title="${item.title}"></c4d-cloud-left-nav-item>
                  `;
                })}
              `}
          ${ctaButtons?.map((item) => {
            return html`
              <c4d-cloud-left-nav-item
                href="${item.url}"
                title="${item.title}"></c4d-cloud-left-nav-item>
            `;
          })}
        `
      );
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

  firstUpdated() {
    const { language, dataEndpoint } = this;
    globalInit();
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language, dataEndpoint).catch(() => {}); // The error is logged in the Redux store
    this._loadUserStatus?.(this.authMethod);

    this.style.zIndex = '900';

    // Allows conditional rendering of left/top navs.
    layoutBreakpoint.addEventListener('change', () => {
      this._isMobileVersion = layoutBreakpoint.matches;
      this.requestUpdate();
    });
  }

  render() {
    const {
      _isMobileVersion: isMobileVersion,
      activateSearch,
      authenticatedProfileItems,
      authenticatedCtaButtons,
      contactUsButton,
      hasContact,
      platform,
      platformUrl,
      inputTimeout,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      language,
      openSearchDropdown,
      searchPlaceholder,
      unauthenticatedProfileItems,
      unauthenticatedCtaButtons,
      userStatus,
      l1Data,
    } = this;
    const authenticated = userStatus !== 'anonymous';
    const profileItems = authenticated
      ? authenticatedProfileItems
      : unauthenticatedProfileItems;
    const ctaButtons = authenticated
      ? authenticatedCtaButtons
      : unauthenticatedCtaButtons;
    const formattedLang = language
      ?.toLowerCase()
      .replace(/-(.*)/, (m) => m.toUpperCase());
    let platformAltUrl = platformUrl;
    if (platformUrl && formattedLang) {
      if (
        typeof platformUrl === 'object' &&
        Object.prototype.hasOwnProperty.call(platformUrl, formattedLang)
      ) {
        platformAltUrl = platformUrl[formattedLang].url || platformUrl;
      }
    }

    return html`
      ${isMobileVersion
        ? html`
            <c4d-left-nav-overlay cloud></c4d-left-nav-overlay>
            <c4d-left-nav cloud>
              ${!platform
                ? undefined
                : html`
                    <c4d-left-nav-name href="${ifDefined(platformAltUrl)}"
                      >${platform}</c4d-left-nav-name
                    >
                  `}
              ${this._renderNavItems({
                target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV,
                hasL1: !!l1Data,
              })}
            </c4d-left-nav>
          `
        : ''}
      <c4d-masthead aria-label="${ifDefined(mastheadAssistiveText)}">
        ${isMobileVersion
          ? html`
              <c4d-masthead-menu-button
                cloud
                button-label-active="${ifDefined(
                  menuButtonAssistiveTextActive
                )}"
                button-label-inactive="${ifDefined(
                  menuButtonAssistiveTextInactive
                )}">
              </c4d-masthead-menu-button>
            `
          : ''}
        ${this._renderLogo()}
        ${!platform
          ? undefined
          : html`
              <c4d-cloud-top-nav-name href="${ifDefined(platformAltUrl)}"
                >${platform}</c4d-cloud-top-nav-name
              >
            `}
        ${l1Data
          ? undefined
          : !isMobileVersion
          ? html`
              <c4d-top-nav
                cloud
                menu-bar-label="${ifDefined(menuBarAssistiveText)}">
                ${this._renderNavItems({
                  target: NAV_ITEMS_RENDER_TARGET.TOP_NAV,
                  hasL1: false,
                })}
              </c4d-top-nav>
            `
          : undefined}
        <c4d-search-with-typeahead
          ?active="${activateSearch}"
          input-timeout="${inputTimeout}"
          language="${ifDefined(language)}"
          ?open="${openSearchDropdown}"
          placeholder="${ifDefined(
            searchPlaceholder
          )}"></c4d-search-with-typeahead>
        ${authenticated
          ? html`
              <c4d-cloud-masthead-global-bar>
                <c4d-cloud-masthead-profile>
                  ${profileItems?.map(
                    ({ title, url }) =>
                      html`
                        <c4d-cloud-button-cta
                          href="${ifDefined(url)}"
                          kind="ghost"
                          >${title}</c4d-cloud-button-cta
                        >
                      `
                  )}
                </c4d-cloud-masthead-profile>
                ${hasContact === 'false'
                  ? ''
                  : html`
                      <c4d-cloud-button-cta
                        kind="ghost"
                        data-ibm-contact="contact-link"
                        ><span
                          >${contactUsButton?.title}</span
                        ></c4d-cloud-button-cta
                      >
                    `}
                ${ctaButtons?.map(
                  ({ title, url }) =>
                    html`
                      <c4d-cloud-button-cta
                        href="${ifDefined(url)}"
                        class="console"
                        kind="ghost"
                        >${title}</c4d-cloud-button-cta
                      >
                    `
                )}
              </c4d-cloud-masthead-global-bar>
            `
          : html`
              <c4d-cloud-masthead-global-bar>
                ${hasContact === 'false'
                  ? ''
                  : html`
                      <c4d-cloud-button-cta
                        kind="ghost"
                        data-ibm-contact="contact-link"
                        ><span
                          >${contactUsButton?.title}</span
                        ></c4d-cloud-button-cta
                      >
                    `}
                ${profileItems?.map(
                  ({ title, url }) =>
                    html`
                      <c4d-cloud-button-cta
                        href="${url === 'https://cloud.ibm.com/login' &&
                        this.redirectPath
                          ? ifDefined(
                              `${url}?redirect=${encodeURIComponent(
                                this.redirectPath
                              )}`
                            )
                          : ifDefined(url)}"
                        kind="ghost"
                        >${title}</c4d-cloud-button-cta
                      >
                    `
                )}
                ${ctaButtons?.map(
                  ({ title, url }) =>
                    html`
                      <c4d-cloud-button-cta
                        href="${ifDefined(url)}"
                        kind="primary"
                        >${title}</c4d-cloud-button-cta
                      >
                    `
                )}
              </c4d-cloud-masthead-global-bar>
            `}
        ${!l1Data ? undefined : this._renderL1()}
        <c4d-megamenu-overlay></c4d-megamenu-overlay>
      </c4d-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default C4DCloudMastheadComposite;
