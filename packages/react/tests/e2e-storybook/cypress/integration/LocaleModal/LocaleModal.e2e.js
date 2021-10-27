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

describe('LocaleModal | default', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
    cy.visit(`/${_path}`);
    cy.viewport(1280, 780);
  });

  it('should load the Americas region', () => {
    cy.get('[data-region="am"]').click();

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('LocaleModal | region selected', {
      widths: [1280],
    });
  });

  it('should filter locales/languages', () => {
    cy.get('[data-region="am"]').click();

    cy.get('[data-autoid="dds--locale-modal__filter"]').type('ca', {
      force: true,
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('LocaleModal | filter', {
      widths: [1280],
    });
  });
});
