/**
 * Copyright IBM Corp. 2022
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
const _path = '/iframe.html?id=components-content-item--default';

/**
 * Defines the component selector.
 *
 * @type {string}
 * @private
 */
const _selector = '[data-autoid="dds--content-item"]';

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
    it('should optionally render copy text', () => {
      cy.visit(`${_path}&knob-Copy:=true`)
        .get(_selector)
        .find('dds-content-item-copy')
        .should('have.length', 1)
        .visit(`${_path}&knob-Copy:=false`)
        .get(_selector)
        .find('dds-content-item-copy')
        .should('have.length', 0);
      cy.takeSnapshots();
    });
  },
  () => {
    it('should support clickable text and button CTA links', () => {
      const cta_types = {
        text: 'dds-text-cta',
        button: 'dds-button-cta',
      };
      Object.keys(cta_types).forEach(type => {
        cy.visit(`${_path}&knob-CTA%20style:=${type}`)
          .get(_selector)
          .find(cta_types[type])
          .shadow()
          .find('a')
          .should($link => {
            expect($link.prop('href')).not.to.be.empty;
          });
        cy.takeSnapshots();
      });
    });
  },
  () => {
    it('should support image and video media', () => {
      const media_types = {
        image: 'dds-image',
        video: 'dds-video-player-container',
      };
      Object.keys(media_types).forEach(type => {
        cy.visit(`${_path}&knob-Media%20type:=${type}`)
          .get(_selector)
          .find(media_types[type])
          .should('have.length', 1);
        cy.takeSnapshots();
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

describe('dds-content-item | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  _tests.forEach(test => test());
});
