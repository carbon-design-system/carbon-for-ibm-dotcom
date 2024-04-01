/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with L1)
 *
 * @type {string}
 * @private
 */
const _pathl1 = '/iframe.html?id=components-masthead--with-l-1&knob-use%20mock%20nav%20data%20(use-mock)=true';

/**
 * Selectors for elements that comprise the L1.
 */
const _selectors = {
  l1: 'c4d-masthead-l1',
  l1CtaContainer: 'c4d-masthead-l1-cta',
  l1Name: '.cds--masthead__l1-title',
  l1Login: '.cds--masthead__l1-login',
  l1Cta: '.cds--masthead__l1-cta',
  l1Menu: '.cds--masthead__l1-menu',
  l1Item: '.cds--masthead__l1-item',
  l1ScrollNextArrow: '#scroll-next',
  l1Dropdown: '.cds--masthead__l1-dropdown',
  l1DropdownAnnouncement: '.cds--masthead__l1-dropdown-announcement',
  l1DropdownLinks: '.cds--masthead__l1-dropdown-links',
  l1DropdownSection: '.cds--masthead__l1-dropdown-section',
  l1DropdownViewAll: '.cds--masthead__l1-dropdown-viewall',
};

describe('dds-masthead L1 | default (mobile)', () => {
  const mastheadButton = () => cy.get(_selectors.l1).shadow().find('.cds--masthead__l1-inner-container > button');

  beforeEach(() => {
    cy.viewport(320, 780).visit(`/${_pathl1}`);
  });

  it('should open L1 menu with all items', () => {
    mastheadButton().click();
    cy.get(`${_selectors.l1Dropdown} > li`).should('have.length', 9);
  });

  it('should open L1 sub menus', () => {
    mastheadButton().click();
    cy.get('.cds--masthead__l1-dropdown > li:nth-child(2)').click();
    cy.get('.cds--masthead__l1-dropdown-subsection > ul:first-child > li > a').should('have.length', 4);
  });
});


describe('cds-masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathl1}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('cds-top-nav-l1').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should render platform below the IBM logo', () => {
    cy.get(_selectors.l1).shadow().find(_selectors.l1Name).then($platform => {
      cy.get('c4d-masthead-logo').then($logo => {
        expect($logo[0].getBoundingClientRect().down).to.equal($platform[0].getBoundingClientRect().up);
      });
    });
  });

  it('should render and have url for L1 platform', () => {
    cy.get(_selectors.l1)
      .find(`a${_selectors.l1Name}`)
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should render menu items', () => {
    cy.get(_selectors.l1).shadow().find(_selectors.l1Item).should('exist');
  });

  it('should open dropdowns', () => {
    cy.get(_selectors.l1).shadow().find(`${_selectors.l1Item}`).first().as('l1Item').click();

    cy.get('@l1Item')
      .next(_selectors.l1Dropdown)
      .should('be.visible');

    cy.takeSnapshots();
  });

  it('should support basic link items', () => {
    cy.get(_selectors.l1)
      .shadow()
      .find(`a${_selectors.l1Item}`)
      .each($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support announcements in dropdowns', () => {
    cy.get(_selectors.l1).shadow().find(_selectors.l1Item).eq(1).as('l1Item').click();

    cy.get('@l1Item')
      .next(_selectors.l1Dropdown)
      .find(_selectors.l1DropdownAnnouncement)
      .should('be.visible');
  });

  it('should support view all links in dropdowns', () => {
    cy.get(_selectors.l1).shadow().find(_selectors.l1Item).eq(1).as('l1Item').click();

    cy.get('@l1Item')
      .next(_selectors.l1Dropdown)
      .find(_selectors.l1DropdownViewAll)
      .should('be.visible')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should support two column dropdowns', () => {
    cy.get(_selectors.l1)
      .shadow()
      .find(_selectors.l1Item)
      .eq(1)
      .click()
      .next(_selectors.l1Dropdown)
      .find(_selectors.l1DropdownSection)
      .then(sections => {
        const first = sections.get(0).getBoundingClientRect().left;
        const second = sections.get(1).getBoundingClientRect().left;

        expect(first).to.be.lessThan(second);
      });
  });

  it('should support asymmetrical two column dropdowns', () => {
    cy.get(_selectors.l1)
      .shadow()
      .find(_selectors.l1Item)
      .eq(3)
      .click()
      .next(_selectors.l1Dropdown)
      .find(`${_selectors.l1DropdownLinks} > *`)
      .then(columns => {
        const narrow = columns.filter('.cds--masthead__l1-dropdown-column-narrow').get(0).getBoundingClientRect().width;
        const wide = columns.filter('.cds--masthead__l1-dropdown-column-wide').get(0).getBoundingClientRect().width;

        expect(narrow).to.be.lessThan(wide);
      });
  });

  it('should support three column dropdowns', () => {
    cy.get(_selectors.l1)
      .shadow()
      .find(_selectors.l1Item)
      .eq(2)
      .click()
      .next(_selectors.l1Dropdown)
      .find(_selectors.l1DropdownSection)
      .then(sections => {
        const first = sections.get(0).getBoundingClientRect().left;
        const second = sections.get(1).getBoundingClientRect().left;
        const third = sections.get(2).getBoundingClientRect().left;

        expect(first).to.be.lessThan(second);
        expect(second).to.be.lessThan(third);
      });
  });

  it('should render a single login link', () => {
    cy.get(_selectors.l1)
      .shadow()
      .find(_selectors.l1Login)
      .should('have.length', 1)
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      })
  });

  it('should render a single CTA link', () => {
    cy.get(_selectors.l1CtaContainer)
      .shadow()
      .find(_selectors.l1Cta)
      .should('have.length', 1)
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      })
  });

  it('should have horizontal scroll for L1 items working', () => {
    cy.viewport(1100, 780);
    
    cy.get(_selectors.l1)
      .shadow()
      .find(_selectors.l1ScrollNextArrow)
      .click()
      .get(_selectors.l1)
      .shadow()
      .find(_selectors.l1Item)
      .eq(5)
      .should('be.visible');
  });
  
});

