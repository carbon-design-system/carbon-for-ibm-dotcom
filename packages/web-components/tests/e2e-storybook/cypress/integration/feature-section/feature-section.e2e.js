/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-feature-section--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-feature-section (desktop)', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should have eyebrow, heading, and copy content', () => {
    cy.get('dds-card-eyebrow')
      .invoke('text')
      .should('not.be.empty');
    cy.get('dds-content-block-heading')
      .invoke('text')
      .should('not.be.empty');
    cy.get('dds-content-item-paragraph')
      .invoke('text')
      .should('not.be.empty');

    cy.screenshot();
  });

  it('should have content on the left and image on the right side (media align: right)', () => {
    // content takes the left half
    cy.get('dds-feature-section')
      .shadow()
      .find('.bx--feature-section__body')
      .then($content => {
        expect($content[0].getBoundingClientRect().left).to.equal(0);
        expect($content[0].getBoundingClientRect().right).to.equal(640);
      });

    // image takes the right half
    cy.get('dds-image').then($image => {
      expect($image[0].getBoundingClientRect().left).to.equal(640);
      expect($image[0].getBoundingClientRect().right).to.equal(1280);
    });

    cy.screenshot();
  });

  it('should have image on the left and content on the right side (media align: left)', () => {
    cy.visit(`/${_path}&knob-Media%20Alignment=left`);
    // content takes the right half
    cy.get('dds-feature-section')
      .shadow()
      .find('.bx--feature-section__body')
      .then($content => {
        expect($content[0].getBoundingClientRect().left).to.equal(640);
        expect($content[0].getBoundingClientRect().right).to.equal(1280);
      });

    // image takes the left half
    cy.get('dds-image').then($image => {
      expect($image[0].getBoundingClientRect().left).to.equal(0);
      expect($image[0].getBoundingClientRect().right).to.equal(640);
    });

    cy.screenshot();
  });

  it('should have loaded and clickable card link', () => {
    // checks the card link is on the right side
    cy.get('dds-feature-section-card-link').then($card => {
      expect($card[0].getBoundingClientRect().right).to.equal(1280 - 16);
    });

    // checks the card link has a heading
    cy.get('dds-feature-section-card-link > dds-card-link-heading')
      .invoke('text')
      .should('not.be.empty');

    // checks the entire card link is clickable
    cy.get('dds-feature-section-card-link > dds-card-cta-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });

  it('should be able to customize card link from local to external', () => {
    cy.visit(`/${_path}&knob-CTA%20type%20(cta-type)=external`);

    cy.get('dds-feature-section-card-link  > dds-card-cta-footer')
      .shadow()
      .find('a')
      .then($els => {
        expect($els)
          .to.have.attr('target')
          .to.equal('_blank');
      });

    cy.screenshot();
  });

  it('should render correctly in all themes', () => {
    cy.carbonThemesScreenshot();
  });
});

describe('dds-feature-section (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_path}`);
    cy.viewport(320, 780);
  });

  it('should have content on the top and image on the bottom (media align: right)', () => {
    cy.wait(500);

    let contentRect, imageRect;

    cy.get('dds-feature-section')
      .shadow()
      .get('.bx--feature-section__body')
      .then(([content]) => {
        contentRect = content.getBoundingClientRect();
      })
      .get('.bx--feature-section__image')
      .then(([image]) => {
        imageRect = image.getBoundingClientRect();

        // bottom of content aligns to top of the image
        expect(contentRect.bottom).to.eq(imageRect.top);
      });

    cy.screenshot();
  });

  it('should have content on the bottom and image on the top (media align: left)', () => {
    cy.visit(`/${_path}&knob-Media%20Alignment=left`);

    cy.wait(500);

    let contentRect, imageRect;

    cy.get('dds-feature-section')
      .shadow()
      .get('.bx--feature-section__body')
      .then(([content]) => {
        contentRect = content.getBoundingClientRect();
      })
      .get('.bx--feature-section__image')
      .then(([image]) => {
        imageRect = image.getBoundingClientRect();

        // bottom of image aligns to top of the content
        expect(contentRect.top).to.eq(imageRect.bottom);
      });

    cy.screenshot();
  });

  it('should have loaded and clickable card link', () => {
    // checks the card link is on the right side
    cy.get('dds-feature-section-card-link').then($card => {
      expect($card[0].getBoundingClientRect().right).to.equal(320);
    });

    // checks the card link has a heading
    cy.get('dds-feature-section-card-link > dds-card-link-heading')
      .invoke('text')
      .should('not.be.empty');

    // checks the entire card link is clickable
    cy.get('dds-feature-section-card-link > dds-card-cta-footer')
      .shadow()
      .find('a')
      .then($els => {
        const win = $els[0].ownerDocument.defaultView;
        const after = win.getComputedStyle($els[0], ':after');
        const positionValue = after.getPropertyValue('position');
        const insetValue = after.getPropertyValue('inset');

        expect(positionValue).to.eq('absolute');
        if (Cypress.browser.name !== 'firefox') {
          expect(insetValue).to.eq('0px');
        }
      });
  });
});
