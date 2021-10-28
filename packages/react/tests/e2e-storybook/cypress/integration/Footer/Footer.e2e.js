/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Sets the correct path (Short language only)
 *
 * @type {string}
 * @private
 */

const _pathShortLanguageOnly =
  '/iframe.html?id=components-footer--short-language-only';

describe('dds-footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load IBM logo and and be interactive', () => {
    const footerLogo = cy.get('[data-autoid="dds--footer-logo"]');
    footerLogo.should('have.length', 1);
    footerLogo.find('a').each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load language selector dropdown', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();

    cy.screenshot();
    // Take a snapshot for visual diffing
    cy.percySnapshot(
      'dds-footer | Short language only (desktop language selector)',
      {
        widths: [1280],
      }
    );
  });

  it('should be able to select a language from combo box', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();
    cy.get(`[data-autoid="dds--footer"]`)
      .find(
        `.${prefix}--list-box__menu > .${prefix}--list-box__menu-item:nth-of-type(1) .${prefix}--list-box__menu-item__option`
      )
      .click();
    cy.get(`[data-autoid="dds--language-selector"]`).should(
      'have.value',
      'Arabic / عربية'
    );

    cy.screenshot();
    cy.percySnapshot(
      'dds-footer | Short language only (desktop language selector)',
      {
        widths: [1280],
      }
    );
  });
});

describe('dds-footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(320, 780);
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

    cy.screenshot();
    cy.percySnapshot(
      'dds-footer | Short language only (desktop language selector)',
      {
        widths: [320],
      }
    );
  });
});
