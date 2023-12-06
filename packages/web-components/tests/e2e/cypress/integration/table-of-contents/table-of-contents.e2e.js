/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-table-of-contents', () => {
  it('should load the default cds-table-of-contents example', () => {
    cy.visit('/table-of-contents');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-table-of-contents | default');
  });
});
