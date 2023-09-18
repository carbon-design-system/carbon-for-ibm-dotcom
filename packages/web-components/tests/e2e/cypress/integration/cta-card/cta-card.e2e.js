/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-cta-card', () => {
  it('should load the default cds-cta-card example', () => {
    cy.visit('/cta-card');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-cta-card | default');
  });
});
