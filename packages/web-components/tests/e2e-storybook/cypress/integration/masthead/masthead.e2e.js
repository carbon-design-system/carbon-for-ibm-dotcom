/**
 * Copyright IBM Corp. 2021, 2023
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

describe('cds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have url for IBM logo', () => {
    cy.get('cds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load menu item with selected state', () => {
    let selectedState = false;
    cy.get('cds-megamenu-top-nav-menu')
      .each($menuItem => {
        if ($menuItem.attr('active') !== undefined) {
          selectedState = true;
        }
      })
      .then(() => {
        expect(selectedState).to.be.true;
      });

    cy.takeSnapshots();
  });

  it('should load a megamenu with links', () => {
    cy.get('cds-megamenu-top-nav-menu:nth-child(2)')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have urls for the submenu items within the megamenu', () => {
    // Click to open the megamenu that we're interested in inspecting, since
    // due to lazy loading, it's not in the DOM by default.
    cy.get('cds-megamenu-top-nav-menu:nth-child(2)')
      .shadow()
      .find('[part=trigger]')
      .click();

    cy.get(
      'cds-megamenu-top-nav-menu:nth-child(2) > cds-megamenu >  cds-megamenu-right-navigation >  cds-megamenu-category-group > cds-megamenu-category-link:nth-child(1)'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should open the login menu', () => {
    cy.get('cds-masthead-profile')
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get('cds-masthead-profile-item').should('have.length', 2);
  });

  it('should open the search bar on click', () => {
    cy.get('cds-masthead > cds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('cds-masthead > cds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('cds-masthead > cds-search-with-typeahead')
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('redhat', { force: true });

    cy.get('cds-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });
});

describe('cds-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load the mobile menu', () => {
    cy.get('cds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 2', () => {
    cy.get('cds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.get('cds-left-nav-menu-section:nth-child(1) > cds-left-nav-menu:nth-child(2)')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });
});
