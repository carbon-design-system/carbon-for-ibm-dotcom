/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import ipcinfoCookie from '@carbon/ibmdotcom-utilities/es/utilities/ipcinfoCookie/ipcinfoCookie';
import PropTypes from 'prop-types';
import Search from '../../internal/vendor/carbon-components-react/components/Search/Search';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModalCountries component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of country and language codes
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @returns {*} LocaleModal component
 */
const LocaleModalCountries = ({
  regionList,
  setClearResults,
  ...modalLabels
}) => {
  useEffect(() => {
    const localeList = document.querySelector(`.${prefix}--locale-modal__list`);
    const localeFilter = document.getElementById(
      `${prefix}--locale-modal__filter`
    );
    const localeText = document.querySelector(
      `.${prefix}--locale-modal__search-text`
    );
    const closeBtn = document.querySelector(
      `.${prefix}--search .${prefix}--search-close`
    );
    const localeHidden = `${prefix}--locale-modal__locales-hidden`;

    localeList.scrollTop = 0;

    localeFilter?.addEventListener(
      'keyup',
      filterLocale.bind(
        null,
        setClearResults,
        localeFilter,
        localeHidden,
        localeText,
        modalLabels
      )
    );

    /**
     * Show all links when close button clicked
     *
     */
    closeBtn?.addEventListener('click', setClearResults.bind(null, true));

    return () => {
      closeBtn?.removeEventListener('click', setClearResults.bind(null, true));
      localeFilter?.removeEventListener(
        'keyup',
        filterLocale.bind(
          null,
          setClearResults,
          localeFilter,
          localeHidden,
          localeText,
          modalLabels
        )
      );
    };
  });

  return (
    <div className={`${prefix}--locale-modal__filter`}>
      <div className={`${prefix}--locale-modal__search`}>
        <Search
          data-autoid={`${stablePrefix}--locale-modal__filter`}
          placeHolderText={modalLabels.searchPlaceholder}
          labelText={modalLabels.searchLabel}
          closeButtonLabelText={modalLabels.searchClearText}
          id={`${prefix}--locale-modal__filter`}
          tabIndex="0"
        />
        <p className={`${prefix}--locale-modal__search-text`}>
          {modalLabels.availabilityText}
        </p>
      </div>
      <div
        role="listbox"
        tabIndex="0"
        aria-labelledby={`${prefix}--locale-modal__filter`}
        className={`${prefix}--locale-modal__list`}>
        {regionList &&
          regionList.map(region =>
            region.countries.map((country, index) => (
              <a
                key={index}
                className={`${prefix}--locale-modal__locales`}
                onClick={() => _setCookie(country.locale)}
                href={country.href}
                data-region={country.region}>
                <div className={`${prefix}--locale-modal__locales__name`}>
                  {country.name}
                </div>
                <div className={`${prefix}--locale-modal__locales__name`}>
                  {country.language}
                </div>
              </a>
            ))
          )}
      </div>
    </div>
  );
};

/**
 * @property {object} propTypes LocaleModalCountries propTypes
 * @description Defined property types for component
 * @type {{regionList: Array, availabilityText: string, unavailabilityText: string, placeHolderText: string, labelText: string}}
 */
LocaleModalCountries.propTypes = {
  /**
   * Array of regions, countries, and languages.
   */
  regionList: PropTypes.array,

  /**
   * Func to clear search input.
   */
  setClearResults: PropTypes.func,
};

LocaleModalCountries.defaultProps = {
  searchLabel: 'Search by location or language',
};

/**
 * method to handle when country/region has been selected
 * sets the ipcInfo cookie with selected locale
 *
 * @param {object} locale selected country/region
 * @private
 */
export const _setCookie = locale => {
  const localeSplit = locale.split('-');
  const localeObj = {
    cc: localeSplit[1],
    lc: localeSplit[0],
  };
  ipcinfoCookie.set(localeObj);
};

/**
 * Filter locale links based on search input
 *
 */
export const filterLocale = (
  setClearResults,
  localeFilter,
  localeHidden,
  localeText,
  modalLabels
) => {
  const localeItems = document.querySelectorAll(
    `.${prefix}--locale-modal__list a:not(.${prefix}--locale-modal__locales-filtered)`
  );

  setClearResults(false);
  const filterVal = localeFilter.value.toUpperCase();

  [...localeItems].map(item => {
    const locale = item.getElementsByTagName('div');

    const country = locale[0].textContent || locale[0].innerText;
    const language = locale[1].textContent || locale[1].innerText;

    if (
      country.toUpperCase().indexOf(filterVal) > -1 ||
      language.toUpperCase().indexOf(filterVal) > -1
    ) {
      item.classList.remove(localeHidden);
    } else {
      item.classList.add(localeHidden);
    }
  });

  /**
   * Update locale copy when no results
   *
   */
  const localeItemsHidden = document.querySelectorAll(`.${localeHidden}`);

  localeText.innerHTML =
    localeItems.length === localeItemsHidden.length
      ? modalLabels.unavailabilityText
      : modalLabels.availabilityText;
};

export default LocaleModalCountries;
