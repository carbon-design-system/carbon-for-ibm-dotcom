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

/**
 * Sets the correct path (Masthead with L1)
 *
 * @type {string}
 * @private
 */
const _pathl1 = '/iframe.html?id=components-masthead--with-l-1';

/**
 * Sets the correct path (Masthead search open onload)
 *
 * @type {string}
 * @private
 */
const _pathSearchOpenOnload = '/iframe.html?id=components-masthead--search-open-onload';

describe('dds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
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
    cy.mockMastheadFooterData();
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
    cy.mockMastheadFooterData();
    cy.visit(`/${_pathCustom}`);
    cy.viewport(1280, 780);
  });

  it('should render 6 custom menu items', () => {
    cy.get('dds-top-nav > *').should('have.length', 6);
  });

  it('should load custom menu item with selected state', () => {
    cy.get('dds-top-nav > *:nth-child(1)').then($menuItem => {
      expect($menuItem).to.have.attr('active');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom menu item with selected state', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - custom first nav item', () => {
    cy.get('dds-top-nav > *:nth-child(1)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom nav (nav 0)', {
    //   widths: [1280],
    // });
  });

  it('should load the megamenu - custom second nav item', () => {
    cy.get('dds-top-nav > *:nth-child(2)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom nav (nav 1)', {
    //   widths: [1280],
    // });
  });

  it('should load regular menu - custom third nav item', () => {
    cy.get('dds-top-nav > *:nth-child(3)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom nav (nav 2)', {
    //   widths: [1280],
    // });
  });

  it('should load regular menu - custom fourth nav item', () => {
    cy.get('dds-top-nav > *:nth-child(4)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load the megamenu - custom fifth nav item', () => {
    cy.get('dds-top-nav')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();
    cy.get('dds-top-nav > *:nth-child(5)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom nav (nav 4)', {
    //   widths: [1280],
    // });
  });

  it('should load regular menu - custom sixth nav item', () => {
    cy.get('dds-top-nav > *:nth-child(4)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('dds-top-nav')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();

    cy.get('dds-top-nav')
      .shadow()
      .find('.bx--header__nav-caret-right-container.dds-ce--header__nav-caret-container--hidden')
      .then(() => {
        cy.get('dds-top-nav')
          .shadow()
          .find('.bx--header__nav-caret-left-container')
          .then($button => {
            expect($button).not.to.have.class('dds-ce--header__nav-caret-container--hidden');
          });
      });

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
    cy.mockMastheadFooterData();
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

describe('dds-masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
    cy.visit(`/${_pathl1}`);
    cy.viewport(1280, 780);
  });

  it('should render platform below the IBM logo', () => {
    cy.get('dds-masthead-l1-name').then($platform => {
      cy.get('dds-masthead-logo').then($logo => {
        expect($logo[0].getBoundingClientRect().down).to.equal($platform[0].getBoundingClientRect().up);
      });
    });
  });

  it('should render and have url for L1 platform', () => {
    cy.get('dds-masthead-l1-name')
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

  it('should load l1 menu item with selected state', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(1)').then($menuItem => {
      expect($menuItem).to.have.attr('active');
    });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom menu item with selected state', {
    //   widths: [1280],
    // });
  });

  it('should render 5 menu items', () => {
    cy.get('dds-top-nav-l1 > * ').should('have.length', 5);
  });

  it('should load the l1 - first nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(1)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });
  });

  it('should load the l1 - second nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(2)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });
  });

  it('should load and have url for third l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(3)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load the l1 - fourth nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(4)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });
  });

  it('should load and have url for fifth l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(5)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should scroll the l1 overflow properly', () => {
    cy.get('dds-top-nav-l1')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();

    cy.get('dds-top-nav-l1')
      .shadow()
      .find('.bx--header__nav-caret-right-container.dds-ce--header__nav-caret-container--hidden')
      .then($button => {
        cy.get('dds-top-nav-l1')
          .shadow()
          .find('.bx--header__nav-caret-left-container')
          .then($button => {
            expect($button).not.to.have.class('dds-ce--header__nav-caret-container--hidden');
          });
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom - overflow', {
    //   widths: [1280],
    // });
  });
});

describe('dds-masthead | search open onload (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathSearchOpenOnload}`);
    cy.viewport(1280, 780);
  });

  it('should load search field open by default', () => {
    cy.get('dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .should('be.visible');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | search open onload', {
    //   widths: [1280],
    // });
  });

  it('should have typable search field', () => {
    cy.get('dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('test')
      .should('have.value', 'test');
  });

  it('should display 10 auto suggest results', () => {
    cy.get('dds-search-with-typeahead')
      .shadow()
      .find('input[type="text"]')
      .type('test')
      .get('dds-search-with-typeahead-item')
      .should('have.length', 10);

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | search open onload', {
    //   widths: [1280],
    // });
  });

  it('should not display menu options while search field is open', () => {
    cy.get('dds-top-nav').should('have.attr', 'hidenav');
  });
});
