/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import countrylist from './data/countrylist.json';
import translation from './data/translation.json';

/**
 * Sets the translation data in sessionStorage
 */
Cypress.Commands.add('setTranslations', () => {
  window.sessionStorage.setItem('dds-countrylist-us-en', countrylist);
  window.sessionStorage.setItem('dds-translation-us-en', translation);
});
