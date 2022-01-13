/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-section-carousel', () => {
  it('should load the default card section carousel example', () => {
    cy.visit('/card-section-carousel');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-section-carousel | default');
  });
});
