/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createTests, createTestsMobile, selectors } from './_tests';

/**
 * Defines the Story path.
 *
 * @type {string}
 * @private
 */
const path = '/iframe.html?id=components-pricing-table--with-subheaders';

/**
 * Collection of test scenarios for this Story.
 *
 * @param {string} path
 *   The Story path.
 * @return {Array<function>}
 * @private
 */
const _tests = (path = path) => [
  () => {
    it('should have subheaders for each table group', () => {
      cy.visit(path)
        .get(selectors.group)
        .each(($group, index) => {
          expect($group[0].shadowRoot.querySelector('tr > th')).not.to.eq(null);
        });
    });
  },
];

describe('dds-pricing-table | with subheaders (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  [...createTests(path), ..._tests(path)].forEach(test => test());
});

describe('dds-pricing-table | with subheaders (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [...createTests(path), ...createTestsMobile(path), ..._tests(path)].forEach(test => test());
});
