/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Defines the component variant path.
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-card--static';

/**
 * Defines the base card component selector.
 *
 * @type {string}
 * @private
 */
const _selectorBase = `[data-autoid="${ddsPrefix}--card"]`;

/**
 * Defines the card element selectors.
 *
 * @type {Object.<string>}
 * @private
 */
const _selectors = {
  eyebrow: `${_selectorBase} [data-autoid="${ddsPrefix}--card-eyebrow"]`,
  heading: `${_selectorBase} [data-autoid="${ddsPrefix}--card-heading"]`,
  footer: `${_selectorBase} [data-autoid="${ddsPrefix}--card-footer"]`,
  image: `${_selectorBase} [data-autoid="${ddsPrefix}--image"]`,
  tagGroup: `${_selectorBase} [data-autoid="${ddsPrefix}--tag-group"]`,
  copy: `${_selectorBase} p`,
};

/**
 * Defines viewport dimensions to be used in tests.
 *
 * @type {number[]}
 * @private
 */
const _viewportDimensions = [1280, 780];

describe('dds-card | static', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(_path);
  });

  it('should render eyebrow content', () => {
    cy.get(_selectors.eyebrow).then(eyebrow => {
      expect(eyebrow.text().length).to.be.greaterThan(0);
    });
  });

  it('should render heading content', () => {
    cy.get(_selectors.heading).then(heading => {
      expect(heading.text().length).to.be.greaterThan(0);
    });
  });

  it('should render footer content', () => {
    cy.get(_selectors.footer).then(footer => {
      expect(footer.text().length).to.be.greaterThan(0);
    });
  });

  it('should render copy', () => {
    cy.get(_selectors.copy).each($p => {
      expect($p.text().length).to.be.greaterThan(0);
    });
  });

  it('should not respond to a click ', () => {
    let initialLocation;
    cy.location('href')
      .then(location => {
        initialLocation = location;
      })
      .get(_selectorBase)
      .click()
      .location('href')
      .then(location => {
        expect(location).to.equal(initialLocation);
      });
  });

  it('should render correctly in all themes', () => {
    cy.wrap(['w', 'g10', 'g90', 'g100']).each(theme => {
      cy.get('html')
        .then(doc => doc.attr('storybook-carbon-theme', theme))
        .screenshot(`${Cypress.currentTest.titlePath[0]} [${theme.toUpperCase()}]`);
    });
  });
});

describe('dds-card | static with outline', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(`${_path}&knob-Outlined%20card_Card=true`);
  });

  it('should render with a border', () => {
    cy.get(_selectorBase).should('have.attr', 'border');
    cy.get(_selectorBase).should('have.css', 'border');
  });
});

describe('dds-card | static with tags', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(`${_path}&knob-Add%20tags_Card=true`);
  });

  it('should render tags', () => {
    cy.get(_selectors.tagGroup).should('have.length', 1);
  });
});

describe('dds-card | static with image', () => {
  beforeEach(() => {
    cy.viewport(..._viewportDimensions);
    cy.visit(`${_path}&knob-Add%20image_Card=true`);
  });

  it('should render an image', () => {
    cy.get(_selectors.image)
      .shadow()
      .find('img')
      .should('have.length', 1);
  });
});
