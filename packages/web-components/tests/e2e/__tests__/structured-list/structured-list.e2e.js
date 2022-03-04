/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-structured-list', () => {
  it('should load the default dds-structured-list example', () => {
    cy.visit('/structured-list');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-structured-list | default');
  });
});
