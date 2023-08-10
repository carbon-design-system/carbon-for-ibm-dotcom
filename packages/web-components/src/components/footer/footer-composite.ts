/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import LocaleAPI from '../../internal/vendor/@carbon/ibmdotcom-services/services/Locale/Locale';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import { globalInit } from '../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import { LocaleList } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { FOOTER_SIZE } from './footer';
import { DROPDOWN_SIZE } from './combo-box';
// Above import is interface-only ref and thus code won't be brought into the build
import './footer';
// Above import is interface-only ref and thus code won't be brought into the build
import '../locale-modal/locale-modal-composite';
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
import '../../internal/vendor/@carbon/web-components/components/combo-box/combo-box-item.js';
import '../../internal/vendor/@carbon/web-components/components/select/select-item.js';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { stablePrefix: ddsPrefix } = settings;

/**
 * Component that rendres footer from inks data.
 *
 * @element dds-footer-composite
 */
@customElement(`${ddsPrefix}-footer-composite`)
class DDSFooterComposite extends MediaQueryMixin(
  ModalRenderMixin(HybridRenderMixin(HostListenerMixin(LitElement))),
  { [MQBreakpoints.LG]: MQDirs.MAX }
) {
  /**
   * Handles `click` event on the locale button.
   */
  private _handleClickLocaleButton = () => {
    this.openLocaleModal = true;
  };

  @state()
  _isMobile = this.carbonBreakpoints.lg.matches;

  protected mediaQueryCallbackMaxLG() {
    this._isMobile = this.carbonBreakpoints.lg.matches;
  }

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
  langList?: { id: string; text: string }[];

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
   * The adjunct links.
   */
  @property({ attribute: false })
  adjunctLinks: BasicLink[] = [];

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

  // eslint-disable-next-line class-methods-use-this
  async getLangDisplay() {
    const response = await LocaleAPI.getLangDisplay();
    return response;
  }

  firstUpdated() {
    const { language } = this;
    globalInit();
    if (language) {
      this._setLanguage?.(language);
    }
    this._loadTranslation?.(language);

    this.getLangDisplay().then((res) => {
      this.langDisplay = res;
    });

    super.firstUpdated();
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
      _loadLocaleList: loadLocaleList,
    } = this;
    return html`
      <dds-locale-modal-composite
        lang-display="${ifDefined(langDisplay)}"
        language="${ifDefined(language)}"
        ?open="${openLocaleModal}"
        .collatorCountryName="${ifDefined(collatorCountryName)}"
        .localeList="${ifDefined(localeList)}"
        ._loadLocaleList="${ifDefined(loadLocaleList)}">
      </dds-locale-modal-composite>
    `;
  }

  renderLanguageSelector(slot = 'language-selector') {
    const {
      clearSelectionLabel,
      _isMobile: isMobile,
      langList,
      languageSelectorLabel,
      selectedLanguage,
      size,
    } = this;
    const dropdownSize =
      size === FOOTER_SIZE.MICRO ? DROPDOWN_SIZE.MICRO : DROPDOWN_SIZE.LARGE;
    return isMobile
      ? html`
          <dds-language-selector-mobile
            size="${dropdownSize}"
            slot="${slot}"
            value="${selectedLanguage}"
            placeholder="${selectedLanguage}">
            ${langList?.map(
              (language) => html`
                <bx-select-item
                  label="${ifDefined(language.text)}"
                  value="${ifDefined(language.text)}"
                  lang="${ifDefined(language.id)}"
                  >${ifDefined(language.text)}</bx-select-item
                >
              `
            )}
          </dds-language-selector-mobile>
        `
      : html`
          <dds-language-selector-desktop
            size="${dropdownSize}"
            slot="${slot}"
            trigger-content="${languageSelectorLabel}"
            label-text="${languageSelectorLabel}"
            value="${selectedLanguage}"
            clear-selection-label="${clearSelectionLabel}">
            ${langList?.map(
              (language) => html`
                <bx-combo-box-item
                  value="${ifDefined(language.text)}"
                  lang="${ifDefined(language.id)}"
                  >${ifDefined(language.text)}</bx-combo-box-item
                >
              `
            )}
          </dds-language-selector-desktop>
        `;
  }

  renderLocaleButton(slot = 'locale-button') {
    const {
      buttonLabel,
      _handleClickLocaleButton: handleClickLocaleButton,
      langDisplay,
      size,
    } = this;
    return html`
      <dds-locale-button
        buttonLabel="${ifDefined(buttonLabel)}"
        size="${size}"
        slot="${slot}"
        @click="${handleClickLocaleButton}"
        >${langDisplay}</dds-locale-button
      >
    `;
  }

  renderLightDOM() {
    const {
      disableLocaleButton,
      langList,
      size,
      links,
      legalLinks,
      adjunctLinks,
    } = this;
    return html`
      <dds-footer
        size="${ifDefined(size)}"
        ?disable-locale-button="${ifDefined(disableLocaleButton)}">
        <dds-footer-logo></dds-footer-logo>
        <dds-footer-nav
          ?disable-locale-button="${ifDefined(disableLocaleButton)}">
          ${links?.map(
            ({ title: groupTitle, links: groupLinks }) => html`
              <dds-footer-nav-group title-text="${ifDefined(groupTitle)}">
                ${groupLinks?.map(
                  ({ title, url }) => html`
                    <dds-footer-nav-item href="${ifDefined(url)}"
                      >${title}</dds-footer-nav-item
                    >
                  `
                )}
              </dds-footer-nav-group>
            `
          )}
        </dds-footer-nav>
        ${size !== FOOTER_SIZE.MICRO && !langList && !disableLocaleButton
          ? this.renderLocaleButton()
          : ``}
        ${size !== FOOTER_SIZE.MICRO && langList && !disableLocaleButton
          ? this.renderLanguageSelector()
          : ``}
        <dds-legal-nav size="${ifDefined(size)}">
          ${legalLinks?.map(
            ({ title, url, titleEnglish }) => html`
              <dds-legal-nav-item
                autoid="${ifDefined(titleEnglish)}"
                href="${ifDefined(url)}"
                >${title}</dds-legal-nav-item
              >
            `
          )}
          ${size !== FOOTER_SIZE.MICRO
            ? adjunctLinks?.map(
                ({ title, url, titleEnglish }) => html`
                  <dds-legal-nav-item
                    autoid="${ifDefined(titleEnglish)}"
                    href="${ifDefined(url)}"
                    slot="adjunct-links">
                    ${title}
                  </dds-legal-nav-item>
                `
              )
            : ``}
          <dds-legal-nav-cookie-preferences-placeholder></dds-legal-nav-cookie-preferences-placeholder>
          ${size === FOOTER_SIZE.MICRO && !langList && !disableLocaleButton
            ? this.renderLocaleButton('locale')
            : ``}
          ${size === FOOTER_SIZE.MICRO && langList && !disableLocaleButton
            ? this.renderLanguageSelector('locale')
            : ``}
        </dds-legal-nav>
      </dds-footer>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${ddsPrefix}-expressive-modal-closed`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSFooterComposite;
