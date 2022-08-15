/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the component selectors.
 *
 * @type {Object<string>}
 */
export const selectors = {
  annotation: '[data-autoid="dds--pricing-table-cell-annotation"]',
  annotationToggle: '[data-autoid="dds--pricing-table-annotation-toggle"]',
  body: '[data-autoid="dds--pricing-table-body"]',
  group: '[data-autoid="dds--pricing-table-group"]',
  headerRow: '[data-autoid="dds--pricing-table-header-row"]',
  headerCell: '[data-autoid="dds--pricing-table-header-cell"]',
  headerCellCta: '[data-autoid="dds--pricing-table-header-cell-cta"]',
  headerCellDescription: '[data-autoid="dds--pricing-table-header-cell-description"]',
  highlightLabel: '[data-autoid="dds--pricing-table-highlight-label"]',
  row: '[data-autoid="dds--pricing-table-row"]',
  table: '[data-autoid="dds--pricing-table"]',
};

/**
 * Collection of test scenarios that can be run against any Story.
 *
 * @param {string} path
 *   The Story path.
 * @return {Array<function>}
 */
export const createTests = path => [
  () => {
    it('should check a11y', () => {
      cy.visit(path);
      cy.injectAxe();
      cy.checkAxeA11y();
    });
  },
  () => {
    it('should render correctly in all themes', () => {
      cy.carbonThemesScreenshot({
        capture: 'viewport',
      });
    });
  },
  () => {
    it('should render customizable section heading', () => {
      let defaultHeading, customHeadingOutput;
      const customHeadingInput = 'Lorem ipsum dolor sit amet';
      const headerCellSimple = `${selectors.headerCell}[type="simple"]`;

      cy.visit(path)
        .get(selectors.table)
        .find(headerCellSimple)
        .then(([copy]) => {
          defaultHeading = copy.innerText.trim();
        })
        .visit(`${path}&knob-section%20heading=${customHeadingInput}`)
        .get(selectors.table)
        .find(headerCellSimple)
        .should(([copy]) => {
          customHeadingOutput = copy.innerText.trim();

          expect(customHeadingOutput).to.be.eq(customHeadingInput);
          expect(customHeadingOutput).to.not.eq(defaultHeading);
        });
    });
  },
  () => {
    it('should should support customizable highlighted column', () => {
      const highlightedCol = 3;
      const checkHighlight = row => {
        const children = row.children;
        const highlightedCell = children[highlightedCol - 1];
        expect(highlightedCell).to.have.class('highlighted');
      };

      cy.visit(`${path}&knob-highlighted%20column_PricingTable=${highlightedCol}`)
        .get(selectors.headerRow)
        .then($headerRow => {
          checkHighlight($headerRow[0]);
        })
        .get(selectors.row)
        .then($rows => {
          $rows.each((index, row) => {
            checkHighlight(row);
          });
        });
    });
  },
  () => {
    it('should support customizable label for highlighted column', () => {
      const customLabel = 'Lorem ipsum';
      cy.visit(`${path}&knob-highlighted%20label_PricingTable=${customLabel}`)
        .get(selectors.highlightLabel)
        .should('have.text', customLabel);
    });
  },
  () => {
    it('should render customizable number of columns', () => {
      const numberOfColumns = 5;

      cy.visit(`${path}&knob-number%20of%20columns_PricingTable=${numberOfColumns}`)
        .get(selectors.headerRow)
        .find(selectors.headerCell)
        .should('have.length', numberOfColumns)
        .get(selectors.row)
        .each($row => {
          expect($row.children().length).to.eq(numberOfColumns);
        });
    });
  },
  () => {
    it('should have header cells that support clickable CTA buttons', () => {
      cy.visit(path)
        .get(selectors.table)
        .find(selectors.headerCellCta)
        .each($cta => {
          const link = $cta[0].shadowRoot.querySelector('a');
          expect(link.getAttribute('href')).not.to.be.empty;
        });
    });
  },
  () => {
    it('should have rows that support toggling annotation visibility', () => {
      const getCellsWithAnnotations = $row =>
        Array.from($row[0].children).filter(cell => cell.querySelector(selectors.annotation));

      const getAnnotationHeight = cell => cell.querySelector(selectors.annotation).getBoundingClientRect().height;

      cy.visit(path)
        .get(selectors.row)
        .then($rows => $rows.filter((index, row) => row.querySelector(selectors.annotationToggle)).first())
        .as('firstRowWithAnnotations')
        .find(selectors.annotationToggle)
        .then($toggle => $toggle[0].shadowRoot.querySelector('button'))
        .as('firstRowWithAnnotationsToggle')
        .click({ force: true })
        .get('@firstRowWithAnnotations')
        .then($row => {
          const cells = getCellsWithAnnotations($row);
          cells.forEach(cell => {
            expect(getAnnotationHeight(cell)).not.to.eq(0);
          });
        })
        .get('@firstRowWithAnnotationsToggle')
        .click({ force: true })
        .get('@firstRowWithAnnotations')
        .then($row => {
          getCellsWithAnnotations($row).forEach(cell => {
            expect(getAnnotationHeight(cell)).to.eq(0);
          });
        });
    });
  },
];

/**
 * Collection of test scenarios that can be run against Stories rendered in
 * mobile size viewports.
 *
 * @param {string} path
 *   The Story path.
 * @return {Array<function>}
 */
export const createTestsMobile = path => [
  () => {
    it('should scroll horizontally', () => {
      cy.visit(path)
        .wait(1000)
        .get(selectors.headerRow)
        .find(selectors.headerCell)
        .last()
        .scrollIntoView()
        .should('be.visible');
    });
  },
];

export default createTests;
