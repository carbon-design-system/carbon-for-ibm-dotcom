/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { baseFontSize, breakpoints } from '@carbon/layout';
import ddsSettings from '../settings/settings.js';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

class StickyHeader {
  constructor() {
    this.ownerDocument = root.document;
    this._banner = undefined;
    this._cumulativeHeight = 0;
    this._hasBanner = false;
    this._lastScrollPosition = 0;
    this._leadspaceWithSearch = undefined;
    this._leadspaceSearchBar = undefined;
    this._leadspaceWithSearchStickyThreshold = 0;
    this._localeModal = undefined;
    this._masthead = undefined;
    this._mastheadL0 = undefined;
    this._mastheadL1 = undefined;
    this._tableOfContents = undefined;
    this._tableOfContentsInnerBar = undefined;
    this._tableOfContentsLayout = undefined;
    this._throttled = false;
    this._resizeObserver = new ResizeObserver(this._handleResize.bind(this));
    root.addEventListener('scroll', this._throttledHandler.bind(this));
  }

  /**
   * Create (if needed) and return the globally-scoped instance of `this`.
   */
  static get global() {
    if (!Object.prototype.hasOwnProperty.call(root, 'stickyHeader')) {
      root.stickyHeader = new StickyHeader();
    }
    return root.stickyHeader;
  }

  static get customPropertyName() {
    return `--${ddsPrefix}-sticky-header-height`;
  }

  get height() {
    return this._cumulativeHeight;
  }

  /**
   * Compares the tag name of the component provided to what we expect it to be
   *
   * @param {HTMLElement} component The component provided
   * @param {string} expected The lowercase tag name expected
   * @throws {TypeError} Throws error if component tag name doesn't match expected string
   * @returns {boolean} Returns true if component tag name matches expected string
   */
  _validateComponent(component, expected) {
    const received = component.tagName.toLowerCase();
    if (received !== expected) {
      throw new TypeError(`${expected} expected, ${received} provided`);
    } else {
      return true;
    }
  }

  _tableOfContentsStickyUpdate() {
    const { _tableOfContents: toc } = this;

    const tocRoot = toc.shadowRoot;

    const desktopSelector = `.${ddsPrefix}-ce--table-of-contents__items-container`;

    if (window.outerWidth > gridBreakpoint) {
      if (toc.layout === 'horizontal') {
        this._tableOfContentsInnerBar = tocRoot.querySelector(
          `.${prefix}--tableofcontents__navbar`
        );
        this._tableOfContentsLayout = 'horizontal';
      } else {
        this._tableOfContentsInnerBar = tocRoot.querySelector(desktopSelector);
      }
    } else {
      this._tableOfContentsInnerBar = tocRoot.querySelector(
        `.${prefix}--tableofcontents__sidebar`
      );
    }
  }

  set banner(component) {
    if (this._validateComponent(component, `${ddsPrefix}-universal-banner`)) {
      this._banner = component;
      this.hasBanner = true;

      if (this._masthead) {
        this._masthead.setAttribute('with-banner', '');
      }
    }
  }

  set leadspaceWithSearch(component) {
    if (
      this._validateComponent(component, `${ddsPrefix}-leadspace-with-search`)
    ) {
      this._leadspaceWithSearch = component;
      const leadspaceSearchBar = component.shadowRoot.querySelector(
        `.${prefix}--search-container`
      );
      this._leadspaceWithSearchBar = leadspaceSearchBar;
      this._leadspaceWithSearchInput = component.querySelector(
        `${ddsPrefix}-search-with-typeahead`
      );
      this._leadspaceWithSearchStickyThreshold =
        parseInt(window.getComputedStyle(leadspaceSearchBar).paddingBottom) -
        16;
    }
  }

  set localeModal(component) {
    if (this._validateComponent(component, `${ddsPrefix}-locale-modal`)) {
      this._localeModal = component;
    }
  }

  set masthead(component) {
    if (this._validateComponent(component, `${ddsPrefix}-masthead`)) {
      this._masthead = component;
      if (this._banner) this._masthead.setAttribute('with-banner', '');

      this._mastheadL0 = component.shadowRoot.querySelector(
        `.${prefix}--masthead__l0`
      );
      this._mastheadL1 = component.querySelector(`${ddsPrefix}-masthead-l1`);
    }
  }

  set tableOfContents(component) {
    if (this._validateComponent(component, `${ddsPrefix}-table-of-contents`)) {
      this._tableOfContents = component;
      this._tableOfContentsStickyUpdate();
      this._resizeObserver.observe(this._tableOfContents);
    }
  }

  /**
   * Rate-limits the scroll event handler
   */
  _throttledHandler() {
    if (!this._throttled) {
      this._throttled = true;
      this._handleScroll();

      setTimeout(() => {
        this._throttled = false;
      }, 20);
    }
  }

  _handleResize() {
    const {
      _hasBanner: hasBanner,
      _masthead: masthead,
      _tableOfContents: toc,
      _tableOfContentsLayout: tocLayout,
      _leadspaceSearchBar: leadspaceSearchBar,
    } = this;

    if (toc && masthead) {
      this._tableOfContentsStickyUpdate();
      if (
        window.innerWidth >= gridBreakpoint &&
        tocLayout !== 'horizontal' &&
        !hasBanner
      ) {
        masthead.style.top = '0';
      } else {
        // This has to happen after the tocStickyUpdate method.
        const { _tableOfContentsInnerBar: tocInner } = this;
        if (masthead.offsetTop === 0) {
          tocInner.style.top = `${masthead.offsetHeight}px`;
        }
      }
      this._handleScroll();
    }

    if (leadspaceSearchBar) {
      this._leadspaceWithSearchStickyThreshold =
        parseInt(window.getComputedStyle(leadspaceSearchBar).paddingBottom) -
        16;
    }
  }

  _handleScroll() {
    const {
      _lastScrollPosition: oldY,
      _banner: banner,
      _masthead: masthead,
      _mastheadL0: mastheadL0,
      _mastheadL1: mastheadL1,
      _localeModal: localeModal,
      _tableOfContents: toc,
      _tableOfContentsInnerBar: tocInner,
      _leadspaceWithSearch: leadspaceSearch,
      _leadspaceWithSearchBar: leadspaceSearchBar,
      _leadspaceWithSearchInput: leadspaceSearchInput,
      _leadspaceWithSearchStickyThreshold: leadspaceSearchThreshold,
    } = StickyHeader.global;

    const { customPropertyName } = this.constructor;

    if (localeModal && localeModal.hasAttribute('open')) return;

    const newY = window.scrollY;
    this._lastScrollPosition = newY;

    /**
     * maxScrollaway is a calculated value matching the height of all components
     * that are allowed to hide above the viewport.
     *
     * We should only have one sticky header showing as the page scrolls down.
     *
     * Items that stick, in order
     * - L0
     * - L1
     * - The TOC in horizontal bar form
     * - The leadspace with search (if no TOC)
     */
    let maxScrollaway = 0;

    // Calculate maxScrollaway values based on TOC positon
    let tocIsAtTop = false;
    let tocShouldStick = false;

    if (tocInner) {
      tocIsAtTop =
        tocInner.getBoundingClientRect().top <=
        (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1;

      tocShouldStick =
        toc.layout === 'horizontal' || window.innerWidth < gridBreakpoint;

      if (masthead && tocIsAtTop && (tocShouldStick || mastheadL1)) {
        maxScrollaway += masthead.offsetHeight;

        if (mastheadL1 && !tocShouldStick) {
          maxScrollaway -= mastheadL1.offsetHeight;
        }
      } else if (mastheadL0 && mastheadL1) {
        maxScrollaway += mastheadL0.offsetHeight;
      }
    }

    // Calculate maxScrollaway values based on leadspace search position
    if (!tocInner && leadspaceSearchBar) {
      const searchIsAtTop =
        leadspaceSearchBar.getBoundingClientRect().top <=
        (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1;

      if (masthead && searchIsAtTop) {
        maxScrollaway += masthead.offsetHeight;
      }
    }

    /**
     * Cumulative offset is a calculated value used to set the `top` property of
     * components that stick to the top of the viewport.
     *
     * This value is equal to the difference between the previous scrollY and
     * the current scrollY values, but is positively and negatively limited.
     *
     * Positive limit: 0
     *   all elements visible, starting at the top of the viewport.
     *
     * Negative limit: maxScrollaway * -1
     *   all elements that should be hidden are positioned above the viewport
     *   with the elements that should be visible starting at the top of the
     *   viewport.
     */
    let cumulativeOffset = masthead
      ? Math.max(
          Math.min(masthead.offsetTop + oldY - newY, 0),
          maxScrollaway * -1
        )
      : Math.max(Math.min(oldY - newY, 0), maxScrollaway * -1);

    if (banner) {
      cumulativeOffset += Math.max(banner.offsetHeight - newY, 0);
    }

    if (masthead) {
      masthead.style.transition = 'none';
      masthead.style.top = `${cumulativeOffset}px`;
      cumulativeOffset += masthead.offsetHeight;
    }

    if (tocInner) {
      tocInner.style.transition = 'none';
      tocInner.style.top = `${cumulativeOffset}px`;
      cumulativeOffset += tocInner.offsetHeight;
    }

    if (!tocInner && leadspaceSearchBar) {
      const searchShouldBeSticky =
        leadspaceSearch.getBoundingClientRect().bottom <=
        leadspaceSearchThreshold;
      const searchIsSticky = leadspaceSearch.hasAttribute('sticky-search');

      if (searchShouldBeSticky) {
        if (!searchIsSticky) {
          leadspaceSearch.style.paddingBottom = `${leadspaceSearchBar.offsetHeight}px`;
          leadspaceSearch.setAttribute('sticky-search', '');
          leadspaceSearchInput.setAttribute('large', '');

          window.requestAnimationFrame(() => {
            leadspaceSearchBar.style.transitionDuration = '110ms';
            leadspaceSearchBar.style.transform = 'translateY(0)';
          });
        }

        leadspaceSearchBar.style.top = `${cumulativeOffset}px`;
        cumulativeOffset += leadspaceSearchBar.offsetHeight;
      }

      if (!searchShouldBeSticky && searchIsSticky) {
        leadspaceSearch.removeAttribute('sticky-search');
        leadspaceSearch.style.paddingBottom = '';
        leadspaceSearchBar.style.top = '';
        leadspaceSearchBar.style.transitionDuration = '';
        leadspaceSearchBar.style.transform = '';
        leadspaceSearchInput.removeAttribute('large');
      }
    }

    // Set internal property for use in scripts
    this._cumulativeHeight = cumulativeOffset;

    // Set custom property for use in stylesheets
    root.document.documentElement.style.setProperty(
      customPropertyName,
      `${this._cumulativeHeight}px`
    );
  }
}

export default StickyHeader;
