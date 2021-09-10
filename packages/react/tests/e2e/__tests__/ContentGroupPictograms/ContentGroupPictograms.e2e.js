/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ContentGroupPictograms', () => {
  it('should load the default ContentGroupPictograms example', () => {
    cy.visit('/ContentGroupPictograms');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ContentGroupPictograms | default');
  });
});
