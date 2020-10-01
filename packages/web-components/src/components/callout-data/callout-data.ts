/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
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
      <div class="${prefix}--callout__container">
        <div class="${prefix}--callout__column">
          <div class="${prefix}--callout__content">
            <h4 class="${prefix}--callout-data__data"><slot name="data" /></h4>
            <p class="${prefix}--callout-data__copy"><slot name="copy" /></p>
          </div>
        </div>
      </div>
      <p class="${prefix}--callout-data__source"><slot name="source" /></p>
    `;
  }

  static styles = styles;
}

export default DDSCalloutData;
