/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('Masthead', () => {
  describe('Submenu in narrow screen', () => {
    beforeAll(async () => {
      await page.setViewportSize({ width: 672, height: 720 });
      await page.goto(
        `http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default&knob-Use%20mock%20data=true`
      );
      await page.click(
        '[data-autoid="dds--masthead"] .bx--header__menu-toggle'
      );
      await page.click('button.bx--side-nav__submenu');
    });

    it('should have the right type for the side nav link text', async () => {
      const linkText = await page.waitForSelector(
        '.bx--masthead__side-nav--submemu-back .bx--side-nav__link-text'
      );
      const styleValues = await page.evaluate(
        linkText =>
          window.getStyleValues(linkText, [
            'font-size',
            'font-weight',
            'line-height',
            'letter-spacing',
          ]),
        linkText
      );
      expect(styleValues).toEqual({
        'font-size': '16px',
        'font-weight': '400',
        'line-height': '22px',
        'letter-spacing': 'normal',
      });
    });
  });
});
