/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-container';
import links from './links';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  if (!process.env.CORS_PROXY) {
    document.getElementById('masthead-container').navLinks = links;
  }
});
