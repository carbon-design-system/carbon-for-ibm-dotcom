/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('VideoPlayer', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-videoplayer--default`
    );
  });

  it('should have the right type for the caption', async () => {
    const caption = await page.waitForSelector(
      '.bx--video-player__video-caption'
    );
    const styleValues = await page.evaluate(
      caption =>
        window.getStyleValues(caption, [
          'font-size',
          'font-weight',
          'line-height',
          'letter-spacing',
        ]),
      caption
    );
    expect(styleValues).toEqual({
      'font-size': '14px',
      'font-weight': '400',
      'line-height': '20px',
      'letter-spacing': '0.16px',
    });
  });
});
