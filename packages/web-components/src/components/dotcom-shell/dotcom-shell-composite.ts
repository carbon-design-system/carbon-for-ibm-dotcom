/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { html, internalProperty, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { baseFontSize, breakpoints } from '@carbon/layout';
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

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

/**
 * Component that rendres dotcom shell from links, etc. data.
 *
 * @element dds-dotcom-shell-composite
 */
@customElement(`${ddsPrefix}-dotcom-shell-composite`)
class DDSDotcomShellComposite extends LitElement {
  /**
   * The last scroll Position
   */
  @internalProperty()
  private _lastScrollPosition = 0;

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
   * The tableOfContents inner navBar or sideBar depending on layout.
   */
  private _tableOfContentsInnerBar?: HTMLElement;

  /**
   * The tableOfContents layout.
   */
  private _tableOfContentsLayout?: String;

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null;

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
   * Cleans-up and creates the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    if (this._observerResizeRoot) {
      this._observerResizeRoot.disconnect();
      this._observerResizeRoot = null;
    }
    if (create) {
      // TODO: Wait for `.d.ts` update to support `ResizeObserver`
      // @ts-ignore
      this._observerResizeRoot = new ResizeObserver(this._handleResize.bind(this));
      this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
    }
  }

  /**
   * Resets masthead to top upon resize in larger breakpoints
   */
  private _handleResize() {
    if (this._tableOfContentsInnerBar) {
      if (window.innerWidth >= gridBreakpoint && this._tableOfContentsLayout !== 'horizontal') {
        this._masthead!.style.top = '0';
      } else {
        if (this._masthead!.getBoundingClientRect().top === 0) {
          this._tableOfContentsInnerBar!.style.top = `${this._masthead!.offsetHeight}px`;
        }
        this._handleIntersect();
      }
    }
  }

  /**
   * Scrolls the masthead in/out of view depending on scroll direction if toc is present
   */
  private _handleIntersect = () => {
    if (this._tableOfContentsInnerBar) {
      if (window.innerWidth < gridBreakpoint || this._tableOfContentsLayout === 'horizontal') {
        const mastheadTop = Math.min(
          0,
          this._tableOfContentsInnerBar!.getBoundingClientRect().top - this._masthead!.offsetHeight
        );
        const tocPosition =
          this._tableOfContentsInnerBar!.getBoundingClientRect().top + this._lastScrollPosition - window.scrollY;
        this._masthead!.style.transition = 'none';
        if (window.scrollY < this._lastScrollPosition) {
          this._tableOfContentsInnerBar!.style.top = `${Math.min(tocPosition, this._masthead!.offsetHeight)}px`;
          this._masthead!.style.top = `${mastheadTop}px`;
        } else {
          this._tableOfContentsInnerBar!.style.top = `${Math.max(tocPosition, 0)}px`;
          this._masthead!.style.top = `${mastheadTop}px`;
        }
      }
      this._lastScrollPosition = window.scrollY;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
    window.addEventListener('scroll', this._handleIntersect);
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResize();
    window.removeEventListener('scroll', this._handleIntersect);
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

    if (!this._tableOfContentsInnerBar) {
      const toc = document.querySelector(`${ddsPrefix}-table-of-contents`);
      if (toc?.getAttribute('toc-layout') === 'horizontal') {
        this._tableOfContentsInnerBar = toc?.shadowRoot?.querySelector(`.${prefix}--tableofcontents__navbar`) as HTMLElement;
        this._tableOfContentsLayout = 'horizontal';
      } else {
        this._tableOfContentsInnerBar = toc?.shadowRoot?.querySelector(`.${prefix}--tableofcontents__sidebar`) as HTMLElement;
      }
      this._masthead = document.querySelector(`${ddsPrefix}-masthead`) as HTMLElement;
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
