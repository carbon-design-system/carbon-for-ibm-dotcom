/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { Children } = require('react');

/**
 * Sets the correct path (default Content Group Pictograms Default)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-content-group-pictograms--default';

describe('dds-content-group-pictograms | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`dds-pictogram-item`).then(() => {
      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-heading`)
        .should('be.visible');

      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-copy`)
        .should('be.visible');
    });

    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-content-group-pictograms | default (desktop) | should load content group heading and copy before the pictograms',
      {
        widths: [1280],
      }
    );
  });

  it('should load pictogram item and content', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('svg[slot="pictogram"]').should('be.visible');

        cy.get('dds-content-item-heading').should('be.visible');

        cy.get('dds-content-item-copy').should('be.visible');

        cy.get('dds-link-with-icon').should('be.visible');
      });
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-pictograms | default (desktop) | should load pictogram item and content', {
      widths: [1280],
    });
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('dds-link-with-icon')
          .shadow()
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-content-group-pictograms | default (desktop) | should have CTA Link with icon loaded and clickable for each pictogram',
      {
        widths: [1280],
      }
    );
  });

  it('should have customizable pictogram item', () => {
    // TODO d. Pictogram item can be customized (desktop, touch, pattern)

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-pictograms | default (desktop) | should have customizable pictogram item', {
      widths: [1280],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();

      cy.percySnapshot('dds-content-group-pictograms | short with image | g10 theme', {
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

      cy.percySnapshot('dds-content-group-pictograms | default (desktop) | g90 theme', {
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

      cy.percySnapshot('dds-content-group-pictograms | default (desktop) | g100 theme', {
        widths: [1280],
      });
    });
  });
});

describe('dds-content-group-pictograms | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load content group heading and copy before the pictograms', () => {
    cy.get(`dds-pictogram-item`).then(() => {
      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-heading`)
        .should('be.visible');

      cy.get(`dds-content-group-pictograms`)
        .find(`dds-content-group-copy`)
        .should('be.visible');
    });

    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-content-group-pictograms | default (mobile) | should load content group heading and copy before the pictograms',
      {
        widths: [1280],
      }
    );
  });

  it('should load pictogram item and content', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('svg[slot="pictogram"]').should('be.visible');

        cy.get('dds-content-item-heading').should('be.visible');

        cy.get('dds-content-item-copy').should('be.visible');

        cy.get('dds-link-with-icon').should('be.visible');
      });
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-pictograms | default (mobile) | should load pictogram item and content', {
      widths: [320],
    });
  });

  it('should have CTA Link with icon loaded and clickable for each pictogram', () => {
    cy.get(`dds-pictogram-item`).each($item => {
      cy.wrap($item).within(() => {
        cy.get('dds-link-with-icon')
          .shadow()
          .find('a')
          .each($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-content-group-pictograms | default (mobile) | should have CTA Link with icon loaded and clickable for each pictogram',
      {
        widths: [320],
      }
    );
  });

  it('should have customizable pictogram item', () => {
    // TODO d. Pictogram item can be customized (desktop, touch, pattern)

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-pictograms | default (mobile) | should have customizable pictogram item', {
      widths: [320],
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(320, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();

      cy.percySnapshot('dds-content-group-pictograms | short with image | g10 theme', {
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

      cy.percySnapshot('dds-content-group-pictograms | default (mobile) | g90 theme', {
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

      cy.percySnapshot('dds-content-group-pictograms | default (mobile) | g100 theme', {
        widths: [320],
      });
    });
  });
});
