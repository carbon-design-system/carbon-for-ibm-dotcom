/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders masthead search
 *
 * @returns {string} masthead search html output
 */
function mastheadSearchTemplate() {
  return `
    <div data-autoid="${stablePrefix}--masthead__search" class="${prefix}--masthead__search">
      <form action="https://www.ibm.com/search?lnk=mhsrch" method="get">
        <input type="hidden" name="lang" value="en"><input type="hidden" name="cc" value="us"><input type="hidden" name="lnk" value="mhsrch">
        <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" class="react-autosuggest__container">
          <input type="text" autocomplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" class="${prefix}--header__search--input" placeholder="Search all of IBM" data-autoid="${stablePrefix}--header__search--input" name="q" tabindex="-1" value="">
          <button data-autoid="${stablePrefix}--header__search--search" aria-label="Search all of IBM" class="${prefix}--header__search--search ${prefix}--header__action" type="button">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" style="will-change: transform;">
              <path d="M30 28.59L22.45 21A11 11 0 1 0 21 22.45L28.59 30zM5 14a9 9 0 1 1 9 9 9 9 0 0 1-9-9z"></path>
            </svg>
          </button>
          <button data-autoid="${stablePrefix}--header__search--close" aria-label="Close" class="${prefix}--header__search--close ${prefix}--header__action" type="button">
            <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" style="will-change: transform;">
              <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"></path>
            </svg>
          </button>
          <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container"></div>
        </div>
      </form>
    </div>
  `;
}

export default mastheadSearchTemplate;
