/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Masthead L1', () => {
  beforeEach(() => {
    cy.mockMastheadFooterData();
  });

  it('should load the default Masthead L1 example', () => {
    cy.visit('/MastheadL1');

    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead L1 | default');
  });
});
