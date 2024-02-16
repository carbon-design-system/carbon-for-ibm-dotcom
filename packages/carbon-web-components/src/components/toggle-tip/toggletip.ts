/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import Information16 from '@carbon/icons/lib/information/16';
import { prefix } from '../../globals/settings';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import FocusMixin from '../../globals/mixins/focus';
import { POPOVER_ALIGNMENT } from '../popover/defs';
import styles from './toggletip.scss';
import { floatingUIPosition } from '../../globals/internal/floating-ui';

/**
 * Definition tooltip.
 *
 * @element cds-toggletip
 */
@customElement(`${prefix}-toggletip`)
class CDSToggletip extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * How the tooltip is aligned to the trigger button.
   */
  @property({ reflect: true })
  alignment = POPOVER_ALIGNMENT.TOP;

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoalign = false;

  /**
   * The id of the trigger element for auto align
   */
  @property({ type: String, reflect: true })
  triggerId = '';

  /**
   * Specify whether the component is currently open or closed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleActionsSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement).assignedNodes();
    hasContent
      ? this.setAttribute('has-actions', '')
      : this.removeAttribute('has-actions');
  }

  protected _handleClick = () => {
    if (this.autoalign) {
      const button: any = document.querySelector(`#${this.triggerId}`);
      button.focus();
    }
    this.open = !this.open;
  };

  /**
   * Handles `keydown` event on this element.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleKeydown = async (event) => {
    if (event.key === 'Escape') {
      this.open = false;
    }
  };

  /**
   * Handles `blur` event handler on the document this element is in.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event: FocusEvent) {
    if (!this.contains(event.relatedTarget as Node)) {
      this.open = false;
    }
  }

  protected _handleFocusOutToggle(event: FocusEvent) {
    const toggleTipElem = document.querySelector(`[triggerId=${this.id}`);
    if (!toggleTipElem?.contains(event.relatedTarget as Node)) {
      toggleTipElem?.removeAttribute('open');
    }
  }

  protected _renderToggleTipLabel = () => {
    return html`
      <span class="${prefix}--toggletip-label">
        <slot></slot>
      </span>
    `;
  };

  protected _renderTooltipButton = () => {
    return html`
      <button
        aria-controls="${this.id}"
        class="${prefix}--toggletip-button"
        @click=${this._handleClick}>
        ${Information16({ id: 'trigger' })}
      </button>
    `;
  };

  protected _renderTooltipContent = () => {
    return this.autoalign
      ? html`
          <span class="${prefix}--popover-content">
            <div class="${prefix}--toggletip-content">
              <slot name="body-text"></slot>
              <div class="${prefix}--toggletip-actions">
                <slot
                  name="actions"
                  @slotchange="${this._handleActionsSlotChange}"></slot>
              </div>
            </div>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `
      : html`
          <span class="${prefix}--popover">
            <span class="${prefix}--popover-content">
              <div class="${prefix}--toggletip-content">
                <slot name="body-text"></slot>
                <div class="${prefix}--toggletip-actions">
                  <slot
                    name="actions"
                    @slotchange="${this._handleActionsSlotChange}"></slot>
                </div>
              </div>
            </span>
            <span class="${prefix}--popover-caret"></span>
          </span>
        `;
  };

  connectedCallback() {
    super.connectedCallback();

    if (this.autoalign) {
      const button: any = document.querySelector(`#${this.triggerId}`);
      button.addEventListener('click', this._handleClick);
      button.addEventListener('focusout', this._handleFocusOutToggle);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.autoalign) {
      const button: any = document.querySelector(`#${this.triggerId}`);
      button.removeEventListener('click', this._handleClick);
      button.removeEventListener('focusout', this._handleFocusOutToggle);
    }
  }

  async updated() {
    if (this.autoalign) {
      // auto align functionality with @floating-ui/dom library
      const button: any = document.querySelector(`#${this.triggerId}`);
      const tooltip: any = this.shadowRoot?.querySelector(
        '.cds--popover-content'
      );
      const arrowElement: any = this.shadowRoot?.querySelector(
        '.cds--popover-caret'
      );

      if (button && tooltip) {
        // @floating-ui/dom returns the final placement which we'll use
        // to set the alignment attr for styling
        const placement = await floatingUIPosition({
          button,
          tooltip,
          arrowElement,
          caret: true,
          alignment: this.alignment,
        });

        this.setAttribute('alignment', placement);
      }
    }
  }

  protected _renderInnerContent = () => {
    return html`
      ${this._renderTooltipButton()} ${this._renderTooltipContent()}
    `;
  };

  render() {
    const { alignment, open, autoalign } = this;
    const classes = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: true,
      [`${prefix}--popover--high-contrast`]: true,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${alignment}`]: alignment,
      [`${prefix}--toggletip`]: true,
      [`${prefix}--toggletip--open`]: open,
    });

    if (autoalign) {
      return html`
        <span class="${classes}"> ${this._renderTooltipContent()} </span>
      `;
    } else {
      return html`
        ${this._renderToggleTipLabel()}
        <span class="${classes}"> ${this._renderInnerContent()} </span>
      `;
    }
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSToggletip;
