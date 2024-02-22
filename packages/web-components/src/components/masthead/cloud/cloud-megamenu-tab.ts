/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import CDSTab from '@carbon/web-components/es/components/tabs/tab.js';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss?lit';
import { carbonElement as customElement } from '../../../internal/vendor/@carbon/web-components/globals/decorators/carbon-element.js';

const { prefix, stablePrefix: c4dPrefix } = settings;

/**
 * Cloud Megamenu Tab.
 *
 * @element c4d-cloud-megamenu-tab
 */
@customElement(`${c4dPrefix}-cloud-megamenu-tab`)
class C4DCloudMegaMenuTab extends CDSTab {
  render() {
    const { disabled, selected } = this;
    return html`
      <button
        class="${prefix}--tabs__nav-link"
        role="tab"
        ?disabled="${disabled}"
        aria-selected="${Boolean(selected)}">
        <slot></slot>
      </button>
    `;
  }

  static styles = styles;
}

export default C4DCloudMegaMenuTab;
