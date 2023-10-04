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
const _defaultPath = '/iframe.html?id=components-global-banner--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('c4d-global-banner | default', () => {
  beforeEach(() => {
    cy.visit(`/${_defaultPath}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load heading and copy', () => {
    cy.get('c4d-global-banner-heading')
      .invoke('text')
      .should('not.be.empty');

    cy.get('c4d-global-banner-copy')
      .invoke('text')
      .should('not.be.empty');

    cy.takeSnapshots();
  });

  it('should load the cta button and link with icon on mobile', () => {
    cy.get('c4d-global-banner')
      .shadow()
      .find('.cds--global-banner-icon')
      .should('not.be.visible');

    cy.get('c4d-global-banner c4d-button')
      .shadow()
      .find('a')
      .should($link => {
        expect($link.prop('href')).not.to.be.empty;
      });

    cy.viewport(1055, 780);

    cy.get('c4d-global-banner')
      .shadow()
      .find('.cds--global-banner-icon')
      .should('be.visible');

    cy.get('.cds--global-banner-layout-container').should($link => {
      expect($link.prop('href')).not.to.be.empty;
    });
  });

  xit('should load an image only in larger breakpoints', () => {
    cy.get('c4d-global-banner-image').should('be.visible');
    cy.viewport(672, 780);
    cy.get('c4d-global-banner-image').should('not.be.visible');
    cy.viewport(320, 780);
    cy.get('c4d-global-banner-image').should('not.be.visible');
  });
});
