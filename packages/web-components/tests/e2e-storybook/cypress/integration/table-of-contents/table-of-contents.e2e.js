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
  all: {},
  desktop: {
    checkRender: () => {
      cy.get('dds-table-of-contents').then(([component]) => {
        const shadowRoot = component.shadowRoot;
        const desktopContainer = shadowRoot.querySelectorAll('.bx--tableofcontents__desktop-container');
        expect(desktopContainer).to.have.lengthOf(1);

        // Get IDs of all sections that will be slotted in
        const sections = component.querySelectorAll('a[name]');
        const sectionIds = [];
        Array.from(sections).forEach(section => {
          sectionIds.push(section.getAttribute('name'));
        });

        // Get IDs of all manufactured TOC links
        const links = desktopContainer[0].querySelectorAll('a[data-target]');
        const linkIds = [];
        Array.from(links).forEach(link => {
          linkIds.push(link.dataset.target);
        });

        // Each section's ID should have a matching TOC link ID
        expect(sectionIds).to.deep.equal(linkIds);
      });
    },
    checkLinkFunctionality: () => {
      cy.get('dds-table-of-contents').then(([component]) => {
        const shadowRoot = component.shadowRoot;
        const links = shadowRoot.querySelectorAll('.bx--tableofcontents__desktop-container a[data-target]');

        const maxScrollVal = document.body.clientHeight - window.innerHeight;

        for (const link of links) {
          const section = component.querySelector(`a[name="${link.dataset.target}"]`);
          cy.get(link)
            .click()
            .wait(1000)
            .then(() => {
              const sectionScrolledTo = section.getBoundingClientRect().y === 0 || window.scrollY === maxScrollVal;
              expect(sectionScrolledTo).to.be.true;
            });
        }
      });
    },
    checkScrollSpy: () => {
      cy.get('dds-table-of-contents').then(([component]) => {
        const shadowRoot = component.shadowRoot;
        const sections = Array.from(component.querySelectorAll('a[name]'));

        const maxScrollVal = document.body.clientHeight - window.innerHeight;

        for (const section of sections) {
          const isLastSection = sections.indexOf(section) === sections.length - 1;

          const link = shadowRoot.querySelector(
            `.bx--tableofcontents__desktop-container a[data-target="${section.getAttribute('name')}"]`
          );

          // Links update when section is 50px from top
          if (!isLastSection) {
            cy.scrollTo(0, section.offsetTop - 45);
          } else {
            cy.scrollTo('bottom');
          }

          cy.wait(1000).then(() => {
            const linkIsIndicated =
              link.getAttribute('aria-current') === 'location' &&
              link.parentElement.classList.contains('bx--tableofcontents__desktop__item--active');

            expect(linkIsIndicated).to.be.true;
          });
        }
      });
    },
    checkStickyNav: () => {
      const positions = ['top', 'center', 'bottom'];

      for (const position of positions) {
        cy.scrollTo(position).then(() => {
          cy.get('.bx--tableofcontents__desktop-container').then(([sidebar]) => {
            const bounds = sidebar.getBoundingClientRect();

            const sidebarInView = bounds.top >= 0 && bounds.bottom <= 720 && bounds.left >= 0 && bounds.right <= 1280;

            expect(sidebarInView).to.be.true;
          });
        });
      }
    },
    screenshotThemes: () => {
      const themes = ['w', 'g10', 'g90', 'g100'];

      for (const theme of themes) {
        cy.get('html')
          .then(([doc]) => doc.setAttribute('storybook-carbon-theme', theme))
          .screenshot(`${Cypress.currentTest.titlePath[0]} [${theme.toUpperCase()}]`, {
            capture: 'viewport',
          });
        // Take a snapshot for visual diffing
        // TODO: click states currently not working in percy for web components
        // cy.percySnapshot('dds-leadspace | tall | g100 theme', {
        //   widths: [1280],
        // });
      }
    },
  },
  mobile: {},
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
  it('should render correctly in all themes', _tests.desktop.screenshotThemes);
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
  it('should render correctly in all themes', _tests.desktop.screenshotThemes);
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
  it('should render correctly in all themes', _tests.desktop.screenshotThemes);
});

// describe('dds-table-of-contents | default (mobile)', () => { });
// describe('dds-table-of-contents | with heading content (mobile)', () => { });
// describe('dds-table-of-contents | horizontal (mobile)', () => { });
