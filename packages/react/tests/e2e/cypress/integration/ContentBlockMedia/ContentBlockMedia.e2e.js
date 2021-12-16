/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ContentBlockMedia', () => {
  it('should load the default ContentBlockMedia example', () => {
    cy.visit('/ContentBlockMedia');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ContentBlockMedia | default');
  });
});
