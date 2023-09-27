/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container.js';
import '@carbon/ibmdotcom-web-components/es/components/footer/footer-container.js';
import './index.scss';

// The minimum prerequisite to use our service for translation data, etc.
window.digitalData = {
  page: {
    pageInfo: {
      language: 'en-US',
      ibm: {
        siteID: 'IBMTESTWWW',
      },
    },
    isDataLayerReady: true,
  },
};
