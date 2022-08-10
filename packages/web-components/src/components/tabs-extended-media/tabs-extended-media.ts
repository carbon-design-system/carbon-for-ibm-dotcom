/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings.js';
import { customElement, html } from 'lit-element';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import DDSTabsExtended from '../tabs-extended/tabs-extended';
import styles from './tabs-extended-media.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * A component to present media content inside a tabbed layout.
 *
 * @element dds-tabs-extended-media
 */
@customElement(`${ddsPrefix}-tabs-extended-media`)
class DDSTabsExtendedMedia extends DDSTabsExtended {
  render() {
    return html`
      <div class="${prefix}--tabs-extended-media">
        <div class="${prefix}--heading">
          <slot name="heading"></slot>
        </div>
        <div class="${prefix}--tabs-extended">
          ${this._renderAccordion()} ${this._renderTabs()}
          <div class="${prefix}--tab-content">
            <slot @slotchange="${this._handleSlotChange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--tabs-extended-media`;
  }

  static styles = styles;
}

/* @__GENERATE_REACT_CUSTOM_ELEMENT_TYPE__ */
export default DDSTabsExtendedMedia;
