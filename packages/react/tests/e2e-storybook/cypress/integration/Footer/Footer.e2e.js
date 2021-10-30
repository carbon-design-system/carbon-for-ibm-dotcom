/**
 * Copyright IBM Corp. 2021
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

describe('Footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get(
      `[data-autoid="dds--locale-btn"]`
    );
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get(
      `[data-autoid="dds--locale-btn"]`
    );
    localeButton.click();

    cy.get('[data-region="am"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Americas region selected', {
      widths: [1280],
    });
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(
      `[data-autoid="dds--locale-btn"]`
    );
    localeButton.click();

    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get('.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div').first().then( e => {
      expect(e.text()).to.equal('Mexico');
    });

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | Mexico locale found', {
      widths: [1280],
    });
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should('have.length', 38);
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`)
    .each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

});


