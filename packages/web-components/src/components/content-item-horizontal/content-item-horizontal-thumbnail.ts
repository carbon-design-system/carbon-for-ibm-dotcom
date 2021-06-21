/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-thumbnail.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present content in a horizontal orientation with thumbnail.
 *
 * @element dds-content-item-horizontal-thumbnail
 */
@customElement(`${ddsPrefix}-content-item-horizontal-thumbnail`)
class DDSContentItemHorizontalThumbnail extends DDSContentItem {
  render() {
    return html`
      <div class="${prefix}--content-item-horizontal-thumbnail__row">
        <div class="${prefix}--content-item-horizontal-thumbnail__col ${prefix}--content-item-horizontal-thumbnail__col--1">
          <slot name="heading"></slot>
          <div class="${prefix}--content-item-horizontal-thumbnail__content-wrapper">
            ${this._renderBody()}${this._renderFooter()}
          </div>
        </div>
        <div class="${prefix}--content-item-horizontal-thumbnail__col ${prefix}--content-item-horizontal-thumbnail__col--2">
          <div class="${prefix}--content-item-horizontal-thumbnail__thumbnail-wrapper">
            <slot name="thumbnail" @slotchange="${this._handleSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal-thumbnail`;
  }

  static styles = styles;
}

export default DDSContentItemHorizontalThumbnail;
