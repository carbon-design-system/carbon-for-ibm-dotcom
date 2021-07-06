/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-video-player (cdn)', () => {
  it('should load the default dds-video-player example', () => {
    cy.visit('/video-player/cdn.html');

    // Take a snapshot for visual diffing
    // NOTE: This is causing false positives, will shut off for now and just
    // check for build errors
    // cy.percySnapshot('dds-video-player | cdn | default');
  });
});
