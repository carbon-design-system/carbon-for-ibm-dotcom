/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ComposedModal, {
  ModalBody,
  ModalHeader,
} from '../../internal/vendor/carbon-components-react/components/ComposedModal/ComposedModal';
import React, { useEffect, useState } from 'react';
import altlangs from '@carbon/ibmdotcom-utilities/es/utilities/altlangs/altlangs';
import ArrowLeft20 from '@carbon/icons-react/es/arrow--left/20';
import cx from 'classnames';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import EarthFilled20 from '@carbon/icons-react/es/earth--filled/20';
import LocaleAPI from '@carbon/ibmdotcom-services/es/services/Locale/Locale';
import LocaleModalCountries from './LocaleModalCountries';
import LocaleModalRegions from './LocaleModalRegions';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModal component.
 */
const LocaleModal = ({ isOpen, setIsOpen, localeData, localeDisplay }) => {
  const [list, setList] = useState({});
  const [langDisplay, setLangDisplay] = useState();
  const [modalLabels, setModalLabels] = useState({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [clearResults, setClearResults] = useState(false);
  const [currentRegion, setCurrentRegion] = useState();

  const filterClass = cx({
    [`${prefix}--locale-modal__filtering`]: isFiltering,
  });

  useEffect(() => {
    let stale = false;

    (async () => {
      let list, getLangDisplay;
      if (localeData && localeDisplay) {
        list = Object.assign({}, localeData);
        getLangDisplay = localeDisplay;
      } else {
        const pair = await Promise.all([
          LocaleAPI.getLocale(),
          LocaleAPI.getLangDisplay(),
        ]);
        if (!stale) {
          const locale = pair[0];
          getLangDisplay = pair[1];
          list = locale && (await LocaleAPI.getList(locale));
        }
      }

      setLangDisplay(getLangDisplay);
      setList(list);
      setModalLabels(list.localeModal);

      document
        .querySelector(`.${prefix}--modal-header__heading`)
        ?.setAttribute('tabindex', '0');

      const localeModalContainer = document.querySelector(
        `.${prefix}--locale-modal-container .${prefix}--modal-container`
      );

      localeModalContainer?.setAttribute('role', 'dialog');
      localeModalContainer?.setAttribute('tabindex', '-1');
      localeModalContainer?.setAttribute('aria-modal', 'true');
    })();

    // reset the country search results when clicking close icon or back to region button
    if (clearResults) {
      const localeItems = document.querySelectorAll(
        `.${prefix}--locale-modal__locales`
      );

      const localeHidden = `${prefix}--locale-modal__locales-hidden`;

      [...localeItems].map(item => {
        item.classList.remove(localeHidden);
      });
    }

    return () => {
      stale = true;
    };
  }, [clearResults, localeData, localeDisplay]);

  return (
    <ComposedModal
      open={isOpen}
      onClose={() => {
        _close(setIsOpen);
      }}
      className={`${prefix}--locale-modal-container`}
      data-autoid={`${stablePrefix}--locale-modal`}
      selectorPrimaryFocus={`.${prefix}--modal-close`}>
      {isFiltering ? (
        <ModalHeader
          data-autoid={`${stablePrefix}--locale-modal__region-back`}
          label={[
            <ArrowLeft20
              className={`${prefix}--locale-modal__label-arrow`}
              key="arrow-left"
            />,
            modalLabels.headerTitle,
          ]}
          title={currentRegion}
          className={`${prefix}--locale-modal__back`}
        />
      ) : (
        <ModalHeader
          label={[
            langDisplay,
            <EarthFilled20
              key="earthfilled"
              className={`${prefix}--locale-modal__label-globe`}
            />,
          ]}
          title={modalLabels.headerTitle}
          iconDescription={modalLabels.modalClose}
        />
      )}
      <ModalBody className={`${prefix}--locale-modal ${filterClass}`}>
        <LocaleModalRegions
          regionList={sortList(list)}
          setCurrentRegion={setCurrentRegion}
          setIsFiltering={setIsFiltering}
          setClearResults={setClearResults}
          returnButtonLabel={modalLabels.headerTitle}
        />
        <LocaleModalCountries
          regionList={sortList(list)}
          setClearResults={setClearResults}
          {...modalLabels}
        />
      </ModalBody>
    </ComposedModal>
  );
};

LocaleModal.propTypes = {
  /**
   * `true` to open modal in its initial state.
   */
  isOpen: PropTypes.bool,

  /**
   * The setter for `isOpen`.
   */
  setIsOpen: PropTypes.func,

  /**
   * Locale/Language data to bypass the service call.
   */
  localeData: PropTypes.shape({
    regionList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string,
        countryList: PropTypes.shape({
          name: PropTypes.string,
          locale: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
        }),
      })
    ),
    localeModal: PropTypes.shape({
      headerTitle: PropTypes.string,
      modalClose: PropTypes.string,
      searchLabel: PropTypes.string,
      searchClearText: PropTypes.string,
      searchPlaceholder: PropTypes.string,
      availabilityText: PropTypes.string,
      unavailabilityText: PropTypes.string,
    }),
  }),

  /**
   * Display text for current locale/language to bypass service call.
   */
  localeDisplay: PropTypes.string,
};

LocaleModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  localeData: null,
  localeDisplay: null,
};

/**
 *  New region/country list based lang attributes available on page
 *
 * @param {object} list country list
 *
 * @returns {object} list item
 */
export const sortList = list => {
  const pageLangs = altlangs();
  const filterList = [];

  list.regionList &&
    list.regionList.map((region, index) => {
      filterList.push({
        name: region.name,
        key: region.key,
        countries: [],
      });

      for (let [key, value] of Object.entries(pageLangs)) {
        region.countryList.map(country => {
          country.locale.map(loc => {
            if (loc[0].includes(key)) {
              filterList[index].countries.push({
                region: region.key,
                name: country.name,
                locale: loc[0],
                language: loc[1],
                href: value,
              });
            }
          });
        });
      }

      filterList[index].countries.sort((a, b) => (a.name > b.name ? 1 : -1));
    });
  return filterList;
};

/**
 * Sets modal state to closed
 *
 * @private
 */
export const _close = setIsOpen => {
  setIsOpen(false);
  const footerBtn = document.querySelector(
    `.${prefix}--locale-btn__container .${prefix}--btn--secondary`
  );
  setTimeout(() => {
    footerBtn?.focus();
  }, 100);
};

export default LocaleModal;
