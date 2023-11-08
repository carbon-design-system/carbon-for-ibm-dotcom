/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import root from 'window-or-global';
import buttonStyles from '@carbon/ibmdotcom-styles/scss/globals/primitives/button.scss';
import resetStyles from '@carbon/ibmdotcom-styles/scss/globals/primitives/reset.scss';
import typeStyles from '@carbon/ibmdotcom-styles/scss/globals/primitives/type.scss';

// CSS text strings
const importedStyleSheets = {
  button: buttonStyles,
  reset: resetStyles,
  type: typeStyles,
};

class CarbonStyles {
  /**
   * Convert stylerule text into new stylesheets and deliver stylesheets when requested.
   */
  constructor() {
    // Get all global/primitive stylerule sets.
    const styleRules = Object.entries(importedStyleSheets);

    // Create a new CSSStyleSheet for each set.
    const sheets = styleRules.map(([name, ss]) => {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(ss.cssText);
      return [name, sheet];
    });

    // Store all new stylesheets.
    this.styleSheets = Object.fromEntries(sheets);
  }

  /**
   * Given a set of stylesheet names, return the matching stylesheets.
   *
   * @param {String[]} requestedStyleSheets The names of requested stylesheets.
   * @returns {CSSStyleSheet[]} The requested stylesheets.
   */
  getStyleSheets(requestedStyleSheets) {
    return requestedStyleSheets.map((sheet) => this.styleSheets[sheet]);
  }

  /**
   * Create (if needed) and return the globally-scoped instance of `this`.
   */
  static get global() {
    if (!Object.prototype.hasOwnProperty.call(root, 'carbonStyles')) {
      root.carbonStyles = new CarbonStyles();
    }
    return root.carbonStyles;
  }
}

export default CarbonStyles;
