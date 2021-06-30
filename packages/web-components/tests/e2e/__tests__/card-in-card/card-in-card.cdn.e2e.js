/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-in-card (cdn)', () => {
  it('should load the default card-in-card example (cdn)', () => {
    cy.visit('/card-group/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-in-card | cdn | default');
  });
});
