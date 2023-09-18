/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-cta-text (cdn)', () => {
  it('should load the default cds-cta-text example', () => {
    cy.visit('/cta-text/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-cta-text | cdn | default');
  });
});
