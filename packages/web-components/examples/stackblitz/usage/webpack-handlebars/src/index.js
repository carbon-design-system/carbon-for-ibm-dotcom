/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container.js';
import '@carbon/ibmdotcom-web-components/es/components/footer/footer-container.js';
import './index.scss';

document.addEventListener('click', event => {
  if (event.target.matches('cds-locale-button')) {
    document.querySelector('cds-locale-modal').open = true;
  }
});
