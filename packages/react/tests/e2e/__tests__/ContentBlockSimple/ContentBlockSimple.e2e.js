/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ContentBlockSimple', () => {
  it('should load the default ContentBlockSimple example', () => {
    cy.visit('/ContentBlockSimple');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ContentBlockSimple | default');
  });
});
