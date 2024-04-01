/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with scoped search)
 *
 * @type {string}
 * @private
 */

const _selectors = {
  masthead: 'c4d-masthead',
  mastheadNavName: 'c4d-top-nav-name',
  mastheadSearchBar: 'c4d-search-with-typeahead',
  mastheadSearchButton: '.cds--header__search--search',
  mastheadScopedSearchDropDown: 'c4d-scoped-search-dropdown',
  mastheadScopedSearchDropDownMobile: 'c4d-scoped-search-dropdown-mobile',
  mastheadSearchItem: 'c4d-search-with-typeahead-item',
  mastheadDropDownButton: '.cds--dropdown',
  mastheadDropDownButtonMobile: '.cds--select-input',
  mastheadDropDownItem: 'cds-dropdown-item',
}

const _pathScopedSearch = '/iframe.html?id=components-masthead--with-scoped-search';

describe('c4d-masthead | scoped search (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathScopedSearch}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should open the search bar on click', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.takeSnapshots();
  });

  it('should retrieve regular results with "all" scope', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDown).should('have.value', 'all');

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get(_selectors.mastheadSearchItem).should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should retrieve less results with "pw" scope', () => {
    // Mock scoped search typeahead API
    cy.intercept('**/search/typeahead/v1?*', {
      fixture: 'scoped-typeahead.json',
    });

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDown)
      .shadow()
      .find(_selectors.mastheadDropDownButton)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDown)
      .find(`${_selectors.mastheadDropDownItem}[value="pw"]`)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDown).should('have.value', 'pw');

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get(_selectors.mastheadSearchItem).should('have.length', 5);
    cy.takeSnapshots();
  });
});

describe('c4d-masthead | scoped search (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathScopedSearch}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should open the search bar on click', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.takeSnapshots();
  });

  it('should retrieve regular results with "all" scope', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDownMobile).should('have.value', 'all');

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get(_selectors.mastheadSearchItem).should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should retrieve less results with "pw" scope', () => {
    // Mock scoped search typeahead API
    cy.intercept('**/search/typeahead/v1?*', {
      fixture: 'scoped-typeahead.json',
    });

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find(_selectors.mastheadSearchButton)
      .click();

    cy.get(_selectors.mastheadScopedSearchDropDownMobile)
      .shadow()
      .find(_selectors.mastheadDropDownButtonMobile)
      .select('pw');
    cy.get(_selectors.mastheadScopedSearchDropDownMobile).should('have.value', 'pw');

    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get(_selectors.mastheadSearchItem).should('have.length', 5);
    cy.takeSnapshots();
  });
});
