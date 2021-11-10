/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path for the medium variation
 *
 * @type {string}
 * @private
 */
const _pathMedium = '/iframe.html?id=components-feature-card--medium';

/**
 * Sets the correct path for the large variation
 *
 * @type {string}
 * @private
 */
 const _pathLarge = '/iframe.html?id=components-feature-card--large';

/* eslint-disable cypress/no-unnecessary-waiting */
describe('dds-feature-card | medium', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMedium}`);
    cy.viewport(1280, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | has link', {
    //   widths: [1280],
    // });
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {

		cy.get('dds-feature-card > dds-feature-card-footer')
		.shadow()
		.find('a')
		.then($els => {
			const win = $els[0].ownerDocument.defaultView;
			const after = win.getComputedStyle($els[0], 'after');
			const positionValue = after.getPropertyValue('position');
			const insetValue = after.getPropertyValue('inset');

			expect(positionValue).to.eq('absolute')
			expect(insetValue).to.eq('0px')
		})
		
		cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | clickable section', {
    //   widths: [1280],
    // });
  });

	it('should have image on the left and content on the right side of the card', () => {
		
		// image takes the left half
		cy.get('dds-image').then($image => {
			expect($image[0].getBoundingClientRect().left).to.equal(32);
			expect($image[0].getBoundingClientRect().right).to.equal(328);
		});

		// image takes the right half
		cy.get('dds-feature-card').shadow().find('.bx--card__wrapper').then($content => {
			expect($content[0].getBoundingClientRect().left).to.equal(328);
			expect($content[0].getBoundingClientRect().right).to.equal(624);
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
      // cy.percySnapshot('dds-feature-card | medium | g10 theme', {
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
      // cy.percySnapshot('dds-feature-card | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-feature-card | medium (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathMedium}`);
    cy.viewport(320, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | has link', {
    //   widths: [1280],
    // });
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
		cy.get('dds-feature-card > dds-feature-card-footer')
		.shadow()
		.find('a')
		.then($els => {
			const win = $els[0].ownerDocument.defaultView;
			const after = win.getComputedStyle($els[0], 'after');
			const positionValue = after.getPropertyValue('position');
			const insetValue = after.getPropertyValue('inset');

			expect(positionValue).to.eq('absolute')
			expect(insetValue).to.eq('0px')
		})
		
		cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | clickable section', {
    //   widths: [1280],
    // });
  });

	it('should have image on the left and content on the right half of the card', () => {
		
		// image takes the left half
		cy.get('dds-image').then($image => {
			expect($image[0].getBoundingClientRect().top).to.equal(16);
			expect($image[0].getBoundingClientRect().bottom).to.equal(160);
		});

		// image takes the right half
		cy.get('dds-feature-card').shadow().find('.bx--card__wrapper').then($content => {
			expect($content[0].getBoundingClientRect().top).to.equal(160);
			expect($content[0].getBoundingClientRect().bottom).to.equal(320);
		});
  });

	it('should load the g10 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g10`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g10 theme', {
      //   widths: [1280],
      // });
    });
  });

	it('should load the g90 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g90`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathMedium}&theme=g100`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-feature-card | large', () => {
  beforeEach(() => {
    cy.visit(`/${_pathLarge}`);
    cy.viewport(1400, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | has link', {
    //   widths: [1280],
    // });
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
		cy.get('dds-feature-card > dds-feature-card-footer')
		.shadow()
		.find('a')
		.then($els => {
			const win = $els[0].ownerDocument.defaultView;
			const after = win.getComputedStyle($els[0], 'after');
			const positionValue = after.getPropertyValue('position');
			const insetValue = after.getPropertyValue('inset');

			expect(positionValue).to.eq('absolute')
			expect(insetValue).to.eq('0px')
		})
		
		cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | clickable section', {
    //   widths: [1280],
    // });
  });

	it("should have eyebrow, heading, and copy content", () => {
		cy.get('dds-card-heading').invoke('text').should('not.be.empty');
		cy.get('dds-card-heading').invoke('text').should('not.be.empty');
		cy.get('dds-feature-card > p').invoke('text').should('not.be.empty');
	});

	it('should have image on the left and content on the right half of the card', () => {
		
		// image takes the left half
		cy.get('dds-image').then($image => {
			expect($image[0].getBoundingClientRect().left).to.equal(16);
			expect($image[0].getBoundingClientRect().right).to.equal(529);
		});

		// image takes the right half
		cy.get('dds-feature-card').shadow().find('.bx--card__wrapper').then($content => {
			expect($content[0].getBoundingClientRect().left).to.equal(529);
			expect($content[0].getBoundingClientRect().right).to.equal(1042);
		});
  });

	it('should load the g10 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g10`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g10 theme', {
      //   widths: [1280],
      // });
    });
  });

	it('should load the g90 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g90`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g100`);
    cy.viewport(1280, 780);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });
});

describe('dds-feature-card | large (mobile)', () => {
  beforeEach(() => {
    cy.visit(`/${_pathLarge}`);
    cy.viewport(320, 780);
  });

  it('should check for link', () => {
    cy.get('dds-feature-card > dds-feature-card-footer')
      .shadow()
      .find('a.bx--card__footer')
      .then($link => {
        const url = $link.prop('href');
        expect(url).not.to.be.empty;
      });

    cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | has link', {
    //   widths: [1280],
    // });
  });

  it("should check that the footer's pseudo class takes up entire card to be clickable", () => {
		cy.get('dds-feature-card > dds-feature-card-footer')
		.shadow()
		.find('a')
		.then($els => {
			const win = $els[0].ownerDocument.defaultView;
			const after = win.getComputedStyle($els[0], 'after');
			const positionValue = after.getPropertyValue('position');
			const insetValue = after.getPropertyValue('inset');

			expect(positionValue).to.eq('absolute')
			expect(insetValue).to.eq('0px')
		})
		
		cy.screenshot();
    // Take a snapshot for visual diffing
    // TODO: click states currently not working in percy for web components
    // cy.percySnapshot('dds-feature-card | clickable section', {
    //   widths: [1280],
    // });
  });

	it("should have eyebrow, heading, and copy content", () => {
		cy.get('dds-card-heading').invoke('text').should('not.be.empty');
		cy.get('dds-card-heading').invoke('text').should('not.be.empty');
		cy.get('dds-feature-card > p').invoke('text').should('not.be.empty');
	});

	it('should have image on the top and content on the bottom half of the card', () => {
		
		// image takes the left half
		cy.get('dds-image').then($image => {
			expect($image[0].getBoundingClientRect().top).to.equal(16);
			expect($image[0].getBoundingClientRect().bottom).to.equal(176);
		});

		// image takes the right half
		cy.get('dds-feature-card').shadow().find('.bx--card__wrapper').then($content => {
			expect($content[0].getBoundingClientRect().top).to.equal(176);
			expect($content[0].getBoundingClientRect().bottom).to.equal(526);
		});
  });

	it('should have an arrow icon be left aligned in the content ', () => {
		const arrowPath = cy.get('dds-feature-card > dds-feature-card-footer svg path');

    arrowPath.then($icon => {
      expect($icon).to.have.attr('d', 'M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z');
			expect($icon[0].getBoundingClientRect().left).to.equal(17);
    });
	})

	it('should load the g10 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g10`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g10');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g10 theme', {
      //   widths: [1280],
      // });
    });
  });

	it('should load the g90 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g90`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g90');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g90 theme', {
      //   widths: [1280],
      // });
    });
  });

  it('should load the g100 theme', () => {
    cy.visit(`/${_pathLarge}&theme=g100`);

    cy.window().then(win => {
      win.document.documentElement.setAttribute('storybook-carbon-theme', 'g100');

      cy.screenshot();
      // Take a snapshot for visual diffing
      // TODO: click states currently not working in percy for web components
      // cy.percySnapshot('dds-feature-card | medium | g100 theme', {
      //   widths: [1280],
      // });
    });
  });
});