/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { pickBy } from 'lodash-es';
import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleList } from '../../globals/services-store/types/localeAPI';
import { BasicLink, BasicLinkSet, MastheadLink, Translation } from '../../globals/services-store/types/translateAPI';
import { USER_AUTHENTICATION_STATUS } from '../../globals/services-store/types/profileAPI';
import { FOOTER_SIZE } from '../footer/footer';
import '../footer/footer-composite';
import { MastheadProfileItem } from '../masthead/masthead-composite';
import { LocaleModalLocaleList } from '../locale-modal/locale-modal-composite';
import './dotcom-shell';
import styles from './dotcom-shell-container.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Component that rendres dotcom shell from links, etc. data.
 *
 * @element dds-dotcom-shell-composite
 */
@customElement(`${ddsPrefix}-dotcom-shell-composite`)
class DDSDotcomShellComposite extends LitElement {
  /**
   * The render target of the footer contents.
   */
  private _footerRenderRoot: Element | null = null;

  /**
   * The render target of the masthead contents.
   */
  private _mastheadRenderRoot: Element | null = null;

  /**
   * @returns The render root of the footer contents.
   */
  private _createFooterRenderRoot() {
    const footer = this.ownerDocument.createElement(`${ddsPrefix}-footer-composite`);
    this.parentNode?.insertBefore(footer, this.nextSibling);
    return footer;
  }

  /**
   * @returns The render root of the masthead contents.
   */
  private _createMastheadRenderRoot() {
    const masthead = this.ownerDocument.createElement(`${ddsPrefix}-masthead-composite`);
    this.parentNode?.insertBefore(masthead, this);
    return masthead;
  }

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _loadLangDisplay?: () => Promise<string>;

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _loadLocaleList?: () => Promise<LocaleList>;

  /**
   * The placeholder for `loadSearchResults()` Redux action that may be mixed in. This goes to masthead.
   *
   * @internal
   */
  _loadSearchResults?: (searchQueryString: string) => Promise<string[]>;

  /**
   * The placeholder for `loadTranslation()` Redux action that will be mixed in. This goes to masthead and footer.
   *
   * @internal
   */
  _loadTranslation?: () => Promise<Translation>;

  /**
   * The placeholder for `monitorUserStatus()` Redux action that will be mixed in. This goes to masthead.
   *
   * @internal
   */
  _monitorUserStatus?: () => void;

  /**
   * The placeholder for `setLangDisplay()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _setLangDisplay?: (string) => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in. This goes to masthead.
   *
   * @internal
   */
  _setLanguage?: (string) => void;

  /**
   * The placeholder for `setLocaleList()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _setLocaleList?: (string, LocaleList) => void;

  /**
   * `true` to activate the search box. This goes to masthead.
   */
  @property({ attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  authenticateProfileItems?: MastheadProfileItem[];

  /**
   * The brand name. This goes to masthead.
   */
  @property({ attribute: 'brand-name' })
  brandName?: string;

  /**
   * The g11n collator to use for sorting contry names. This goes to footer.
   */
  @property({ attribute: false })
  collatorCountryName = new Intl.Collator();

  /**
   * The search results to show in the UI. This goes to masthead.
   * The data typically comes from our search service and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  currentSearchResults: string[] = [];

  /**
   * The throttle timeout to run query upon user input. This goes to masthead.
   */
  @property({ type: Number })
  inputTimeout?: number;

  /**
   * The footer links. This goes to footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  footerLinks: BasicLinkSet[] = [];

  /**
   * The language to show in the UI. This goes to footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: 'lang-display' })
  langDisplay?: string;

  /**
   * The language used for query. This goes to masthead and footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property()
  language?: string;

  /**
   * The legal nav links. This goes to footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  legalLinks: BasicLink[] = [];

  /**
   * The locale list. This goes to footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  localeList?: LocaleModalLocaleList;

  /**
   * The nonce used for logging in. This goes to masthead.
   */
  @property({ attribute: 'login-nonce' })
  loginNonce?: string;

  /**
   * The `aria-label` attribute for the top-level container. This goes to masthead.
   */
  @property({ attribute: 'masthead-assistive-text' })
  mastheadAssistiveText?: string;

  /**
   * The `aria-label` attribute for the menu bar UI. This goes to masthead.
   */
  @property({ attribute: 'menu-bar-assistive-text' })
  menuBarAssistiveText?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state. This goes to masthead.
   */
  @property({ attribute: 'menu-button-assistive-text-active' })
  menuButtonAssistiveTextActive?: string;

  /**
   * The `aria-label` attribute for the header menu button in its active state. This goes to masthead.
   */
  @property({ attribute: 'menu-button-assistive-text-inactive' })
  menuButtonAssistiveTextInactive?: string;

  /**
   * `true` to open the locale modal. This goes to footer.
   */
  @property({ type: Boolean, attribute: 'open-locale-modal' })
  openLocaleModal = false;

  /**
   * Footer size. This goes to footer.
   */
  @property({ reflect: true, attribute: 'footer-size' })
  footerSize?: FOOTER_SIZE;

  /**
   * `true` to open the search dropdown.. This goes to masthead.
   * The data typically comes from our search service and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ type: Boolean, reflect: true, attribute: 'open-search-dropdown' })
  openSearchDropdown = false;

  /**
   * The profile items for unauthenticated state. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  unauthenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The navigation links. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

  /**
   * The user authentication status. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: 'user-status' })
  userStatus?: USER_AUTHENTICATION_STATUS;

  update(changedProperties) {
    super.update(changedProperties);
    if (!this._mastheadRenderRoot) {
      this._mastheadRenderRoot = this._createMastheadRenderRoot();
    }
    const {
      activateSearch,
      authenticateProfileItems,
      brandName,
      collatorCountryName,
      currentSearchResults,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      unauthenticatedProfileItems,
      inputTimeout,
      language,
      langDisplay,
      legalLinks,
      localeList,
      loginNonce,
      footerLinks,
      footerSize,
      openLocaleModal,
      openSearchDropdown,
      navLinks,
      userStatus,
      _loadLangDisplay,
      _setLangDisplay,
      _setLanguage,
      _loadLocaleList,
      _setLocaleList,
      _loadTranslation,
      _monitorUserStatus,
      _loadSearchResults,
    } = this;
    Object.assign(
      this._mastheadRenderRoot,
      pickBy(
        {
          activateSearch,
          authenticateProfileItems,
          brandName,
          currentSearchResults,
          mastheadAssistiveText,
          menuBarAssistiveText,
          menuButtonAssistiveTextActive,
          menuButtonAssistiveTextInactive,
          unauthenticatedProfileItems,
          inputTimeout,
          language,
          loginNonce,
          navLinks,
          openSearchDropdown,
          userStatus,
          _loadSearchResults,
          _loadTranslation,
          _monitorUserStatus,
          _setLanguage,
        },
        value => value !== undefined
      )
    );
    if (!this._footerRenderRoot) {
      this._footerRenderRoot = this._createFooterRenderRoot();
    }
    Object.assign(
      this._footerRenderRoot,
      pickBy(
        {
          collatorCountryName,
          language,
          langDisplay,
          legalLinks,
          links: footerLinks,
          localeList,
          openLocaleModal,
          size: footerSize,
          _loadLangDisplay,
          _loadLocaleList,
          _loadTranslation,
          _setLangDisplay,
          _setLanguage,
          _setLocaleList,
        },
        value => value !== undefined
      )
    );
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <dds-dotcom-shell>
        <slot></slot>
      </dds-dotcom-shell>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSDotcomShellComposite;
