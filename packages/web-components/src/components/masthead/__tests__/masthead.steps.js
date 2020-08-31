/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('dds-masthead-*', () => {
  describe('With wide screen', () => {
    beforeEach(async () => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default&mock`);
    });

    it('should support clicking the logo', async () => {
      const promiseNavigation = page.waitForNavigation();
      await page.click('dds-masthead-logo');
      await promiseNavigation;
      expect(await page.evaluate(() => window.location.href)).toMatch('https://www.ibm.com');
    });

    it('should support navigating in profile menu', async () => {
      await page.click('dds-masthead-profile');
      const promiseNavigation = page.waitForNavigation();
      await page.click('dds-masthead-profile-item[key="login"]');
      await promiseNavigation;
      expect(await page.evaluate(() => window.location.href)).toMatch('https://idaas.iam.ibm.com');
    });

    it('should support navigating in top nav menu', async () => {
      await page.click('dds-top-nav-menu[menu-label="Products"]');
      const promiseNavigation = page.waitForNavigation();
      await page.click('dds-top-nav-menu-item[title="Products"]');
      await promiseNavigation;
      expect(await page.evaluate(() => window.location.href)).toMatch('https://www.ibm.com/products');
    });

    it('should support showing/hiding the search box', async () => {
      await page.click('dds-masthead-search button[part="open-button"]');
      await expect(page).toHaveSelector('dds-masthead-search input[part="search-input"]', { state: 'visible' });
      await page.click('dds-masthead-search button[part="close-button"]');
      await expect(page).toHaveSelector('dds-masthead-search input[part="search-input"]', { state: 'hidden' });
    });

    it('should show the elements', async () => {
      await expect(page).toHaveSelector('dds-masthead-search', { state: 'visible' });
    });
  });

  describe('With narrow screen', () => {
    beforeEach(async () => {
      await page.setViewportSize({ width: 672, height: 720 });
      await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default&mock`);
    });

    it('should support navigating in top nav menu', async () => {
      await page.click('dds-masthead-menu-button');
      await page.click('dds-left-nav-menu[title="Products"]');
      const promiseNavigation = page.waitForNavigation();
      await page.click('dds-left-nav-menu-item[title="Products"]');
      await promiseNavigation;
      expect(await page.evaluate(() => window.location.href)).toMatch('https://www.ibm.com/products');
    });
  });
});
