/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-callout-with-media', () => {
  it('should load the default callout with media example', () => {
    cy.visit('/callout-with-media');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-callout-with-media | default');
  });
});
