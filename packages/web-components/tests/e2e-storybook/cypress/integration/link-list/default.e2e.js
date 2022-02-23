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
 * @type {string} path of component
 * @private
 */
const _path = 'iframe.html?id=components-link-list--default';

/**
 * Collection of tests for the component
 *
 * @function checkComponentLoad Asserts that each list item loads body copy and one clickable link
 * @function checkVerticalAlignment Asserts that each list item is positioned directly below its previous sibling
 * @function checkHoverState Asserts that list items have a CSS rule that sets the background color on hover
 * @function checkCTATypes Asserts that the CTA icon is set correctly for each type
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.checkAxeA11y();
  },
  checkComponentLoad: () => {
    cy.visit(`/${_path}`);

    cy.get('dds-link-list').then(([list]) => {
      const items = list.querySelectorAll('dds-link-list-item-card');
      items.forEach(item => {
        cy.get(item)
          .shadow()
          .then(([root]) => {
            const bodyCopy = root
              .querySelector('slot:not([name])')
              .assignedNodes()
              .reduce((prev, curr) => prev.concat(curr.textContent), '')
              .replaceAll(/(\\n)|\s/g, '');
            expect(bodyCopy).to.not.be.eq('');
          })
          .get(item)
          .find('a')
          .then($links => {
            expect($links.length).to.be.equal(1);
            expect($links[0]).to.be.visible;
            expect($links.hasClass('bx--link-with-icon')).to.be.eq(true);
          });
      });
    });
  },
  checkVerticalAlignment: () => {
    let previous, window;
    cy.visit(`/${_path}`);

    cy.window()
      .then(win => (window = win))
      .get('dds-link-list-item-card')
      .each(([card], i) => {
        if (i !== 0) {
          const cardBox = card.getBoundingClientRect();
          const prevBox = previous.getBoundingClientRect();
          const cardStyles = window.getComputedStyle(card);
          const prevStyles = window.getComputedStyle(previous);

          expect(cardBox.top).to.be.eq(prevBox.bottom + parseInt(prevStyles.marginBottom) + parseInt(cardStyles.marginTop));
        }
        previous = card;
      });
  },
  checkHoverState: () => {
    cy.visit(`/${_path}`);

    cy.get('dds-link-list-item-card').then(([card]) => {
      const sheets = card.shadowRoot.adoptedStyleSheets;

      if (sheets) {
        const hover = getCssPropertyForRule(
          '.bx--card:hover, :host(dds-card:hover), :host(dds-link-list-item-card:hover), :host(dds-card-group-item:hover), :host(dds-card-group-item) .bx--card:hover, :host(dds-card-cta:hover), :host(dds-link-list-item-card-cta:hover), :host(dds-card-in-card:hover), :host(dds-content-group-cards-item:hover), :host(dds-content-group-cards-item) .bx--card:hover',
          'background-color',
          sheets
        );

        expect(hover).to.be.eq('var(--cds-hover-ui, #e5e5e5)');
      }
    });
  },
  checkCTATypes: () => {
    const types = {
      local: 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z',
      jump: 'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z',
      external: 'M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z',
      download:
        'M26 24v4H6V24H4v4H4a2 2 0 002 2H26a2 2 0 002-2h0V24zM26 14L24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z',
      video:
        'M11,23a1,1,0,0,1-1-1V10a1,1,0,0,1,1.4473-.8945l12,6a1,1,0,0,1,0,1.789l-12,6A1.001,1.001,0,0,1,11,23Zm1-11.3821v8.7642L20.7642,16Z',
    };

    Object.keys(types).forEach(type => {
      it(`should render CTA type: ${type}`, () => {
        cy.visit(`${_path}&knob-CTA%20type%20(cta-type)_LinkListItem=${type}`);

        cy.get('a.bx--link-with-icon path').then(path => {
          expect(path.attr('d')).to.be.eq(types[type]);
        });
      });
    });
  },
};

describe('dds-link-list | default (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 780);
    cy.visit(`/${_path}`);
    cy.injectAxe();
  });

  it('should load items with text and link', _tests.checkComponentLoad);
  it('should have a vertical layout', _tests.checkVerticalAlignment);
  it('should change styles on hover', _tests.checkHoverState);
  it('should check a11y', _tests.checkA11y);
  _tests.checkCTATypes();
});

describe('dds-link-list | default (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 780);
  });

  it('should load items with text and link', _tests.checkComponentLoad);
  it('should have a vertical layout', _tests.checkVerticalAlignment);
  it('should change styles on hover', _tests.checkHoverState);
  _tests.checkCTATypes();
});
