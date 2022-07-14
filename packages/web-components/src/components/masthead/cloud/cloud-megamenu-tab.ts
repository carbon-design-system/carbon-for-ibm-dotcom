/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings.js';
import BXTab from 'carbon-web-components/es/components/tabs/tab';
import ddsSettings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import styles from './cloud-masthead.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Cloud Megamenu Tab.
 *
 * @element dds-cloud-megamenu-tab
 */
@customElement(`${ddsPrefix}-cloud-megamenu-tab`)
class DDSCloudMegaMenuTab extends BXTab {
  render() {
    const { disabled, selected } = this;
    return html`
      <button class="${prefix}--tabs__nav-link" role="tab" ?disabled="${disabled}" aria-selected="${Boolean(selected)}">
        <slot></slot>
      </button>
    `;
  }

  static styles = styles;
}

export default DDSCloudMegaMenuTab;
