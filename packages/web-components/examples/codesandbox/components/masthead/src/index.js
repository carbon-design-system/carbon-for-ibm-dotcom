/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container.js';
import './index.scss';

/**
 * the `lit-element` package is not required in `package.json`, but is included
 * in this example for CodeSandbox compatibility
 *
 * https://github.com/codesandbox/codesandbox-client/issues/4456
 */

window.digitalData = {
  page: {
    pageInfo: {
      language: 'en-US',
      ibm: {
        country: 'US',
        siteID: 'IBMTESTWWW',
      },
    },
    isDataLayerReady: true,
  },
};
