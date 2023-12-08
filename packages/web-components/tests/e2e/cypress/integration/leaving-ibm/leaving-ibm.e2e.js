/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-leaving-ibm', () => {
  it('should load the default cds-leaving-ibm example', () => {
    cy.visit('/leaving-ibm');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-leaving-ibm | default');
  });
});
