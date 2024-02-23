/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import settings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import CDSTab from '../../internal/vendor/@carbon/web-components/components/tabs/tab';
import c4dSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './masthead.scss';
import { carbonElement as customElement } from '../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix } = settings;
const { stablePrefix: c4dPrefix } = c4dSettings;

/**
 * Megamenu Tab.
 *
 * @element c4d-megamenu-tab
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

export default C4DMegaMenuTab;
