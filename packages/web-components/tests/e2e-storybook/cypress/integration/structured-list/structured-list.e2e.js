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
const _pathRoot = '/iframe.html?id=components-structured-list';

describe('cds-structured-list | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--default`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have column headers', () => {
    cy.get('cds-structured-list-header-row cds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });
});

describe('cds-structured-list | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--default`)
      .injectAxe()
      .viewport(320, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have column headers', () => {
    cy.get('cds-structured-list-header-row cds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('cds-structured-list-header-cell, cds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('cds-structured-list | With Row Headers (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-row-headers`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have row headers', () => {
    cy.get('cds-structured-list-row cds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });
});

describe('cds-structured-list | With Row Headers (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-row-headers`)
      .injectAxe()
      .viewport(320, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have row headers', () => {
    cy.get('cds-structured-list-row cds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('cds-structured-list-header-cell, cds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('cds-structured-list | With Subheaders (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-subheaders`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have Subheaders', () => {
    cy.get('cds-structured-list-group')
      .shadow()
      .find('th')
      .each(([header]) => {
        const title = header.getRootNode().host.getAttribute('title');

        cy.get(header).should('include.text', title);
      });
  });
});

describe('cds-structured-list | With Subheaders (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-subheaders`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have Subheaders', () => {
    cy.get('cds-structured-list-group')
      .shadow()
      .find('th')
      .each(([header]) => {
        const title = header.getRootNode().host.getAttribute('title');

        cy.get(header).should('include.text', title);
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('cds-structured-list-header-cell, cds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('cds-structured-list | With Complex Content', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-complex-content`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should inject tooltip with tooltip attribute', () => {
    cy.get('cds-structured-list-cell[tooltip]')
      .shadow()
      .find('bx-tooltip-icon')
      .should('exist');
  });

  it('should inject svg with icon attribute', () => {
    cy.get('cds-structured-list-cell[icon]')
      .shadow()
      .find('svg')
      .should('exist');
  });

  it('should inject tags with tags attribute', () => {
    cy.get('cds-structured-list-cell[tags]')
      .shadow()
      .find('bx-tag')
      .should('exist');
  });
});
