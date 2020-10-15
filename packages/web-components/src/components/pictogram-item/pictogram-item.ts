/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, LitElement, property } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './pictogram-item.scss';
import '../content-item/content-item';
import '../content-item/content-item-heading';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Pictogram item.
 *
 * @element dds-pictogram-item
 * @slot heading - The heading content.
 * @slot cta - The footer (CTA) content.
 */
@customElement(`${ddsPrefix}-pictogram-item`)
class DDSPictogramItem extends LitElement {
  /**
   * Internal Property for get copy from slot
   */
  @property({ reflect: true })
  copy = '';

  render() {
    return html`
      <div class="${prefix}--pictogram-item__row">
        <div class="${prefix}--pictogram-item__wrapper">
          <slot class="${prefix}--pictogram-item__pictogram" name="pictogram"></slot>
        </div>
        <div class="${prefix}--pictogram-item__content">
          <dds-content-item copy="${this.copy}">
            <dds-content-item-heading>
              <slot name="heading"></slot>
            </dds-content-item-heading>
            <slot name="cta" slot="cta"></slot>
          </dds-content-item>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default DDSPictogramItem;
