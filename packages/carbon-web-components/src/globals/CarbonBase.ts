/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import { LitElement } from 'lit';
import CarbonStyles from '../internal/vendor/@carbon/ibmdotcom-utilities/utilities/carbonStyles/carbonStyles.js';

export default class CarbonBase extends LitElement {
  carbonStyles?: String[];

  connectedCallback() {
    super.connectedCallback();

    const { shadowRoot, carbonStyles: neededStyles } = this;

    if (shadowRoot && neededStyles) {
      const globalStyles = CarbonStyles.global.getStyleSheets(neededStyles);
      const componentStyles = [...this.shadowRoot.adoptedStyleSheets];

      this.shadowRoot.adoptedStyleSheets = [
        ...globalStyles,
        ...componentStyles,
      ];
    }
  }
}
