/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { SIDE_PANEL_SIZE, SIDE_PANEL_PLACEMENT } from './defs';
import styles from './side-panel.scss';
import { selectorTabbable } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import ArrowLeft16 from '@carbon/icons/lib/arrow--left/16';
import Close20 from '@carbon/icons/lib/close/20';
import { moderate02 } from '@carbon/motion';
import '../button/index';
import '../layer/index';
import Handle from '../../globals/internal/handle';

export { SIDE_PANEL_SIZE };

// todo:
// - button set does not re-order when stacked
// - @extend seems to get an extra #side-panel selector in CSS (higher specificity) than following CSS
// - story knobs not working as expected even when changing stories
// - selector-initial-focus does not work
//
// - multi-step side panel (including navigate back)
// - slug
// - additional stories (Panel with second step, initial focus, static title, static title and action bar)
// - action bar refresh bug

// eslint-disable-next-line no-bitwise
const PRECEDING =
  Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING =
  Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

const blockClass = `${prefix}--side-panel`;
const blockClassActionSet = `${prefix}--action-set`;

/**
 * Observes resize of the given element with the given resize observer.
 *
 * @param observer The resize observer.
 * @param elem The element to observe the resize.
 */
const observeResize = (observer: ResizeObserver, elem: Element) => {
  if (!elem) {
    return null;
  }
  observer.observe(elem);
  return {
    release() {
      observer.unobserve(elem);
      return null;
    },
  } as Handle;
};

/**
 * Tries to focus on the given elements and bails out if one of them is successful.
 *
 * @param elems The elements.
 * @param reverse `true` to go through the list in reverse order.
 * @returns `true` if one of the attempts is successful, `false` otherwise.
 */
function tryFocusElems(elems: NodeListOf<HTMLElement>, reverse: boolean) {
  if (!reverse) {
    for (let i = 0; i < elems.length; ++i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  } else {
    for (let i = elems.length - 1; i >= 0; --i) {
      const elem = elems[i];
      elem.focus();
      if (elem.ownerDocument!.activeElement === elem) {
        return true;
      }
    }
  }
  return false;
}

/**
 * SidePanel.
 *
 * @element cds-side-panel
 * @csspart dialog The dialog.
 * @fires cds-side-panel-beingclosed
 *   The custom event fired before this side-panel is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this side-panel.
 * @fires cds-side-panel-closed - The custom event fired after this side-panel is closed upon a user gesture.
 */
@customElement(`${prefix}-side-panel`)
class CDSSidePanel extends HostListenerMixin(LitElement) {
  /**
   * The handle for observing resize of the parent element of this element.
   */
  private _hObserveResize: Handle | null = null;

  /**
   * The handle for observing actions resize
   */
  private _hObserveActionsResize: Handle | null = null;

  /**
   * The element that had focus before this side-panel gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of side-panel content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of side-panel content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track side panel.
   */
  @query('#side-panel')
  private _sidePanel!: HTMLDivElement;

  /**
   * Node to track size of actions
   */
  @query('#actions')
  private _actions!: HTMLElement;

  @query('#label')
  private _label!: HTMLElement;

  @query('#title-container')
  private _titleContainer!: HTMLElement;

  @query('#title')
  private _title!: HTMLElement;

  @query('#subtitle')
  private _subtitle!: HTMLElement;

  @query('#action-toolbar')
  private _actionToolbar!: HTMLElement;

  @query('#inner-content')
  private _innerContent!: HTMLElement;

  @query('#body-content')
  private _bodyContent!: HTMLElement;

  @state()
  _isOpen = false;

  @state()
  _containerScrollTop = -16;

  /**
   * Handles `blur` event on this element.
   *
   * @param event The event.
   * @param event.target The event target.
   * @param event.relatedTarget The event relatedTarget.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const {
      // condensedActions,
      open,
      _startSentinelNode: startSentinelNode,
      _endSentinelNode: endSentinelNode,
    } = this;

    const oldContains = target !== this && this.contains(target as Node);
    const currentContains =
      relatedTarget !== this &&
      (this.contains(relatedTarget as Node) ||
        (this.shadowRoot?.contains(relatedTarget as Node) &&
          relatedTarget !== (startSentinelNode as Node) &&
          relatedTarget !== (endSentinelNode as Node)));

    // Performs focus wrapping if _all_ of the following is met:
    // * This side-panel is open
    // * The viewport still has focus
    // * SidePanel body used to have focus but no longer has focus
    const { selectorTabbable: selectorTabbableForSidePanel } = this
      .constructor as typeof CDSSidePanel;

    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(
        relatedTarget as Node
      );
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        await (this.constructor as typeof CDSSidePanel)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForSidePanel),
            true
          ) &&
          relatedTarget !== this
        ) {
          this.focus();
        }
      }
      // eslint-disable-next-line no-bitwise
      else if (
        relatedTarget === endSentinelNode ||
        comparisonResult & FOLLOWING
      ) {
        await (this.constructor as typeof CDSSidePanel)._delay();
        if (
          !tryFocusElems(
            this.querySelectorAll(selectorTabbableForSidePanel),
            true
          )
        ) {
          this.focus();
        }
      }
    }
  };

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedClose(target);
    }
  };

  private _reducedMotion = { matches: false };
  // private _reducedMotion =
  //   typeof window !== 'undefined' && window?.matchMedia
  //     ? window.matchMedia('(prefers-reduced-motion: reduce)')
  //     : { matches: true };

  /**
   * Handles `click` event on the side-panel container.
   *
   * @param event The event.
   */
  private _handleClickOnOverlay(event: MouseEvent) {
    if (!this.preventCloseOnClickOutside) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles `click` event on the side-panel container.
   *
   * @param event The event.
   */
  private _handleCloseClick(event: MouseEvent) {
    this._handleUserInitiatedClose(event.target);
  }

  /**
   * Handles user-initiated close request of this side-panel.
   *
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSidePanel).eventBeforeClose,
            init
          )
        )
      ) {
        this.open = false;
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSSidePanel).eventClose,
            init
          )
        );
      }
    }
  }

  private _handleNavigateBack(triggeredBy: EventTarget | null) {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSSidePanel).eventNavigateBack,
        {
          composed: true,
          detail: {
            triggeredBy,
          },
        }
      )
    );
  }

  @state()
  _hasSubtitle = false;

  private _handleSubtitleChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const subtitle = target?.assignedNodes();

    this._hasSubtitle = subtitle.length > 0;
  }

  @state()
  _hasActionToolbar = false;

  // eslint-disable-next-line class-methods-use-this
  private _handleActionToolbarChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();

    this._hasActionToolbar = actions && actions.length > 0;

    if (this._hasActionToolbar) {
      for (const action of actions) {
        // action size should always be md
        action.setAttribute('size', 'sm');
      }
    }
  }

  @state()
  _actionsStacked = false;

  @state()
  _actionsCount = 0;

  private checkSetActionsStacked() {
    const stacked =
      /(xs)|(sm)/.test(this.size) ||
      (/md/.test(this.size) && this._actionsCount > 2);

    if (this._actionsStacked !== stacked) {
      this._actionsStacked = stacked;
      // this.dispatchEvent(
      //   new CustomEvent(
      //     (this.constructor as typeof CDSSidePanel).eventActionsStackingChange,
      //     {
      //       detail: {
      //         stacked: stacked,
      //       },
      //     }
      //   )
      // );
      // actions may stack automatically based on button set component
      this._updateActionSizes();
    }
  }

  private _handleActionsChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();

    const actionsCount = actions?.length ?? 0;
    if (actionsCount === 0) {
      return;
    } else if (actionsCount > 3) {
      this._actionsCount = 3;
      console.warn(`Too many side-panel actions, max 3.`);
    } else {
      this._actionsCount = actionsCount;
    }

    this.checkSetActionsStacked();

    for (let i = 0; i < actionsCount; i++) {
      if (i > 3) {
        // hide excessive side panel actions
        actions[i].setAttribute('hidden', 'hidden');
        actions[i].setAttribute(
          'data-actions-limit-3-exceeded',
          `${actions.length}`
        );
      } else {
        actions[i].setAttribute('size', this.condensedActions ? 'lg' : 'xl');
        actions[i].classList.add(`${blockClassActionSet}__action-button`);
        if (i === 0) {
          actions[i].classList.add(
            `${blockClassActionSet}__action-button--first`
          );
        }
      }
    }
  }

  /**
   * The `ResizeObserver` instance for observing element resizes for re-positioning floating menu position.
   */
  // TODO: Wait for `.d.ts` update to support `ResizeObserver`
  // @ts-ignore
  private _resizeObserver = new ResizeObserver(() => {
    if (this._sidePanel) {
      const actionsContainer = this._sidePanel.querySelector(
        `#actions`
      ) as HTMLElement;

      const actionHeightPx = actionsContainer?.offsetHeight + 16; // add additional 1rem spacing to bottom padding
      const actionsHeight = `${Math.round(actionHeightPx / 16)}rem`;
      this._sidePanel.style?.setProperty(
        `--${blockClass}--content-bottom-padding`,
        actionsHeight
      );

      this.requestUpdate();
    }
  });

  private _measurements: any = {};

  private _setMeasuredCustomProperties = async (reason, scrollY = 0) => {
    await this.updateComplete;

    if (!this._sidePanel || (!this.open && !this._innerContent)) {
      return;
    }

    if (reason !== 'scroll') {
      this._measurements.subtitleHeight = this._subtitle?.offsetHeight || 0; // set default subtitle height if a subtitle is not provided to enable scrolling animation
      this._measurements.panelHeight = this._sidePanel?.offsetHeight || 0;
      this._measurements.scrollSectionHeight =
        this._bodyContent?.offsetHeight || 0;
      this._measurements.titleContainerHeight =
        this._titleContainer?.offsetHeight || 0;
      this._measurements.titleHeight = this._title?.offsetHeight || 0;
      this._measurements.labelHeight = this._label?.offsetHeight || 0;
      this._measurements.totalScrollingHeight =
        this._measurements.titleContainerHeight +
        this._measurements.subtitleHeight +
        this._measurements.scrollSectionHeight;
      this._measurements.actionToolbarHeight =
        this?._actionToolbar?.offsetHeight || 0;

      this._sidePanel?.style.setProperty(
        `--${blockClass}--title-text-height`,
        this.animateTitle ? '0' : `${this._measurements.titleHeight + 24}px`
      );

      this._sidePanel?.style.setProperty(
        `--${blockClass}--subtitle-container-height`,
        this.animateTitle ? '0' : `${this._measurements.subtitleHeight}px`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--action-bar-container-height`,
        this.animateTitle ? '0' : `${this._measurements.actionToolbarHeight}px`
      );

      if (!this.animateTitle) {
        this._sidePanel.style.setProperty(
          `--${blockClass}--label-text-height`,
          `${this._measurements.labelHeight}px`
        );
      } else {
        this._measurements.titlePaddingTop = parseInt(
          (this._titleContainer &&
            window &&
            window?.getComputedStyle?.(this._titleContainer)?.[
              'padding-top'
            ]) ??
            '0',
          10
        );

        this._measurements.transitionDistance =
          -1 *
          Math.max(
            this._measurements.titleHeight +
              this._measurements.actionToolbarHeight +
              this._measurements.titlePaddingTop -
              this._measurements.titleContainerHeight,
            this._innerContent?.offsetHeight - this._innerContent?.scrollHeight
          );

        // if the difference between the total scrolling height and the panel height is less than
        // the subtitleElement height OR if the subtitle element height is 0, use that difference
        // as the length of the scroll animation (otherwise the animation will not be able to complete
        // because there is not enough scrolling distance to complete it).
        this._measurements.subtitleHeight =
          this._measurements.totalScrollingHeight -
            this._measurements.panelHeight <
          this._measurements.subtitleHeight
            ? this._measurements.totalScrollingHeight -
              this._measurements.panelHeight
            : this._measurements.subtitleHeight === 0
            ? 16
            : this._measurements.subtitleHeight;
        this._measurements.subtitleHeight =
          this._measurements.subtitleHeight < 0
            ? this._innerContent?.scrollHeight -
              this._innerContent?.clientHeight
            : this._measurements.subtitleHeight;

        this._sidePanel.style.setProperty(
          `--${blockClass}--action-bar-container-height`,
          `${this._measurements.actionToolbarHeight || 0}px`
        );

        this._sidePanel.style.setProperty(
          `--${blockClass}--title-height`,
          `${this._measurements.titleHeight + 16}px`
        );
      }
    } else {
      const scrollAnimationProgress = Math.min(
        1,
        scrollY / this._measurements.transitionDistance
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--scroll-y`,
        `${scrollY}px`
      );

      const scrolled = scrollY > 0;

      this._sidePanel.style.setProperty(
        `--${blockClass}--subtitle-opacity`,
        !scrolled
          ? '1'
          : `${
              1 -
              Math.min(this._measurements.transitionDistance, scrollY) /
                this._measurements.transitionDistance
            }`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--divider-opacity`,
        !scrolled ? '0' : `${scrollAnimationProgress}`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--title-y-position`,
        !scrolled
          ? '0rem'
          : `${-Math.abs(
              Math.min(1, scrollY / this._measurements.subtitleHeight)
            )}rem`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--collapsed-title-y-position`,
        !scrolled
          ? '1rem'
          : `${
              Math.max(0, this._measurements.subtitleHeight - scrollY) /
              this._measurements.subtitleHeight
            }rem`
      );

      const reduceTitleContainerHeightAmount =
        ((this._measurements.labelHeight * scrollAnimationProgress) /
          this._measurements.titleContainerHeight) *
        100;

      this._sidePanel.style.setProperty(
        `--${blockClass}--label-text-height`,
        !scrolled ? '0px' : `${Math.trunc(reduceTitleContainerHeightAmount)}px`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--title-container-height`,
        !scrolled ? '0px' : `${this._measurements.titleContainerHeight}px`
      );
    }
  };

  private _scrollObserver = (event) => {
    this._setMeasuredCustomProperties('scroll', event.target.scrollTop);
  };

  private _updateActionSizes() {
    if (this?._sidePanel && this?._actions) {
      this._sidePanel.style.setProperty(
        `--${blockClass}--actions-height`,
        `${this._actions.offsetHeight}px`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--actions-width-first`,
        `${this._actionsStacked ? '0 0 100%' : '1 1 50%'}`
      );

      this._sidePanel.style.setProperty(
        `--${blockClass}--actions-width-other`,
        `${this._actionsStacked ? '0 0 100%' : '0 1 25%'}`
      );
    }
  }

  /**
   * Observes the size of the actions container
   */
  private _resizeActionsObserver = new ResizeObserver(() => {
    this.checkSetActionsStacked();
    this._updateActionSizes();
  });

  /**
   * Determines if the title will animate on scroll
   */
  @property({ reflect: true, attribute: 'animate-title', type: Boolean })
  animateTitle = true;

  /**
   * Sets the close button icon description
   */
  @property({ reflect: true, attribute: 'close-icon-description' })
  closeIconDescription = 'Close';

  /**
   * Determines whether the side panel should render the condensed version (affects action buttons primarily)
   */
  @property({ type: Boolean, reflect: true, attribute: 'condense-actions' })
  condensedActions = false;

  /**
   * Sets the current step of the side panel
   */
  @property({ reflect: true, attribute: 'current-step', type: Number })
  currentStep;

  /**
   * Determines whether the side panel should render with an overlay
   */
  @property({ attribute: 'include-overlay', type: Boolean, reflect: true })
  includeOverlay = false;

  /**
   * Sets the label text which will display above the title text
   */
  @property({ reflect: true, attribute: 'label-text' })
  labelText;

  /**
   * Sets the icon description for the navigation back icon button
   */
  @property({ reflect: true, attribute: 'navigation-back-icon-description' })
  navigationBackIconDescription = 'Back';

  /**
   * `true` if the side-panel should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * SidePanel placement.
   */
  @property({ reflect: true, type: String })
  placement = SIDE_PANEL_PLACEMENT.RIGHT;

  /**
   * Prevent closing on click outside of side-panel
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * The initial location of focus in the side panel
   */
  @property({
    reflect: true,
    attribute: 'selector-initial-focus',
    type: String,
  })
  selectorInitialFocus;

  /**
   * Selector for page content, used to push content to side except
   */
  @property({ reflect: true, attribute: 'selector-page-content' })
  selectorPageContent = '';

  /**
   * SidePanel size.
   */
  @property({ reflect: true, type: String })
  size = SIDE_PANEL_SIZE.MEDIUM;

  /**
   * Determines if this panel slides in
   */
  @property({ attribute: 'slide-in', type: Boolean, reflect: true })
  slideIn = false;

  // /**
  //  * Provide a `Slug` component to be rendered inside the `SidePanel` component
  //  */
  // @property({ reflect: true })
  // slug;

  /**
   * Sets the subtitle text
   */
  @property({ reflect: false, type: String })
  title;

  async connectObservers() {
    await this.updateComplete;
    this._hObserveResize = observeResize(this._resizeObserver, this._sidePanel);
    this._hObserveActionsResize = observeResize(
      this._resizeActionsObserver,
      this._actions
    );
  }

  disconnectObservers() {
    if (this._hObserveResize) {
      this._hObserveResize = this._hObserveResize.release();
    }
    if (this._hObserveActionsResize) {
      this._hObserveActionsResize = this._hObserveActionsResize.release();
    }

    if (this._innerContent) {
      this._innerContent.removeEventListener('scroll', this._scrollObserver);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.disconnectObservers();
    this.connectObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnectObservers();
  }

  render() {
    const {
      animateTitle,
      closeIconDescription,
      condensedActions,
      currentStep,
      includeOverlay,
      labelText,
      navigationBackIconDescription,
      open,
      placement,
      selectorInitialFocus,
      size,
      slideIn,
      title,
    } = this;

    if (!open && !this._isOpen) {
      return html``;
    }

    console.log(selectorInitialFocus);

    const actionsMultiple = ['', 'single', 'double', 'triple'][
      this._actionsCount
    ];

    const titleTemplate = html`
      <div
        id="title-container"
        ?detail-step=${currentStep > 0}
        ?has-title=${!!title}
        ?no-title-animation=${!animateTitle}
        ?reduced-motion=${this._reducedMotion.matches}
        ?has-action-toolbar=${this._hasActionToolbar}>
        <!-- render back button -->
        ${currentStep > 0
          ? html`<cds-icon-button
              aria-label=${navigationBackIconDescription}
              kind="ghost"
              size="sm"
              tooltip-text=${navigationBackIconDescription}
              id="nav-back-button"
              @click=${this._handleNavigateBack}>
              ${ArrowLeft16({ slot: 'icon' })}
            </cds-icon-button>`
          : ''}

        <!-- render title label -->
        ${title?.length && labelText?.length
          ? html` <p id="label">${labelText}</p>`
          : ''}

        <!-- render collapsed title -->
        ${animateTitle && title?.length && !this._reducedMotion.matches
          ? html`<h2 id="collapsed-title" title=${title} aria-hidden="true">
              ${title}
            </h2>`
          : ''}

        <!-- render title -->
        ${title?.length
          ? html`<h2 id="title" title=${title}>${title}</h2>`
          : ''}
      </div>

      <!-- render close button area -->
      <div id="slug-and-close">
        <!-- {normalizedSlug} -->
        <cds-icon-button
          aria-label=${closeIconDescription}
          kind="ghost"
          size="sm"
          tooltip-text=${closeIconDescription}
          id="close-button"
          @click=${this._handleCloseClick}>
          ${Close20({ slot: 'icon' })}
        </cds-icon-button>
      </div>

      <!-- render sub title -->
      <p
        id="subtitle"
        ?hidden=${!this._hasSubtitle}
        ?no-title-animation=${!animateTitle}
        ?no-action-toolbar=${!this._hasActionToolbar}
        ?no-title=${!title}>
        <slot name="subtitle" @slotchange=${this._handleSubtitleChange}></slot>
      </p>

      <div
        id="action-toolbar"
        ?hidden=${!this._hasActionToolbar}
        ?no-title-animation=${!animateTitle}>
        <slot
          name="action-toolbar"
          @slotchange=${this._handleActionToolbarChange}></slot>
      </div>
    `;

    return html`
      <div
        id="side-panel"
        part="dialog"
        role="complementary"
        placement="${placement}"
        ?open=${this._isOpen}
        ?opening=${open && !this._isOpen}
        ?closing=${!open && this._isOpen}
        ?overlay=${includeOverlay || slideIn}
        size=${size}>
        <cds-layer level="1">
          <a
            id="start-sentinel"
            class="sentinel"
            hidden
            href="javascript:void 0"
            role="navigation"></a>

          ${!animateTitle ? titleTemplate : ''}

          <div
            id="inner-content"
            ?no-title-animation=${!animateTitle}
            ?has-actions=${this._actionsCount > 0}>
            ${animateTitle ? titleTemplate : ''}
            <div id="body-content">
              <slot></slot>
            </div>

            <cds-button-set
              id="actions"
              ?hidden=${this._actionsCount === 0}
              ?condensed=${condensedActions}
              actions-multiple=${actionsMultiple}
              ?stacked=${this._actionsStacked && actionsMultiple}
              size=${size}>
              <slot
                name="actions"
                @slotchange=${this._handleActionsChange}></slot>
            </cds-button-set>
          </div>

          <a
            id="end-sentinel"
            class="sentinel"
            hidden
            href="javascript:void 0"
            role="navigation"></a>
        </cds-layer>
      </div>

      ${includeOverlay
        ? html`<div
            ?slide-in=${slideIn}
            id="overlay"
            ?open=${this.open}
            ?opening=${open && !this._isOpen}
            ?closing=${!open && this._isOpen}
            tabindex="-1"
            @click=${this._handleClickOnOverlay}></div>`
        : ''}
    `;
  }

  checkSetOpen = () => {
    const { _sidePanel: sidePanel } = this;
    if (sidePanel && this._isOpen) {
      // wait until the side panel has transitioned off the screen to remove
      sidePanel.addEventListener('transitionend', () => {
        this._isOpen = false;
      });
    } else {
      // allow the html to render before animating in the side panel
      window.requestAnimationFrame(() => {
        this._isOpen = this.open;
      });
    }
  };

  adjustPageContent = () => {
    // sets/resets styles based on slideIn property and selectorPageContent;
    if (this.selectorPageContent) {
      const pageContentEl: HTMLElement | null = document.querySelector(
        this.selectorPageContent
      );

      if (pageContentEl) {
        const newValues = {
          marginInlineStart: '',
          marginInlineEnd: '',
          inlineSize: '',
          transition: this._reducedMotion.matches
            ? 'none'
            : `all ${moderate02}`,
          transitionProperty: 'margin-inline-start, margin-inline-end',
        };
        if (this.open) {
          newValues.inlineSize = 'auto';
          if (this.placement === 'left') {
            newValues.marginInlineStart = `${this._sidePanel.offsetWidth}px`;
          } else {
            newValues.marginInlineEnd = `${this._sidePanel.offsetWidth}px`;
          }
        }

        Object.keys(newValues).forEach((key) => {
          pageContentEl.style[key] = newValues[key];
        });
      }
    }
  };

  firstUpdated() {
    this.checkSetOpen();
    this.adjustPageContent();
    this._setMeasuredCustomProperties('first update');
  }

  async updated(changedProperties) {
    this.checkSetOpen();

    if (
      changedProperties.has('slide-in') ||
      changedProperties.has('open') ||
      changedProperties.has('include-overlay')
    ) {
      this.adjustPageContent();
    }
    if (changedProperties.has('open')) {
      this.disconnectObservers();
      if (this.open) {
        this.connectObservers();
        this._setMeasuredCustomProperties('update');

        this._launcher = this.ownerDocument!.activeElement;
        const focusNode =
          this.selectorInitialFocus &&
          this.querySelector(this.selectorInitialFocus);

        await (this.constructor as typeof CDSSidePanel)._delay();
        if (focusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-side-panel>`'s first update/render cycle
          (focusNode as HTMLElement).focus();
        } else if (
          !tryFocusElems(
            this.querySelectorAll(
              (this.constructor as typeof CDSSidePanel).selectorTabbable
            ),
            true
          )
        ) {
          this.focus();
        }
        this._updateActionSizes();
      } else if (
        this._launcher &&
        typeof (this._launcher as HTMLElement).focus === 'function'
      ) {
        (this._launcher as HTMLElement).focus();
        this._launcher = null;
      }

      // monitor scroll
      if (this._innerContent) {
        this._innerContent.addEventListener('scroll', this._scrollObserver);
      }
    }
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * The name of the custom event fired before this side-panel is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this side-panel.
   */
  static get eventBeforeClose() {
    return `${prefix}-side-panel-beingclosed`;
  }

  /**
   * The name of the custom event fired after this side-panel is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-side-panel-closed`;
  }

  /**
   * The name of the custom event fired on clicking the navigate back button
   */
  static get eventNavigateBack() {
    return `${prefix}-side-panel-header-navigate-back`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSidePanel;
