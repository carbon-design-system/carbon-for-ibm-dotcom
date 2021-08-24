/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Leadspace', () => {
  it('should load the default Leadspace example', () => {
    cy.visit('/Leadspace');

    // Take a snapshot for visual diffing
    cy.percySnapshot('Leadspace | default');
  });
});
