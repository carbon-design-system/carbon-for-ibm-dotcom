/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-content-group-pictograms', () => {
  it('should load the default cds-content-group-pictograms example', () => {
    cy.visit('/content-group-pictograms');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-content-group-pictograms | default');
  });
});
