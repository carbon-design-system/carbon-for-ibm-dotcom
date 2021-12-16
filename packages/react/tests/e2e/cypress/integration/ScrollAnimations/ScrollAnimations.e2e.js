/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('ScrollAnimations', () => {
  it('should load the default ScrollAnimations example', () => {
    cy.visit('/ScrollAnimations');

    // Take a snapshot for visual diffing
    cy.percySnapshot('ScrollAnimations | default');
  });
});
