/**
 * Copyright IBM Corp. 2021
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
    cy.viewport(1280, 780);
  });

  it('should load clickable card with images and content', () => {
    cy.get('dds-card-group-item > dds-card-cta-footer')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get('dds-card-group-item > dds-image').each($img => {
      expect($img).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-heading').each($heading => {
      expect($heading).to.be.visible;
    });
  });

  it('should load heading bold and left aligned', () => {
    cy.get('dds-content-section-heading').then($heading => {
      expect($heading.css('textAlign')).to.be.eq('start');
      expect($heading.css('fontWeight')).to.be.eq('600');
    });
  });

  it('should load cards content', () => {
    cy.get('dds-card-group-item > dds-card-eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-heading').each($heading => {
      expect($heading).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-cta-footer')
      .find('svg path')
      .each($icon => {
        expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
      });

    cy.screenshot();

    cy.percySnapshot('dds-card-section-images | default (desktop) | should load cards content', {
      widths: [1280],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (desktop) | g10 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (desktop) | g90 theme', {
        widths: [1280],
      });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (desktop) | g100 theme', {
        widths: [1280],
      });
    });
  });
});

describe('dds-card-section-images | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load clickable card with images and content', () => {
    cy.get('dds-card-group-item > dds-card-cta-footer')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get('dds-card-group-item > dds-image').each($img => {
      expect($img).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-heading').each($heading => {
      expect($heading).to.be.visible;
    });
  });

  it('should load heading bold and left aligned', () => {
    cy.get('dds-content-section-heading').then($heading => {
      expect($heading.css('textAlign')).to.be.eq('start');
      expect($heading.css('fontWeight')).to.be.eq('600');
    });
  });

  it('should load cards content', () => {
    cy.get('dds-card-group-item > dds-card-eyebrow').each($eyebrow => {
      expect($eyebrow).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-heading').each($heading => {
      expect($heading).to.be.visible;
    });

    cy.get('dds-card-group-item > dds-card-cta-footer')
      .find('svg path')
      .each($icon => {
        expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
      });

    cy.screenshot();

    cy.percySnapshot('dds-card-section-images | default (mobile) | should load cards content', {
      widths: [320],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(320, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (mobile) | g10 theme', {
        widths: [320],
      });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g90`);
    cy.viewport(320, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (mobile) | g90 theme', {
        widths: [320],
      });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g100`);
    cy.viewport(320, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();

      cy.percySnapshot('dds-card-section-images | default (mobile) | g100 theme', {
        widths: [320],
      });
    });
  });
});
