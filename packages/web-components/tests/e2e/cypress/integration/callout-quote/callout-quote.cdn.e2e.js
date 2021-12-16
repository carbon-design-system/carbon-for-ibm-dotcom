/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-callout-quote (cdn)', () => {
  it('should load the default callout quote example', () => {
    cy.visit('/callout-quote/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-callout-quote | cdn | default');
  });
});
