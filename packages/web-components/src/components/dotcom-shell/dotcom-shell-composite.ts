/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import pickBy from 'lodash-es/pickBy.js';
import { html, state, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import { globalInit } from '@carbon/ibmdotcom-services/es/services/global/global';
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
import DDSTableOfContents from '../table-of-contents/table-of-contents';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const distanceToBottom = 80;
const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;
const mediumBreakpoint = parseFloat(breakpoints.md.width) * baseFontSize;
const outOfScreenY = -49;
const stickyThemeSpacing = 40;
const topSpacing = 16;

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
  @state()
  private _lastScrollPosition = 0;

  /**
   * The render target of the footer contents.
   */
  private _footerRenderRoot: Element | null = null;

  /**
   * The leadspace with search component
   */
  private _leadspaceWithSearch?: HTMLElement;

  /**
   * The search with typeahead component in the leadspace
   */
  private _leadspaceSearchBar?: HTMLElement;

  /**
   * The initial container Y value.
   */
  private _leadspaceSearchContainerY?: any;

  /**
   * The Locale Modal element
   */
  private _localeModal?: HTMLElement;

  /**
   * The render target of the masthead contents.
   */
  private _mastheadRenderRoot: Element | null = null;

  /**
   * The masthead element.
   */
  private _masthead?: HTMLElement;

  /**
   * The tableOfContents element.
   */
  private _tableOfContents?: DDSTableOfContents;

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
      if (window.innerWidth >= gridBreakpoint && this._tableOfContentsLayout !== 'horizontal' && !this.hasBanner) {
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
   * Scrolls the masthead in/out of view depending on scroll direction
   */
  private _handleIntersect = () => {
    this._masthead!.style.transition = 'none';
    const l1Element = this._masthead!.querySelector(`${ddsPrefix}-masthead-l1`) as HTMLElement;

    if (this._localeModal?.hasAttribute('open')) {
      return;
    }

    if (this.hasBanner) {
      const bannerBottomLimit = Math.max(
        0,
        this.ownerDocument.querySelector('dds-universal-banner')?.getBoundingClientRect().bottom!
      );
      this._masthead!.style.top = `${bannerBottomLimit}px`;
    }

    if (this._tableOfContentsInnerBar) {
      const tocBoundingClient = this._tableOfContentsInnerBar!.getBoundingClientRect();

      if (window.innerWidth < gridBreakpoint || this._tableOfContentsLayout === 'horizontal' || l1Element) {
        const bannerBottom = this.ownerDocument.querySelector('dds-universal-banner')?.getBoundingClientRect().bottom;
        const bannerBottomLimit = Math.max(0, bannerBottom!);
        const mastheadTop = Math.round(Math.min(0, tocBoundingClient.top - this._masthead!.offsetHeight));
        const tocPosition = tocBoundingClient.top + this._lastScrollPosition - window.scrollY;
        this._tableOfContentsInnerBar!.style.top = `${Math.max(Math.min(tocPosition, this._masthead!.offsetHeight), 0)}px`;

        if (window.innerWidth < gridBreakpoint) {
          // safari scroll bounce fix when choosing in ToC
          if (this._tableOfContentsInnerBar!.style.top === '0px') {
            this._masthead!.style.top = `-${this._masthead?.offsetHeight}px`;
          } else if (this._tableOfContentsInnerBar!.style.top === `${this._masthead!.offsetHeight}px`) {
            this._masthead!.style.top = this.hasBanner ? `${bannerBottomLimit}px` : '0';
          } else {
            this._masthead!.style.top = `${mastheadTop}px`;
          }
        } else if (l1Element) {
          const toc = this._tableOfContents;
          const stickyOffset = Number(toc?.getAttribute('stickyOffset'));
          if (window.scrollY < this._lastScrollPosition) {
            // scrolling up
            if (this.hasBanner && bannerBottom! >= 0) {
              this._masthead!.style.top = `${bannerBottomLimit}px`;
            } else {
              this._masthead!.style.top = '0';
            }
            toc!.stickyOffset = stickyOffset + l1Element.offsetHeight;
          } else {
            // scrolling down
            if (!this.hasBanner || bannerBottom! < 0) {
              this._masthead!.style.top = `-${Math.min(
                this._masthead!.offsetHeight - l1Element.offsetHeight,
                Math.abs(mastheadTop)
              )}px`;
            } else {
              this._masthead!.style.top = `${bannerBottomLimit}px`;
            }
            toc!.stickyOffset = Math.max(stickyOffset - l1Element.offsetHeight, stickyOffset);
          }
        } else if (this._tableOfContentsLayout === 'horizontal') {
          if (!this.hasBanner || bannerBottom! < 0) {
            this._masthead!.style.top = `${mastheadTop}px`;
          } else {
            this._masthead!.style.top = `${bannerBottomLimit}px`;
          }
          this._tableOfContentsInnerBar!.style.top = `${Math.max(Math.min(tocPosition, this._masthead!.offsetHeight), 0)}px`;
        } else {
          this._masthead!.style.top = '0';
        }
      }
      this._lastScrollPosition = window.scrollY;
    } else if (l1Element) {
      this._masthead!.style.top = `-${Math.min(
        this._masthead!.offsetHeight - l1Element.offsetHeight,
        Math.abs(window.scrollY)
      )}px`;
    }

    if (
      this._leadspaceSearchBar &&
      this._leadspaceWithSearch?.hasAttribute('scroll-behavior') &&
      !this._tableOfContentsInnerBar
    ) {
      const searchContainer = this._leadspaceWithSearch?.shadowRoot!.querySelector(`.${prefix}--search-container`) as HTMLElement;

      // get starting search container's position in page
      if (!this._leadspaceSearchContainerY) {
        this._leadspaceSearchContainerY = this._leadspaceSearchBar?.getBoundingClientRect().y + window.scrollY;
      }

      const containerPosition = searchContainer!.getBoundingClientRect().top + this._lastScrollPosition - window.scrollY;
      const spaceOffset = this._leadspaceWithSearch?.getAttribute('adjacent-theme') !== '' ? -topSpacing * 2 : topSpacing;

      const mobileMastheadOffset = window.innerWidth < mediumBreakpoint ? -topSpacing : 0;
      const mastheadTop = Math.min(
        0,
        searchContainer!.getBoundingClientRect().top - spaceOffset - this._masthead!.offsetHeight + mobileMastheadOffset
      );
      // eslint-disable-next-line no-nested-ternary
      const containerPadding = window.innerWidth < gridBreakpoint ? (window.innerWidth < mediumBreakpoint ? 32 : 0) : -16;
      this._masthead!.style.transition = 'none';

      // going up
      if (window.scrollY < this._lastScrollPosition) {
        const mastheadPositionOnScrollUp = Math.min(
          this._masthead!.getBoundingClientRect().top + this._lastScrollPosition - window.scrollY,
          0
        );
        const searchContainerPositionOnScrollUp = Math.min(
          searchContainer!.getBoundingClientRect().top + this._lastScrollPosition - window.scrollY,
          -topSpacing + containerPadding
        );

        this._masthead!.style.top = `${mastheadPositionOnScrollUp}px`;

        // restore components to original position
        if (this._leadspaceSearchContainerY + distanceToBottom + 48 >= window.scrollY) {
          this._leadspaceSearchBar.removeAttribute('sticky-search');
          this._leadspaceWithSearch?.removeAttribute('sticky-search');
          this._leadspaceSearchBar.removeAttribute('large');
          this._leadspaceSearchBar.removeAttribute('theme-sticky');

          searchContainer.style.transition = 'top 1s cubic-bezier(0, 0, 0.38, 0.9)';
          searchContainer.style.top = `${-this._leadspaceSearchContainerY}px`;
        } else {
          searchContainer.style.transition = 'none';
          searchContainer.style.top = `${searchContainerPositionOnScrollUp}px`;
        }

        // going down
      } else {
        searchContainer.style.position = `sticky`;
        searchContainer.style.transition = 'none';

        // account for different spacing
        if (
          this._leadspaceWithSearch?.getAttribute('adjacent-theme') !== '' &&
          !this._leadspaceSearchBar.hasAttribute('theme-sticky')
        ) {
          searchContainer.style.top = `${Math.max(
            containerPosition,
            Math.min(0, -this._leadspaceSearchBar.getBoundingClientRect().height - topSpacing - stickyThemeSpacing)
          )}px`;
        } else {
          searchContainer.style.top = `${Math.max(
            containerPosition,
            Math.min(0, -this._leadspaceSearchBar.getBoundingClientRect().height - topSpacing + containerPadding)
          )}px`;
        }

        // activate sticky search
        if (this._leadspaceSearchContainerY + distanceToBottom + topSpacing <= window.scrollY) {
          searchContainer.style.transition = 'top 110ms cubic-bezier(0, 0, 0.38, 0.9);';

          if (this._leadspaceWithSearch?.getAttribute('adjacent-theme') !== '') {
            this._leadspaceSearchBar.setAttribute('theme-sticky', '');
            this._leadspaceWithSearch?.setAttribute('sticky-search', '');
          } else {
            this._leadspaceSearchBar.setAttribute('sticky-search', '');
            this._leadspaceWithSearch?.setAttribute('sticky-search', '');
          }
          this._leadspaceSearchBar.setAttribute('large', '');
        }

        if (!this._leadspaceSearchBar.hasAttribute('sticky-search') && !this._leadspaceSearchBar.hasAttribute('theme-sticky')) {
          this._masthead!.style.top = `${mastheadTop}px`;
        } else if (
          this._leadspaceSearchBar.hasAttribute('sticky-search') ||
          this._leadspaceSearchBar.hasAttribute('theme-sticky')
        ) {
          // have masthead go up until it's right above the search container
          if (this._masthead!.getBoundingClientRect().top > outOfScreenY) {
            const mastheadPositionOnScrollDown =
              this._masthead!.getBoundingClientRect().top + this._lastScrollPosition - window.scrollY;
            this._masthead!.style.top = `${mastheadPositionOnScrollDown}px`;

            // make sure masthead stays right above the search container when scrolling down
          } else {
            this._masthead!.style.top = `${outOfScreenY}px`;
          }
        }
      }
    }
    this._lastScrollPosition = window.scrollY;
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
   * `true` if there is a universal banner.
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

    if (!this._tableOfContentsInnerBar) {
      this._tableOfContents = document.querySelector(`${ddsPrefix}-table-of-contents`) as DDSTableOfContents;
      const toc = this._tableOfContents;
      if (toc?.getAttribute('toc-layout') === 'horizontal') {
        this._tableOfContentsInnerBar = toc?.shadowRoot?.querySelector(`.${prefix}--tableofcontents__navbar`) as HTMLElement;
        this._tableOfContentsLayout = 'horizontal';
      } else {
        this._tableOfContentsInnerBar = toc?.shadowRoot?.querySelector(`.${prefix}--tableofcontents__sidebar`) as HTMLElement;
      }
      this._masthead = document.querySelector(`${ddsPrefix}-masthead`) as HTMLElement;
    }

    if (!this._leadspaceSearchBar) {
      this._leadspaceWithSearch = this.ownerDocument!.querySelector(`${ddsPrefix}-leadspace-with-search`) as HTMLElement;
      this._leadspaceSearchBar = this._leadspaceWithSearch?.querySelector('dds-search-with-typeahead') as HTMLElement;
    } else if (this._leadspaceSearchBar) {
      this._leadspaceSearchBar.setAttribute('placeholder', this.searchPlaceholder!);
    }

    if (!this._localeModal) {
      this._localeModal = this.ownerDocument.querySelector('dds-locale-modal') as HTMLElement;
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
      openLocaleModal,
      openSearchDropdown,
      navLinks,
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
          _loadLocaleList,
          _loadTranslation,
          _setLanguage,
        },
        value => value !== undefined
      )
    );
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    // moving universal banner outside of dotcom shell if placed within
    if (this.querySelector('dds-universal-banner')) {
      this.ownerDocument
        .querySelector('dds-masthead-composite')
        ?.before(this.querySelector('dds-universal-banner') as HTMLElement);
    }

    if (this.ownerDocument.querySelector('dds-universal-banner')) {
      this.hasBanner = true;
      this._masthead?.setAttribute('with-banner', '');
    }
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

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSDotcomShellComposite;
