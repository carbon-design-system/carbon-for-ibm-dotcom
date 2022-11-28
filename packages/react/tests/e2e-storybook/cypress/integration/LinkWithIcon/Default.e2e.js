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
    it('should render link text', () => {
      cy.visit(_path)
        .get(_selector)
        .should('not.be.empty');
    });
  },
  () => {
    it('should have a clickable link', () => {
      cy.visit(_path)
        .get(_selector)
        .find('a')
        .should($link => {
          expect($link.prop('href')).not.to.be.empty;
        });
    });
  },
  () => {
    it('should not be clickable when disabled', () => {
      cy.visit(`${_path}&knob-Disabled%20(disabled):=true`)
        .get(_selector)
        .find('a')
        .should($link => {
          expect($link.prop('href')).to.be.empty;
        });
    });
  },
  () => {
    it('should optionally allow visited styles', () => {
      cy.visit(
        `${_path}&knob-Allow%20visited%20styles%20(visited):=true`
      )
        .get(_selector)
        .find('a')
        .should('have.class', 'bx--link--visited');
    });
  },
  () => {
    it('should check icon placements', () => {
      ['left', 'right'].forEach(placement => {
        cy.visit(
          `${_path}&knob-Icon%20placement%20(iconPlacement):=${placement}`
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

describe('dds-link-with-icon | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 720);
  });

  _tests.forEach(test => test());
});
