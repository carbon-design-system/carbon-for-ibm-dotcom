/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-group-simple (cdn)', () => {
  it('should load the default dds-content-group-simple example (cdn)', () => {
    cy.visit('/content-group-simple/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-group-simple | cdn | default');
  });
});
