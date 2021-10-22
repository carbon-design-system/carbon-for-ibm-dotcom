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

/**
 * Sets the correct path (Masthead with L1)
 *
 * @type {string}
 * @private
 */
const _pathl1 = '/iframe.html?id=components-masthead--with-l-1';

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

  it('should load platform containing a link', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      }
    );
  });

  it('should render platform next to IBM logo', () => {
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

describe('Masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathl1}`);
    cy.viewport(1280, 780);
  });

  it('should render 5 menu items', () => {
    cy.get('.bx--header__menu-bar > li').should('have.length', 5);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | Number of custom menu items', {
      widths: [1280],
    });
  });

  it('should load l1 menu item with selected state', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav0"] a').then($menuItem => {
      expect($menuItem).to.have.attr('data-selected', 'true');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | menu item with selected state', {
      widths: [1280],
    });
  });

  it('should load regular menu - first l1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav0"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom nav (nav 0)', {
      widths: [1280],
    });
  });

  it('should load regular menu - second l1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav1"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom nav (nav 1)', {
      widths: [1280],
    });
  });

  it('should load third nav l1 item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav2"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load regular menu - fourth l1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav3"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom nav (nav 3)', {
      widths: [1280],
    });
  });

  it('should load fifth nav l1 item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav4"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should scroll the L1 overflow properly', () => {
    cy.get('.bx--header__nav-caret-right').click();

    cy.wait(500);

    cy.get('.bx--header__nav-caret-right-container').then($button => {
      expect($button).to.have.attr('hidden');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | with L1 - overflow', {
      widths: [1280],
    });
  });
});
