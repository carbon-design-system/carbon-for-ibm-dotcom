/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@percy/cypress';
import 'cypress-axe';
import './commands';

beforeEach(() => {
  // Mock the country list
  cy.intercept('https://1.www.s81c.com/common/js/dynamicnav/www/countrylist/jsononly/usen-utf8.json', {
    fixture: 'countrylist.json',
  });

  // Mock the translation file
  cy.intercept('https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/usen.json', {
    fixture: 'translation-raw.json',
  });

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

  // Block ibm-common.js
  cy.intercept('https://1.www.s81c.com/common/stats/ibm-common.js', { fixture: 'ibm-common.js' });

  // Mock Kaltura API
  // cy.intercept('https://cdnapisec.kaltura.com/api_v3/index.php?*', {
  //   fixture: 'kaltura.json',
  // });

  // Set an initial `digitalData` object
  cy.window().then(win => {
    win.digitalData = {
      page: {
        category: {
          primaryCategory: '',
        },
        pageInfo: {
          effectiveDate: '',
          expiryDate: '',
          language: 'en-US',
          publishDate: '',
          publisher: '',
          version: 'Carbon for IBM.com',
          ibm: {
            contentDelivery: '',
            contentProducer: '',
            country: 'US',
            industry: '',
            owner: '',
            siteID: '',
            subject: '',
            type: '',
          },
        },
        isDataLayerReady: true,
      },
    };
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // we expect a 3rd party library error with message 'list not defined'
  // and don't want to fail the test so we return false
  if (err.message.includes('Timeout polling for digital data object')) {
    return false;
  }
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
});
