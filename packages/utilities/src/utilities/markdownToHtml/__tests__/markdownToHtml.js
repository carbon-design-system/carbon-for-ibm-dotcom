import { markdownToHtml } from '../';

describe('Markdown converter utility', () => {
  const str =
    'This <p>is</p> <input value="something" /> _italic_ and *italic*. <span>This</span> is **bold** and __bold__.';

  it('return the converted string with italic and bold', () => {
    const output = markdownToHtml(str);
    const expected =
      'This is <em>italic</em> and <em>italic</em>. This is <strong>bold</strong> and <strong>bold</strong>.';
    expect(output).toBe(expected);
  });

  it('return the converted string with italic', () => {
    const output = markdownToHtml(str, { italic: true });
    const expected =
      'This is <em>italic</em> and <em>italic</em>. This is **bold** and __bold__.';
    expect(output).toBe(expected);
  });

  it('return the converted string with bold', () => {
    const output = markdownToHtml(str, { bold: true });
    const expected =
      'This is _italic_ and *italic*. This is <strong>bold</strong> and <strong>bold</strong>.';
    expect(output).toBe(expected);
  });
});
