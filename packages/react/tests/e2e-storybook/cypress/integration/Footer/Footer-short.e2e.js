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
const _pathShortLanguageOnly =
  '/iframe.html?id=components-footer--short-language-only';

describe('Footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should display clickable IBM logo', () => {
    cy.get('a[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.takeSnapshots();
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('[data-autoid="dds--locale-modal"] [data-region]').should(
      'have.length',
      4
    );

    cy.takeSnapshots();
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get(
      '[data-autoid="dds--locale-modal"] [data-autoid="dds--card"][data-region="mea"]'
    )
      .find('a')
      .click();

    cy.wait(500);

    cy.get('[data-autoid="dds--locale-modal"]')
      .find('ul li a[href][data-region]')
      .each($locale => {
        if (!$locale.attr('data-region') === 'mea') {
          $locale.should('not.be.visible');
        }
      });

    cy.takeSnapshots();
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get(
      '[data-autoid="dds--locale-modal"] [data-autoid="dds--card"][data-region="am"]'
    )
      .find('a')
      .click();

    cy.wait(500);

    cy.get('input[data-autoid="dds--locale-modal__filter"]')
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

    cy.takeSnapshots();
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('[data-autoid="dds--footer-legal-nav"]')
      .find('.bx--legal-nav__list-item .bx--footer__link')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('Footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
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

describe('Footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--footer-legal-nav"]').should('not.be.empty'));
  });

  it('should display clickable IBM logo', () => {
    cy.get('a[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.takeSnapshots('mobile');
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get('div[data-autoid="dds--locale-modal"]').should('have.attr', 'open');

    cy.get('[data-autoid="dds--locale-modal"] [data-region]').should(
      'have.length',
      4
    );

    cy.takeSnapshots('mobile');
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get(
      '[data-autoid="dds--locale-modal"] [data-autoid="dds--card"][data-region="mea"]'
    )
      .find('a')
      .click();

    cy.wait(500);

    cy.get('[data-autoid="dds--locale-modal"]')
      .find('ul li a[href][data-region]')
      .each($locale => {
        if (!$locale.attr('data-region') === 'mea') {
          $locale.should('not.be.visible');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('button[data-autoid="dds--locale-btn"]').click();

    cy.wait(500);

    cy.get(
      '[data-autoid="dds--locale-modal"] [data-autoid="dds--card"][data-region="am"]'
    )
      .find('a')
      .click();

    cy.wait(500);

    cy.get('input[data-autoid="dds--locale-modal__filter"]')
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

    cy.takeSnapshots('mobile');
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('[data-autoid="dds--footer-legal-nav"]')
      .find('.bx--legal-nav__list-item .bx--footer__link')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('Footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
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
