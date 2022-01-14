/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-section-carousel (cdn)', () => {
  it('should load the default card section carousel example (cdn)', () => {
    cy.visit('/card-section-carousel/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-section-carousel | cdn | default');
  });
});
