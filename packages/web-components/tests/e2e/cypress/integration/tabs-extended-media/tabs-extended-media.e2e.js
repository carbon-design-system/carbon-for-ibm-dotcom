/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-tabs-extended-media', () => {
  it('should load the default dds-tabs-extended-media example', () => {
    cy.visit('/tabs-extended-media');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-tabs-extended-media | default');
  });
});
