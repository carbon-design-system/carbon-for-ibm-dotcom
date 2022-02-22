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
const _pathMicroLanguageOnly =
  '/iframe.html?id=components-footer--micro-language-only';

describe('Footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load locale modal with 4 geos ', () => {
    cy.get(`[data-autoid="dds--locale-btn"]`).click();

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('.bx--locale-modal [data-region]').should('have.length', 4);

    cy.screenshot();
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get(`[data-autoid="dds--locale-btn"]`).click();
    cy.get('[data-region="ap"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 19);

    cy.takeSnapshots();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();

    cy.takeSnapshots();
  });

  it('should be able to select a language from combo box', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();
    cy.get(`[data-autoid="dds--footer"]`)
      .find(
        `.bx--list-box__menu > .bx--list-box__menu-item:nth-of-type(1) .bx--list-box__menu-item__option`
      )
      .click();
    cy.get(`[data-autoid="dds--language-selector"]`).should(
      'have.value',
      'Arabic / عربية'
    );

    cy.takeSnapshots();
  });
});

describe('Footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load locale modal with 4 geos ', () => {
    cy.get(`[data-autoid="dds--locale-btn"]`).click();

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('.bx--locale-modal [data-region]').should('have.length', 4);

    cy.screenshot();
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get(`[data-autoid="dds--locale-btn"]`).click();
    cy.get('[data-region="ap"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 19);

    cy.takeSnapshots('mobile');
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector and be interactive', () => {
    cy.get('[data-autoid="dds--language-selector__select"]').should(
      'have.length',
      1
    );

    const languageSelector = cy.get(
      '[data-autoid="dds--language-selector__select"]'
    );
    languageSelector.select('Arabic / عربية');
    languageSelector.should('have.value', 'ar');

    cy.takeSnapshots('mobile');
  });
});
