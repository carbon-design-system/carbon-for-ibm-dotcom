/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (default Footer)
 *
 * @type {string}
 * @private
 */
 const _pathDefault = '/iframe.html?id=components-footer--default';

 describe('dds-dds-footer | default (desktop)', () => {
	 beforeEach(() => {
		 cy.visit(`/${_pathDefault}`);
		 cy.viewport(1280, 780);
	 });
 
	 it('should have interactable url for IBM logo', () => {
		 cy.get('[data-autoid="dds--footer-logo"]').then($link => {
			 const url = $link.prop('href');
			 expect(url).not.to.be.empty;
		 });
	 });
 
	 it('should load locale modal', () => {
		 const localeButton = cy.get(
			 `[data-autoid="dds--locale-btn"]`
		 );
		 localeButton.click();
 
		 cy.screenshot();
	 });
 
	 it('should load the Americas region with its languages and locations', () => {
		 const localeButton = cy.get(
			 `[data-autoid="dds--locale-btn"]`
		 );
		 localeButton.click();
 
		 cy.get('dds-region-item[name="Americas"]').click();
 
		 cy.get(`dds-locale-item[region='Americas']`).should('have.length', 35);
 
		 cy.screenshot();
 
		 // Take a snapshot for visual diffing
		 cy.percySnapshot('dds-footer | Americas region selected', {
			 widths: [1280],
		 });
	 });
 
	 it('should be able to search with keywords for locations and languages', () => {
		 const localeButton = cy.get(
			 `[data-autoid="dds--locale-btn"]`
		 );
		 localeButton.click();
 
		 cy.get('[name="Americas"]').click();

		 cy.get('dds-locale-search').shadow()
		 .find('.bx--search-input').type('ca', {
			 force: true,
		 });

		 cy.get('dds-locale-item:not([hidden])').invoke('attr', 'country').should('eq', 'Canada');
 
		 cy.screenshot();
 
		 // Take a snapshot for visual diffing
		 cy.percySnapshot('dds-footer | Filtering locales', {
			 widths: [1280],
		 });
	 });
 
	 it('should load all the 38 interactable navigation links', () => {
		 cy.get(`dds-footer-nav-item`).should('have.length', 38);

		cy.get('dds-footer-nav-item')
			.shadow()
			.find('a')
			.each($link => {
				const url = $link.prop('href');
				expect(url).not.to.be.empty;
			});

		 cy.screenshot();
	 });
 
	 it('should load all 4 interactable legal links', () => {
		 cy.get(`dds-legal-nav-item`).should('have.length', 4);

		 cy.get('dds-legal-nav-item')
			.shadow()
			.find('a')
			.each($link => {
				const url = $link.prop('href');
				expect(url).not.to.be.empty;
			});
	 });
 
 });
 
 
 