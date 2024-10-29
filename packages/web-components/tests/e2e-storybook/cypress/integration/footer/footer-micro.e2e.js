/**
 * Copyright IBM Corp. 2021, 2024
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
const _pathMicroLanguageOnly =
  '/iframe.html?id=components-footer--micro-language-only';

describe('c4d-footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it.skip('should load locale modal with 4 geos', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);
    cy.get('c4d-locale-modal').should('have.attr', 'open');
    cy.get('c4d-regions > c4d-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it.skip('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('c4d-locale-button').click();
    cy.wait(500);

    cy.get('c4d-regions').find('c4d-region-item[name="Asia Pacific"]').click();

    cy.wait(500);

    cy.get('c4d-locale-search')
      .find('c4d-locale-item')
      .each(($locale) => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots();
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('c4d-footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it.skip('should load language selector dropdown and be interactive', () => {
    cy.get('c4d-language-selector-desktop').should('have.length', 1);
    cy.get('c4d-language-selector-desktop')
      .shadow()
      .find(`div.cds--dropdown`)
      .click();
    cy.get('c4d-language-selector-desktop')
      .find(`c4d-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('c4d-language-selector-desktop').should(
      'have.value',
      'Arabic / عربية'
    );

    cy.takeSnapshots();
  });
});

describe('c4d-footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it.skip('should load locale modal with 4 geos', () => {
    cy.get('c4d-locale-button').click();

    cy.wait(500);
    cy.get('c4d-locale-modal').should('have.attr', 'open');
    cy.get('c4d-regions > c4d-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it.skip('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('c4d-locale-button').click();
    cy.wait(500);

    cy.get('c4d-regions').find('c4d-region-item[name="Asia Pacific"]').click();

    cy.wait(500);

    cy.get('c4d-locale-search')
      .find('c4d-locale-item')
      .each(($locale) => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should load clickable legal links', () => {
    cy.get('c4d-legal-nav')
      .find('c4d-legal-nav-item')
      .each(($link) => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('c4d-footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() =>
      cy.get('[data-autoid="c4d--footer-legal-nav"]').should('not.be.empty')
    );
  });

  it.skip('should load language selector dropdown and be interactive', () => {
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
