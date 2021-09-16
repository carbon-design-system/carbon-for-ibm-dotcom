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
const _host =
  (process && process.env.C4IBM_E2E_STORYBOOK_HOST) || 'http://localhost:8081';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path =
  '/iframe.html?id=components-table-of-contents--manually-define-menu-items';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('TableOfContents | manually defined', () => {
  it('should load the g100 theme', () => {
    cy.visit(`${_host}/${_path}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute(
        'storybook-carbon-theme',
        'g100'
      );
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      cy.percySnapshot('TableOfContents | manually defined | g100 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`${_host}/${_path}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute(
        'storybook-carbon-theme',
        'g90'
      );
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      cy.percySnapshot('TableOfContents | manually defined | g90 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`${_host}/${_path}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute(
        'storybook-carbon-theme',
        'g10'
      );
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      cy.percySnapshot('TableOfContents | manually defined | g10 theme', {
        widths: [1280],
      });
    });
  });
});
