/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-locale-modal', () => {
  it('should load the default dds-locale-modal example', () => {
    cy.visit('/locale-modal');

    cy.get('[data-autoid="dds--button-expressive"]').click();

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-locale-modal | default');
  });
});
