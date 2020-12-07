/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The table mapping slot name with the private property name that indicates the existence of the slot content.
 */
const slotExistencePropertyNames = {
  eyebrow: '_hasEyebrow',
  footer: '_hasFooter',
};

/**
 * A component to present a content in a horizontal orientation.
 *
 * @element dds-content-item-horizontal
 */
@customElement(`${ddsPrefix}-content-item-horizontal`)
class DDSContentItemHorizontal extends DDSContentItem {
  /**
   * `true` if there is eyebrow content.
   */
  @internalProperty()
  protected _hasEyebrow = false;

  /**
   * Handles `slotchange` event on the footer slot.
   *
   * @param event The event.
   */
  protected _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[slotExistencePropertyNames[name] || '_hasDefaultContent'] = hasContent;
  }

  render() {
    const { _hasEyebrow: hasEyebrow } = this;
    return html`
      <div class="${prefix}--content-item-horizontal__row">
        <div class="${prefix}--content-item-horizontal__col">
          <p ?hidden="${!hasEyebrow}" class="${prefix}--content-item-horizontal__item--eyebrow">
            <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
          </p>
          <slot name="heading"></slot>
        </div>
        <div class="${prefix}--content-item-horizontal__col">
          ${this._renderBody()}${this._renderFooter()}
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal`;
  }

  static styles = styles;
}

export default DDSContentItemHorizontal;
