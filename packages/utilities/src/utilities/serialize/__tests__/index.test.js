/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { serialize } from '../';

describe('Serialize utility', () => {
  const obj = {
    param1: 'one',
    param2: 'two',
    param3: 'three',
  };

  it('should return a serialized string', () => {
    const output = serialize(obj);
    expect(output).toBe('param1=one&param2=two&param3=three');
  });
});
