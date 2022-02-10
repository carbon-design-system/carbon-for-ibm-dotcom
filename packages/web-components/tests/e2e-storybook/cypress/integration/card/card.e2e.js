/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import getCssPropertyForRule from '../../utils/get-css-property-for-rule';

/**
 * Defines the component variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-card--default';

/**
 * Defines the pictogram component variant path.
 *
 * @type {string}
 * @private
 */
const _pathPictogram = '/iframe.html?id=components-card--pictogram';

/**
 * Defines the static component variant path.
 *
 * @type {string}
 * @private
 */
const _pathStatic = '/iframe.html?id=components-card--static';

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
  eyebrow: `${_selectorBase} [data-autoid="dds--card-eyebrow"]`,
  heading: `${_selectorBase} [data-autoid="dds--card-heading"]`,
  footer: `${_selectorBase} [data-autoid="dds--card-footer"]`,
  image: `${_selectorBase} [data-autoid="dds--image"]`,
  tagGroup: `${_selectorBase} [data-autoid="dds--tag-group"]`,
  copy: `${_selectorBase} p`,
};

/**
 * Collection of all tests for dds-card
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
  checkClickableCard: pictogram => {
    if (pictogram) {
      it('should check for link', () => {
        cy.get('dds-card').should('have.attr', 'href');
      });
    } else {
      it('should check for link', () => {
        cy.get('dds-card > dds-card-footer')
          .shadow()
          .find('a.bx--card__footer')
          .then($link => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });

      it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
        cy.get('dds-card > dds-card-footer')
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
    }
  },
  checkTabbableCard: () => {
    it('should check tabbable', () => {
      cy.get('dds-card > dds-card-footer')
        .shadow()
        .find('a.bx--card__footer')
        .focus();
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
      cy.visit(`${path}&knob-Add%20image:_Card=true`);
      cy.get(_selectors.image).should('have.length', 1);
      cy.takeSnapshots();
    });
  },
  checkTagGroupRenders: path => {
    it('should render with tag group', () => {
      cy.visit(`${path}&knob-Add%20tags:_Card=true`);
      cy.get(_selectors.tagGroup).should('have.length', 1);
      cy.takeSnapshots();
    });
  },
  checkOutlineRenders: path => {
    it('should render with outline', () => {
      cy.visit(path);
      cy.get(_selectorBase).should('have.attr', 'border');
      // converted HEX var(--cds-ui-03, #e0e0e0) to RGB
      if (Cypress.browser.name !== 'firefox') {
        cy.get(_selectorBase)
          .shadow()
          .find('.bx--card')
          .should('have.css', 'border')
          .and('equal', '1px solid rgb(224, 224, 224)');
      }

      cy.get(_selectorBase).should('have.attr', 'color-scheme', 'light');
      // converted HEX var(--cds-ui-02, #ffffff) to RGB
      cy.get(_selectorBase)
        .shadow()
        .find('.bx--card__wrapper')
        .should('have.css', 'background-color')
        .and('equal', 'rgb(255, 255, 255)');
      cy.takeSnapshots();
    });
  },
  checkInverseRenders: path => {
    it('should render with inverse', () => {
      cy.visit(path);
      cy.get(_selectorBase).should('have.attr', 'color-scheme', 'inverse');
      // converted HEX var(--cds-inverse-02, #393939) to RGB
      cy.get(_selectorBase)
        .should('have.css', 'background-color')
        .and('equal', 'rgb(57, 57, 57)');

      cy.takeSnapshots();
    });
  },
  pictogramPosition: position => {
    if (position === 'top') {
      it('should check for pictogram at the top', () => {
        cy.get('dds-card').should('have.attr', 'pictogram-placement', 'top');
        cy.get('dds-card svg').then($content => {
          expect($content[0].getBoundingClientRect().top).to.equal(32);
          expect($content[0].getBoundingClientRect().bottom).to.equal(80);
        });
      });
    } else {
      it('should check for pictogram at the bottom with text showing on hover', () => {
        cy.visit(`/${_pathPictogram}&knob-Pictogram%20position:_PictogramCard=bottom`);

        cy.get('dds-card').should('have.attr', 'pictogram-placement', 'bottom');
        cy.get('dds-card svg').then($content => {
          expect($content[0].getBoundingClientRect().top).to.equal(186);
          expect($content[0].getBoundingClientRect().bottom).to.equal(234);
        });

        cy.get('dds-card').then($el => {
          const sheets = $el[0].shadowRoot.adoptedStyleSheets;

          if (sheets) {
            const hover = getCssPropertyForRule(
              ':host(dds-card[pictogram-placement="bottom"]:hover) .bx--card__copy',
              'display',
              sheets
            );
            expect(hover).to.not.equal('none');
          }
        });
        cy.get('dds-card p').should('not.be.empty');
        cy.takeSnapshots();
      });
    }
  },
};

describe('dds-card | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_path}&knob-Body%20copy:_Card=copy`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkTextRenders();
  _tests.checkClickableCard();
  _tests.checkTabbableCard();
  _tests.checkImageRenders(_path);
  _tests.checkTagGroupRenders(_path);
  _tests.checkInverseRenders(`${_path}&knob-Card%20style:_Card=Inverse%20card`);
  _tests.checkOutlineRenders(`${_path}&knob-Card%20style:_Card=Outlined%20card`);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('dds-card | pictogram (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathPictogram}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkClickableCard(true);
  _tests.pictogramPosition('top');
  _tests.pictogramPosition('bottom');
  _tests.checkInverseRenders(`${_pathPictogram}&knob-Card%20style:_PictogramCard=Inverse%20card`);
  _tests.checkOutlineRenders(`${_pathPictogram}&knob-Card%20style:_PictogramCard=Outlined%20card`);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('dds-card | static (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathStatic}&knob-Add%20CTA:_Card=true`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkTextRenders();
  _tests.checkClickableCard();
  _tests.checkImageRenders(_pathStatic);
  _tests.checkTagGroupRenders(_pathStatic);
  _tests.checkOutlineRenders(`${_pathStatic}&knob-Outlined%20card_Card=true`);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});
