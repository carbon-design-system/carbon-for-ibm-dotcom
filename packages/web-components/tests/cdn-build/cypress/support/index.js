/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './commands';

beforeEach(() => {
  // Mock the country list
  cy.intercept(
    'https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json',
    {
      fixture: 'countrylist.json',
    }
  );

  // Mock the translation file
  cy.intercept(
    'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json',
    {
      fixture: 'translation-raw.json',
    }
  );

  // Mock the user status
  cy.intercept('https://login.ibm.com/v1/mgmt/idaas/user/status/\n', {
    fixture: 'status.json',
  });

  cy.intercept('https://prepiam.ice.ibmcloud.com/v1/mgmt/idaas/user/status/', {
    fixture: 'status.json',
  });

  // Mock search typeahead API
  cy.intercept('**/search/typeahead/v1?*', {
    fixture: 'typeahead.json',
  });
});
