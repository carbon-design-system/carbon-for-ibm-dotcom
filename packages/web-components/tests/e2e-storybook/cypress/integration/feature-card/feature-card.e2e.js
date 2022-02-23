/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path for the medium variation
 *
 * @type {string}
 * @private
 */
const _pathMedium = '/iframe.html?id=components-feature-card--medium';

/**
 * Sets the correct path for the large variation
 *
 * @type {string}
 * @private
 */
const _pathLarge = '/iframe.html?id=components-feature-card--large';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-feature-card | medium', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMedium}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });

  it('should have image on the left and content on the right side of the card', () => {
    // image takes the left half
    cy.get('dds-image').then($image => {
      expect($image[0].getBoundingClientRect().left).to.equal(32);
      expect($image[0].getBoundingClientRect().right).to.equal(328);
    });

    // content takes the right half
    cy.get('dds-feature-card')
      .shadow()
      .find('.bx--card__wrapper')
      .then($content => {
        expect($content[0].getBoundingClientRect().left).to.equal(328);
        expect($content[0].getBoundingClientRect().right).to.equal(624);
      });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathMedium}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-feature-card | medium (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMedium}`);
    cy.viewport(320, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
    cy.screenshot();
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });
});

describe('dds-feature-card | large', () => {
  beforeEach(() => {
    cy.visit(`/${_pathLarge}`);
    cy.injectAxe();
    cy.viewport(1400, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
    cy.screenshot();
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });

  it('should have eyebrow, heading, and copy content', () => {
    cy.get('dds-card-eyebrow')
      .invoke('text')
      .should('not.be.empty');
    cy.get('dds-card-heading')
      .invoke('text')
      .should('not.be.empty');
    cy.get('dds-feature-card > p')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should have image on the left and content on the right half of the card', () => {
    // image takes the left half
    cy.get('dds-image').then($image => {
      expect($image[0].getBoundingClientRect().left).to.equal(16);
      expect($image[0].getBoundingClientRect().right).to.equal(529);
    });

    // content takes the right half
    cy.get('dds-feature-card')
      .shadow()
      .find('.bx--card__wrapper')
      .then($content => {
        expect($content[0].getBoundingClientRect().left).to.equal(529);
        expect($content[0].getBoundingClientRect().right).to.equal(1042);
      });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathLarge}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-feature-card | large (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathLarge}`);
    cy.viewport(320, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });
});
