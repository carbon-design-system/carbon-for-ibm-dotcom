/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Tall)
 *
 * @type {string}
 * @private
 */
const _pathTall = '/iframe.html?id=components-lead-space--tall';

/**
 * Sets the correct path (Tall with image)
 *
 * @type {string}
 * @private
 */
const _pathTallImage = '/iframe.html?id=components-lead-space--tall-with-image';

/**
 * Sets the correct path (Centered)
 *
 * @type {string}
 * @private
 */
const _pathCentered = '/iframe.html?id=components-lead-space--centered';

/**
 * Sets the correct path (Centered with image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredImage = '/iframe.html?id=components-lead-space--centered-with-image';

/**
 * Sets the correct path (Short)
 *
 * @type {string}
 * @private
 */
const _pathShort = '/iframe.html?id=components-lead-space--short';

/**
 * Sets the correct path (Short with image)
 *
 * @type {string}
 * @private
 */
const _pathShortWithImage = '/iframe.html?id=components-lead-space--short-with-image';

/**
 * Sets the correct path (Medium)
 *
 * @type {string}
 * @private
 */
const _pathMedium = '/iframe.html?id=components-lead-space--medium';

/**
 * Sets the correct path (Medium with image)
 *
 * @type {string}
 * @private
 */
const _pathMediumWithImage = '/iframe.html?id=components-lead-space--medium-with-image';

/**
 * Sets the correct path (Super)
 *
 * @type {string}
 * @private
 */
const _pathSuper = '/iframe.html?id=components-lead-space--super';

/**
 * Sets the correct path (Super with image)
 *
 * @type {string}
 * @private
 */
const _pathSuperWithImage = '/iframe.html?id=components-lead-space--super-with-image';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-leadspace | tall', () => {
  it('should check a11y', () => {
    cy.visit(`/${_pathTall}`);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load more than 2 buttons when customized and should all have links', () => {
    cy.visit(`/${_pathTall}&knob-Number%20of%20buttons=3`);
    cy.viewport(1280, 780);

    cy.get('dds-button-group-item').should('have.length', 3);

    cy.get('dds-button-group-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathTall}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-leadspace | tall with image', () => {
  it('should check a11y', () => {
    cy.visit(`/${_pathTall}`);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load with background image', () => {
    cy.visit(`/${_pathTallImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('dds-background-media')
      .find('dds-image-item')
      .should('have.attr', 'srcset');

    cy.takeSnapshots();
  });
});


