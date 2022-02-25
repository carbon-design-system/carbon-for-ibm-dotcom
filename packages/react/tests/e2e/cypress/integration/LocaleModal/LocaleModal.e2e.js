/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('LocaleModal', () => {
  it('should load the default LocaleModal example', () => {
    cy.visit('/LocaleModal');

    // Take a snapshot for visual diffing
    cy.percySnapshot('LocaleModal | default');
  });
});
