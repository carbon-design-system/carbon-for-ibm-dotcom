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
  withCta: 'iframe.html?id=components-card-section-simple--with-cta',
};

/**
 * Collection of all tests for DDSCardSectionSimple
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
    cy.get('.bx--link.bx--card__footer').each($els => {
      const win = $els[0].ownerDocument.defaultView;
      const after = win.getComputedStyle($els[0], ':after');
      const positionValue = after.getPropertyValue('position');
      const insetValue = after.getPropertyValue('inset');

      expect(positionValue).to.eq('absolute');
      if (Cypress.browser.name !== 'firefox') {
        expect(insetValue).to.eq('0px');
      }
    });
  },
  checkForTitlePosition: () => {
    cy.get('.bx--content-section__heading').then(heading => {
      expect(
        heading.offset().left == 16 || heading.offset().left == 32
      ).to.be.eq(true);
      expect(heading.css('textAlign')).to.be.eq('start');
    });
  },
  checkForCardContent: () => {
    cy.get('.bx--card-group__card').each($card => {
      expect(Cypress.dom.isVisible($card.find('.bx--card__heading'))).to.be.eq(
        true
      );
      expect(Cypress.dom.isVisible($card.find('.bx--card__copy'))).to.be.eq(
        true
      );
      expect(Cypress.dom.isVisible($card.find('.bx--card__footer'))).to.be.eq(
        true
      );
    });
  },
  checkThemes: () => {
    cy.wait(3000);

    cy.carbonThemesScreenshot();
  },
};

describe('DDSCardSectionSimple | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should render correctly in all themes', _tests.checkThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('DDSCardSectionSimple | with cta (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should render correctly in all themes', _tests.checkThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('DDSCardSectionSimple | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should render correctly in all themes', _tests.checkThemes);
});

describe('DDSCardSectionSimple | with cta (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', _tests.checkForBlocklink);
  it('should load left-aligned section title', _tests.checkForTitlePosition);
  it('should load heading, copy, cta on each card', _tests.checkForCardContent);
  it('should render correctly in all themes', _tests.checkThemes);
});
