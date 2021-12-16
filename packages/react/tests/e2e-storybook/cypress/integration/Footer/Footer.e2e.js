/**
 * Copyright IBM Corp. 2021
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
 * Sets the correct path (default language only Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefaultLanguageOnly =
  '/iframe.html?id=components-footer--default-language-only';

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

describe('Footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get(
      '.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div'
    )
      .first()
      .then(e => {
        expect(e.text()).to.equal('Mexico');
      });

    cy.takeSnapshots();
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Default language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
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

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(1280, 780);
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
      .find('li a')
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

describe('Footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(1280, 780);
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

describe('Footer | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo__link"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load locale modal', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.screenshot();
  });

  it('should load the Americas region with its languages and locations', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();

    cy.get('.bx--locale-modal__locales').should('have.length', 35);

    cy.screenshot();

    cy.takeSnapshots('mobile');
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[data-region="am"]').click();
    cy.get('[data-autoid="dds--locale-modal__filter"]').type('mexico', {
      force: true,
    });

    cy.get(
      '.bx--locale-modal__locales:not(.bx--locale-modal__locales-hidden) > div'
    )
      .first()
      .then(e => {
        expect(e.text()).to.equal('Mexico');
      });

    cy.takeSnapshots('mobile');
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Default language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
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

    cy.takeSnapshots('mobile');
  });

  it('should load all the 38 navigation links', () => {
    cy.get(`[data-autoid="dds--footer-nav-group__link"]`).should(
      'have.length',
      38
    );
    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).should('have.length', 4);

    cy.get(`[data-autoid^='dds--footer-legal-nav__']`).each($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
  });
});

describe('Footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);
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
      .find('li a')
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

describe('Footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);
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
