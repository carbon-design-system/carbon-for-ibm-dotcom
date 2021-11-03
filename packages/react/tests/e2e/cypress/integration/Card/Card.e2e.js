/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('CardGroup', () => {
  it('should load the default CardGroup example', () => {
    cy.visit('/CardGroup');

    // Take a snapshot for visual diffing
    cy.percySnapshot('CardGroup | default');
  });
});
