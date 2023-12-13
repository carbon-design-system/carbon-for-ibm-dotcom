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
import {
  property,
  queryAssignedElements,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../button/index';
import ArrowLeft16 from '@carbon/icons/lib/arrow--left/16';
import Close20 from '@carbon/icons/lib/close/20';

import styles from './side-panel.scss';

/**
 * SidePanel header.
 *
 * @element cds-side-panel-header
 */
@customElement(`${prefix}-side-panel-header`)
class CDSSidePanelHeader extends LitElement {
  private _handleNavigateBack(triggeredBy: EventTarget | null) {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSSidePanelHeader).eventNavigateBack,
        {
          composed: true,
          detail: {
            triggeredBy,
          },
        }
      )
    );
  }

  private _handleClose(triggeredBy: EventTarget | null) {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSSidePanelHeader).eventClose,
        {
          composed: true,
          detail: {
            triggeredBy,
          },
        }
      )
    );
  }

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
   * Sets the current step of the side panel
   */
  @property({ reflect: true, attribute: 'current-step', type: Number })
  currentStep;

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

  // /**
  //  * Provide a `Slug` component to be rendered inside the `SidePanel` component
  //  */
  // @property({ reflect: true })
  // slug;

  /**
   * Sets the subtitle text
   */
  @property({ reflect: true })
  subtitle;

  // @property({ reflect: true })
  // @property({ reflect: true, attribute: '' })
  // @property({ reflect: true, attribute: '', type: Boolean })

  // /**
  //  * has test this
  //  */
  // @state() _hasTestThis;

  // _handleSlotChange(e: Event) {
  //   // can change element/node attributes here
  //   const target = e.target as HTMLSlotElement;
  //   const nodes = target.assignedElements();
  //   nodes[0].setAttribute('style', 'color: red;');
  //   console.log(nodes.length);

  //   this._hasTestThis = nodes.length > 0;
  // }

  // updated() {
  //   // can see slotted children here
  //   console.log(this.children);
  // }

  // eslint-disable-next-line class-methods-use-this
  _handleActionToolbarChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const assigned = target?.assignedElements();
    const actionSlot = assigned?.[0];
    const actions = actionSlot?.children;

    if (actions) {
      for (let action of actions) {
        // action size should always be md
        action.setAttribute('size', 'md');
      }
    }
  }

  // createRenderRoot() {
  //   // Do not drill down into a new shadow dom.
  //   return this;
  // }

  render() {
    const {
      animateTitle,
      closeIconDescription,
      currentStep,
      labelText,
      navigationBackIconDescription,
      // slug,
      subtitle,
      title,
    } = this;
    const blockClass = `${prefix}--side-panel`;

    // let normalizedSlug;
    // if (slug) {
    //   normalizedSlug = React.cloneElement(slug, {
    //     // slug size is sm unless actions and size > md
    //     size: actions.length && /l/.test(size) ? 'md' : 'sm',
    //   });
    // }

    const reducedMotion =
      typeof window !== 'undefined' && window?.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : { matches: true };

    const titleContainerClasses = classMap({
      [`${blockClass}__title-container`]: true,
      [`${blockClass}__on-detail-step`]: currentStep > 0,
      [`${blockClass}__on-detail-step-without-title`]:
        currentStep > 0 && !title,
      [`${blockClass}__title-container--no-title-animation`]: !animateTitle,
      [`${blockClass}__title-container-without-title`]: !title,
      [`${blockClass}__title-container--reduced-motion`]: reducedMotion.matches,
    });

    const subtitleClasses = classMap({
      [`${blockClass}__subtitle-text`]: true,
      [`${blockClass}__subtitle-text-no-animation`]: !animateTitle,
      // [`${blockClass}__subtitle-text-no-animation-no-action-toolbar`]:
      //   !animateTitle &&
      //   (!actionToolbarButtons || !actionToolbarButtons.length),
      // [`${blockClass}__subtitle-text-is-animating`]:
      //   !animationComplete && animateTitle,
      [`${blockClass}__subtitle-without-title`]: !title,
    });

    //  const titleEl = title && title.length && labelText && labelText.length ?
    //   html`<p class={`${prefix}__label-text`}>{labelText}</p>` : html``;

    return html`
      <div class=${titleContainerClasses}>
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
          ? html` <p class="${blockClass}__label-text">${labelText}</p>`
          : ''}

        <!-- render title -->
        ${title?.length
          ? html`<h2 class="${blockClass}__title-text" title=${title}>
              ${title}
            </h2>`
          : ''}
      </div>

      <!-- render collapsed title -->
      ${animateTitle && title?.length && !reducedMotion
        ? html`<h2
            class="${blockClass}__title-text"
            title=${title}
            aria-hidden="true">
            {title}
          </h2>`
        : ''}

      <!-- render close button area -->
      <div class="${blockClass}__slug-and-close">
        <!-- {normalizedSlug} -->
        <cds-button
          aria-label=${closeIconDescription}
          kind="ghost"
          size="sm"
          tooltip-text=${closeIconDescription}
          class="${blockClass}__close-button"
          @click=${this._handleClose}>
          ${Close20({ slot: 'icon' })}
        </cds-button>
      </div>

      <!-- render sub title -->
      ${subtitle ? html` <p class=${subtitleClasses}>${subtitle}</p> ` : ''}

      <!-- render action bar buttons -->
      <slot
        name="action-toolbar"
        @slotchange=${this._handleActionToolbarChange}></slot>
    `;
  }

  /**
   * The name of the custom event fired on clicking the close button
   */
  static get eventClose() {
    return `${prefix}-side-panel-header-close`;
  }

  /**
   * The name of the custom event fired on clicking the navigate back button
   */
  static get eventNavigateBack() {
    return `${prefix}-side-panel-header-navigate-back`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSidePanelHeader;
