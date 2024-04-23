/**
 * Copyright IBM Corp. 2016, 2023
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

    this._data = {
      cumulativeOffset: 0,
      hasBanner: false,
      lastScrollPosition: 0,
      newScrollPosition: 0,
      leadspaceSearchThreshold: 0,
      maxScrollaway: 0,
      scrollDir: undefined,
    };

    this._elements = {
      banner: undefined,
      leadspaceSearch: undefined,
      leadspaceSearchBar: undefined,
      leadspaceSearchInput: undefined,
      localeModal: undefined,
      masthead: undefined,
      mastheadL0: undefined,
      mastheadL1: undefined,
      tableOfContents: undefined,
      tableOfContentsInnerBar: undefined,
    };

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
    return this._data.cumulativeOffset;
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

  /**
   * Stores references to TOC sub-elements that are relevant to current viewport
   * dimensions.
   */
  _updateTableOfContentsRefs() {
    const { tableOfContents: toc } = this._elements;
    const tocRoot = toc.shadowRoot;
    const selectors = {
      desktop: {
        vertical: `.${ddsPrefix}-ce--table-of-contents__items-container`,
        horizontal: `.${prefix}--tableofcontents__navbar`,
      },
      mobile: {
        vertical: `.${prefix}--tableofcontents__sidebar`,
        horizontal: `.${prefix}--tableofcontents__navbar`,
      }
    };

    const viewportDimension = window.innerWidth >= gridBreakpoint
      ? 'desktop'
      : 'mobile';

    this._elements.tableOfContentsInnerBar = tocRoot.querySelector(
      selectors[viewportDimension][toc.layout || 'vertical']
    );
  }

  set banner(component) {
    if (this._validateComponent(component, `${ddsPrefix}-universal-banner`)) {
      this._elements.banner = component;
      this._data.hasBanner = true;

      if (this._elements.masthead) {
        this._elements.masthead.setAttribute('with-banner', '');
      }

      this._calculatecumulativeOffset();
    }
  }

  set leadspaceSearch(component) {
    if (
      this._validateComponent(component, `${ddsPrefix}-leadspace-with-search`)
    ) {
      this._elements.leadspaceSearch = component;
      const leadspaceSearchBar = component.shadowRoot.querySelector(
        `.${prefix}--search-container`
      );
      this._elements.leadspaceSearchBar = leadspaceSearchBar;
      this._elements.leadspaceSearchInput = component.querySelector(
        `${ddsPrefix}-search-with-typeahead`
      );
      this._data.leadspaceSearchThreshold =
        parseInt(window.getComputedStyle(leadspaceSearchBar).paddingBottom) -
        16;
      this._calculatecumulativeOffset();
    }
  }

  set localeModal(component) {
    if (this._validateComponent(component, `${ddsPrefix}-locale-modal`)) {
      this._elements.localeModal = component;
      this._calculatecumulativeOffset();
    }
  }

  set masthead(component) {
    if (this._validateComponent(component, `${ddsPrefix}-masthead`)) {
      this._elements.masthead = component;
      if (this._elements.banner) this._elements.masthead.setAttribute('with-banner', '');

      this._elements.mastheadL0 = component.shadowRoot.querySelector(
        `.${prefix}--masthead__l0`
      );
      this._elements.mastheadL1 = component.querySelector(`${ddsPrefix}-masthead-l1`);
      this._calculatecumulativeOffset();
    }
  }

  set tableOfContents(component) {
    if (this._validateComponent(component, `${ddsPrefix}-table-of-contents`)) {
      this._elements.tableOfContents = component;
      this._updateTableOfContentsRefs();
      this._resizeObserver.observe(this._elements.tableOfContents);
      this._calculatecumulativeOffset();
    }
  }

  /**
   * Rate-limits the scroll event handler
   */
  _throttledHandler() {
    if (!this._throttled) {
      this._throttled = true;
      this._calculatecumulativeOffset();

      setTimeout(() => {
        this._throttled = false;
      }, 20);
    }
  }

  _handleResize() {
    const {
      _hasBanner: hasBanner,
    } = this._data;

    const {
      masthead,
      tableOfContents: toc,
      leadspaceSearchBar,
    } = this._elements;

    if (toc && masthead) {
      this._updateTableOfContentsRefs();
      if (
        window.innerWidth >= gridBreakpoint &&
        toc.layout !== 'horizontal' &&
        !hasBanner
      ) {
        masthead.style.top = '0';
      } else {
        // This has to happen after the _updateTableOfContentsRefs method.
        const { tableOfContentsInnerBar: tocInner } = this._elements;
        if (masthead.offsetTop === 0) {
          tocInner.style.top = `${masthead.offsetHeight}px`;
        }
      }
      this._calculatecumulativeOffset();
    }

    if (leadspaceSearchBar) {
      this._data.leadspaceSearchThreshold =
        parseInt(window.getComputedStyle(leadspaceSearchBar).paddingBottom) -
        16;
    }
  }

  _handleBannerStickiness() {
    const { banner } = this._elements
    const { newScrollPosition } = this._data;
    this._data.cumulativeOffset += Math.max(banner.offsetHeight - newScrollPosition, 0);
  }

  _handleMastheadStickiness() {
    const { masthead } = this._elements;

    masthead.style.transition = 'none';
    masthead.style.top = `${this._data.cumulativeOffset}px`;
    this._data.cumulativeOffset += masthead.offsetHeight;
  }

  _handleTocStickiness() {
    const { tableOfContentsInnerBar } = this._elements;
    const { tocShouldStick } = this._data;

    tableOfContentsInnerBar.style.transition = 'none';
    tableOfContentsInnerBar.style.top = `${this._data.cumulativeOffset}px`;

    const tocIsStuck =
      Math.round(tableOfContentsInnerBar.getBoundingClientRect().top) <=
      this._data.cumulativeOffset + 1;

    if (tocShouldStick && tocIsStuck) {
      this._data.cumulativeOffset += tableOfContentsInnerBar.offsetHeight;
    }
  }

  _handleLeadspaceSearchStickiness() {
    const {
      leadspaceSearch,
      leadspaceSearchBar,
      leadspaceSearchInput,
    } = this._elements;
    const { leadspaceSearchThreshold } = this._data;
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
      leadspaceSearchBar.style.top = `${this._data.cumulativeOffset}px`;
      this._data.cumulativeOffset += leadspaceSearchBar.offsetHeight;
    } else if (searchIsSticky) {
      leadspaceSearch.style.paddingBottom = '';
      leadspaceSearch.removeAttribute('sticky-search');
      leadspaceSearchInput.removeAttribute('large');

      leadspaceSearchBar.style.transitionDuration = '';
      leadspaceSearchBar.style.transform = '';
      leadspaceSearchBar.style.top = '';
    }
  }

  _calculateMaxScrollaway() {
    /**
     * maxScrollaway is a calculated value matching the height of all components
     * that are allowed to hide above the viewport. I.e., adding an item's height
     * to this value indicates we expect it to be hidden above the viewport.
     *
     * We should only have one sticky header showing as the page scrolls down.
     *
     * Items that stick, in order
     * - L0
     * - L1
     * - The TOC in horizontal bar form
     * - The leadspace with search (if no TOC)
     */
    const {
      masthead,
      mastheadL0,
      mastheadL1,
      tableOfContents: toc,
      tableOfContentsInnerBar: tocInner,
      leadspaceSearchBar,
    } = StickyHeader.global._elements;

    // Reset data store.
    this._data.maxScrollaway = 0;

    const tocShouldStick = toc
      ? toc.layout === 'horizontal' || window.innerWidth < gridBreakpoint
      : false;

    const tocIsAtTop = tocInner
      ? tocInner.getBoundingClientRect().top <= (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1
      : false;

    const searchIsAtTop = leadspaceSearchBar
      ? leadspaceSearchBar.getBoundingClientRect().top <= (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1
      : false;

    const tocIsAtSearch = leadspaceSearchBar && tocInner
      ? tocInner.getBoundingClientRect().top <= leadspaceSearchBar.getBoundingClientRect().bottom
      : false;

    const mastheadL1IsActive = mastheadL1 && mastheadL1.hasAttribute('active');

    // Scroll away entire masthead if either TOC or leadspace search is eligible
    // to be the stuck element (unless L1 is open). Otherwise, scroll away the
    // L0 if we have an L1.
    if (tocIsAtSearch) {
      this._data.maxScrollaway += leadspaceSearchBar.offsetHeight;
    }

    if (searchIsAtTop || (tocIsAtTop && tocShouldStick)) {
      if (mastheadL1IsActive && mastheadL0) {
        this._data.maxScrollaway += mastheadL0.offsetHeight;
      } else if (masthead) {
        this._data.maxScrollaway += masthead.offsetHeight;
      }
    }
    else if (masthead && mastheadL0 && mastheadL1) {
      this._data.maxScrollaway += mastheadL0.offsetHeight;
    }
  }

  _calculatecumulativeOffset() {
    const {
      banner,
      masthead,
      localeModal,
      tableOfContentsInnerBar: tocInner,
      leadspaceSearch,
      leadspaceSearchBar,
    } = StickyHeader.global._elements;
    const { lastScrollPosition: oldY } = StickyHeader.global._data;

    const { customPropertyName } = this.constructor;

    if (localeModal && localeModal.hasAttribute('open')) return;

    this._data.newScrollPosition = window.scrollY;
    this._data.scrollDir = this._data.newScrollPosition > this._data.lastScrollPosition ? 'down' : 'up';
    this._data.lastScrollPosition = Math.max(0, this._data.newScrollPosition);

    this._calculateMaxScrollaway()

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
    this._data.cumulativeOffset = Math.max(
      Math.min((masthead ? masthead.offsetTop : 0) + oldY - this._data.newScrollPosition, 0),
      this._data.maxScrollaway * -1
    );

    if (banner) {
      this._handleBannerStickiness();
    }

    if (masthead) {
      this._handleMastheadStickiness();
    }

    /**
     * Three cases:
     *  1. No Leadspace & ToC
     *      - ToC sticks when ready
     *  2. Leadspace & no ToC
     *      - Leadspace sticks when ready
     *  3. Leadspace & ToC
     *      - Leadspace sticks until ToC, then ToC sticks
     */

    if (tocInner) {
      if (leadspaceSearch) {
        this._handleLeadspaceSearchStickiness();
      }
      this._handleTocStickiness();
    } else if (leadspaceSearchBar) {
      this._handleLeadspaceSearchStickiness();
    }

    // Set custom property for use in stylesheets
    root.document.documentElement.style.setProperty(
      customPropertyName,
      `${this._data.cumulativeOffset}px`
    );
  }
}

export default StickyHeader;
