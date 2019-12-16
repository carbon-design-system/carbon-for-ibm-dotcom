/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { CardLink } from '../CardLink';
import { ArrowRight20, Error20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * LocaleModalRegions component
 *
 * @param {object} props props object
 * @param {object} props.regionList object of regions
 * @param {string} props.setCurrentRegion state for region name
 * @param {boolean} props.setIsFiltering true when search filter is visible
 * @param {Function} props.setClearResults set flag to determine whether to reset the filtered results
 * @returns {*} LocaleModalRegions component
 */
const LocaleModalRegions = ({
  regionList,
  setCurrentRegion,
  setIsFiltering,
  setClearResults,
}) => {
  useEffect(() => {
    const regionLink = document.querySelectorAll(`.${prefix}--card-link`);
    const localeItems = document.querySelectorAll(
      `.${prefix}--locale-modal__locales`
    );

    [...regionLink].forEach(link => {
      link.addEventListener('click', () => {
        const region = link.dataset.region;
        setCurrentRegion(link.getElementsByTagName('h3')[0].innerHTML);

        [...localeItems].forEach(item => {
          if (item.dataset.region !== region) {
            item.classList.add(`${prefix}--locale-modal__locales-filtered`);
          } else {
            item.classList.remove(`${prefix}--locale-modal__locales-filtered`);
          }
        });
        setIsFiltering(true);

        /**
         * go back to region selection
         *
         */
        const localeBackBtn = document.querySelectorAll(
          `.${prefix}--locale-modal__back .${prefix}--modal-header__label,
          .${prefix}--locale-modal__back .${prefix}--modal-close`
        );

        [...localeBackBtn].forEach(btn => {
          btn.addEventListener('click', () => {
            setIsFiltering(false);
            setClearResults(true);
            document.getElementById(`${prefix}--locale-modal__filter`).value =
              '';
          });
        });
      });
    });
  });

  return (
    <div
      className={`${prefix}--grid ${prefix}--no-gutter ${prefix}--locale-modal__regions`}>
      <div className={`${prefix}--row`}>
        {regionList &&
          regionList.map(region => {
            const hasCountries = region.countries.length !== 0;

            return (
              <div
                key={`${region.name}`}
                className={`${prefix}--col-sm-4 ${prefix}--col-md-8 ${prefix}--col-lg-8 ${prefix}--col-xlg-8 ${prefix}--no-gutter`}>
                <CardLink
                  data-autoid={`${stablePrefix}--locale-modal__geo-btn-${region.key}`}
                  data-region={region.key}
                  key={region.key}
                  title={region.name}
                  href={hasCountries ? 'javascript:void(0);' : null}
                  icon={hasCountries ? <ArrowRight20 /> : <Error20 />}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

/**
 * @property propTypes
 * @description Defined property types for component
 * @type {{}}
 */
LocaleModalRegions.propTypes = {
  regionList: PropTypes.array,
  setCurrentRegion: PropTypes.string,
  setIsFiltering: PropTypes.func,
  setClearResults: PropTypes.func,
};

export default LocaleModalRegions;
