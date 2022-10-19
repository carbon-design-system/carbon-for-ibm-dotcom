/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-masthead--with-v-2-data';

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

describe('dds-masthead | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780)
      .visit(`/${_pathDefault}`)
      .injectAxe();

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have url for IBM logo', () => {
    cy.get('dds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should render at least 1 menu item', () => {
    cy.get('dds-megamenu-top-nav-menu').should('have.length.greaterThan', 0);
  });

  it('should load the megamenus', () => {
    cy.get('dds-megamenu-top-nav-menu').each($topItem => {
      cy.get($topItem)
        .shadow()
        .find('a')
        .click()
        .takeSnapshots();
    });
  });

  it('should have urls for link elements', () => {
    cy.get('dds-megamenu-category-link, dds-megamenu-category-heading').each($linkItem => {
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

  it('should open the login menu with 2 items', () => {
    cy.get('dds-masthead-profile')
      .shadow()
      .find('a')
      .click()

      .get('dds-masthead-profile-item')
      .should('have.length', 2);

    cy.takeSnapshots();
  });

  it('should open the search bar on click', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.takeSnapshots();
  });

  it('should allow keywords in the search bar and display 10 suggested results', () => {
    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.bx--header__search--search')
      .click();

    cy.get('dds-masthead > dds-search-with-typeahead')
      .shadow()
      .find('.react-autosuggest__container > input')
      .type('redhat', { force: true });

    cy.get('dds-search-with-typeahead-item').should('have.length', 10);

    cy.takeSnapshots();
  });

  it('should load analyics attributes throughout menu', () => {
    cy.get('dds-megamenu-top-nav-menu')
      .each(item => {
        cy.get(item)
          .shadow()
          .find('a')
          .then(([link]) => {
            checkAnalyticsAttributes(link, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'L0',
              'data-attribute3': item.attr('menu-label'),
            });
          });
      })

      .get('dds-megamenu-tab')
      .each(item => {
        cy.get(item)
          .shadow()
          .find('button')
          .then(([button]) => {
            checkAnalyticsAttributes(button, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'TabHdline',
              'data-attribute3': item.attr('value'),
            });
          });
      })

      .get('dds-megamenu-category-heading[href^="http"]')
      .each(item => {
        cy.get(item)
          .shadow()
          .find('a')
          .then(([link]) => {
            checkAnalyticsAttributes(link, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'FlatHdline',
              'data-attribute3': item.attr('title'),
            });
          });
      })

      .get('dds-megamenu-category-link')
      .each(item => {
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

describe('dds-masthead | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 780)
      .visit(`/${_pathDefault}`)
      .injectAxe()
      .waitUntil(() => cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load the mobile menu', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load the mobile menu | level 2', () => {
    cy.get('dds-masthead-menu-button')
      .shadow()
      .find('button')
      .click();

    cy.get('dds-left-nav-menu-section:nth-child(1) > dds-left-nav-menu:nth-child(1)')
      .shadow()
      .find('button')
      .click();

    cy.takeSnapshots('mobile');
  });

  it('should load analyics attributes throughout menu', () => {
    cy.get('dds-left-nav-menu')
      .each(menu => {
        cy.get(menu)
          .shadow()
          .find('button')
          .then(([button]) => {
            // Top-level items
            if (!menu.get(0).parentElement.hasAttribute('is-submenu')) {
              checkAnalyticsAttributes(button, {
                'data-attribute1': 'headerNav',
                'data-attribute2': 'L0',
                'data-attribute3': menu.attr('title'),
              });
            }

            // Secondary-level items
            else {
              checkAnalyticsAttributes(button, {
                'data-attribute1': 'headerNav',
                'data-attribute2': 'TabHdline',
                'data-attribute3': menu.attr('title'),
              });
            }
          });
      })

      .get('dds-left-nav-menu-section[titleurl^="http"]')
      .each(section => {
        cy.get(section)
          .shadow()
          .find('a')
          .then(([link]) => {
            checkAnalyticsAttributes(link, {
              'data-attribute1': 'headerNav',
              'data-attribute2': 'FlatHdline',
              'data-attribute3': section.attr('title'),
            });
          });
      })

      .get('dds-left-nav-menu-item')
      .each(item => {
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
