/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct defaultPath for dds-lightbox-media-viewer
 *
 * @type {string}
 * @private
 */
const _defaultPath = '/iframe.html?id=components-lightbox-media-viewer--default';

const _args = {
  video: '&knob-Video%20ID%20(video-id)=1_9h94wo6b',
  img1x1: '&knob-Image%20(default-src)=23163c123ccb40d86a8b44fae716c453.jpg',
  img16x9: '&knob-Image%20(default-src)=3a7714edad00ad8b4f6f19f94ab56dd1.jpg',
};

describe('dds-lightbox-media-viewer | default', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(_defaultPath);
  });

  it('should check a11y', () => {
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should verify the image size 1:1', () => {
    cy.visit(`/${_defaultPath}${_args.img1x1}`)
      .get('.bx--image__img')
      .then($image => {
        expect($image.width()).to.equal($image.height());
      })
      .takeSnapshots();
  });

  it('should verify the image size 2:1', () => {
    cy.get('.bx--image__img').then($image => {
      expect($image.width() / 2).to.equal($image.height());
    });
  });

  it('should verify the image size 16:9', () => {
    cy.visit(`/${_defaultPath}${_args.img16x9}`);
    cy.get('.bx--image__img').then($image => {
      expect(($image.width() * 9) / 16).to.equal($image.height());
    });
    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.carbonThemesScreenshot();
  });
});

describe('dds-lightbox-media-viewer | embedded video player', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`${_defaultPath}${_args.video}`);
    cy.injectAxe();
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should render with all elements', () => {
    cy.get('dds-lightbox-media-viewer')
      .as('component')
      .should('have.attr', 'video-id')
      .and('not.be.empty')

      .get('@component')
      .find('[data-autoid="dds--video-player"]')
      .should('have.attr', 'video-id')
      .and('not.be.empty')

      .get('@component')
      .find('[data-autoid="dds--lightbox-media-viewer__content__desc"]')
      .should('not.be.empty')

      .takeSnapshots();
  });
});
