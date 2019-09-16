import { featureFlag } from '../';

describe('Feature flag utility', () => {
  const objectJSX = {};

  it('return the jsx object provided', () => {
    const output = featureFlag(true, objectJSX);
    expect(output).toBe(objectJSX);
  });

  it('return null', () => {
    const output = featureFlag(false, objectJSX);
    expect(output).toBeNull;
  });
});
