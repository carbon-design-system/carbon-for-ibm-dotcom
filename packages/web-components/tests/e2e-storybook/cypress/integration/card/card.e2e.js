/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

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
const _selectorBase = `[data-autoid="c4d--card"]`;

/**
 * Defines the card element selectors.
 *
 * @type {Object.<string>}
 * @private
 */
const _selectors = {
  eyebrow: `${_selectorBase} [data-autoid="c4d--card-eyebrow"]`,
  heading: `${_selectorBase} [data-autoid="c4d--card-heading"]`,
  footer: `${_selectorBase} [data-autoid="c4d--card-footer"]`,
  image: `${_selectorBase} [data-autoid="c4d--image"]`,
  tagGroup: `${_selectorBase} div`,
  copy: `${_selectorBase} p`,
};

/**
 * Collection of all tests for c4d-card
 *
 * @property {function} screenshotThemes
 * @property {function} checkTextRenders
 * @property {function} checkClickableCard
 * @property {function} checkNonClickableCard
 * @property {function} checkImageRenders
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
  checkTextRenders: (emptyFooter = false) => {
    it('should render eyebrow content', () => {
      cy.get(_selectors.eyebrow).then(($eyebrow) => {
        expect($eyebrow).not.to.be.empty;
      });
    });

    it('should render heading content', () => {
      cy.get(_selectors.heading).then(($heading) => {
        expect($heading).not.to.be.empty;
      });
    });

    it('should render body copy content', () => {
      cy.get(_selectors.copy).then(($copy) => {
        expect($copy).not.to.be.empty;
      });
    });

    if (emptyFooter) {
      it('should not render footer content', () => {
        cy.get(_selectors.footer).then(($footer) => {
          expect($footer).to.be.empty;
        });
      });
    } else {
      it('should render footer content', () => {
        cy.get(_selectors.footer).then(($footer) => {
          expect($footer).not.to.be.empty;
        });
      });
    }
  },
  checkClickableCard: (pictogram) => {
    if (pictogram) {
      it('should check for link', () => {
        cy.get('c4d-card').should('have.attr', 'href');
      });
    } else {
      it('should check for link', () => {
        cy.get('c4d-card > c4d-card-footer')
          .shadow()
          .find('a.cds--card__footer')
          .then(($link) => {
            const url = $link.prop('href');
            expect(url).not.to.be.empty;
          });
      });

      it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
        cy.get('c4d-card > c4d-card-footer')
          .shadow()
          .find('a')
          .then(($els) => {
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
      cy.get('c4d-card > c4d-card-footer')
        .shadow()
        .find('a.cds--card__footer')
        .focus();
    });
  },
  checkNonClickableCard: () => {
    it('should not respond to a click ', () => {
      let initialLocation;
      cy.location('href')
        .then((location) => {
          initialLocation = location;
        })
        .get(_selectorBase)
        .click()
        .location('href')
        .then((location) => {
          expect(location).to.equal(initialLocation);
        });
    });
  },
  checkImageRenders: (path, groupId = '') => {
    it('should render with image', () => {
      cy.visit(`${path}&knob-Add%20image:${groupId}=true`);
      cy.get(_selectors.image).should('have.length', 1);
      cy.takeSnapshots();
    });
  },
  checkTagGroupRenders: (path, groupId = '') => {
    it('should render with tag group', () => {
      cy.visit(`${path}&knob-Add%20tags:${groupId}=true`);
      cy.get(_selectors.tagGroup).should('have.length', 2);
      cy.takeSnapshots();
    });
  },
  checkInverseRenders: (path) => {
    it('should render with inverse', () => {
      cy.visit(path);
      cy.get(_selectorBase).should('have.attr', 'color-scheme', 'inverse');
      // converted HEX var(--cds-inverse-02, #393939) to RGB
      cy.get(_selectorBase)
        .shadow()
        .find('.cds--card')
        .should('have.css', 'background-color')
        .and('equal', 'rgb(57, 57, 57)');

      cy.takeSnapshots();
    });
  },
  pictogramPosition: (position, groupId = '') => {
    if (position === 'top') {
      it('should check for pictogram at the top', () => {
        cy.visit(`${_pathPictogram}&knob-Pictogram%20position:${groupId}=top`);
        cy.get('c4d-card').should('have.attr', 'pictogram-placement', 'top');
        cy.get('c4d-card svg').then(($content) => {
          expect($content[0].getBoundingClientRect().top).to.equal(33);
          expect($content[0].getBoundingClientRect().bottom).to.equal(81);
        });
      });
    } else {
      it('should check for pictogram at the bottom', () => {
        cy.visit(
          `${_pathPictogram}&knob-Pictogram%20position:${groupId}=bottom`
        );
        cy.get('c4d-card').should('have.attr', 'pictogram-placement', 'bottom');
        cy.get('c4d-card svg').then(($content) => {
          expect($content[0].getBoundingClientRect().top).to.equal(221);
          expect($content[0].getBoundingClientRect().bottom).to.equal(269);
        });
      });
    }
  },
};

describe('c4d-card | default (desktop)', () => {
  const groupId = '_Default';
  beforeEach(() => {
    cy.visit(`${_path}&knob-Body%20copy:=test`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkTextRenders(true);
  _tests.checkClickableCard();
  _tests.checkTabbableCard();
  _tests.checkImageRenders(_path);
  _tests.checkTagGroupRenders(_path);
  _tests.checkInverseRenders(`${_path}&knob-Card%20style:=Inverse%20card`);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('c4d-card | pictogram (desktop)', () => {
  const groupId = '_pictogram';
  beforeEach(() => {
    cy.visit(`${_pathPictogram}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkClickableCard(true);
  _tests.pictogramPosition('top', '_pictogram');
  _tests.pictogramPosition('bottom', '_pictogram');
  _tests.checkInverseRenders(
    `${_pathPictogram}&knob-Card%20style:${groupId}=Inverse%20card`
  );
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});

describe('c4d-card | static (desktop)', () => {
  const groupId = '_static';
  beforeEach(() => {
    cy.visit(`${_pathStatic}&knob-Add%20CTA:${groupId}=true`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  _tests.checkTextRenders();
  _tests.checkClickableCard();
  _tests.checkImageRenders(_pathStatic, groupId);
  _tests.checkTagGroupRenders(_pathStatic, groupId);
  it('should render correctly in all themes', _tests.screenshotThemes);
  it('should check a11y', _tests.checkA11y);
});
