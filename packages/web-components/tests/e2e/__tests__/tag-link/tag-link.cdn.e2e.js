/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-tag-link (cdn)', () => {
  it('should load the default dds-tag-link example', () => {
    cy.visit('/tag-link/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-tag-link | cdn | default');
  });
});
