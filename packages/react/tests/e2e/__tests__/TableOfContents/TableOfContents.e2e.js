/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('TableOfContents', () => {
  it('should load the default TableOfContents example', () => {
    cy.visit('/TableOfContents');

    // Take a snapshot for visual diffing
    cy.percySnapshot('TableOfContents | default');
  });
});
