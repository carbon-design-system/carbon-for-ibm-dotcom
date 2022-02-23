/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom =
  '/iframe.html?id=components-masthead--with-custom-navigation';

describe('Masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathCustom);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
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
      .trigger('click')
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });

    cy.takeSnapshots();
  });

  it('should load regular menu - custom second nav item', () => {
    cy.get('[data-autoid="dds--masthead-default__l0-nav1"]')
      .trigger('click')
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
    cy.get('.bx--header__nav-caret-right').trigger('click');
    cy.get('[data-autoid="dds--masthead-default__l0-nav3"]')
      .trigger('click')
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
    cy.get('.bx--header__nav-caret-right').trigger('click');
    cy.waitUntil(() =>
      cy
        .get('.bx--header__nav-caret-right')
        .then($elem => !$elem.is(':visible'))
    );

    cy.get('.bx--header__nav-caret-left').should('be.visible');

    cy.takeSnapshots();
  });
});
