/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes, toString } from '@carbon/icon-helpers';
import close from '@carbon/icons/es/close/20';
import cx from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import search from '@carbon/icons/es/search/20';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Sets up the redirect URL when a user selects a search suggestion
 *
 * @type {string}
 * @private
 */
const _redirectUrl =
  process.env.SEARCH_REDIRECT_ENDPOINT ||
  `https://www.ibm.com/search?lnk=mhsrch`;

/**
 * renders masthead search
 *
 * @param {object} searchProps Masthead search properties
 * @returns {string} masthead search html output
 */
function mastheadSearchTemplate(searchProps) {
  const closeIcon = toString({
    ...close,
    attrs: getAttributes(close.attrs),
  });

  const searchIcon = toString({
    ...search,
    attrs: getAttributes(search.attrs),
  });

  const searchOpenOnload = cx({
    [`${prefix}--masthead__search--active`]: searchProps.searchOpenOnload,
  });

  return `
    <div data-autoid="${prefix}--masthead__search" class="${prefix}--masthead__search ${searchOpenOnload}">
      <form action="${_redirectUrl}" method="get">
        <input type="hidden" name="lang" value="${searchProps.locale.lc}">
        <input type="hidden" name="cc" value="${searchProps.locale.cc}">
        <input type="hidden" name="lnk" value="mhsrch">
        <div role="combobox" aria-haspopup="listbox" aria-owns="react-autowhatever-1" aria-expanded="false" class="react-autosuggest__container">
          <input id="autoComplete" type="text" autocomplete="off" aria-autocomplete="list" aria-controls="react-autowhatever-1" class="${prefix}--header__search--input" placeholder="${searchProps.placeHolderText}" data-autoid="${stablePrefix}--header__search--input" name="q" value="" tabindex="-1">
          <button data-autoid="${prefix}--header__search--search" aria-label="${searchProps.placeHolderText}" class="${prefix}--header__search--search ${prefix}--header__action" type="button">
            ${searchIcon}
          </button>
          <button data-autoid="${stablePrefix}--header__search--close" aria-label="Close" class="${prefix}--header__search--close ${prefix}--header__action" type="button">
            ${closeIcon}
          </button>
          <div id="react-autowhatever-1" role="listbox" class="react-autosuggest__suggestions-container"></div>
        </div>
      </form>
    </div>`;
}

export default mastheadSearchTemplate;
