/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, state, TemplateResult } from 'lit-element';
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
   * `true` if there is a pictogram.
   */
  @state()
  protected _hasMedia = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotMediaChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this._hasMedia = hasContent;
  }

  /**
   * @returns The body content.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _renderMedia(): TemplateResult | string | void {
    return html`
      <slot name="media" @slotchange="${this._handleSlotMediaChange}"></slot>
    `;
  }

  render() {
    return html`
      <div class="${prefix}--content-item-horizontal__heading-wrapper">
        ${this.thumbnail
          ? ''
          : html`
              <slot name="eyebrow" @slotchange="${this._handleSlotChange}"> </slot>
            `}
        <slot name="heading"></slot>
      </div>
      <div class="${prefix}--content-item-horizontal__content-wrapper${this._hasMedia ? '_with-media' : ''}">
        ${this._renderBody()}${this._renderFooter()}${!this.thumbnail ? this._renderMedia() : ``}
      </div>
      ${!this.thumbnail
        ? ''
        : html`
            <div class="${prefix}--content-item-horizontal__col--2">
              <slot name="thumbnail" @slotchange="${this._handleSlotChange}"> </slot>
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
