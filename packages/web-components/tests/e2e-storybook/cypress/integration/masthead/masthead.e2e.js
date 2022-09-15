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

describe('dds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have url for IBM logo', () => {
    cy.get('dds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load menu item with selected state', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(3)').then($menuItem => {
      expect($menuItem).to.have.attr('active');
    });

    cy.takeSnapshots();
  });

  it('should render 5 menu items', () => {
    cy.get('dds-megamenu-top-nav-menu').should('have.length', 5);
  });

  it('should be a link - first nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(1)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(2)')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should load the megamenu - third nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(3)')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should load the megamenu - fourth nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(4)')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should load the megamenu - fifth nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(5)')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have urls for the submenu items within the megamenu', () => {
    cy.get(
      'dds-megamenu-top-nav-menu:nth-child(2) > dds-megamenu >  dds-megamenu-right-navigation >  dds-megamenu-category-group > dds-megamenu-category-link:nth-child(1)'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get(
      'dds-megamenu-top-nav-menu:nth-child(2) > dds-megamenu >  dds-megamenu-left-navigation >  dds-megamenu-category-group > dds-megamenu-link-with-icon'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should open the login menu', () => {
    cy.get('dds-masthead-profile')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get('dds-masthead-profile-item').should('have.length', 2);
  });

  it('should open the search bar on click', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('redhat', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });
});

describe('dds-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load the mobile menu', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 2', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.get('dds-left-nav-menu-section:nth-child(2) > dds-left-nav-menu:nth-child(1)')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });
});
