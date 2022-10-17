/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from '@storybook/addons';
import yourTheme from './theme';

addons.setConfig({
  theme: yourTheme,
});

/**
 * Conditionally generate CSS to hide a component based on its corresponding
 * feature flag environment variable.
 *
 * @param {*} envVar
 *   Environment variable to check.
 * @param {*} cssId
 *   CSS ID for selector.
 * @returns
 */
const cssToHide = (envVar, cssId) => {
  return envVar !== 'true' ? `button[id^="${cssId}"] { display: none !important; }\n` : '';
};

// Build string of CSS rules.
let CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR = '';
if (!process.env.DDS_FLAGS_ALL) {
  CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += cssToHide(process.env.DDS_CLOUD_MASTHEAD, 'components-cloud-masthead');
  CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += cssToHide(
    process.env.DDS_CONTENT_BLOCK_HEADLINES,
    'components-content-block-headlines'
  );
  CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += cssToHide(
    process.env.DDS_CONTENT_BLOCK_CARD_STATIC,
    'components-content-block-card-static'
  );
  CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += cssToHide(process.env.DDS_PRICING_TABLE, 'components-pricing-table');
  CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += cssToHide(process.env.DDS_SCOPED_SEARCH, 'components-masthead-with-scoped-search');
}

// Inject any CSS rules into the page.
if (CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR.length) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR));
}
