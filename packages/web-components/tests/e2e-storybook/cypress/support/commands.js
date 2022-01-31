/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'cypress-wait-until';

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
