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
