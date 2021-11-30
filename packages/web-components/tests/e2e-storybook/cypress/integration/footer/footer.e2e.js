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
 * Sets the correct path (Default language only)
 *
 * @type {string}
 * @private
 */
const _pathDefaultLanguageOnly = '/iframe.html?id=components-footer--default-language-only';

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

describe('dds-footer | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(1280, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo"]').then($link => {
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

    cy.get('dds-region-item[name="Americas"]').click();

    cy.get(`dds-locale-item[region='Americas']`).should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('dds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca', {
        force: true,
      });

    cy.get('dds-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load all the 38 interactable navigation links', () => {
    cy.get(`dds-footer-nav-item`).should('have.length', 38);

    cy.get('dds-footer-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`dds-legal-nav-item`).should('have.length', 4);

    cy.get('dds-legal-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });
});

describe('dds-footer | Default language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load IBM logo and and be interactive', () => {
    const footerLogo = cy.get('dds-footer-logo');
    footerLogo.should('have.length', 1);
    footerLogo
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
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

  it('should load all the 38 interactable navigation links', () => {
    cy.get(`dds-footer-nav-item`).should('have.length', 38);

    cy.get('dds-footer-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`dds-legal-nav-item`).should('have.length', 4);

    cy.get('dds-legal-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });
});

describe('dds-footer | Short (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(1280, 780);
  });

  it('should display clickable IBM logo', () => {
    cy.get('dds-footer-logo')
      .shadow()
      .find('a.bx--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-locale-modal').should('have.attr', 'open');

    cy.get('dds-regions > dds-region-item').should('have.length', 4);

    cy.takeSnapshots();
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots();
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-search')
      .shadow()
      .find('input')
      .type('gu')
      .get('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden')
      .get('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

    cy.takeSnapshots();
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('dds-legal-nav')
      .find('dds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`dds-legal-nav-item`).should('have.length', 4);

    cy.get('dds-legal-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });
});

describe('dds-footer | Short language only (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(1280, 780);
  });

  it('should load IBM logo and and be interactive', () => {
    const footerLogo = cy.get('dds-footer-logo');
    footerLogo.should('have.length', 1);
    footerLogo
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
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

describe('dds-footer | Micro (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(1280, 780);
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

describe('dds-footer | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefault}`);
    cy.viewport(320, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo"]').then($link => {
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

    cy.get('dds-region-item[name="Americas"]').click();

    cy.get(`dds-locale-item[region='Americas']`).should('have.length', 35);

    cy.takeSnapshots();
  });

  it('should be able to search with keywords for locations and languages', () => {
    const localeButton = cy.get(`[data-autoid="dds--locale-btn"]`);
    localeButton.click();

    cy.get('[name="Americas"]').click();

    cy.get('dds-locale-search')
      .shadow()
      .find('.bx--search-input')
      .type('ca', {
        force: true,
      });

    cy.get('dds-locale-item:not([hidden])')
      .invoke('attr', 'country')
      .should('eq', 'Canada');

    cy.takeSnapshots();
  });

  it('should load all the 38 interactable navigation links', () => {
    cy.get(`dds-footer-nav-item`).should('have.length', 38);

    cy.get('dds-footer-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`dds-legal-nav-item`).should('have.length', 4);

    cy.get('dds-legal-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });
});

describe('dds-footer | Default language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathDefaultLanguageOnly}`);
    cy.viewport(320, 780);
  });

  it('should have interactable url for IBM logo', () => {
    cy.get('[data-autoid="dds--footer-logo"]').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });
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

  it('should load all the 38 interactable navigation links', () => {
    cy.get(`dds-footer-nav-item`).should('have.length', 38);

    cy.get('dds-footer-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
  });

  it('should load all 4 interactable legal links', () => {
    cy.get(`dds-legal-nav-item`).should('have.length', 4);

    cy.get('dds-legal-nav-item')
      .shadow()
      .find('a')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });
});

describe('dds-footer | Short (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathShort}`);
    cy.viewport(320, 780);
  });

  it('should display clickable IBM logo', () => {
    cy.get('dds-footer-logo')
      .shadow()
      .find('a.bx--footer-logo__link')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });

  it('should open locale modal with 4 geos when clicked on locale button', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-locale-modal').should('have.attr', 'open');

    cy.get('dds-regions > dds-region-item').should('have.length', 4);

    cy.takeSnapshots('mobile');
  });

  it('should display the specific locations and languages of a selected geo', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Middle East and Africa"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-locale-item')
      .each($locale => {
        if (!$locale.attr('region') === 'Middle East and Africa') {
          $locale.should('have.attr', 'hidden');
        }
      });

    cy.takeSnapshots('mobile');
  });

  it('should display interactive search field and with keywords for locations and languages', () => {
    cy.get('dds-locale-button').click();

    cy.wait(500);

    cy.get('dds-regions')
      .find('dds-region-item[name="Americas"]')
      .click();

    cy.wait(500);

    cy.get('dds-locale-search')
      .find('dds-search')
      .shadow()
      .find('input')
      .type('gu')
      .get('[country="Brazil (Brasil)"]')
      .should('not.have.attr', 'hidden')
      .get('[country="Guyana"]')
      .should('not.have.attr', 'hidden');

    cy.takeSnapshots('mobile');
  });

  it('should load footer legal navigation with clickable links', () => {
    cy.get('dds-legal-nav')
      .find('dds-legal-nav-item')
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots('mobile');
  });
});

describe('dds-footer | Short language only (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathShortLanguageOnly}`);
    cy.viewport(320, 780);
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

describe('dds-footer | Micro (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMicro}`);
    cy.viewport(320, 780);
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
