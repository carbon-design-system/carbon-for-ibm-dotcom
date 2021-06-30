/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-quote (cdn)', () => {
  it('should load the default dds-quote example', () => {
    cy.visit('/quote/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-quote | cdn | default');
  });
});
