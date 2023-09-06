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
const _path = '/iframe.html?id=components-locale-modal--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('cds-locale-modal | default', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load with four regions', () => {
    cy.get('cds-region-item').should('have.length', 4);

    cy.get('cds-region-item[name="Americas"]').should('be.visible');
    cy.get('cds-region-item[name="Asia Pacific"]').should('be.visible');
    cy.get('cds-region-item[name="Europe"]').should('be.visible');
    cy.get('cds-region-item[name="Middle East and Africa"]').should('be.visible');

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-locale-modal | all four regions loaded', {
      widths: [1280],
    });
  });

  it('should load the Americas region', () => {
    cy.get('cds-region-item[name="Americas"]').click();

    cy.takeSnapshots();
  });

  it('should filter locales/languages', () => {
    cy.get('[name="Americas"]').click();

    cy.get('cds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca', {
        force: true,
      });

    cy.get('cds-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should be able to go back to the region menu', () => {
    cy.get('[name="Americas"]').click();
    cy.get('cds-regions').should('not.be.visible');
    cy.get('cds-locale-modal')
      .shadow()
      .find('cds-expressive-modal-heading cds-link-with-icon')
      .click();
    cy.get('cds-regions').should('be.visible');
  });

  it('should have a clickable X icon and is able to close menu', () => {
    const closeButton = cy
      .get('cds-locale-modal')
      .shadow()
      .find('cds-expressive-modal-close-button');
    closeButton
      .shadow()
      .find('svg path')
      .then($icon => {
        expect($icon).to.have.attr(
          'd',
          'M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z'
        );
      });
    closeButton.click();

    cy.takeSnapshots();
  });
});
