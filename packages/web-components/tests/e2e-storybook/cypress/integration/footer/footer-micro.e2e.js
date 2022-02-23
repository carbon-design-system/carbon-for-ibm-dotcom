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

describe('dds-footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load locale modal with 4 geos', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);
    cy.get('dds-locale-modal').should('have.attr', 'open');
    cy.get('dds-regions > dds-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('dds-locale-button').click();
    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Asia Pacific"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get('dds-legal-nav')
      .find('dds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('dds-footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('dds-language-selector-desktop').should('have.length', 1);
    cy.get('dds-language-selector-desktop')
      .shadow()
      .find(`div.bx--dropdown`)
      .click();
    cy.get('dds-language-selector-desktop')
      .find(`bx-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('dds-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.takeSnapshots();
  });
});

describe('dds-footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load locale modal with 4 geos', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);
    cy.get('dds-locale-modal').should('have.attr', 'open');
    cy.get('dds-regions > dds-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it('should load the Asia Pacific region with its languages and locations', () => {
    cy.get('dds-locale-button').click();
    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Asia Pacific"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Asia Pacific') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should load all 4 interactable legal links', () => {
    cy.get('dds-legal-nav')
      .find('dds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('dds-footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should load language selector dropdown and be interactive', () => {
    cy.get('dds-language-selector-mobile').should('have.length', 1);
    cy.get('dds-language-selector-mobile')
      .shadow()
      .find(`select.bx--select-input`)
      .select('Arabic / عربية');
    cy.get('dds-language-selector-mobile')
      .shadow()
      .find(`select.bx--select-input`)
      .should('have.value', 'Arabic / عربية');

    cy.takeSnapshots('mobile');
  });
});
