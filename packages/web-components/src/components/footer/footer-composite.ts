/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import HybridRenderMixin from '../../globals/mixins/hybrid-render';
import ModalRenderMixin from '../../globals/mixins/modal-render';
import { LocaleList } from '../../globals/services-store/types/localeAPI';
import { BasicLink, BasicLinkSet, Translation } from '../../globals/services-store/types/translateAPI';
import Handle from '../../globals/internal/handle';
import { FOOTER_SIZE } from './footer';
import './footer-logo';
import './footer-nav';
import './footer-nav-group';
import './footer-nav-item';
import './locale-button';
import './legal-nav';
import './legal-nav-item';
import './legal-nav-cookie-preferences-placeholder';
import '../locale-modal/locale-modal-composite';
import { LocaleModalLocaleList } from '../locale-modal/locale-modal-composite';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that rendres footer from inks data.
 *
 * @element dds-footer-composite
 */
@customElement(`${ddsPrefix}-footer-composite`)
class DDSFooterComposite extends ModalRenderMixin(HybridRenderMixin(LitElement)) {
  /**
   * The handle for the listener of `${ddsPrefix}-modal-closed` event.
   */
  private _hCloseModal: Handle | null = null;

  /**
   * The placeholder for `setLanguage()` Redux action that may be mixed in.
   */
  private _setLanguage!: (string) => void;

  /**
   * The placeholder for `setLangDisplay()` Redux action that may be mixed in.
   */
  private _setLangDisplay!: (string) => void;

  /**
   * The placeholder for `setLocaleList()` Redux action that may be mixed in.
   */
  private _setLocaleList!: (string, LocaleList) => void;

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in.
   */
  private _loadLangDisplay!: () => Promise<string>;

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in.
   */
  private _loadLocaleList!: () => Promise<LocaleList>;

  /**
   * The placeholder for `loadTranslation()` Redux action that may be mixed in.
   */
  private _loadTranslation!: () => Promise<Translation>;

  /**
   * Handles `click` event on the locale button.
   */
  private _handleClickLocaleButton = () => {
    this.openLocaleModal = true;
  };

  /**
   * Handles `dds-modal-closed` event on the locale modal.
   */
  private _handleCloseModal = (event: CustomEvent) => {
    if ((this.modalRenderRoot as Element).contains(event.target as Node)) {
      this.openLocaleModal = false;
    }
  };

  /**
   * The g11n collator to use for sorting contry names.
   */
  @property({ attribute: false })
  collatorCountryName = new Intl.Collator();

  /**
   * The language used for query.
   */
  @property()
  language?: string;

  /**
   * The language to show in the UI.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

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
  localeList?: LocaleModalLocaleList;

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

  connectedCallback() {
    super.connectedCallback();
    // Manually hooks the event listeners on the host element to make the event names configurable
    this._hCloseModal = on(
      this.ownerDocument,
      (this.constructor as typeof DDSFooterComposite).eventCloseModal,
      this._handleCloseModal as EventListener
    );
  }

  disconnectedCallback() {
    if (this._hCloseModal) {
      this._hCloseModal = this._hCloseModal.release();
    }
    super.disconnectedCallback();
  }

  firstUpdated() {
    const { language } = this;
    if (language) {
      this._setLanguage?.(language);
    }
    const { langDisplay } = this;
    if (langDisplay) {
      this._setLangDisplay?.(langDisplay);
    }
    this._loadLangDisplay?.();
    const { localeList } = this;
    if (language && localeList) {
      this._setLocaleList?.(language, localeList);
    }
    this._loadLocaleList?.();
    this._loadTranslation?.();
  }

  /**
   * @returns The locale modal.
   */
  renderModal() {
    const { collatorCountryName, langDisplay, language, localeList, openLocaleModal } = this;
    return html`
      <dds-locale-modal-composite
        lang-display="${ifNonNull(langDisplay)}"
        language="${ifNonNull(language)}"
        ?open="${openLocaleModal}"
        .collatorCountryName="${ifNonNull(collatorCountryName)}"
        .localeList="${ifNonNull(localeList)}"
      >
      </dds-locale-modal-composite>
    `;
  }

  renderLightDOM() {
    const { langDisplay, size, links, legalLinks, _handleClickLocaleButton: handleClickLocaleButton } = this;
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
        <dds-locale-button @click="${handleClickLocaleButton}">${langDisplay}</dds-locale-button>
        <dds-legal-nav>
          ${legalLinks?.map(
            ({ title, url }) => html`
              <dds-legal-nav-item href="${ifNonNull(url)}">${title}</dds-legal-nav-item>
            `
          )}
          <dds-legal-nav-cookie-preferences-placeholder></dds-legal-nav-cookie-preferences-placeholder>
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
    return `${ddsPrefix}-modal-closed`;
  }
}

export default DDSFooterComposite;
