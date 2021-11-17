/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-table-of-contents--default',
  heading: 'iframe.html?id=components-table-of-contents--with-heading-content',
  horizontal: 'iframe.html?id=components-table-of-contents--horizontal',
};

const _tests = {
  all: {
    screenshotThemes: () => {
      const themes = ['w', 'g10', 'g90', 'g100'];
      cy.wrap(['w', 'g10', 'g90', 'g100']).each(theme => {
        cy.get('html')
          .then(doc => doc.attr('storybook-carbon-theme', theme))
          .screenshot(`${Cypress.currentTest.titlePath[0]} [${theme.toUpperCase()}]`, {
            capture: 'viewport',
          });
      });
    },
  },
  desktop: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__desktop-container .bx--tableofcontents__desktop__item a')
        .each(link => {
          navItemsIds.push(link.attr('data-target'));
        })
        .get('a[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get('.bx--tableofcontents__desktop-container .bx--tableofcontents__desktop__item a').each(link => {
        cy.get(link)
          .click()
          .get(`a[name="${link.attr('data-target')}"]`)
          .then(section => {
            const sectionScrolledTo = section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('a[name]').each(section => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get(`a[data-target="${section.attr('name')}"]`)
          .then(link => {
            if (link[0].ariaCurrent !== 'location') {
              debugger;
            }
            expect(link.attr('aria-current')).to.equal('location');
            expect(link.parent()).to.have.class('bx--tableofcontents__desktop__item--active');
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__desktop-container')
          .then(sidebar => {
            expect(sidebar.offset().top).to.be.greaterThan(0);
          });
      });
    },
  },
  mobile: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__mobile__select__option')
        .each(option => {
          navItemsIds.push(option.val());
        })
        .get('a[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get('.bx--tableofcontents__mobile__select__option').each(option => {
        cy.get(option)
          .parent()
          .select(option.val())
          .get(`a[name=${option.val()}]`)
          .then(section => {
            const sectionScrolledTo = section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('a[name]').each(section => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get('.bx--tableofcontents__mobile__select')
          .then(select => {
            expect(select.val()).to.equal(section.attr('name'));
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__mobile')
          .then(mobileNav => {
            expect(mobileNav.offset().top).to.be.greaterThan(0);
          });
      });
    },
  },
};

describe('dds-table-of-contents | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load table of contents sidebar with links', _tests.desktop.checkRender);
  it('should navigate content to selected section', _tests.desktop.checkLinkFunctionality);
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.desktop.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('dds-table-of-contents | with heading content (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.heading}`);
  });

  it('should load table of contents sidebar with links', _tests.desktop.checkRender);
  it('should navigate content to selected section', _tests.desktop.checkLinkFunctionality);
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.desktop.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('dds-table-of-contents | horizontal (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.horizontal}`);
  });

  it('should load table of contents horizontal bar with links', _tests.desktop.checkRender);
  it('should navigate content to selected section', _tests.desktop.checkLinkFunctionality);
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.desktop.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('dds-table-of-contents | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load table of contents sidebar with links', _tests.mobile.checkRender);
  it('should navigate content to selected section', _tests.mobile.checkLinkFunctionality);
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.mobile.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('dds-table-of-contents | with heading content (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.heading}`);
  });

  it('should load table of contents sidebar with links', _tests.mobile.checkRender);
  it('should navigate content to selected section', _tests.mobile.checkLinkFunctionality);
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.mobile.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('dds-table-of-contents | horizontal (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.horizontal}`);
  });

  it('should load table of contents sidebar with links', _tests.mobile.checkRender);
  it('should navigate content to selected section', _tests.mobile.checkLinkFunctionality);
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it('should remain visible on page throughout scroll', _tests.mobile.checkStickyNav);
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});
