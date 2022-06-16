/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct defaultPath for UniversalBanner
 *
 * @type {string}
 * @private
 */
const _defaultPath = '/iframe.html?id=components-universal-banner--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-universal-banner | default', () => {
  beforeEach(() => {
    cy.visit(`/${_defaultPath}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load heading and copy', () => {
    cy.get('dds-universal-banner-heading')
      .invoke('text')
      .should('not.be.empty');

    cy.get('dds-universal-banner-copy')
      .invoke('text')
      .should('not.be.empty');

    cy.takeSnapshots();
  });

  it('should load the cta button and link with icon on mobile', () => {
    cy.get('dds-universal-banner')
      .shadow()
      .find('.bx--universal-banner-icon')
      .should('not.be.visible');

    cy.get('dds-universal-banner dds-button-cta')
      .shadow()
      .find('a')
      .should($link => {
        expect($link.prop('href')).not.to.be.empty;
      });

    cy.viewport(1055, 780);

    cy.get('dds-universal-banner')
      .shadow()
      .find('.bx--universal-banner-icon')
      .should('be.visible');

    cy.get('.bx--universal-banner-layout-container').should($link => {
      expect($link.prop('href')).not.to.be.empty;
    });
  });

  xit('should load an image only in larger breakpoints', () => {
    cy.get('dds-universal-banner-image').should('be.visible');
    cy.viewport(672, 780);
    cy.get('dds-universal-banner-image').should('not.be.visible');
    cy.viewport(320, 780);
    cy.get('dds-universal-banner-image').should('not.be.visible');
  });
});
