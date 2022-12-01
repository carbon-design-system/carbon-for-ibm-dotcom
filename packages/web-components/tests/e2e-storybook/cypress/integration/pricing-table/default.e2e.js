/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createTests, createTestsMobile, selectors } from './_tests';

/**
 * Re-enable and optimize tests when feature flag is removed
 * Defines the Story path.
 *
 * @type {string}
 * @private
 */
const path = '/iframe.html?id=components-pricing-table--default';

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
    it('should have header cells for each row', () => {
      cy.visit(path)
        .get(selectors.row)
        .then($rows => {
          $rows.each((index, row) => {
            const headerCell = row.querySelector(selectors.headerCell);
            expect(headerCell).not.to.eq(null);
          });
        });
    });
  },
];

xdescribe('dds-pricing-table | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  [...createTests(path), ..._tests(path)].forEach(test => test());
});

xdescribe('dds-pricing-table | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [...createTests(path), ...createTestsMobile(path), ..._tests(path)].forEach(test => test());
});
