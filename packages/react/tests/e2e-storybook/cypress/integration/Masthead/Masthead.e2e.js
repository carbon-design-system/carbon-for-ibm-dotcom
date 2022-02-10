/**
 * Copyright IBM Corp. 2021, 2022
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

describe('Masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathDefault);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
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

    cy.takeSnapshots();
  });

  it('should render 4 menu items', () => {
    cy.get('.bx--masthead__megamenu__l0-nav').should('have.length', 4);
  });

  it('should load the megamenu - first nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').trigger('click');

    cy.takeSnapshots();
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]').trigger('click');

    cy.takeSnapshots();
  });

  it('should load the megamenu - third nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav2"]').trigger('click');

    cy.takeSnapshots();
  });

  it('should load the megamenu - fourth nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav3"]').trigger('click');

    cy.takeSnapshots();
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
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').trigger('click');

    cy.takeSnapshots();
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-account"]').trigger('click');
    cy.get('.bx--masthead__profile-item').should('have.length', 2);
  });

  it('should open the search bar on click', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').trigger('click');

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-search"]').trigger('click');

    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .type('redhat', { force: true });

    cy.get('.react-autosuggest__suggestions-list li').should('have.length', 10);

    cy.takeSnapshots();
  });
});

describe('Masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(_pathDefault);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').first().should('not.be.empty'));
  });

  it('should load the mobile menu', () => {
    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-menu"]').trigger('click');

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | menu level 2', () => {
    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-menu"]').trigger('click');
    cy.get('[data-autoid="dds--masthead-default-sidenav__l0-nav0"]').trigger('click');

    cy.takeSnapshots('mobile');
  });
});

describe('Masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathCustom);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
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

    cy.waitUntil(() =>
      cy.get('.bx--header__nav-caret-right').then($elem => $elem.is(':visible'))
    );

    cy.takeSnapshots();
  });

  it('should load regular menu - custom first nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.takeSnapshots();
  });

  it('should load regular menu - custom second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]')
      .click()
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.takeSnapshots();
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

    cy.takeSnapshots();
  });

  it('should load regular menu - custom fifth nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav4"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('.bx--header__nav-caret-right').click();
    cy.waitUntil(() =>
      cy
        .get('.bx--header__nav-caret-right')
        .then($elem => !$elem.is(':visible'))
    );

    cy.get('.bx--header__nav-caret-left').should('be.visible');

    cy.takeSnapshots();
  });
});

describe('Masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathPlatform);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
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

    cy.takeSnapshots();
  });
});

describe('Masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathl1);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
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

    cy.waitUntil(() =>
      cy.get('.bx--header__nav-caret-right').then($elem => $elem.is(':visible'))
    );

    cy.takeSnapshots();
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
    cy.waitUntil(() =>
      cy
        .get('.bx--header__nav-caret-right')
        .then($elem => !$elem.is(':visible'))
    );

    cy.get('.bx--header__nav-caret-left').should('be.visible');

    cy.takeSnapshots();
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

describe('Masthead | search open onload (desktop)', () => {
  beforeEach(() => {
    // TODO: fix the uncaught exception in Firefox only
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('Request aborted')) {
        return false;
      }
    });

    cy.visit(`/${_pathSearchOpenOnload}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load search field open by default', () => {
    cy.get('[data-autoid="dds--masthead__search"]')
      .find('input[data-autoid="dds--header__search--input"]')
      .should('be.visible');

    cy.takeSnapshots();
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

    cy.takeSnapshots();
  });

  it('should not display menu options while search field is open', () => {
    cy.get('.bx--header__nav-container').should('have.css', 'display', 'none');
  });
});
