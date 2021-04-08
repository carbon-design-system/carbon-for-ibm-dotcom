/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { LocaleList } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/localeAPI.d';
import {
  BasicLink,
  BasicLinkSet,
  MastheadL1,
  MastheadLink,
  MastheadProfileItem,
  Translation,
} from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import { UNAUTHENTICATED_STATUS } from '../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { FOOTER_SIZE } from '../footer/footer';
import '../footer/footer-composite';
import './dotcom-shell';
import styles from './dotcom-shell-composite.scss';

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
    const footer = this.ownerDocument!.createElement(`${ddsPrefix}-footer-composite`);
    this.parentNode?.insertBefore(footer, this.nextSibling);
    return footer;
  }

  /**
   * @returns The render root of the masthead contents.
   */
  private _createMastheadRenderRoot() {
    const masthead = this.ownerDocument!.createElement(`${ddsPrefix}-masthead-composite`);
    this.parentNode?.insertBefore(masthead, this);
    return masthead;
  }

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _intersectionObserver: IntersectionObserver | null = null;

  private _tableOfContents?: HTMLElement;

  private _masthead?: HTMLElement;

  private _cleanAndCreateIntersectionObserverContainer({ create }: { create?: boolean } = {}) {
    const { _tableOfContents: tableOfContents } = this;
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = null;
    }
    if (create) {
      this._intersectionObserver = new IntersectionObserver(this._handleIntersect, {
        rootMargin: ' -145px 0px -48px 0px',
        threshold: 0.1,
      });
      if (tableOfContents) {
        this._intersectionObserver.observe(tableOfContents!);
      }
    }
  }

  private _handleIntersect = records => {
    records.forEach(({ isIntersecting }) => {
      if (!isIntersecting) {
        this._masthead!.style.transform = 'translateY(-48px)';
        this._masthead!.style.transition = 'transform 240ms cubic-bezier(0.4, 0.14, 1, 1);';
      } else {
        this._masthead!.style.transform = 'translateY(0)';
        this._masthead!.style.transition = 'transform 240ms cubic-bezier(0.4, 0.14, 1, 1);';
      }
    });
  };

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateIntersectionObserverContainer();
    super.disconnectedCallback();
  }

  /**
   * The placeholder for `loadLangDisplay()` Redux action that may be mixed in. This goes to footer.
   *
   * @internal
   */
  _loadLangDisplay?: (language?: string) => Promise<string>;

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
   * Data for l1.
   */
  @property({ attribute: false })
  l1Data?: MastheadL1;

  /**
   * The navigation links. This goes to masthead.
   * The data typically comes from `@carbon/ibmdotcom-services` and thus you don't need to set this property by default,
   * but if you need an alternate way of integration (e.g. rendering Web Components tags in server-side) this property helps.
   */
  @property({ attribute: false })
  navLinks?: MastheadLink[];

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

  update(changedProperties) {
    super.update(changedProperties);

    if (!this._tableOfContents) {
      this._tableOfContents = document
        .querySelector('dds-table-of-contents')
        ?.shadowRoot?.querySelector('.bx--tableofcontents__sidebar') as HTMLElement;
      this._masthead = document.querySelector('dds-masthead') as HTMLElement;
      this._cleanAndCreateIntersectionObserverContainer({ create: true });
    }

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
      openLocaleModal,
      openSearchDropdown,
      navLinks,
      hasProfile,
      hasSearch,
      searchPlaceholder,
      selectedLanguage,
      selectedMenuItem,
      userStatus,
      _loadLangDisplay,
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
          mastheadAssistiveText,
          menuBarAssistiveText,
          menuButtonAssistiveTextActive,
          menuButtonAssistiveTextInactive,
          unauthenticatedProfileItems,
          inputTimeout,
          l1Data,
          language,
          navLinks,
          hasProfile,
          hasSearch,
          searchPlaceholder,
          openSearchDropdown,
          selectedMenuItem,
          userStatus,
          _loadSearchResults,
          _loadTranslation,
          _loadUserStatus,
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
          openLocaleModal,
          selectedLanguage,
          size: footerSize,
          _loadLangDisplay,
          _loadLocaleList,
          _loadTranslation,
          _setLanguage,
        },
        value => value !== undefined
      )
    );
  }

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
