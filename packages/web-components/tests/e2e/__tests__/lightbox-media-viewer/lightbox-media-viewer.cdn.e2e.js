/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('dds-lightbox-media-viewer (cdn)', () => {
  it('should load the default dds-lightbox-media-viewer example', () => {
    cy.visit('/lightbox-media-viewer/cdn.html');

    // Take a snapshot for visual diffing
    cy.percySnapshot('dds-lightbox-media-viewer | cdn | default');
  });
});
