/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @param default - Path to default variant
 * @param withCta - path to variant with CTA card
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-card-section-simple--default',
};

/**
 * Collection of all tests for dds-card-section-simple
 *
 * @function checkForBlocklink - Asserts a full-sized pseudoelement from the footer link
 * @function checkForTitlePosition - Asserts left-aligned title (16 || 32)px from left edge
 * @function checkForCardContent - Asserts that all card child elements are rendered in shadowRoot slots
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.checkAxeA11y();
  },
  checkForBlocklink: () => {
    cy.get('dds-card-group-item > dds-card-cta-footer').each(footer => {
      cy.get(footer)
        .shadow()
        .find('a')
        .then($els => {
          const win = $els[0].ownerDocument.defaultView;
          const after = win.getComputedStyle($els[0], ':after');
          const positionValue = after.getPropertyValue('position');
          const insetValue = after.getPropertyValue('inset');

          expect(positionValue).to.eq('absolute');
          if (Cypress.browser.name !== 'firefox') {
            expect(insetValue).to.eq('0px');
          }
        });
    });
  },
  checkForTitlePosition: () => {
    cy.get('dds-content-section-heading').then(heading => {
      expect(heading.offset().left == 16 || heading.offset().left == 32).to.be.eq(true);
      expect(heading.css('textAlign')).to.be.eq('start');
    });
  },
  checkForCardContent: () => {
    cy.get('dds-card-group-item').each(card => {
      card.children().each((_i, child) => {
        const cardRoot = card[0].shadowRoot;
        expect(child.assignedSlot.getRootNode()).to.be.eq(cardRoot);
      });
    });
  },
  checkCTACard: () => {
    cy.visit(`${_paths.default}&knob-With%20CTA:=true`);
    cy.get('dds-card-group-item')
      .last()
      .should('have.attr', 'color-scheme', 'inverse');
  },
  checkCardWithImages: () => {
    cy.visit(`${_paths.default}&knob-With%20images:=true`);
    cy.get('dds-card-group-item > dds-image').each($img => {
      cy.wrap($img).should('be.visible');
    });
  },
  checkThemes: () => {
    cy.carbonThemesScreenshot();
  },
};

describe('dds-card-section-simple | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should check if CTA card rendered', _tests.checkCTACard);
  it('should check if cards with images rendered', _tests.checkCardWithImages);
  it('should render correctly in all themes', _tests.checkThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('dds-card-section-simple | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should check if CTA card rendered', _tests.checkCTACard);
  it('should check if cards with images rendered', _tests.checkCardWithImages);
  it('should render correctly in all themes', _tests.checkThemes);
  it('should check a11y', _tests.checkA11y);
});
