/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('dds-table-of-contents', () => {
  describe('With wide screen', () => {
    describe('Without heading content', function() {
      beforeEach(async () => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-table-of-contents--default`);
      });

      it('should hide the heading container unless it has its content', async () => {
        await expect(page).toHaveSelector('dds-table-of-contents .bx--tableofcontents__desktop__children', { state: 'hidden' });
      });
    });

    describe('With heading content', () => {
      beforeEach(async () => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-table-of-contents--with-heading-content`);
      });

      it('should show the heading container', async () => {
        await expect(page).toHaveSelector('dds-table-of-contents .bx--tableofcontents__desktop__children', { state: 'visible' });
      });
    });
  });

  describe('With narrow screen', () => {
    describe('Without heading content', function() {
      beforeEach(async () => {
        await page.setViewportSize({ width: 672, height: 720 });
        await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-table-of-contents--default`);
      });

      it('should hide the heading container unless it has its content', async () => {
        await expect(page).toHaveSelector('dds-table-of-contents .bx--tableofcontents__children__mobile', { state: 'hidden' });
      });
    });

    describe('With heading content', () => {
      beforeEach(async () => {
        await page.setViewportSize({ width: 672, height: 720 });
        await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-table-of-contents--with-heading-content`);
      });

      it('should show the heading container', async () => {
        await expect(page).toHaveSelector('dds-table-of-contents .bx--tableofcontents__children__mobile', { state: 'visible' });
      });
    });
  });
});
