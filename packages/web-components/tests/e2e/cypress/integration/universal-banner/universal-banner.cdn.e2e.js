/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('cds-universal-banner (cdn)', () => {
  it('should load the default cds-universal-banner example', () => {
    cy.visit('/universal-banner/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('cds-universal-banner | cdn | default');
  });
});
