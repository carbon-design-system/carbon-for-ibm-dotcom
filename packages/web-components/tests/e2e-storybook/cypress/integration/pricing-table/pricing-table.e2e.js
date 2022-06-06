/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the Story paths.
 *
 * @type {string}
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-pricing-table--default',
  noRowHeaders: 'iframe.html?id=components-pricing-table--without-row-headers',
  subheaders: 'iframe.html?id=components-pricing-table--with-subheaders',
};

/**
 * Defines the component selectors.
 *
 * @type {Array<string>}
 * @private
 */
const _selectors = {
  table: '[data-autoid="dds--pricing-table"]',
  headerRow: '[data-autoid="dds--pricing-table-header-row"]',
  headerCell: '[data-autoid="dds--pricing-table-header-cell"]',
  group: '[data-autoid="dds--pricing-table-group"]',
  row: '[data-autoid="dds--pricing-table-row"]',
  annotationToggle: '[data-autoid="dds--pricing-table-annotation-toggle"]',
  annotation: '[data-autoid="dds--pricing-table-annotation"]',
};

/**
 * Collection of test scenarios that should be run against all Stories.
 *
 * @param {string} path
 *   The Story path.
 * @return {Array<function>}
 * @private
 */
const _createTests = (path) => [
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
      const headerCellSimple = `${_selectors.headerCell}[type="simple"]`;

      cy.visit(path)
        .get(_selectors.table)
        .find(headerCellSimple)
        .then(([copy]) => {
          defaultHeading = copy.innerText.trim();
        })
        .visit(`${path}&knob-section%20heading_PricingTable=${customHeadingInput}`)
        .get(_selectors.table)
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
      const checkHighlight = (row) => {
        const children = row.children;
        const highlightedCell = children[highlightedCol - 1];
        expect(highlightedCell).to.have.class('highlighted');
      }
      cy.visit(`${path}&knob-highlighted%20column_PricingTable=${highlightedCol}`)
        .get(_selectors.headerRow)
        .then($headerRow => {
          checkHighlight($headerRow[0]);
        })
        .get(_selectors.row)
        .then($rows => {
          $rows.each((index, row) => {
            checkHighlight(row);
          })
        });
    });
  },
  () => {
    it('should support customizable label for highlighted column', () => {
      const customLabel = 'Lorem ipsum';
      cy.visit(`${path}&knob-highlighted%20label_PricingTable=${customLabel}`)
        .get('[data-autoid="dds--pricing-table-highlight-label"]')
        .should('have.text', customLabel);
    });
  },
  () => {
    it('should render customizable number of columns', () => {
      const numberOfColumns = 5;

      cy.visit(`${path}&knob-number%20of%20columns_PricingTable=${numberOfColumns}`)
        .get(_selectors.headerRow)
        .find(_selectors.headerCell)
        .should('have.length', numberOfColumns)
        .get(_selectors.row)
        .each($row => {
          expect($row.children().length).to.eq(numberOfColumns);
        });
    });
  },
  () => {
    it('should have header cells that support clickable CTA buttons', () => {
      cy.visit(path)
        .get(_selectors.table)
        .find('[data-autoid="dds--pricing-table-header-cell-cta"]')
        .each($cta => {
          const link = $cta[0].shadowRoot.querySelector('a');
          expect(link.getAttribute('href')).not.to.be.empty;
        });
    });
  },
  () => {
    it('should have rows that support toggling annotation visibility', () => {
      const getCellsWithAnnotations = ($row) => {
        return Array.from($row[0].children).filter(cell => cell.querySelector(_selectors.annotation));
      };

      cy.visit(path)
        .get(_selectors.row)
        .then($rows => (
          $rows.filter((index, row) => (
            row.querySelector(_selectors.annotationToggle)
          )).first()
        ))
        .as('firstRowWithAnnotations')
        .find(_selectors.annotationToggle)
        .as('firstRowWithAnnotationsToggle')
        .click()
        .get('@firstRowWithAnnotations')
        .then($row => {
          getCellsWithAnnotations($row).forEach(cell => {
            expect(cell).to.have.class('annotation-visible')
          });
        })
        .get('@firstRowWithAnnotationsToggle')
        .click()
        .get('@firstRowWithAnnotations')
        .then($row => {
          getCellsWithAnnotations($row).forEach(cell => {
            expect(cell).not.to.have.class('annotation-visible')
          });
        });
    });
  },
];

/**
 * Collection of test scenarios that should be run against Stories rendered in
 * mobile size viewports.
 *
 * @param {string} path
 *   The Story path.
 * @return {Array<function>}
 * @private
 */
const _createTestsMobile = (path) => [
  () => {
    it('should scroll horizontally', () => {
      cy.visit(path)
        .get(_selectors.table)
        .scrollTo('right');
      cy.takeSnapshots();
    })
  },
];

/**
 * Collection of test scenarios that should only be run against the default
 * Story.
 *
 * @return {Array<function>}
 * @private
 */
const _createTestsStoryDefault = () => [
  () => {
    it('should have header cells for each row', () => {
      cy.visit(_paths.default)
        .get(_selectors.row)
        .then($rows => {
          $rows.each((index, row) => {
            const headerCell = row.querySelector(_selectors.headerCell);
            expect(headerCell).not.to.eq(null);
          });
        });
    });
  },
];

/**
 * Collection of test scenarios that should only be run against the With
 * Subheaders Story.
 *
 * @return {Array<function>}
 * @private
 */
const _createTestsStorySubheader = () => [
  () => {
    it('should have subheaders each table group', () => {
      cy.visit(_paths.subheaders)
        .get(_selectors.group)
        .each(($group, index) => {
          expect($group[0].shadowRoot.querySelector('tr > th')).not.to.eq(null);
        });
    });
  },
];

describe('dds-pricing-table | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  [
    ..._createTests(_paths.default),
    ..._createTestsStoryDefault()
  ].forEach(test => test());
});

describe('dds-pricing-table | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [
    ..._createTests(_paths.default),
    ..._createTestsMobile(_paths.default),
    ..._createTestsStoryDefault(),
  ].forEach(test => test());
});

describe('dds-pricing-table | no row headers (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  _createTests(_paths.noRowHeaders).forEach(test => test());
});

describe('dds-pricing-table | no row headers (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [
    ..._createTests(_paths.noRowHeaders),
    ... _createTestsMobile(_paths.noRowHeaders),
  ].forEach(test => test());
});

describe('dds-pricing-table | with subheaders (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
  });

  [
    ..._createTests(_paths.subheaders),
    ..._createTestsStorySubheader(),
  ].forEach(test => test());
});

describe('dds-pricing-table | with subheaders (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
  });

  [
    ..._createTests(_paths.noRowHeaders),
    ..._createTestsMobile(_paths.noRowHeaders),
    ..._createTestsStorySubheader(),
  ].forEach(test => test());
});
