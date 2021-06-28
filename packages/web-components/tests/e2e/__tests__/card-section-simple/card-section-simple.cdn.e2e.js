/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-section-simple (cdn)', () => {
  it('should load the default card section simple example (cdn)', () => {
    cy.visit('/card-section-simple/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-section-simple | cdn | default');
  });
});
