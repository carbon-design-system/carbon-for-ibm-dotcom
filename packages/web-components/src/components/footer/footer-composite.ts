/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
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
import { moderate02 } from '@carbon/motion';

const { stablePrefix: c4dPrefix } = settings;

// Delay matches the CSS animation timing for fadein/out of modal.
const delay = parseInt(moderate02, 10);

/**
 * Component that rendres footer from inks data.
 *
 * @element c4d-footer-composite
 */
@customElement(`${c4dPrefix}-footer-composite`)
class C4DFooterComposite extends MediaQueryMixin(
  ModalRenderMixin(HybridRenderMixin(HostListenerMixin(LitElement))),
  { [MQBreakpoints.LG]: MQDirs.MAX }
) {
  /**
   * Handles `click` event on the locale button.
   */
  private async _handleClickLocaleButton() {
    this.openLocaleModal = true;

    // Set 'open' attribute after modal is in dom so CSS can fade it in.
    this.updateComplete.then(() => {
      const composite = this.modalRenderRoot?.querySelector(
        `${c4dPrefix}-locale-modal-composite`
      );
      composite?.setAttribute('open', '');
    });
  }

  @state()
  _isMobile = this.carbonBreakpoints.lg.matches;

  protected mediaQueryCallbackMaxLG() {
    this._isMobile = this.carbonBreakpoints.lg.matches;
  }

  /**
   * Handles `c4d-expressive-modal-closed` event on the locale modal.
   */
  @HostListener('document:eventCloseModal')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleCloseModal = (event: CustomEvent) => {
    if ((this.modalRenderRoot as Element).contains(event.target as Node)) {
      // Timeout here ensures the modal closing animation is visible.
      setTimeout(() => {
        this.openLocaleModal = false;
      }, delay);
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
   * The aria-label to use for the legal-nav
   */
  @property()
  navLabel?: string;

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
   * @inheritdoc
   */
  modalTriggerProps = ['openLocaleModal', 'localeList'];

  /**
   * `true` to open the locale modal.
   */
  @property({ type: Boolean, attribute: 'open-locale-modal' })
  openLocaleModal;

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
    return openLocaleModal
      ? html`
          <c4d-locale-modal-composite
            lang-display="${ifDefined(langDisplay)}"
            language="${ifDefined(language)}"
            .collatorCountryName="${ifDefined(collatorCountryName)}"
            .localeList="${ifDefined(localeList)}"
            ._loadLocaleList="${ifDefined(loadLocaleList)}">
          </c4d-locale-modal-composite>
        `
      : html``;
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
          <c4d-language-selector-mobile
            size="${dropdownSize}"
            slot="${slot}"
            value="${selectedLanguage}"
            placeholder="${selectedLanguage}">
            ${langList?.map(
              (language) => html`
                <cds-select-item
                  label="${ifDefined(language.text)}"
                  value="${ifDefined(language.text)}"
                  lang="${ifDefined(language.id)}"
                  >${ifDefined(language.text)}</cds-select-item
                >
              `
            )}
          </c4d-language-selector-mobile>
        `
      : html`
          <c4d-language-selector-desktop
            size="${dropdownSize}"
            slot="${slot}"
            trigger-content="${languageSelectorLabel}"
            label-text="${languageSelectorLabel}"
            value="${selectedLanguage}"
            clear-selection-label="${clearSelectionLabel}">
            ${langList?.map(
              (language) => html`
                <cds-combo-box-item
                  value="${ifDefined(language.text)}"
                  lang="${ifDefined(language.id)}"
                  >${ifDefined(language.text)}</cds-combo-box-item
                >
              `
            )}
          </c4d-language-selector-desktop>
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
      <c4d-locale-button
        buttonLabel="${ifDefined(buttonLabel)}"
        size="${size}"
        slot="${slot}"
        @click="${handleClickLocaleButton.bind(this)}"
        >${langDisplay}</c4d-locale-button
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
      navLabel,
    } = this;
    return html`
      <c4d-footer
        size="${ifDefined(size)}"
        ?disable-locale-button="${ifDefined(disableLocaleButton)}">
        <c4d-footer-logo></c4d-footer-logo>
        ${size !== FOOTER_SIZE.MICRO && size !== FOOTER_SIZE.SHORT
          ? html` <c4d-footer-nav
              ?disable-locale-button="${ifDefined(disableLocaleButton)}">
              ${links?.map(
                ({ title: groupTitle, links: groupLinks }) => html`
                  <c4d-footer-nav-group title-text="${ifDefined(groupTitle)}">
                    ${groupLinks?.map(
                      ({ title, url }) => html`
                        <c4d-footer-nav-item href="${ifDefined(url)}"
                          >${title}</c4d-footer-nav-item
                        >
                      `
                    )}
                  </c4d-footer-nav-group>
                `
              )}
              ${!langList && !disableLocaleButton
                ? this.renderLocaleButton()
                : ``}
              ${langList && !disableLocaleButton
                ? this.renderLanguageSelector()
                : ``}
            </c4d-footer-nav>`
          : ``}
        ${(size === FOOTER_SIZE.SHORT || size === FOOTER_SIZE.MICRO) &&
        !langList &&
        !disableLocaleButton
          ? this.renderLocaleButton()
          : ``}
        ${(size === FOOTER_SIZE.SHORT || size === FOOTER_SIZE.MICRO) &&
        langList &&
        !disableLocaleButton
          ? this.renderLanguageSelector()
          : ``}

        <c4d-legal-nav
          size="${ifDefined(size)}"
          navLabel="${ifDefined(navLabel)}">
          <c4d-footer-logo size="${ifDefined(size)}"></c4d-footer-logo>
          ${legalLinks?.map(
            ({ title, url, titleEnglish }) => html`
              <c4d-legal-nav-item
                autoid="${ifDefined(titleEnglish)}"
                href="${ifDefined(url)}"
                >${title}</c4d-legal-nav-item
              >
            `
          )}
          ${size !== FOOTER_SIZE.MICRO
            ? adjunctLinks?.map(
                ({ title, url, titleEnglish }) => html`
                  <c4d-legal-nav-item
                    autoid="${ifDefined(titleEnglish)}"
                    href="${ifDefined(url)}"
                    slot="adjunct-links">
                    ${title}
                  </c4d-legal-nav-item>
                `
              )
            : ``}
          <c4d-legal-nav-cookie-preferences-placeholder></c4d-legal-nav-cookie-preferences-placeholder>
          ${size === FOOTER_SIZE.MICRO && !langList && !disableLocaleButton
            ? this.renderLocaleButton('locale')
            : ``}
          ${size === FOOTER_SIZE.MICRO && langList && !disableLocaleButton
            ? this.renderLanguageSelector('locale')
            : ``}
        </c4d-legal-nav>
      </c4d-footer>
    `;
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventCloseModal() {
    return `${c4dPrefix}-expressive-modal-closed`;
  }
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DFooterComposite;
