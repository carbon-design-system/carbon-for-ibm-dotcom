/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, toString } from '@carbon/icon-helpers';
import close from '@carbon/icons/es/close/20';
import search from '@carbon/icons/es/search/20';
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
  const closeIcon = toString({
    ...close,
    attr: getAttributes(close.attrs),
  });

  const searchIcon = toString({
    ...search,
    attr: getAttributes(search.attrs),
  });

  return `
    <div data-autoid="${prefix}--masthead__search" class="${prefix}--masthead__search ${prefix}--masthead__search--active">
      <form action="https://www.ibm.com/search?lnk=mhsrch" method="get">
        <input type="hidden" name="lang" value="en">
        <input type="hidden" name="cc" value="us">
        <input type="hidden" name="lnk" value="mhsrch">
        <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" class="react-autosuggest__container">
          <input id="autoComplete" type="text" autocomplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" class="${prefix}--header__search--input" placeholder="Search all of IBM" data-autoid="${stablePrefix}--header__search--input" name="q" value="" tabindex="-1">
          <button data-autoid="${prefix}--header__search--search" aria-label="Search all of IBM" class="${prefix}--header__search--search ${prefix}--header__action" type="button">
            ${searchIcon}
          </button>
          <button data-autoid="dds--header__search--close" aria-label="Close" class="${prefix}--header__search--close ${prefix}--header__action" type="button">
            ${closeIcon}
          </button>
          <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container"></div>
        </div>
      </form>
    </div>`;
}

export default mastheadSearchTemplate;
