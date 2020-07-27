/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url =
  process?.env.SELENIUM_HOST || 'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '/iframe.html?id=components-locale-modal--default';

describe('LocaleModal', () => {
  beforeAll(() => {
    browser.url(_url + _path);

    $('[data-region="am"]').waitForExist(15000); // wait for data to load
  });

  it('should load the Americas region', () => {
    $('[data-region="am"]').click();
    const regiontitle = $('.bx--modal-header__heading').getText();
    expect(regiontitle).toBe('Americas');
  });

  it('should filter on canada', () => {
    $('[data-autoid="dds--locale-modal__filter"]').setValue('canada');
    browser.pause(500);
    const allresults = $$('.bx--locale-modal__locales');
    let visibleresults = [];
    allresults.forEach(result => {
      if (result.getCSSProperty('display').value !== 'none') {
        visibleresults.push(result);
      }
    });
    expect(visibleresults.length).toBe(2);
  });

  it('should go to the Canada/French website', () => {
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
  });
});
