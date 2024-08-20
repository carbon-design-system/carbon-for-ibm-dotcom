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
import styles from './content-item-row-media.scss';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * A component to present content in a row orientation with featured
 * media beneath.
 *
 * @element c4d-content-item-row-media-featured
 * @csspart row--eyebrow - The eyebrow. Usage: `c4d-contenr-item-row-media-featured::part(row--eyebrow)`
 * @csspart col--body - The body. Usage: `c4d-contenr-item-row-media-featured::part(col--body)`
 * @csspart row--media - The media. Usage: `c4d-contenr-item-row-media-featured::part(row--media)`
 */
@customElement(`${c4dPrefix}-content-item-row-media-featured`)
class C4DContentItemRowMediaFeatured extends C4DContentItem {
  render() {
    return html`
      <div class="${prefix}--content-item-row__row" part="row row--eyebrow">
        <div class="${prefix}--content-item-row__col" part="col col--eyebrow">
          <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="heading"></slot>
        </div>
        <div class="${prefix}--content-item-row__col" part="col col--body">
          ${this._renderBody()} ${this._renderFooter()}
        </div>
      </div>
      <div class="${prefix}--content-item-row__row" part="row row--media">
        <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
      </div>
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}-content-item-row-media-featured`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentItemRowMediaFeatured;
