/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-block-mixed (cdn)', () => {
  it('should load the default dds-content-block-mixed example (cdn)', () => {
    cy.visit('/content-block-mixed/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-block-mixed | cdn | default');
  });
});
