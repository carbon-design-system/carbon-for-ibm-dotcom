/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import createTests from './_tests';

/**
 * Defines the text CTA variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-cta--text';

/**
 * Path definitions for the test creation function.
 *
 * @type {Object.<string, string>}
 * @private
 */
const _paths = {
  copy: `${_path}&knob-Copy%20(copy):=`,
  href: `${_path}&knob-Content%20link%20href%20(href)=`,
  ctaType: `${_path}&knob-CTA%20type%20(cta-type)=`,
};

/**
 * Defines the text CTA variant selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--text-cta"]';

/**
 * An array of test scenarios.
 *
 * @type {Array<Function>}
 * @private
 */
const _tests = createTests(_selector, _paths);

describe('dds-cta | text (desktop)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.forEach(test => test());
});

describe('dds-cta | text (mobile)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(375, 720);
  });

  _tests.forEach(test => test());
});
