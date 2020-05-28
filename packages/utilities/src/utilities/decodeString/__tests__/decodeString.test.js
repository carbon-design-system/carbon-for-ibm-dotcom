/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { decodeString } from '../';

describe('Decode string utility', () => {
  const str = 'https://www.ibm.com/search?lang=en&amp;cc=us&amp;q=cloud';

  it('should return a string with decoded text content', () => {
    const output = decodeString(str);
    expect(output).toBe('https://www.ibm.com/search?lang=en&cc=us&q=cloud');
  });
});
