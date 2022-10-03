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

// Map feature flags to component sidebar selectors.
const config = {
  DDS_PRICING_TABLE: 'button[id ^= "components-pricing-table"]',
  DDS_CONTENT_BLOCK_HEADLINES: 'button[id ^= "components-content-block-headlines"]',
  DDS_SCOPED_SEARCH: 'button[id ^= "components-masthead-with-scoped-search"]',
  DDS_CLOUD_MASTHEAD: 'button[id ^= "components-cloud-masthead"]',
  DDS_CONTENT_BLOCK_CARD_STATIC: 'button[id ^= "components-content-block-card-static"]',
};
const configKeys = Object.keys(config);
const configValues = Object.values(config);
let CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR = '';

// Build string of CSS rules.
if (!process.env.DDS_FLAGS_ALL) {
  for (let i = 0; i < configKeys.length; i++) {
    let flag = configKeys[i];
    if (!process.env[flag]) {
      CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR += `${configValues[i]} { display: none !important; }\n`;
    }
  }
}

// Inject any CSS rules into the page.
if (CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR.length) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(document.createTextNode(CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR));
}
