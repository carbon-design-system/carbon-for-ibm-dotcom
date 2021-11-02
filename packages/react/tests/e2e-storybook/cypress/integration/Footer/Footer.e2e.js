/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

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
const _pathShortLanguageOnly =
  '/iframe.html?id=components-footer--short-language-only';

/**
 * Sets the correct path (Micro language only)
 *
 * @type {string}
 * @private
 */
const _pathMicroLanguageOnly =
  '/iframe.html?id=components-footer--micro-language-only';

describe('Footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(1280, 780);
  });

  it('should display clickable IBM logo', () => {
    cy.get('a.bx--footer-logo__link').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.screenshot();

    cy.percySnapshot('Footer | Short | load clickable IBM logo', {
      widths: [1280],
    });
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('.bx--locale-modal [data-region]').should('have.length', 4);

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | open locale modal with 4 geos when clicked on locale button',
      {
        widths: [1280],
      }
    );
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('.bx--locale-modal [data-region="mea"]')
      .find('a')
      .click();

    cy.wait(500);

    cy.get('.bx--locale-modal__filter')
      .find('.bx--locale-modal__list li a')
      .each($locale => {
        if (!$locale.attr('data-region') === 'mea') {
          $locale.should('have.class', 'bx--locale-modal__locales-hidden');
        }
      });

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | display the specific locations and languages of a selected geo',
      {
        widths: [1280],
      }
    );
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('.bx--locale-modal [data-region="am"]')
      .find('a')
      .click();

    cy.wait(500);

    cy.get('.bx--locale-modal__search input')
      .type('gen')
      .get(
        '.bx--locale-modal__list li a:not(.bx--locale-modal__locales-hidden)'
      )
      .contains('Argentina');

    cy.get('.bx--locale-modal__search input')
      .clear()
      .type('por')
      .get(
        '.bx--locale-modal__list li a:not(.bx--locale-modal__locales-hidden)'
      )
      .contains('Brazil (Brasil)');

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | display interactive search field and with keywords for locations and languages',
      {
        widths: [1280],
      }
    );
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('[data-autoid="dds--footer-legal-nav"]')
      .find('.bx--legal-nav__list-item a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | load footer legal navigation with clickable links',
      {
        widths: [1280],
      }
    );
  });
});

describe('Footer | Short language only (desktop)', () => {
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
      'Footer | Short language only (desktop language selector)',
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
      'Footer | Short language only (desktop language selector)',
      {
        widths: [1280],
      }
    );
  });
});

describe('Footer | Micro language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load language selector dropdown', () => {
    cy.get(`[data-autoid="dds--language-selector"]`).click();

    cy.screenshot();
    cy.percySnapshot(
      'Footer | Micro language only (desktop language selector)',
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
      'Footer | Micro language only (desktop language selector)',
      {
        widths: [1280],
      }
    );
  });
});

describe('Footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);
  });

  it('should display clickable IBM logo', () => {
    cy.get('a.bx--footer-logo__link').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.screenshot();

    cy.percySnapshot('Footer | Short | load clickable IBM logo', {
      widths: [320],
    });
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('.bx--locale-modal [data-region]').should('have.length', 4);

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | open locale modal with 4 geos when clicked on locale button',
      {
        widths: [320],
      }
    );
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('.bx--locale-modal [data-region="mea"]')
      .find('a')
      .click();

    cy.wait(500);

    cy.get('.bx--locale-modal__filter')
      .find('.bx--locale-modal__list li a')
      .each($locale => {
        if (!$locale.attr('data-region') === 'mea') {
          $locale.should('have.class', 'bx--locale-modal__locales-hidden');
        }
      });

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | display the specific locations and languages of a selected geo',
      {
        widths: [320],
      }
    );
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('.bx--locale-modal [data-region="am"]')
      .find('a')
      .click();

    cy.wait(500);

    cy.get('.bx--locale-modal__search input')
      .type('gen')
      .get(
        '.bx--locale-modal__list li a:not(.bx--locale-modal__locales-hidden)'
      )
      .contains('Argentina');

    cy.get('.bx--locale-modal__search input')
      .clear()
      .type('por')
      .get(
        '.bx--locale-modal__list li a:not(.bx--locale-modal__locales-hidden)'
      )
      .contains('Brazil (Brasil)');

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | display interactive search field and with keywords for locations and languages',
      {
        widths: [320],
      }
    );
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('[data-autoid="dds--footer-legal-nav"]')
      .find('.bx--legal-nav__list-item a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();

    cy.percySnapshot(
      'Footer | Short | load footer legal navigation with clickable links',
      {
        widths: [320],
      }
    );
  });
});

describe('Footer | Short language only (mobile)', () => {
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
      'Footer | Short language only (desktop language selector)',
      {
        widths: [320],
      }
    );
  });
});

describe('Footer | Micro language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicroLanguageOnly}`);
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
      'Footer | Micro language only (desktop language selector)',
      {
        widths: [320],
      }
    );
  });
});
