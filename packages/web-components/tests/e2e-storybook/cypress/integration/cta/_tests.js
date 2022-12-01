/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Defines the variants' SVG icon paths.
 *
 * @type {Object<string, string>}
 * @private
 */
const _typeIcons = {
  local: 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z',
  jump: 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z',
  external: 'M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z',
  download:
    'M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z',
  video:
    'M11,23a1,1,0,0,1-1-1V10a1,1,0,0,1,1.4473-.8945l12,6a1,1,0,0,1,0,1.789l-12,6A1.001,1.001,0,0,1,11,23Zm1-11.3821v8.7642L20.7642,16Z',
};

/**
 * Generates an array of test scenarios.
 *
 * @param {string} selector - Cypress selector for the component to be tested/
 * @param {Object} paths - Paths to component variations.
 * @param {string} paths.copy - Path with URL params for Copy knob, not
 * including the copy text. E.g. "/iframe.html?id=some_component&copy="
 * @param {string} paths.href - Path with URL params for content link knob, not
 * including the link. E.g. "/iframe.html?id=some_component&href="
 * @param {string} paths.ctaType - Path with URL params for CTA type knob, not
 * including the type. E.g. "/iframe.html?id=some_component&cta_type=".
 * @returns {Array<Function>} - Collection of Cypress test scenarios.
 */
export default (selector, paths) => [
  () => {
    it('should check a11y', () => {
      cy.checkAxeA11y();
    });
  },
  () => {
    it('should have a clickable link', () => {
      let defaultHref, customHrefOutput;
      const customHrefInput = 'https://www.example.com/foo';

      cy.get(selector)
        .shadow()
        .find('a')
        .should($link => {
          defaultHref = $link.prop('href');

          expect($link.prop('href')).not.to.be.empty;
        })
        .visit(`${paths.href}${customHrefInput}`);
    });
  },
  () => {
    it('should check CTA types', () => {
      Object.keys(_typeIcons).forEach(type => {
        cy.visit(`${paths.ctaType}${type}`);
        cy.get(selector)
          .shadow()
          .find('a svg path')
          .should($path => {
            expect($path.attr('d')).to.be.eq(_typeIcons[type]);
          });
      });
    });
  },
  () => {
    it('should render correctly in all themes', () => {
      cy.carbonThemesScreenshot({
        capture: 'viewport',
      });
    });
  },
];
