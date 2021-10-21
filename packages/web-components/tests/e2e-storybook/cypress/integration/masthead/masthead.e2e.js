/**
 * Copyright IBM Corp. 2021
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

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom = '/iframe.html?id=components-masthead--with-custom-navigation';

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('dds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have url for IBM logo', () => {
    cy.get('dds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | IBM logo', {
    //   widths: [1280],
    // });
  });

  it('should load menu item with selected state', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(2)').then($menuItem => {
      expect($menuItem).to.have.attr('active');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | menu item with selected state', {
    //   widths: [1280],
    // });
  });

  it('should render 4 menu items', () => {
    cy.get('dds-megamenu-top-nav-menu').should('have.length', 4);

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | Number of menu items', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - first nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(1)')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 0)', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(2)')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 2)', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - third nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(3)')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 3)', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - fourth nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(4)')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 4)', {
    //   widths: [1280],
    // });
  });

  it('should have urls for the submenu items within the megamenu', () => {
    cy.get(
      'dds-megamenu-top-nav-menu:nth-child(1) > dds-megamenu >  dds-megamenu-right-navigation >  dds-megamenu-category-group > dds-megamenu-category-link:nth-child(1)'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get(
      'dds-megamenu-top-nav-menu:nth-child(1) > dds-megamenu >  dds-megamenu-left-navigation >  dds-megamenu-category-group > dds-megamenu-link-with-icon'
    )
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | megamenu sublinks have urls', {
    //   widths: [1280],
    // });
  });

  it('should open the login menu', () => {
    cy.get('dds-masthead-profile')
      .shadow()
      .find('a')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | profile menu', {
    //   widths: [1280],
    // });
  });

  it('should have 2 menu items under the login menu', () => {
    cy.get('dds-masthead-profile-item').should('have.length', 2);

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | profile menu has 2 items', {
    //   widths: [1280],
    // });
  });

  it('should open the search bar on click', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead |  search bar opens', {
    //   widths: [1280],
    // });
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

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead |  allow for keywords in search bar and display 10 suggested results', {
    //   widths: [1280],
    // });
  });
});

describe('dds-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load the mobile menu', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | mobile menu', {
      widths: [320],
    });

    cy.get('dds-left-nav-menu-section:nth-child(1) > dds-left-nav-menu:nth-child(1)')
      .shadow()
      .find('button')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mobile menu level 2', {
    //   widths: [320],
    // });
  });
});

describe('dds-masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathCustom}`);
    cy.viewport(1280, 780);
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('dds-top-nav')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom - overflow', {
    //   widths: [1280],
    // });
  });
});

describe('dds-masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathPlatform}`);
    cy.viewport(1280, 780);
  });

  it('should load platform containing a link', () => {
    cy.get('dds-masthead > dds-top-nav-name')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should render platform next to IBM logo', () => {
    cy.get('dds-masthead > dds-top-nav-name').then($platform => {
      cy.get('dds-masthead > dds-masthead-logo').then($logo => {
        expect($logo[0].getBoundingClientRect().right).to.equal($platform[0].getBoundingClientRect().left);
      });
    });
  });

  it('should open the search bar with platform', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | with platform - search', {
    //   widths: [1280],
    // });
  });
});
