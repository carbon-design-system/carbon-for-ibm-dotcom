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
  process?.env.SELENIUM_URL || 'https://ibmdotcom-react-canary.mybluemix.net/';

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _path = '?path=/story/patterns-blocks-calloutquote--default';

/**
 * Sets the quote copy via environment variable
 *
 * @type {string | string}
 * @private
 */
const _quoteCopy = process?.env.SELENIUM_QUOTE_COPY || 'Lorem Ipsum';

describe('CalloutQuote', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    const quote = $('textarea[id="Quote (copy): _CalloutQuote"]');
    quote.setValue('');
    quote.setValue(_quoteCopy);
    $('button[title="Open canvas in new tab"]').click();
    browser.switchWindow('iframe.html');
    browser.setWindowSize(1200, 800);
  });

  afterAll(() => {
    browser.setWindowSize(1200, 800);
  });

  it('should load with the correct top content padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingTop = content.getCSSProperty('padding-top').value;
    expect(contentPaddingTop).toEqual('0px');
  });

  it('should load with the correct bottom content padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingBottom = content.getCSSProperty('padding-bottom').value;
    expect(contentPaddingBottom).toEqual('0px');
  });

  it('should load with the correct top copy padding', () => {
    const copy = $('[data-autoid="dds--quote__copy"]');
    const copyPaddingTop = copy.getCSSProperty('padding-top').value;
    expect(copyPaddingTop).toEqual('64px');
  });

  it('should load with the correct bottom copy padding', () => {
    const copy = $('[data-autoid="dds--quote__copy"]');
    const copyPaddingBottom = copy.getCSSProperty('padding-bottom').value;
    expect(copyPaddingBottom).toEqual('0px');
  });

  it('should click on the link', () => {
    const link = $('[data-autoid="dds--link-with-icon"] a');
    link.click();
    expect(browser.getUrl()).toEqual('https://example.com/');
  });
});

describe('CalloutQuote (320px)', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    const quote = $('textarea[id="Quote (copy): _CalloutQuote"]');
    quote.setValue('');
    quote.setValue(_quoteCopy);
    $('button[title="Open canvas in new tab"]').click();
    browser.switchWindow('iframe.html');
    browser.setWindowSize(320, 315);
  });

  afterAll(() => {
    browser.setWindowSize(1200, 800);
  });

  it('should load with the correct content top padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingTop = content.getCSSProperty('padding-top').value;
    expect(contentPaddingTop).toEqual('0px');
  });

  it('should load with the correct copy bottom padding', () => {
    const copy = $('[data-autoid="dds--quote__copy"]');
    const copyPaddingBottom = copy.getCSSProperty('padding-bottom').value;
    expect(copyPaddingBottom).toEqual('0px');
  });

  it('should load with the correct content bottom padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingBottom = content.getCSSProperty('padding-bottom').value;
    expect(contentPaddingBottom).toEqual('0px');
  });
});

describe('CalloutQuote (1058px)', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    const quote = $('textarea[id="Quote (copy): _CalloutQuote"]');
    quote.setValue('');
    quote.setValue(_quoteCopy);
    $('button[title="Open canvas in new tab"]').click();
    browser.switchWindow('iframe.html');
    browser.setWindowSize(1058, 515);
  });

  afterAll(() => {
    browser.setWindowSize(1200, 800);
  });

  it('should load with the correct content top padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingTop = content.getCSSProperty('padding-top').value;
    expect(contentPaddingTop).toEqual('0px');
  });

  it('should load with the correct copy bottom padding', () => {
    const copy = $('[data-autoid="dds--quote__copy"]');
    const copyPaddingBottom = copy.getCSSProperty('padding-bottom').value;
    expect(copyPaddingBottom).toEqual('0px');
  });

  it('should load with the correct content bottom padding', () => {
    const content = $('[data-autoid="dds--callout__content"]');
    const contentPaddingBottom = content.getCSSProperty('padding-bottom').value;
    expect(contentPaddingBottom).toEqual('0px');
  });
});
