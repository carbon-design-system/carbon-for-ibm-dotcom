/**
 * Copyright IBM Corp. 2021
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
const _pathTall = '/iframe.html?id=components-lead-space--tall';

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
const _pathCenteredImage = '/iframe.html?id=components-lead-space--centered-with-image';

/**
 * Sets the correct path (Short)
 *
 * @type {string}
 * @private
 */
const _pathShort = '/iframe.html?id=components-lead-space--short';

/**
 * Sets the correct path (Short with image)
 *
 * @type {string}
 * @private
 */
const _pathShortWithImage = '/iframe.html?id=components-lead-space--short-with-image';

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
const _pathMediumWithImage = '/iframe.html?id=components-lead-space--medium-with-image';

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
const _pathSuperWithImage = '/iframe.html?id=components-lead-space--super-with-image';

/* eslint-disable cypress/no-unnecessary-waiting */
xdescribe('dds-leadspace | tall', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathTall}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');
      cy.wait(500);
      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathTall}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathTall}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');
      cy.wait(500);

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | tall with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathTallImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | tall with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | centered', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathCentered}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | centered with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathCenteredImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | centered with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | short', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathShort}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathShort}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathShort}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | short with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathShortWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | short with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | medium', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | medium with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathMediumWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | medium with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | super', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathSuper}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});

xdescribe('dds-leadspace | super with image', () => {
  it('should load the g100 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g100 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g90 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g10 theme', () => {
    cy.visit(`/${_pathSuperWithImage}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-leadspace | super with image | g10 theme', {
      //   widths: [1280],
      // });
    });
  });
});
