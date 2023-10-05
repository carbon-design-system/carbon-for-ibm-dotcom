/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('c4d-global-banner', () => {
  it('should load the default c4d-global-banner example', () => {
    cy.visit('/global-banner');

    // Take a snapshot for visual diffing
    cy.percySnapshot('c4d-global-banner | default');
  });
});
