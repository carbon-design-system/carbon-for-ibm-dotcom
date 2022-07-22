/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Defines the default component variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-card--default';

/**
 * Defines the static component variant path.
 *
 * @type {string}
 * @private
 */
const _pathStatic = '/iframe.html?id=components-card--card-static';

/**
 * Defines the base card component selector.
 *
 * @type {string}
 * @private
 */
const _selectorBase = `[data-autoid="dds--card"]`;

/**
 * Defines the card element selectors.
 *
 * @type {Object.<string>}
 * @private
 */
const _selectors = {
  eyebrow: `${_selectorBase} .bx--card__eyebrow`,
  heading: `${_selectorBase} .bx--card__heading`,
  footer: `${_selectorBase} .bx--card__footer`,
  image: `${_selectorBase} .bx--image img`,
  copy: `${_selectorBase} .bx--card__copy`,
};

/**
 * Collection of all tests for DDSCard
 *
 * @property {function} screenshotThemes
 * @property {function} checkTextRenders
 * @property {function} checkClickableCard
 * @property {function} checkNonClickableCard
 * @property {function} checkImageRenders
 * @property {function} checkOutlineRenders
 * @property {function} checkInverseRenders
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.checkAxeA11y();
  },
  screenshotThemes: () => {
    cy.carbonThemesScreenshot({
      capture: 'viewport',
    });
  },
  checkTextRenders: () => {
    it('should render eyebrow content', () => {
      cy.get(_selectors.eyebrow).then($eyebrow => {
        expect($eyebrow).not.to.be.empty;
      });
    });

    it('should render heading content', () => {
      cy.get(_selectors.heading).then($heading => {
        expect($heading).not.to.be.empty;
      });
    });

    it('should render body copy content', () => {
      cy.get(_selectors.copy).then($copy => {
        expect($copy).not.to.be.empty;
      });
    });

    it('should render footer content', () => {
      cy.get(_selectors.footer).then($footer => {
        expect($footer).not.to.be.empty;
      });
    });
  },
  checkClickableCard: () => {
    it('should check for link', () => {
      cy.get(`.bx--card a.bx--link`).then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });
    });

    it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
      cy.get(`.bx--card a.bx--link`).then($els => {
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
  checkNonClickableCard: () => {
    it('should not respond to a click ', () => {
      let initialLocation;
      cy.location('href')
        .then(location => {
          initialLocation = location;
        })
        .get(_selectorBase)
        .click()
        .location('href')
        .then(location => {
          expect(location).to.equal(initialLocation);
        });
    });
  },
  checkImageRenders: path => {
    it('should render with image', () => {
      cy.visit(`${path}&knob-Add%20image:=true`);
      cy.get(_selectors.image).should('have.length', 1);
      cy.takeSnapshots();
    });
  },
  checkOutlineRenders: path => {
    it('should render with outline', () => {
      cy.visit(path);
      cy.get(_selectorBase).should('have.class', 'bx--card--border');
      // converted HEX var(--cds-ui-03, #e0e0e0) to RGB

      if (Cypress.browser.name !== 'firefox') {
        cy.get(_selectorBase)
          .should('have.css', 'border')
          .and('equal', '1px solid rgb(224, 224, 224)');
      }

      cy.get(_selectorBase).should('have.class', 'bx--card--light');
      // converted HEX var(--cds-ui-02, #ffffff) to RGB
      cy.get(_selectorBase)
        .should('have.css', 'background-color')
        .and('equal', 'rgb(255, 255, 255)');

      cy.takeSnapshots();
    });
  },
  checkInverseRenders: path => {
    it('should render with inverse', () => {
      cy.visit(`${path}&knob-Card%20style:=Inverse%20card`);
      cy.get(_selectorBase).should('have.class', 'bx--card--inverse');
      // converted HEX var(--cds-inverse-02, #393939) to RGB
      cy.get(_selectorBase)
        .should('have.css', 'background-color')
        .and('equal', 'rgb(57, 57, 57)');

      cy.takeSnapshots();
    });
  },
};

describe('Card | Default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`${_path}&knob-Body%20copy:=copy`);
    cy.injectAxe();
  });

  _tests.checkTextRenders();
  _tests.checkClickableCard();
  _tests.checkImageRenders(_path);
  _tests.checkOutlineRenders(
    `${_path}&knob-Card%20style:=Outlined%20card`
  );
  _tests.checkInverseRenders(_path);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('Card | Static (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`${_pathStatic}&knob-Add%20CTA:=true`);
    cy.injectAxe();
  });

  _tests.checkTextRenders();
  _tests.checkNonClickableCard();
  _tests.checkImageRenders(_pathStatic);
  _tests.checkOutlineRenders(`${_pathStatic}&knob-Outlined%20card=true`);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});
