/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-content-block-cards', () => {
  // TODO: find out why components are getting double imported in parcel
  xit('should load the default dds-content-block-cards example', () => {
    cy.visit('/content-block-card-static');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-content-block-cards | default');
  });
});
