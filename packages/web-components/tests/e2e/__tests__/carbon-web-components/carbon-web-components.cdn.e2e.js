/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('carbon-web-components (cdn)', () => {
  it('should load the carbon-web-components examples', () => {
    cy.visit('/carbon-web-components/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('carbon-web-components | cdn | examples');
  });
});
