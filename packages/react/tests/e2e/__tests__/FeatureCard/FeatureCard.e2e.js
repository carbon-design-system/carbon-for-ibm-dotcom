/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('FeatureCard', () => {
  it('should load the default FeatureCard example', () => {
    cy.visit('/FeatureCard');

    // Take a snapshot for visual diffing
    cy.percySnapshot('FeatureCard | default');
  });
});
