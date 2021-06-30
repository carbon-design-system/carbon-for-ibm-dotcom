/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-block-mixed', () => {
  it('should load the default dds-content-block-mixed example', () => {
    cy.visit('/content-block-mixed');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-block-mixed | default');
  });
});
