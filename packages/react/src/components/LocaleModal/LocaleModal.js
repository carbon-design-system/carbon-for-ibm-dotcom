/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  Search,
} from 'carbon-components-react';
import { LocaleAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModal component
 *
 * @param {boolean} isOpen Opens modal
 * @property {boolean} setIsOpen isOpen state of modal
 * @property {string} availabilityText locale list header
 * @property {string} unavailabilityText locale list header when no results in search
 * @property {string} placeHolderText placeholder text for the Search
 * @property {string} labelText label text for the Search icon
 * @property {string} headerLabel modal header label
 * @property {string} headerTitle modal header title
 * @returns {*} LocaleModal component
 */
const LocaleModal = ({
  isOpen,
  setIsOpen,
  availabilityText,
  unavailabilityText,
  placeHolderText,
  labelText,
  headerLabel,
  headerTitle,
}) => {
  const [list, setList] = useState({});

  useEffect(() => {
    (async () => {
      const locale = await LocaleAPI.getLocale();
      const list = locale && (await LocaleAPI.getList(locale));
      setList(list);
    })();
  }, []);

  useEffect(() => {
    const localeFilter = document.getElementById(
      `${prefix}--locale-modal__filter`
    );
    const localeItems = document.querySelectorAll(
      `.${prefix}--locale-modal__locales`
    );
    const localeText = document.querySelector(
      `.${prefix}--locale-modal__search-text`
    );
    const closeBtn = document.querySelector(
      `.${prefix}--search .${prefix}--search-close`
    );
    const localeHidden = `${prefix}--locale-modal__locales-hidden`;

    localeFilter.addEventListener('keyup', filterLocale);

    /**
     * Filter locale links based on search input
     *
     */
    function filterLocale() {
      const filterVal = localeFilter.value.toUpperCase();

      [...localeItems].map(item => {
        const locale = item.getElementsByTagName('div');
        const country = locale[0];
        const language = locale[1];

        if (
          country.innerHTML.toUpperCase().indexOf(filterVal) > -1 ||
          language.innerHTML.toUpperCase().indexOf(filterVal) > -1
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
        localeItems.length == localeItemsHidden.length
          ? unavailabilityText
          : availabilityText;
    }

    /**
     * Show all links when close button clicked
     *
     */
    closeBtn.addEventListener('click', () => {
      [...localeItems].map(item => {
        item.classList.remove(localeHidden);
      });
    });
  });

  /**
   *  method to merge list and sort alphabetically by country
   *
   * @param {object} list country list
   *
   * @returns {object} list item
   */
  const sortList = list => {
    let countryList = [];
    list.regionList &&
      list.regionList.map(region => {
        countryList = countryList.concat(region.countryList);
      });
    countryList.sort((a, b) => (a.name > b.name ? 1 : -1));
    return countryList;
  };

  return (
    <ComposedModal
      open={isOpen}
      onClose={close}
      data-autoid={`${stablePrefix}--locale-modal`}>
      <ModalHeader label={headerLabel} title={headerTitle} />
      <ModalBody className={`${prefix}--locale-modal`}>
        <div className={`${prefix}--locale-modal__search`}>
          <Search
            data-autoid={`${stablePrefix}--locale-modal__filter`}
            placeHolderText={placeHolderText}
            labelText={labelText}
            id={`${prefix}--locale-modal__filter`}
          />
          <p className={`${prefix}--locale-modal__search-text`}>
            {availabilityText}
          </p>
        </div>
        <div className={`${prefix}--locale-modal__list`}>
          {sortList(list).map((item, index) => (
            <a
              data-autoid={`${stablePrefix}--locale-modal__locales`}
              key={index}
              className={`${prefix}--locale-modal__locales`}
              href={`https://www.ibm.com/${item.locale[0][0]}`}>
              <div className={`${prefix}--locale-modal__locales__name`}>
                {item.name}
              </div>
              <div className={`${prefix}--locale-modal__locales__name`}>
                {item.locale[0][1]}
              </div>
            </a>
          ))}
        </div>
      </ModalBody>
    </ComposedModal>
  );

  /**
   * Sets modal state to closed
   *
   * @private
   */
  function close() {
    setIsOpen(false);
  }
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{isOpen: boolean, setIsOpen: boolean, availabilityText: string, unavailabilityText: string, placeHolderText: string, labelText: string, labelText: string, headerLabel: string, headerTitle: string}}
 */
LocaleModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.bool,
  availabilityText: PropTypes.string,
  unavailabilityText: PropTypes.string,
  placeHolderText: PropTypes.string,
  labelText: PropTypes.string,
  headerLabel: PropTypes.string,
  headerTitle: PropTypes.string,
};

/**
 * @property defaultProps
 * @type {{availabilityText: string, unavailabilityText: string, placeHolderText: string, labelText: string, headerLabel: string, headerTitle: string}}
 */
LocaleModal.defaultProps = {
  availabilityText:
    'This page is available in the following locations and languages',
  unavailabilityText:
    'This page is unavailable in your preferred location or language',
  placeHolderText: 'Search',
  labelText: 'Search',
  headerLabel: 'United States — English',
  headerTitle: 'Select your region',
};

export default LocaleModal;
