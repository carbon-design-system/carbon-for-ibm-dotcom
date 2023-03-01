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

describe('dds-masthead | with L1 (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathl1}`);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('dds-top-nav-l1').should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should render platform below the IBM logo', () => {
    cy.get('dds-masthead-l1-name').then($platform => {
      cy.get('dds-masthead-logo').then($logo => {
        expect($logo[0].getBoundingClientRect().down).to.equal($platform[0].getBoundingClientRect().up);
      });
    });
  });

  it('should render and have url for L1 platform', () => {
    cy.get('dds-masthead-l1-name')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  // @todo <dds-top-nav-item /> children of the L1 presently render the L0 items
  //   so this test will fail as it doesn't include the expected active text
  //   link. Skipping until L1 work is implemented.
  it.skip('should load l1 menu item with selected state', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(1)').then($menuItem => {
      expect($menuItem).to.have.attr('active');
    });

    cy.takeSnapshots();
  });

  // @todo <dds-top-nav-item /> children of the L1 presently render the L0 items
  //   so this test will fail as it includes more items than the mock L1 data,
  //   which gets ignored. Skipping until L1 work is implemented.
  it.skip('should render 5 menu items', () => {
    cy.get('dds-top-nav-l1 > * ').should('have.length', 5);
  });

  it('should load the l1 - first nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(1)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load the l1 - second nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(2)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  it('should load and have url for third l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(3)')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
  });

  // @todo <dds-top-nav-item /> children of the L1 presently render the L0 items
  //   so this test will fail as the L0 items take up a lot of space, forcing
  //   next button and hiding the item we attempt to click here. Not worth
  //   fixing until the L1 work is further along.
  it.skip('should load the l1 - fourth nav item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(4)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });
  });

  // @todo <dds-top-nav-item /> children of the L1 presently render the L0 items
  //   so this test will fail as the L0 items take up a lot of space, forcing
  //   next button and hiding the item we attempt to click here. Not worth
  //   fixing until the L1 work is further along.
  it.skip('should load and have url for fifth l1 item', () => {
    cy.get('dds-top-nav-l1 > *:nth-child(5)')
      .click()
      .then($menuItem => {
        expect($menuItem).to.have.attr('expanded');
      });
  });
});
