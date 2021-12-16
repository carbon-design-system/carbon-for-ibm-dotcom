/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-search-with-typeahead (cdn)', () => {
  it('should load the default dds-search-with-typeahead example', () => {
    cy.visit('/search-with-typeahead/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-search-with-typeahead | cdn | default');
  });
});
