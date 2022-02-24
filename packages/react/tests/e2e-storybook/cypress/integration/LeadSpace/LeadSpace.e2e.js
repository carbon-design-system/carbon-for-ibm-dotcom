/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path (Tall)
 *
 * @type {string}
 * @private
 */
const _pathTall = '/iframe.html?id=components-lead-space--tall-with-no-image';

/**
 * Sets the correct path (Tall with image)
 *
 * @type {string}
 * @private
 */
const _pathTallImage = '/iframe.html?id=components-lead-space--tall-with-image';

/**
 * Sets the correct path (Centered)
 *
 * @type {string}
 * @private
 */
const _pathCentered = '/iframe.html?id=components-lead-space--centered';

/**
 * Sets the correct path (Centered with image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredImage =
  '/iframe.html?id=components-lead-space--centered-with-image';

/**
 * Sets the correct path (Medium)
 *
 * @type {string}
 * @private
 */
const _pathMedium = '/iframe.html?id=components-lead-space--medium';

/**
 * Sets the correct path (Medium with image)
 *
 * @type {string}
 * @private
 */
const _pathMediumWithImage =
  '/iframe.html?id=components-lead-space--medium-with-image';

/**
 * Sets the correct path (Super)
 *
 * @type {string}
 * @private
 */
const _pathSuper = '/iframe.html?id=components-lead-space--super';

/**
 * Sets the correct path (Super with image)
 *
 * @type {string}
 * @private
 */
const _pathSuperWithImage =
  '/iframe.html?id=components-lead-space--super-with-image';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('LeadSpace | tall', () => {
  it('should check a11y', () => {
    cy.visit(_pathTall);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load title and copy - both left aligned', () => {
    cy.visit(_pathTall);
    cy.viewport(1280, 780);

    cy.get('.bx--leadspace__title').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(16);
    });

    cy.get('.bx--leadspace__desc').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(16);
    });
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `${_pathTall}&knob-Number%20of%20buttons_LeadSpace=3&knob-Button%20Icon%201%20(renderIcon)_LeadSpace=ArrowRight20&knob-Button%20Icon%202%20(renderIcon)_LeadSpace=ArrowDown20&knob-Button%20Icon%203%20(renderIcon)_LeadSpace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('.bx--buttongroup-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.takeSnapshots();
  });

  it('should load two buttons by default', () => {
    cy.visit(_pathTall);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--button-group"] li').should('have.length', 2);
  });

  it('should load more than 2 buttons when customized and should all have links', () => {
    cy.visit(`${_pathTall}&knob-Number%20of%20buttons_LeadSpace=3`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--button-group"] li').should('have.length', 3);

    cy.get('[data-autoid="dds--button-group"] li > a').each($button => {
      const url = $button.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load without a background image', () => {
    cy.visit(_pathTall);
    cy.viewport(1280, 780);

    cy.get('.bx--image').should('not.exist');
  });

  it('should load correctly in all themes', () => {
    cy.visit(`${_pathTall}`);
    cy.viewport(1280, 780);

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | tall with image', () => {
  it('should check a11y', () => {
    cy.visit(_pathTallImage);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load with background image', () => {
    cy.visit(`/${_pathTallImage}`);
    cy.viewport(1280, 780);

    cy.get('.bx--image')
      .find('picture')
      .find('img')
      .then($src => {
        const imageSrc = $src.prop('src');
        expect(imageSrc).not.to.be.empty;
      });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathTallImage}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | centered', () => {
  it('should check a11y', () => {
    cy.visit(_pathCentered);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load title and copy - both centered', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('.bx--leadspace__title').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(328);
    });

    cy.get('.bx--leadspace__desc').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(328);
    });
  });

  it('should load two buttons by default', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('.bx--buttongroup-item').should('have.length', 2);
  });

  it('should load buttons centered aligned', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('.bx--buttongroup').then($button => {
      expect($button[0].getBoundingClientRect().left).to.equal(344);
    });
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `/${_pathCentered}&knob-Number%20of%20buttons_Leadspace=3&knob-Button%20Icon%201%20(renderIcon)_Leadspace=ArrowRight20&knob-Button%20Icon%202%20(renderIcon)_Leadspace=ArrowDown20&knob-Button%20Icon%203%20(renderIcon)_Leadspace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('.bx--buttongroup-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathCentered}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | centered with image', () => {
  it('should check a11y', () => {
    cy.visit(_pathCenteredImage);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load with background image', () => {
    cy.visit(`/${_pathCenteredImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('.bx--image')
      .find('picture')
      .find('img')
      .then($src => {
        const imageSrc = $src.prop('src');
        expect(imageSrc).not.to.be.empty;
      });

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathCenteredImage}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | medium', () => {
  it('should check a11y', () => {
    cy.visit(_pathMedium);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathMedium}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | medium with image', () => {
  it('should check a11y', () => {
    cy.visit(_pathMediumWithImage);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathMediumWithImage}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | super', () => {
  it('should check a11y', () => {
    cy.visit(_pathSuper);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load title and copy - both left aligned', () => {
    cy.visit(_pathSuper);
    cy.viewport(1280, 780);

    cy.get('.bx--leadspace__title').then($title => {
      expect($title[0].getBoundingClientRect().left).to.equal(16);
    });

    cy.get('.bx--leadspace__desc').then($desc => {
      expect($desc[0].getBoundingClientRect().left).to.equal(16);
    });
  });

  it('should render 3 buttons with different icons (arrow right, left, and PDF)', () => {
    cy.visit(
      `${_pathSuper}&knob-Number%20of%20buttons_LeadSpace=3&knob-Button%20Icon%201%20(renderIcon)_LeadSpace=ArrowRight20&knob-Button%20Icon%202%20(renderIcon)_LeadSpace=ArrowDown20&knob-Button%20Icon%203%20(renderIcon)_LeadSpace=Pdf20`
    );
    cy.viewport(1280, 780);

    cy.get('.bx--buttongroup-item:nth-child(1) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(2) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M24.59 16.59L17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z'
      );
    });

    cy.get('.bx--buttongroup-item:nth-child(3) svg path').then($icon => {
      expect($icon).to.have.attr(
        'd',
        'M30 11L30 9 22 9 22 23 24 23 24 17 29 17 29 15 24 15 24 11 30 11zM8 9H2V23H4V18H8a2 2 0 002-2V11A2 2 0 008 9zm0 7H4V11H8zM16 23H12V9h4a4 4 0 014 4v6A4 4 0 0116 23zm-2-2h2a2 2 0 002-2V13a2 2 0 00-2-2H14z'
      );
    });

    cy.takeSnapshots();
  });

  it('should load two buttons by default', () => {
    cy.visit(_pathSuper);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--button-group"] li').should('have.length', 2);
  });

  it('should load more than 2 buttons when customized and should all have links', () => {
    cy.visit(`${_pathSuper}&knob-Number%20of%20buttons_LeadSpace=3`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--button-group"] li').should('have.length', 3);

    cy.get('[data-autoid="dds--button-group"] li > a').each($button => {
      const url = $button.prop('href');
      expect(url).not.to.be.empty;
    });
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathSuper}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});

describe('LeadSpace | super with image', () => {
  it('should check a11y', () => {
    cy.visit(_pathSuperWithImage);
    cy.injectAxe();
    cy.checkAxeA11y();
  });

  it('should load with background image', () => {
    cy.visit(`/${_pathSuperWithImage}`);
    cy.viewport(1280, 780);

    cy.wait(500);

    cy.get('.bx--image')
      .find('picture')
      .find('img')
      .then($src => {
        const imageSrc = $src.prop('src');
        expect(imageSrc).not.to.be.empty;
      });

    cy.get('.bx--image').then($ele => {
      expect($ele[0].offsetHeight).to.equal(640);
    });

    cy.takeSnapshots();
  });

  it('should load correctly in all themes', () => {
    cy.visit(`/${_pathSuperWithImage}`);
    cy.viewport(1280, 780);

    cy.get('[data-autoid="dds--leadspace"]');

    cy.carbonThemesScreenshot();
  });
});
