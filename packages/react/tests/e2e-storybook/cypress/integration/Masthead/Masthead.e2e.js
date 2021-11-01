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

/**
 * Sets the correct path (Masthead search open onload)
 *
 * @type {string}
 * @private
 */
const _pathSearchOpenOnload =
  '/iframe.html?id=components-masthead--search-open-onload';

describe('Masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
    cy.visit(_pathDefault);
    cy.viewport(1280, 780);
  });

  it('should have url for IBM logo', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-logo"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load menu item with selected state', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"] a').then(
      $menuItem => {
        expect($menuItem).to.have.attr('data-selected', 'true');
      }
    );

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | menu item with selected state', {
      widths: [1280],
    });
  });

  it('should render 4 menu items', () => {
    cy.get('.bx--masthead__megamenu__l0-nav').should('have.length', 4);
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

  it('should load the megamenu - third nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav2"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 3)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - fourth nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav3"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | mega menu (nav 4)', {
      widths: [1280],
    });
  });

  it('should have urls for the submenu items within the megamenu', () => {
    cy.get(
      '[data-autoid="dds--masthead-default__l0-nav0"] a.bx--masthead__megamenu__category-sublink--highlighted'
    ).then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get(
      '[data-autoid="dds--masthead-default__l0-nav0"] a.bx--masthead__megamenu__category-sublink'
    ).then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
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

  it('should have 2 menu items under the login menu', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').click();
    cy.get('.bx--masthead__profile-item').should('have.length', 2);
  });

  it('should open the search bar on click', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead |  search bar opens', {
      widths: [1280],
    });
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').click();

    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .type('redhat', { force: true });

    cy.get('.react-autosuggest__suggestions-list li').should('have.length', 10);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'Masthead |  allow for keywords in search bar and display 10 suggested results',
      {
        widths: [1280],
      }
    );
  });
});

describe('Masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
    cy.visit(_pathDefault);
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
    cy.mockMastheadFooterData();
    cy.visit(_pathCustom);
    cy.viewport(1280, 780);
  });

  it('should render 5 custom menu items', () => {
    cy.get('.bx--header__menu-bar > li').should('have.length', 5);
  });

  it('should load custom menu item with selected state', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"] a').then(
      $menuItem => {
        expect($menuItem).to.have.attr('data-selected', 'true');
      }
    );

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom menu item with selected state', {
      widths: [1280],
    });
  });

  it('should load regular menu - custom first nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]')
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

  it('should load regular menu - custom second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]')
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

  it('should load regular menu - custom third nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav2"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load regular menu - custom fourth nav item', () => {
    cy.get('.bx--header__nav-caret-right').click();
    cy.get('[data-autoid="dds--masthead-default__l0-nav3"]')
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

  it('should load regular menu - custom fifth nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav4"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should scroll the L0 overflow properly', () => {
    cy.document().then($document => {
      $document.querySelector('head').insertAdjacentHTML(
        'beforeend',
        `
      <style>
        /* Disable CSS transitions. */
        * { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important; }
        /* Disable CSS animations. */
        * { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; }
        /* Reset values on non-opaque/offscreen framer-motion components. */
        *[style*="opacity"] { opacity: 1 !important; }
        *[style*="transform"] { transform: none !important; }
      </style>
    `
      );
    });

    cy.get('.bx--header__nav-caret-right').click();

    // TODO: find a better way to handle the slide animation
    cy.wait(800);

    cy.get('.bx--header__nav-caret-right-container').then($button => {
      expect($button).to.have.attr('hidden');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | custom - overflow', {
      widths: [1280],
    });
  });
});

describe('Masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
    cy.visit(_pathPlatform);
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
    cy.mockMastheadFooterData();
    cy.visit(_pathl1);
    cy.viewport(1280, 780);
  });

  it('should render platform below the IBM logo', () => {
    cy.get('.bx--masthead__l1-name-title').then($platform => {
      cy.get('[data-autoid="dds--masthead-eco__l0-logo"]').then($logo => {
        expect($logo[0].getBoundingClientRect().down).to.equal(
          $platform[0].parentElement.getBoundingClientRect().up
        );
      });
    });
  });

  it('should render 5 menu items', () => {
    cy.get('.bx--header__menu-bar > li').should('have.length', 5);
  });

  it('should load L1 menu item with selected state', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav0"] a').then($menuItem => {
      expect($menuItem).to.have.attr('data-selected', 'true');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | menu item with selected state', {
      widths: [1280],
    });
  });

  it('should load L1 menu - first L1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav0"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });
  });

  it('should load L1 menu - second L1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav1"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });
  });

  it('should load third nav L1 item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav2"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load L1 menu - fourth L1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav3"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });
  });

  it('should load fifth nav L1 item', () => {
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

  it('should load platform containing a link', () => {
    cy.get('.bx--masthead__l1-name-title')
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });
});

describe('dds-masthead | search open onload (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathSearchOpenOnload}`);
    cy.viewport(1280, 780);
  });

  it('should load search field open by default', () => {
    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .should('be.visible');

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'Masthead | Search open onload | load search field open by default',
      {
        widths: [1280],
      }
    );
  });

  it('should have typable search field', () => {
    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .type('test')
      .should('have.value', 'test');
  });

  it('should display 10 auto suggest results', () => {
    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .type('test')
      .get('.react-autosuggest__suggestions-list li')
      .should('have.length', 10);

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'Masthead | Search open onload | display 10 auto suggest results',
      {
        widths: [1280],
      }
    );
  });

  it('should not display menu options while search field is open', () => {
    cy.get('.bx--header__nav-container').should('have.css', 'display', 'none');
  });
});
