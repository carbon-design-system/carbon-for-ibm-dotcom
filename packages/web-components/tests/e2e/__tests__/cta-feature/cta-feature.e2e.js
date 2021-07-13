/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-cta-feature', () => {
  it('should load the default dds-cta-feature example', () => {
    cy.visit('/cta-feature');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-cta-feature | default');
  });
});
