/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import settings from 'carbon-components/es/globals/js/settings';
import Close from 'carbon-web-components/es/icons/close/16';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './filter-panel.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The input select inner dropdown.
 *
 * @element dds-input-select-item
 */
@customElement(`${ddsPrefix}-input-select-item`)
class DDSInputSelectItem extends StableSelectorMixin(LitElement) {
  /**
   * Property for the input select item value
   */
  @property()
  option: string = '';

  /**
   * sets the input select dropdown to unselected
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  render() {
    return html`
      <slot></slot>
      <div class="${prefix}--close_icon">
        ${this.selected ? Close() : null}
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}-input-select-item`;
  }

  static styles = styles;
}

export default DDSInputSelectItem;
