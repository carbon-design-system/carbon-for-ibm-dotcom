/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import links from '../__stories__/links';

describe('dds-masthead-*', () => {
  let navigated;

  describe('With wide screen', () => {
    beforeAll(async () => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default`);
      await page.evaluate(navLinks => {
        document.querySelector('dds-masthead-container').navLinks = navLinks;
      }, links);
    });

    it('should support clicking the logo', async () => {
      navigated = true;
      await page.click('dds-masthead-logo');
      expect((await page.evaluate(() => window.location.href)).indexOf('https://www.ibm.com') >= 0).toBe(true);
    });

    it('should support navigating in profile menu', async () => {
      await page.click('dds-masthead-profile');
      navigated = true;
      await page.click('dds-masthead-profile-item[key="login"]');
      expect((await page.evaluate(() => window.location.href)).indexOf('https://idaas.iam.ibm.com') >= 0).toBe(true);
    });

    it('should support navigating in top nav menu', async () => {
      await page.click('dds-top-nav-menu[menu-label="Products"]');
      navigated = true;
      await page.click('dds-top-nav-menu-item[title="Products"]');
      expect((await page.evaluate(() => window.location.href)).indexOf('https://www.ibm.com/products') >= 0).toBe(true);
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
    beforeAll(async () => {
      await page.setViewportSize({ width: 672, height: 720 });
      await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default`);
      await page.evaluate(navLinks => {
        document.querySelector('dds-masthead-container').navLinks = navLinks;
      }, links);
    });

    it('should support navigating in top nav menu', async () => {
      await page.click('dds-masthead-menu-button');
      await page.click('dds-left-nav-menu[title="Products"]');
      navigated = true;
      await page.click('dds-left-nav-menu-item[title="Products"]');
      expect((await page.evaluate(() => window.location.href)).indexOf('https://www.ibm.com/products') >= 0).toBe(true);
    });
  });

  afterEach(async () => {
    if (navigated) {
      await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-masthead--default`);
      await page.evaluate(navLinks => {
        document.querySelector('dds-masthead-container').navLinks = navLinks;
      }, links);
      navigated = false;
    }
  });
});
