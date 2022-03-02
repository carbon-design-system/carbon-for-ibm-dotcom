import { baseFontSize, breakpoints } from '@carbon/layout';
import ddsSettings from "../settings/settings.js";
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

const gridBreakpoint = parseFloat(breakpoints.lg.width) * baseFontSize;

class StickyHeader {

  constructor() {
    this.ownerDocument = root.document;
    this._banner = undefined;
    this._hasBanner = false;
    this._lastScrollPosition = 0;
    this._leadspaceWithSearch = undefined;
    this._leadspaceSearchBar = undefined;
    this._localeModal = undefined;
    this._masthead = undefined;
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

  /**
   * True if dotcom shell is not present on page.
   *
   * @returns {boolean} true/false
   */
  static isNecessary() {
    return Boolean(!root.document.querySelector(`${ddsPrefix}-dotcom-shell-container`));
  }

  /**
   * Compares the tag name of the component provided to what we expect it to be
   *
   * @param {HTMLElement} component The component provided
   * @param {string} expected The lowercase tag name expected
   * @returns Error or true
   */
  _validateComponent(component, expected) {
    const received = component.tagName.toLowerCase();
    if (received !== expected) {
      throw new TypeError(`${expected} expected, ${received} provided`);
    } else {
      return true;
    }
  }

  set banner(component) {
    if (this._validateComponent(component, `${ddsPrefix}-banner`)) {
      this._banner = component;
      this.hasBanner = true;

      if (this._masthead) {
        this._masthead.setAttribute('with-banner', '');
      }
    }
  }

  set leadspaceWithSearch(component) {
    if (this._validateComponent(component, `${ddsPrefix}-leadspace-with-search`)) {
      this._leadspaceWithSearch = component;
      this._leadspaceWithSearchBar = component.querySelector('dds-search-with-typeahead');
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
      this._mastheadL1 = component.querySelector(`${ddsPrefix}-masthead-l1`);
    }
  }

  set tableOfContents(component) {
    if (this._validateComponent(component, `${ddsPrefix}-table-of-contents`)) {
      this._tableOfContents = component;
      if (component.layout === 'horizontal') {
        this._tableOfContentsInnerBar = component.shadowRoot.querySelector(
          `.${prefix}--tableofcontents__navbar`,
        );
        this._tableOfContentsLayout = 'horizontal';
      } else {
        this._tableOfContentsInnerBar = component.shadowRoot.querySelector(
          `.${prefix}--tableofcontents__sidebar`,
        );
      }
      this._resizeObserver.observe(this._tableOfContents);
    }
  }

  /**
   * Rate-limits the scroll event handler
   */
  _throttledHandler() {
    if (!this._throttled) {
      this._throttled = true;
      this._handleIntersect();

      setTimeout(() => {
        this._throttled = false;
      }, 10);
    }
  }

  _handleResize() {
    const {
      _hasBanner: hasBanner,
      _masthead: masthead,
      _tableOfContentsInnerBar: tocInner,
      _tableOfContentsLayout: tocLayout,
    } = this;

    if (tocInner && masthead) {
      if (
        window.innerWidth >= gridBreakpoint &&
        tocLayout !== 'horizontal' &&
        !hasBanner
      ) {
        masthead.style.top = '0';
      } else {
        if (masthead.offsetTop === 0) {
          tocInner.style.top = `${masthead.offsetHeight}px`;
        }
        this._handleIntersect();
      }
    }
  }

  _handleIntersect() {
    const {
      _lastScrollPosition: oldY,
      _banner: banner,
      _hasBanner: hasBanner,
      _masthead: masthead,
      _mastheadL1: l1Element,
      _localeModal: localeModal,
      _tableOfContents: toc,
      _tableOfContentsInnerBar: tocInner,
      _tableOfContentsLayout: tocLayout,
    } = StickyHeader.global;

    if (localeModal && localeModal.hasAttribute('open')) return;

    const newY = window.scrollY;
    this._lastScrollPosition = newY;

    let maxScrollaway = 0;
    let topmostElement = banner || masthead || tocInner;

    if (banner) maxScrollaway += banner.offsetHeight;

    if (window.outerWidth < gridBreakpoint) {
      if (masthead) maxScrollaway += masthead.offsetHeight;
    }


    let cumulativeOffset = Math.max(Math.min(topmostElement.offsetTop + oldY - newY, 0), (maxScrollaway * -1));

    if (banner) {
      banner.style.transition = 'none';
      banner.style.top = `${cumulativeOffset}px`;
      cumulativeOffset += banner.offsetHeight;
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
  }
}

export default StickyHeader;
