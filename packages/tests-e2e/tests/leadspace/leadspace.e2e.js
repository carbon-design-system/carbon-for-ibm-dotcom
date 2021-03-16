/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const percySnapshot = require('@percy/webdriverio');

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url =
  (process && process.env.SELENIUM_HOST) ||
  'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Sets the correct path (Default with no image)
 *
 * @type {string}
 * @private
 */
const _pathDefaultNoImage =
  '/iframe.html?id=components-leadspace--default-with-no-image';

/**
 * Sets the correct path (Default with image)
 *
 * @type {string}
 * @private
 */
const _pathDefaultImage =
  '/iframe.html?id=components-leadspace--default-with-image';

/**
 * Sets the correct path (Centered with no image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredNoImage = '/iframe.html?id=components-leadspace--centered';

/**
 * Sets the correct path (Centered with image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredImage =
  '/iframe.html?id=components-leadspace--centered-with-image';

describe('Leadspace', () => {
  it('should load default with no image in various themes', async () => {
    await browser.url(_url + _pathDefaultNoImage);
    // const html = await $('html');

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g100');
    });

    await percySnapshot(
      'Components|Leadspace: Default with no image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g90');
    });

    await percySnapshot(
      'Components|Leadspace: Default with no image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g10');
    });

    await percySnapshot(
      'Components|Leadspace: Default with no image - g10 theme',
      {
        widths: [320, 1280],
      }
    );
  });

  it('should load default with image in various themes', async () => {
    await browser.url(_url + _pathDefaultImage);

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g100');
    });

    await percySnapshot(
      'Components|Leadspace: Default with image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g90');
    });

    await percySnapshot(
      'Components|Leadspace: Default with image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g10');
    });

    await percySnapshot(
      'Components|Leadspace: Default with image - g10 theme',
      {
        widths: [320, 1280],
      }
    );
  });

  it('should load centered with no image in various themes', async () => {
    await browser.url(_url + _pathCenteredNoImage);

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g100');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with no image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g90');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with no image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g10');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with no image - g10 theme',
      {
        widths: [320, 1280],
      }
    );
  });

  it('should load centered with image in various themes', async () => {
    await browser.url(_url + _pathCenteredImage);

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g100');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g90');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    browser.execute(() => {
      document
        .querySelector('html')
        .setAttribute('storybook-carbon-theme', 'g10');
    });

    await percySnapshot(
      'Components|Leadspace: Centered with image - g10 theme',
      {
        widths: [320, 1280],
      }
    );
  });
});
