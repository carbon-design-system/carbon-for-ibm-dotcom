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

const _selectors = {
  masthead: 'c4d-masthead',
  mastheadLogo: 'c4d-masthead-logo',
  mastheadSearchTypeBar: 'c4d-search-with-typeahead',
  mastheadSearchResultItem: 'c4d-search-with-typeahead-item',
  mastheadSearchBtn: '.cds--header__search--search',
  mastheadMenuItem: 'c4d-top-nav-item',
  mastheadDropDownMenuItem: 'c4d-megamenu-top-nav-menu',
  mastheadProfileBtn: 'c4d-masthead-profile',
  mastheadProfileItems: 'c4d-masthead-profile-item',
  mastheadMenuBtnMobile: 'c4d-masthead-menu-button',
}

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
    cy.get(_selectors.mastheadLogo)
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load menu item with selected state', () => {
    let selectedState = false;
    cy.get(_selectors.mastheadMenuItem)
      .each($menuItem => {
        if ($menuItem.attr('active') !== undefined) {
          selectedState = true;
        }
        console.log($menuItem,'TB');
      })
      .then(() => {
        expect(selectedState).to.be.true;
      });

    cy.takeSnapshots();
  });

  it('should load a megamenu with links', () => {
    cy.get(`${_selectors.mastheadDropDownMenuItem}:nth-child(2)`)
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have urls for the submenu items within the megamenu', () => {
    // Click to open the megamenu that we're interested in inspecting, since
    // due to lazy loading, it's not in the DOM by default.
    cy.get(`${_selectors.mastheadDropDownMenuItem}:nth-child(2)`)
      .shadow()
      .find('[part=trigger]')
      .click();

    cy.get(
      'c4d-megamenu-right-navigation >  c4d-megamenu-category-group > c4d-megamenu-category-link:nth-child(1)'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should open the login menu', () => {
    cy.get(_selectors.mastheadProfileBtn)
      .shadow()
      .find('a')
      .click();

    cy.takeSnapshots();
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get(_selectors.mastheadProfileItems).should('have.length', 2);
  });

  it('should open the search bar on click', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchTypeBar}`)
      .shadow()
      .find(_selectors.mastheadSearchBtn)
      .click();

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchTypeBar}`)
      .shadow()
      .find(_selectors.mastheadSearchBtn)
      .click();

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchTypeBar}`)
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('redhat', { force: true });

    cy.get(_selectors.mastheadSearchResultItem).should('have.length', 10);

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
    cy.get(_selectors.mastheadMenuBtnMobile)
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 2', () => {
    cy.get(_selectors.mastheadMenuBtnMobile)
      .shadow()
      .find('button')
      .click();

    cy.get('c4d-left-nav-menu-section:nth-child(1) > c4d-left-nav-menu:nth-child(2)')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });
});
