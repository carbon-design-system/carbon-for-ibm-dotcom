/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import { LitElement } from 'lit';
// import CarbonStyles from '../internal/vendor/@carbon/ibmdotcom-utilities/utilities/carbonStyles/carbonStyles.js';
import CarbonStyles from '../../../utilities/src/utilities/carbonStyles/carbonStyles.js';

export default class CarbonBase extends LitElement {
  /**
   * Defines a list of Carbon style primitives this component needs.
   *
   * @example
   * protected _requestCarbonStyles() {
   *   // Get defaults.
   *   const styles = super._requestCarbonStyles();
   *   // Add specific primitives.
   *   styles.push('buttonStyles');
   *   return styles;
   * }
   *
   * @returns {Array} An array of style primitive identifier strings.
   */
  // eslint-disable-next-line class-methods-use-this
  protected _requestCarbonStyles(): string[] {
    return ['reset', 'type', 'layout'];
  }

  /**
   * Inserts selected CarbonStyles primitive stylesheets into shadowRoot's
   * adoptedStylesheets.
   */
  private _adoptCarbonStyles(): void {
    const neededStyles = this._requestCarbonStyles();
    if (this.shadowRoot && neededStyles) {
      const adoptedStyles = CarbonStyles.global.getStyleSheets(neededStyles);
      const componentStyles = Array.from(this.shadowRoot.adoptedStyleSheets);
      const sheetsToAdopt = [
        ...adoptedStyles,
        ...componentStyles,
      ];
      debugger;
      this.shadowRoot.adoptedStyleSheets = sheetsToAdopt;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._adoptCarbonStyles();
  }
}
