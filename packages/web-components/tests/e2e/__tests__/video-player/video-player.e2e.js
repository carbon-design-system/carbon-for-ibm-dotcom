/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-video-player', () => {
  it('should load the default dds-video-player example', () => {
    cy.visit('/video-player');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-video-player | default');
  });
});
