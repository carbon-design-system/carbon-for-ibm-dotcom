/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present content in a horizontal orientation with featured
 * media beneath.
 *
 * @element dds-content-item-horizontal-media-featured
 */
@customElement(`${ddsPrefix}-content-item-horizontal-media-featured`)
class DDSContentItemHorizontalMediaFeatured extends DDSContentItem {
  render() {
    return html`
      <div class="${prefix}--content-item-horizontal__row">
        <div class="${prefix}--content-item-horizontal__col">
          <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="heading"></slot>
        </div>
        <div class="${prefix}--content-item-horizontal__col">
          ${this._renderBody()} ${this._renderFooter()}
        </div>
      </div>
      <div class="${prefix}--content-item-horizontal__row">
        <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}-content-item-horizontal-media-featured`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentItemHorizontalMediaFeatured;
