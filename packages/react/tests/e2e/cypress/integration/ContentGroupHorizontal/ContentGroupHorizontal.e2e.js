/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ContentGroupHorizontal', () => {
  it('should load the default ContentGroupHorizontal example', () => {
    cy.visit('/ContentGroupHorizontal');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ContentGroupHorizontal | default');
  });
});
