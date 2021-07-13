/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present a content in a horizontal orientation.
 *
 * @element dds-content-item-horizontal
 */
@customElement(`${ddsPrefix}-content-item-horizontal`)
class DDSContentItemHorizontal extends DDSContentItem {
  /**
   * Determines whether to render the thumbnail variant
   */
  @property({ type: Boolean })
  thumbnail = false;

  render() {
    return html`
      <div class="${prefix}--content-item-horizontal__row">
        <div class="${prefix}--content-item-horizontal__col--1">
          <div class="${prefix}--content-item-horizontal__heading-wrapper">
            ${this.thumbnail
              ? ''
              : html`
                  <slot name="eyebrow" @slotchange="${this._handleSlotChange}"> </slot>
                `}
            <slot name="heading"></slot>
          </div>
          <div class="${prefix}--content-item-horizontal__content-wrapper">
            ${this._renderBody()}${this._renderFooter()}
          </div>
        </div>
        ${!this.thumbnail
          ? ''
          : html`
              <div class="${prefix}--content-item-horizontal__col--2">
                <slot name="thumbnail" @slotchange="${this._handleSlotChange}"> </slot>
              </div>
            `}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal`;
  }

  static styles = styles;
}

export default DDSContentItemHorizontal;
