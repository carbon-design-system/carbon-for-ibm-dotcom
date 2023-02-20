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
  ctaType: `${_path}&knob-type_CTA=`,
};

/**
 * Defines the text CTA variant selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--link-with-icon"]';

/**
 * An array of test scenarios.
 *
 * @type {Array<Function>}
 * @private
 */
const _tests = createTests(_selector, _paths);

const _textTests = [
  () => {
    it('should check icon placements', () => {
      ['left', 'right'].forEach(placement => {
        cy.visit(
          `${_path}&knob-Icon%20Placement%20(iconPlacement)_CTA=${placement}`
        )
          .get(_selector)
          .find('a')
          .should($link => {
            const svgPosition = $link.find('svg')[0].getBoundingClientRect();
            const textPosition = $link.find('span')[0].getBoundingClientRect();

            if (placement === 'left') {
              expect(svgPosition.left).to.be.lt(textPosition.left);
            } else {
              expect(svgPosition.left).to.be.gt(textPosition.left);
            }
          });
      });
    });
  },
];

describe('dds-cta | text (desktop)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _textTests.forEach(test => test());
  _tests.forEach(test => test());
});

describe('dds-cta | text (mobile)', () => {
  beforeEach(() => {
    cy.visit(_path);
    cy.injectAxe();
    cy.viewport(325, 720);
  });

  _textTests.forEach(test => test());
  _tests.forEach(test => test());
});
