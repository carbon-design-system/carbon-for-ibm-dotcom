/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-link', () => {
  it('should load the default card-link example', () => {
    cy.visit('/card-link');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-link | default');
  });
});
