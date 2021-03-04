/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, internalProperty, property } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal-media.scss';

import { MEDIA_ALIGN } from './defs';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present a content in a horizontal orientation.
 *
 * @element dds-content-item-horizontal-media
 */
@customElement(`${ddsPrefix}-content-item-horizontal-media`)
class DDSContentItemHorizontalMedia extends DDSContentItem {
  /**
   * Defines the alignment of the media: `left` or `right`
   */
  @property({ reflect: true })
  align = MEDIA_ALIGN.LEFT;

  render() {
    return this.align == MEDIA_ALIGN.RIGHT
      ? html`
          <div class="${prefix}--content-item-horizontal__row ${prefix}--content-item-horizontal-media__align-${this.align}">
            <div class="${prefix}--content-item-horizontal__col">
              <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
              ${this._renderBody()}${this._renderFooter()}
            </div>
            <div class="${prefix}--content-item-horizontal__col">
              <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
            </div>
          </div>
        `
      : html`
          <div class="${prefix}--content-item-horizontal__row">
            <div class="${prefix}--content-item-horizontal__col">
              <slot name="media" @slotchange="${this._handleSlotChange}"></slot>
            </div>
            <div class="${prefix}--content-item-horizontal__col">
              <slot name="eyebrow" @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
              ${this._renderBody()}${this._renderFooter()}
            </div>
          </div>
        `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal-media`;
  }

  static styles = styles;
}

export default DDSContentItemHorizontalMedia;
