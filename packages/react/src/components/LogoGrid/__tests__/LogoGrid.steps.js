/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('LogoGrid', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-logogrid--default`
    );
    const copy = await page.waitForSelector('.bx--card__copy');
    await page.evaluate((copy) => {
      copy.insertAdjacentHTML(
        'beforeBegin',
        '<div class="bx--card__heading">Heading</div>'
      );
    }, copy);
  });

  it('should have the right type for the heading', async () => {
    const heading = await page.waitForSelector('.bx--card__heading');
    const styleValues = await page.evaluate(
      (heading) =>
        window.getStyleValues(heading, [
          'font-size',
          'font-weight',
          'line-height',
          'letter-spacing',
        ]),
      heading
    );
    expect(styleValues).toEqual({
      'font-size': '14px',
      'font-weight': '600',
      'line-height': '18px',
      'letter-spacing': '0.16px',
    });
  });
});
