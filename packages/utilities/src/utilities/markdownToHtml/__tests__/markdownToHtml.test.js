/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { markdownToHtml } from '../';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Markdown converter utility', () => {
  const str =
    'This <p>is</p> <input value="something" /> _italic_ and **bold**.';

  const strNewLine =
    'This paragraph is created when two new lines are detected.';

  it('returns the converted string with italic and bold', () => {
    const output = markdownToHtml(str);
    const expected = `<p>This is <em class="${prefix}--type-light">italic</em> and <strong class="${prefix}--type-semibold">bold</strong>.</p>`;
    expect(output).toBe(expected);
  });

  it('returns the converted string with italic', () => {
    const output = markdownToHtml(str, { bold: false });
    const expected = `<p>This is <em class="${prefix}--type-light">italic</em> and **bold**.</p>`;
    expect(output).toBe(expected);
  });

  it('returns the converted string with bold', () => {
    const output = markdownToHtml(str, { italic: false });
    const expected = `<p>This is _italic_ and <strong class="${prefix}--type-semibold">bold</strong>.</p>`;
    expect(output).toBe(expected);
  });

  it('returns the converted string in paragraphs', () => {
    const output = markdownToHtml(strNewLine, { bold: false, italic: false });
    const expected = `<p>This paragraph is created when two new lines are detected.</p>`;
    expect(output).toBe(expected);
  });

  it('returns the converted string without carbon classes and allowing html', () => {
    const output = markdownToHtml(str, {
      allowHtml: true,
      useCarbonClasses: false,
    });
    const expected =
      '<p>This <p>is</p> <input value="something" /> <em>italic</em> and <strong>bold</strong>.</p>';
    expect(output).toBe(expected);
  });
});
