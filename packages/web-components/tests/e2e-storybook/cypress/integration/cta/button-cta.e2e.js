/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import createTests from './_tests';

/**
 * Defines the button CTA variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-cta--button';

/**
 * Path definitions for the test creation function.
 *
 * @type {Object.<string, string>}
 * @private
 */
const _paths = {
  copy: `${_path}&knob-Copy%20text=`,
  href: `${_path}&knob-Content%20link%20href%20(href)=`,
  ctaType: `${_path}&knob-CTA%20type%20(cta-type)=`,
};

/**
 * Defines the button CTA variant selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--button-cta"]';

/**
 * Collection of common test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = createTests(_selector, _paths);

/**
 * Collection of test scenarios specific to the button CTA variant.
 *
 * @type {Array<function>}
 * @private
 */
const _buttonTests = [
  () => {
    it('should render two buttons', () => {
      cy.get(_selector).should('have.length', 2);
    });
  },
];

describe('dds-cta | button (desktop)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _buttonTests.forEach(test => test());
  _tests.forEach(test => test());
});

describe('dds-cta | button (mobile)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(375, 720);
  });

  _buttonTests.forEach(test => test());
  _tests.forEach(test => test());
});
