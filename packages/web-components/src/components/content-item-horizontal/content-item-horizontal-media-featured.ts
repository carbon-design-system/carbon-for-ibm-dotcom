/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present content in a horizontal orientation with featured
 * media beneath.
 *
 * @element dds-content-item-horizontal-media-featured
 * @csspart heading-wrapper - The wrapper element around the header. Usage: `dds-content-item-horizontal-media-featured::part(heading-wrapper)`
 * @csspart row - A wrapper element around a row of content. Usage: `dds-content-item-horizontal-media-featured-media::part(row)`
 * @csspart row--text - A wrapper element around the textual elements. Usage: `dds-content-item-horizontal-media-featured-media::part(row--text)`
 * @csspart row--media - A wrapper element around the media. Usage: `dds-content-item-horizontal-media-featured-media::part(row--media)`
 * @csspart body-wrapper - The wrapper element around the body. Usage: `dds-content-item-horizontal-media-featured::part(body-wrapper)`
 */
@customElement(`${ddsPrefix}-content-item-horizontal-media-featured`)
class DDSContentItemHorizontalMediaFeatured extends DDSContentItem {
  render() {
    return html`
      <div part="row row--text" class="${prefix}--content-item-horizontal__row">
        <div
          part="heading-wrapper"
          class="${prefix}--content-item-horizontal__col">
          <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="heading"></slot>
        </div>
        <div
          part="body-wrapper"
          class="${prefix}--content-item-horizontal__col">
          ${this._renderBody()} ${this._renderFooter()}
        </div>
      </div>
      <div
        part="row row--media"
        class="${prefix}--content-item-horizontal__row">
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
