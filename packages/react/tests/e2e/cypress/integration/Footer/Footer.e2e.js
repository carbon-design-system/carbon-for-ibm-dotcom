/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Footer', () => {
  it('should load the default Footer example', () => {
    cy.visit('/Footer');

    // Take a snapshot for visual diffing
    cy.percySnapshot('Footer | default');
  });
});
