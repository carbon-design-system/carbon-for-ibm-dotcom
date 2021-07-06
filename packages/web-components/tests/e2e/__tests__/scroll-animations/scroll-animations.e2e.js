/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-scroll-animations', () => {
  it('should load the default dds-scroll-animations example', () => {
    cy.visit('/scroll-animations');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-scroll-animations | default');
  });
});
