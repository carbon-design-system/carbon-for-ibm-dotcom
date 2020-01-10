import { markdownToHtml } from '../';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Markdown converter utility', () => {
  const str =
    'This <p>is</p> <input value="something" /> _italic_ and **bold**.';

  it('return the converted string with italic and bold', () => {
    const output = markdownToHtml(str);
    const expected = `This is <em class="${prefix}--type-light">italic</em> and <strong class="${prefix}--type-semibold">bold</strong>.`;
    expect(output).toBe(expected);
  });

  it('return the converted string with italic', () => {
    const output = markdownToHtml(str, { bold: false });
    const expected = `This is <em class="${prefix}--type-light">italic</em> and **bold**.`;
    expect(output).toBe(expected);
  });

  it('return the converted string with bold', () => {
    const output = markdownToHtml(str, { italic: false });
    const expected = `This is _italic_ and <strong class="${prefix}--type-semibold">bold</strong>.`;
    expect(output).toBe(expected);
  });

  it('return the converted string without carbon classes and allowing html', () => {
    const output = markdownToHtml(str, {
      allowHtml: true,
      useCarbonClasses: false,
    });
    const expected =
      'This <p>is</p> <input value="something" /> <em>italic</em> and <strong>bold</strong>.';
    expect(output).toBe(expected);
  });
});
