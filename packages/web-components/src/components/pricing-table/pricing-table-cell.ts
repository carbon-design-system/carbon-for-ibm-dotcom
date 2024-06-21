/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListenerMixin from '../../internal/vendor/@carbon/web-components/globals/mixins/host-listener.js';
import HostListener from '../../internal/vendor/@carbon/web-components/globals/decorators/host-listener.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import C4DStructuredListCell from '../structured-list/structured-list-cell';
import C4DPricingTableGroup from './pricing-table-group';
import styles from './pricing-table.scss';
import C4DPricingTableCellAnnotation from './pricing-table-cell-annotation';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * @element c4d-pricing-table-cell
 *
 * @csspart inner-cell - The inner cell. Usage `c4d-pricing-table-cell::part(inner-cell)`
 * @csspart content-cell - The content cell. Usage `c4d-pricing-table-cell::part(content-cell)`
 */

@customElement(`${c4dPrefix}-pricing-table-cell`)
class C4DPricingTableCell extends StableSelectorMixin(
  HostListenerMixin(C4DStructuredListCell)
) {
  _parentGroup: C4DPricingTableGroup | null = this.closest(
    `${c4dPrefix}-pricing-table-group`
  );

  @HostListener('document:event-toggle-annotations')
  protected _handleAnnotationToggle = ({ detail }) => {
    if (detail.emitter === this.parentNode) {
      this.classList.toggle('annotation-visible');
    }
  };

  connectedCallback(): void {
    // Disable inherited tags functionality
    this.removeAttribute('tags');
    super.connectedCallback();
  }

  protected firstUpdated(): void {
    const slots = this.shadowRoot?.querySelectorAll('slot');

    // Get default slot
    let defaultSlot;
    slots?.forEach((slot) => {
      if (!slot.hasAttribute('name')) {
        defaultSlot = slot;
      }
    });

    // Filter out annotations, which should be in the "annotation" slot but
    // sometimes appear as inside the default slot. Also filter out empty
    // text nodes.
    const slotContents = (defaultSlot?.assignedNodes() || []).filter((node) => {
      const isAnnotation = node instanceof C4DPricingTableCellAnnotation;
      const isEmpty = node.textContent?.trim() === '';

      return !isAnnotation && !isEmpty;
    });

    if (slotContents.length === 0) {
      this.classList.toggle('no-cell-content');
    }
  }

  render() {
    return html`
      <div class="${prefix}--pricing-table-cell-inner" part="container">
        <div class="${prefix}--pricing-table-cell-content" part="content">
          ${super.render()}
        </div>
        <slot name="toggle"></slot>
      </div>
      <slot name="annotation"></slot>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--pricing-table-cell`;
  }

  static styles = styles;
}

export default C4DPricingTableCell;
