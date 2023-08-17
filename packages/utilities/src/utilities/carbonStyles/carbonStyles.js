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

const importedStyleSheets = {
  buttonStyles,
  resetStyles,
  typeStyles,
};

function handleStylesRequest(e) {
  const carbon = this; // Bound from constructor.
  const component = e.target;
  const sheetsRequested = e.detail.map(
    (sheetName) => carbon.styleSheets[sheetName]
  );

  component.dispatchEvent(
    new CustomEvent('respondCarbonStyles', {
      bubbles: false,
      cancelable: false,
      composed: true,
      detail: sheetsRequested,
    })
  );
}

class CarbonStyles {
  constructor() {
    window.addEventListener(
      'requestCarbonStyles',
      handleStylesRequest.bind(this)
    );

    this.styleSheets = Object.fromEntries(
      Object.entries(importedStyleSheets).map(([name, ss]) => {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(ss.cssText);

        return [name, sheet];
      })
    );
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
