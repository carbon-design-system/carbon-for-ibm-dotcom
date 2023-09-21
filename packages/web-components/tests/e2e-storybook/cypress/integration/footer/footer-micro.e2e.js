/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Micro)
 *
 * @type {string}
 * @private
 */
const _pathMicro = '/iframe.html?id=components-footer--micro';

/**
 * Sets the correct path (Micro language only)
 *
 * @type {string}
 * @private
 */
const _pathMicroLanguageOnly = '/iframe.html?id=components-footer--micro-language-only';

describe('cds-footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load locale modal with 4 geos', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);
    cy.get('cds-locale-modal').should('have.attr', 'open');
    cy.get('cds-regions > cds-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('cds-locale-button').click();
    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Asia Pacific"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
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

describe('cds-footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
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
      .find(`cds-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('cds-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.takeSnapshots();
  });
});

describe('cds-footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="cds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load locale modal with 4 geos', () => {
    cy.get('cds-locale-button').click();

    cy.wait(500);
    cy.get('cds-locale-modal').should('have.attr', 'open');
    cy.get('cds-regions > cds-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('cds-locale-button').click();
    cy.wait(500);

    cy.get('cds-regions')
      .find('cds-region-item[name="Asia Pacific"]')
      .click();

    cy.wait(500);

    cy.get('cds-locale-search')
      .find('cds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
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

describe('cds-footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
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
