/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-footer--default';

/**
 * Sets the correct path (Default language only)
 *
 * @type {string}
 * @private
 */
const _pathDefaultLanguageOnly = '/iframe.html?id=components-footer--default-language-only';

describe('cds-footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="cds--footer-logo"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.get('cds-region-item[name="Americas"]').click();

    cy.get('cds-locale-item[region="Americas"]').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('cds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca', {
        force: true,
      });

    cy.get('cds-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load clickable footer links', () => {
    cy.get('cds-footer-nav-group')
      .find('cds-footer-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should load clickable legal links', () => {
    cy.get('cds-legal-nav')
      .find('cds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('cds-footer | Default language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('cds-language-selector-desktop').should('have.length', 1);

    // FIXME: Firefox is not providing the space above for this test to pass
    if (Cypress.browser.name !== 'firefox') {
      cy.get('cds-language-selector-desktop')
        .shadow()
        .find('div.bx--dropdown')
        .click();
      cy.get('cds-language-selector-desktop')
        .find('bx-combo-box-item[value="Arabic / عربية"]')
        .click();
      cy.get('cds-language-selector-desktop').should('have.value', 'Arabic / عربية');
    }

    cy.takeSnapshots();
  });
});

describe('cds-footer | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="cds--footer-logo"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.get('cds-region-item[name="Americas"]').click();

    cy.get('cds-locale-item[region="Americas"]').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get('[data-autoid="cds--locale-btn"]');
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('cds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca', {
        force: true,
      });

    cy.get('cds-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load clickable footer links', () => {
    cy.get('cds-footer-nav-group')
      .find('cds-footer-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });

  it('should load clickable legal links', () => {
    cy.get('cds-legal-nav')
      .find('cds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('cds-footer | Default language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('cds-language-selector-mobile').should('have.length', 1);
    cy.get('cds-language-selector-mobile')
      .shadow()
      .find('select.bx--select-input')
      .select('Arabic / عربية');
    cy.get('cds-language-selector-mobile')
      .shadow()
      .find('select.bx--select-input')
      .should('have.value', 'Arabic / عربية');

    cy.takeSnapshots('mobile');
  });
});
