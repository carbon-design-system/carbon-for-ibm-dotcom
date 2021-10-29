/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-back-to-top', () => {
  it('should load the default back-to-top example', () => {
    cy.visit('/back-to-top');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-back-to-top | default');
  });
});
