/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import HostListenerMixin from '@carbon/carbon-web-components/es/globals/mixins/host-listener.js';
import HostListener from '@carbon/carbon-web-components/es/globals/decorators/host-listener.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import DDSStructuredListCell from '../structured-list/structured-list-cell';
import DDSPricingTableGroup from './pricing-table-group';
import styles from './pricing-table.scss';
import DDSPricingTableCellAnnotation from './pricing-table-cell-annotation';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-cell`)
class DDSPricingTableCell extends StableSelectorMixin(
  HostListenerMixin(DDSStructuredListCell)
) {
  _parentGroup: DDSPricingTableGroup | null = this.closest(
    `${ddsPrefix}-pricing-table-group`
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
      const isAnnotation = node instanceof DDSPricingTableCellAnnotation;
      const isEmpty = node.textContent?.trim() === '';

      return !isAnnotation && !isEmpty;
    });

    if (slotContents.length === 0) {
      this.classList.toggle('no-cell-content');
    }
  }

  render() {
    return html`
      <div class="${prefix}--pricing-table-cell-inner">
        <div class="${prefix}--pricing-table-cell-content">
          ${super.render()}
        </div>
        <slot name="toggle"></slot>
      </div>
      <slot name="annotation"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-cell`;
  }

  static styles = styles;
}

export default DDSPricingTableCell;
