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
 * Sets the correct path (Default)
 *
 * @type {string}
 * @private
 */
const _pathDefaultNoImage =
  '/iframe.html?id=components-lead-space--tall-with-no-image';

/**
 * Sets the correct path (Default with image)
 *
 * @type {string}
 * @private
 */
const _pathDefaultImage =
  '/iframe.html?id=components-lead-space--tall-with-image';

/**
 * Sets the correct path (Centered with no image)
 *
 * @type {string}
 * @private
 */
const _pathCenteredNoImage = '/iframe.html?id=components-lead-space--centered';

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

describe('Leadspace', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('tall', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultNoImage}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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

  describe('tall with image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathDefaultImage}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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
        waitUntil: 'networkidle0',
        timeout: 100000,
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

  describe('medium', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMedium}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
      );

      await percySnapshot(page, 'Components|Leadspace: Medium - g100 theme', {
        widths: [320, 1280],
      });
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMedium}&theme=g90`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });
      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
      );

      await percySnapshot(page, 'Components|Leadspace: Medium - g90 theme', {
        widths: [320, 1280],
      });
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMedium}&theme=g10`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
      );

      await percySnapshot(page, 'Components|Leadspace: Medium - g10 theme', {
        widths: [320, 1280],
      });
    });
  });

  describe('medium with image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMediumWithImage}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Medium with image - g100 theme',
        {
          widths: [320, 1280],
        }
      );
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMediumWithImage}&theme=g90`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });
      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Medium with image - g90 theme',
        {
          widths: [320, 1280],
        }
      );
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathMediumWithImage}&theme=g10`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Medium with image - g10 theme',
        {
          widths: [320, 1280],
        }
      );
    });
  });

  describe('super', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuper}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
      );

      await percySnapshot(page, 'Components|Leadspace: Super - g100 theme', {
        widths: [320, 1280],
      });
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuper}&theme=g90`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });
      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
      );

      await percySnapshot(page, 'Components|Leadspace: Super - g90 theme', {
        widths: [320, 1280],
      });
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuper}&theme=g10`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
      );

      await percySnapshot(page, 'Components|Leadspace: Super - g10 theme', {
        widths: [320, 1280],
      });
    });
  });

  describe('super with image', () => {
    it('should load g100 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuperWithImage}&theme=g100`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g100")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Super with image - g100 theme',
        {
          widths: [320, 1280],
        }
      );
    });

    it('should load g90 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuperWithImage}&theme=g90`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });
      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g90")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Super with image - g90 theme',
        {
          widths: [320, 1280],
        }
      );
    });

    it('should load g10 theme', async () => {
      page = await browser.newPage();
      await page.goto(`${_url}${_pathSuperWithImage}&theme=g10`, {
        waitUntil: 'networkidle0',
        timeout: 100000,
      });

      await page.evaluate(
        'document.documentElement.setAttribute("storybook-carbon-theme","g10")'
      );

      await percySnapshot(
        page,
        'Components|Leadspace: Super with image - g10 theme',
        {
          widths: [320, 1280],
        }
      );
    });
  });
});
