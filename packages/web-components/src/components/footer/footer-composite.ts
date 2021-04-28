/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { globalInit } from '@carbon/ibmdotcom-services/es/services/global/global';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import { LocaleList } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
/* eslint-disable import/no-duplicates */
import { FOOTER_SIZE } from './footer';
// Above import is interface-only ref and thus code won't be brought into the build
import './footer';
// Above import is interface-only ref and thus code won't be brought into the build
import '../locale-modal/locale-modal-composite';
/* eslint-enable import/no-duplicates */
import './footer-logo';
import './footer-nav';
import './footer-nav-group';
import './footer-nav-item';
import './locale-button';
import './legal-nav';
import './legal-nav-item';
import './legal-nav-cookie-preferences-placeholder';
import './language-selector-desktop';
import './language-selector-mobile';
import 'carbon-web-components/es/components/combo-box/combo-box-item';
import 'carbon-web-components/es/components/select/select-item';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that rendres footer from inks data.
 *
 * @element dds-footer-composite
 */
@customElement(`${ddsPrefix}-footer-composite`)
class DDSFooterComposite extends ModalRenderMixin(HybridRenderMixin(HostListenerMixin(LitElement))) {
  /**
   * Handles `click` event on the locale button.
   */
  private _handleClickLocaleButton = () => {
    this.openLocaleModal = true;
  };

  /**
   * Handles `dds-expressive-modal-closed` event on the locale modal.
   */
  @HostListener('document:eventCloseModal')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleCloseModal = (event: CustomEvent) => {
    if ((this.modalRenderRoot as Element).contains(event.target as Node)) {
      this.openLocaleModal = false;
    }
  };

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadLangDisplay?: (language?: string) => Promise<string>;

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadLocaleList?: (language?: string) => Promise<LocaleList>;

  /**
   * The placeholder for `loadTranslation()` Redux action that may be mixed in.
   *
   * @internal
   */
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * The placeholder for `setLanguage()` Redux action that may be mixed in.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

  /**
   * The aria-label to use for the locale-button
   */
  @property()
  buttonLabel?: string;

  /**
   * The clear button label for language selector.
   *
   * @internal
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel?: string;

  /**
   * The g11n collator to use for sorting contry names.
   */
  @property({ attribute: false })
  collatorCountryName = new Intl.Collator();

  /**
   * `true` to omit the locale switcher button.
   */
  @property({ type: Boolean, attribute: 'disable-locale-button' })
  disableLocaleButton = false;

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * Placeholder list of languages to populate language selector
   *
   * @internal
   */
  @property({ attribute: false })
  langList?: string[];

  /**
   * The language to show in the UI.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  /**
   * The placeholder label for language selector.
   *
   * @internal
   */
  @property({ attribute: 'language-selector-label' })
  languageSelectorLabel?: string;

  /**
   * The initial selected language in the selector.
   *
   * @internal
   */
  @property({ attribute: 'selected-language' })
  selectedLanguage?: string;

  /**
   * The legal nav links.
   */
  @property({ attribute: false })
  legalLinks: BasicLink[] = [];

  /**
   * The footer links.
   */
  @property({ attribute: false })
  links: BasicLinkSet[] = [];

  /**
   * The locale list.
   */
  @property({ attribute: false })
  localeList?: LocaleList;

  /**
   * `true` to open the locale modal.
   */
  @property({ type: Boolean, attribute: 'open-locale-modal' })
  openLocaleModal = false;

  /**
   * Footer size.
   */
  @property({ reflect: true })
  size?: FOOTER_SIZE;

  firstUpdated() {
    const { language } = this;
    globalInit();
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadLangDisplay?.(language);
    this._loadTranslation?.(language);
  }

  updated(changedProperties) {
    if (changedProperties.has('language')) {
      const { language } = this;
      if (language) {
        this._setLanguage?.(language);
        this._loadLangDisplay?.(language).catch(() => {}); // The error is logged in the Redux store
        this._loadTranslation?.(language).catch(() => {}); // The error is logged in the Redux store
      }
    }
  }

  /**
   * @returns The locale modal.
   */
  renderModal() {
    const {
      collatorCountryName,
      langDisplay,
      language,
      localeList,
      openLocaleModal,
      _loadLangDisplay: loadLangDisplay,
      _loadLocaleList: loadLocaleList,
    } = this;
    return html`
      <dds-locale-modal-composite
        lang-display="${ifNonNull(langDisplay)}"
        language="${ifNonNull(language)}"
        ?open="${openLocaleModal}"
        .collatorCountryName="${ifNonNull(collatorCountryName)}"
        .localeList="${ifNonNull(localeList)}"
        ._loadLangDisplay="${ifNonNull(loadLangDisplay)}"
        ._loadLocaleList="${ifNonNull(loadLocaleList)}"
      >
      </dds-locale-modal-composite>
    `;
  }

  renderLightDOM() {
    const {
      buttonLabel,
      clearSelectionLabel,
      disableLocaleButton,
      langDisplay,
      langList,
      languageSelectorLabel,
      selectedLanguage,
      size,
      links,
      legalLinks,
      _handleClickLocaleButton: handleClickLocaleButton,
    } = this;
    return html`
      <dds-footer size="${ifNonNull(size)}">
        <dds-footer-logo></dds-footer-logo>
        <dds-footer-nav>
          ${links?.map(
            ({ title: groupTitle, links: groupLinks }) => html`
              <dds-footer-nav-group title-text="${ifNonNull(groupTitle)}">
                ${groupLinks?.map(
                  ({ title, url }) => html`
                    <dds-footer-nav-item href="${ifNonNull(url)}">${title}</dds-footer-nav-item>
                  `
                )}
              </dds-footer-nav-group>
            `
          )}
        </dds-footer-nav>
        ${disableLocaleButton ? console.log('true') : console.log('false')}
        ${size !== FOOTER_SIZE.MICRO && !langList && !disableLocaleButton
          ? html`
              <dds-locale-button buttonLabel="${ifNonNull(buttonLabel)}" size="${size}" @click="${handleClickLocaleButton}"
                >${langDisplay}</dds-locale-button
              >
            `
          : ``}
        ${size !== FOOTER_SIZE.MICRO && langList && !disableLocaleButton
          ? html`
              <dds-language-selector-desktop
                trigger-content="${languageSelectorLabel}"
                value="${selectedLanguage}"
                clear-selection-label="${clearSelectionLabel}"
              >
                ${langList?.map(
                  language => html`
                    <bx-combo-box-item value="${ifNonNull(language)}">${ifNonNull(language)}</bx-combo-box-item>
                  `
                )}
              </dds-language-selector-desktop>
              <dds-language-selector-mobile value="${selectedLanguage}" placeholder="${selectedLanguage}">
                ${langList?.map(
                  language => html`
                    <bx-select-item label="${ifNonNull(language)}" value="${ifNonNull(language)}"
                      >${ifNonNull(language)}</bx-select-item
                    >
                  `
                )}
              </dds-language-selector-mobile>
            `
          : ``}
        <dds-legal-nav size="${ifNonNull(size)}">
          ${legalLinks?.map(
            ({ title, url }) => html`
              <dds-legal-nav-item href="${ifNonNull(url)}">${title}</dds-legal-nav-item>
            `
          )}
          <dds-legal-nav-cookie-preferences-placeholder></dds-legal-nav-cookie-preferences-placeholder>
          ${size === FOOTER_SIZE.MICRO && !langList && !disableLocaleButton
            ? html`
                <dds-locale-button
                  buttonLabel="${ifNonNull(buttonLabel)}"
                  size="${size}"
                  slot="locale"
                  @click="${handleClickLocaleButton}"
                  >${langDisplay}</dds-locale-button
                >
              `
            : ``}
          ${size === FOOTER_SIZE.MICRO && langList && !disableLocaleButton
            ? html`
                <dds-language-selector-desktop
                  size="${size}"
                  slot="locale"
                  trigger-content="${languageSelectorLabel}"
                  value="${selectedLanguage}"
                  clear-selection-label="${clearSelectionLabel}"
                >
                  ${langList?.map(
                    language => html`
                      <bx-combo-box-item value="${ifNonNull(language)}">${ifNonNull(language)}</bx-combo-box-item>
                    `
                  )}
                </dds-language-selector-desktop>
                <dds-language-selector-mobile
                  size="${size}"
                  slot="locale"
                  value="${selectedLanguage}"
                  placeholder="${selectedLanguage}"
                >
                  ${langList?.map(
                    language => html`
                      <bx-select-item label="${ifNonNull(language)}" value="${ifNonNull(language)}"
                        >${ifNonNull(language)}</bx-select-item
                      >
                    `
                  )}
                </dds-language-selector-mobile>
              `
            : ``}
        </dds-legal-nav>
      </dds-footer>
    `;
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }
}

export default DDSFooterComposite;
