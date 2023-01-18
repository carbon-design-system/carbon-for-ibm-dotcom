/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Pictogram item)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-pictogram-item--default';

describe('dds-pictogram-item | Pictogram item (desktop)', () => {
  it('should check a11y', () => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
    cy.get('[data-autoid="dds--pictogram-item"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--pictogram-item__pictogram"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--content-item__heading"]').should('have.length', 1);

    cy.takeSnapshots();
  });

  it('should check that the Link with icon is loaded and clickable', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
    const linkWithIcon = cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--link-with-icon"]');
    linkWithIcon.should('have.length', 1);
    linkWithIcon
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support customizable pictogram SVGs', () => {
    cy.visit(`/${_pathDefault}&knob-Pictogram%20(required)=Touch`);
    cy.viewport(1280, 780);

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
    cy.carbonThemesScreenshot();
  });
});

describe('dds-pictogram-item | Pictogram item (mobile)', () => {
  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
    cy.get('[data-autoid="dds--pictogram-item"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--pictogram-item__pictogram"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--content-item__heading"]').should('have.length', 1);

    cy.takeSnapshots('mobile');
  });

  it('should check that the Link with icon is loaded and clickable', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
    const linkWithIcon = cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--link-with-icon"]');
    linkWithIcon.should('have.length', 1);
    linkWithIcon
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support customizable pictogram SVGs', () => {
    cy.visit(`/${_pathDefault}&knob-Pictogram%20(required)=Touch`);
    cy.viewport(320, 780);

    cy.takeSnapshots('mobile');
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.carbonThemesScreenshot(
      {},
      {
        width: [320],
      }
    );
  });
});
