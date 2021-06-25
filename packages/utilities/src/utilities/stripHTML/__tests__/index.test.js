/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { stripHTML } from '../';

describe('StripHTML utility', () => {
  const content = '<h1>Lorem ipsum dolor sit amet.</h1>';

  it('should return a string without HTML tags', () => {
    const output = stripHTML(content);
    expect(output).toBe('Lorem ipsum dolor sit amet.');
  });
});
