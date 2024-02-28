/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import C4DContentItem from '../content-item/content-item';
import styles from './content-item-row.scss?lit';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * A component to present a content in a row orientation.
 *
 * @element c4d-content-item-row
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
            <div class="${prefix}--content-item-row__heading-wrapper">
              <slot
                name="eyebrow"
                @slotchange="${this._handleSlotChange}"></slot>
              <slot name="heading"></slot>
            </div>
            <div class="${prefix}--content-item-row__content-wrapper">
              ${this._renderBody()}${this._renderFooter()}${this._renderMedia()}
            </div>
          `
        : html`
            <div class="${prefix}--content-item-row__body-wrapper">
              <div class="${prefix}--content-item-row__heading-wrapper">
                <slot name="heading"></slot>
              </div>
              <div class="${prefix}--content-item-row__content-wrapper">
                ${this._renderBody()}${this._renderFooter()}
              </div>
            </div>
            <div class="${prefix}--content-item-row__col--2">
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
