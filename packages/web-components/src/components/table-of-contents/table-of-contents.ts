/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { html, LitElement } from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import ChevronLeft20 from '../../internal/vendor/@carbon/web-components/icons/chevron--left/20.js';
import ChevronRight20 from '../../internal/vendor/@carbon/web-components/icons/chevron--right/20.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import throttle from 'lodash-es/throttle.js';
import StickyHeader from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/StickyHeader/StickyHeader';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './table-of-contents.scss';
import { TOC_TYPES } from './defs';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';
import MediaQueryMixin, {
  MQBreakpoints,
  MQDirs,
} from '../../component-mixins/media-query/media-query';

const { prefix, stablePrefix: c4dPrefix } = settings;

// total button width - grid offset
const buttonWidthOffset = 32;

interface Cancelable {
  cancel(): void;
}

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
 * Table of contents.
 *
 * @element c4d-table-of-contents
 * @csspart list - The menu list. Usage `c4d-table-of-contents::part(list)`
 * @csspart list-item - The menu items. Usage `c4d-table-of-contents::part(list-item)`
 * @csspart list-item--active - The menu items as active. Usage `c4d-table-of-contents::part(list-item--active)`
 * @csspart link - The links under TOC. Usage `c4d-table-of-contents::part(link)`
 * @csspart container - The container. Usage `c4d-table-of-contents::part(container)`
 * @csspart table - The table UI. Usage `c4d-table-of-contents::part(table)`
 * @csspart heading - The headings. Usage `c4d-table-of-contents::part(heading)`
 * @csspart prev-button - The previous button. Usage `c4d-table-of-contents::part(prev-button)`
 * @csspart item-container - The item container. Usage `c4d-table-of-contents::part(item-container)`
 * @csspart content - The content. Usage `c4d-table-of-contents::part(content)`
 * @csspart sub-content-right - The right side content. Usage `c4d-table-of-contents::part(sub-content-right)`
 * @csspart sub-content-left - The left side content. Usage `c4d-table-of-contents::part(sub-content-left)`
 * @csspart next-button - The next button. Usage `c4d-table-of-contents::part(next-button)`
 * @csspart content-table - The content table. Usage `c4d-table-of-contents::part(content-table)`
 * @csspart wrapper - The wrapper. Usage `c4d-table-of-contents::part(wrapper)`
 * @slot heading - The heading content.
 * @slot menu-rule - The menu rule.
 */
@customElement(`${c4dPrefix}-table-of-contents`)
class C4DTableOfContents extends MediaQueryMixin(
  HostListenerMixin(StableSelectorMixin(LitElement)),
  { [MQBreakpoints.LG]: MQDirs.MAX }
) {
  /**
   * Defines TOC type, "" for default, `horizontal` for horizontal variant.
   */
  @property({ reflect: true, attribute: 'toc-layout' })
  layout = TOC_TYPES.DEFAULT;

  /**
   * The current scroll position.
   */
  @state()
  private _currentScrollPosition = 0;

  /**
   * The current target `<a>` that should be in view.
   */
  @state()
  private _currentTarget: HTMLAnchorElement | null = null;

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
   * `true` if there is a heading content.
   */
  @state()
  private _hasHeading = false;

  /**
   * The observer for the intersection of left-side content edge.
   */
  private _observerIntersection: IntersectionObserver | null = null;

  /**
   * The scrolling content.
   */
  @query(`.${prefix}--tableofcontents`)
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
  @queryAll(`.${prefix}--tableofcontents__item`)
  private _itemNodes?: HTMLElement[] = [];

  @query(`.${prefix}--tableofcontents__content`)
  private _contentDiv?: HTMLElement;

  @query(`.${prefix}--tableofcontents__navbar`)
  private _navBar?: HTMLElement;

  /**
   * Whether we're viewing smaller or larger window.
   */
  @state()
  _isMobile = this.carbonBreakpoints.lg.matches;

  /**
   * The target elements matching `[name]` harvested from the document.
   */
  @state()
  private _targets: HTMLElement[] = [];

  /**
   * The Element.tagName values that should never be used as a TOC target.
   * Typically added here because these elements have their own `[name]` attribute.
   */
  private _tagNamesToAvoid = [`${c4dPrefix}-video-player`];

  /**
   * The name of an attribute that will prevent the DOM element and any elements
   * in its subtree from being added to the ToC.
   */
  private _disableTargetAttribute = 'no-toc';

  /**
   * Boolean checking if page is RTL
   */
  @state()
  private _pageIsRTL: boolean =
    this.ownerDocument!.documentElement.dir === 'rtl';

  /**
   * The handler for throttled scrolling
   */
  private _throttleScroll: (((event: Event) => void) & Cancelable) | null =
    null;

  /**
   * Handles `click` event on a menu item.
   *
   * @param event The event.
   */
  private _handleClickItem(event: MouseEvent) {
    const { selectorItem } = this.constructor as typeof C4DTableOfContents;
    const target = event.target as HTMLAnchorElement;
    if (target.matches?.(selectorItem)) {
      this._handleUserInitiatedJump(target.dataset.target!);
      event.preventDefault();
    }
  }

  /**
   * Handles `keyboard` event on a TOC navigation item.
   *
   * @param event The event.
   */
  private _handleOnKeyDown(event: KeyboardEvent) {
    const { selectorItem } = this.constructor as typeof C4DTableOfContents;
    const target = event.target as HTMLAnchorElement;
    const { _pageIsRTL: pageIsRTL } = this;
    const paginateAccessibile =
      this.layout === TOC_TYPES.HORIZONTAL || this._isMobile;

    if (target.matches?.(selectorItem)) {
      if (pageIsRTL) {
        if (event.key === 'ArrowLeft') {
          (
            target.parentElement?.nextElementSibling
              ?.children[0] as HTMLAnchorElement
          )?.focus();
          if (
            paginateAccessibile &&
            target.parentElement?.previousElementSibling &&
            target.parentElement?.previousElementSibling.getBoundingClientRect()
              .right >
              this._navBar!.getBoundingClientRect().right - buttonWidthOffset
          ) {
            this._paginateLeft();
          }
        }
        if (event.key === 'ArrowRight') {
          (
            target.parentElement?.previousElementSibling
              ?.children[0] as HTMLAnchorElement
          )?.focus();
          if (
            paginateAccessibile &&
            target.parentElement?.nextElementSibling &&
            target.parentElement?.nextElementSibling.getBoundingClientRect()
              .left <
              this._navBar!.getBoundingClientRect().left + buttonWidthOffset
          ) {
            this._paginateRight();
          }
        }
      } else {
        if (event.key === 'ArrowLeft') {
          (
            target.parentElement?.previousElementSibling
              ?.children[0] as HTMLAnchorElement
          )?.focus();
          if (
            paginateAccessibile &&
            target.parentElement?.previousElementSibling &&
            target.parentElement?.previousElementSibling!.getBoundingClientRect()
              .left <
              this._navBar!.getBoundingClientRect().left + buttonWidthOffset
          ) {
            this._paginateLeft();
          }
        }
        if (event.key === 'ArrowRight') {
          (
            target.parentElement?.nextElementSibling
              ?.children[0] as HTMLAnchorElement
          )?.focus();
          if (
            paginateAccessibile &&
            target.parentElement?.nextElementSibling &&
            target.parentElement?.nextElementSibling!.getBoundingClientRect()
              .right >
              this._navBar!.getBoundingClientRect().right - buttonWidthOffset
          ) {
            this._paginateRight();
          }
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
            height: arr[index + 1]
              ? arr[index + 1].getBoundingClientRect().y -
                elem.getBoundingClientRect().y
              : null,
            position: elem.getBoundingClientRect().y,
          }))
          .filter((elem, index, arr) =>
            elem.height === null
              ? arr[index - 1].position < arr[index - 1].height!
              : elem.position - 50 - this.stickyOffset > -elem.height
          );

        // Sets last section as active at the end of page in case there is not enough height for it to dynamically activate
        const bottomReached =
          this.ownerDocument!.scrollingElement!.scrollTop +
            this.ownerDocument!.scrollingElement!.clientHeight ===
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
   * Watches for changes to content in the default slot.
   */
  private _contentMutationObserver = new MutationObserver(
    this._contentObserverCallback.bind(this)
  );

  /**
   * Sets table of contents targets whenever any node tree mutation is observed.
   */
  private _contentObserverCallback() {
    const shadowRoot = this.shadowRoot as ShadowRoot;
    const allSlots = Array.from(
      shadowRoot.querySelectorAll(`slot`)
    ) as HTMLSlotElement[];
    const allSlottedNodes = allSlots.flatMap((slot) => slot.assignedNodes());
    this._setTargets(allSlottedNodes);
  }

  /**
   * Sets targets used for generating the table of contents.
   */
  private _setTargets(nodes: Node[]) {
    const {
      _tagNamesToAvoid: tagNamesToAvoid,
      _disableTargetAttribute: disableTargetAttribute,
    } = this;
    const { selectorTarget } = this.constructor as typeof C4DTableOfContents;
    this._targets = nodes.reduce((acc, node) => {
      if (node instanceof HTMLElement) {
        const descendants = node.querySelectorAll(
          selectorTarget
        ) as NodeListOf<HTMLElement>;
        const elems = [node, ...descendants].filter((elem) => {
          const notWhiteSpace = /[^\s\n\r]/g;
          const hasTitle =
            elem.innerText.match(notWhiteSpace) ||
            elem.dataset.title?.match(notWhiteSpace);
          const hasNameAttr = elem.matches(selectorTarget);
          const notExcluded =
            !tagNamesToAvoid.includes(elem.tagName.toLowerCase()) &&
            !elem.closest(`[${disableTargetAttribute}]`);

          return hasTitle && hasNameAttr && notExcluded;
        });

        acc.push(...(elems as HTMLElement[]));
      }

      return acc;
    }, [] as HTMLElement[]);
  }

  /**
   * Handles `slotchange` event on the default `<slot>`.
   *
   * @param event The event.
   */
  private _handleSlotChange(event: Event) {
    // Handle changes to immediate slotted children.
    const slottedElements = (event.target as HTMLSlotElement)
      .assignedNodes()
      .filter((node) => node instanceof HTMLElement);
    this._setTargets(slottedElements as HTMLElement[]);

    // Handle changes to slotted contents' children.
    this._contentMutationObserver.disconnect();
    (event.target as HTMLSlotElement).assignedNodes().forEach((node) => {
      if (node instanceof HTMLElement) {
        this._contentMutationObserver.observe(node, {
          subtree: true,
          childList: true,
          attributeFilter: ['name', 'data-title'],
        });
      }
    });
  }

  /**
   * Handles `slotchange` event on `<slot name="heading">`.
   */
  private _handleSlotChangeHeading() {
    this._hasHeading = Array.from(
      this.querySelectorAll('[slot="heading"]')
    ).some(
      (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
    );
  }

  /**
   * Handles user-initiated jump to a hash.
   *
   * @param target The hash name.
   */
  private _handleUserInitiatedJump(target: string) {
    const elem = this.querySelector(`[name="${target}"]`);
    const masthead: HTMLElement | null = this.ownerDocument.querySelector(
      `${c4dPrefix}-masthead`
    );

    if (elem instanceof HTMLElement) {
      const currentY = window.scrollY;
      let targetY;

      if (currentY > elem.offsetTop && masthead) {
        targetY = elem.offsetTop - masthead.offsetHeight;
      } else {
        targetY =
          elem.offsetTop -
          parseInt(
            window.getComputedStyle(elem).getPropertyValue('padding-top')
          ) -
          parseInt(
            window
              .getComputedStyle(this._contentDiv!)
              .getPropertyValue('padding-top')
          );
      }

      window.scrollTo({
        top: targetY,
        left: 0,
        behavior: 'smooth',
      });

      elem.setAttribute('tabindex', '0');
      (elem as HTMLElement).focus({ preventScroll: true });
      elem.addEventListener(
        'focusout',
        ({ target: focusoutTarget }) => {
          (focusoutTarget as HTMLElement)?.removeAttribute('tabindex');
        },
        {
          once: true,
        }
      );
    }
  }

  /**
   * Cleans-up and creates the intersection observer for the scrolling container.
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
          root: this._navBar,
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
      _currentScrollPosition: currentScrollPosition,
      _navBar: navBar,
      _itemNodes: itemNodes,
      _pageIsRTL: pageIsRTL,
    } = this;
    // If the right-side intersection sentinel is in the view, it means that right-side chevron button is hidden.
    // Given scrolling to left makes it shown,
    // `contentContainerNode!.offsetWidth` will shrink as we scroll and we need to adjust for it.
    const elems = Array.prototype.slice.call(itemNodes);
    if (elems) {
      if (pageIsRTL) {
        const interimLeft = navBar!.getBoundingClientRect().right;
        const lastVisibleElementIndex = findLastIndex(
          elems,
          (elem) =>
            elem.getBoundingClientRect().right > interimLeft - buttonWidthOffset
        );
        if (lastVisibleElementIndex >= 0) {
          const lastVisibleElementRight =
            elems[lastVisibleElementIndex].getBoundingClientRect().left;
          // 48 = button width - button gradient
          const newScrollPosition =
            currentScrollPosition - lastVisibleElementRight + 48;
          this._currentScrollPosition =
            newScrollPosition <= 0 ? 0 : newScrollPosition;
        }
      } else {
        const lastVisibleElementIndex = findLastIndex(
          elems,
          (elem) =>
            elem.getBoundingClientRect().left <
            buttonWidthOffset + navBar!.getBoundingClientRect().left
        );
        if (lastVisibleElementIndex >= 0) {
          const lastVisibleElementRight =
            elems[lastVisibleElementIndex].getBoundingClientRect().right;
          const newScrollPosition =
            lastVisibleElementRight +
            currentScrollPosition -
            navBar!.getBoundingClientRect().right +
            buttonWidthOffset;
          // If the new scroll position is less than the width of the left chevron button,
          // it means that hiding the left chevron button reveals the whole of the left-most nav item.
          // Snaps the left-most nav item to the left edge of nav container in this case.
          this._currentScrollPosition =
            newScrollPosition <= 0 ? 0 : newScrollPosition;
        }
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
      _pageIsRTL: pageIsRTL,
    } = this;

    const elems = Array.prototype.slice.call(itemNodes);
    if (elems) {
      if (pageIsRTL) {
        const interimLeft = navBar!.getBoundingClientRect().left;
        const firstVisibleElementIndex = elems.findIndex(
          (elem) =>
            elem.getBoundingClientRect().left < interimLeft + buttonWidthOffset
        );
        if (firstVisibleElementIndex > 0) {
          const firstVisibleElementLeft = Math.abs(
            elems[firstVisibleElementIndex].getBoundingClientRect().right +
              buttonWidthOffset -
              navBar!.getBoundingClientRect().right
          );
          const maxLeft = contentNode!.scrollWidth - navBar!.offsetWidth;
          this._currentScrollPosition = Math.min(
            firstVisibleElementLeft + currentScrollPosition,
            maxLeft
          );
        }
      } else {
        const interimRight = navBar!.getBoundingClientRect().right;
        const firstVisibleElementIndex = elems.findIndex(
          (elem) =>
            elem.getBoundingClientRect().right >
            interimRight - buttonWidthOffset
        );
        if (firstVisibleElementIndex > 0) {
          const firstVisibleElementLeft =
            elems[firstVisibleElementIndex].getBoundingClientRect().left -
            navBar!.getBoundingClientRect().left -
            buttonWidthOffset;
          // Ensures that is there is no blank area at the right hand side in scroll area
          // if we see the right remainder nav items can be contained in a page
          const maxLeft = contentNode!.scrollWidth - navBar!.offsetWidth;
          this._currentScrollPosition = Math.min(
            firstVisibleElementLeft + currentScrollPosition,
            maxLeft
          );
        }
      }
    }
  }

  mediaQueryCallbackMaxLG() {
    this._isMobile = this.carbonBreakpoints.lg.matches;
  }

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

  /**
   * The trigger reharvest listener.
   */
  @HostListener(`document:${c4dPrefix}-table-of-contents-reharvest`)
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _retriggerHarvest = () => {
    this._targets = Array.from(this.querySelectorAll('[name]'));
  };

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateIntersectionObserverContainer({ create: true });
    if (!this._throttleScroll) {
      this._throttleScroll = throttle(this._handleOnScroll, 250);
      this._handleOnScroll();
    }
  }

  disconnectedCallback() {
    this._cleanAndCreateIntersectionObserverContainer();
    this._contentMutationObserver.disconnect();
    if (this._throttleScroll) {
      this._throttleScroll.cancel();
      this._throttleScroll = null;
    }
    super.disconnectedCallback();
  }

  firstUpdated() {
    super.firstUpdated();
    this._cleanAndCreateIntersectionObserverContainer({ create: true });

    StickyHeader.global.tableOfContents = this;
  }

  render() {
    const {
      layout,
      stickyOffset,
      _currentTarget: currentTarget,
      _currentScrollPosition: currentScrollPosition,
      _hasHeading: hasHeading,
      _isIntersectionLeftTrackerInContent: isIntersectionLeftTrackerInContent,
      _isIntersectionRightTrackerInContent: isIntersectionRightTrackerInContent,
      _isMobile: isMobile,
      _targets: targets,
      _handleClickItem: handleClickItem,
      _handleOnKeyDown: handleOnKeyDown,
      _handleSlotChange: handleSlotChange,
      _handleSlotChangeHeading: handleSlotChangeHeading,
      _paginateLeft: paginateLeft,
      _paginateRight: paginateRight,
      _pageIsRTL: pageIsRTL,
    } = this;

    const containerClasses = classMap({
      [`${c4dPrefix}-ce--table-of-contents__container`]:
        layout === TOC_TYPES.DEFAULT && !isMobile,
      [`${c4dPrefix}-ce--table-of-contents-horizontal__container`]:
        layout === TOC_TYPES.HORIZONTAL || isMobile,
    });

    const navigationClasses = classMap({
      [`${prefix}--tableofcontents__sidebar`]:
        layout === TOC_TYPES.DEFAULT && !isMobile,
      [`${prefix}--tableofcontents__navbar`]:
        layout === TOC_TYPES.HORIZONTAL || isMobile,
    });

    const chevronLeftContainerClasses = classMap({
      [`${prefix}--toc__navbar-chevron-left-container`]: true,
      [`${c4dPrefix}-ce--toc__navbar-chevron-container--hidden`]:
        isIntersectionLeftTrackerInContent,
    });

    const chevronRightContainerClasses = classMap({
      [`${prefix}--toc__navbar-chevron-right-container`]: true,
      [`${c4dPrefix}-ce--toc__navbar-chevron-container--hidden`]:
        isIntersectionRightTrackerInContent,
    });

    return html`
      ${this.layout === 'horizontal'
        ? html`
            <ul class="${prefix}--toc__print-styles" part="list">
              ${targets.map((item) => {
                const name = item.getAttribute('name');
                const title = (
                  item.dataset.title ??
                  item.textContent ??
                  ''
                ).trim();
                const selected = item === currentTarget;
                const itemClasses = classMap({
                  [`${prefix}--tableofcontents__item`]: true,
                  [`${prefix}--tableofcontents__item--active`]: selected,
                });
                return html`
                  <li
                    class="${itemClasses}"
                    part="list-item${selected ? ' list-item--active' : ''}"
                    @click="${handleClickItem}"
                    @keydown="${handleOnKeyDown}">
                    <a
                      aria-current="${ifDefined(
                        !selected ? undefined : 'location'
                      )}"
                      data-target="${name!}"
                      href="#${name}"
                      part="link">
                      ${title}
                    </a>
                  </li>
                `;
              })}
            </ul>
          `
        : ``}
      <div part="container" class="${containerClasses}">
        <div part="table" class="${navigationClasses}">
          ${isMobile
            ? ''
            : html`
                <div
                  ?hidden="${!hasHeading}"
                  class="${prefix}--tableofcontents__children"
                  part="heading">
                  <slot
                    name="heading"
                    @slotchange="${handleSlotChangeHeading}"></slot>
                  <slot name="menu-rule"></slot>
                </div>
              `}
          ${layout === 'horizontal' || isMobile
            ? html`
                ${pageIsRTL
                  ? html`
                      <button
                        part="prev-button"
                        tabindex="-1"
                        aria-hidden="true"
                        class="${chevronRightContainerClasses}"
                        @click="${paginateLeft}">
                        ${ChevronLeft20()}
                      </button>
                    `
                  : html`
                      <button
                        part="prev-button"
                        tabindex="-1"
                        aria-hidden="true"
                        class="${chevronLeftContainerClasses}"
                        @click="${paginateLeft}">
                        ${ChevronLeft20()}
                      </button>
                    `}
              `
            : ``}
          <div
            class="${c4dPrefix}-ce--table-of-contents__items-container"
            part="items-container"
            style="position: sticky; top: ${stickyOffset &&
            this.layout !== TOC_TYPES.HORIZONTAL
              ? `${stickyOffset}px`
              : 0}">
            <div
              class="${prefix}--tableofcontents-container"
              part="item-container">
              <div
                class="${prefix}--tableofcontents"
                part="content"
                style="${pageIsRTL
                  ? 'right'
                  : 'left'}: -${currentScrollPosition}px">
                ${pageIsRTL
                  ? html`
                      <div
                        class="${prefix}--sub-content-right"
                        part="sub-content-right"></div>
                    `
                  : html`
                      <div
                        class="${prefix}--sub-content-left"
                        part="sub-content-left"></div>
                    `}
                <ul part="list">
                  ${targets.map((item) => {
                    const name = item.getAttribute('name');
                    const title = (
                      item.dataset.title ??
                      item.textContent ??
                      ''
                    ).trim();
                    const selected = item === currentTarget;
                    const itemClasses = classMap({
                      [`${prefix}--tableofcontents__item`]: true,
                      [`${prefix}--tableofcontents__item--active`]: selected,
                    });
                    return html`
                      <li
                        class="${itemClasses}"
                        part="list-item${selected ? ' list-item--active' : ''}"
                        @click="${handleClickItem}"
                        @keydown="${handleOnKeyDown}">
                        <a
                          aria-current="${ifDefined(
                            !selected ? undefined : 'location'
                          )}"
                          data-target="${name!}"
                          href="#${name}"
                          tabindex="${selected ? 0 : -1}"
                          part="link">
                          ${title}
                        </a>
                      </li>
                    `;
                  })}
                </ul>
                ${pageIsRTL
                  ? html`
                      <div
                        class="${prefix}--sub-content-left"
                        part="sub-content-left"></div>
                    `
                  : html`
                      <div
                        class="${prefix}--sub-content-right"
                        part="sub-content-right"></div>
                    `}
              </div>
            </div>
          </div>

          ${this.layout === 'horizontal' || isMobile
            ? html`
                ${pageIsRTL
                  ? html`
                      <button
                        part="next-button"
                        tabindex="-1"
                        aria-hidden="true"
                        class="${chevronLeftContainerClasses}"
                        @click="${paginateRight}">
                        ${ChevronRight20()}
                      </button>
                    `
                  : html`
                      <button
                        part="next-button"
                        tabindex="-1"
                        aria-hidden="true"
                        class="${chevronRightContainerClasses}"
                        @click="${paginateRight}">
                        ${ChevronRight20()}
                      </button>
                    `}
              `
            : ``}
        </div>

        <div class="${prefix}--tableofcontents__content" part="content-table">
          <div
            class="${prefix}--tableofcontents__content-wrapper"
            part="wrapper">
            ${!isMobile
              ? ''
              : html`
                  <div
                    ?hidden="${!hasHeading}"
                    class="${prefix}--tableofcontents__children"
                    part="heading">
                    <slot
                      name="heading"
                      @slotchange="${handleSlotChangeHeading}"></slot>
                    <slot name="menu-rule"></slot>
                  </div>
                `}
            <slot @slotchange="${handleSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The selector that selects the link items.
   */
  static get selectorItem() {
    return `.${prefix}--tableofcontents__item a`;
  }

  /**
   * The selector that determines where to harvest the table of contents from.
   */
  static selectorTarget = '[name]';

  static get stableSelector() {
    return `${c4dPrefix}--table-of-contents`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DTableOfContents;
