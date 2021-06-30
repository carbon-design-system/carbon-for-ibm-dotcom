/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-cta-block (cdn)', () => {
  it('should load the default dds-cta-block example (cdn)', () => {
    cy.visit('/cta-block/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-cta-block | cdn | default');
  });
});
