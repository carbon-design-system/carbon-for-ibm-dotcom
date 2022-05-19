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

describe('dds-structured-list | default (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--default`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have column headers', () => {
    cy.get('dds-structured-list-header-row dds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });
});

describe('dds-structured-list | default (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--default`)
      .injectAxe()
      .viewport(320, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have column headers', () => {
    cy.get('dds-structured-list-header-row dds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('dds-structured-list-header-cell, dds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('dds-structured-list | With Row Headers (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-row-headers`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have row headers', () => {
    cy.get('dds-structured-list-row dds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });
});

describe('dds-structured-list | With Row Headers (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-row-headers`)
      .injectAxe()
      .viewport(320, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have row headers', () => {
    cy.get('dds-structured-list-row dds-structured-list-header-cell')
      .should('exist')
      .each(header_cell => {
        cy.get(header_cell).should('not.be.empty');
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('dds-structured-list-header-cell, dds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('dds-structured-list | With Subheaders (desktop)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-subheaders`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have Subheaders', () => {
    cy.get('dds-structured-list-group')
      .shadow()
      .find('th')
      .each(([header]) => {
        const title = header.getRootNode().host.getAttribute('title');

        cy.get(header).should('include.text', title);
      });
  });
});

describe('dds-structured-list | With Subheaders (mobile)', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-subheaders`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have Subheaders', () => {
    cy.get('dds-structured-list-group')
      .shadow()
      .find('th')
      .each(([header]) => {
        const title = header.getRootNode().host.getAttribute('title');

        cy.get(header).should('include.text', title);
      });
  });

  it('should scroll to display all cells', () => {
    cy.get('dds-structured-list-header-cell, dds-structured-list-cell').each(cell => {
      cy.get(cell)
        .scrollIntoView()
        .should('be.visible');
    });
  });
});

describe('dds-structured-list | With Complex Content', () => {
  beforeEach(() => {
    cy.visit(`${_pathRoot}--with-complex-content`)
      .injectAxe()
      .viewport(1280, 780);
  });

  it('should inject tooltip with tooltip attribute', () => {
    cy.get('dds-structured-list-cell[tooltip]')
      .shadow()
      .find('bx-tooltip-icon')
      .should('exist');
  });

  it('should inject svg with icon attribute', () => {
    cy.get('dds-structured-list-cell[icon]')
      .shadow()
      .find('svg')
      .should('exist');
  });

  it('should inject tags with tags attribute', () => {
    cy.get('dds-structured-list-cell[tags]')
      .shadow()
      .find('bx-tag')
      .should('exist');
  });
});
