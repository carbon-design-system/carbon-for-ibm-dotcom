import { settings } from 'carbon-components';
import { markdownToHtml } from '../';

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
    const output = markdownToHtml(str, { italic: true });
    const expected = `This is <em class="${prefix}--type-light">italic</em> and **bold**.`;
    expect(output).toBe(expected);
  });

  it('return the converted string with bold', () => {
    const output = markdownToHtml(str, { bold: true });
    const expected = `This is _italic_ and <strong class="${prefix}--type-semibold">bold</strong>.`;
    expect(output).toBe(expected);
  });

  it('return the converted string without carbon classes', () => {
    const output = markdownToHtml(str, { useCarbonClasses: false });
    const expected = 'This is <em>italic</em> and <strong>bold</strong>.';
    expect(output).toBe(expected);
  });
});
