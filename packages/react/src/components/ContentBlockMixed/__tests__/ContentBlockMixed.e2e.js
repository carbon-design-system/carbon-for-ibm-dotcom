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
const _path = '/iframe.html?id=components-contentblockmixed--default';

/**
 * Path with aside items
 *
 * @type {string}
 * @private
 */
const _pathAsideItems =
  '/iframe.html?id=components-contentblockmixed--with-aside-elements';

describe('ContentBlockMixed', () => {
  beforeAll(() => {
    browser.url(_url + _path);
    browser.setWindowSize(1200, 800);
    browser.pause(5000);
  });

  it('should have the correct top padding', () => {
    const content = $('.bx--content-block');
    const contentPaddingTop = content.getCSSProperty('padding-top').value;
    expect(contentPaddingTop).toEqual('64px');
  });

  it('should have the correct bottom padding', () => {
    const content = $('.bx--content-block');
    const contentPaddingTop = content.getCSSProperty('padding-bottom').value;
    expect(contentPaddingTop).toEqual('96px');
  });

  it('should have the correct spacing between heading and copy', () => {
    const content = $('.bx--content-block__heading');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('48px');
  });

  it('should have the correct spacing above pictogram', () => {
    const content = $('.bx--content-group');
    const contentPaddingTop = content.getCSSProperty('margin-top').value;
    expect(contentPaddingTop).toEqual('96px');
  });

  it('should have the correct spacing below pictogram', () => {
    const content = $('.bx--content-group');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('96px');
  });

  it('should have the correct spacing between pictogram items', () => {
    const content = $('.bx--content-item');
    const contentPaddingTop = content.getCSSProperty('margin-top').value;
    expect(contentPaddingTop).toEqual('32px');
  });

  it('should have the correct spacing above pictogram items', () => {
    const content = $('.bx--content-item');
    const contentPaddingTop = content.getCSSProperty('margin-top').value;
    expect(contentPaddingTop).toEqual('32px');
  });

  it('should have the correct spacing below pictogram items', () => {
    const content = $('.bx--content-item');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('32px');
  });

  it('should have the correct pictogram height', () => {
    const content = $('.bx--pictogram-item__pictogram');
    const contentPaddingTop = content.getCSSProperty('height').value;
    expect(contentPaddingTop).toEqual('80px');
  });

  it('should have the correct pictogram width', () => {
    const content = $('.bx--pictogram-item__pictogram');
    const contentPaddingTop = content.getCSSProperty('width').value;
    expect(contentPaddingTop).toEqual('80px');
  });

  it('should have the correct spacing between pictogram copy and link', () => {
    const content = $('.bx--content-item__copy p');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('24px');
  });

  it('should have the correct spacing between pictogram heading and copy', () => {
    const content = $('.bx--content-group__title');
    const contentPaddingTop = content.getCSSProperty('margin-bottom').value;
    expect(contentPaddingTop).toEqual('32px');
  });

  it('should have the correct card padding top', () => {
    const content = $('.bx--card__wrapper');
    const contentPaddingTop = content.getCSSProperty('padding').value;
    expect(contentPaddingTop).toEqual('16px');
  });

  it('should navigate to the correct URL when clicking the card', () => {
    $('.bx--card__copy').click();
    expect(browser.getUrl()).toBe('https://www.example.com/');
    browser.back();
  });

  it('should navigate to the correct URL when clicking the pictogram', () => {
    $('.bx--link.bx--link-with-icon').click();
    expect(browser.getUrl()).toBe('https://www.ibm.com/us-en/?ar=1');
    browser.back();
  });

  it('should navigate to the correct URL when clicking the CTA Card', () => {
    $('.bx--card__wrapper').click();
    expect(browser.getUrl()).toBe('https://www.example.com/');
    browser.back();
  });
});

describe('ContentBlockMixed: With Aside Items', () => {
  beforeAll(() => {
    browser.url(_url + _pathAsideItems);
    browser.setWindowSize(1200, 800);
    browser.pause(1000);
  });

  it('should load an aside element with link list', () => {
    const aside = $('aside [data-autoid="dds--link-list"]');
    expect(aside.isExisting()).toBe(true);
  });
});
