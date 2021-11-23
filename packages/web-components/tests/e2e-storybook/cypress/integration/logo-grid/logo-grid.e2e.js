/**
 * Copyright IBM Corp. 2021
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
describe('dds-logo-grid | default', () => {
  beforeEach(() => {
    cy.visit(`/${_defaultPath}`);
    cy.viewport(1280, 780);
  });

  it('should have page heading with different brand logos', () => {
    cy.get('dds-logo-grid dds-content-block-heading').should('have.length', 1);
    cy.get('dds-logo-grid-item').then($els => {
      const logoItems = Array.from($els, el => el.defaultSrc);
      const equalLogos = logoItems.filter((item, i, ar) => ar.indexOf(item) != i);

      // resulting array only has duplicate images -- empty array means distinct images
      expect(equalLogos).to.be.length(0);
    });

    cy.screenshot();
    cy.percySnapshot('dds-logo-grid | default', {
      widths: [1280],
    });
  });

  it('should have clickable CTA card link with heading', () => {
    cy.visit(`/${_pathWithCTA}`);

    cy.get('dds-logo-grid-link').should('have.length', 1);
    cy.get('dds-logo-grid-link dds-card-link-heading').should('have.length', 1);

    cy.get('dds-logo-grid-link dds-card-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], 'after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        expect(insetValue).to.eq('0px');
      });

    cy.screenshot();
    cy.percySnapshot('dds-logo-grid | With CTA', {
      widths: [1280],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_defaultPath}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      cy.percySnapshot('dds-logo-grid | g10 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_defaultPath}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      cy.percySnapshot('dds-logo-grid | g90 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_defaultPath}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      cy.percySnapshot('dds-logo-grid | g100 theme', {
        widths: [1280],
      });
    });
  });
});
