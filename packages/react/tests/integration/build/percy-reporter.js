/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/* global page */

const { percySnapshot } = require('@percy/puppeteer');

let currentFullName;

jasmine.getEnv().addReporter({
  specStarted(result) {
    currentFullName = result.fullName;
  },

  specDone() {
    currentFullName = undefined;
  },
});

afterEach(async () => {
  if (process.env.PERCY_TOKEN) {
    await page.setBypassCSP(true);
    await percySnapshot(page, currentFullName);
    await page.setBypassCSP(false);
  }
});
