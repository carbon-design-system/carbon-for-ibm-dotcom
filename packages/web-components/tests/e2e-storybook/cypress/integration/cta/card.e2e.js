/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import getCssPropertyForRule from '../../utils/get-css-property-for-rule';

/**
 * Sets the correct path
 *
 * @type String
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-cta--default&knob-CTA%20style%20(cta-style)=card',
  types: 'iframe.html?id=components-cta--default&knob-CTA%20style%20(cta-style)=card-link&knob-CTA%20type%20(cta-type)=',
};

/**
 * Finds top-most element in document (or given root) at given coordinates
 * @param {number} x
 * @param {number} y
 * @param {document} root
 * @returns lowercase tagname of element
 */
const getTopElement = (x, y, root = window.document) => {
  return root.elementFromPoint(x, y).tagName.toLowerCase();
};

/**
 * Collection of all tests for dds-table-of-contents
 *
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
    cy.checkAxeA11y();
  },
  checkBlockLink: () => {
    let box;

    cy.visit(`/${_paths.default}`)
      .get('dds-cta').shadow().find('dds-card-cta')
      .then(card => {
        const bcr = card[0].getBoundingClientRect();

        box = {
          top: bcr.top + 5,
          right: bcr.right - 5,
          bottom: bcr.bottom - 5,
          left: bcr.left + 5,
          centerX: bcr.left + bcr.width / 2,
          centerY: bcr.top + bcr.height / 2,
        };
      })
      cy.get('dds-cta').shadow().find('dds-card-cta-footer')
      .then(footer => {
        // Since the link is in the shadowroot, we need to look there
        const root = footer[0].shadowRoot;
        expect(getTopElement(box.left, box.top, root)).to.be.eq('a');
        expect(getTopElement(box.left, box.bottom, root)).to.be.eq('a');
        expect(getTopElement(box.right, box.top, root)).to.be.eq('a');
        expect(getTopElement(box.right, box.bottom, root)).to.be.eq('a');
        expect(getTopElement(box.centerX, box.centerY, root)).to.be.eq('a');
      });
  },
  checkTypeKnob: () => {
    const types = {
      local: 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z',
      jump: 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z',
      external: 'M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z',
      download:
        'M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z',
      video:
        'M11,23a1,1,0,0,1-1-1V10a1,1,0,0,1,1.4473-.8945l12,6a1,1,0,0,1,0,1.789l-12,6A1.001,1.001,0,0,1,11,23Zm1-11.3821v8.7642L20.7642,16Z',
    };

    cy.wrap(Object.entries(types)).each(([type, pathAttr]) => {
      cy.visit(`/${_paths.types}${type}`)
        .get('.bx--card__footer path')
        .then(([path]) => {
          expect(path.getAttribute('d')).to.be.eq(pathAttr);
        });
    });
  },
  checkHoverStyles: () => {
    cy.visit(`/${_paths.default}`)
      .get('dds-cta').shadow().find('dds-card-cta').then(([card]) => {
      const sheets = card.shadowRoot.adoptedStylesheets;

      if (sheets) {
        const hover = getCssPropertyForRule(
          '.bx--card:hover .bx--card__wrapper, :host(dds-card:hover) .bx--card__wrapper, :host(dds-link-list-item-card:hover) .bx--card__wrapper, :host(dds-card-group-item:hover) .bx--card__wrapper, :host(dds-card-group-item) .bx--card:hover .bx--card__wrapper, :host(dds-card-cta:hover) .bx--card__wrapper, :host(dds-link-list-item-card-cta:hover) .bx--card__wrapper, :host(dds-card-in-card:hover) .bx--card__wrapper, :host(dds-content-group-cards-item:hover) .bx--card__wrapper, :host(dds-content-group-cards-item) .bx--card:hover .bx--card__wrapper',
          'background-color',
          sheets
        );
        expect(hover).to.be.eq('var(--cds-hover-ui, #e5e5e5)');
      }
    });
  },
};

describe('dds-card-cta | (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });

  it('Should load and be fully clickable', _tests.checkBlockLink);
  it('Should have customizable CTA type', _tests.checkTypeKnob);
  it('Should have hover-state styling', _tests.checkHoverStyles);
  it('Should check a11y', _tests.checkA11y);
});

describe('dds-card-cta | (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 720);
  });

  it('Should load and be fully clickable', _tests.checkBlockLink);
  it('Should have customizable CTA type', _tests.checkTypeKnob);
  it('Should have hover-state styling', _tests.checkHoverStyles);
});
