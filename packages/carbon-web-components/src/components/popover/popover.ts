/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { computePosition, shift, flip, offset, arrow } from '@floating-ui/dom';
import { Placement } from '@floating-ui/utils';
import styles from './popover.scss';
import CDSPopoverContent from './popover-content';

/**
 * Popover.
 *
 * @element cds-popover
 */
@customElement(`${prefix}-popover`)
class CDSPopover extends LitElement {
  /**
   * Specify direction of alignment
   */
  @property({ reflect: true, type: String })
  align = '';

  /**
   * Specify whether a auto align functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoAlign = false;

  /**
   * The id of the trigger element for auto align
   */
  @property({ type: String, reflect: true })
  triggerId = '';

  /**
   * Specify whether a caret should be rendered
   */
  @property({ type: Boolean, reflect: true })
  caret = true;

  /**
   * Specify whether a dropShadow should be rendered
   */
  @property({ type: Boolean, reflect: true })
  dropShadow = true;

  /**
   * Render the component using the high-contrast variant
   */
  @property({ type: Boolean, reflect: true })
  highContrast = false;

  /**
   * Specify whether the component is currently open or closed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Render the component using the tab tip variant
   */
  @property({ type: Boolean, reflect: true })
  tabTip = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    if (this.tabTip) {
      const component = (target as HTMLSlotElement)
        .assignedNodes()
        .filter(
          (node) =>
            node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
        );
      (component[0] as HTMLElement).classList.add(
        `${prefix}--popover--tab-tip__button`
      );
    }
    this.requestUpdate();
  }

  updated(changedProperties) {
    const { selectorPopoverContent } = this.constructor as typeof CDSPopover;

    if (!this.autoAlign) {
      ['open', 'align', 'caret', 'dropShadow', 'tabTip'].forEach((name) => {
        if (changedProperties.has(name)) {
          const { [name as keyof CDSPopover]: value } = this;
          (this.querySelector(selectorPopoverContent) as CDSPopoverContent)[
            name
          ] = value;
        }
      });
    }

    // auto align functionality with @floating-ui/dom library
    const button: any = document.querySelector(`#${this.triggerId}`);
    const tooltip: any = this.shadowRoot?.querySelector(
      '.cds--popover-content'
    );
    const arrowElement: any = this.shadowRoot?.querySelector(
      '.cds--popover-caret'
    );

    if (button && tooltip) {
      computePosition(button, tooltip, {
        strategy: 'fixed',
        middleware: [
          flip(),
          shift(),
          offset(this.caret ? 10 : 0),
          arrow({ element: arrowElement }),
        ],
        placement: this.align as Placement,
      }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        if (arrowElement) {
          // @ts-ignore
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          const staticSide: any = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]];

          Object.assign(arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: `${-arrowElement.offsetWidth / 2}px`,
          });
        }
      });
    }
  }

  render() {
    const {
      autoAlign,
      dropShadow,
      highContrast,
      open,
      tabTip,
      _handleSlotChange: handleSlotChange,
    } = this;
    if (tabTip) {
      this.caret = tabTip ? false : true;
    }
    this.align = this.align ? this.align : tabTip ? 'bottom-left' : 'bottom';

    const classes = classMap({
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: this.caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${this.align}`]: true,
      [`${prefix}--popover--tab-tip`]: tabTip,
    });

    if (autoAlign) {
      return html`
        <span class="${classes}">
          <span class="${prefix}--popover-content">
            <slot> </slot>
            <span class="${prefix}--popover-caret"></span>
          </span>
        </span>
      `;
    } else {
      return html`
        <span class="${classes}">
          <slot @slotchange="${handleSlotChange}"></slot>
          <slot name="content"></slot>
        </span>
      `;
    }
  }

  /**
   * A selector that will return the CDSPopoverContent.
   */
  static get selectorPopoverContent() {
    return `${prefix}-popover-content`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSPopover;
