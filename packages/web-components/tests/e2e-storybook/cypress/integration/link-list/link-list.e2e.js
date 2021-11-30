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
const _pathEndOfSection = '/iframe.html?id=components-link-list--end-of-section';
const getPathEndOfSectionCTA = cta => {
  return `/iframe.html?id=components-link-list--end-of-section&knob-CTA%20type%20(cta-type)_LinkListItem=${cta}`;
};

describe('dds-link-list | end of section (desktop)', () => {
  it('should show correct states of link list item', () => {
    cy.visit(`/${_pathEndOfSection}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--link-list-item"]').then($el => {
      const sheets = $el[0].shadowRoot.adoptedStyleSheets;

      const hover = getCssPropertyForRule(
        ':host(dds-link-list-item[type="end"]:hover) .bx--link, :host(dds-link-list-item-cta[type="end"]:hover) .bx--link',
        'background',
        sheets
      );
      expect(hover).to.equal('var(--cds-hover-ui, #e5e5e5)');

      const focus = getCssPropertyForRule(
        '.bx--link-with-icon:focus, :host(dds-link-with-icon:focus), :host(dds-text-cta:focus)',
        'outline',
        sheets
      );
      expect(focus).to.equal('2px solid var(--cds-focus, #0f62fe)');

      const activeText = getCssPropertyForRule(
        '.bx--link-with-icon:active, :host(dds-link-with-icon:active), :host(dds-text-cta:active)',
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
    });

    cy.screenshot();
  });

  it('should use local CTA', () => {
    cy.visit(`/${getPathEndOfSectionCTA('local')}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('path')
      .then(path => {
        const d = path.attr('d');
        expect(d).to.equal('M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
      });

    cy.takeSnapshots();
  });

  it('should use jump CTA', () => {
    cy.visit(`/${getPathEndOfSectionCTA('jump')}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).to.include('#');
      });

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('path')
      .then(path => {
        const d = path.attr('d');
        expect(d).to.equal('M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z');
      });

    cy.takeSnapshots();
  });

  it('should use external CTA', () => {
    cy.visit(`/${getPathEndOfSectionCTA('external')}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
        const target = $link.attr('target');
        expect(target).to.equal('_blank');
      });

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('path')
      .then(path => {
        const d = path.attr('d');
        expect(d).to.equal(
          'M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z'
        );
      });

    cy.takeSnapshots();
  });

  it('should use download CTA', () => {
    cy.visit(`/${getPathEndOfSectionCTA('download')}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('a')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('path')
      .then(path => {
        const d = path.attr('d');
        expect(d).to.equal(
          'M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z'
        );
      });

    cy.takeSnapshots();
  });

  it('should use video CTA', () => {
    cy.visit(`/${getPathEndOfSectionCTA('video')}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .then($link => {
        const text = $link.find('span').text();
        expect(text).not.to.be.empty;
      });

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .shadow()
      .find('path')
      .then(path => {
        const d = path.attr('d');
        expect(d).to.equal(
          'M11,23a1,1,0,0,1-1-1V10a1,1,0,0,1,1.4473-.8945l12,6a1,1,0,0,1,0,1.789l-12,6A1.001,1.001,0,0,1,11,23Zm1-11.3821v8.7642L20.7642,16Z'
        );
      });

    cy.takeSnapshots();

    cy.get('[data-autoid="dds--link-list-item-cta"]')
      .first()
      .click();
    cy.get('dds-lightbox-video-player-composite').then($el => {
      expect($el).to.have.attr('open');
    });
  });
});
