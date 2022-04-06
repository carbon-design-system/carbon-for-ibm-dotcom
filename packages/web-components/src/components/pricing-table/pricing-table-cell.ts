/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import HostListenerMixin from 'carbon-web-components/es/globals/mixins/host-listener';
import HostListener from 'carbon-web-components/es/globals/decorators/host-listener';
import DDSStructuredListCell from '../structured-list/structured-list-cell';
import DDSPricingTableGroup from './pricing-table-group';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-cell`)
class DDSPricingTableCell extends HostListenerMixin(DDSStructuredListCell) {
  _parentGroup: DDSPricingTableGroup | null = this.closest(`${ddsPrefix}-pricing-table-group`);

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
    return `${ddsPrefix}--pricing-table-group`;
  }

  static styles = styles;
}

export default DDSPricingTableCell;
