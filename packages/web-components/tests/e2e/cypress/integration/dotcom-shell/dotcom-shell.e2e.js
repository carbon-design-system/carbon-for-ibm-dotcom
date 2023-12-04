/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-dotcom-shell', () => {
  it('should load the default cds-dotcom-shell example', () => {
    cy.visit('/dotcom-shell');

    cy.get('[data-autoid="cds--masthead-default__l0-nav0"]').should('not.be.empty');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-dotcom-shell | default');
  });
});
