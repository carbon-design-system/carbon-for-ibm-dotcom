/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import getCssPropertyForRule from '../../utils/get-css-property-for-rule';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _pathEndOfSection =
  '/iframe.html?id=components-link-list--end-of-section';

describe('LinkList | End of section (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathEndOfSection}`);
    cy.viewport(1280, 780);
  });

  it('should show correct states of link list item', () => {
    cy.get('.bx--link-list__list--vertical-end .bx--link-list__list__CTA').then(
      $el => {
        const sheets = $el[0].ownerDocument.styleSheets;

        const hover = getCssPropertyForRule(
          '.bx--link-list__list--vertical-end .bx--link-list__list__CTA:hover',
          'background',
          sheets
        );
        expect(hover).to.equal('var(--cds-hover-ui, #e5e5e5)');

        const focus = getCssPropertyForRule(
          '.bx--link-list__list--vertical-end .bx--link-list__list__CTA:focus-within',
          'outline',
          sheets
        );
        expect(focus).to.equal('2px solid var(--cds-focus, #0f62fe)');

        const activeText = getCssPropertyForRule(
          '.bx--link-with-icon:active, :active:host(dds-megamenu-link-with-icon), :host(dds-link-with-icon):active, :host(dds-text-cta):active',
          'text-decoration',
          sheets
        );
        expect(activeText).to.equal('none');

        const activeColor = getCssPropertyForRule(
          '.bx--link:active, .bx--link:active:visited, .bx--link:active:visited:hover',
          'color',
          sheets
        );
        expect(activeColor).to.equal('var(--cds-text-01, #161616)');
      }
    );

    cy.screenshot();
  });

  it('should use local CTA', () => {
    cy.get('.bx--link-list__list--local a').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get('.bx--link-list__list--local path').then($path => {
      const d = $path.attr('d');
      expect(d).to.equal(
        'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
      );
    });
  });

  it('should use download CTA', () => {
    cy.get('.bx--link-list__list--download a').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
    });

    cy.get('.bx--link-list__list--download path').then($path => {
      const d = $path.attr('d');
      expect(d).to.equal(
        'M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z'
      );
    });
  });

  it('should use external CTA', () => {
    cy.get('.bx--link-list__list--external a').then($link => {
      const url = $link.prop('href');
      expect(url).not.to.be.empty;
      const target = $link.attr('target');
      expect(target).to.equal('_blank');
    });

    cy.get('.bx--link-list__list--external path').then($path => {
      const d = $path.attr('d');
      expect(d).to.equal(
        'M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z'
      );
    });
  });

  it('should use video CTA', () => {
    cy.wait(500);

    cy.get('.bx--link-list__list--video span').then($span => {
      expect($span.text()).not.to.be.empty;
    });

    cy.get('.bx--link-list__list--video path').then($path => {
      const d = $path.attr('d');
      expect(d).to.equal(
        'M11,23a1,1,0,0,1-1-1V10a1,1,0,0,1,1.4473-.8945l12,6a1,1,0,0,1,0,1.789l-12,6A1.001,1.001,0,0,1,11,23Zm1-11.3821v8.7642L20.7642,16Z'
      );
    });

    cy.get('.bx--link-list__list--video').click();
    cy.get('[data-autoid="dds--lightbox-media-viewer"]').then($el => {
      $el.find('[data-autoid="dds--expressive-modal"]');
      expect($el.find('[data-autoid="dds--expressive-modal"]')).to.have.attr(
        'open'
      );
    });

    cy.screenshot();
  });
});
