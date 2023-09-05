/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-content-block-simple (cdn)', () => {
  it('should load the default cds-content-block-simple example (cdn)', () => {
    cy.visit('/content-block-simple/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-content-block-simple | cdn | default');
  });
});
