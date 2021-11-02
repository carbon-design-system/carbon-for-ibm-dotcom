/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-footer--default';

/**
 * Sets the correct path (Short language only)
 *
 * @type {string}
 * @private
 */
const _pathShortLanguageOnly = '/iframe.html?id=components-footer--short-language-only';

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

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-footer | Americas region selected', {
      widths: [1280],
    });
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

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-footer | Filtering locales', {
      widths: [1280],
    });
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

describe('dds-dds-footer | default (mobile)', () => {
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

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-footer | Americas region selected', {
      widths: [1280],
    });
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

    cy.screenshot();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-footer | Filtering locales', {
      widths: [1280],
    });
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
      .find(`div.${prefix}--dropdown`)
      .click();
    cy.get('dds-language-selector-desktop')
      .find(`${prefix}-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('dds-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-footer | Short language only (desktop language selector)', {
    //   widths: [1280],
    // });
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
      .find(`div.${prefix}--dropdown`)
      .click();
    cy.get('dds-language-selector-desktop')
      .find(`${prefix}-combo-box-item[value="Arabic / عربية"]`)
      .click();
    cy.get('dds-language-selector-desktop').should('have.value', 'Arabic / عربية');

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-footer | Micro language only (desktop language selector)', {
    //   widths: [1280],
    // });
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
      .find(`select.${prefix}--select-input`)
      .select('Arabic / عربية');
    cy.get('dds-language-selector-mobile')
      .shadow()
      .find(`select.${prefix}--select-input`)
      .should('have.value', 'Arabic / عربية');

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-footer | Short language only (desktop language selector)', {
    //   widths: [320],
    // });
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
      .find(`select.${prefix}--select-input`)
      .select('Arabic / عربية');
    cy.get('dds-language-selector-mobile')
      .shadow()
      .find(`select.${prefix}--select-input`)
      .should('have.value', 'Arabic / عربية');

    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-footer | Micro language only (desktop language selector)', {
    //   widths: [320],
    // });
  });
});
