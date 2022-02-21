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

describe('LocaleModal | default', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load with four regions', () => {
    cy.get('[data-region]').should('have.length', 4);

    cy.get('[data-region="am"]').should('be.visible');
    cy.get('[data-region="ap"]').should('be.visible');
    cy.get('[data-region="eu"]').should('be.visible');
    cy.get('[data-region="mea"]').should('be.visible');

    cy.takeSnapshots();
  });

  it('should load the Americas region', () => {
    cy.get('[data-region="am"]').click();
    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should filter locales/languages', () => {
    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get(
      '.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div'
    )
      .first()
      .then(e => {
        expect(e.text()).to.equal('Mexico');
      });

    cy.takeSnapshots();
  });

  it('should be able to go back to the region menu', () => {
    cy.get('[data-region="am"]').click();
    cy.get('.bx--locale-modal__regions').should('not.be.visible');
    cy.get('.bx--modal-container .bx--link-with-icon').click();
    cy.get('.bx--locale-modal__regions').should('be.visible');
  });

  it('should have a clickable X icon and is able to close menu', () => {
    const closeButton = cy.get('.bx--modal-close');
    closeButton.find('svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z'
      );
    });
    closeButton.click();

    cy.takeSnapshots();
  });
});
