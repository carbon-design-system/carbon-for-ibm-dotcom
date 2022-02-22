/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('Masthead | with platform (desktop)', () => {
  beforeEach(() => {
    cy.visit(_pathPlatform);
    cy.injectAxe();
    cy.viewport(1280, 780);

    cy.waitUntil(() => cy.get('[data-autoid="dds--masthead-eco__l0-nav0"]').first().should('not.be.empty'));
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should load platform containing a link', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      }
    );
  });

  it('should render platform next to IBM logo', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-ecosystemname"]').then(
      $platform => {
        cy.get('[data-autoid="dds--masthead-eco__l0-logo"]').then($logo => {
          expect($logo[0].getBoundingClientRect().right).to.equal(
            $platform[0].parentElement.getBoundingClientRect().left
          );
        });
      }
    );
  });

  it('should open the search bar with platform', () => {
    cy.get('[data-autoid="dds--masthead-eco__l0-search"]').trigger('click');

    cy.takeSnapshots();
  });
});
