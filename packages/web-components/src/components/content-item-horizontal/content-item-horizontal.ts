/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
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

  /**
   * @returns The body content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMedia(): TemplateResult | string | void {
    return html` <slot name="media"></slot> `;
  }

  render() {
    return html`
      ${!this.thumbnail
        ? html`
            <div class="${prefix}--content-item-horizontal__heading-wrapper">
              <slot
                name="eyebrow"
                @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
            </div>
            <div class="${prefix}--content-item-horizontal__content-wrapper">
              ${this._renderBody()}${this._renderFooter()}${this._renderMedia()}
            </div>
          `
        : html`
            <div class="${prefix}--content-item-horizontal__body-wrapper">
              <div class="${prefix}--content-item-horizontal__heading-wrapper">
                <slot name="heading"></slot>
              </div>
              <div class="${prefix}--content-item-horizontal__content-wrapper">
                ${this._renderBody()}${this._renderFooter()}
              </div>
            </div>
            <div class="${prefix}--content-item-horizontal__col--2">
              <slot name="thumbnail" @slotchange="${this._handleSlotChange}">
              </slot>
            </div>
          `}
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--content-item-horizontal`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSContentItemHorizontal;
