/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, internalProperty, query, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import CaretLeft20 from 'carbon-web-components/es/icons/caret--left/20.js';
import CaretRight20 from 'carbon-web-components/es/icons/caret--right/20.js';
import BXHeaderNav from 'carbon-web-components/es/components/ui-shell/header-nav.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener.js';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * @param a An array.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 * @returns The index of the last item in the given array where `predicate` returns `true`. `-1` if no such item is found.
 */
function findLastIndex<T>(a: T[], predicate: (search: T, index?: number, thisObject?: any) => boolean, thisObject?: any): number {
  for (let i = a.length - 1; i >= 0; --i) {
    if (predicate(a[i], i, thisObject)) {
      return i;
    }
  }
  return -1;
}

/**
 * Masthead top nav.
 *
 * @element dds-top-nav
 * @csspart nav The element containing the menu bar.
 * @csspart menubar The menu bar.
 * @csspart prev-button The button to go to the previous page.
 * @csspart next-button The button to go to the next page.
 */
@customElement(`${ddsPrefix}-top-nav`)
class DDSTopNav extends StableSelectorMixin(HostListenerMixin(BXHeaderNav)) {
  /**
   * The left-hand paginator button.
   */
  @query(`.${prefix}--header__nav-caret-left`)
  private _caretLeftNode?: HTMLElement;

  /**
   * The right-hand paginator button.
   */
  @query(`.${prefix}--header__nav-caret-right`)
  private _caretRightNode?: HTMLElement;

  /**
   * The `<nav>`.
   */
  @query(`.${prefix}--header__nav`)
  private _navNode?: HTMLElement;

  /**
   * The scrolling container.
   */
  @query(`.${ddsPrefix}-ce--header__nav-content-container`)
  private _contentContainerNode?: HTMLElement;

  /**
   * The scrolling content.
   */
  @query(`.${prefix}--header__nav-content`)
  private _contentNode?: HTMLElement;

  /**
   * The current scroll position.
   */
  @internalProperty()
  private _currentScrollPosition = 0;

  /**
   * The left-hand sentinel to track intersection with the host element.
   * If they intersect, the left-hand paginator button should be hidden.
   */
  @query(`.${prefix}--sub-content-left`)
  private _intersectionLeftSentinelNode?: HTMLElement;

  /**
   * The right-hand sentinel to track intersection with the host element.
   * If they intersect, the right-hand paginator button should be hidden.
   */
  @query(`.${prefix}--sub-content-right`)
  private _intersectionRightSentinelNode?: HTMLElement;

  /**
   * Hide top nav flag.
   */
  @internalProperty()
  private _hideNav = false;

  /**
   * `true` if left-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the left-hand paginator button should be hidden.
   */
  @internalProperty()
  private _isIntersectionLeftTrackerInContent = true;

  /**
   * `true` if right-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the right-hand paginator button should be hidden.
   */
  @internalProperty()
  private _isIntersectionRightTrackerInContent = true;

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _observerIntersection: IntersectionObserver | null = null;

  @query('slot')
  private _slotNode?: HTMLSlotElement;

  /**
   * Cleans-up and creats the intersection observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateIntersectionObserverContainer({ create }: { create?: boolean } = {}) {
    const {
      _intersectionLeftSentinelNode: intersectionLeftSentinelNode,
      _intersectionRightSentinelNode: intersectionRightSentinelNode,
    } = this;
    if (this._observerIntersection) {
      this._observerIntersection.disconnect();
      this._observerIntersection = null;
    }
    if (create) {
      this._observerIntersection = new IntersectionObserver(this._observeIntersectionContainer, {
        root: this,
        threshold: 0,
      });
      if (intersectionLeftSentinelNode) {
        this._observerIntersection.observe(intersectionLeftSentinelNode);
      }
      if (intersectionRightSentinelNode) {
        this._observerIntersection.observe(intersectionRightSentinelNode);
      }
    }
  }

  /**
   * The intersection observer callback for the scrolling container.
   *
   * @param records The intersection observer records.
   */
  private _observeIntersectionContainer = records => {
    const {
      _intersectionLeftSentinelNode: intersectionLeftSentinelNode,
      _intersectionRightSentinelNode: intersectionRightSentinelNode,
    } = this;
    records.forEach(({ isIntersecting, target }) => {
      if (target === intersectionLeftSentinelNode) {
        this._isIntersectionLeftTrackerInContent = isIntersecting;
      }
      if (target === intersectionRightSentinelNode) {
        this._isIntersectionRightTrackerInContent = isIntersecting;
      }
    });
  };

  /**
   * Handles `click` event on the left-hand paginator button.
   */
  private _paginateLeft() {
    const {
      _caretLeftNode: caretLeftNode,
      _caretRightNode: caretRightNode,
      _contentContainerNode: contentContainerNode,
      _currentScrollPosition: currentScrollPosition,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _navNode: navNode,
      _slotNode: slotNode,
    } = this;
    // If the right-side intersection sentinel is in the view, it means that right-side caret button is hidden.
    // Given scrolling to left makes it shown,
    // `contentContainerNode!.offsetWidth` will shrink as we scroll and we need to adjust for it.
    const caretRightNodeWidthAdjustment = isIntersectionRightTrackerInContent ? caretRightNode!.offsetWidth : 0;
    const elems = slotNode?.assignedElements() as HTMLElement[];
    if (elems) {
      const navLeft = navNode!.getBoundingClientRect().left;
      const lastVisibleElementIndex = findLastIndex(
        elems,
        elem => elem.getBoundingClientRect().left - navLeft < currentScrollPosition
      );
      if (lastVisibleElementIndex >= 0) {
        const lastVisibleElementRight = elems[lastVisibleElementIndex].getBoundingClientRect().right - navLeft;
        const newScrollPosition = lastVisibleElementRight - (contentContainerNode!.offsetWidth - caretRightNodeWidthAdjustment);
        // If the new scroll position is less than the width of the left caret button,
        // it means that hiding the left caret button reveals the whole of the left-most nav item.
        // Snaps the left-most nav item to the left edge of nav container in this case.
        this._currentScrollPosition = newScrollPosition <= caretLeftNode!.offsetWidth ? 0 : newScrollPosition;
      }
    }
  }

  /**
   * Handles `click` event on the right-hand paginator button.
   */
  private _paginateRight() {
    const {
      _caretLeftNode: caretLeftNode,
      _caretRightNode: caretRightNode,
      _contentContainerNode: contentContainerNode,
      _contentNode: contentNode,
      _currentScrollPosition: currentScrollPosition,
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _navNode: navNode,
      _slotNode: slotNode,
    } = this;
    const caretLeftNodeWidthAdjustment = isIntersectionLeftTrackerInContent ? caretLeftNode!.offsetWidth : 0;
    const caretRightNodeWidthAdjustment = caretRightNode!.offsetWidth;
    const interimLeft = currentScrollPosition + contentContainerNode!.offsetWidth;
    const elems = slotNode?.assignedElements() as HTMLElement[];
    if (elems) {
      const navLeft = navNode!.getBoundingClientRect().left;
      const firstVisibleElementIndex = elems.findIndex(elem => elem.getBoundingClientRect().right - navLeft > interimLeft);
      if (firstVisibleElementIndex > 0) {
        const firstVisibleElementLeft = elems[firstVisibleElementIndex].getBoundingClientRect().left - navLeft;
        // Ensures that is there is no blank area at the right hand side in scroll area
        // if we see the right remainder nav items can be contained in a page
        const maxLeft =
          contentNode!.scrollWidth -
          (contentContainerNode!.offsetWidth - caretLeftNodeWidthAdjustment + caretRightNodeWidthAdjustment);
        this._currentScrollPosition = Math.min(firstVisibleElementLeft, maxLeft);
      }
    }
  }

  /**
   * Handles toggle event from the search component.
   *
   * @param event The event.
   */
  @HostListener('parentRoot:eventToggleSearch')
  protected _handleSearchToggle = (event: Event) => {
    this._hideNav = (event as CustomEvent).detail.active;
  };

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
  }

  disconnectedCallback() {
    this._cleanAndCreateIntersectionObserverContainer();
    super.disconnectedCallback();
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('_hideNav')) {
      this._cleanAndCreateIntersectionObserverContainer();
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('_hideNav')) {
      this._cleanAndCreateIntersectionObserverContainer({ create: true });
    }
  }

  render() {
    const {
      _currentScrollPosition: currentScrollPosition,
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _paginateLeft: paginateLeft,
      _paginateRight: paginateRight,
    } = this;
    const caretLeftContainerClasses = classMap({
      [`${prefix}--header__nav-caret-left-container`]: true,
      [`${ddsPrefix}-ce--header__nav-caret-container--hidden`]: isIntersectionLeftTrackerInContent,
    });
    const caretRightContainerClasses = classMap({
      [`${prefix}--header__nav-caret-right-container`]: true,
      [`${ddsPrefix}-ce--header__nav-caret-container--hidden`]: isIntersectionRightTrackerInContent,
    });
    return this._hideNav
      ? undefined!
      : html`
          <div class="${caretLeftContainerClasses}">
            <button
              part="prev-button"
              tabindex="-1"
              aria-hidden="true"
              class="${prefix}--header__nav-caret-left"
              @click="${paginateLeft}"
            >
              ${CaretLeft20()}
            </button>
            <div class="${prefix}--header__nav-caret-left-gradient"></div>
          </div>
          <div class="${ddsPrefix}-ce--header__nav-content-container">
            <div class="${prefix}--header__nav-content" style="left: -${currentScrollPosition}px">
              <nav part="nav" class="${prefix}--header__nav">
                <div class="${prefix}--sub-content-left"></div>
                <ul
                  part="menubar"
                  role="menubar"
                  class="${prefix}--header__menu-bar"
                  aria-label="${ifNonNull(this.menuBarLabel)}"
                >
                  <slot></slot>
                </ul>
                <div class="${prefix}--sub-content-right"></div>
              </nav>
            </div>
          </div>
          <div class="${caretRightContainerClasses}">
            <div class="${prefix}--header__nav-caret-right-gradient"></div>
            <button
              part="next-button"
              tabindex="-1"
              aria-hidden="true"
              class="${prefix}--header__nav-caret-right"
              @click="${paginateRight}"
            >
              ${CaretRight20()}
            </button>
          </div>
        `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l0-nav`;
  }

  /**
   * The name of the custom event fired after the seach is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-masthead-search-toggled`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTopNav;
