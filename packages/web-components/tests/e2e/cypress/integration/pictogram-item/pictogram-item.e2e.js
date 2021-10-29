/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-pictogram-item', () => {
  it('should load the default dds-pictogram-item example', () => {
    cy.visit('/pictogram-item');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-pictogram-item | default');
  });
});
