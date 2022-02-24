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
const _pathDefault = '/iframe.html?id=components-cloud-masthead--default';

function clickUntilGone($el) {
  if ($el.is(':visible')) {
    cy.get($el)
      .click()
      .wait(1000)
      .then($clicked => {
        if ($clicked.is(':visible')) {
          clickUntilGone($clicked);
        }
      });
  }
}

describe('dds-masthead | cloud platform (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`/${_pathDefault}`);
    cy.wait(1000);
  });

  it('should have url for IBM logo', () => {
    cy.get('dds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = new URL($link.prop('href'));
        expect(['www.ibm.com', 'ibm.com']).to.include(url.host);
        expect(url.pathname).to.be.equal('/');
      });
  });

  it('should have cloud platform name', () => {
    cy.get('dds-cloud-top-nav-name')
      .shadow()
      .find('a')
      .then($link => {
        const url = new URL($link.prop('href'));
        const [langOrCloud, cloudOrNull] = url.pathname.split('/').filter(segment => segment !== '');
        expect(['www.ibm.com', 'ibm.com']).to.include(url.host);
        expect([langOrCloud, cloudOrNull]).to.include('cloud');
      });
  });

  it('should load top-nav with no more than one active item', () => {
    cy.get('dds-top-nav > *').then($topNavItems => {
      const $activeItems = $topNavItems.filter('[active]');
      expect($topNavItems.length).to.be.greaterThan(1);
      expect($activeItems.length).to.be.equal(1);
    });
  });

  it('should have tabbed-interface megamenus', () => {
    cy.get('dds-top-nav > dds-megamenu-top-nav-menu').each($megaMenuNavItem => {
      cy.get($megaMenuNavItem)
        .shadow()
        .find('a')
        .click({ force: true })
        .parent()
        .find('dds-cloud-megamenu')
        .should('be.visible')
        .get('dds-cloud-megamenu-tab', { withinSubject: $megaMenuNavItem })
        .each($tab => {
          cy.get($tab)
            .click('right')
            .then($tab => {
              const panelSelector = `#${$tab.attr('target')}`;
              cy.get(panelSelector).should('be.visible');
            });
        });
    });
  });

  it('should have functioning search bar with typeahead', () => {
    cy.get('.bx--header__search--search')
      .click({ force: true })
      .wait(1000)
      .get('.bx--header__search--input')
      .should('have.focus')
      .type('test', { force: true })
      .get('dds-search-with-typeahead-item')
      .then($results => {
        expect($results.length).to.be.equal(10);
      })
      .get('dds-megamenu-top-nav-menu, dds-top-nav-menu, dds-top-nav-menu-item')
      .should('not.be.visible');
  });

  it('should have contact, login, and create-account CTAs', () => {
    cy.get('dds-cloud-button-cta[data-ibm-contact="contact-link"]')
      .should('be.visible')
      .click({ force: true })
      .get('dds-cloud-button-cta[href="https://cloud.ibm.com/login"]')
      .should('be.visible')
      .click({ force: true })
      .get('dds-cloud-button-cta[kind="primary"]')
      .should('be.visible')
      .click({ force: true });
  });

  it('should be able to scroll all nav elements into view if necessary', () => {
    cy.viewport(960, 780)
      .get('dds-top-nav')
      .shadow()
      .find('button')
      .should($buttons => {
        expect($buttons).to.have.length(2);
      })
      .then($buttons => {
        let navItem, prevOffsetLeft;
        cy.get('.bx--header__nav')
          .then($nav => {
            navItem = $nav;
            prevOffsetLeft = $nav.offset().left;
          })
          .get($buttons[0])
          .click({ force: true })
          .wait(1000)
          .click({ force: true })
          .wait(1000)
          .then(() => {
            expect(navItem.offset().left).to.be.gte(prevOffsetLeft);
            prevOffsetLeft = navItem.offset().left;
          })
          .get($buttons[1])
          .click({ force: true })
          .wait(1000)
          .click({ force: true })
          .wait(1000)
          .then(() => {
            expect(navItem.offset().left).to.be.lte(prevOffsetLeft);
            prevOffsetLeft = navItem.offset().left;
          })
          .get($buttons[0])
          .click({ force: true })
          .wait(1000)
          .click({ force: true })
          .wait(1000)
          .then(() => {
            expect(navItem.offset().left).to.be.gte(prevOffsetLeft);
            prevOffsetLeft = navItem.offset().left;
          });
      });
  });
});

describe('dds-masthead | cloud platform (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 780);
    cy.visit(`/${_pathDefault}`);
  });

  it('should have url for IBM logo', () => {
    cy.get('dds-masthead-logo')
      .shadow()
      .find('a')
      .then($link => {
        const url = new URL($link.prop('href'));
        expect(['www.ibm.com', 'ibm.com']).to.include(url.host);
        expect(url.pathname).to.be.equal('/');
      });
  });

  it('should have cloud platform name', () => {
    cy.get('dds-cloud-top-nav-name')
      .shadow()
      .find('a')
      .then($link => {
        const url = new URL($link.prop('href'));
        const [langOrCloud, cloudOrNull] = url.pathname.split('/').filter(segment => segment !== '');
        expect(['www.ibm.com', 'ibm.com']).to.include(url.host);
        expect([langOrCloud, cloudOrNull]).to.include('cloud');
      });
  });

  it('should load menu hidden behind hamburger button', () => {
    cy.get('dds-top-nav')
      .should('not.be.visible')
      .get('dds-left-nav')
      .should('not.be.visible')
      .get('dds-masthead-menu-button')
      .click()
      .get('dds-left-nav')
      .should('be.visible');
  });

  it('should load top-nav with no more than one active item', () => {
    cy.get('dds-masthead-menu-button')
      .click()
      .get('dds-left-nav-menu-section[expanded] > *')
      .then($topNavItems => {
        const $activeItems = $topNavItems.filter('[active]');
        expect($topNavItems.length).to.be.greaterThan(1);
        expect($activeItems.length).to.be.equal(1);
      });
  });

  it('should have paged slide-out navigation', () => {
    cy.get('dds-masthead-menu-button')
      .click()
      .get('dds-left-nav-menu-section[expanded] > dds-left-nav-menu')
      .each($submenuItem => {
        const sectionSelector = `[section-id="${$submenuItem.attr('panel-id')}"]`;
        const backSelector = cy
          .get($submenuItem)
          .click()
          .get(sectionSelector)
          .should('be.visible')
          .shadow()
          .find('.bx--masthead__side-nav--submemu-back button')
          .click()
          .get($submenuItem)
          .should('be.visible');
      });
  });

  it('should have functioning search bar with typeahead', () => {
    cy.get('.bx--header__search--search')
      .click({ force: true })
      .wait(1000)
      .get('.bx--header__search--input')
      .should('have.focus')
      .type('test', { force: true })
      .get('dds-search-with-typeahead-item')
      .then($results => {
        expect($results.length).to.be.equal(10);
      })
      .get('dds-megamenu-top-nav-menu, dds-top-nav-menu, dds-top-nav-menu-item')
      .should('not.be.visible');
  });

  it('should have contact, login, and create-account CTAs', () => {
    cy.get('dds-masthead-menu-button')
      .click()
      .get('dds-cloud-left-nav-item[href="https://cloud.ibm.com/login"]')
      .should('be.visible')
      .get('dds-cloud-left-nav-item[href="https://cloud.ibm.com/registration"]')
      .should('be.visible');
  });
});
