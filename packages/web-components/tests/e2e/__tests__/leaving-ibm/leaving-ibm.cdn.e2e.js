/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-leaving-ibm (cdn)', () => {
  it('should load the default dds-leaving-ibm example', () => {
    cy.visit('/leaving-ibm/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-leaving-ibm | cdn | default');
  });
});
