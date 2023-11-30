/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-cta-block', () => {
  it('should load the default cds-cta-block example', () => {
    cy.visit('/cta-block');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-cta-block | default');
  });
});
