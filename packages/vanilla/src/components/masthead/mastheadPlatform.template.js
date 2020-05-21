/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders masthead nav
 *
 * @param {object} platform Masthead menu data
 * @returns {string} masthead nav html output
 */
function mastheadPlatformTemplate(platform) {
  return `
      <a data-autoid="${stablePrefix}--masthead__platform-name" class="${prefix}--header__name" href="${platform.url}">${platform.name}</a>
  `;
}

export default mastheadPlatformTemplate;
