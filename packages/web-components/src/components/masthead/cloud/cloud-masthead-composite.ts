/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
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
import styles from './cloud-masthead.scss';
import DDSMastheadComposite, { NAV_ITEMS_RENDER_TARGET } from '../masthead-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that renders masthead from links, etc. data.
 *
 * @element dds-cloud-masthead-composite
 */

@customElement(`${ddsPrefix}-cloud-masthead-composite`)
class DDSCloudMastheadComposite extends DDSMastheadComposite {
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
  @property({ type: Boolean, attribute: 'has-contact' })
  hasContact = true;

  /**
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedCtaButtons?: MastheadProfileItem[];

  /**
   *  Render MegaMenu content
   *
   * @param sections menu section data object
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMegaMenu(sections) {
    let viewAllLink;
    type menuItem = MastheadMenuItem & { itemKey: String };
    const sortedMenuItems: menuItem[] = [];
    sections[0].menuItems?.forEach(item => {
      if (item.megaPanelViewAll) {
        viewAllLink = item;
        return viewAllLink;
      }
      const title = item.title
        .replace(/[^-a-zA-Z0-9_ ]/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();

      return sortedMenuItems.push({ ...item, itemKey: title });
    });

    return html`
      <dds-cloud-megamenu>
        <dds-cloud-megamenu-left-navigation
          view-all-href="${ifNonNull(viewAllLink?.url)}"
          view-all-title="${ifNonNull(viewAllLink?.title)}"
        >
          <dds-cloud-megamenu-tabs value="${sortedMenuItems[0]?.itemKey}">
            ${sortedMenuItems.map(item => {
              return html`
                <dds-cloud-megamenu-tab id="tab-${item.itemKey}" target="panel-${item.itemKey}" value="${item.itemKey}"
                  >${item.title}</dds-cloud-megamenu-tab
                >
              `;
            })}
          </dds-cloud-megamenu-tabs>
        </dds-cloud-megamenu-left-navigation>
        <dds-cloud-megamenu-right-navigation>
          ${sortedMenuItems.map(item => {
            return html`
              <div id="panel-${item.itemKey}" role="tabpanel" aria-labelledby="tab-${item.itemKey}" hidden>
                <dds-cloud-megamenu-category-heading
                  href="${item.megapanelContent?.headingUrl}"
                  title="${item.megapanelContent?.headingTitle}"
                  >${item.megapanelContent?.description}</dds-cloud-megamenu-category-heading
                >
                <dds-cloud-megamenu-category-link-group>
                  ${item?.megapanelContent?.quickLinks?.links.map(
                    link =>
                      html`
                        <dds-cloud-megamenu-category-link href="${link.url}" title="${link.title}"
                          >${link.description}</dds-cloud-megamenu-category-link
                        >
                      `
                  )}
                </dds-cloud-megamenu-category-link-group>
              </div>
            `;
          })}
        </dds-cloud-megamenu-right-navigation>
      </dds-cloud-megamenu>
    `;
  }

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      authenticatedCtaButtons,
      contactUsButton,
      currentSearchResults,
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
      selectedMenuItem,
      unauthenticatedProfileItems,
      unauthenticatedCtaButtons,
      userStatus,
      l1Data,
      _loadSearchResults: loadSearchResults,
    } = this;
    const authenticated = userStatus !== 'anonymous';
    const profileItems = authenticated ? authenticatedProfileItems : unauthenticatedProfileItems;
    const ctaButtons = authenticated ? authenticatedCtaButtons : unauthenticatedCtaButtons;
    return html`
      <dds-left-nav-overlay></dds-left-nav-overlay>
      <dds-left-nav>
        ${!platform
          ? undefined
          : html`
              <dds-left-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-left-nav-name>
            `}
        ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.LEFT_NAV, hasL1: !!l1Data })}
        ${authenticated
          ? null
          : html`
              ${profileItems?.map(item => {
                return html`
                  <dds-cloud-left-nav-item href="${item.url}" title="${item.title}"></dds-cloud-left-nav-item>
                `;
              })}
            `}
        ${ctaButtons?.map(item => {
          return html`
            <dds-cloud-left-nav-item href="${item.url}" title="${item.title}"></dds-cloud-left-nav-item>
          `;
        })}
      </dds-left-nav>
      <dds-masthead aria-label="${ifNonNull(mastheadAssistiveText)}">
        <dds-masthead-menu-button
          button-label-active="${ifNonNull(menuButtonAssistiveTextActive)}"
          button-label-inactive="${ifNonNull(menuButtonAssistiveTextInactive)}"
        >
        </dds-masthead-menu-button>

        ${this._renderLogo()}
        ${!platform
          ? undefined
          : html`
              <dds-cloud-top-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-cloud-top-nav-name>
            `}
        ${l1Data
          ? undefined
          : html`
              <dds-top-nav menu-bar-label="${ifNonNull(menuBarAssistiveText)}">
                ${this._renderNavItems({ selectedMenuItem, target: NAV_ITEMS_RENDER_TARGET.TOP_NAV, hasL1: false })}
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
        ${authenticated
          ? html`
              <dds-cloud-masthead-global-bar>
                <dds-cloud-masthead-profile>
                  ${profileItems?.map(
                    ({ title, url }) =>
                      html`
                        <dds-cloud-button-cta href="${ifNonNull(url)}" kind="ghost">${title}</dds-cloud-button-cta>
                      `
                  )}
                </dds-cloud-masthead-profile>
                ${hasContact
                  ? html`
                      <dds-cloud-button-cta kind="ghost" data-ibm-contact="chat-link"
                        >${contactUsButton?.title}</dds-cloud-button-cta
                      >
                    `
                  : undefined}
                ${ctaButtons?.map(
                  ({ title, url }) =>
                    html`
                      <dds-cloud-button-cta href="${ifNonNull(url)}" class="console" kind="ghost">${title}</dds-cloud-button-cta>
                    `
                )}
              </dds-cloud-masthead-global-bar>
            `
          : html`
              <dds-cloud-masthead-global-bar>
                ${hasContact
                  ? html`
                      <dds-cloud-button-cta kind="ghost" data-ibm-contact="chat-link"
                        >${contactUsButton?.title}</dds-cloud-button-cta
                      >
                    `
                  : undefined}
                ${profileItems?.map(
                  ({ title, url }) =>
                    html`
                      <dds-cloud-button-cta href="${ifNonNull(url)}" kind="ghost">${title}</dds-cloud-button-cta>
                    `
                )}
                ${ctaButtons?.map(
                  ({ title, url }) =>
                    html`
                      <dds-cloud-button-cta href="${ifNonNull(url)}" kind="primary">${title}</dds-cloud-button-cta>
                    `
                )}
              </dds-cloud-masthead-global-bar>
            `}
        ${!l1Data ? undefined : this._renderL1({ selectedMenuItem })}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMastheadComposite;
