/**
 * Copyright IBM Corp. 2021, 2022
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

describe('cds-footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should display clickable IBM logo', () => {
    cy.get('cds-footer-logo')
      .shadow()
      .find('a.bx--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-locale-modal').should('have.attr', 'open');

    cy.get('cds-regions > cds-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots();
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-search')
      .shadow()
      .find('input')
      .type('gu')
      .get('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden')
      .get('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

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

describe('cds-footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('cds-language-selector-desktop').should('have.length', 1);
    cy.get('cds-language-selector-desktop')
      .shadow()
      .find(`div.bx--dropdown`)
      .click();
    cy.get('cds-language-selector-desktop')
      .find(`bx-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('cds-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.takeSnapshots();
  });
});

describe('cds-footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should display clickable IBM logo', () => {
    cy.get('cds-footer-logo')
      .shadow()
      .find('a.bx--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-locale-modal').should('have.attr', 'open');

    cy.get('cds-regions > cds-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-search')
      .shadow()
      .find('input')
      .type('gu')
      .get('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden')
      .get('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

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

describe('cds-footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('cds-language-selector-mobile').should('have.length', 1);
    cy.get('cds-language-selector-mobile')
      .shadow()
      .find(`select.bx--select-input`)
      .select('Arabic / عربية');
    cy.get('cds-language-selector-mobile')
      .shadow()
      .find(`select.bx--select-input`)
      .should('have.value', 'Arabic / عربية');

    cy.takeSnapshots('mobile');
  });
});
