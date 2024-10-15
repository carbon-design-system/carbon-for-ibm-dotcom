/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import C4DContentItem from '../content-item/content-item';
import styles from './content-item-row.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * A component to present a content in a row orientation.
 *
 * @element c4d-content-item-row
 * @csspart heading-wrapper - The heading wrapper. Usage:  `c4d-content-item-row::part(eading-wrapper)`
 * @csspart content-wrapper - The content wrapper. Usage:  `c4d-content-item-row::part(content-wrapper)`
 * @csspart body-wrapper - The body wrapper. Usage:  `c4d-content-item-row::part(body-wrapper)`
 * @csspart col - Selector for all columns. Usage:  `c4d-content-item-row::part(col)`
 */
@customElement(`${c4dPrefix}-content-item-row`)
class C4DContentItemRow extends C4DContentItem {
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
              class="${prefix}--content-item-row__heading-wrapper"
              part="heading-wrapper">
              <slot
                name="eyebrow"
                @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
            </div>
            <div
              class="${prefix}--content-item-row__content-wrapper"
              part="content-wrapper">
              ${this._renderBody()}${this._renderFooter()}${this._renderMedia()}
            </div>
          `
        : html`
            <div
              class="${prefix}--content-item-row__body-wrapper"
              part="body-wrapper">
              <div
                class="${prefix}--content-item-row__heading-wrapper"
                part="heading-wrapper">
                <slot name="heading"></slot>
              </div>
              <div
                class="${prefix}--content-item-row__content-wrapper"
                part="content-wrapper">
                ${this._renderBody()}${this._renderFooter()}
              </div>
            </div>
            <div class="${prefix}--content-item-row__col--2" part="col col--2">
              <slot name="thumbnail" @slotchange="${this._handleSlotChange}">
              </slot>
            </div>
          `}
    `;
  }

  static get stableSelector() {
    return `${c4dPrefix}--content-item-row`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default C4DContentItemRow;
