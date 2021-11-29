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
 * Takes Cypress and Percy snapshots
 */
Cypress.Commands.add('takeSnapshots', (size = 'desktop', additionalPercyOptions = {}, screenshotOptions = {}) => {
  const sizes = {
    desktop: [1280],
    mobile: [320],
  };

  cy.screenshot(`${Cypress.currentTest.titlePath[0]} | ${Cypress.currentTest.titlePath[1]}`, screenshotOptions);
  cy.percySnapshot(`${Cypress.currentTest.titlePath[0]} | ${Cypress.currentTest.titlePath[1]}`, {
    ...additionalPercyOptions,
    widths: sizes[size],
  });
});

/**
 * Cycle through carbon themes and take a screenshot
 */
Cypress.Commands.add('carbonThemesScreenshot', (screenshotOpts = {}, percyOptions = {}) => {
  const themes = ['white', 'g10', 'g90', 'g100'];

  cy.wrap(themes).each(theme => {
    cy.get('html')
      .then(doc => doc.attr('storybook-carbon-theme', theme))
      .screenshot(
        `${Cypress.currentTest.titlePath[0]} | ${Cypress.currentTest.titlePath[1]} | [${theme.toUpperCase()}]`,
        screenshotOpts
      )
      .percySnapshot(
        `${Cypress.currentTest.titlePath[0]} | ${Cypress.currentTest.titlePath[1]} | [${theme.toUpperCase()}]`,
        percyOptions
      );
  });
});
