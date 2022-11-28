/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 xdescribe('Storybook Docs | grab component list', () => {

  it('should grab docs url from all Storybook components', () => {
    
    cy.visit('/');

     let docs = [];

    /**
     * grab all components and get their href values which contain
     * url to the corresponding docs
     */
     cy.get('button[id^="components-"]').each($el => {
       cy.get($el)
       .click()
       .then( ([copy]) => {
         const name = copy.innerText.trim();
         const docsPath = $el[0].nextSibling.firstChild.href;
 
         if (docsPath) {
           const url = docsPath.split('?')[1].replace('path=/story', 'path=/docs');
           docs.push({ url, name });
         }
       });
     })
     
     cy.writeFile('tests/e2e-storybook/cypress/fixtures/components.json', docs);
   });
  });