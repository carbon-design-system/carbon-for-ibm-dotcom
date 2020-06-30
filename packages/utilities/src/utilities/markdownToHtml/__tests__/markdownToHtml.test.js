/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { markdownToHtml } from '../';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

describe('Markdown converter utility', () => {
  const str =
    'This <p>is</p> <input value="something" /> _italic_ and **bold**.';
  const link = '[This](https://www.ibm.com) is an anchor link.';
  const ol = `
1. list item 1
2. list item 2
3. list item 3
  `;
  const ul = `
- list item 1
- list item 2
- list item 3
  `;

  it('returns the converted string with italic and bold', () => {
    const output = markdownToHtml(str);
    const expected = `<p>This is <em>italic</em> and <strong>bold</strong>.</p>`;
    expect(output.trim()).toBe(expected);
  });

  it('returns the converted string with link', () => {
    const output = markdownToHtml(link);
    const expected = `<p><a href="https://www.ibm.com" class="${prefix}--link">This</a> is an anchor link.</p>`;
    expect(output.trim()).toBe(expected);
  });

  it('returns the converted string with an ordered list', () => {
    const output = markdownToHtml(ol);
    const expected = `<ol class="${prefix}--list--ordered"><li class="${prefix}--list__item">list item 1</li><li class="${prefix}--list__item">list item 2</li><li class="${prefix}--list__item">list item 3</li></ol>`;
    expect(output).toBe(expected);
  });

  it('returns the converted string with an unordered list', () => {
    const output = markdownToHtml(ul);
    const expected = `<ul class="${prefix}--list--unordered"><li class="${prefix}--list__item">list item 1</li><li class="${prefix}--list__item">list item 2</li><li class="${prefix}--list__item">list item 3</li></ul>`;
    expect(output).toBe(expected);
  });
});
