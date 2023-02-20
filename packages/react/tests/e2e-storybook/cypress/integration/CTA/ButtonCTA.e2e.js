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
  ctaType: `${_path}&knob-Button%201%20type%20(buttons[0].type)_CTA=`,
};

/**
 * Defines the button CTA variant selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--button-group"] .bx--buttongroup-item';

/**
 * Defines the variants' SVG icon paths.
 *
 * @TODO Fix icon options not being respected when viewing component iframe. Once done, we can remove this
 *
 * @type {Object<string, string>}
 * @private
 */
const _typeIcons = {
  local:
    'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z',
};

/**
 * Collection of common test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = createTests(_selector, _paths, _typeIcons);

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
    cy.viewport(325, 720);
  });

  _buttonTests.forEach(test => test());
  _tests.forEach(test => test());
});
