/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type String
 * @private
 */
const _paths = {
  default: 'iframe.html?id=components-cta--default&knob-CTA%20style%20(cta-style)=feature', 
  types: 'iframe.html?id=components-cta--default&knob-CTA%20style%20(cta-style)=feature&knob-CTA%20type%20(cta-type)=',
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
 * @function checkBlockLink - Asserts that entirety of card is covered by footer link pseudoelement
 * @function checkHorizontalLayout - Asserts that card image is full-height, left-aligned and content is full-height, right-aligned
 * @function checkVerticalLayout - Asserts that card image is full-width, top-aligned and content is full-width, bottom-aligned
 * @function checkHeadingKnob - Asserts that card heading can be set by knob url param
 * @function checkTypeKnob - Asserts that CTA link icon is set by footer attribute
 * @private
 */
const _tests = {
  checkA11y: () => {
    cy.checkAxeA11y();
  },
  checkBlockLink: () => {
    let box;

    cy.get('dds-feature-cta')
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
      .get('dds-feature-cta-footer')
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
  checkHorizontalLayout: () => {
    let cardBox, imageBox, contentBox;

    cy.wait(500);

    cy.get('dds-feature-cta')
      .then(([card]) => {
        cardBox = card.getBoundingClientRect();
      })
      .get('dds-feature-cta dds-image')
      .then(([image]) => {
        imageBox = image.getBoundingClientRect();
      })
      .get('.bx--card__content')
      .then(([content]) => {
        contentBox = content.getBoundingClientRect();

        // Image full height, left aligned
        expect(imageBox.top).to.be.eq(cardBox.top);
        expect(imageBox.left).to.be.eq(cardBox.left);
        expect(imageBox.bottom).to.be.eq(cardBox.bottom);

        // Content full height, right aligned
        expect(contentBox.top).to.be.eq(cardBox.top);
        expect(contentBox.right).to.be.eq(cardBox.right);
        expect(contentBox.bottom).to.be.eq(cardBox.bottom);

        // Image & content don't overlap
        expect(imageBox.width + contentBox.width).to.be.eq(cardBox.width);
      });
  },
  checkVerticalLayout: () => {
    let cardBox, imageBox, contentBox;

    cy.get('dds-feature-cta')
      .then(([card]) => {
        cardBox = card.getBoundingClientRect();
      })
      .get('dds-feature-cta dds-image')
      .then(([image]) => {
        imageBox = image.getBoundingClientRect();
      })
      .get('.bx--card__content')
      .then(([content]) => {
        contentBox = content.getBoundingClientRect();

        // Image full width, top aligned
        expect(imageBox.top).to.be.eq(cardBox.top);
        expect(imageBox.left).to.be.eq(cardBox.left);
        expect(imageBox.right).to.be.eq(cardBox.right);

        // Content full width, bottom aligned
        expect(contentBox.left).to.be.eq(cardBox.left);
        expect(contentBox.right).to.be.eq(cardBox.right);
        expect(contentBox.bottom).to.be.closeTo(cardBox.bottom, contentBox.bottom);

        // Image & content don't overlap
        expect(imageBox.height + contentBox.height).to.be.closeTo(cardBox.height, imageBox.height + contentBox.height);
      });
  },
  checkHeadingKnob: () => {
    let defaultText, customTextOutput;

    const customTextInput = 'Lorem Ipsum Dolor Sit Amet.';

    const knobs = new URLSearchParams({
      'knob-Heading (heading):': customTextInput,
    });

    cy.get('dds-card-heading')
      .then(([heading]) => {
        defaultText = heading.innerText;
      })
      .visit(`/${_paths.default}&${knobs.toString()}`)
      .get('dds-card-heading')
      .then(([heading]) => {
        customTextOutput = heading.innerText;

        expect(customTextInput).to.be.eq(customTextOutput);
        expect(customTextOutput).to.not.eq(defaultText);
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
};

describe('dds-feature-cta | (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.default}`);
    cy.injectAxe();
  });

  it('Should load and be fully clickable', _tests.checkBlockLink);
  xit('Should load image on left and content on right', _tests.checkHorizontalLayout);
  it('Should have customizable heading from knobs', _tests.checkHeadingKnob);
  it('Should have customizable CTA type from knobs', _tests.checkTypeKnob);
  it('Should check a11y', _tests.checkA11y);
});

describe('dds-feature-cta | (mobile)', () => {
  beforeEach(() => {
    cy.viewport(375, 720);
    cy.visit(`/${_paths.default}`);
  });

  it('Should load and be fully clickable', _tests.checkBlockLink);
  it('Should load image on top and content on bottom', _tests.checkVerticalLayout);
  it('Should have customizable heading from knobs', _tests.checkHeadingKnob);
  it('Should have customizable CTA type from knobs', _tests.checkTypeKnob);
});
