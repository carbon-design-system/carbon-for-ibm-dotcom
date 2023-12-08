/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-expressive-modal (cdn)', () => {
  it('should load the default cds-expressive-modal example', () => {
    cy.visit('/expressive-modal/cdn.html');

    cy.get('[data-autoid="cds--button-expressive"]')
      .first()
      .click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-expressive-modal | cdn | default');
  });
});
