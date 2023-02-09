/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('LocaleModal', () => {
  describe('Main UI', () => {
    beforeAll(async () => {
      await page.goto(
        `http://localhost:${process.env.PORT}/iframe.html?id=components-locale-modal--default&knob-Use%20mock%20data=true`
      );
    });

    it('should have the right type for the header label', async () => {
      const headerLabel = await page.waitForSelector(
        '.bx--modal-header__label'
      );
      const styleValues = await page.evaluate(
        (headerLabel) =>
          window.getStyleValues(headerLabel, [
            'font-size',
            'font-weight',
            'line-height',
            'letter-spacing',
          ]),
        headerLabel
      );
      expect(styleValues).toEqual({
        'font-size': '14px',
        'font-weight': '400',
        'line-height': '18px',
        'letter-spacing': '0.16px',
      });
    });
  });

  describe('Locale search UI', () => {
    beforeAll(async () => {
      await page.goto(
        `http://localhost:${process.env.PORT}/iframe.html?id=components-locale-modal--default&knob-Use%20mock%20data=true`
      );
      await page.click('.bx--tile--clickable');
    });

    it('should have the right type for the search text', async () => {
      const searchText = await page.waitForSelector(
        '.bx--locale-modal__search-text'
      );
      const styleValues = await page.evaluate(
        (searchText) =>
          window.getStyleValues(searchText, [
            'font-size',
            'font-weight',
            'line-height',
            'letter-spacing',
          ]),
        searchText
      );
      expect(styleValues).toEqual({
        'font-size': '14px',
        'font-weight': '600',
        'line-height': '18px',
        'letter-spacing': '0.16px',
      });
    });
  });
});
