/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * A component to present content in a horizontal orientation with featured
 * media beneath.
 *
 * @element c4d-content-item-horizontal-media-featured
 */
@customElement(`${c4dPrefix}-content-item-horizontal-media-featured`)
class C4DContentItemHorizontalMediaFeatured extends C4DContentItem {
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
    return `${c4dPrefix}-content-item-horizontal-media-featured`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentItemHorizontalMediaFeatured;
