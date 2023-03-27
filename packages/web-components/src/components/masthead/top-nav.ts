/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map.js';
import { html, property, state, query } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import CaretLeft20 from '../../internal/vendor/@carbon/web-components/icons/caret--left/20.js';
import CaretRight20 from '../../internal/vendor/@carbon/web-components/icons/caret--right/20.js';
import BXHeaderNav from '../../internal/vendor/@carbon/web-components/components/ui-shell/header-nav.js';
import ifNonNull from '../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

// button gradient width size
const buttonGradientWidth = 8;

/**
 * @param a An array.
 * @param predicate The callback function.
 * @param [thisObject] The context object for the given callback function.
 * @returns The index of the last item in the given array where `predicate` returns `true`. `-1` if no such item is found.
 */
function findLastIndex<T>(
  a: T[],
  predicate: (search: T, index?: number, thisObject?: any) => boolean,
  thisObject?: any
): number {
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
  @state()
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
   * `true` if the search is open and nav should be hidden
   */
  @property({ type: Boolean, reflect: true })
  hideNav = false;

  /**
   * `true` if the megamenu has been opened once and thus imported.
   *
   * Used for lazy loading the megamenu.
   */
  @property({ type: Boolean })
  importedMegamenu = false;

  /**
   * The English title of the selected nav item.
   */
  @property({ attribute: 'selected-menu-item' })
  selectedMenuItem!: string;

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItems: any[] = [];

  /**
   * `true` if left-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the left-hand paginator button should be hidden.
   */
  @state()
  private _isIntersectionLeftTrackerInContent = true;

  /**
   * `true` if right-hand scroll intersection sentinel intersects with the host element.
   * In this condition, the right-hand paginator button should be hidden.
   */
  @state()
  private _isIntersectionRightTrackerInContent = true;

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _observerIntersection: IntersectionObserver | null = null;

  /**
   * Boolean checking if page is RTL
   */
  @state()
  private _pageIsRTL: Boolean =
    this.ownerDocument!.documentElement.dir === 'rtl';

  @query('slot')
  private _slotNode?: HTMLSlotElement;

  /**
   * Cleans-up and creats the intersection observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateIntersectionObserverContainer({
    create,
  }: { create?: boolean } = {}) {
    const {
      _intersectionLeftSentinelNode: intersectionLeftSentinelNode,
      _intersectionRightSentinelNode: intersectionRightSentinelNode,
    } = this;
    if (this._observerIntersection) {
      this._observerIntersection.disconnect();
      this._observerIntersection = null;
    }
    if (create) {
      this._observerIntersection = new IntersectionObserver(
        this._observeIntersectionContainer,
        {
          root: this,
          threshold: 0,
        }
      );
      if (intersectionLeftSentinelNode) {
        this._observerIntersection.observe(intersectionLeftSentinelNode);
      }
      if (intersectionRightSentinelNode) {
        this._observerIntersection.observe(intersectionRightSentinelNode);
      }
    }
  }

  /**
   * Handles `slotchange` event on the default `<slot>`.
   */

  private _handleSlotChange(event) {
    this._childItems = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches?.('dds-megamenu-top-nav-menu')
      );
    this._paginateRight({ onLoad: true });
  }

  /**
   * The intersection observer callback for the scrolling container.
   *
   * @param records The intersection observer records.
   */
  private _observeIntersectionContainer = (records) => {
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
      _pageIsRTL: pageIsRTL,
      _slotNode: slotNode,
    } = this;
    // If the right-side intersection sentinel is in the view, it means that right-side caret button is hidden.
    // Given scrolling to left makes it shown,
    // `contentContainerNode!.offsetWidth` will shrink as we scroll and we need to adjust for it.

    const elems = slotNode?.assignedElements() as HTMLElement[];
    if (elems) {
      if (pageIsRTL) {
        const caretLeftNodeWidthAdjustment = this
          ._isIntersectionLeftTrackerInContent
          ? caretLeftNode!.offsetWidth
          : 0;
        const navRight = navNode!.getBoundingClientRect().right;
        const lastVisibleElementIndex = elems.findIndex(
          (elem) =>
            elem.getBoundingClientRect().left <
            navRight - currentScrollPosition - caretRightNode!.offsetWidth
        );
        if (lastVisibleElementIndex >= 0) {
          this._currentScrollPosition = Math.max(
            navRight -
              elems[lastVisibleElementIndex].getBoundingClientRect().left -
              contentContainerNode!.offsetWidth +
              caretLeftNodeWidthAdjustment +
              caretRightNode!.offsetWidth +
              buttonGradientWidth,
            0
          );
        }
      } else {
        const caretRightNodeWidthAdjustment =
          isIntersectionRightTrackerInContent
            ? caretRightNode!.offsetWidth + buttonGradientWidth
            : buttonGradientWidth;
        const caretLeftNodeWidthAdjustment = this
          ._isIntersectionLeftTrackerInContent
          ? caretLeftNode!.offsetWidth + buttonGradientWidth
          : 0;
        const navLeft = navNode!.getBoundingClientRect().left;
        const lastVisibleElementIndex = findLastIndex(
          elems,
          (elem) =>
            elem.getBoundingClientRect().left - navLeft < currentScrollPosition
        );
        if (lastVisibleElementIndex >= 0) {
          const lastVisibleElementRight =
            elems[lastVisibleElementIndex].getBoundingClientRect().right -
            navLeft;
          const newScrollPosition =
            lastVisibleElementRight -
            (contentContainerNode!.offsetWidth +
              caretLeftNodeWidthAdjustment -
              caretRightNodeWidthAdjustment);
          // If the new scroll position is less than the width of the left caret button,
          // it means that hiding the left caret button reveals the whole of the left-most nav item.
          // Snaps the left-most nav item to the left edge of nav container in this case.
          this._currentScrollPosition =
            newScrollPosition <= caretLeftNode!.offsetWidth
              ? 0
              : newScrollPosition;
        }
      }
    }
  }

  /**
   * Handles `click` event on the right-hand paginator button.
   */
  private async _paginateRight({ onLoad }: { onLoad?: boolean } = {}) {
    const {
      _caretLeftNode: caretLeftNode,
      _caretRightNode: caretRightNode,
      _contentContainerNode: contentContainerNode,
      _contentNode: contentNode,
      _currentScrollPosition: currentScrollPosition,
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _navNode: navNode,
      _pageIsRTL: pageIsRTL,
      _slotNode: slotNode,
    } = this;
    await this.updateComplete;

    const elems =
      (slotNode?.assignedElements() as HTMLElement[]) || this._childItems;

    if (elems && contentContainerNode) {
      const interimLeft =
        currentScrollPosition + contentContainerNode!.offsetWidth;
      if (pageIsRTL) {
        const caretLeftNodeWidthAdjustment = isIntersectionLeftTrackerInContent
          ? caretLeftNode!.offsetWidth
          : 0;
        const navRight = navNode!.getBoundingClientRect().right;
        const firstVisibleElementIndex = onLoad
          ? elems.findIndex(
              (elem) =>
                navRight - elem.getBoundingClientRect().left >
                  interimLeft -
                    caretLeftNode!.offsetWidth -
                    buttonGradientWidth && elem.hasAttribute('active')
            )
          : elems.findIndex(
              (elem) =>
                navRight - elem.getBoundingClientRect().left >
                interimLeft - caretLeftNode!.offsetWidth - buttonGradientWidth
            );
        if (firstVisibleElementIndex > 0) {
          const firstVisibleElementLeft = Math.abs(
            elems[firstVisibleElementIndex].getBoundingClientRect().right -
              navRight +
              caretLeftNode!.offsetWidth +
              buttonGradientWidth
          );
          const maxLeft =
            contentNode!.scrollWidth -
            contentContainerNode!.offsetWidth +
            caretLeftNodeWidthAdjustment;
          this._currentScrollPosition = Math.min(
            firstVisibleElementLeft,
            maxLeft
          );
        }
      } else {
        const caretLeftNodeWidthAdjustment = isIntersectionLeftTrackerInContent
          ? 0
          : caretLeftNode!.offsetWidth;
        const caretRightNodeWidthAdjustment =
          isIntersectionRightTrackerInContent ? caretRightNode!.offsetWidth : 0;
        const navLeft = navNode!.getBoundingClientRect().left;
        const firstVisibleElementIndex = onLoad
          ? elems.findIndex(
              (elem) =>
                elem.getBoundingClientRect().right - navLeft > interimLeft &&
                elem.hasAttribute('active')
            )
          : elems.findIndex(
              (elem) =>
                elem.getBoundingClientRect().right - navLeft > interimLeft
            );
        if (firstVisibleElementIndex > 0) {
          const firstVisibleElementLeft =
            elems[firstVisibleElementIndex].getBoundingClientRect().left -
            navLeft -
            buttonGradientWidth;
          // Ensures that is there is no blank area at the right hand side in scroll area
          // if we see the right remainder nav items can be contained in a page
          const maxLeft =
            contentNode!.scrollWidth -
            (contentContainerNode!.offsetWidth -
              caretRightNodeWidthAdjustment +
              caretLeftNodeWidthAdjustment);
          this._currentScrollPosition = Math.min(
            firstVisibleElementLeft,
            maxLeft
          );
        }
      }
    }
  }

  protected _handleOnKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLAnchorElement;
    const {
      _pageIsRTL: pageIsRTL,
      _navNode: navNode,
      _currentScrollPosition: currentScrollPosition,
      _contentContainerNode: contentContainerNode,
      _caretRightNode: caretRightNode,
    } = this;
    if (target) {
      if (pageIsRTL) {
        if (event.key === 'Tab') {
          if (event.shiftKey) {
            if (
              target.previousElementSibling &&
              caretRightNode &&
              target.previousElementSibling.getBoundingClientRect().right +
                currentScrollPosition >
                navNode!.getBoundingClientRect().right -
                  caretRightNode.offsetWidth
            ) {
              this._paginateLeft();
            }
          } else if (
            target.nextElementSibling &&
            caretRightNode &&
            navNode!.getBoundingClientRect().right -
              target.nextElementSibling.getBoundingClientRect().left >
              currentScrollPosition +
                contentContainerNode!.offsetWidth -
                caretRightNode.offsetWidth
          ) {
            this._paginateRight();
          }
        }
      } else if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (
            target.previousElementSibling &&
            target.previousElementSibling.getBoundingClientRect().left -
              navNode!.getBoundingClientRect().left <
              currentScrollPosition
          ) {
            this._paginateLeft();
          }
        } else if (
          target.nextElementSibling &&
          Math.floor(
            target.nextElementSibling.getBoundingClientRect().right -
              navNode!.getBoundingClientRect().left
          ) >
            currentScrollPosition + contentContainerNode!.offsetWidth
        ) {
          this._paginateRight();
        }
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
    if ((event as CustomEvent).detail.active !== undefined) {
      this.hideNav = (event as CustomEvent).detail.active;
    }
  };

  /**
   * `true` to hide the divider.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
    this.removeAttribute('role');
  }

  disconnectedCallback() {
    this._cleanAndCreateIntersectionObserverContainer();
    super.disconnectedCallback();
  }

  firstUpdated(changedProperties) {
    if (changedProperties.has('selectedMenuItem')) {
      this._paginateRight({ onLoad: true });
    }
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('hideNav')) {
      this._cleanAndCreateIntersectionObserverContainer();
    }
    return true;
  }

  updated(changedProperties) {
    if (changedProperties.has('hideNav')) {
      this._cleanAndCreateIntersectionObserverContainer({ create: true });
    }

    if (changedProperties.has('_currentScrollPosition')) {
      if (this._contentNode) {
        this._contentNode.style.insetInlineStart = `-${this._currentScrollPosition}px`;
      }
    }
  }

  render() {
    const {
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _handleSlotChange: handleSlotChange,
      _paginateLeft: paginateLeft,
      _paginateRight: paginateRight,
      _pageIsRTL: pageIsRTL,
      _handleOnKeyDown: handleOnKeyDown,
    } = this;
    const caretLeftContainerClasses = classMap({
      [`${prefix}--header__nav-caret-left-container`]: true,
      [`${ddsPrefix}-ce--header__nav-caret-container--hidden`]:
        isIntersectionLeftTrackerInContent,
    });
    const caretRightContainerClasses = classMap({
      [`${prefix}--header__nav-caret-right-container`]: true,
      [`${ddsPrefix}-ce--header__nav-caret-container--hidden`]:
        isIntersectionRightTrackerInContent,
    });

    return this.hideNav
      ? undefined!
      : html`
          ${pageIsRTL
            ? html`
                <div class="${caretRightContainerClasses}">
                  <div
                    class="${prefix}--header__nav-caret-right-gradient"></div>
                  <button
                    part="next-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--header__nav-caret-right"
                    @click="${paginateRight}">
                    ${CaretLeft20()}
                  </button>
                </div>
                <div class="${ddsPrefix}-ce--header__nav-content-container">
                  <div class="${prefix}--header__nav-content">
                    <nav part="nav" class="${prefix}--header__nav">
                      <div class="${prefix}--sub-content-right"></div>
                      <div
                        part="menubar"
                        class="${prefix}--header__menu-bar"
                        aria-label="${ifNonNull(this.menuBarLabel)}">
                        <slot
                          @slotchange=${handleSlotChange}
                          @keydown="${handleOnKeyDown}"></slot>
                      </div>
                      <div class="${prefix}--sub-content-left"></div>
                    </nav>
                  </div>
                </div>
                <div class="${caretLeftContainerClasses}">
                  <button
                    part="prev-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--header__nav-caret-left"
                    @click="${paginateLeft}">
                    ${CaretRight20()}
                  </button>
                  <div class="${prefix}--header__nav-caret-left-gradient"></div>
                </div>
              `
            : html`
                <div class="${caretLeftContainerClasses}">
                  <button
                    part="prev-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--header__nav-caret-left"
                    @click="${paginateLeft}">
                    ${CaretLeft20()}
                  </button>
                  <div class="${prefix}--header__nav-caret-left-gradient"></div>
                </div>
                <div class="${ddsPrefix}-ce--header__nav-content-container">
                  <div class="${prefix}--header__nav-content">
                    <nav part="nav" class="${prefix}--header__nav">
                      <div class="${prefix}--sub-content-left"></div>
                      <div
                        part="menubar"
                        class="${prefix}--header__menu-bar"
                        aria-label="${ifNonNull(this.menuBarLabel)}">
                        <slot
                          @slotchange=${handleSlotChange}
                          @keydown="${handleOnKeyDown}"></slot>
                      </div>
                      <div class="${prefix}--sub-content-right"></div>
                    </nav>
                  </div>
                </div>
                <div class="${caretRightContainerClasses}">
                  <div
                    class="${prefix}--header__nav-caret-right-gradient"></div>
                  <button
                    part="next-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--header__nav-caret-right"
                    @click="${paginateRight}">
                    ${CaretRight20()}
                  </button>
                </div>
              `}
        `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l0-nav`;
  }

  /**
   * The name of the custom event fired after the search is toggled.
   */
  static get eventToggleSearch() {
    return `${ddsPrefix}-search-with-typeahead-toggled`; // TODO hook up the new event
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader.
}

export default DDSTopNav;
