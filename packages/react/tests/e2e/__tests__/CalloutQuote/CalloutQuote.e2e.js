/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('CalloutQuote', () => {
  it('should load the default CalloutQuote example', () => {
    cy.visit('/CalloutQuote');

    // Take a snapshot for visual diffing
    cy.percySnapshot('CalloutQuote | default');
  });
});
