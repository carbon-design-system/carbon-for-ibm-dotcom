/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-content-item-row (cdn)', () => {
  it('should load the default cds-content-item-row example (cdn)', () => {
    cy.visit('/content-item-row/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-content-item-row | cdn | default');
  });
});
