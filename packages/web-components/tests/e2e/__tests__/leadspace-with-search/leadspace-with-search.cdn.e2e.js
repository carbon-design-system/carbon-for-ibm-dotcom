/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-leadspace-with-search (cdn)', () => {
  it('should load the default dds-leadspace-with-search example', () => {
    cy.visit('/leadspace-with-search/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-leadspace-with-search | cdn | default');
  });
});
