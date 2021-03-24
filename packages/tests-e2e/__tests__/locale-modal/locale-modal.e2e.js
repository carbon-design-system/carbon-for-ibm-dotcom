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
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-locale-modal--default';

describe('LocaleModal', () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load the Americas region', async () => {
    page = await browser.newPage();
    await page.goto(`${_url}${_path}`, { waitUntil: 'load', timeout: 30000 });

    await page.waitForSelector('[data-autoid="dds--locale-modal"]');

    if (_webcomponentsTests) {
      const region = await page.evaluateHandle(
        `document.querySelector('dds-locale-modal > dds-regions > dds-region-item:nth-child(1)').shadowRoot.querySelector('a')`
      );
      region.click();
    } else {
      await page.waitForSelector('[data-region="am"]');
      await page.click('[data-region="am"]');
    }

    await percySnapshot(page, 'Components|LocaleModal: Region Selected', {
      widths: [1280],
    });

    if (_webcomponentsTests) {
      const filter = await page.evaluateHandle(
        `document.querySelector('dds-locale-search').shadowRoot.querySelector('dds-search').shadowRoot.querySelector(".bx--search-input")`
      );
      filter.focus();
      filter.type('ca');
    } else {
      await page.type('[data-autoid="dds--locale-modal__filter"]', 'ca');
    }

    await page.waitForTimeout(1500);

    await percySnapshot(page, 'Components|LocaleModal: Filter', {
      widths: [1280],
    });
  });
});
