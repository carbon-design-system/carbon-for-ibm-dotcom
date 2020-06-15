/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { removeHtmlTagEntities } from '..';

describe('Html Tag and Entities remover utility', () => {
  const str =
    '<div><div><p>Lorem ipsum dolor sit amet,&nbsp;consectetur adipiscing elit.</p></div></div>';

  it('returns the converted string with no html tags', () => {
    const output = removeHtmlTagEntities(str, { removeEntities: false });
    const expected =
      'Lorem ipsum dolor sit amet,&nbsp;consectetur adipiscing elit.';
    expect(output.trim()).toBe(expected);
  });

  it('returns the converted string with no html tags or entities', () => {
    const output = removeHtmlTagEntities(str);
    const expected = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    expect(output.trim()).toBe(expected);
  });
});
