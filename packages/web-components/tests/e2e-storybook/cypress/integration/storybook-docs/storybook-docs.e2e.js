/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable cypress/no-unnecessary-waiting */
describe('storybook docs | default', () => {
  const components = require('../../fixtures/components.json');

  components.forEach(component => {
    it(`should load Storybook Docs tab for ${component.name} without exceptions`, () => {
      cy.viewport(1280, 720);
      cy.visit(`/?path=/docs/components-${component.url}--default`);

      cy.wait(1000);

      const iframe = cy
        .get('iframe')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);

      iframe.within({}, $iframe => {
        cy.get('code[id="error-stack"]').should('be.empty');
      });
    });
  });
});
