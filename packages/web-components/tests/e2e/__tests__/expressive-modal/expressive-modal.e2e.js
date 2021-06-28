/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-expressive-modal', () => {
  it('should load the default dds-expressive-modal example', () => {
    cy.visit('/expressive-modal');

    cy.get('[data-autoid="dds--button-expressive"]')
      .first()
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-expressive-modal | default');
  });
});
