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

const CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR = `
button[id^="components-audio-player"],
button[id^="components-content-block-headlines"],
button[id^="components-leadspace-with-search"],
button[id^="components-notice-choice"] {
  display: none !important
}
`;

if (
  !process.env.DDS_FLAGS_ALL &&
  !process.env.DDS_AUDIO_PLAYER &&
  !process.env.DDS_CONTENT_BLOCK_HEADLINES &&
  !process.env.DDS_LEADSPACE_WITH_SEARCH &&
  !process.env.DDS_NOTICE_CHOICE
) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.appendChild(
    document.createTextNode(CSS_TO_HIDE_TEST_SECTION_FROM_SIDEBAR)
  );
}
