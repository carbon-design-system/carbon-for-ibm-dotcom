/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import getCssPropertyForRule from '../../utils/get-css-property-for-rule';

/**
 * Sets the correct path for the Card pictogram variation
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-card--pictogram';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-card | pictogram', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.viewport(1280, 780);
  });

  it('should check that pictogram is loaded and card is clickable', () => {
    cy.get('dds-card').should('have.attr', 'href');
    cy.takeSnapshots();
  });

  it('should check for pictogram at the top', () => {
    cy.get('dds-card').should('have.attr', 'pictogram-placement', 'top');
    cy.get('dds-card svg').then($content => {
      expect($content[0].getBoundingClientRect().top).to.equal(32);
      expect($content[0].getBoundingClientRect().bottom).to.equal(80);
    });
  });

  it('should have pictogram at the bottom with text showing on hover', () => {
    cy.visit(`/${_path}&knob-Pictogram%20position:_PictogramCard=bottom`);

    cy.get('dds-card').should('have.attr', 'pictogram-placement', 'bottom');
    cy.get('dds-card svg').then($content => {
      expect($content[0].getBoundingClientRect().top).to.equal(186);
      expect($content[0].getBoundingClientRect().bottom).to.equal(234);
    });

    cy.get('dds-card').then($el => {
      const sheets = $el[0].shadowRoot.adoptedStyleSheets;

      const hover = getCssPropertyForRule(
        ':host(dds-card[pictogram-placement="bottom"]:hover) .bx--card__copy',
        'display',
        sheets
      );
      expect(hover).to.not.equal('none');
    });
    cy.get('dds-card p').should('not.be.empty');
    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_path}`);
    cy.viewport(1280, 780);
    cy.carbonThemesScreenshot();
  });
});
