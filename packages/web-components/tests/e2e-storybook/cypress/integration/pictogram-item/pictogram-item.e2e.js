/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Pictogram item)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-pictogram-item--default';

describe('dds-pictogram-item | Pictogram item (desktop)', () => {
  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
    cy.get('[data-autoid="dds--pictogram-item"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--pictogram-item__pictogram"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--content-item__heading"]').should('have.length', 1);
    cy.screenshot();

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-pictogram-item | Pictogram item (desktop)', {
    //   widths: [1280],
    // });
  });

  it('should check that the Link with icon is loaded and clickable', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
    const linkWithIcon = cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--link-with-icon"]');
    linkWithIcon.should('have.length', 1);
    linkWithIcon
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support customizable pictogram SVGs', () => {
    cy.visit(`/${_pathDefault}&knob-Pictogram%20(required)_PictogramItem=Touch`);
    cy.viewport(1280, 780);
    cy.screenshot();

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot(
    //   'PictogramItem | Pictogram item w/Touch pictogram (desktop)',
    //   {
    //     widths: [1280],
    //   }
    // );
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g100`);
    cy.viewport(1280, 780);
    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (desktop) | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g90`);
    cy.viewport(1280, 780);
    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (desktop) | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(1280, 780);
    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (desktop) | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-pictogram-item | Pictogram item (mobile)', () => {
  it('should load pictogram item and content', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
    cy.get('[data-autoid="dds--pictogram-item"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--pictogram-item__pictogram"]').should('have.length', 1);
    cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--content-item__heading"]').should('have.length', 1);
    cy.screenshot();

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-pictogram-item | Pictogram item (mobile)', {
    //   widths: [320],
    // });
  });

  it('should check that the Link with icon is loaded and clickable', () => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
    const linkWithIcon = cy.get('[data-autoid="dds--pictogram-item"] [data-autoid="dds--link-with-icon"]');
    linkWithIcon.should('have.length', 1);
    linkWithIcon
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support customizable pictogram SVGs', () => {
    cy.visit(`/${_pathDefault}&knob-Pictogram%20(required)_PictogramItem=Touch`);
    cy.viewport(320, 780);
    cy.screenshot();

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot(
    //   'PictogramItem | Pictogram item w/Touch pictogram (mobile)',
    //   {
    //     widths: [320],
    //   }
    // );
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g100`);
    cy.viewport(320, 780);
    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (mobile) | g100 theme', {
      //   widths: [320],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g90`);
    cy.viewport(320, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (mobile) | g90 theme', {
      //   widths: [320],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathDefault}&theme=g10`);
    cy.viewport(320, 780);
    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');
      cy.wait(500);
      cy.screenshot();

      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-pictogram-item | Pictogram item (mobile) | g10 theme', {
      //   widths: [320],
      // });
    });
  });
});
