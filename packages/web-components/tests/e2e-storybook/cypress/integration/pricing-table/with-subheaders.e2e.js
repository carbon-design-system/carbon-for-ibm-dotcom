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
 * Time to wait for header to transition between sticky/static
 *
 * @type {number}
 * @private
 */
const _forHeaderChange = 1500;

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
  () => {
    it('should have stick & unstick on header on scroll', () => {
      let table, header, body;
      cy.visit(path)
        .get(selectors.table)
        .then($table => {
          table = $table.get(0);
        })
        .get(selectors.headerRow)
        .then($header => {
          header = $header.get(0);
        })
        .get(selectors.body)
        .then($body => {
          body = $body.get(0);
        })
        .window()
        .scrollTo('bottom')
        .wait(_forHeaderChange)
        .then(() => {
          const headerBox = header.getBoundingClientRect();
          const bodyBox = body.getBoundingClientRect();

          expect(headerBox.top).to.equal(0);
          expect(bodyBox.top < 0).to.equal(true);
        })
        .window()
        .scrollTo('top')
        .wait(_forHeaderChange)
        .then(() => {
          const tableBox = table.getBoundingClientRect();
          const headerBox = header.getBoundingClientRect();
          const bodyBox = body.getBoundingClientRect();

          expect(headerBox.top).to.equal(tableBox.top);
          expect(bodyBox.top).to.equal(headerBox.bottom);
        });
    });
  },
  () => {
    it('should hide header scroll description when stuck', () => {
      cy.visit(path)
        .get(selectors.headerCellDescription)
        .should('be.visible')
        .window()
        .scrollTo('bottom')
        .get(selectors.headerCellDescription)
        .should('not.be.visible')
        .window()
        .scrollTo('top')
        .get(selectors.headerCellDescription)
        .should('be.visible');
    });
  },
];

xdescribe('dds-pricing-table | with subheaders (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  [...createTests(path), ..._tests(path)].forEach(test => test());
});

xdescribe('dds-pricing-table | with subheaders (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [...createTests(path), ...createTestsMobile(path), ..._tests(path)].forEach(test => test());
});
