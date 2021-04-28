/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, internalProperty, query, queryAll, customElement, LitElement } from 'lit-element';
import CaretLeft20 from 'carbon-web-components/es/icons/caret--left/20.js';
import CaretRight20 from 'carbon-web-components/es/icons/caret--right/20.js';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import TableOfContents20 from 'carbon-web-components/es/icons/table-of-contents/20.js';
import throttle from 'lodash-es/throttle.js';
import styles from './table-of-contents.scss';
import { TOC_TYPES } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;
interface Cancelable {
  cancel(): void;
}

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
 * Table of contents.
 *
 * @element dds-table-of-contents
 * @csspart table - The table UI.
 * @slot heading - The heading content.
 * @slot menu-rule - The menu rule.
 */
@customElement(`${ddsPrefix}-table-of-contents`)
class DDSTableOfContents extends HostListenerMixin(LitElement) {
  /**
   * Defines TOC type, "" for default, `horizontal` for horizontal variant.
   */
  @property({ reflect: true, attribute: 'toc-layout' })
  layout = TOC_TYPES.DEFAULT;

  /**
   * The current scroll position.
   */
  @internalProperty()
  private _currentScrollPosition = 0;

  /**
   * The current target `<a>` that should be in view.
   */
  @internalProperty()
  private _currentTarget: HTMLAnchorElement | null = null;

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
   * `true` if there is a heading content.
   */
  @internalProperty()
  private _hasHeading = false;

  /**
   * `true` if mobile container is visible.
   */
  @internalProperty()
  private _hasMobileContainerVisible = false;

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _observerIntersection: IntersectionObserver | null = null;

  /**
   * The scrolling content.
   */
  @query(`.${prefix}--tableofcontents__desktop`)
  private _contentNode?: HTMLElement;

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

  @queryAll(`.${prefix}--tableofcontents__desktop__item`)
  private _itemNodes?: HTMLElement[] = [];

  @query(`.${prefix}--tableofcontents__navbar`)
  private _navBar?: HTMLElement;

  /**
   * The container for the mobile UI.
   */
  @query(`.${prefix}--tableofcontents__mobile`)
  private _mobileContainerNode?: HTMLElement;

  /**
   * The `<select>` for the mobile UI.
   */
  @query(`.${prefix}--tableofcontents__mobile__select`)
  private _mobileSelectNode?: HTMLSelectElement;

  /**
   * The observer for the resize of the mobile container.
   */
  private _observerResizeMobileContainer: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The target `<a>`s harvested from the document.
   */
  @internalProperty()
  private _targets: HTMLAnchorElement[] = [];

  /**
   * The handler for throttled scrolling
   */
  private _throttleScroll: (((event: Event) => void) & Cancelable) | null = null;

  /**
   * Cleans-up and creats the resize observer for the mobile container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResizeMobileContainer({ create }: { create?: boolean } = {}) {
    const { _mobileContainerNode: mobileContainerNode } = this;
    if (mobileContainerNode) {
      if (this._observerResizeMobileContainer) {
        this._observerResizeMobileContainer.disconnect();
        this._observerResizeMobileContainer = null;
      }
      if (create) {
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeMobileContainer = new ResizeObserver(this._observeResizeMobileContainer);
        this._observerResizeMobileContainer.observe(mobileContainerNode);
      }
    }
  }

  /**
   * Handles `change` event on mobile `<select>`.
   *
   * @param event The event.
   */
  private _handleChangeSelect(event: Event) {
    this._handleUserInitiatedJump((event.target as HTMLSelectElement).value);
  }

  /**
   * Handles `click` event on a menu item.
   *
   * @param event The event.
   */
  private _handleClickItem(event: MouseEvent) {
    const { selectorDesktopItem } = this.constructor as typeof DDSTableOfContents;
    const target = event.target as HTMLAnchorElement;
    if (target.matches?.(selectorDesktopItem)) {
      this._handleUserInitiatedJump(target.dataset.target!);
      event.preventDefault();
    }
  }

  /**
   * Handles `click` event on a TOC navigation item.
   *
   * @param event The event.
   */
  private _handleOnKeyDown(event: KeyboardEvent) {
    const { selectorDesktopItem } = this.constructor as typeof DDSTableOfContents;
    const target = event.target as HTMLAnchorElement;
    if (target.matches?.(selectorDesktopItem)) {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // 32 = total button width - grid offset
          if (
            target.parentElement?.previousElementSibling!.getBoundingClientRect().left <
            this._navBar!.getBoundingClientRect().left + 32
          ) {
            this._paginateLeft();
          }
        } else if (
          target.parentElement?.nextElementSibling!.getBoundingClientRect().right >
          this._navBar!.getBoundingClientRect().right - 32
        ) {
          this._paginateRight();
        }
      }
    }
  }

  /**
   * Handles intersection of target `<a>`s with the viewport by checking which target's
   * immediate siblings are close to the viewport, and set the active target depending
   * on their positions.
   */
  private _handleOnScroll = () => {
    this.ownerDocument!.defaultView!.requestAnimationFrame(() => {
      if (this._targets) {
        const items = this._targets
          .map((elem, index, arr) => ({
            elem,
            height: arr[index + 1] ? arr[index + 1].getBoundingClientRect().y - elem.getBoundingClientRect().y : null,
            position: elem.getBoundingClientRect().y,
          }))
          .filter((elem, index, arr) =>
            elem.height === null ? arr[index - 1].position < arr[index - 1].height! : elem.position - 50 > -elem.height
          );

        // Sets last section as active at the end of page in case there is not enough height for it to dynamically activate
        const bottomReached =
          this.ownerDocument!.scrollingElement!.scrollTop + this.ownerDocument!.scrollingElement!.clientHeight ===
          this.ownerDocument!.scrollingElement!.scrollHeight;
        if (items && items[0] && items[items.length - 1]) {
          this._currentTarget = !bottomReached
            ? (items[0].elem as HTMLAnchorElement)
            : (items[items.length - 1].elem as HTMLAnchorElement);
        }
      }
    });
  };

  /**
   * Handles `slotchange` event on the default `<slot>`.
   *
   * @param event The event.
   */
  private _handleSlotChange(event: Event) {
    const { selectorTarget } = this.constructor as typeof DDSTableOfContents;
    this._targets = (event.target as HTMLSlotElement).assignedNodes().reduce((acc, node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as Element;
        if (elem.matches(selectorTarget)) {
          acc.push(elem as HTMLAnchorElement);
        }
        acc.push(...(elem.querySelectorAll(selectorTarget) as NodeListOf<HTMLAnchorElement>));
      }
      return acc;
    }, [] as HTMLAnchorElement[]);
  }

  /**
   * Handles `slotchange` event on `<slot name="heading">`.
   *
   * @param event The event.
   */
  private _handleSlotChangeHeading(event: Event) {
    this._hasHeading = (event.target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
  }

  /**
   * Handles user-initiated jump to a hash.
   *
   * @param target The hash name.
   */
  private _handleUserInitiatedJump(target: string) {
    const elem = this.querySelector(`a[name="${target}"]`);
    elem?.scrollIntoView();
    if (elem) {
      elem.setAttribute('tabindex', '0');
      (elem as HTMLElement).focus({ preventScroll: true });
      elem.removeAttribute('tabindex');
    }
  }

  /**
   * Cleans-up and creates the intersection observer for the scrolling container.
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
        root: this._navBar,
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
    const { _currentScrollPosition: currentScrollPosition, _navBar: navBar, _itemNodes: itemNodes } = this;
    // If the right-side intersection sentinel is in the view, it means that right-side caret button is hidden.
    // Given scrolling to left makes it shown,
    // `contentContainerNode!.offsetWidth` will shrink as we scroll and we need to adjust for it.
    const elems = Array.prototype.slice.call(itemNodes);
    if (elems) {
      // 32 = total button width - grid offset
      const lastVisibleElementIndex = findLastIndex(
        elems,
        elem => elem.getBoundingClientRect().left < 32 + navBar!.getBoundingClientRect().left
      );
      if (lastVisibleElementIndex >= 0) {
        const lastVisibleElementRight = elems[lastVisibleElementIndex].getBoundingClientRect().right;
        const newScrollPosition = lastVisibleElementRight + currentScrollPosition - navBar!.getBoundingClientRect().right + 32;
        // If the new scroll position is less than the width of the left caret button,
        // it means that hiding the left caret button reveals the whole of the left-most nav item.
        // Snaps the left-most nav item to the left edge of nav container in this case.
        this._currentScrollPosition = newScrollPosition <= 0 ? 0 : newScrollPosition;
      }
    }
  }

  /**
   * Handles `click` event on the right-hand paginator button.
   */
  private _paginateRight() {
    const {
      _navBar: navBar,
      _contentNode: contentNode,
      _currentScrollPosition: currentScrollPosition,
      _itemNodes: itemNodes,
    } = this;
    const interimLeft = navBar!.getBoundingClientRect().right;
    const elems = Array.prototype.slice.call(itemNodes);
    if (elems) {
      // 32 = total button width - grid offset
      const firstVisibleElementIndex = elems.findIndex(elem => elem.getBoundingClientRect().right > interimLeft - 32);
      if (firstVisibleElementIndex > 0) {
        const firstVisibleElementLeft =
          elems[firstVisibleElementIndex].getBoundingClientRect().left - navBar!.getBoundingClientRect().left - 32;
        // Ensures that is there is no blank area at the right hand side in scroll area
        // if we see the right remainder nav items can be contained in a page
        const maxLeft = contentNode!.scrollWidth - navBar!.offsetWidth;
        this._currentScrollPosition = Math.min(firstVisibleElementLeft + currentScrollPosition, maxLeft);
      }
    }
  }

  /**
   * Handles resize of mobile container.
   *
   * @param records The resize records.
   */
  private _observeResizeMobileContainer = records => {
    const entry = records[records.length - 1];
    const { height } = entry.contentRect;
    this._hasMobileContainerVisible = height > 0;
  };

  /**
   * The current 0px offset from the top of page.
   */
  @property({ type: Number })
  stickyOffset = 0;

  /**
   * The throttled scroll listener.
   *
   * @param event scroll handler
   */
  @HostListener('window:scroll')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleScroll = (event: Event) => {
    this._throttleScroll!(event);
  };

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResizeMobileContainer({ create: true });
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
    if (!this._throttleScroll) {
      this._throttleScroll = throttle(this._handleOnScroll, 250);
      this._handleOnScroll();
    }
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResizeMobileContainer();
    this._cleanAndCreateIntersectionObserverContainer();
    if (this._throttleScroll) {
      this._throttleScroll.cancel();
      this._throttleScroll = null;
    }
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._cleanAndCreateObserverResizeMobileContainer({ create: true });
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
  }

  updated(changedProperties) {
    if (changedProperties.has('_currentTarget')) {
      const { _currentTarget: currentTarget, _mobileSelectNode: mobileSelectNode } = this;
      // Ensures setting the `value` after rendering child `<option>`s when there is a change in `value`,
      // given reflecting `value` requires child `<option>`s being there beforehand
      mobileSelectNode!.value = currentTarget?.name ?? '';
    }
  }

  render() {
    const {
      stickyOffset,
      _currentTarget: currentTarget,
      _currentScrollPosition: currentScrollPosition,
      _hasHeading: hasHeading,
      _hasMobileContainerVisible: hasMobileContainerVisible,
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _targets: targets,
      _handleChangeSelect: handleChangeSelect,
      _handleClickItem: handleClickItem,
      _handleOnKeyDown: handleOnKeyDown,
      _handleSlotChange: handleSlotChange,
      _handleSlotChangeHeading: handleSlotChangeHeading,
      _paginateLeft: paginateLeft,
      _paginateRight: paginateRight,
    } = this;

    const containerClasses = classMap({
      [`${ddsPrefix}-ce--table-of-contents__container`]: this.layout === TOC_TYPES.DEFAULT,
      [`${ddsPrefix}-ce--table-of-contents-horizontal__container`]: this.layout === TOC_TYPES.HORIZONTAL,
    });

    const navigationClasses = classMap({
      [`${prefix}--tableofcontents__sidebar`]: this.layout === TOC_TYPES.DEFAULT,
      [`${prefix}--tableofcontents__navbar`]: this.layout === TOC_TYPES.HORIZONTAL,
    });

    const caretLeftContainerClasses = classMap({
      [`${prefix}--toc__navbar-caret-left-container`]: true,
      [`${ddsPrefix}-ce--toc__navbar-caret-container--hidden`]: isIntersectionLeftTrackerInContent,
    });

    const caretRightContainerClasses = classMap({
      [`${prefix}--toc__navbar-caret-right-container`]: true,
      [`${ddsPrefix}-ce--toc__navbar-caret-container--hidden`]: isIntersectionRightTrackerInContent,
    });

    return html`
      <div class="${containerClasses}">
        <div
          part="table"
          class="${navigationClasses}"
          style="top: ${this.layout === TOC_TYPES.HORIZONTAL && stickyOffset ? `${stickyOffset}px` : 0}"
        >
          ${hasMobileContainerVisible
            ? nothing
            : html`
                <div ?hidden="${!hasHeading}" class="${prefix}--tableofcontents__desktop__children">
                  <slot name="heading" @slotchange="${handleSlotChangeHeading}"></slot>
                  <slot name="menu-rule"></slot>
                </div>
              `}
          <div class="${prefix}--tableofcontents__mobile-top"></div>
          ${this.layout === 'horizontal'
            ? html`
                <div class="${caretLeftContainerClasses}">
                  <button
                    part="prev-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--toc__navbar-caret-left"
                    @click="${paginateLeft}"
                  >
                    ${CaretLeft20()}
                  </button>
                  <div class="${prefix}--toc__navbar-caret-left-gradient"></div>
                </div>
              `
            : ``}
          <div
            class="${ddsPrefix}-ce--table-of-contents__items-container"
            style="position: sticky; top: ${stickyOffset && this.layout !== 'horizontal' ? `${stickyOffset}px` : 0}"
          >
            <div class="${prefix}--tableofcontents__desktop-container">
              <div class="${prefix}--tableofcontents__desktop" style="left: -${currentScrollPosition}px">
                <div class="${prefix}--sub-content-left"></div>
                <ul>
                  ${targets.map(item => {
                    const name = item.getAttribute('name');
                    const title = (item.dataset.title ?? item.textContent ?? '').trim();
                    const selected = item === currentTarget;
                    const itemClasses = classMap({
                      [`${prefix}--tableofcontents__desktop__item`]: true,
                      [`${prefix}--tableofcontents__desktop__item--active`]: selected,
                    });
                    return html`
                      <li class="${itemClasses}" @click="${handleClickItem}" @keydown="${handleOnKeyDown}">
                        <a aria-current="${ifDefined(!selected ? undefined : 'location')}" data-target="${name}" href="#${name}">
                          ${title}
                        </a>
                      </li>
                    `;
                  })}
                </ul>
                <div class="${prefix}--sub-content-right"></div>
              </div>
            </div>
            <div class="${prefix}--tableofcontents__mobile">
              <div class="${prefix}--tableofcontents__mobile__select__wrapper">
                <select class="${prefix}--tableofcontents__mobile__select" @change="${handleChangeSelect}">
                  ${targets.map(item => {
                    const name = item.getAttribute('name');
                    const title = (item.dataset.title ?? item.textContent ?? '').trim();
                    return html`
                      <option class="${prefix}--tableofcontents__mobile__select__option" value="${name}">
                        ${title}
                      </option>
                    `;
                  })}
                </select>
                ${TableOfContents20({
                  class: `${prefix}--tableofcontents__mobile__select__icon`,
                })}
              </div>
            </div>
          </div>
          ${this.layout === 'horizontal'
            ? html`
                <div class="${caretRightContainerClasses}">
                  <div class="${prefix}--toc__navbar-caret-right-gradient"></div>
                  <button
                    part="next-button"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${prefix}--toc__navbar-caret-right"
                    @click="${paginateRight}"
                  >
                    ${CaretRight20()}
                  </button>
                </div>
              `
            : ``}
        </div>
        <div class="${prefix}--tableofcontents__content">
          <div class="${prefix}--tableofcontents__content-wrapper">
            ${!hasMobileContainerVisible
              ? undefined
              : html`
                  <div ?hidden="${!hasHeading}" class="${prefix}--tableofcontents__children__mobile">
                    <slot name="heading" @slotchange="${handleSlotChangeHeading}"></slot>
                  </div>
                `}
            <slot @slotchange="${handleSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The selector that selects the desktop link items.
   */
  static get selectorDesktopItem() {
    return `.${prefix}--tableofcontents__desktop__item a`;
  }

  /**
   * The selector that determines where to harvest the table of contents from.
   */
  static selectorTarget = 'a[name]';

  static get stableSelector() {
    return `${ddsPrefix}--tableofcontents`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSTableOfContents;
