/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 /**
  * Sets the correct path.
  *
  * @type {string}
  * @private
  */
 const _path = '/iframe.html?id=components-filter-panel--default';

 /**
  * Defines the component selector.
  *
  * @type {string}
  * @private
  */
const _selector = '[data-autoid="dds-filter-panel-composite"]';

/**
 * Defines viewport dimensions.
 */
const _viewportWidths = {
  mobile: [325, 720],
  desktop: [1280, 720]
}

/**
 * Common configuration for `check` command usages.
 */
const _checkOptions = { force: true };

/**
 * Common configuration for `screenshot` command usages.
 */
const _screenshotOptions = { capture: 'viewport' };

describe('dds-filter-panel | (desktop)', () => {
  beforeEach(() => {
    cy.viewport(..._viewportWidths.desktop);
  });

  it('checkboxes should maintain state when transitioning to mobile', () => {
    // Check box on desktop
    cy.visit(_path)
      .get(_selector)
      .shadow()
      .find('dds-filter-group-item').first()
      .click()
      .find('dds-filter-panel-checkbox').first()
      .shadow()
      .find('input[type="checkbox"]')
      .check(_checkOptions);
    cy.screenshot(_screenshotOptions);

    // Switch to mobile and open modal
    cy.viewport(..._viewportWidths['mobile'])
      .get(_selector)
      .find('.bx--filter-button')
      .click();
    // Verify box is checked
    cy.get(_selector)
      .find('dds-filter-group-item').first()
      .find('dds-filter-panel-checkbox').first()
      .shadow()
      .find('input[type="checkbox"]')
      .should('be.checked')
    cy.screenshot(_screenshotOptions);
  });

  it('select lists should maintain state when transitioning to mobile', () => {
    // Check box on desktop
    cy.visit(_path)
      .get(_selector)
      .shadow()
      .find('dds-filter-group-item').eq(1)
      .click()
      .find('dds-filter-panel-input-select').first()
      .click();
    cy.screenshot(_screenshotOptions);

    // Switch to mobile and open modal
    cy.viewport(..._viewportWidths['mobile'])
      .get(_selector)
      .find('.bx--filter-button')
      .click();
    // Verify box is checked
    cy.get(_selector)
      .find('dds-filter-group-item').eq(1)
      .find('dds-filter-panel-input-select').first()
      .should('have.attr', 'selected')
    cy.screenshot(_screenshotOptions);
  });
});

describe('dds-filter-panel | (mobile)', () => {
  beforeEach(() => {
    cy.viewport(..._viewportWidths.mobile);
  });

  it('checkboxes should maintain state when transitioning to desktop', () => {
    // Visit on mobile and open modal
    cy.visit(_path)
      .get(_selector)
      .find('.bx--filter-button')
      .click();
    // Check box on mobile
    cy.get(_selector)
      .find('dds-filter-group-item').first()
      .click()
      .find('dds-filter-panel-checkbox').first()
      .shadow()
      .find('input[type="checkbox"]')
      .check(_checkOptions);
    cy.screenshot(_screenshotOptions)

    // Switch to desktop and verify box is checked
    cy.viewport(..._viewportWidths['desktop'])
      .get(_selector)
      .shadow()
      .find('dds-filter-group-item').first()
      .find('dds-filter-panel-checkbox').first()
      .shadow()
      .find('input[type="checkbox"]')
      .should('be.checked');
    cy.screenshot(_screenshotOptions);
  });

  it('select lists should maintain state when transitioning to desktop', () => {
    // Visit on mobile and open modal
    cy.visit(_path)
      .get(_selector)
      .find('.bx--filter-button')
      .click();
    // Check box on mobile
    cy.get(_selector)
      .find('dds-filter-group-item').eq(1)
      .click()
      .find('dds-filter-panel-input-select').first()
      .click();
    cy.screenshot(_screenshotOptions)

    // Switch to desktop and verify box is checked
    cy.viewport(..._viewportWidths['desktop'])
      .get(_selector)
      .shadow()
      .find('dds-filter-group-item').eq(1)
      .find('dds-filter-panel-input-select').first()
      .should('have.attr', 'selected');
    cy.screenshot(_screenshotOptions);
  });
});

