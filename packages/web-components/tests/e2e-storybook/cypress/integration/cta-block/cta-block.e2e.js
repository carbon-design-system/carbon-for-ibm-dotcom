/**
 * Copyright IBM Corp. 2021, 2024
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

const _path = '/iframe.html?id=components-cta-block--within-tabs';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('c4d-cta-block (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it.skip('should set items to same height when made visible', () => {
    // Delay variable
    const forHeightsToBeSet = 100;

    // Repeatable function to check visible cta block items
    function checkItemHeights() {
      const itemHeights = [];
      const itemHeadingHeights = [];
      const itemCopyHeights = [];

      cy.get('c4d-tab:visible')
        // Only measure first row of items
        .find('c4d-cta-block-item:nth-child(-n+3)')
        .as('items')
        .should('be.visible')
        // Items should match from CSS Grid
        .each(([item]) => {
          itemHeights.push(item.getBoundingClientRect().height);
        })
        .get('@items')
        .find('c4d-content-item-heading')
        // Item headings should have inline style set
        .each(([itemHeading]) => {
          itemHeadingHeights.push(itemHeading.getBoundingClientRect().height);
        })
        .get('@items')
        .find('c4d-content-item-copy')
        // Item copy should have inline style set
        .each(([itemCopy]) => {
          itemCopyHeights.push(itemCopy.getBoundingClientRect().height);
        })
        .wrap([itemHeights, itemHeadingHeights, itemCopyHeights])
        // Ensure each set of measurements are identical non-zero values
        .each((heightSet) => {
          const isZero = heightSet.includes(0);
          const isAllSame = heightSet.every((val) => val === heightSet[0]);
          expect(isZero).to.be.false;
          expect(isAllSame).to.be.true;
        });
    }

    cy.wait(forHeightsToBeSet)
      .window()
      // Check items on load
      .then(checkItemHeights)
      .get('[role="tablist"] [role="tab"] button')
      // Cycle across all tabs and ensure item heights are set
      .each((button) => {
        cy.get(button).click().wait(forHeightsToBeSet).then(checkItemHeights);
      });
  });
});
