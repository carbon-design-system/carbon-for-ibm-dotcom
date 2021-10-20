/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-masthead--default';

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom =
  '/iframe.html?id=components-masthead--with-custom-navigation';

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('Masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should load the megamenu - first nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 0)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 1)', {
      widths: [1280],
    });
  });

  it('should open the login menu', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | profile menu', {
      widths: [1280],
    });
  });
});

describe('Masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load the mobile menu', () => {
    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-menu"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mobile menu', {
      widths: [320],
    });

    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mobile menu level 2', {
      widths: [320],
    });
  });
});

describe('Masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathCustom}`);
    cy.viewport(1280, 780);
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom - overflow', {
      widths: [1280],
    });
  });
});

describe('Masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathPlatform}`);
    cy.viewport(1280, 780);
  });

  it('should contain link', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      }
    );
  });

  it('should be next to IBM logo', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $platform => {
        cy.get('[data-autoid="dds--masthead-eco__l0-logo"]').then($logo => {
          expect($logo[0].getBoundingClientRect().right).to.equal(
            $platform[0].parentElement.getBoundingClientRect().left
          );
        });
      }
    );
  });

  it('should open the search bar with platform', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-search"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | with platform - search', {
      widths: [1280],
    });
  });
});
