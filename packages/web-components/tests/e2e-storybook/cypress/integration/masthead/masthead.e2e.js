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

describe('dds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
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
    // cy.percySnapshot('dds-masthead | mega menu (nav 1)', {
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

describe('dds-masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathl1}`);
    cy.viewport(1280, 780);
  });

  it('should have url for L1 platform', () => {
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

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | Number of menu items', {
    //   widths: [1280],
    // });
  });

  it('should load the l1 - first nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(1)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 3)', {
    //   widths: [1280],
    // });
  });

  it('should load the l1 - second nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(2)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 3)', {
    //   widths: [1280],
    // });
  });

  it('should have url for third l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(3)')
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

  it('should load the l1 - fourth nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(4)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | mega menu (nav 3)', {
    //   widths: [1280],
    // });
  });

  it('should have url for fifth l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(5)')
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

  it('should scroll the L1 overflow properly', () => {
    cy.get('dds-top-nav-l1')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();

    cy.get('dds-top-nav-l1')
      .shadow()
      .find('.bx--header__nav-caret-right-container')
      .then($button => {
        expect($button).to.have.class('dds-ce--header__nav-caret-container--hidden');
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-masthead | custom - overflow', {
    //   widths: [1280],
    // });
  });
});
