/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('Masthead', () => {
  it('should load the default Masthead example', () => {
    cy.visit('/Masthead');

    // Take a snapshot for visual diffing
    cy.percySnapshot('Masthead | default');
  });
});
