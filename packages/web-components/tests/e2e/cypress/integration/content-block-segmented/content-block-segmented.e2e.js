/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-block-segmented', () => {
  it('should load the default dds-content-block-segmented example', () => {
    cy.visit('/content-block-segmented');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-block-segmented | default');
  });
});
