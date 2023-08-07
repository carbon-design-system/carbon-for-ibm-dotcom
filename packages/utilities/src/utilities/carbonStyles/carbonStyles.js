/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import root from 'window-or-global';

const plex =
  'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/plex.css';
const grid =
  'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/grid.css';
const theme =
  'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/tag/v1/latest/themes.css';

class CarbonStyles {
  constructor() {
    window.addEventListener('requestCarbonStyles', (e) => {
      const component = e.target;
      console.log('styles requested ', e.detail);
    });
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
