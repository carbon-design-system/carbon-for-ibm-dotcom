/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
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
// - use published styles
// - button set does not re-order when stacked
// - story knobs not working as expected even when changing stories
// - option to not animate title
// - condensed actions
// - multi-step side panel (including navigate back)
// - check without overlay operation
// - preventCloseOnClickOutside
// - selectorPrimaryFocus
// - slug
// - additional stories (Panel with second step, initial focus, static title, static title and action bar)

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
function tryFocusElems(
  elems: NodeListOf<HTMLElement>,
  reverse: boolean = false
) {
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
   * Node to track focus going outside of side-panel content.
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

  @query('#collapsed-title')
  private _collapsedTitle!: HTMLElement;

  @query('#actions-toolbar')
  private _actionsToolbar!: HTMLElement;

  @query('#inner-content')
  private _innerContent!: HTMLElement;

  @state()
  _isOpen = false;

  @state()
  _containerScrollTop = -16;

  /**
   * Handles `blur` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = async ({ target, relatedTarget }: FocusEvent) => {
    const {
      condensedActions,
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
          !tryFocusElems(this.querySelectorAll(selectorTabbableForSidePanel))
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

  private _reducedMotion =
    typeof window !== 'undefined' && window?.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : { matches: true };

  /**
   * Handles `click` event on the side-panel container.
   *
   * @param event The event.
   */
  private _handleClickOnOverlay(event: MouseEvent) {
    this._handleUserInitiatedClose(event.target);
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
      for (let action of actions) {
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
    let stacked =
      /(xs)|(sm)/.test(this.size) ||
      (/md/.test(this.size) && this._actionsCount > 2);

    if (!stacked && window && this._actions) {
      const styles = window.getComputedStyle(this._actions);
      stacked = styles['flex-direction'] === 'column';
    }

    if (this._actionsStacked !== stacked) {
      this._actionsStacked = stacked;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSSidePanel).eventActionsStackingChange,
          {
            detail: {
              stacked: stacked,
            },
          }
        )
      );
      // actions may stack automatically based on button set component
      this._updateActionSizes();
    }
  }

  private _handleActionsChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const actions = target?.assignedElements();

    // // wraps target with a button set
    // let wrapper = target.querySelector(`.${blockClass}__actions-container`);
    // if (!wrapper) {
    //   target.insertAdjacentHTML(
    //     'afterbegin',
    //     '<cds-button-set></cds-button-set>'
    //   );

    //   wrapper = target.children[0];
    // }
    // wrapper.classList.add(`${blockClass}__actions-container`);

    // for (let i = 0; i < actions.length; i++) {
    //   wrapper.appendChild(actions[i]);
    // }
    const actionsCount = actions?.length ?? 0;
    if (actionsCount === 0) return;

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

      // tempB4.insertAdjacentElement('beforebegin', actions[i]);
    }
    // tempB4.remove();

    if (actionsCount > 3) {
      this._actionsCount = 3;
      console.warn(`Too many side-panel actions, max 3.`);
    } else {
      this._actionsCount = actionsCount;
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
        `.${blockClass}__actions-container`
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

  private _scrollObserver = (event) => {
    const scrollY = event.target.scrollTop;
    const transitionDistance = -1 * this?._containerScrollTop;

    this._innerContent.style.setProperty(
      `--${blockClass}scroll-y`,
      `${scrollY}px`
    );
    this._innerContent.style.setProperty(
      `--${blockClass}--title-opacity`,
      `${1 - Math.min(transitionDistance, scrollY) / transitionDistance}`
    );
  };

  private _updateActionSizes() {
    if (this?._innerContent && this?._actions) {
      this._innerContent.style.setProperty(
        `--${blockClass}--actions-height`,
        `${this._actions.offsetHeight}px`
      );

      this._innerContent.style.setProperty(
        `--${blockClass}--actions-width-first`,
        `${this._actionsStacked ? '0 0 100%' : '1 1 50%'}`
      );

      this._innerContent.style.setProperty(
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
  @property({ type: Boolean, reflect: true, attribute: 'condense-acdtions' })
  condensedActions = false;

  /**
   * The additional CSS class names for the container <div> of the element.
   */
  @property({ attribute: 'container-class' })
  containerClass = '';

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
  @property({ reflect: true })
  placement = SIDE_PANEL_PLACEMENT.RIGHT;

  /**
   * Prevent closing on click outside of side-panel
   */
  @property({ type: Boolean, attribute: 'prevent-close-on-click-outside' })
  preventCloseOnClickOutside = false;

  /**
   * Selector for page content, used to push content to side except
   */
  @property({ reflect: true, attribute: 'selector-page-content' })
  selectorPageContent = '';

  /**
   * SidePanel size.
   */
  @property({ reflect: true })
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
  @property({ reflect: false })
  title;

  async connectObservers() {
    await this.updateComplete;
    this._hObserveResize = observeResize(this._resizeObserver, this._sidePanel);
    this._hObserveActionsResize = observeResize(
      this._resizeActionsObserver,
      this._actions
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.disconnectedCallback();
    this.connectObservers();
  }

  disconnectedCallback() {
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
      size,
      slideIn,
      title,
    } = this;

    if (!open && !this._isOpen) {
      return html``;
    }

    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});

    const containerClasses = classMap({
      [`${blockClass}__container`]: true,
      [`${blockClass}__container--${size}`]: true,
      [`${blockClass}__container--open`]: this._isOpen,
      [`${blockClass}__container--opening`]: open && !this._isOpen,
      [`${blockClass}__container--closing`]: !open && this._isOpen,
      [`${blockClass}__container-${placement}-placement`]: true,
      [`${blockClass}__container-without-overlay`]: !includeOverlay && !slideIn,
      // [`${blockClass}__container-with-action-toolbar`]:
      //   actionToolbarButtons && actionToolbarButtons.length,
      // [`${blockClass}__container-without-overlay`]: !includeOverlay && !slideIn,
      // [`${blockClass}__container-is-animating`]: !animationComplete || !open,
      // [`${blockClass}__container--has-slug`]: slug,
      ...containerClass,
    });

    const overlayClasses = classMap({
      [`${blockClass}__overlay`]: true,
      [`${blockClass}__overlay--open`]: this._isOpen,
      [`${blockClass}__overlay--opening`]: open && !this._isOpen,
      [`${blockClass}__overlay--closing`]: !open && this._isOpen,
    });

    const titleContainerClasses = classMap({
      [`${blockClass}__title-container`]: true,
      [`${blockClass}__on-detail-step`]: currentStep > 0,
      [`${blockClass}__on-detail-step-without-title`]:
        currentStep > 0 && !title,
      [`${blockClass}__title-container--no-title-animation`]: !animateTitle,
      [`${blockClass}__title-container-without-title`]: !title,
      [`${blockClass}__title-container--reduced-motion`]:
        this._reducedMotion.matches,
      [`${blockClass}__title-container--has-action-toolbar`]:
        this._hasActionToolbar,
    });

    const subtitleClasses = classMap({
      [`${prefix}--visually-hidden`]: !this._hasSubtitle,
      [`${blockClass}__subtitle-text`]: true,
      [`${blockClass}__subtitle-text-no-animation`]: !animateTitle,
      // [`${blockClass}__subtitle-text-no-animation-no-action-toolbar`]:
      //   !animateTitle &&
      //   (!actionToolbarButtons || !actionToolbarButtons.length),
      // [`${blockClass}__subtitle-text-is-animating`]:
      //   !animationComplete && animateTitle,
      [`${blockClass}__subtitle-without-title`]: !title,
    });

    const innerContentClasses = classMap({
      [`${blockClass}__inner-content`]: true,
      [`${blockClass}__static-inner-content`]: !animateTitle,
      [`${blockClass}__static-inner-content-no-actions`]:
        !animateTitle && this._actionsCount === 0,
      [`${blockClass}__inner-content-with-actions`]: this._actionsCount > 0,
    });

    const actionsMultiple = ['', 'single', 'double', 'triple'][
      this._actionsCount
    ];
    const actionClasses = classMap({
      [`${prefix}--visually-hidden`]: this._actionsCount === 0,
      [`${blockClass}__actions-container`]: true,
      [`${blockClass}__actions-container-condensed`]: condensedActions,
      [`${blockClassActionSet}`]: true,
      [`${blockClassActionSet}--row-${actionsMultiple}`]: !this._actionsStacked,
      [`${blockClassActionSet}--stacking`]:
        this._actionsStacked && actionsMultiple,
      [`${blockClassActionSet}--${size === 'xs' ? 'sm' : size}`]: true,
    });

    const titleTemplate = html`
      <div id="title-container" class=${titleContainerClasses}>
        <!-- render back button -->
        ${currentStep > 0
          ? html`<cds-button
              aria-label=${navigationBackIconDescription}
              kind="ghost"
              size="sm"
              tooltip-text=${navigationBackIconDescription}
              class="${blockClass}__navigation-back-button"
              @click=${this._handleNavigateBack}>
              ${ArrowLeft16({ slot: 'icon' })}
            </cds-button>`
          : ''}

        <!-- render title label -->
        ${title?.length && labelText?.length
          ? html` <p id="label" class="${blockClass}__label-text">
              ${labelText}
            </p>`
          : ''}

        <div class="${blockClass}__title-container-inner">
          <!-- render collapsed title -->
          ${animateTitle && title?.length && !this._reducedMotion.matches
            ? html`<h2
                id="collapsed-title"
                class="${blockClass}__collapsed-title-text"
                title=${title}
                aria-hidden="true">
                ${title}
              </h2>`
            : ''}

          <!-- render title -->
          ${title?.length
            ? html`<h2
                id="title"
                class="${blockClass}__title-text"
                title=${title}>
                ${title}
              </h2>`
            : ''}
        </div>

        <!-- render close button area -->
        <div class="${blockClass}__slug-and-close">
          <!-- {normalizedSlug} -->
          <cds-button
            aria-label=${closeIconDescription}
            kind="ghost"
            size="sm"
            tooltip-text=${closeIconDescription}
            class="${blockClass}__close-button"
            @click=${this._handleCloseClick}>
            ${Close20({ slot: 'icon' })}
          </cds-button>
        </div>

        <!-- render sub title -->
        <p class=${subtitleClasses} ?hidden=${!this._hasSubtitle}>
          <slot
            name="subtitle"
            @slotchange=${this._handleSubtitleChange}></slot>
        </p>

        <div
          id="actions-toolbar"
          class=${classMap({
            [`${prefix}--visually-hidden`]: !this._hasActionToolbar,
            [`${blockClass}__action-toolbar`]: true,
            [`${blockClass}__action-toolbar-no-animation`]: !animateTitle,
          })}
          ?hidden=${this._hasActionToolbar}>
          <slot
            name="action-toolbar"
            @slotchange=${this._handleActionToolbarChange}></slot>
        </div>
      </div>
    `;

    return html`
      <div
        id="side-panel"
        part="dialog"
        class=${containerClasses}
        role="complementary">
        <cds-layer level="1">
          <a
            id="start-sentinel"
            class="${prefix}--visually-hidden"
            href="javascript:void 0"
            role="navigation"></a>

          ${!animateTitle ? titleTemplate : ''}

          <div id="inner-content" class=${innerContentClasses}>
            ${animateTitle ? titleTemplate : ''}
            <div class="${blockClass}__body-content">
              <slot></slot>
            </div>

            <cds-button-set
              id="actions"
              class=${actionClasses}
              ?hidden=${this._actionsCount === 0}
              ?stacked=${this._actionsStacked}>
              <slot
                name="actions"
                @slotchange=${this._handleActionsChange}></slot>
            </cds-button-set>
          </div>

          <a
            id="end-sentinel"
            class="${prefix}--visually-hidden"
            href="javascript:void 0"
            role="navigation"></a>
        </cds-layer>
      </div>
      <div
        class="${overlayClasses}"
        tabindex="-1"
        @click=${this._handleClickOnOverlay}></div>
    `;
  }

  checkSetOpen = () => {
    const { _sidePanel: sidePanel } = this;
    if (sidePanel && this._isOpen) {
      // wait until the side panel has transitioned off the screen to remove
      sidePanel.addEventListener('transitionend', (e) => {
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
    if (this.selectorPageContent && !this._reducedMotion.matches) {
      const pageContentEl: HTMLElement | null = document.querySelector(
        this.selectorPageContent
      );

      if (pageContentEl) {
        const newValues = {
          marginInlineStart: '',
          marginInlineEnd: '',
          inlineSize: '',
          transition: `all ${moderate02}`,
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
  }

  async updated(changedProperties) {
    this.checkSetOpen();

    if (changedProperties.has('slide-in') || changedProperties.has('open')) {
      this.adjustPageContent();
    }

    if (changedProperties.has('open')) {
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector(
          (this.constructor as typeof CDSSidePanel).selectorPrimaryFocus
        );
        await (this.constructor as typeof CDSSidePanel)._delay();
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<cds-button>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<cds-side-panel>`'s first update/render cycle
          (primaryFocusNode as HTMLElement).focus();
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
      this._innerContent.addEventListener('scroll', this._scrollObserver);

      // measures for sticky
      try {
        const labelHeight = this?._label?.offsetHeight ?? 0;
        const containerHeight = this?._titleContainer?.offsetHeight ?? 0;
        const containerPaddingTop = parseInt(
          window?.getComputedStyle?.(this._titleContainer)?.['padding-top'] ??
            '0',
          10
        );
        const titleHeight = this._title?.offsetHeight ?? 0;
        // const collapsedTitleHeight = this?._collapsedTitle?.offsetHeight ?? 0;
        const actionToolbarHeight = this?._actionsToolbar?.offsetHeight ?? 0;

        const titleScrollNudge = 2;

        // how far the title will move when collapsing
        const titleScrollDistance = labelHeight + titleScrollNudge;
        this._titleContainer.style.setProperty(
          `--${blockClass}--title-scroll-distance`,
          `${titleScrollDistance}px`
        );

        // when the container will shrink scrolling

        this._containerScrollTop = Math.max(
          titleHeight +
            actionToolbarHeight +
            containerPaddingTop -
            containerHeight,
          this._innerContent.offsetHeight - this._innerContent.scrollHeight
        );
        this._titleContainer.style.setProperty(
          `--${blockClass}--container-scroll-top`,
          `${this._containerScrollTop}px`
        );

        // When the title will stop scrolling
        // assumes collapsed title is not greater in height than title
        this._titleContainer.style.setProperty(
          `--${blockClass}--title-scroll-top`,
          `${containerPaddingTop - titleScrollNudge}px`
        );
      } catch (e) {
        // no op
      }
    }
  }

  /**
   * @param ms The number of milliseconds.
   * @returns A promise that is resolves after the given milliseconds.
   */
  private static _delay(ms: number = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * A selector selecting buttons that should close this side-panel.
   */
  static get selectorCloseButton() {
    return `[data-side-panel-close],${prefix}-side-panel-close-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * A selector selecting the nodes that should be focused when side-panel gets open.
   */
  static get selectorPrimaryFocus() {
    return `[data-side-panel-primary-focus],${prefix}-side-panel-footer ${prefix}-button[kind="primary"]`;
  }

  /**
   * A selector selecting the side-panel body component
   */
  static get selectorSidePanelBody() {
    return `${prefix}-side-panel-body`;
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

  /**
   * The name of the custom event triggered when action stacking changes
   */
  static get eventActionsStackingChange() {
    return `${prefix}-side-panel-action-stack`;
  }

  /**
   * Sort method for an array of objects by the property 'kind' into a preferred order.
   * NOTE: The values of kind expected are those matching the Carbon button component.
   *
   * Parameters
   * - actions - array to be sorted
   * - stacked - whether the actions are currently being stacked (changes the order)
   *           - The eventActionsStackingChange informs the user of current stacking status
   */
  static sortActions(actions, stacked) {
    // TODO REVIEW: It would be nice to sort actions automatically for the user
    // but I'm unsure how to achieve this. Lit uses comments in the DOM to keep track of
    // things it manages so it may be unwise to do so.

    if (!actions) return;

    const actionOrder = (kind) =>
      ({
        ghost: 1,
        'danger--ghost': 2,
        danger: 4,
        primary: 5,
      }[kind] ?? 3);

    // order the actions with ghost/ghost-danger buttons first and primary/danger buttons last
    // (or the opposite way if we're stacking)
    actions.sort(
      (action1, action2) =>
        (actionOrder(action1?.kind || 'primary') -
          actionOrder(action2?.kind || 'primary')) *
        (stacked ? -1 : 1)
    );
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSidePanel;
