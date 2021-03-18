/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${_url}${_pathDefaultNoImage}?theme=g100`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with no image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathDefaultNoImage}?theme=g90`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with no image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathDefaultNoImage}?theme=g10`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with no image - g10 theme',
      {
        widths: [320, 1280],
      }
    );

    await browser.close();
  });

  it('should load default with image in various themes', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${_url}${_pathDefaultImage}?theme=g100`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathDefaultImage}?theme=g90`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathDefaultImage}?theme=g10`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Default with image - g10 theme',
      {
        widths: [320, 1280],
      }
    );

    await browser.close();
  });

  it('should load centered with no image in various themes', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${_url}${_pathCenteredNoImage}?theme=g100`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with no image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathCenteredNoImage}?theme=g90`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with no image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathCenteredNoImage}?theme=g10`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with no image - g10 theme',
      {
        widths: [320, 1280],
      }
    );

    await browser.close();
  });

  it('should load centered with image in various themes', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${_url}${_pathCenteredImage}?theme=g100`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with image - g100 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathCenteredImage}?theme=g90`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with image - g90 theme',
      {
        widths: [320, 1280],
      }
    );

    await page.goto(`${_url}${_pathCenteredImage}?theme=g10`, {
      waitUntil: 'load',
      timeout: 15000,
    });
    await page.evaluate(
      'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
    );

    await percySnapshot(
      page,
      'Components|Leadspace: Centered with image - g10 theme',
      {
        widths: [320, 1280],
      }
    );

    await browser.close();
  });
});
