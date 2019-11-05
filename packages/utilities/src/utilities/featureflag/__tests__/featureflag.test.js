import { featureFlag } from '../';

describe('Feature flag utility', () => {
  const objectJSX = {};
  const content = 'Lorem ipsum';

  it('execute function if provided', () => {
    const output = featureFlag(true, () => content);
    expect(output).toBe(content);
  });

  it('return the jsx object if provided', () => {
    const output = featureFlag(true, objectJSX);
    expect(output).toBe(objectJSX);
  });

  it('return null', () => {
    const output = featureFlag(false, objectJSX);
    expect(output).toBeNull();
  });
});
