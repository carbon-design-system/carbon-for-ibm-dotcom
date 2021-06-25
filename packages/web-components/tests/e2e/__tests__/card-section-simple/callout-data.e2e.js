/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-section-simple', () => {
  it('should load the default card section simple example', () => {
    cy.visit('/card-section-simple');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-section-simple | default');
  });
});
