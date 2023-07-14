/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-masthead', () => {
  it('should load the default dds-masthead example', () => {
    cy.visit('/masthead');

    cy.get('[data-autoid="dds--masthead-default__l0-nav0"]').should('not.be.empty');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-masthead | default');
  });
});
