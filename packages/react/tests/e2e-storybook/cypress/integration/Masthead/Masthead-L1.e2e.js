/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with L1)
 *
 * @type {string}
 * @private
 */
const _pathl1 = '/iframe.html?id=components-masthead--with-l-1';

describe('Masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathl1);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-eco__l1-nav0"]').first().should('not.be.empty'));
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
      .trigger('click')
      .find('a')
      .then($menuItem => {
        expect($menuItem).to.have.attr('aria-expanded', 'true');
      });
  });

  it('should load L1 menu - second L1 nav item', () => {
    cy.get('[data-autoid="dds--masthead-eco__l1-nav1"]')
      .trigger('click')
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
      .trigger('click')
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
    cy.get('.bx--header__nav-caret-right').trigger('click');
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
