/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the host to run tests
 *
 * @type {string|string}
 * @private
 */
const _host = (process && process.env.C4IBM_E2E_STORYBOOK_HOST) || 'http://localhost:8081';

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
    cy.visit(`${_host}/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should load the megamenu - first nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(1)')
      .shadow()
      .find('a')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | mega menu (nav 0)', {
      widths: [1280],
    });
  });

  it('should load the megamenu - second nav item', () => {
    cy.get('dds-megamenu-top-nav-menu:nth-child(2)')
      .shadow()
      .find('a')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | mega menu (nav 1)', {
      widths: [1280],
    });
  });

  it('should open the login menu', () => {
    cy.get('dds-masthead-profile')
      .shadow()
      .find('a')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | profile menu', {
      widths: [1280],
    });
  });
});

describe('dds-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_host}/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should load the mobile menu', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | mobile menu', {
      widths: [320],
    });

    cy.get('dds-left-nav-menu-section:nth-child(1) > dds-left-nav-menu:nth-child(1)')
      .shadow()
      .find('button')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | mobile menu level 2', {
      widths: [320],
    });
  });
});

describe('dds-masthead | custom (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_host}/${_pathCustom}`);
    cy.viewport(1280, 780);
  });

  it('should scroll the L0 overflow properly', () => {
    cy.get('dds-top-nav')
      .shadow()
      .find('.bx--header__nav-caret-right-container > button')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | custom - overflow', {
      widths: [1280],
    });
  });
});

describe('dds-masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_host}/${_pathPlatform}`);
    cy.viewport(1280, 780);
  });

  it('should open the search bar with platform', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | with platform - search', {
      widths: [1280],
    });
  });
});
