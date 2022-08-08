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

/**
 * Check a11y
 *
 * @param {string} context optional to specify component context (ex. 'dds-content-item)
 * @param {Array} additionalRules optional to remove unnecessary rules by there id to pass a11y test (ex. ['list', 'region'])
 */
Cypress.Commands.add('checkAxeA11y', (context, additionalRules) => {
  function terminalLog(violations) {
    cy.task(
      'log',
      `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
        violations.length === 1 ? 'was' : 'were'
      } detected`
    );
    // pluck specific keys to keep the table readable
    const violationData = violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: `${nodes.length}: ${nodes.map(({ target }) => target).toString()}`,
    }));

    cy.task('table', violationData);
  }

  // skipping page a11y issues because we are only interested at the component level
  let rules = {
    region: { enabled: false },
    'page-has-heading-one': { enabled: false },
    'landmark-one-main': { enabled: false },
  };

  if (additionalRules) {
    additionalRules.forEach(rule => (rules[rule] = { enabled: false }));
  }

  cy.checkA11y(
    context || null,
    {
      rules: rules,
      includedImpacts: ['critical, serious'],
    },
    terminalLog
  );
});
