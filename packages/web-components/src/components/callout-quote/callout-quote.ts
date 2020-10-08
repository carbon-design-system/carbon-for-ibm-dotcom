/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-quote.scss';
import '../callout/callout';
import '../quote/quote';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Callout Data.
 *
 * @element dds-callout-data
 */
@customElement(`${ddsPrefix}-callout-quote`)
class DDSCalloutQuote extends LitElement {
  render() {
    return html`
      <dds-callout>
        <dds-quote inverse>
          <slot name="copy" slot="copy"></slot>
          <slot name="sourceHeading" slot="sourceHeading"></slot>
          <slot slot="sourceCopy" name="sourceCopy"></slot>
          <slot slot="sourceBottomCopy" name="sourceBottomCopy"></slot>
          <slot slot="cta" name="cta"></slot>
        </dds-quote>
      </dds-callout>
    `;
  }

  static styles = styles;
}

export default DDSCalloutQuote;
