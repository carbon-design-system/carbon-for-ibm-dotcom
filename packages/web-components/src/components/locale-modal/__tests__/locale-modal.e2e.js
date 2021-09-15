/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the host to run tests
 *
 * @type {string|string}
 * @private
 */
const _host = (process && process.env.C4IBM_E2E_STORYBOOK_HOST) || 'http://localhost:8081';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-locale-modal--default';

describe('dds-locale-modal | default', () => {
  beforeEach(() => {
    cy.visit(`${_host}/${_path}`);
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
