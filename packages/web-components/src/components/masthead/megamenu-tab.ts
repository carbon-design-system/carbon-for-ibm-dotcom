/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import CDSTab from '@carbon/web-components/es/components/tabs/tab.js';
import c4dSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './masthead.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: c4dPrefix } = c4dSettings;

/**
 * Megamenu Tab.
 *
 * @element c4d-megamenu-tab
 * @csspart nav-link - The text input. Usage: `c4d-megamenu-tab::part(nav-link)`
 */
@customElement(`${c4dPrefix}-megamenu-tab`)
class C4DMegaMenuTab extends CDSTab {
  /**
   * Disable unneeded properties inherited from CDS Content Switcher Item.
   */
  closeOnActivation = false;
  hideDivider = false;

  render() {
    const { disabled, selected, value } = this;

    // Safari does not set focus on clicked buttons, which causes megamenu to
    // close prematurely. Setting a tabindex circumvents the issue.
    const safariTabIndex = 0;

    return html`
      <button
        part="nav-link"
        class="${prefix}--tabs__nav-link"
        role="tab"
        ?disabled="${disabled}"
        aria-selected="${Boolean(selected)}"
        data-attribute1="headerNav"
        data-attribute2="TabHdline"
        data-attribute3="${value}"
        tabindex="${safariTabIndex}">
        <slot></slot>
      </button>
    `;
  }

  static styles = styles;
}

export default C4DMegaMenuTab;
