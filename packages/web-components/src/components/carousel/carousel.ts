/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import 'wicg-inert';
import { slow01 } from '@carbon/motion';
import { classMap } from 'lit/directives/class-map.js';
import CaretLeft20 from '../../internal/vendor/@carbon/web-components/icons/caret--left/20.js';
import CaretRight20 from '../../internal/vendor/@carbon/web-components/icons/caret--right/20.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import { selectorTabbable } from '../../internal/vendor/@carbon/web-components/globals/settings.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import sameHeight from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/sameHeight/sameHeight';
import styles from './carousel.scss';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DExpressiveModal from '../expressive-modal/expressive-modal';
import { ifDefined } from 'lit/directives/if-defined.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

const MAX_GESTURE_DURATION = 300; // max time allowed to do swipe
const MIN_DISTANCE_TRAVELLED = 75; // min distance traveled to be considered swipe
const headingBottomMargin = 64; // tag constants used for same height calculations

/**
 * Minimum percentage of a slide being visible for it to be interactable.
 */
const minIntersectionRatio = 0.75;

/**
 * Carousel.
 *
 * @element c4d-carousel
 * @csspart prev-button - The button to go to the previous page. Usage `c4d-carousel::part(prev-button)`
 * @csspart next-button - The button to go to the next page. Usage `c4d-carousel::part(next-button)`
 */
@customElement(`${c4dPrefix}-carousel`)
class C4DCarousel extends HostListenerMixin(StableSelectorMixin(LitElement)) {
  /**
   * The scrolling container node.
   */
  @query(`.${prefix}--carousel__scroll-container`)
  private _containerNode?: HTMLElement;

  /**
   * The scrolling contents node.
   */
  @query(`.${prefix}--carousel__scroll-contents`)
  private _contentsNode?: HTMLElement;

  /**
   * The node whose text content is announced to screen readers on change.
   */
  @query('[aria-live]')
  private _announcementNode!: HTMLElement;

  /**
   * The width of the scroll contents area node, excluding one of overflowed contents.
   */
  @state()
  private _contentsBaseWidth = 0;

  /**
   * The gap width between each card.
   */
  @state()
  private _gap = 0;

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItems: any[] = [];

  /**
   * Array to hold the card-heading elements within child items.
   */
  private _childItemHeadings: any[] = [];

  /**
   * Array to hold the card-eyebrow elements within child items.
   */
  private _childItemEyebrows: any[] = [];

  /**
   * Array to hold the tag-group elements within child items.
   */
  private _childItemTagGroup: any[] = [];

  /**
   * Array to hold the paragraph elements within child items.
   */
  private _childItemParagraphs: any[] = [];

  /**
   * Array to hold the card-cta-footer elements within child items.
   */
  private _childItemFooters: any[] = [];

  /**
   * The observer for the resize of the scroll container.
   */
  private _observerResizeContainer: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  /**
   * The observer for the resize of the viewport.
   */
  private _observerResizeRoot: any | null = null; // TODO: Wait for `.d.ts` update to support `ResizeObserver`

  private _intersectionThresholdDifference =
    Math.max(0.5, minIntersectionRatio) - Math.min(0.5, minIntersectionRatio);

  /**
   *  IntersectionObserver to watch carousel contents.
   *
   *  @see connectedCallback()
   */
  private _intersectionObserver: IntersectionObserver | null = null;

  private _intersectionTimeout?;

  /**
   * IntersectionObserver callback.
   * Carousel items with more than `minIntersectionRatio` visible will interactable.
   *
   * @param {IntersectionObserverEntry[]} entries Array of observed intersections.
   */
  private _onIntersect(entries) {
    const {
      _announcementNode: announcementNode,
      formatAnnouncement,
      _getStatus: status,
      _intersectionTimeout: timeout,
    } = this;

    // Mark off-screen slides as [inert]
    entries.forEach((entry) => {
      const { target, isIntersecting, intersectionRatio } = entry;

      if (isIntersecting && intersectionRatio > minIntersectionRatio) {
        target.inert = false;
        target.setAttribute('aria-hidden', false);
      } else {
        target.inert = true;
        target.setAttribute('aria-hidden', true);
      }
    });

    // Wait for slide action to finish, then announce slide information
    clearTimeout(timeout);

    // Delay should equal the design token in the carousel's styles.
    const delay = parseInt(slow01, 10);

    this._intersectionTimeout = setTimeout(() => {
      announcementNode.innerText = formatAnnouncement(status);
    }, delay);
  }

  /**
   * The page size that is explicitly set.
   */
  @state()
  private _pageSize?: number;

  /**
   * The page size that is automatically calculated upon viewport size
   * via `--c4d--carousel--page-size` CSS custom property.
   * If `page-size` attribute is set, this value is ignored.
   */
  @state()
  private _pageSizeAuto = 1;

  /**
   * The default slot.
   */
  @query('slot:not([name])')
  private _slotNode?: HTMLSlotElement;

  /**
   * The number of total items.
   */
  @state()
  private _total = 0;

  /**
   * Initial touch position (used to detect swipe gesture)
   */
  @state()
  private _startPos = 0;

  /**
   * Initial touch time (used to detect swipe gesture)
   */
  @state()
  private _startTime = 0;

  /**
   * Whether the carousel is scrolling
   */
  @state()
  private _isScrolling = false;

  /**
   * Cleans-up and creates the resize observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new resize observer.
   */
  private _cleanAndCreateObserverResize({ create }: { create?: boolean } = {}) {
    const { _contentsNode: contentsNode } = this;
    if (contentsNode) {
      if (this._observerResizeContainer) {
        this._observerResizeContainer.disconnect();
        this._observerResizeContainer = null;
      }
      if (this._observerResizeRoot) {
        this._observerResizeRoot.disconnect();
        this._observerResizeRoot = null;
      }
      if (create) {
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeRoot = new ResizeObserver(this._observeResizeRoot);
        this._observerResizeRoot.observe(this.ownerDocument!.documentElement);
        // TODO: Wait for `.d.ts` update to support `ResizeObserver`
        // @ts-ignore
        this._observerResizeContainer = new ResizeObserver(
          this._observeResizeContainer
        );
        this._observerResizeContainer.observe(contentsNode);
      }
    }
  }

  /**
   * Cleans-up and creates the intersection observer for the scrolling container.
   *
   * @param [options] The options.
   * @param [options.create] `true` to create the new intersection observer.
   */
  private _cleanAndCreateObserverIntersection({
    create,
  }: { create?: boolean } = {}) {
    const { _containerNode: containerNode } = this;
    // Avoid creating the intersection observer prematurely by checking that
    // this._containerNode has been set.
    if (containerNode) {
      if (this._intersectionObserver) {
        this._intersectionObserver.disconnect();
        this._intersectionObserver = null;
      }
      if (create) {
        // As items cross the minIntersectionRatio `inert` and `aria-hidden` are
        // toggled.
        this._intersectionObserver = new IntersectionObserver(
          this._onIntersect.bind(this),
          {
            root: containerNode,
            threshold: [
              0.5 + this._intersectionThresholdDifference,
              0.5 - this._intersectionThresholdDifference,
            ],
          }
        );
      }
    }
  }

  /**
   * Stops the container from scrolling when focusing on a card outside the viewport.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  // eslint-disable-next-line class-methods-use-this
  private _handleScrollFocus({ target }: Event) {
    (target as HTMLElement).scrollTo(0, 0);
  }

  /**
   * Handles card focus throughout pages.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  @HostListener('shadowRoot:focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocus = async ({ target }: FocusEvent) => {
    const containsCurrent =
      target !== this && this.contains(target as HTMLElement);
    let currentItemIndex = 0;
    Array.from(this._childItems).forEach((carouselItem, index) => {
      if (carouselItem.contains(target as HTMLElement)) {
        currentItemIndex = index;
      }
    });

    // Calculates proper page to display if focus is outside the current page
    if (
      containsCurrent &&
      (currentItemIndex < this.start ||
        currentItemIndex >= this.start + this.pageSize)
    ) {
      // The `currentIndex` floored by `pageSize`
      const nextStart =
        Math.floor(currentItemIndex / this.pageSize) * this.pageSize;
      const pageOffset = this.start % this.pageSize;

      // Ensures the page moves by `this.pageSize` in either direction
      this.start = nextStart + pageOffset;
    }
  };

  /**
   * Handles card with video heading and applies the set same height function.
   *
   * @param event The event.
   */
  @HostListener(`document:eventVideoTitleUpdated`)
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleVideoTitleUpdate = async (event: FocusEvent) => {
    if (event) {
      this._setSameHeight();
    }
  };

  /**
   * Handles `click` event on the next button.
   */
  private _handleClickNextButton() {
    const { pageSize, start, _total: total } = this;
    this.start = Math.min(start + pageSize, total - 1);
    this._handleIsScrolling();
  }

  /**
   * Handles `click` event on the prev button.
   */
  private _handleClickPrevButton() {
    const { pageSize, start } = this;
    this.start = Math.max(start - pageSize, 0);
    this._handleIsScrolling();
  }

  /**
   * Sets scrolling state of carousel
   */
  private _handleIsScrolling() {
    this._isScrolling = true;
    this._contentsNode?.addEventListener('transitionend', () => {
      this._isScrolling = false;
    });
  }

  /**
   * Handles `touchstart` event.
   */
  private _handleTouchStartEvent(event: TouchEvent) {
    this._startPos = event.touches[0].clientX;
    this._startTime = new Date().getTime();
  }

  /**
   * Handles `touchend` event.
   */
  private _handleTouchEndEvent(event: TouchEvent) {
    const { _startPos, _startTime } = this;
    const { pageSize, start, _total: total } = this;

    const distTravelled = event.changedTouches[0].clientX - _startPos; // distance travelled
    const elapsedTime = new Date().getTime() - _startTime; // elapsed time

    if (
      elapsedTime <= MAX_GESTURE_DURATION &&
      Math.abs(distTravelled) >= MIN_DISTANCE_TRAVELLED
    ) {
      if (distTravelled < 0) {
        this.start = Math.min(start + pageSize, total - 1);
      } else {
        this.start = Math.max(start - pageSize, 0);
      }
    }
  }

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const { name } = slot;
    if (!name) {
      this._total = slot
        .assignedNodes()
        .filter((node) => node.nodeType === Node.ELEMENT_NODE).length;
    }
    this._updateGap();

    this._childItems = (event.target as HTMLSlotElement).assignedElements();

    this._intersectionObserver?.disconnect();

    this._childItems.forEach((item) => {
      this._intersectionObserver?.observe(item);
    });

    // retrieve item heading, eyebrows, and footers to set same height
    if (this._childItems) {
      this._childItems
        .filter((elem) =>
          (elem as HTMLElement).matches !== undefined
            ? (elem as HTMLElement).matches(
                (this.constructor as typeof C4DCarousel).selectorItem
              ) ||
              (elem as HTMLElement).matches(
                (this.constructor as typeof C4DCarousel)
                  .selectorItemVideoCTAContainer
              )
            : false
        )
        .forEach((e) => {
          this._childItemEyebrows.push(
            (e as HTMLElement).querySelector(
              (this.constructor as typeof C4DCarousel).selectorItemEyebrow
            )
          );
          this._childItemParagraphs.push(
            (e as HTMLElement).querySelector(
              (this.constructor as typeof C4DCarousel).selectorItemParagraph
            )
          );
          this._childItemTagGroup.push(
            (e as HTMLElement).querySelector(
              (this.constructor as typeof C4DCarousel).selectorItemTagGroup
            )
          );

          this._childItemHeadings.push(
            (e as HTMLElement).querySelector(
              (this.constructor as typeof C4DCarousel).selectorItemHeading
            )
          );

          // gets card cta-type="video" headings
          this._childItemHeadings.push(
            (e as HTMLElement)
              .querySelector(
                (this.constructor as typeof C4DCarousel).selectorItem
              )
              ?.shadowRoot?.querySelector(
                (this.constructor as typeof C4DCarousel).selectorItemHeading
              )
          );

          this._childItemHeadings = this._childItemHeadings.filter(
            (heading) => heading
          );

          this._childItemFooters.push(
            (e as HTMLElement).querySelector(
              (this.constructor as typeof C4DCarousel).selectorItemFooter
            )
          );
        });
      this._observeResizeRoot();
    }
  }

  /**
   * The observer for the resize of the scroll container.
   */
  private _observeResizeContainer = (records) => {
    const { contentRect } = records[records.length - 1];
    const { width: contentsBaseWidth } = contentRect;
    this._contentsBaseWidth = contentsBaseWidth;
    this._updateGap();
  };

  /**
   * The observer for the resize of the viewport.
   */
  private _observeResizeRoot = () => {
    const { customPropertyPageSize } = this.constructor as typeof C4DCarousel;
    const { _contentsNode: contentsNode } = this;
    const { defaultView: w } = this.ownerDocument!;
    this._pageSizeAuto = Number(
      w!
        .getComputedStyle(contentsNode!)
        .getPropertyValue(customPropertyPageSize)
    );
    this._setSameHeight();
  };

  private get _getStatus() {
    const { start, pageSize, _total: total } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);
    return {
      currentPage: Math.ceil(start / pageSize) + 1,
      pages: pagesBefore + pagesSince,
    };
  }

  private _setSameHeight = () => {
    // check if items are not null before using sameHeight

    sameHeight(
      this._childItemEyebrows.filter((item) => item !== null),
      'sm'
    );

    sameHeight(
      this._childItemHeadings.filter((item) => item !== null),
      'sm'
    );
    sameHeight(
      this._childItemParagraphs.filter((item) => item !== null),
      'sm'
    );
    sameHeight(
      this._childItemFooters.filter((item) => item !== null),
      'sm'
    );

    let tagGroupHeight = 0;

    // Get the tallest height of tag groups.
    this._childItemTagGroup.forEach((item) => {
      if (item) {
        const groupHeight = (item as HTMLElement).offsetHeight;
        if (groupHeight > tagGroupHeight) {
          tagGroupHeight = groupHeight;
        }
      }
    });

    this._childItemHeadings.forEach((e) => {
      // add tag group height to heading to the cards lacking tag group
      if (
        e &&
        !e.nextElementSibling?.matches(
          (this.constructor as typeof C4DCarousel).selectorItemTagGroup
        )
      ) {
        e.style.marginBottom = `${tagGroupHeight + headingBottomMargin}px`;
      }
    });
  };

  /**
   * Calculates the width between cards.
   */
  private _updateGap() {
    const { _contentsNode: contentsNode, _slotNode: slotNode } = this;
    const elems = slotNode!
      .assignedNodes()
      .filter((node) => node.nodeType === Node.ELEMENT_NODE);
    this._gap =
      elems.length <= 1
        ? 0
        : (contentsNode!.scrollWidth -
            elems.reduce(
              (acc, elem) => acc + ((elem as HTMLElement).offsetWidth ?? 0),
              0
            )) /
          (elems.length - 1);
  }

  private _updateContentsPosition(changedProperties) {
    // The calculation of the contents position is base on start,
    // _contentsBaseWidth, _gap and pageSize. If none of them changed, we've
    // got nothing to do.
    if (
      !changedProperties.has('start') &&
      !changedProperties.has('_contentsBaseWidth') &&
      !changedProperties.has('_gap') &&
      !changedProperties.has('pageSize')
    ) {
      return;
    }

    // Hard to update the contents node if it hasn't yet been populated. Return
    // early if it's falsy.
    if (!this._contentsNode) {
      return;
    }

    const contentsPosition =
      (-this.start * (this._contentsBaseWidth + this._gap)) / this.pageSize;
    this._contentsNode.style.insetInlineStart = `${contentsPosition}px`;
  }

  get focusableElements() {
    const { selectorTabbable: selectorTabbableForCarousel } = this
      .constructor as typeof C4DExpressiveModal;
    return [
      ...Array.from(
        (this.shadowRoot?.querySelectorAll(
          selectorTabbableForCarousel
        ) as NodeListOf<HTMLElement>) || []
      ),
      ...Array.from(
        this.querySelectorAll(
          selectorTabbableForCarousel
        ) as NodeListOf<HTMLElement>
      ),
    ];
  }

  /**
   * The formatters for the pagination status & aria-live announcement.
   * Should be changed with the locale in which the UI is rendered.
   */
  @property({ attribute: false })
  formatStatus = ({ currentPage, pages }) => `${currentPage} / ${pages}`;

  @property({ attribute: false })
  formatAnnouncement = ({ currentPage, pages }) => {
    const visibleItemsCount = this._childItems.filter(
      (item) => !item.matches('[inert]')
    ).length;

    return `Slide ${currentPage} of ${pages}. Showing ${visibleItemsCount} items.`;
  };

  /**
   * Number of items per page.
   * If `--c4d--carousel--page-size` CSS custom property is set to `<div class="cds--carousel__scroll-container">`
   * or its ancestor (e.g. the host `<c4d-carousel>`), this is set automatically from `--c4d--carousel--page-size`.
   */
  @property({ type: Number, attribute: 'page-size' })
  get pageSize() {
    const { _pageSize: pageSize, _pageSizeAuto: pageSizeAuto } = this;
    return pageSize ?? pageSizeAuto;
  }

  set pageSize(value: number) {
    this._pageSize = value;
    // Don't call `.requestUpdate()` here given we track updates via `_pageSize` and `_pageSizeAuto`
  }

  /**
   * The assistive text for the button to go to next slide/group.
   */
  @property({ attribute: 'next-button-text' })
  nextButtonText?: string;

  private _defaultNextButtonText = 'next';

  private _defaultPrevButtonText = 'previous';

  /**
   * The assistive text for the button to go to previous slide/group.
   */
  @property({ attribute: 'prev-button-text' })
  prevButtonText?: string;

  /**
   * The current zero-based index of the left-most card.
   */
  @property({ type: Number })
  start = 0;

  connectedCallback() {
    super.connectedCallback();
    this._cleanAndCreateObserverResize({ create: true });
    this._cleanAndCreateObserverIntersection({ create: true });

    const containingModal = this.closest(
      `${c4dPrefix}-expressive-modal`
    ) as C4DExpressiveModal | null;
    if (containingModal) {
      containingModal.hasFocusableElements.push(this);
      this.setAttribute('in-modal', '');

      setTimeout(() => {
        containingModal.modalBody!.style.overflow = 'hidden';
        containingModal.modalBody!.style.width = 'var(--modal-vw)';
      }, 0);
    }
  }

  disconnectedCallback() {
    this._cleanAndCreateObserverResize();
    this._cleanAndCreateObserverIntersection();
    super.disconnectedCallback();
  }

  firstUpdated() {
    this._cleanAndCreateObserverResize({ create: true });
    this._cleanAndCreateObserverIntersection({ create: true });
    // Reflect the current writing mode in the dir attribute so that we can
    // make styling adjustments.
    this.setAttribute(
      'dir',
      window.getComputedStyle(this).getPropertyValue('direction')
    );
  }

  updated(changedProperties) {
    this._updateContentsPosition(changedProperties);
  }

  render() {
    const { customPropertyPageSize } = this.constructor as typeof C4DCarousel;
    const {
      nextButtonText,
      _defaultNextButtonText: defaultNextButtonText,
      pageSize,
      prevButtonText,
      _defaultPrevButtonText: defaultPrevButtonText,
      start,
      _pageSize: pageSizeExplicit,
      _total: total,
      _getStatus: status,
      formatStatus,
      _handleClickNextButton: handleClickNextButton,
      _handleClickPrevButton: handleClickPrevButton,
      _handleScrollFocus: handleScrollFocus,
      _handleSlotChange: handleSlotChange,
      _handleTouchStartEvent: handleTouchStartEvent,
      _handleTouchEndEvent: handleTouchEndEvent,
      _isScrolling: isScrolling,
    } = this;
    // Copes with the condition where `start % pageSize` is non-zero
    const pagesBefore = Math.ceil(start / pageSize);
    const pagesSince = Math.ceil((total - start) / pageSize);
    const scrollContentsClasses = classMap({
      [`${prefix}--carousel__scroll-contents`]: true,
      [`${prefix}--carousel__scroll-contents--scrolling`]: isScrolling,
    });
    // Use another div from the host `<c4d-carousel>` to reflect private state
    return html`
      <div part="region" role="region" aria-labelledby="carousel-title">
        <div part="title" id="carousel-title">
          <slot name="title">
            <span class="cds--visually-hidden">Carousel</span>
          </slot>
        </div>
        <div
          part="scroll-container"
          class="${prefix}--carousel__scroll-container"
          @scroll="${handleScrollFocus}"
          @touchstart="${handleTouchStartEvent}"
          @touchend="${handleTouchEndEvent}"
          style="${ifDefined(
            pageSizeExplicit == null
              ? null
              : `${customPropertyPageSize}: ${pageSizeExplicit}`
          )}">
          <div part="contents" class="${scrollContentsClasses}">
            <slot @slotchange="${handleSlotChange}"></slot>
          </div>
        </div>
        <nav
          part="navigation"
          aria-label="Carousel Navigation"
          class="${prefix}--carousel__navigation">
          <button
            part="prev-button"
            class="${prefix}--btn ${prefix}--btn--tertiary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
            ?disabled="${pagesBefore === 0}"
            @click="${handleClickPrevButton}"
            aria-label="${prevButtonText || defaultPrevButtonText}"
            title="${prevButtonText || defaultPrevButtonText}">
            ${CaretLeft20()}
          </button>
          <span
            part="status"
            class="${prefix}--carousel__navigation__status"
            aria-hidden="true"
            >${formatStatus(status)}</span
          >
          <span class="${prefix}--visually-hidden" aria-live="polite"></span>
          <button
            part="next-button"
            class="${prefix}--btn ${prefix}--btn--tertiary ${prefix}--btn--icon-only ${prefix}--carousel__navigation__btn"
            ?disabled="${pagesSince <= 1}"
            @click="${handleClickNextButton}"
            aria-label="${nextButtonText || defaultNextButtonText}"
            title="${nextButtonText || defaultNextButtonText}">
            ${CaretRight20()}
          </button>
        </nav>
      </div>
    `;
  }

  /**
   * The CSS custom property name for the live page size.
   * If the CSS custom property is set to `<div class="cds--carousel__scroll-container">`
   * or its ancestor (e.g. the host `<c4d-carousel>`), this is set automatically from the CSS custom property.
   */
  static get customPropertyPageSize() {
    return `--${c4dPrefix}--carousel--page-size`;
  }

  /**
   * The name of the custom event fired when the video title is updated
   */
  static get eventVideoTitleUpdated() {
    return `${c4dPrefix}-card-video-title-updated`;
  }

  /**
   * The selector for the card component
   */
  static get selectorItem() {
    return `${c4dPrefix}-card`;
  }

  // /**
  //  * The selector for the card cta
  //  */
  // static get selectorItemCardCTA() {
  //   return `${c4dPrefix}-card`;
  // }

  /**
   * The selector for the video cta container
   */
  static get selectorItemVideoCTAContainer() {
    return `${c4dPrefix}-video-cta-container`;
  }

  /**
   * A selector that will return the card item's eyebrow
   */
  static get selectorItemEyebrow() {
    return `${c4dPrefix}-card-eyebrow`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemTagGroup() {
    return `div`;
  }

  /**
   * A selector that will return the card item's tag group
   */
  static get selectorItemParagraph() {
    return `p`;
  }

  /**
   * A selector that will return the card item's heading
   */
  static get selectorItemHeading() {
    return `${c4dPrefix}-card-heading`;
  }

  /**
   * A selector that will return the card item's footer
   */
  static get selectorItemFooter() {
    return `${c4dPrefix}-card-footer`;
  }

  static get stableSelector() {
    return `${c4dPrefix}--carousel`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return `
      ${selectorTabbable}
    `;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DCarousel;
