/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct defaultPath for LogoGrid
 *
 * @type {string}
 * @private
 */
const _defaultPath = '/iframe.html?id=components-logo-grid--default';

/**
 * Sets the logo grid defaultPath for LogoGrid with a CTA
 *
 * @type {string}
 * @private
 */
const _pathWithCTA =
  '/iframe.html?id=components-logo-grid--default&knob-Heading%20(heading)_LogoGrid=Our%20customers&knob-Display%20CTA:_LogoGrid=true&knob-CTA%20Copy%20(ctaCopy)_LogoGrid=Lorem%20ipsum%20dolor%20sit%20amet&knob-CTA%20Href%20(ctaHref):_LogoGrid=http://local.url.com/';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('LogoGrid | default', () => {
  beforeEach(() => {
    cy.visit(`/${_defaultPath}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have page heading with different brand logos', () => {
    cy.get('[data-autoid="dds--content-block__heading"]').should(
      'have.length',
      1
    );
    cy.get('.bx--logo-grid__col .bx--image__img').then($els => {
      const logoItems = Array.from($els, el => el.src);
      const equalLogos = logoItems.filter(
        (item, i, ar) => ar.indexOf(item) != i
      );

      // resulting array only has duplicate values -- empty array means distinct images
      expect(equalLogos).to.be.length(0);
    });

    cy.takeSnapshots();
  });

  it('should have clickable CTA card link with heading', () => {
    cy.visit(`/${_pathWithCTA}`);

    cy.get('.bx--logo-grid .bx--card').should('have.length', 1);
    cy.get('.bx--logo-grid .bx--card__heading').should('have.length', 1);

    cy.get('.bx--logo-grid a.bx--link').then($els => {
      const win = $els[0].ownerDocument.defaultView;
      const after = win.getComputedStyle($els[0], 'after');
      const positionValue = after.getPropertyValue('position');
      const insetValue = after.getPropertyValue('inset');

      if (Cypress.browser.name === 'firefox') {
        expect(positionValue).to.eq('static');
      } else {
        expect(positionValue).to.eq('absolute');
        expect(insetValue).to.eq('0px');
      }
    });

    cy.takeSnapshots();
  });

  it('should render correctly in all themes', () => {
    cy.visit(`/${_defaultPath}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});
