/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import CDSTab from '../../internal/vendor/@carbon/web-components/components/tabs/tab';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Megamenu Tab.
 *
 * @element dds-megamenu-tab
 */
@customElement(`${ddsPrefix}-megamenu-tab`)
class DDSMegaMenuTab extends CDSTab {
  render() {
    const { disabled, selected, value } = this;
    return html`
      <button
        class="${prefix}--tabs__nav-link"
        role="tab"
        ?disabled="${disabled}"
        aria-selected="${Boolean(selected)}"
        data-attribute1="headerNav"
        data-attribute2="TabHdline"
        data-attribute3="${value}">
        <slot></slot>
      </button>
    `;
  }

  static styles = styles;
}

export default DDSMegaMenuTab;
