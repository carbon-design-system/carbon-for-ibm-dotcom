/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ipcinfoCookie } from '../';

describe('ipcinfo cookie utility', () => {
  it('should set the ipcInfo cookie', () => {
    const locale = { cc: 'us', lc: 'en' };

    const mockSet = jest.fn();
    ipcinfoCookie.set = mockSet;
    ipcinfoCookie.set(locale);
    expect(mockSet).toBeCalled();
  });

  it('should fetch the ipcInfo cookie and return a neat object', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'ipcInfo=cc%253DUS%253Blc%253Den',
    });

    const info = {
      cc: 'US',
      lc: 'en',
    };

    const ipcinfo = ipcinfoCookie.get();
    expect(ipcinfo).toStrictEqual(info);
  });
});
