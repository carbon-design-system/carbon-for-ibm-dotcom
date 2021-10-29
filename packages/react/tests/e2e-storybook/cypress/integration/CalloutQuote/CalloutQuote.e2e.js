/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-callout-quote--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('CalloutQuote | default', () => {
  it('should load the g100 theme', () => {
    cy.visit(`${_path}&theme=g100`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--callout-quote"]');
    cy.wait(500);
    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('CalloutQuote | default | g100 theme', {
      widths: [1280],
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`${_path}&theme=g90`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--callout-quote"]');
    cy.wait(500);
    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('CalloutQuote | default | g90 theme', {
      widths: [1280],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`${_path}&theme=g10`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--callout-quote"]');
    cy.wait(500);
    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('CalloutQuote | default | g10 theme', {
      widths: [1280],
    });
  });
});
