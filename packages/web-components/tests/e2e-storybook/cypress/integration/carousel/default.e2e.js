/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Sets the correct path
 *
 * @param default - Path to default variant
 * @param withImages - path to variant with images
 * @param withCta - path to variant with videos
 * @param withCta - path to variant with both images and videos
 * @private
 */
const _paths = {
  default: '/iframe.html?id=components-carousel--default',
  withImages: 'iframe.html?id=components-carousel--cards-with-images',
  withVideos: 'iframe.html?id=components-carousel--cards-with-videos',
  withMedia: 'iframe.html?id=components-carousel--cards-with-media',
};

/**
 * Defines the base card component selector.
 *
 * @type {string}
 * @private
 */
const _selectorBase = `[data-autoid="dds--carousel"]`;

/**
 * Defines the card element selectors.
 *
 * @type {Object.<string>}
 * @private
 */
const _selectors = {
  card: `[data-autoid="dds--card"`,
  heading: `${_selectorBase} [data-autoid="dds--card-heading"]`,
  copy: `.bx--card__copy`,
  footer: `${_selectorBase} [data-autoid="dds--card-footer"]`,
  image: `${_selectorBase} [data-autoid="dds--image"]`,
  video: `${_selectorBase} [data-autoid="dds--image"]`,
  buttonNext: `button[part="next-button"]`,
  buttonPrevious: `button[part="prev-button"]`,
};

/**
 * Helper function for determining if an element is in the viewport.
 */
 function isInViewport(el) {
  cy.get(el)
    .then($el => {
      cy.window().then(window => {
        const { documentElement } = window.document;
        const bottom = documentElement.clientHeight;
        const right = documentElement.clientWidth;
        const rect = $el[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(bottom);
        expect(rect.bottom).to.be.greaterThan(0);
        expect(rect.right).to.be.greaterThan(0);
        expect(rect.left).to.be.lessThan(right);
      });
    });
}

/**
 * Collection of test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.checkAxeA11y();
  },
  screenshotThemes: () => {
    cy.carbonThemesScreenshot({
      capture: 'viewport',
    });
  },
  checkTextRenders: () => {
    it('should render card text', () => {
      cy.get(_selectors.heading).each($heading => {
        expect($heading).should('be.visible');
      });

      cy.get(_selectors.copy).each($copy => {
          expect($copy).should('be.visible');
        });

      cy.get(_selectors.footer)
        .find('svg path')
        .each($icon => {
          expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
      });

      cy.takeSnapshots();
    });
  },
  checkSameHeight: () => {
    it('should have headings all the same height', () => {
      cy.get(_selectors.heading).then(($heading) => {
        const headingHeight = $heading.first().height();

        // $heading.each($heading => {
        //   expect($heading).to.have.css('height', headingHeight);
        // });

        console.log('headingHeight: ' + headingHeight);
      });

      cy.get(_selectors.heading).each($heading => {
        expect($heading).to.have.css('height', headingHeight);
      });
    });
  },
  checkImageRenders: () => {
    it('should render with image', () => {
      cy.get(_selectors.image).should('be.visible');

      cy.takeSnapshots();
    });
  },
  checkClickableCard: () => {
    it('should check for link', () => {
      cy.get('dds-card > dds-card-footer')
        .shadow()
        .find('a.bx--card__footer')
        .then($link => {
          const url = $link.prop('href');
          expect(url).not.to.be.empty;
        });
    });

    it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
      cy.get('dds-card > dds-card-footer')
        .shadow()
        .find('a')
        .then($els => {
          const win = $els[0].ownerDocument.defaultView;
          const after = win.getComputedStyle($els[0], ':after');
          const positionValue = after.getPropertyValue('position');
          const insetValue = after.getPropertyValue('inset');

          expect(positionValue).to.eq('absolute');
          if (Cypress.browser.name !== 'firefox') {
            expect(insetValue).to.eq('0px');
          }
        });
    });
  },
  checkScroll: () => {
    it('should scroll forward when Next button is clicked and back when the Previous button is clicked', () => {
      cy.get(_selectors.buttonNext).click();

      cy.takeSnapshots();

      cy.get(_selectors.buttonPrevious).click();

      cy.takeSnapshots();
    });
  },
};

// describe('dds-carousel | default (desktop)', () => {
//   beforeEach(() => {
//     cy.viewport(1280, 720);
//     cy.visit(`${_paths.default}`);
//     cy.injectAxe();
//   });

//   it('should check a11y', _tests.checkA11y);
//   it('should render correctly in all themes', _tests.screenshotThemes);

//   _tests.checkTextRenders();
//   _tests.checkClickableCard();
//   _tests.checkScroll();
// });

// describe('dds-carousel | default (mobile)', () => {
//   beforeEach(() => {
//     cy.viewport(320, 720);
//     cy.visit(`/${_paths.default}`);
//     cy.injectAxe();
//   });

//   it('should check a11y', _tests.checkA11y);
//   it('should render correctly in all themes', _tests.screenshotThemes);

//   _tests.checkTextRenders();
//   _tests.checkClickableCard();
//   _tests.checkScroll();
// });

describe('dds-carousel | with images (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withImages}`);
    cy.injectAxe();
  });

  // it('should check a11y', _tests.checkA11y);
  // it('should render correctly in all themes', _tests.screenshotThemes);

  // _tests.checkTextRenders();
  _tests.checkSameHeight();
  // _tests.checkClickableCard();
  // _tests.checkScroll();
});
