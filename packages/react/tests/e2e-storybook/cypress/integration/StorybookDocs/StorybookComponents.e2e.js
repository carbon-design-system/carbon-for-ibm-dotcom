/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 describe('Storybook Docs | default', () => {

  context('Storybook Docs | grab component list', () => {
    it('should grab docs url from all Storybook components', () => {
      cy.visit('/');
      /**
       * grab all components and get their href values which contain
       * url to the corresponding docs
       */
      const components = cy.get('a[id*="explorercomponents"]');
  
      let docs = [];
  
      components.each($component => {
        const docsPath = $component.prop('href');
        const name = $component.prop('title');
  
        if (docsPath) {
          const url = docsPath.split('?')[1].replace('path=/story', 'path=/docs');
          docs.push({ url, name });
        }
      });
  
      cy.writeFile('tests/e2e-storybook/cypress/fixtures/components.json', docs);
    });
  });
  
  context('storybook docs | loading docs', () => {
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
});