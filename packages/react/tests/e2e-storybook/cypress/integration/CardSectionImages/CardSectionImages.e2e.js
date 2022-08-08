/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Card section images - Default)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-card-section-images--default';

describe('dds-card-section-images | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load clickable card with images and content', () => {
    cy.get('[data-autoid="dds--card"][href] a.bx--card__footer').each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get(
      '[data-autoid="dds--card"] [data-autoid="dds--image__longdescription"] img'
    ).each($img => {
      expect($img).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__heading').each($heading => {
      expect($heading).to.be.visible;
    });
  });

  it('should load heading bold and left aligned', () => {
    cy.get(
      '[data-autoid="dds--card-group-images-group"] .bx--content-section__heading'
    ).then($heading => {
      expect($heading.css('textAlign')).to.be.eq('start');
      expect($heading.css('fontWeight')).to.be.eq('600');
    });
  });

  it('should load cards content', () => {
    cy.get('[data-autoid="dds--card"] .bx--card__eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__heading').each($heading => {
      expect($heading).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"][href] a.bx--card__footer')
      .find('svg path')
      .each($icon => {
        expect($icon).to.have.attr(
          'd',
          'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
        );
      });

    cy.wait(3000);

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);

    cy.wait(3000);

    cy.carbonThemesScreenshot();
  });
});

describe('dds-card-section-images | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load clickable card with images and content', () => {
    cy.get('[data-autoid="dds--card"][href] a.bx--card__footer').each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get(
      '[data-autoid="dds--card"] [data-autoid="dds--image__longdescription"] img'
    ).each($img => {
      expect($img).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__heading').each($heading => {
      expect($heading).to.be.visible;
    });
  });

  it('should load heading bold and left aligned', () => {
    cy.get(
      '[data-autoid="dds--card-group-images-group"] .bx--content-section__heading'
    ).then($heading => {
      expect($heading.css('textAlign')).to.be.eq('start');
      expect($heading.css('fontWeight')).to.be.eq('600');
    });
  });

  it('should load cards content', () => {
    cy.get('[data-autoid="dds--card"] .bx--card__eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"] .bx--card__heading').each($heading => {
      expect($heading).to.be.visible;
    });

    cy.get('[data-autoid="dds--card"][href] a.bx--card__footer')
      .find('svg path')
      .each($icon => {
        expect($icon).to.have.attr(
          'd',
          'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
        );
      });

    cy.wait(3000);

    cy.takeSnapshots('mobile');
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.wait(3000);

    cy.carbonThemesScreenshot(
      {},
      {
        widths: [320],
      }
    );
  });
});
