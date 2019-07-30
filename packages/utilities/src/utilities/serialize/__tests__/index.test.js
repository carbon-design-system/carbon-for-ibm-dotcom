import { serialize } from '../serialize';

describe('Serialize utility', () => {
  const obj = {
    param1: 'one',
    param2: 'two',
    param3: 'three',
  };

  it('should return a serialized string', () => {
    const output = serialize(obj);
    expect(output).toBe('param1=one&param2=two&param3=three');
  });
});
