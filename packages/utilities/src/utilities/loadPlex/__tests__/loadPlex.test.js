/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { loadPlex } from '../';

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
  beforeAll(() => {
    loadPlex('ar');
  });

  afterAll(() => {
    _cleanPage();
  });

  it('should set Plex Arabic font-family on the page', () => {
    expect(document.body.style.fontFamily).toBe(
      'IBM Plex Sans Arabic,IBM Plex Sans,Helvetica Neue,Arial,sans-serif'
    );
  });

  it('should load Plex Arabic font css on the page', () => {
    const headContent = document.getElementsByTagName('head')[0].innerHTML;
    const fontLink =
      'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/plex/sans-arabic.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });
});

describe('Load plex utility | Japanese', () => {
  beforeAll(() => {
    loadPlex('jp');
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
    const fontLink =
      'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/plex/sans-jp.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });
});

describe('Load plex utility | Korean', () => {
  beforeAll(() => {
    loadPlex('kr');
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
    const fontLink =
      'https://1.www.s81c.com/common/carbon-for-ibm-dotcom/plex/sans-kr.css';

    expect(headContent.indexOf(fontLink)).not.toEqual(-1);
  });
});

describe('Load plex utility | English', () => {
  beforeAll(() => {
    loadPlex('en');
  });

  it('should not set anything if passing `en`', () => {
    const links = document.getElementsByTagName('link').length;
    const family = document.body.style.fontFamily;

    expect(links).toEqual(0);
    expect(family).toBe('');
  });
});
