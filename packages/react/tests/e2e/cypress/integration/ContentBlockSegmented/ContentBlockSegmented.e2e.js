/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ContentBlockSegmented', () => {
  it('should load the default ContentBlockSegmented example', () => {
    cy.visit('/ContentBlockSegmented');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ContentBlockSegmented | default');
  });
});
