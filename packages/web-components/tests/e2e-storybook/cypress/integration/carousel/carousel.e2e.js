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
const _selectorBase = `[data-autoid="dds--carousel"]`;

/**
 * Defines the carousel element selectors.
 *
 * @type {Object.<string>}
 *
 * @param card - carousel card
 * @param videoCard - a video card has distict markup
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
  card: `${_selectorBase} [data-autoid="dds--card"]`,
  videoCard: `${_selectorBase} dds-video-cta-container`,
  heading: `[data-autoid="dds--card-heading"]`,
  copy: `.bx--card__copy`,
  footer: `[data-autoid="dds--card-footer"]`,
  videoFooter: `[data-autoid="dds--card-cta-footer"]`,
  image: `${_selectorBase} [data-autoid="dds--image"]`,
  video: `dds-card-cta-image`,
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
  checkTextRenders: () => {
    it('should render card text and arrow icon', () => {
      cy.get(_selectors.heading)
        // Wait for the sameHeight to finish loading
        .wait(2000)
        .each($heading => {
          expect($heading).not.to.be.empty;
        });

      cy.get(_selectors.copy).each($copy => {
        expect($copy).not.to.be.empty;
      });

      cy.get(_selectorBase).then($carousel => {
        if ($carousel.find(_selectors.footer).length > 0) {
          cy.get(_selectors.footer)
            .find('svg[slot="icon"] path')
            .each($icon => {
              expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
            });
        }

        if ($carousel.find(_selectors.videoFooter).length > 0) {
          cy.get(_selectors.videoFooter)
            .find('svg[slot="icon"] path')
            .each($icon => {
              expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
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
    it('should render the video thumbnail and play button', () => {
      cy.get(_selectors.video)
        .shadow()
        .find('img.bx--image__img')
        .should('be.visible');

      cy.get(_selectors.video)
        .find('svg[slot="icon"] path')
        .each($icon => {
          expect($icon).to.have.attr(
            'd',
            'M26.5555476,43.111135 C26.0032708,43.111135 25.5555476,42.6633959 25.5555476,42.1111111 L25.5555476,20.1111111 C25.5541311,19.7531358 25.7441673,19.4217049 26.0538295,19.2421008 C26.3634918,19.0624967 26.745539,19.0621192 27.0555476,19.2411111 L46.0555476,30.2411111 C46.368866,30.4186723 46.5625038,30.7509842 46.5625038,31.1111111 C46.5625038,31.4712381 46.368866,31.8035499 46.0555476,31.9811111 L27.0555476,42.9811111 C26.9031526,43.0674916 26.7307319,43.1123209 26.5555476,43.111135 Z'
          );
        });

      cy.takeSnapshots();
    });
  },
  checkVideoDurationText: () => {
    it('should render the video duration in the footer', () => {
      cy.get(_selectors.videoFooter)
        .find('span.bx--card__cta__copy')
        .then($duration => {
          expect($duration).not.to.be.empty;
        });
    });
  },
  checkSameHeight: () => {
    it('should have headings all the same height', () => {
      cy.get(_selectors.heading)
        // Wait for sameHeight to finish loading
        .wait(1000)
        .then($headings => {
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
      cy.get(_selectorBase).then($carousel => {
        if ($carousel.find(_selectors.footer).length > 0) {
          cy.get(_selectors.footer)
            .shadow()
            .find('a.bx--card__footer')
            .then($link => {
              const url = $link.prop('href');
              expect(url).not.to.be.empty;

              const win = $link[0].ownerDocument.defaultView;
              const after = win.getComputedStyle($link[0], ':after');
              const positionValue = after.getPropertyValue('position');
              const insetValue = after.getPropertyValue('inset');

              expect(positionValue).to.eq('absolute');
            });
        }

        if ($carousel.find(_selectors.videoFooter).length > 0) {
          cy.get(_selectors.videoFooter)
            .shadow()
            .find('a.bx--card__footer')
            .then($link => {
              const url = $link.prop('href');
              expect(url).not.to.be.empty;

              const win = $link[0].ownerDocument.defaultView;
              const after = win.getComputedStyle($link[0], ':after');
              const positionValue = after.getPropertyValue('position');
              const insetValue = after.getPropertyValue('inset');

              expect(positionValue).to.eq('absolute');
            });
        }
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

describe('dds-carousel | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.default}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.default}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | with images (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withImages}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkImageRenders();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | with images (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.withImages}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkImageRenders();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | with videos (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`${_paths.withVideos}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkSameHeight();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | with videos (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`${_paths.withVideos}`);
    cy.injectAxe();
  });

  _tests.checkA11y();
  _tests.screenshotThemes();
  _tests.checkTextRenders();
  _tests.checkVideoRenders();
  _tests.checkVideoDurationText();
  _tests.checkClickableCard();
  _tests.checkScroll();
});

describe('dds-carousel | with media (desktop)', () => {
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
  _tests.checkScroll();
});

describe('dds-carousel | with media (mobile)', () => {
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
  _tests.checkScroll();
});
