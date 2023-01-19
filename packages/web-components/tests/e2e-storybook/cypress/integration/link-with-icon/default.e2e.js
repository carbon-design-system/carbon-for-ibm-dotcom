/**
 * Copyright IBM Corp. 2021, 2023
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
    it('should render customizable link text', () => {
      let defaultCopy, customCopyOutput;
      const customCopyInput = 'Consectetur adipiscing elit';

      cy.visit(_path)
        .get(_selector)
        .then(([copy]) => {
          defaultCopy = copy.innerText.trim();
        })
        .visit(`${_path}&args=link-text:${customCopyInput}`)
        .get(_selector)
        .should(([copy]) => {
          customCopyOutput = copy.innerText.trim();

          expect(customCopyOutput).to.be.eq(customCopyInput);
          expect(customCopyOutput).to.not.eq(defaultCopy);
        });
    });
  },
  () => {
    it('should have a customizable and clickable link', () => {
      let defaultHref, customHrefOutput;
      const customHrefInput = 'https://www.example.com/foo';

      cy.visit(_path)
        .get(_selector)
        .shadow()
        .find('a')
        .should($link => {
          defaultHref = $link.prop('href');

          expect($link.prop('href')).not.to.be.empty;
        })
        .visit(`${_path}&args=link:${customHrefInput}`)
        .get(_selector)
        .shadow()
        .find('a')
        .should($link => {
          customHrefOutput = $link.prop('href');

          expect(customHrefOutput).to.be.eq(customHrefInput);
        });
    });
  },
  () => {
    it('should not be clickable when disabled', () => {
      cy.visit(`${_path}&args=disabled:true`)
        .get(_selector)
        .shadow()
        .find('a')
        .should('have.length', 0);
    });
  },
  () => {
    it('should check icon placements', () => {
      ['left', 'right'].forEach(placement => {
        let $svg;
        cy.visit(`${_path}&args=placement:${placement}`)
          .get(_selector)
          .then($elem => {
            $svg = $elem.find('svg');
          })
          .shadow()
          .find('a')
          .should($link => {
            const svgPosition = $svg[0].getBoundingClientRect();
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
    cy.viewport(375, 720);
  });

  _tests.forEach(test => test());
});
