/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Content Group Pictograms Default)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-content-group-pictograms--default';

describe('dds-content-group-pictograms | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`dds-pictogram-item`).then(() => {
      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-heading`)
        .should('be.visible');

      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-copy`)
        .should('be.visible');
    });

    // Take a snapshot for visual diffing
    cy.takeSnapshots();
  });

  it('should load pictogram item and content', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('svg[slot="pictogram"]').should('be.visible');

        cy.get('dds-content-item-heading').should('be.visible');

        cy.get('dds-content-item-copy').should('be.visible');

        cy.get('dds-link-with-icon').should('be.visible');
      });
    });

    cy.takeSnapshots();
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('dds-link-with-icon')
          .shadow()
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.takeSnapshots();
  });

  // it('should have customizable pictogram item', () => {
  //   // TODO d. Pictogram item can be customized (desktop, touch, pattern)
  //   // The knob need to be implemented on the storybook

  //   cy.takeSnapshots();
  // });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-content-group-pictograms | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`dds-pictogram-item`).then(() => {
      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-heading`)
        .should('be.visible');

      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-copy`)
        .should('be.visible');
    });

    // Take a snapshot for visual diffing
    cy.takeSnapshots('mobile');
  });

  it('should load pictogram item and content', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('svg[slot="pictogram"]').should('be.visible');

        cy.get('dds-content-item-heading').should('be.visible');

        cy.get('dds-content-item-copy').should('be.visible');

        cy.get('dds-link-with-icon').should('be.visible');
      });
    });

    cy.takeSnapshots('mobile');
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('dds-link-with-icon')
          .shadow()
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.takeSnapshots('mobile');
  });

  // it('should have customizable pictogram item', () => {
  //   // TODO d. Pictogram item can be customized (desktop, touch, pattern)
  //   // The knob need to be implemented on the storybook

  //   cy.takeSnapshots('mobile');
  // });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.carbonThemesScreenshot(
      {},
      {
        widths: [320],
      }
    );
  });
});
