/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-footer--default';

/**
 * Sets the correct path (Default language only)
 *
 * @type {string}
 * @private
 */
const _pathDefaultLanguageOnly = '/iframe.html?id=components-footer--default-language-only';

describe('dds-footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });
});

describe('dds-footer | Default language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('dds-language-selector-desktop').should('have.length', 1);

    // FIXME: Firefox is not providing the space above for this test to pass
    if (Cypress.browser.name !== 'firefox') {
      cy.get('dds-language-selector-desktop')
        .shadow()
        .find('div.bx--dropdown')
        .click();
      cy.get('dds-language-selector-desktop')
        .find('bx-combo-box-item[value="Arabic / عربية"]')
        .click();
      cy.get('dds-language-selector-desktop').should('have.value', 'Arabic / عربية');
    }

    cy.takeSnapshots();
  });
});
