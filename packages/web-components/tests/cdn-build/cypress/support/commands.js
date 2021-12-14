/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'cypress-wait-until';

/**
 * Mocks the Masthead/Footer data
 */
Cypress.Commands.add('mockMastheadFooterData', () => {
  cy.intercept('https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json', {
    fixture: 'countrylist.json',
  });
  cy.intercept('https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json', {
    fixture: 'translation.json',
  });
  cy.intercept('https://login.ibm.com/v1/mgmt/idaas/user/status/', { fixture: 'status.json' });
  cy.intercept('https://www-api.ibm.com/search/typeahead/v1?*', {
    fixture: 'typeahead.json',
  });
});

/**
 * Mocks the Kaltura API
 */
Cypress.Commands.add('mockKaltura', () => {
  cy.intercept('https://cdnapisec.kaltura.com/api_v3/index.php?*', {
    fixture: 'kaltura.json',
  });
});
