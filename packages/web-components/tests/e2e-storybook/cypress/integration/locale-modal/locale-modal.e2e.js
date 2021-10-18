/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-locale-modal--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-locale-modal | default', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.viewport(1280, 780);
  });

  it('should load the Americas region', () => {
    cy.get('dds-locale-modal > dds-regions > dds-region-item:nth-child(1)')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-locale-modal | region selected', {
    //   widths: [1280],
    // });
  });

  it('should filter locales/languages', () => {
    cy.get('dds-locale-modal > dds-regions > dds-region-item:nth-child(1)')
      .shadow()
      .find('a')
      .click();

    // Added to see if this will address issues with the input being disabled
    cy.wait(500);

    cy.get('dds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-locale-modal | filter', {
    //   widths: [1280],
    // });
  });
});
