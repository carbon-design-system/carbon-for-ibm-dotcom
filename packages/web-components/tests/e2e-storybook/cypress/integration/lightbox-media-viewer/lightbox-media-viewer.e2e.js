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
const _embeddedVideoPlayerPath = '/iframe.html?id=components-lightbox-media-viewer--embedded-video-player';

const _tests = {
  checkMediaMetadata() {
    cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]').should('not.be.empty');
    cy.get('[data-autoid="dds--lightbox-media-viewer__content__desc"]').should('not.be.empty');
  },
};

describe('dds-lightbox-media-viewer | default', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.visit(`/${_defaultPath}`);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should render with all elements', () => {
    cy.visit(`/${_defaultPath}`);

    cy.get('dds-lightbox-image-viewer')
      .should('have.attr', 'default-src')
      .should('not.be.empty');
    _tests.checkMediaMetadata();

    cy.takeSnapshots();
  });

  it('should align elements', () => {
    cy.visit(`/${_defaultPath}`);

    cy.get('dds-lightbox-image-viewer')
      .shadow()
      .find('.bx--image__img')
      .then($image => {
        expect($image[0].getBoundingClientRect().left).to.equal(64);
      });

    cy.get('dds-lightbox-image-viewer')
      .shadow()
      .find('.bx--lightbox-media-viewer__content')
      .then($content => {
        expect($content[0].getBoundingClientRect().right).to.equal(1280 - 64);
      });
  });

  it('should verify the image size 1:1', () => {
    cy.visit(`/${_defaultPath}&knob-Image%20(default-src)_LightboxImageViewer=23163c123ccb40d86a8b44fae716c453.jpg`);
    cy.get('.bx--image__img').then($image => {
      expect($image.width()).to.equal($image.height());
    });
    cy.takeSnapshots();
  });

  it('should verify the image size 2:1', () => {
    cy.visit(`/${_defaultPath}`);
    cy.get('dds-lightbox-image-viewer')
      .shadow()
      .find('.bx--image__img')
      .then($image => {
        expect($image.width() / 2).to.equal($image.height());
      });
  });

  it('should verify the image size 16:9', () => {
    cy.visit(`/${_defaultPath}&knob-Image%20(default-src)_LightboxImageViewer=3a7714edad00ad8b4f6f19f94ab56dd1.jpg`);
    cy.get('dds-lightbox-image-viewer')
      .shadow()
      .find('.bx--image__img')
      .then($image => {
        expect(($image.width() * 9) / 16).to.equal($image.height());
      });
    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_defaultPath}`);
    cy.viewport(1280, 780);
    cy.carbonThemesScreenshot();
  });
});

describe('dds-lightbox-media-viewer | embedded video player', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`/${_embeddedVideoPlayerPath}`);
    cy.injectAxe();
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should render with all elements', () => {
    cy.get('dds-lightbox-video-player').should('not.be.empty');
    cy.get('dds-lightbox-video-player')
      .find('.bx--video-player__video')
      .should('not.be.empty');
    _tests.checkMediaMetadata();
    cy.takeSnapshots();
  });

  it('should align elements correctly', () => {
    cy.get('dds-lightbox-video-player')
      .find('.bx--video-player__video')
      .then($video => {
        expect($video[0].getBoundingClientRect().left).to.equal(64);
      });

    cy.get('dds-lightbox-video-player')
      .shadow()
      .find('.bx--lightbox-media-viewer__content')
      .then($content => {
        expect($content[0].getBoundingClientRect().right).to.equal(1280 - 64);
      });
  });

  it('should have interactive video controls', () => {
    cy.get('.bx--video-player__video .controlsContainer').should('not.be.empty');

    // play/pause
    cy.get('.bx--video-player__video iframe')
      .find('.playPauseBtn')
      .should('not.be.empty');

    // mute
    cy.get('.bx--video-player__video iframe')
      .find('button[title="Mute"]')
      .should('not.be.empty');

    // full screen
    cy.get('.bx--video-player__video iframe')
      .find('.fullScreenBtn')
      .should('not.be.empty');

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.viewport(1280, 780);
    cy.carbonThemesScreenshot();
  });

  it('should close the modal when close button is clicked', () => {
    cy.get('dds-expressive-modal').then($modal => {
      expect($modal[0].open).to.equal(true);
    });
    cy.get('.bx--modal-close').click();
    cy.get('dds-expressive-modal').then($modal => {
      expect($modal[0].open).to.equal(false);
    });
  });
});
