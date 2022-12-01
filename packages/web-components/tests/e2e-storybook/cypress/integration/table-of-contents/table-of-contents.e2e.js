/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-table-of-contents--default',
  horizontal: 'iframe.html?id=components-table-of-contents--horizontal',
};

/**
 * Collection of all tests for dds-table-of-contents
 *
 * @property {function} all
 * @property {function} desktop
 * @property {function} mobile
 * @private
 */
const _tests = {
  /**
   * Collection of tests for use across browser dimensions.
   *
   * @function screenshotThemes - Takes a screenshot of the given page in each theme.
   */
  all: {
    screenshotThemes: () => {
      cy.carbonThemesScreenshot({
        capture: 'viewport',
      });
    },
    checkA11y: () => {
      cy.checkAxeA11y();
    },
  },
  /**
   * Collection of tests for use on desktop-sized viewports.
   *
   * @function checkRender            - Asserts [linkID] === [sectionID]
   * @function checkLinkFunctionality - Asserts each link scrolls page to proper position
   * @function checkScrollSpy         - Asserts each link updates onscroll properly
   * @function checkStickyNav         - Asserts navigation stays within viewport
   */
  desktop: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__desktop-container .bx--tableofcontents__desktop__item a')
        .each(link => {
          navItemsIds.push(link.attr('data-target'));
        })
        .get('h3[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);

          cy.takeSnapshots(
            'desktop',
            {},
            {
              capture: 'viewport',
            }
          );
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get('.bx--tableofcontents__desktop-container .bx--tableofcontents__desktop__item a').each(link => {
        cy.get(link)
          .click()
          .get(`[name="${link.attr('data-target')}"]`)
          .then((section, i) => {
            const sectionScrolledTo = section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
            if (i === 1) {
              cy.takeSnapshots(
                'desktop',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('h3[name]').each((section, i) => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get(`a[data-target="${section.attr('name')}"]`)
          .then(link => {
            expect(link.attr('aria-current')).to.equal('location');
            expect(link.parent()).to.have.class('bx--tableofcontents__desktop__item--active');
            if (i === 1) {
              cy.takeSnapshots(
                'desktop',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__desktop-container')
          .then(sidebar => {
            expect(sidebar.offset().top).to.be.greaterThan(0);
            if (pos === 'bottom') {
              cy.takeSnapshots(
                'desktop',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
  },
  /**
   * Collection of tests for use on mobile-sized viewports.
   *
   * @function checkRender            - Asserts [optionID] === [sectionID]
   * @function checkLinkFunctionality - Asserts each select option scrolls page to proper position
   * @function checkScrollSpy         - Asserts select nav updates onscroll properly
   * @function checkStickyNav         - Asserts navigation stays within viewport
   */
  mobile: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__mobile__select__option')
        .each(option => {
          navItemsIds.push(option.val());
        })
        .get('h3[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);
          cy.takeSnapshots(
            'mobile',
            {},
            {
              capture: 'viewport',
            }
          );
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get('.bx--tableofcontents__mobile__select__option').each((option, i) => {
        cy.get(option)
          .parent()
          .select(option.val())
          .get(`[name=${option.val()}]`)
          .then(section => {
            const sectionScrolledTo = section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
            if (i === 1) {
              cy.takeSnapshots(
                'mobile',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('h3[name]').each((section, i) => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get('.bx--tableofcontents__mobile__select')
          .then(select => {
            expect(select.val()).to.equal(section.attr('name'));
            if (i === 1) {
              cy.takeSnapshots(
                'mobile',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__mobile')
          .then(mobileNav => {
            expect(mobileNav.offset().top).to.be.greaterThan(0);
            if (pos === 'bottom') {
              cy.takeSnapshots(
                'mobile',
                {},
                {
                  capture: 'viewport',
                }
              );
            }
          });
      });
    },
  },
};

describe('dds-table-of-contents | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should navigate content to selected section', _tests.desktop.checkLinkFunctionality);
  xit('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.desktop.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
  it('should check a11y', _tests.all.checkA11y);
});

describe('dds-table-of-contents | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('should navigate content to selected section', _tests.mobile.checkLinkFunctionality);
  xit('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.mobile.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
  it('should check a11y', _tests.all.checkA11y);
});

describe('dds-table-of-contents | horizontal (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.horizontal}`);
    cy.injectAxe();
  });

  it('should navigate content to selected section', _tests.desktop.checkLinkFunctionality);
  xit('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.desktop.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
  it('should check a11y', _tests.all.checkA11y);
});
