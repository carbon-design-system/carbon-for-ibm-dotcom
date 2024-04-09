/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */

const _selectors = {
  masthead: 'c4d-masthead',
  mastheadNavName: 'c4d-top-nav-name',
  mastheadSearchBar: 'c4d-search-with-typeahead',
}

const _pathPlatform = '/iframe.html?id=components-masthead--with-platform&knob-use%20mock%20nav%20data%20(use-mock)=true';

describe('c4d-masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathPlatform}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load platform containing a link', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadNavName}`)
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should render platform next to IBM logo', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadNavName}`).then($platform => {
      cy.get(`${_selectors.masthead} > ${_selectors.masthead}-logo`).then($logo => {
        expect($logo[0].getBoundingClientRect().right).to.equal($platform[0].getBoundingClientRect().left);
      });
    });
  });

  it('should open the search bar with platform', () => {
    cy.get(`${_selectors.masthead} > ${_selectors.mastheadSearchBar}`)
      .shadow()
      .find('[part="open-button"]')
      .click();

    cy.takeSnapshots();
  });
});
