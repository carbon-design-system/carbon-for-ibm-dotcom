/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import './callout-data-container';
import styles from './callout-data.scss';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-data`)
class DDSCalloutData extends LitElement {
  render() {
    return html`
      <dds-callout-data-container class="test">
        <h4 class="${prefix}--callout-data__data"><slot name="data" /></h4>
        <p class="${prefix}--callout-data__copy"><slot name="copy" /></p>
      </dds-callout-data-container>
      <p class="${prefix}--callout-data__source"><slot name="source" /></p>
    `;
  }

  static styles = styles;
}

export default DDSCalloutData;
