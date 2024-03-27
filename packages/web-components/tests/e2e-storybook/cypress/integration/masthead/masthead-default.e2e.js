/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The base path of the Story without any knob/control modifiers.
 *
 * @type {string}
 * @private
 */
const _pathBase = '/iframe.html?id=components-masthead--default';

/**
 * The default path to use for this suite's tests.
 *
 * @type {string}
 * @private
 */
const _pathDefault = `${_pathBase}&knob-use%20mock%20nav%20data%20(use-mock)=true`;

/**
 * Checks for the existence of specific attribute values for a given element.
 *
 * @param {HTMLElement} element The <a> or <button> element to check.
 * @param {object} attributes An object containing the attributes & values to check.
 */
function checkAnalyticsAttributes(element, attributes) {
  Object.entries(attributes).forEach(([attr, value]) => {
    expect(element.hasAttribute(attr)).to.be.true;
    expect(element.getAttribute(attr)).to.equal(value);
  });
}

/**
 * Verifies that the given customElementName is registered.
 *
 * @param {string} customElementName
 *   The name of the custom element to check the registry for.
 */
function customElementIsRegistered(customElementName) {
  cy.waitUntil(() => cy.window().then(window => window.customElements.get(customElementName) !== undefined), {
    errorMsg: `${customElementName} is not registered`,
  });
}

describe('c4d-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780)
      .visit(`/${_pathDefault}`)
      .injectAxe();
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have url for IBM logo', () => {
    cy.get('c4d-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support custom url for IBM logo', () => {
    cy.intercept(`https://1.www.s81c.com/common/carbon-for-ibm-dotcom/translations/masthead-footer/+(v2|v2.1)/*`, {
      fixture: 'translation-custom-logo-v2.json',
    }).as('endpointInterceptor');

    // Visit version of masthead that receives endpoint data.
    cy.visit(_pathBase)
      .injectAxe();

    cy.get('c4d-masthead-container')
      .then(([masthead]) => {
        // Clear session storage to ensure we make a fetch request.
        window.sessionStorage.clear();
        // Re-trigger fetch.
        masthead.language = 'us-en';
      })
      .wait(1000)
      .get('c4d-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).to.eq('https://www.example.com/custom-href');
      });
  });

  it('should render at least 1 menu item', () => {
    cy.get('c4d-megamenu-top-nav-menu').should('have.length.greaterThan', 0);
  });

  it('should load the megamenus', () => {
    cy.get('c4d-megamenu-top-nav-menu').each($topItem => {
      if (!Cypress.dom.isVisible($topItem)) {
        cy.get('c4d-top-nav')
          .find('[part="next-button"]')
          .click();
      }
      cy.get($topItem)
        .shadow()
        .find('a')
        .click()
        .takeSnapshots();
    });
  });

  it('should support custom L0 items', () => {
    const customL0Item = {
      title: 'Custom Nav Link',
      titleEnglish: 'Custom Nav Link',
      url: 'https://www.example.com/',
      hasMenu: false,
      hasMegapanel: false,
    }
    cy.get('c4d-masthead-container')
      .then(([masthead]) => {
        masthead.l0Data = [customL0Item];
      })
      .find('c4d-top-nav-item')
      .then(([menuItem]) => {
        expect(menuItem.getAttribute('title')).to.equal(customL0Item.title);
        expect(menuItem.getAttribute('href')).to.equal(customL0Item.url);
      });
  });

  xit('should have urls for link elements', () => {
    cy.get('c4d-megamenu-top-nav-menu').each($topItem => {
      if (!Cypress.dom.isVisible($topItem)) {
        cy.get('c4d-top-nav')
          .find('[part="next-button"]')
          .click();
      }

      cy.get($topItem)
        .shadow()
        .find('a')
        .click();

      cy.get('c4d-megamenu-category-link, c4d-megamenu-category-heading').each($linkItem => {
        cy.get($linkItem)
          .shadow()
          .then(([shadowHost]) => {
            const link = shadowHost.querySelector('a');
            if (link) {
              expect(link.href.trim()).not.to.be.empty;
            }
          });
      });
    });
  });

  it('should open the login menu with 2 items', () => {
    cy.get('c4d-masthead-profile')
      .shadow()
      .find('a')
      .click()

      .get('c4d-masthead-profile-item')
      .should('have.length', 2);

    cy.takeSnapshots();
  });

  it('should open the search bar on click', () => {
    cy.get('c4d-masthead > c4d-search-with-typeahead')
      .shadow()
      .find('.cds--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should respect initial search term option', () => {
    const initialTerm = 'initialsearchterm';
    cy.visit(`/${_pathDefault}&knob-initial%20search%20term%20(initial-search-term)=${initialTerm}`)
      .get('c4d-masthead > c4d-search-with-typeahead')
      .as('search')
      .shadow()
      .find('.cds--header__search--search')
      .click();

    cy.get('@search')
      .shadow()
      .find('.cds--header__search--input')
      .then(([input]) => {
        expect(input.value).to.equal(initialTerm);
      });

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('c4d-masthead > c4d-search-with-typeahead')
      .shadow()
      .find('.cds--header__search--search')
      .click();

    cy.get('c4d-masthead > c4d-search-with-typeahead')
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('redhat', { force: true });

    cy.get('c4d-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });

  xit('should load analyics attributes throughout menu', () => {
    cy.get('c4d-megamenu-top-nav-menu').each(item => {
      if (!Cypress.dom.isVisible(item)) {
        cy.get('c4d-top-nav')
          .find('[part="next-button"]')
          .click();
      }

      cy.get(item)
        .shadow()
        .find('a')
        .then(([link]) => {
          checkAnalyticsAttributes(link, {
            'data-attribute1': 'headerNav',
            'data-attribute2': 'L0',
            'data-attribute3': item.attr('menu-label'),
          });
        })
        .click();

      cy.get('c4d-megamenu-tab, c4d-megamenu-category-heading[href^="http"]').each(item => {
        cy.get(item)
          .shadow()
          .find('button, a')
          .then(([button]) => {
            const isTab = button.matches('button');
            checkAnalyticsAttributes(button, {
              'data-attribute1': 'headerNav',
              'data-attribute2': isTab ? 'TabHdline' : 'FlatHdline',
              'data-attribute3': isTab ? item.attr('value') : item.attr('title'),
            });
          });
      });

      cy.get('c4d-megamenu-category-link').each(item => {
        cy.get(item)
          .shadow()
          .find('a')
          .then(([link]) => {
            checkAnalyticsAttributes(link, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'FlatItem',
              'data-attribute3': item.attr('title'),
            });
          });
      });
    });
  });
});

describe('c4d-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 780)
      .visit(`/${_pathDefault}`)
      .injectAxe();
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load the mobile menu', () => {
    cy.get('c4d-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 2', () => {
    cy.get('c4d-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.get('c4d-left-nav-menu-section:nth-child(1) > c4d-left-nav-menu:nth-child(1)')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 3', () => {
    cy.get('c4d-masthead-menu-button')
      .shadow()
      .find('button')
      .click();


    cy.get('c4d-left-nav-menu')
      .filter(':visible')
      .first()
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  xit('should load analytics attributes throughout menu', () => {
    cy.get('c4d-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    // Excludes c4d-left-nav-menu-item
    cy.get('c4d-left-nav-menu').each($menu => {
      cy.get($menu)
        .shadow()
        .find('button')
        .then(([button]) => {
          // Top-level items
          if (!$menu.get(0).parentElement.hasAttribute('is-submenu')) {
            checkAnalyticsAttributes(button, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'L0',
              'data-attribute3': $menu.attr('title'),
            });
          }

          // Secondary-level items
          else {
            checkAnalyticsAttributes(button, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'TabHdline',
              'data-attribute3': $menu.attr('title'),
            });
          }
        });
    });

    cy.get('c4d-left-nav-menu-category-heading[url^="http"]').each($heading => {
      cy.get($heading)
        .shadow()
        .find('a')
        .then(([link]) => {
          checkAnalyticsAttributes(link, {
            'data-attribute1': 'headerNav',
            'data-attribute2': 'FlatHdline',
            'data-attribute3': $heading.attr('title'),
          });
        });
    });

    cy.get('c4d-left-nav-menu-item[href^="http"]').each($item => {
      cy.get($item)
        .shadow()
        .find('a')
        .then(([link]) => {
          checkAnalyticsAttributes(link, {
            'data-attribute1': 'headerNav',
            'data-attribute2': 'FlatItem',
            'data-attribute3': $item.attr('title'),
          });
        });
    });
  });
});

describe('c4d-masthead | performance optimizations', () => {
  it('should only render either top nav or left nav (dom pruning)', () => {
    cy.viewport(1280, 780).visit(`/${_pathDefault}`);

    cy.get('c4d-top-nav');
    cy.get('c4d-left-nav').should('not.exist');
    cy.get('c4d-left-nav-overlay').should('not.exist');
    cy.get('c4d-masthead-menu-button').should('not.exist');

    cy.viewport(780, 1280);

    cy.get('c4d-top-nav').should('not.exist');
    cy.get('c4d-left-nav');
    cy.get('c4d-left-nav-overlay');
    cy.get('c4d-masthead-menu-button');
  });

  it('should lazy load the mega menu', () => {
    cy.viewport(1280, 780).visit(`/${_pathDefault}`)
      .get('c4d-megamenu-top-nav-menu')
      .then(() => {
        // Mega menu not opened yet, assert that none of the lazy loaded elements
        // are registered.
        [
          'c4d-megamenu-left-navigation',
          'c4d-megamenu-category-link',
          'c4d-megamenu-category-link-group',
          'c4d-megamenu-category-group',
          'c4d-megamenu-category-group-copy',
          'c4d-megamenu-category-heading',
          'c4d-megamenu-link-with-icon',
          'c4d-megamenu-overlay',
          'c4d-megamenu-tab',
          'c4d-megamenu-tabs',
        ].forEach(elemName => {
          const elem = window.customElements.get(elemName);
          expect(elem).to.be.undefined;
        });
      })

    // Open up the first mega menu.
    .get('c4d-megamenu-top-nav-menu')
      .first()
      .shadow()
      .find('a')
      .click()
      .then(() => {
        // Mega menu opened! Assert that all the lazy loaded elements have been
        // loaded and registered.
        [
          'c4d-megamenu-left-navigation',
          'c4d-megamenu-category-link',
          'c4d-megamenu-category-group',
          'c4d-megamenu-category-heading',
          'c4d-megamenu-link-with-icon',
          'c4d-megamenu-overlay',
          'c4d-megamenu-tab',
          'c4d-megamenu-tabs',
        ].forEach(customElementIsRegistered);
      })
  });

  it('should lazy load the left nav menu', () => {
    cy.viewport(320, 780).visit(`/${_pathDefault}`);

    // Left nav not opened yet, assert that none of the lazy loaded elements
    // are registered.
    [
      'c4d-left-nav-cta-item',
      'c4d-left-nav-name',
      'c4d-left-nav-menu',
      'c4d-left-nav-menu-section',
      'c4d-left-nav-menu-item',
      'c4d-left-nav-menu-category-heading',
      'c4d-left-nav-overlay',
    ].forEach(elemName => {
      const elem = window.customElements.get(elemName);
      expect(elem).to.be.undefined;
    });

    // Open up the left nav.
    cy.get('c4d-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    // Left nav opened! Assert that all the lazy loaded elements have been
    // loaded and registered.
    [
      'c4d-left-nav-cta-item',
      'c4d-left-nav-name',
      'c4d-left-nav-menu',
      'c4d-left-nav-menu-section',
      'c4d-left-nav-menu-item',
      'c4d-left-nav-menu-category-heading',
      'c4d-left-nav-overlay',
    ].forEach(customElementIsRegistered);
  });
});
