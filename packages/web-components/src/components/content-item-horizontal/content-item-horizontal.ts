/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, TemplateResult } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSContentItem from '../content-item/content-item';
import styles from './content-item-horizontal.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present a content in a horizontal orientation.
 *
 * @element dds-content-item-horizontal
 * @csspart heading-wrapper - The wrapper element around the header. Usage: `dds-content-item-horizontal::part(heading-wrapper)`
 * @csspart content-wrapper - The wrapper element around the content. Usage: `dds-content-item-horizontal::part(content-wrapper)`
 * @csspart body-wrapper - The wrapper element around the body. Usage: `dds-content-item-horizontal::part(body-wrapper)`
 * @csspart footer-wrapper - The wrapper element around the footer. Usage: `dds-content-item-horizontal::part(footer-wrapper)`
 * @csspart thumbnail-wrapper - The wrapper element around the thumbnail. Usage: `dds-content-item-horizontal::part(thumbnail-wrapper)`
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
            <div
              part="heading-wrapper"
              class="${prefix}--content-item-horizontal__heading-wrapper">
              <slot
                name="eyebrow"
                @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
            </div>
            <div
              part="content-wrapper"
              class="${prefix}--content-item-horizontal__content-wrapper">
              ${this._renderBody()}${this._renderFooter()}${this._renderMedia()}
            </div>
          `
        : html`
            <div
              part="body-wrapper"
              class="${prefix}--content-item-horizontal__body-wrapper">
              <div
                part="heading-wrapper"
                class="${prefix}--content-item-horizontal__heading-wrapper">
                <slot name="heading"></slot>
              </div>
              <div
                part="content-wrapper"
                class="${prefix}--content-item-horizontal__content-wrapper">
                ${this._renderBody()}${this._renderFooter()}
              </div>
            </div>
            <div
              part="thumbnail-wrapper"
              class="${prefix}--content-item-horizontal__col--2">
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
