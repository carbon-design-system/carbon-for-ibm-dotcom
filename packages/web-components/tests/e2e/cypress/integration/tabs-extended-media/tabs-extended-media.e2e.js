/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-tabs-extended-media', () => {
  it('should load the default cds-tabs-extended-media example', () => {
    cy.visit('/tabs-extended-media');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-tabs-extended-media | default');
  });
});
