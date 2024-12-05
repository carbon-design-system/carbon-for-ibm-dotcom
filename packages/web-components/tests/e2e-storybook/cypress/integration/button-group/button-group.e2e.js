/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct defaultPath for Button Group
 *
 * @type {string}
 * @private
 */
const _defaultPath = '/iframe.html?id=components-button-group--default';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('c4d-button-group | default', () => {
  beforeEach(() => {
    cy.visit(`/${_defaultPath}`);
    cy.injectAxe();
    cy.viewport(1280, 780);
  });

  it('should check a11y', () => {
    cy.checkAxeA11y();
  });

  it('should use given labels', () => {
    cy.visit(
      `/${_defaultPath}&knob-Button%201=Test%20Me%20Once&knob-Button%202=Test%20Me%20Twice`
    );
    cy.get('c4d-button-group-item')
      .first()
      .should('have.text', 'Test Me Once')
      .next()
      .should('have.text', 'Test Me Twice');

    cy.takeSnapshots();
  });

  it('should use given labels with video cta-type mixed in', () => {
    cy.visit(
      `/${_defaultPath}&knob-Button%201=Test%20Me%20Once&knob-Button%202=Test%20Me%20Twice&knob-CTA%20type%20(cta-type)%202=video`
    );
    cy.get('c4d-button-group-item')
      .first()
      .should('have.text', 'Test Me Once')
      .next()
      .should('have.text', 'Test Me Twice');

    cy.takeSnapshots();
  });

  it('should use video name for a video cta-type that has no label', () => {
    cy.visit(
      `/${_defaultPath}&knob-Button%201=Test%20Me%20Once&knob-Button%202=%20&knob-CTA%20type%20(cta-type)%202=video`
    );
    cy.get('c4d-button-group-item')
      .first()
      .should('have.text', 'Test Me Once')
      .next()
      .should('not.be.empty');

    cy.takeSnapshots();
  });

  it('should not use video name for buttons that are not cta-type video', () => {
    cy.visit(
      `/${_defaultPath}&knob-Button%201=%20&knob-Button%202=%20&knob-CTA%20type%20(cta-type)%202=video`
    );
    cy.get('c4d-button-group-item')
      .first()
      .should('contain.text', '')
      .next()
      .should('not.be.empty');

    cy.takeSnapshots();
  });
});
