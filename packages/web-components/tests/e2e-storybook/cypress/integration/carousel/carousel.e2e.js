/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Sets the correct path
 *
 * @param default - path to default variant
 * @param withImages - path to variant with images
 * @param withVideos - path to variant with videos
 * @param withMedia - path to variant with both images and videos
 * @private
 */
const _paths = {
  default: '/iframe.html?id=components-carousel--default',
  withImages: '/iframe.html?id=components-carousel--cards-with-images',
  withVideos: '/iframe.html?id=components-carousel--cards-with-videos',
  withMedia: '/iframe.html?id=components-carousel--cards-with-media',
};

/**
 * Defines the base carousel component selector.
 *
 * @type {string}
 * @private
 */
const _selectorBase = `[data-autoid="c4d--carousel"]`;

/**
 * Defines the carousel element selectors.
 *
 * @type {Object.<string>}
 *
 * @param card - carousel card
 * @param videoCard - a video card has distinct markup
 * @param heading - card heading
 * @param copy - card copy/body text
 * @param footer - card footer, including CTA
 * @param videoFooter - video card footer has different markup
 * @param image - card image
 * @param video - card video
 * @param buttonNext - carousel "Next" button
 * @param buttonPrevious - carousel "Previous" button
 * @private
 */
const _selectors = {
  card: `[data-autoid="c4d--card"]`,
  videoCard: `c4d-video-cta-container`,
  heading: `[data-autoid="c4d--card-heading"]`,
  copy: `.cds--card__copy`,
  footer: `[data-autoid="c4d--card-footer"]`,
  videoFooter: `[data-autoid="c4d--card-cta-footer"]`,
  image: `${_selectorBase} [data-autoid="c4d--image"]`,
  video: `c4d-card-cta-image`,
  buttonNext: `button[part="next-button"]`,
  buttonPrevious: `button[part="prev-button"]`,
};

/**
 * Collection of test scenarios.
 *
 * @type {Array<function>}
 * @private
 */
const _tests = {
  checkA11y: () => {
    it('should check a11y', () => {
      cy.checkAxeA11y();
    });
  },
  screenshotThemes: () => {
    it('should render correctly in all themes', () => {
      cy.carbonThemesScreenshot({
        capture: 'viewport',
      });
    });
  },
  checkTextRenders: (iconPath) => {
    it('should render card text and arrow icon', () => {
      cy.get(_selectors.heading)
        // Wait for the sameHeight to finish loading
        .wait(2000)
        .each(($heading) => {
          expect($heading).not.to.be.empty;
        });

      cy.get(_selectors.copy).each(($copy) => {
        expect($copy).not.to.be.empty;
      });

      cy.get(_selectorBase).then(($carousel) => {
        if (iconPath && $carousel.find(_selectors.footer).length > 0) {
          cy.get(_selectors.footer)
            .shadow()
            .find('svg path')
            .each(($icon) => {
              expect($icon).to.have.attr('d', iconPath);
            });
        }

        if ($carousel.find(_selectors.videoFooter).length > 0) {
          cy.get(_selectors.videoFooter)
            .find('svg[slot="icon"] path')
            .each(($icon) => {
              expect($icon).to.have.attr(
                'd',
                'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
              );
            });
        }
      });

      cy.takeSnapshots();
    });
  },
  checkImageRenders: () => {
    it('should render with image', () => {
      cy.get(_selectors.image).should('be.visible');

      cy.takeSnapshots();
    });
  },
  checkVideoRenders: () => {
    it('should render the video thumbnail', () => {
      cy.get(`${_selectorBase} ${_selectors.card}`)
        .shadow()
        .find('.cds--card__video-thumbnail')
        .should('be.visible');

      cy.takeSnapshots();
    });
  },
  checkVideoDurationText: () => {
    it('should render the video duration in the footer', () => {
      cy.get(_selectors.footer)
        .shadow()
        .find('span.cds--card__cta__copy')
        .then(($duration) => {
          expect($duration).not.to.be.empty;
        });
    });
  },
  checkSameHeight: () => {
    it('should have headings all the same height', () => {
      cy.get(_selectors.heading)
        // Wait for sameHeight to finish loading
        .wait(1000)
        .then(($headings) => {
          let headingHeight = $headings.first().height();

          cy.get(_selectors.heading).each(($heading, index) => {
            expect($heading).to.not.have.css('height', '0px');
            expect($heading[0].clientHeight).to.equal(headingHeight);
          });
        });
    });
  },
  checkClickableCard: () => {
    it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
      cy.get(_selectorBase).then(($carousel) => {
        if ($carousel.find(_selectors.footer).length > 0) {
          cy.get(_selectors.footer)
            .shadow()
            .find('a.cds--card__footer')
            .then(($link) => {
              const url = $link.prop('href');
              expect(url).not.to.be.empty;

              const win = $link[0].ownerDocument.defaultView;
              const after = win.getComputedStyle($link[0], ':after');
              const positionValue = after.getPropertyValue('position');

              expect(positionValue).to.eq('absolute');
            });
        }
      });
    });
  },
  checkInertAriaHidden: (childSelector) => {
    it('should check visible and hidden cards for expected aria-hidden attribute', () => {
      cy.get(_selectorBase).then(($carousel) => {
        // Take note of the page size, for later comparison.
        const pageSize = $carousel[0]?.pageSize;

        cy.wrap($carousel)
          .find(childSelector ?? _selectors.card)
          .then(($carouselItems) => {
            // Verify that the carousel items have the expected aria-hidden
            // attribute.
            cy.wrap($carouselItems)
              .filter(`[aria-hidden="false"]`)
              .should('have.length', pageSize);

            // Verify that the first carousel items has the correct
            // aria-hidden attribute, and that it changes accordingly after we
            // advance the slider.
            cy.wrap($carouselItems)
              .first()
              .then(($firstChild) => {
                cy.wrap($firstChild)
                  .should('have.attr', 'aria-hidden')
                  .and('equal', 'false');

                // Scroll carousel forward.
                cy.get(_selectors.buttonNext)
                  .click()
                  // Wait a second for the carousel to finish moving
                  .wait(1000);

                // Verify that the aria-hidden attribute of the first item
                // toggled as expected. We just check the first, so that we
                // don't have to consider the current viewport size. Checking t
                // he first should suffice, given this behavior is triggered via
                // IntersectionObserver, and the first item being exposed is
                // representative of any arbitrary item being exposed.
                cy.wrap($firstChild)
                  .should('have.attr', 'aria-hidden')
                  .and('equal', 'true');

                // Scroll carousel backward to set it back to its initial
                // position.
                cy.get(_selectors.buttonPrevious)
                  .click()
                  // Wait a second for the carousel to finish moving
                  .wait(1000);
              });
          });
      });
    });
  },
  checkScroll: () => {
    it('should scroll forward when Next button is clicked and back when the Previous button is clicked', () => {
      cy.get(_selectors.buttonNext)
        .click()
        // Wait a second for the carousel to finish moving
        .wait(1000)
        .takeSnapshots();

      cy.get(_selectors.buttonPrevious)
        .click()
        // Wait a second for the carousel to finish moving
        .wait(1000)
        .takeSnapshots();
    });
  },
};

describe('c4d-carousel | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.default}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
  );
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});

describe('c4d-carousel | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.default}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
  );
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});

describe('c4d-carousel | with images (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withImages}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
  );
  _tests.checkImageRenders();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('c4d-carousel | with images (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.withImages}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
  );
  _tests.checkImageRenders();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});

describe('c4d-carousel | with videos (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withVideos}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.4819-.8763l20,11a1,1,0,0,1,0,1.7525l-20,11A1.0005,1.0005,0,0,1,7,28Z'
  );
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden(_selectors.videoCard);
  _tests.checkScroll();
});

describe('c4d-carousel | with videos (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.withVideos}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders(
    'M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,1.4819-.8763l20,11a1,1,0,0,1,0,1.7525l-20,11A1.0005,1.0005,0,0,1,7,28Z'
  );
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});

describe('c4d-carousel | with media (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withMedia}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkImageRenders();
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});

describe('c4d-carousel | with media (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.withMedia}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkImageRenders();
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkClickableCard();
  _tests.checkInertAriaHidden();
  _tests.checkScroll();
});
