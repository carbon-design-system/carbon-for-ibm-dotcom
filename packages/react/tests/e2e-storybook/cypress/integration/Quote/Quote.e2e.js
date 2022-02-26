/**
 * Copyright IBM Corp. 2021, 2022
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
const _path = '/iframe.html?id=components-quote--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('Quote | default', () => {
  beforeEach(() => {
    cy.visit(`${_path}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load correctly in all themes', () => {
    cy.waitUntil(() =>
      cy
        .get('[data-autoid="dds--quote"] .bx--quote__copy')
        .then($copy => $copy.text().trim() !== '')
    );

    cy.carbonThemesScreenshot();
  });
});
