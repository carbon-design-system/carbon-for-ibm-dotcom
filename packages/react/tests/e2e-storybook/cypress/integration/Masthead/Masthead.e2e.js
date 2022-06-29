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
    cy.get('.bx--header__menu-item').each(
      $menuItem => {
        if ($menuItem.attr('aria-label') === 'Consulting & Services') {
          expect($menuItem).to.have.attr('data-selected', 'true');
        } else {
          expect($menuItem).to.have.attr('data-selected', 'false');
        }
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
      '.bx--header__submenu a.bx--masthead__megamenu__category-sublink--highlighted'
    ).then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get(
      '.bx--header__submenu a.bx--masthead__megamenu__category-sublink'
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
