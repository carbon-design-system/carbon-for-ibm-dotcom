/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import CarbonStyles from '../../../utilities/src/utilities/carbonStyles/carbonStyles.js';

export default class CarbonBase extends LitElement {
  carbonStyles = false;

  connectedCallback() {
    super.connectedCallback();
    console.log('CARBON BASE.');

    if (CarbonStyles.global && this.shadowRoot && this.carbonStyles) {
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
