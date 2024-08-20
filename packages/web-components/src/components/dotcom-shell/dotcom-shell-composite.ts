/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { globalInit } from '../../internal/vendor/@carbon/ibmdotcom-services/services/global/global';
import { LocaleList } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
  MastheadL1,
  L0MenuItem,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { UNAUTHENTICATED_STATUS } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { FOOTER_SIZE } from '../footer/footer';
import '../footer/footer-composite';
import './dotcom-shell';
import styles from './dotcom-shell.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { stablePrefix: c4dPrefix } = settings;

/**
 * Component that renders dotcom shell from links, etc. data.
 *
 * @element c4d-dotcom-shell-composite
 */
@customElement(`${c4dPrefix}-dotcom-shell-composite`)
class C4DDotcomShellComposite extends LitElement {
  /**
   * The render target of the footer contents.
   */
  private _footerRenderRoot: Element | null = null;

  /**
   * The render target of the masthead contents.
   */
  private _mastheadRenderRoot: Element | null = null;

  /**
   * The masthead element.
   */
  private _masthead?: HTMLElement;

  /**
   * @returns The render root of the footer contents.
   */
  private _createFooterRenderRoot() {
    const footer = this.ownerDocument!.createElement(
      `${c4dPrefix}-footer-composite`
    );
    this.parentNode?.insertBefore(footer, this.nextSibling);
    return footer;
  }

  /**
   * @returns The render root of the masthead contents.
   */
  private _createMastheadRenderRoot() {
    const masthead = this.ownerDocument!.createElement(
      `${c4dPrefix}-masthead-container`
    );
    this.parentNode?.insertBefore(masthead, this);
    return masthead;
  }

  /**
   * The placeholder for `loadLocaleList()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _loadLocaleList?: (language?: string) => Promise<LocaleList>;

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
  _loadTranslation?: (language?: string) => Promise<Translation>;

  /**
   * The placeholder for `loadUserStatus()` Redux action that will be mixed in. This goes to masthead.
   *
   * @internal
   */
  _loadUserStatus?: () => void;

  /**
   * The placeholder for `setLanguage()` Redux action that will be mixed in. This goes to masthead.
   *
   * @internal
   */
  _setLanguage?: (language: string) => void;

  /**
   * `true` if there is a profile.
   */
  @property({ type: Boolean, attribute: 'has-profile' })
  hasProfile = true;

  /**
   * `true` if there is a search.
   */
  @property({ type: Boolean, attribute: 'has-search' })
  hasSearch = true;

  /**
   * `true` if there is a global banner.
   */
  @property({ type: Boolean, attribute: 'has-banner' })
  hasBanner = false;

  /**
   * `true` to activate the search box. This goes to masthead.
   */
  @property({ type: Boolean, attribute: 'activate-search' })
  activateSearch = false;

  /**
   * The profile items for authenticated state. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  authenticatedProfileItems?: MastheadProfileItem[];

  /**
   * The boolean to enable custom typeahead API.
   */
  @property({ attribute: 'custom-typeahead-api', type: Boolean })
  customTypeaheadAPI = false;

  /**
   * The platform name. This goes to masthead.
   */
  @property({ attribute: 'platform' })
  platform?: string;

  /**
   * The platform url.
   */
  @property({ attribute: 'platform-url' })
  platformUrl?: string;

  /**
   * The clear button label for language selector.
   *
   * @internal
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel?: string;

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
   * `true` to omit the locale switcher button.
   */
  @property({ type: Boolean, attribute: 'disable-locale-button' })
  disableLocaleButton = false;

  /**
   * The throttle timeout to run query upon user input. This goes to masthead.
   */
  @property({ type: Number, attribute: 'input-timeout' })
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
   * The language used for query. This goes to masthead and footer.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
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
  localeList?: LocaleList;

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
   * The English title of the selected nav item.
   */
  @property({ attribute: 'selected-menu-item' })
  selectedMenuItem!: string;

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
   * Data for l1.
   */
  @property({ attribute: false })
  l1Data?: MastheadL1;

  /**
   * The navigation links. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   *
   * @deprecated Use l0Data instead.
   */
  @property({ attribute: false })
  navLinks?: L0MenuItem[];

  /**
   * The navigation links. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  l0Data?: L0MenuItem[];

  /**
   * The parameters passed to the search-with-typeahead for search scope
   */
  @property()
  scopeParameters;

  /**
   * Value to display when the input has an empty `value`.
   */
  @property()
  searchPlaceholder?: string;

  /**
   * The user authentication status. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: 'user-status' })
  userStatus = UNAUTHENTICATED_STATUS;

  // eslint-disable-next-line class-methods-use-this
  firstUpdated() {
    globalInit();
  }

  update(changedProperties) {
    super.update(changedProperties);

    if (!this._mastheadRenderRoot) {
      this._mastheadRenderRoot = this._createMastheadRenderRoot();
    }

    const {
      activateSearch,
      authenticatedProfileItems,
      platform,
      platformUrl,
      collatorCountryName,
      currentSearchResults,
      customTypeaheadAPI,
      clearSelectionLabel,
      disableLocaleButton,
      mastheadAssistiveText,
      menuBarAssistiveText,
      menuButtonAssistiveTextActive,
      menuButtonAssistiveTextInactive,
      unauthenticatedProfileItems,
      inputTimeout,
      l1Data,
      language,
      languageSelectorLabel,
      langDisplay,
      langList,
      legalLinks,
      localeList,
      footerLinks,
      footerSize,
      openSearchDropdown,
      navLinks,
      l0Data,
      hasProfile,
      hasSearch,
      searchPlaceholder,
      scopeParameters,
      selectedLanguage,
      selectedMenuItem,
      userStatus,
      _setLanguage,
      _loadLocaleList,
      _loadTranslation,
      _loadUserStatus,
      _loadSearchResults,
    } = this;
    Object.assign(
      this._mastheadRenderRoot,
      pickBy(
        {
          activateSearch,
          authenticatedProfileItems,
          platform,
          platformUrl,
          currentSearchResults,
          customTypeaheadAPI,
          mastheadAssistiveText,
          menuBarAssistiveText,
          menuButtonAssistiveTextActive,
          menuButtonAssistiveTextInactive,
          unauthenticatedProfileItems,
          inputTimeout,
          l1Data,
          language,
          navLinks,
          l0Data,
          hasProfile,
          hasSearch,
          searchPlaceholder,
          scopeParameters,
          openSearchDropdown,
          selectedMenuItem,
          userStatus,
          _loadSearchResults,
          _loadTranslation,
          _loadUserStatus,
          _setLanguage,
        },
        (value) => value !== undefined
      )
    );
    if (!this._footerRenderRoot) {
      this._footerRenderRoot = this._createFooterRenderRoot();
    }
    Object.assign(
      this._footerRenderRoot,
      pickBy(
        {
          clearSelectionLabel,
          collatorCountryName,
          disableLocaleButton,
          language,
          languageSelectorLabel,
          langDisplay,
          langList,
          legalLinks,
          links: footerLinks,
          localeList,
          selectedLanguage,
          size: footerSize,
          _loadLocaleList,
          _loadTranslation,
          _setLanguage,
        },
        (value) => value !== undefined
      )
    );
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // moving global banner outside of dotcom shell if placed within
    if (this.querySelector(`${c4dPrefix}-global-banner`)) {
      this.ownerDocument
        .querySelector(`${c4dPrefix}-masthead-container`)
        ?.before(
          this.querySelector(`${c4dPrefix}-global-banner`) as HTMLElement
        );
    }

    if (this.ownerDocument.querySelector(`${c4dPrefix}-global-banner`)) {
      this.hasBanner = true;
      this._masthead?.setAttribute('with-banner', '');
    }
  }

  render() {
    return html`
      <c4d-dotcom-shell>
        <slot></slot>
      </c4d-dotcom-shell>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DDotcomShellComposite;
