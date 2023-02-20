/**
 * Copyright IBM Corp. 2021, 2023
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
const _pathScopedSearch = '/iframe.html?id=components-masthead--with-scoped-search';

describe('dds-masthead | scoped search (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathScopedSearch}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should open the search bar on click', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should retrieve regular results with "all" scope', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-scoped-search-dropdown').should('have.value', 'all');

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should retrieve less results with "pw" scope', () => {
    // Mock scoped search typeahead API
    cy.intercept('**/search/typeahead/v1?*', {
      fixture: 'scoped-typeahead.json',
    });

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-scoped-search-dropdown')
      .shadow()
      .find('.bx--dropdown')
      .click();

    cy.get('dds-scoped-search-dropdown')
      .find(`bx-dropdown-item[value="pw"]`)
      .click();

    cy.get('dds-scoped-search-dropdown').should('have.value', 'pw');

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 5);
    cy.takeSnapshots();
  });
});

describe('dds-masthead | scoped search (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathScopedSearch}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should open the search bar on click', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should retrieve regular results with "all" scope', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-scoped-search-dropdown-mobile').should('have.value', 'all');

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should retrieve less results with "pw" scope', () => {
    // Mock scoped search typeahead API
    cy.intercept('**/search/typeahead/v1?*', {
      fixture: 'scoped-typeahead.json',
    });

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-scoped-search-dropdown-mobile')
      .shadow()
      .find('.bx--select-input')
      .select('pw');
    cy.get('dds-scoped-search-dropdown-mobile').should('have.value', 'pw');

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('cloud', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 5);
    cy.takeSnapshots();
  });
});
