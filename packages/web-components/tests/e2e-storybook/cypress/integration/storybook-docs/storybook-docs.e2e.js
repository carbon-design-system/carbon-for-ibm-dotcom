/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable cypress/no-unnecessary-waiting */
describe('storybook docs | default', () => {
  it('should load all Storybook Docs without exceptions', () => {
    cy.viewport(1280, 720);
    cy.visit('/');
    /**
     * grab all components and get their href values which contain
     * url to the corresponding docs
     */
    const components = cy.get('a[id*="explorercomponents"]');

    components.each($component => {
      const docsPath = $component.prop('href');

      if (docsPath) {
        const url = docsPath.split('?')[1].replace('path=/story', 'path=/docs');

        cy.visit(`?${url}`);

        cy.wait(1000);

        const iframe = cy
          .get('iframe')
          .its('0.contentDocument.body')
          .should('be.visible')
          .then(cy.wrap);

        iframe.within({}, $iframe => {
          cy.get('code[id="error-stack"]').should('be.empty');
        });

        cy.takeSnapshots();
      }
    });
  });
});
