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

const c4dPrefix = 'c4d';
const cdsPrefix = 'cds';

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

class StickyHeader {
  constructor() {
    this.ownerDocument = root.document;

    this._state = {
      cumulativeOffset: 0,
      hasBanner: false,
      leadspaceSearchThreshold: 0,
      maxScrollaway: 0,
      scrollPosPrevious: 0,
      scrollPos: 0,
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
    return this._state.cumulativeOffset;
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
      // TODO: don't check for v1/v2 compatibility after v1 EOL.
      if (
        received.split('-').splice(1).join('-') !==
        expected.split('-').splice(1).join('-')
      ) {
        throw new TypeError(`${expected} expected, ${received} provided`);
      } else {
        const message = [
          `Mixed prefixes detected.\n`,
          `expected ${expected}, found ${received}.`,
        ];
        console.warn(message.join(''));
        return true;
      }
    } else {
      return true;
    }
  }

  /**
   * Helper method to query for either C4IBM v1.x or v2.x sub-elements;
   *
   * @param {*} element The C4IBM element.
   * @param {*} v1Func The querying function to run if using a C4IBM v1.x element.
   * @param {*} v2Func The querying function to run if using a C4IBM v2.x element.
   */
  _updateRefsV1orV2(element, v1Func, v2Func) {
    const elementPrefix = element.tagName.toLowerCase().split('-')[0];
    if (elementPrefix === ddsPrefix) {
      v1Func.bind(this)();
    } else if (elementPrefix === c4dPrefix) {
      v2Func.bind(this)();
    } else {
      throw new Error(`
        Could not find sub-elements for ${element.tagName.toLowerCase()}.
      `);
    }
  }

  /**
   * Temporary method to find v1 leadspace sub-elements.
   */
  _updateLeadspaceRefsV1() {
    const { leadspaceSearch } = this._elements;

    this._elements.leadspaceSearchBar =
      leadspaceSearch.shadowRoot.querySelector(`.${prefix}--search-container`);
    this._elements.leadspaceSearchInput = leadspaceSearch.querySelector(
      `${ddsPrefix}-search-with-typeahead`
    );
  }

  /**
   * Temporary method to find v2 leadspace sub-elements.
   */
  _updateLeadspaceRefsV2() {
    const { leadspaceSearch } = this._elements;

    this._elements.leadspaceSearchBar =
      leadspaceSearch.shadowRoot.querySelector(
        `.${cdsPrefix}--search-container`
      );
    this._elements.leadspaceSearchInput = leadspaceSearch.querySelector(
      `${c4dPrefix}-search-with-typeahead`
    );
  }

  /**
   * Temporary method to find v1 masthead sub-elements.
   */
  _updateMastheadRefsV1() {
    const { masthead } = this._elements;
    this._elements.mastheadL0 = masthead.shadowRoot.querySelector(
      `.${prefix}--masthead__l0`
    );
    this._elements.mastheadL1 = masthead.querySelector(
      `${ddsPrefix}-masthead-l1`
    );
  }

  /**
   * Temporary method to find v2 masthead sub-elements.
   */
  _updateMastheadRefsV2() {
    const { masthead } = this._elements;
    this._elements.mastheadL0 = masthead.shadowRoot.querySelector(
      `.${cdsPrefix}--masthead__l0`
    );
    this._elements.mastheadL1 = masthead.querySelector(
      `${c4dPrefix}-masthead-l1`
    );
  }

  /**
   * Temporary method to find v1 table of contents sub-elements.
   */
  _updateTableOfContentsRefsV1() {
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
      },
    };

    const viewportDimension =
      window.innerWidth >= gridBreakpoint ? 'desktop' : 'mobile';

    this._elements.tableOfContentsInnerBar = tocRoot.querySelector(
      selectors[viewportDimension][toc.layout || 'vertical']
    );
  }

  /**
   * Temporary method to find v2 table of contents sub-elements.
   */
  _updateTableOfContentsRefsV2() {
    const { tableOfContents: toc } = this._elements;
    const tocRoot = toc.shadowRoot;
    this._elements.tableOfContentsInnerBar = tocRoot.querySelector(
      window.innerWidth >= gridBreakpoint && toc?.layout !== 'horizontal'
        ? `.${c4dPrefix}-ce--table-of-contents__items-container`
        : `.${cdsPrefix}--tableofcontents__navbar`
    );
  }

  /**
   * Stores references to TOC sub-elements that are relevant to current viewport
   * dimensions.
   */
  _updateTableOfContentsRefs() {
    const { tableOfContents: toc } = this._elements;
    this._updateRefsV1orV2(
      toc,
      this._updateTableOfContentsRefsV1,
      this._updateTableOfContentsRefsV2
    );
  }

  set banner(component) {
    if (this._validateComponent(component, `${ddsPrefix}-universal-banner`)) {
      this._elements.banner = component;
      this._state.hasBanner = true;

      if (this._elements.masthead) {
        this._elements.masthead.setAttribute('with-banner', '');
      }

      this._manageStickyElements();
    }
  }

  set leadspaceSearch(component) {
    if (
      this._validateComponent(component, `${ddsPrefix}-leadspace-with-search`)
    ) {
      this._elements.leadspaceSearch = component;
      this._updateRefsV1orV2(
        component,
        this._updateLeadspaceRefsV1,
        this._updateLeadspaceRefsV2
      );
      this._state.leadspaceSearchThreshold =
        parseInt(
          window.getComputedStyle(this._elements.leadspaceSearchBar)
            .paddingBottom
        ) - 16;
      this._manageStickyElements();
    }
  }

  set localeModal(component) {
    if (this._validateComponent(component, `${ddsPrefix}-locale-modal`)) {
      this._elements.localeModal = component;
      this._manageStickyElements();
    }
  }

  set masthead(component) {
    if (this._validateComponent(component, `${ddsPrefix}-masthead`)) {
      this._elements.masthead = component;
      if (this._elements.banner) {
        this._elements.masthead.setAttribute('with-banner', '');
      }
      this._updateRefsV1orV2(
        component,
        this._updateMastheadRefsV1,
        this._updateMastheadRefsV2
      );
      this._manageStickyElements();
    }
  }

  set tableOfContents(component) {
    if (this._validateComponent(component, `${ddsPrefix}-table-of-contents`)) {
      this._elements.tableOfContents = component;
      this._updateTableOfContentsRefs();
      this._resizeObserver.observe(this._elements.tableOfContents);
      this._manageStickyElements();
    }
  }

  /**
   * Rate-limits the scroll event handler
   */
  _throttledHandler() {
    if (!this._throttled) {
      this._throttled = true;
      this._manageStickyElements();

      setTimeout(() => {
        this._throttled = false;
      }, 20);
    }
  }

  _handleResize() {
    const { _hasBanner: hasBanner } = this._state;

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
      this._manageStickyElements();
    }

    if (leadspaceSearchBar) {
      this._state.leadspaceSearchThreshold =
        parseInt(window.getComputedStyle(leadspaceSearchBar).paddingBottom) -
        16;
    }
  }

  /**
   * Handles the banner given the current scroll position.
   */
  _handleBanner() {
    const { banner } = this._elements;
    const { scrollPos } = this._state;
    this._state.cumulativeOffset += Math.max(
      banner.offsetHeight - scrollPos,
      0
    );
  }

  /**
   * Handles the masthead given the current scroll position.
   */
  _handleMasthead() {
    const { masthead } = this._elements;

    masthead.style.transition = 'none';
    masthead.style.top = `${this._state.cumulativeOffset}px`;

    // Masthead always sticks, therefore always add its height.
    this._state.cumulativeOffset += masthead.offsetHeight;
  }

  /**
   * Handles the table of contents given the current scroll position.
   */
  _handleToc() {
    const { tableOfContentsInnerBar } = this._elements;
    const { tocShouldStick } = this._state;

    tableOfContentsInnerBar.style.transition = 'none';
    tableOfContentsInnerBar.style.top = `${this._state.cumulativeOffset}px`;

    const tocIsStuck =
      Math.round(tableOfContentsInnerBar.getBoundingClientRect().top) <=
      this._state.cumulativeOffset + 1;

    if (tocShouldStick && tocIsStuck) {
      this._state.cumulativeOffset += tableOfContentsInnerBar.offsetHeight;
    }
  }

  /**
   * Handles the leadspace search given the current scroll position.
   */
  _handleLeadspaceSearch() {
    const { leadspaceSearch, leadspaceSearchBar, leadspaceSearchInput } =
      this._elements;
    const { leadspaceSearchThreshold } = this._state;
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
      leadspaceSearchBar.style.top = `${this._state.cumulativeOffset}px`;
      this._state.cumulativeOffset += leadspaceSearchBar.offsetHeight;
    } else if (searchIsSticky) {
      leadspaceSearch.style.paddingBottom = '';
      leadspaceSearch.removeAttribute('sticky-search');
      leadspaceSearchInput.removeAttribute('large');

      leadspaceSearchBar.style.transitionDuration = '';
      leadspaceSearchBar.style.transform = '';
      leadspaceSearchBar.style.top = '';
    }
  }

  /**
   * Calculates a value matching the height of all components that are allowed
   * to hide above the viewport.
   *
   * Adding an item's height to this value indicates we expect it to be hidden
   * above the viewport.
   *
   * Items that stick, in order
   * - L0
   * - L1
   * - The TOC in horizontal bar form
   * - The leadspace with search (if no TOC)
   */
  _calculateMaxScrollaway() {
    const {
      masthead,
      mastheadL0,
      mastheadL1,
      tableOfContents,
      tableOfContentsInnerBar,
      leadspaceSearchBar,
    } = this._elements;

    // Reset the value before performing any further calculations.
    this._state.maxScrollaway = 0;

    // Collect conditions we may want to test for to make logic easier to read.
    const tocShouldStick = tableOfContents
      ? tableOfContents.layout === 'horizontal' ||
        window.innerWidth < gridBreakpoint
      : false;
    const tocIsAtTop = tableOfContentsInnerBar
      ? tableOfContentsInnerBar.getBoundingClientRect().top <=
        (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1
      : false;
    const searchIsAtTop = leadspaceSearchBar
      ? leadspaceSearchBar.getBoundingClientRect().top <=
        (masthead ? masthead.offsetTop + masthead.offsetHeight : 0) + 1
      : false;
    const tocIsAtSearch =
      leadspaceSearchBar && tableOfContentsInnerBar
        ? tableOfContentsInnerBar.getBoundingClientRect().top <=
          leadspaceSearchBar.getBoundingClientRect().bottom
        : false;
    const mastheadL0IsActive = masthead?.querySelector('[expanded]');
    const mastheadL1IsActive = mastheadL1 && mastheadL1.hasAttribute('active');

    // Begin calculating maxScrollAway.

    // If L0 is open, lock it to the top of the page.
    if (mastheadL0 && mastheadL0IsActive) {
      this._state.maxScrollaway = 0;
    }
    // If L1 is open, lock it to the top of the page.
    else if (mastheadL1IsActive && mastheadL0) {
      this._state.maxScrollaway = mastheadL0.offsetHeight;
    } else {
      // In cases where we have both an eligible ToC and leadspace search, we want
      // the ToC to take precedence. Scroll away leadspace search.
      if (searchIsAtTop && tocIsAtSearch && tocShouldStick) {
        this._state.maxScrollaway += leadspaceSearchBar.offsetHeight;
      }

      // Scroll away entire masthead if either ToC or leadspace search is eligible
      // to be the stuck element (unless L1 is open). Otherwise, scroll away the
      // L0 if we have an L1.
      if (searchIsAtTop || (tocIsAtTop && tocShouldStick)) {
        if (masthead) {
          this._state.maxScrollaway += masthead.offsetHeight;
        }
      } else if (masthead && mastheadL0 && mastheadL1) {
        this._state.maxScrollaway += mastheadL0.offsetHeight;
      }
    }
  }

  /**
   * Positions sticky elements. Does so by checking the scroll position and where
   * tracked elements are in relation to it, then applying the correct styles to
   * each element in succession to ensure that only one element is stuck to the
   * top of the page, and all other elements that have been scrolled past can be
   * revealed when scrolling back up.
   */
  _positionElements() {
    const {
      banner,
      masthead,
      tableOfContentsInnerBar: tocInner,
      leadspaceSearchBar,
    } = this._elements;
    const { scrollPosPrevious: oldY } = this._state;

    /**
     * Reset to a value that is equal to the difference between the previous
     * scrollY and the current scrollY values, but is positively and negatively
     * limited.
     *
     * Positive limit: 0
     *   all elements visible, starting at the top of the viewport.
     *
     * Negative limit: maxScrollaway * -1
     *   all elements that should be hidden are positioned above the viewport
     *   with the elements that should be visible starting at the top of the
     *   viewport.
     */
    this._state.cumulativeOffset = Math.max(
      Math.min(
        (masthead ? masthead.offsetTop : 0) + oldY - this._state.scrollPos,
        0
      ),
      this._state.maxScrollaway * -1
    );

    /**
     * Handle each potentially sticky element in the order we expect them to
     * appear on the page. Important to do this sequentially for
     * cumulativeOffset to be correctly calculated by the time each of these
     * methods accesses it.
     *
     * @TODO One idea for improving this so the execution order doesn't matter
     * is to collect our elements into an array ordered by document position,
     * then loop over that array and execute a corresponding handler method.
     */
    if (banner) {
      this._handleBanner();
    }
    if (masthead) {
      this._handleMasthead();
    }
    if (leadspaceSearchBar) {
      this._handleLeadspaceSearch();
    }
    if (tocInner) {
      this._handleToc();
    }
  }

  /**
   * Manages which elements are stuck and where they are positioned. We should
   * only have one element stuck to the top of the viewport as the page scrolls
   * down.
   */
  _manageStickyElements() {
    const { localeModal } = this._elements;
    const { scrollPos: scrollPosPrevious } = this._state;

    // Exit early if locale modal is open.
    if (localeModal && localeModal.hasAttribute('open')) return;

    // Store scroll positions.
    this._state.scrollPosPrevious = scrollPosPrevious;
    this._state.scrollPos = Math.max(0, window.scrollY);

    // Given the current state, calculate how elements should be positioned.
    this._calculateMaxScrollaway();
    this._positionElements();

    // Set custom property for use in stylesheets
    root.document.documentElement.style.setProperty(
      this.constructor.customPropertyName,
      `${this._state.cumulativeOffset}px`
    );
  }
}

export default StickyHeader;
