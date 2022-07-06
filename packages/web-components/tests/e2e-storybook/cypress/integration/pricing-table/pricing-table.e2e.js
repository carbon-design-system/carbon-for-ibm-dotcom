/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-pricing-table--with-subheaders';

/**
 * Time to wait for header to transition between sticky/static
 *
 * @type {number}
 * @private
 */
const _forHeaderChange = 1500;

describe('dds-pricing-table | with subheaders (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780)
      .visit(_path)
      .injectAxe();
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have stick & unstick on header on scroll', () => {
    let table, header, body;
    cy.get('dds-pricing-table')
      .then($table => {
        table = $table.get(0);
      })
      .get('dds-pricing-table-header-row')
      .then($header => {
        header = $header.get(0);
      })
      .get('dds-pricing-table-body')
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
      })
  });

  it('should hide header scroll description when stuck', () => {
    const descriptions = 'dds-pricing-table-header-cell-description';

    cy.get(descriptions)
      .should('be.visible')
      .window()
      .scrollTo('bottom')
      .get(descriptions)
      .should('not.be.visible')
      .window()
      .scrollTo('top')
      .get(descriptions)
      .should('be.visible')
  });
});
