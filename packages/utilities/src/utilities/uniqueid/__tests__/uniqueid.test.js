/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { uniqueid } from '../';

describe('Unique ID utility', () => {
  it('should generate a unique ID', () => {
    const id1 = uniqueid();
    const id2 = uniqueid();
    expect(id1).toBe('id1');
    expect(id2).toBe('id2');
  });

  it('should generate a unique ID with user defined prefix', () => {
    const id1 = uniqueid('prefix');
    const id2 = uniqueid('prefix-');
    expect(id1).toBe('prefix3');
    expect(id2).toBe('prefix-4');
  });
});
