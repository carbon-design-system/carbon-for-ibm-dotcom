/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Defines the component path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-link-with-icon--default';

/**
 * Defines the component selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--link-with-icon"]';

/**
 * Collection of test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = [
  () => {
    it('should check a11y', () => {
      cy.visit(_path);
      cy.injectAxe();
      cy.checkAxeA11y();
    });
  },
  () => {
    it('should have a customizable and clickable link', () => {
      let defaultHref, customHrefOutput;
      const customHrefInput = 'https://www.example.com/foo';

      cy.visit(_path)
        .get(_selector)
        .shadow()
        .find('a')
        .should($link => {
          defaultHref = $link.prop('href');

          expect($link.prop('href')).not.to.be.empty;
        })
        .visit(`${_path}&knob-Link%20href%20(href)=${customHrefInput}`)
        .get(_selector)
        .shadow()
        .find('a')
        .should($link => {
          customHrefOutput = $link.prop('href');

          expect(customHrefOutput).to.be.eq(customHrefInput);
          expect(customHrefOutput).to.not.eq(defaultHref);
        });
    });
  },
  () => {
    it('should not be clickable when disabled', () => {
      cy.visit(`${_path}&knob-Disabled%20(disabled)=true`)
        .get(_selector)
        .shadow()
        .find('a')
        .should('have.length', 0);
    });
  },
  () => {
    it('should render correctly in all themes', () => {
      cy.visit(_path).carbonThemesScreenshot({
        capture: 'viewport',
      });
    });
  },
];

describe('dds-link-with-icon | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  _tests.forEach(test => test());
});
