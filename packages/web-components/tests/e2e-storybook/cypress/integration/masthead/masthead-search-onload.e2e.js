/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead search open onload)
 *
 * @type {string}
 * @private
 */
const _pathSearchOpenOnload = '/iframe.html?id=components-masthead--search-open-onload';

describe('dds-masthead | search open onload (desktop)', () => {
  beforeEach(() => {
    // TODO: fix the uncaught exception in Firefox only
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Request aborted')) {
        return false;
      }
    });

    cy.visit(`/${_pathSearchOpenOnload}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should load search field open by default', () => {
    cy.get('dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .should('be.visible');

    cy.takeSnapshots();
  });

  it('should display 10 auto suggest results', () => {
    cy.get('dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('test')
      .get('dds-search-with-typeahead-item')
      .should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should not display menu options while search field is open', () => {
    cy.get('dds-top-nav').should('have.attr', 'hidenav');
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });
});
