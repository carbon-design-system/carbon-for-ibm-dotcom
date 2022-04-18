/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with Custom Typeahead)
 *
 * @type {string}
 * @private
 */
const _pathCustomSearch = '/iframe.html?id=components-masthead--with-custom-typeahead';

describe('dds-masthead | custom search (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathCustomSearch}`);
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

  it('should display grouped results with hrefs', () => {
    // Mock grouped search typeahead API
    cy.intercept('https://ibmdocs-dev.mybluemix.net/docs/api/v1/suggest?query=cloud&lang=undefined&categories=&limit=6', {
      fixture: 'grouped-typeahead.json',
    });

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('cloud', { force: true });

    cy.get('dds-search-with-typeahead-item:not([groupTitle])').should('have.length', 12);

    const groupedItem = cy.get('dds-search-with-typeahead-item[groupTitle]');
    groupedItem.then($item => {
      expect($item).to.have.length(1);
      expect($item.attr('text')).to.eq('Product pages');
    });

    cy.get('dds-search-with-typeahead-item').each(($item, $index) => {
      if ($index == 6) {
        expect($item).to.have.attr('groupTitle');
      } else if ($index > 6) {
        expect($item).to.have.attr('href');
      }

      expect($item).to.have.attr('text');
    });

    cy.takeSnapshots();
  });
});
