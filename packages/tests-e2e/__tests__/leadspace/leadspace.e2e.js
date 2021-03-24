/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

/**
 * Flag to switch to the web components paths instead of the React ones
 *
 * @type {boolean}
 * @private
 */
const _webcomponentsTests =
  (process && process.env.WEBCOMPONENTS_TESTS === 'true') || false;

/**
 * Sets the default url
 *
 * @type {string}
 * @private
 */
const _urlDefault = _webcomponentsTests
  ? 'https://ibmdotcom-web-components-canary.mybluemix.net'
  : 'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url = (process && process.env.SELENIUM_HOST) || _urlDefault;

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
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('default with no image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultNoImage}&theme=g100`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultNoImage}&theme=g90`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultNoImage}&theme=g10`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });
  });

  describe('default with image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultImage}&theme=g100`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultImage}&theme=g90`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultImage}&theme=g10`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });
  });

  describe('centered with no image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredNoImage}&theme=g100`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredNoImage}&theme=g90`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredNoImage}&theme=g10`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });
  });

  describe('centered with image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredImage}&theme=g100`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredImage}&theme=g90`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathCenteredImage}&theme=g10`, {
        waitUntil: 'load',
        timeout: 30000,
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
    });
  });
});
