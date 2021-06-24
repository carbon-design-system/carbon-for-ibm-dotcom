/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-data.scss';
import { DDS_CALLOUT_DATA } from '../../globals/internal/feature-flags';
import StableSelectorMixin from '../../globals/mixins/stable-selector';

const { prefix } = settings;
const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 * @slot heading - The heading (data) content.
 * @slot copy - The copy content.
 * @slot source - The source content.
 */
class DDSCalloutData extends StableSelectorMixin(LitElement) {
  render() {
    return html`
      <div class="${prefix}--callout__container">
        <div class="${prefix}--callout__column">
          <div class="${prefix}--callout__content">
            <slot name="heading"></slot>
            <slot name="copy"></slot>
          </div>
        </div>
      </div>
      <slot name="source"></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--callout-data`;
  }

  static styles = styles;
}

// Define the new element
if (DDS_CALLOUT_DATA) {
  customElements.define(`${ddsPrefix}-callout-data`, DDSCalloutData);
}

export default !DDS_CALLOUT_DATA ? undefined : DDSCalloutData;
