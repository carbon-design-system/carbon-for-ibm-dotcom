/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-dotcom-shell', () => {
  it('should load the default dds-dotcom-shell example', () => {
    cy.visit('/dotcom-shell');

    cy.get('[data-autoid="dds--masthead__megamenu"]');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-dotcom-shell | default');
  });
});
