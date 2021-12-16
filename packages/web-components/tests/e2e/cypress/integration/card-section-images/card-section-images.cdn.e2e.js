/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-card-section-images (cdn)', () => {
  it('should load the default card section images example (cdn)', () => {
    cy.visit('/card-section-images/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-card-section-images | cdn | default');
  });
});
