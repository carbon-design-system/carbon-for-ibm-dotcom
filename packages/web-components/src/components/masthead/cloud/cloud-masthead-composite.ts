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
import './cloud-masthead-profile';
import './cloud-button-cta';
import { MastheadProfileItem } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
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
   * The profile items for unauthenticated state.
   */
  @property({ attribute: false })
  unauthenticatedCtaButtons?: MastheadProfileItem[];

  render() {
    const {
      activateSearch,
      authenticatedProfileItems,
      authenticatedCtaButtons,
      contactUsButton,
      currentSearchResults,
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
        ${!platform
          ? undefined
          : html`
              <dds-top-nav-name href="${ifNonNull(platformUrl)}">${platform}</dds-top-nav-name>
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
          ${authenticated
            ? html`
                <dds-cloud-masthead-profile>
                  ${profileItems?.map(
                    ({ title, url }) =>
                      html`
                        <dds-cloud-button-cta href="${ifNonNull(url)}" kind="ghost">${title}</dds-cloud-button-cta>
                      `
                  )}
                </dds-cloud-masthead-profile>
                <dds-cloud-button-cta kind="ghost">${contactUsButton?.title}</dds-cloud-button-cta>
                ${ctaButtons?.map(
                  ({ title, url }) =>
                    html`
                      <dds-cloud-button-cta href="${ifNonNull(url)}" kind="ghost">${title}</dds-cloud-button-cta>
                    `
                )}
              `
            : html`
                <dds-cloud-button-cta kind="ghost">${contactUsButton?.title}</dds-cloud-button-cta>
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
              `}
        </dds-masthead-global-bar>
        ${!l1Data ? undefined : this._renderL1({ selectedMenuItem })}
        <dds-megamenu-overlay></dds-megamenu-overlay>
      </dds-masthead>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSCloudMastheadComposite;
