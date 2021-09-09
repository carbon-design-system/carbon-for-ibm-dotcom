/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { loadNonLatinPlex } from '../';

/**
 * Cleans the page after testing
 *
 * @private
 */
function _cleanPage() {
  document.body.style.fontFamily = '';
  document.getElementsByTagName('head')[0].innerHTML = '';
}

describe('Load plex utility | Arabic', () => {
  afterEach(() => {
    _cleanPage();
  });

  it('should set Plex Arabic font-family on the page', () => {
    loadNonLatinPlex('ar');

    expect(document.body.style.fontFamily).toBe(
      'IBM Plex Sans Arabic,IBM Plex Sans,Helvetica Neue,Arial,sans-serif'
    );
  });

  it('should load Plex Arabic font css on the page', () => {
    loadNonLatinPlex('ar');

    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLink =
      'https://1.www.s81c.com/common/carbon/plex/sans-arabic.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });

  it('should load specific Plex Arabic font css weight regular on the page', () => {
    loadNonLatinPlex('ar', [400]);

    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLink =
      'https://1.www.s81c.com/common/carbon/plex/sans-arabic-regular.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });

  it('should load specific Plex Arabic font css weight regular and semibold on the page', () => {
    loadNonLatinPlex('ar', [400, 600]);

    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLinkRegular =
      'https://1.www.s81c.com/common/carbon/plex/sans-arabic-regular.css';
    const fontLinkSemiBold =
      'https://1.www.s81c.com/common/carbon/plex/sans-arabic-semibold.css';

    expect(headContent.indexOf(fontLinkRegular)).not.toEqual(-1);
    expect(headContent.indexOf(fontLinkSemiBold)).not.toEqual(-1);
  });
});

describe('Load plex utility | Japanese', () => {
  beforeAll(() => {
    loadNonLatinPlex('ja');
  });

  afterAll(() => {
    _cleanPage();
  });

  it('should set Plex Japanese font-family on the page', () => {
    expect(document.body.style.fontFamily).toBe(
      'IBM Plex Sans JP,IBM Plex Sans,Helvetica Neue,Arial,sans-serif'
    );
  });

  it('should load Plex Japanese font css on the page', () => {
    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLink = 'https://1.www.s81c.com/common/carbon/plex/sans-jp.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });
});

describe('Load plex utility | Korean', () => {
  beforeAll(() => {
    loadNonLatinPlex('ko');
  });

  afterAll(() => {
    _cleanPage();
  });

  it('should set Plex Korean font-family on the page', () => {
    expect(document.body.style.fontFamily).toBe(
      'IBM Plex Sans KR,IBM Plex Sans,Helvetica Neue,Arial,sans-serif'
    );
  });

  it('should load Plex Korean font css on the page', () => {
    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLink = 'https://1.www.s81c.com/common/carbon/plex/sans-kr.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });
});

describe('Load plex utility | English', () => {
  beforeAll(() => {
    loadNonLatinPlex('en');
  });

  it('should not set anything if passing `en`', () => {
    const links = document.getElementsByTagName('link').length;
    const family = document.body.style.fontFamily;

    expect(links).toEqual(0);
    expect(family).toBe('');
  });
});
