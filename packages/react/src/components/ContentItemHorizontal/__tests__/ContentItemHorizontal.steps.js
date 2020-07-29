/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('ContentItemHorizontal', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-contentitemhorizontal--default`
    );
  });

  it('should have the right type for the eyebrow', async () => {
    const eyebrow = await page.waitForSelector(
      '.bx--content-item-horizontal__item--eyebrow'
    );
    const styleValues = await page.evaluate(
      eyebrow =>
        window.getStyleValues(eyebrow, [
          'font-size',
          'font-weight',
          'line-height',
          'letter-spacing',
        ]),
      eyebrow
    );
    expect(styleValues).toEqual({
      'font-size': '14px',
      'font-weight': '400',
      'line-height': '20px',
      'letter-spacing': '0.16px',
    });
  });
});
