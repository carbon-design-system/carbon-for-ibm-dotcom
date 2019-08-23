import { escapeRegExp } from '../';

describe('Escape Regular Expressions utility', () => {
  const str = 'Hello?!*`~World()[]';

  it('should return an escaped regular expression string', () => {
    const output = escapeRegExp(str);
    expect(output).toBe('Hello\\?!\\*`~World\\(\\)\\[\\]');
  });
});
