/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @param default - Path to default variant
 * @param withCta - path to variant with CTA card
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-table-of-contents--default',
  withCta: 'iframe.html?id=components-table-of-contents--with-heading-content',
};

/**
 * Collection of all tests for dds-card-section-simple
 *
 * @private
 */
const _tests = {};

describe('dds-card-section-simple | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', () => {});
  it('should load left-aligned section title', () => {});
  it('should load heading, copy, cta on each card', () => {});
  it('should display cta card in contrasting color', () => {});
  it('should render correctly in all themes', () => {});
});

describe('dds-card-section-simple | with cta (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', () => {});
  it('should load left-aligned section title', () => {});
  it('should load heading, copy, cta on each card', () => {});
  it('should display cta card in contrasting color', () => {});
  it('should render correctly in all themes', () => {});
});

describe('dds-card-section-simple | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', () => {});
  it('should load left-aligned section title', () => {});
  it('should load heading, copy, cta on each card', () => {});
  it('should display cta card in contrasting color', () => {});
  it('should render correctly in all themes', () => {});
});

describe('dds-card-section-simple | with cta (mobile)', () => {
  beforeEach(() => {
    cy.viewport(325, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('should load card as blocklink', () => {});
  it('should load left-aligned section title', () => {});
  it('should load heading, copy, cta on each card', () => {});
  it('should display cta card in contrasting color', () => {});
  it('should render correctly in all themes', () => {});
});
