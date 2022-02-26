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
    it('should render customizable header text', () => {
      let defaultHeader, customHeaderOutput;
      const customHeaderInput = 'Lorem ipsum dolor sit amet';

      cy.visit(_path)
        .get(_selector)
        .find('[data-autoid="dds--content-item__heading"]')
        .then(([copy]) => {
          defaultHeader = copy.innerText.trim();
        })
        .visit(`${_path}&knob-Heading%20(heading):=${customHeaderInput}`)
        .get(_selector)
        .find('[data-autoid="dds--content-item__heading"]')
        .should(([copy]) => {
          customHeaderOutput = copy.innerText.trim();
          expect(customHeaderOutput).to.be.eq(customHeaderInput);
          expect(customHeaderOutput).to.not.eq(defaultHeader);
        });
      cy.takeSnapshots();
    });
  },
  () => {
    let defaultCopy, customCopyOutput;
    const customCopyInput = 'Lorem ipsum dolor sit amet';

    it('should render customizable copy text', () => {
      cy.visit(_path)
        .get(_selector)
        .find('[data-autoid="dds--content-item__copy"]')
        .then(([copy]) => {
          defaultCopy = copy.innerText.trim();
        })
        .visit(`${_path}&knob-Copy%20(copy):=${customCopyInput}`)
        .get(_selector)
        .find('[data-autoid="dds--content-item__copy"]')
        .then(([copy]) => {
          customCopyOutput = copy.innerText.trim();
          expect(customCopyOutput).to.be.eq(customCopyInput);
          expect(customCopyOutput).to.not.eq(defaultCopy);
        });
      cy.takeSnapshots();
    });
  },
  () => {
    it('should render customizable CTA text', () => {
      let defaultCopy, customCopyOutput;
      const customCopyInput = 'Consectetur adipiscing elit.';
      cy.visit(_path)
        .get(_selector)
        .find('.bx--content-item__cta a')
        .then(([copy]) => {
          defaultCopy = copy.innerText.trim();
        })
        .visit(`${_path}&knob-CTA%20copy=${customCopyInput}`)
        .get(_selector)
        .find('.bx--content-item__cta a')
        .should(([copy]) => {
          customCopyOutput = copy.innerText.trim();
          expect(customCopyOutput).to.be.eq(customCopyInput);
          expect(customCopyOutput).to.not.eq(defaultCopy);
        });
      cy.takeSnapshots();
    });
  },
  () => {
    it('should support clickable text and button CTA links', () => {
      const cta_types = {
        text: 'a.bx--link-with-icon',
        button: 'a.bx--btn',
      };
      Object.keys(cta_types).forEach(type => {
        cy.visit(`${_path}&knob-CTA%20style=${type}`)
          .get(_selector)
          .find(cta_types[type])
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
        image: '[data-autoid="dds--image-with-caption"]',
        video: '.bx--video-player',
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

describe('dds-content-item | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });
  _tests.forEach(test => test());
});
