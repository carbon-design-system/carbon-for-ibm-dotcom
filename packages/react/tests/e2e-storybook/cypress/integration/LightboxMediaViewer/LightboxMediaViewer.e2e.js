/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct defaultPath for LightboxMediaViewer
 *
 * @type {string}
 * @private
 */
const _defaultPath =
  '/iframe.html?id=components-lightbox-media-viewer--default';
const _embeddedVideoPlayerPath =
  '/iframe.html?id=components-lightbox-media-viewer--embedded-video-player';

const _tests = {
  checkMediaMetadata() {
    cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]').should(
      'not.be.empty'
    );
    cy.get('[data-autoid="dds--lightbox-media-viewer__content__desc"]').should(
      'not.be.empty'
    );
  },
};

describe('LightboxMediaViewer | default', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  // it('should check a11y', () => {
  //   cy.visit(_defaultPath);
  //   cy.injectAxe();
  //   cy.checkAxeA11y();
  // });

  // it('should render with all elements', () => {
  //   cy.visit(`/${_defaultPath}`);

  //   cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
  //     .contains('Curabitur malesuada varius mi eu posuere')
  //   );

  //   cy.get('.bx--image__img')
  //     .should('be.visible')
  //     .then(() => {
  //       cy.get('[data-autoid="dds--image__longdescription"]').should(
  //         'have.length',
  //         1
  //       );
  //       cy.get('[data-autoid="dds--lightbox-media-viewer__content__desc"]')
  //         .should('be.visible')
  //         .then(() => {
  //           _tests.checkMediaMetadata();

  //           cy.takeSnapshots();
  //         });
  //     });
  // });

  // it('should align elements', () => {
  //   cy.visit(`/${_defaultPath}`);

  //   cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
  //     .contains('Curabitur malesuada varius mi eu posuere')
  //   );

  //   cy.get('.bx--image__img')
  //     .should('be.visible')
  //     .then(() => {
  //       cy.get('[data-autoid="dds--image__longdescription"]').then($image => {
  //         expect($image[0].getBoundingClientRect().left).to.equal(64);
  //       });

  //       cy.get('.bx--lightbox-media-viewer__content').then($content => {
  //         expect($content[0].getBoundingClientRect().right).to.equal(1280 - 64);
  //       });
  //     });
  // });

  it('should verify the image size 1:1', () => {
    cy.visit(
      `${_defaultPath}&knob-Image=https://fpoimg.com/720x720?text=1:1`
    );

    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--image__img')
      .should('be.visible')
      .then($image => {
        expect($image.width()).to.equal($image.height());

        cy.takeSnapshots();
      });
  });

  it('should verify the image size 2:1', () => {
    cy.visit(
      `${_defaultPath}&knob-Image=https://fpoimg.com/1312x656?text=2:1`
    );

    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--image__img')
      .should('be.visible')
      .then($image => {
        expect($image.width() / 2).to.equal($image.height());

        cy.takeSnapshots();
      });
  });

  it('should verify the image size 16:9', () => {
    cy.visit(`/${_defaultPath}`);

    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--image__img')
      .should('be.visible')
      .then($image => {
        expect(($image.width() * 9) / 16).to.equal($image.height());
      });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_defaultPath}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
        .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.carbonThemesScreenshot();
  });
});

describe('LightboxMediaViewer | embedded video player', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`/${_embeddedVideoPlayerPath}`);
  });

  it('should check a11y', () => {
    cy.visit(_embeddedVideoPlayerPath);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should render with all elements', () => {
    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    _tests.checkMediaMetadata();
    cy.takeSnapshots();
  });

  it('should align elements correctly', () => {
    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--video-player__video').then($video => {
      expect($video[0].getBoundingClientRect().left).to.equal(64);
    });

    cy.get('.bx--lightbox-media-viewer__content').then($content => {
      expect($content[0].getBoundingClientRect().right).to.equal(1280 - 64);
    });
  });

  it('should have interactive video controls', () => {
    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--video-player__video .controlsContainer').should(
      'not.be.empty'
    );

    // play/pause
    cy.get('.bx--video-player__video')
      .find('.playPauseBtn')
      .should('not.be.empty');

    // mute
    cy.get('.bx--video-player__video')
      .find('button[title="Mute"]')
      .should('not.be.empty');

    // full screen
    cy.get('.bx--video-player__video')
      .find('.fullScreenBtn')
      .should('not.be.empty');

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );
    cy.carbonThemesScreenshot();
  });

  it('should close the modal when close button is clicked', () => {
    cy.waitUntil(() => cy.get('[data-autoid="dds--lightbox-media-viewer__content__title"]')
      .contains('Curabitur malesuada varius mi eu posuere')
    );

    cy.get('.bx--modal-close').click();
    cy.takeSnapshots();
  });
});
