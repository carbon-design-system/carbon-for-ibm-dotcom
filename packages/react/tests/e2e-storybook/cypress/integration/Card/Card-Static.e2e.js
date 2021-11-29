/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Defines the component variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-card--card-static';

/**
 * Defines the base card component selector.
 *
 * @type {string}
 * @private
 */
const _selectorBase = `[data-autoid="dds--card"]`;

/**
 * Defines the card element selectors.
 *
 * @type {Object.<string>}
 * @private
 */
const _selectors = {
  eyebrow: `${_selectorBase} .bx--card__eyebrow`,
  heading: `${_selectorBase} .bx--card__heading`,
  footer: `${_selectorBase} .bx--card__footer`,
  image: `${_selectorBase} .bx--image img`,
  copy: `${_selectorBase} .bx--card__copy`,
};

/**
 * Defines viewport dimensions to be used in tests.
 *
 * @type {number[]}
 * @private
 */
const _viewportDimensions = [1280, 780];

describe('Card | Static', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(_path);
  });

  it('should render eyebrow content', () => {
    cy.get(_selectors.eyebrow).should('not.be.empty');
  });

  it('should render heading content', () => {
    cy.get(_selectors.heading).should('not.be.empty');
  });

  it('should render footer content', () => {
    cy.get(_selectors.footer).should('not.be.empty');
  });

  it('should render copy', () => {
    cy.get(_selectors.copy).should('not.be.empty');
  });

  it('should not respond to a click ', () => {
    let initialLocation;
    cy.location('href')
      .then(location => {
        initialLocation = location;
      })
      .get(_selectorBase)
      .click()
      .location('href')
      .then(location => {
        expect(location).to.equal(initialLocation);
      });
  });

  it('should render correctly in all themes', () => {
    cy.carbonThemesScreenshot();
  });
});

describe('Card | Static with outline', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(`${_path}&knob-Outlined%20card_Card=true`);
  });

  it('should render with a border', () => {
    cy.get(_selectorBase).should('have.class', `bx--card--border`);
    cy.get(_selectorBase).should('have.css', 'border');
  });
});

describe('Card | Static with image', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(`${_path}&knob-Add%20image:_Card=true`);
  });

  it('should render an image', () => {
    cy.get(_selectors.image).should('have.length', 1);
    cy.takeSnapshots();
  });
});
