/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './pricing-table.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

@customElement(`${ddsPrefix}-pricing-table-header-cell-description`)
class DDSPricingTableHeaderCellDescription extends StableSelectorMixin(LitElement) {
  /**
   * Pricing table cell body container.
   */
  @property()
  bodyContainer;

  /**
   * Watches for changes to components childlist and clones nodes to shadow dom.
   */
  private _mutationObserver = new MutationObserver(this._handleMutation.bind(this));

  /**
   * MutationObserver callback.
   */
  protected _handleMutation() {
    if (!this.bodyContainer) {
      this.bodyContainer = this.shadowRoot?.querySelector(`.${prefix}--pricing-table-header-cell-description-body`);
    }

    const { childNodes } = this;

    // Remove all children in body on each update.
    while (this.bodyContainer?.firstChild) {
      this.bodyContainer.removeChild(this.bodyContainer.firstChild);
    }

    // Append a deeply-cloned node to keep nodes synced in light/shadow dom.
    childNodes.forEach(e => {
      this.bodyContainer?.append(e.cloneNode(true));
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._mutationObserver.observe(this, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
  }

  firstUpdated() {
    this._handleMutation();
  }

  render() {
    return html`
      <div class="${prefix}--pricing-table-header-cell-description-body"></div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--pricing-table-header-cell-description`;
  }

  static styles = styles;
}

export default DDSPricingTableHeaderCellDescription;
