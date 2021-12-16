/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-block-simple', () => {
  it('should load the default dds-content-block-simple example', () => {
    cy.visit('/content-block-simple');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-block-simple | default');
  });
});
