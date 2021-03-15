/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const percySnapshot = require('@percy/webdriverio');

/**
 * Defines the host for testing
 *
 * @type {string | string}
 * @private
 */
const _url =
  (process && process.env.SELENIUM_HOST) ||
  'https://ibmdotcom-react-canary.mybluemix.net';

/**
 * Flag to switch to the web components paths instead of the React ones
 *
 * @type {boolean}
 * @private
 */
const _webcomponentsTests =
  (process && process.env.WEBCOMPONENTS_TESTS === 'true') || false;

/**
 * Sets the correct path (default Masthead)
 *
 * @type {string}
 * @private
 */
const _pathDefault = '/iframe.html?id=components-masthead--default';

/**
 * Sets the correct path (Custom Masthead)
 *
 * @type {string}
 * @private
 */
const _pathCustom =
  '/iframe.html?id=components-masthead--with-custom-navigation';

/**
 * Sets the correct path (Masthead with Platform)
 *
 * @type {string}
 * @private
 */
const _pathPlatform = '/iframe.html?id=components-masthead--with-platform';

describe('Masthead: Default', () => {
  it('should take a snapshot of the megamenu', async () => {
    await browser.url(_url + _pathDefault);
    await browser.setWindowSize(1280, 780);
    const nav0 = await $('[data-autoid="dds--masthead-default__l0-nav0"]');
    const nav1 = await $('[data-autoid="dds--masthead-default__l0-nav1"]');
    await nav0.click();
    await percySnapshot('Components|Masthead: Default - Mega Menu (Nav 0)', {
      widths: [1280],
    });
    await nav1.click();
    await percySnapshot('Components|Masthead: Default - Mega Menu (Nav 1)', {
      widths: [1280],
    });
  });

  it('should open the login menu', async () => {
    await browser.url(_url + _pathDefault);
    await browser.setWindowSize(1280, 780);
    let profile;

    if (_webcomponentsTests) {
      const profileElement = await $('dds-masthead-profile');
      profile = await profileElement.shadow$('a');
    } else {
      profile = await $('[data-autoid="dds--masthead-default__l0-account"]');
    }
    await profile.click();
    await percySnapshot('Components|Masthead: Default - Profile Menu', {
      widths: [1280],
    });
  });

  it('should open the search bar', async () => {
    await browser.url(_url + _pathDefault);
    await browser.setWindowSize(1280, 780);
    let search;
    if (_webcomponentsTests) {
      const searchElement = await $('dds-masthead-search');
      search = await searchElement.shadow$('button');
    } else {
      search = await $('[data-autoid="dds--masthead-default__l0-search"]');
    }
    await search.click();
    await percySnapshot('Components|Masthead: Default - Search', {
      widths: [1280],
    });
  });

  it('should take a snapshot of the mobile menu', async () => {
    await browser.url(_url + _pathDefault);
    await browser.setWindowSize(320, 780);
    let nav;
    if (_webcomponentsTests) {
      const menuButton = await $('dds-masthead-menu-button');
      nav = await menuButton.shadow$('button');
    } else {
      nav = await $('[data-autoid="dds--masthead-default-sidenav__l0-menu"]');
    }

    await nav.click();
    await percySnapshot('Components|Masthead: Default - Mobile Menu', {
      widths: [320],
    });
    const nav1 = await $(
      '[data-autoid="dds--masthead-default-sidenav__l0-nav0"]'
    );
    await nav1.click();
    await percySnapshot('Components|Masthead: Default - Mobile Menu Level 2', {
      widths: [320],
    });
  });

  it('should scroll the L0 overflow properly', async () => {
    await browser.url(_url + _pathCustom);
    await browser.setWindowSize(1280, 780);
    let overflow;

    if (_webcomponentsTests) {
      const topNav = await $('dds-top-nav');
      overflow = await topNav.shadow$('.bx--header__nav-caret-right');
    } else {
      overflow = await $('.bx--header__nav-caret-right');
    }

    await overflow.click();
    await browser.pause(3000);
    await percySnapshot('Components|Masthead: Custom - Overflow', {
      widths: [1280],
    });
  });

  it('should open the search bar with platform', async () => {
    await browser.url(_url + _pathPlatform);
    await browser.setWindowSize(1280, 780);
    let search;
    if (_webcomponentsTests) {
      const searchElement = await $('dds-masthead-search');
      search = await searchElement.shadow$('button');
    } else {
      search = await $('[data-autoid="dds--masthead-eco__l0-search"]');
    }
    await search.click();
    await percySnapshot('Components|Masthead: With Platform - Search', {
      widths: [1280],
    });
  });
});
