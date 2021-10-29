/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-item-horizontal (cdn)', () => {
  it('should load the default dds-content-item-horizontal example (cdn)', () => {
    cy.visit('/content-item-horizontal/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-item-horizontal | cdn | default');
  });
});
