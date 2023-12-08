/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Short)
 *
 * @type {string}
 * @private
 */
const _pathShort = '/iframe.html?id=components-footer--short';

/**
 * Sets the correct path (Short language only)
 *
 * @type {string}
 * @private
 */
const _pathShortLanguageOnly = '/iframe.html?id=components-footer--short-language-only';

describe('c4d-footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should display clickable IBM logo', () => {
    cy.get('c4d-footer-logo')
      .shadow()
      .find('a.c4d--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-locale-modal').should('have.attr', 'open');

    cy.get('c4d-regions > c4d-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-regions')
      .find('c4d-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('c4d-locale-search')
      .find('c4d-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots();
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-regions')
      .find('c4d-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('c4d-locale-search').as('search')
      .find('c4d-search')
      .shadow()
      .find('input')
      .type('gu', {
        force: true,
      });

    cy.get('@search')
      .find('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden');

    cy.get('@search')
      .find('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

    cy.takeSnapshots();
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('c4d-footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('c4d-language-selector-desktop').should('have.length', 1);
    cy.get('c4d-language-selector-desktop')
      .shadow()
      .find(`div.cds--dropdown`)
      .click();
    cy.get('c4d-language-selector-desktop')
      .find(`cds-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('c4d-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.takeSnapshots();
  });
});

describe('c4d-footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should display clickable IBM logo', () => {
    cy.get('c4d-footer-logo')
      .shadow()
      .find('a.c4d--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-locale-modal').should('have.attr', 'open');

    cy.get('c4d-regions > c4d-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-regions')
      .find('c4d-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('c4d-locale-search')
      .find('c4d-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);

    cy.get('c4d-regions')
      .find('c4d-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('c4d-locale-search').as('search')
      .find('c4d-search')
      .shadow()
      .find('input')
      .type('gu', {
        force: true,
      });

    cy.get('@search')
      .find('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden');

    cy.get('@search')
      .find('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

    cy.takeSnapshots('mobile');
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('c4d-footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('c4d-language-selector-mobile').should('have.length', 1);
    cy.get('c4d-language-selector-mobile')
      .shadow()
      .find(`select.cds--select-input`)
      .select('Arabic / عربية');
    cy.get('c4d-language-selector-mobile')
      .shadow()
      .find(`select.cds--select-input`)
      .should('have.value', 'Arabic / عربية');

    cy.takeSnapshots('mobile');
  });
});
