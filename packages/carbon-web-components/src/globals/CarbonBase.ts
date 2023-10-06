/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import { LitElement } from 'lit';
import carbonStyles from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/carbonStyles/carbonStyles.js';

export default class CarbonBase extends LitElement {
  carbonStyles;

  connectedCallback() {
    super.connectedCallback();

    if (CarbonStyles.global && this.shadowRoot && this.carbonStyles) {
      // Prepare to receive stylesheets
      this.addEventListener('respondCarbonStyles', (e) => {
        const thisSheets = [...this.shadowRoot.adoptedStyleSheets];
        const globalSheets = e.detail;

        this.shadowRoot.adoptedStyleSheets = [...globalSheets, ...thisSheets];
      });

      // Request stylesheets
      this.dispatchEvent(
        new CustomEvent('requestCarbonStyles', {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: this.carbonStyles,
        })
      );
    }
  }
}
