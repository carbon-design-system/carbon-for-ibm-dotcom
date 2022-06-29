/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cdn | version', () => {
  before(() => {
    cy.exec('node tests/cdn-build/utils/set-version.js');
  });

  after(() => {
    cy.exec('node tests/cdn-build/utils/reset-version.js');
  });

  it('should load without any exceptions', () => {
    cy.visit(`/version.html`);
    cy.viewport(1280, 780);
  });
});
