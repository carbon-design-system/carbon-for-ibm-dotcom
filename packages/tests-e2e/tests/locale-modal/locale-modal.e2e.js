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
 * Flag to switch to the web components paths instead of the React ones
 *
 * @type {boolean}
 * @private
 */
const _webcomponentsTests =
  (process && process.env.WEBCOMPONENTS_TESTS === 'true') || false;

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-locale-modal--default';

describe('LocaleModal', () => {
  it('should load the Americas region', async () => {
    await browser.url(_url + _path);
    let region, filter;
    if (_webcomponentsTests) {
      const regionRoot = await $('dds-region-item');
      region = await regionRoot.shadow$('a');
    } else {
      region = await $('[data-region="am"]');
    }
    region.click();
    await percySnapshot('Components|LocaleModal: Region Selected', {
      widths: [1280],
    });

    if (_webcomponentsTests) {
      const localeSearch = await $('dds-locale-search');
      const search = await localeSearch.shadow$('dds-search');
      filter = await search.shadow$('.bx--search-input');
    } else {
      filter = await $('[data-autoid="dds--locale-modal__filter"]');
    }
    filter.addValue('ca');
    await browser.pause(1500);

    await percySnapshot('Components|LocaleModal: Filter', {
      widths: [1280],
    });
  });

  /*it('should go to the Canada/French website', () => {
    const allresults = $$('.bx--locale-modal__locales');
    let visibleresults = [];
    allresults.forEach(result => {
      if (result.getCSSProperty('display').value !== 'none') {
        visibleresults.push(result);
      }
    });
    visibleresults[0].click();
    let url = browser.getUrl();
    if (url.indexOf('?') > -1) {
      url = url.substring(0, url.indexOf('?'));
    }
    expect(url).toBe('https://www.ibm.com/ca-fr');
  });*/
});
