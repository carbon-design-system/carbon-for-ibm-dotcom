/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import { DDS_LOGO_GRID } from '../../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Logo Grid
 *
 * @param {object} props Props object
 * @param {string} props.title Title for the Logo Grid Pattern
 * @param {string} props.theme theme name
 * @param {Array} props.logosGroup Array of object with label, imgSrc and altText properties
 * @returns {*} Logo Grid Pattern JSX object
 */
const LogoGrid = ({ theme, title, logosGroup }) => {
  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */
  const setTheme = theme => {
    return theme && `${prefix}--logo-grid--${theme}`;
  };

  return featureFlag(
    DDS_LOGO_GRID,
    <section
      data-autoid={`${stablePrefix}--logo-grid`}
      className={classNames(`${prefix}--logo-grid`, setTheme(theme))}>
      <div className={`${prefix}--logo-grid__container`}>
        <div className={`${prefix}--logo-grid__row`}>
          <div className={`${prefix}--logo-grid__col`}>
            <h3 className={`${prefix}--logo-grid__title`}>{title}</h3>
          </div>
        </div>
        <div className={`${prefix}--logo-grid__row`}>
          <div className={`${prefix}--logo-grid__col`}>
            <div className={`${prefix}--logo-grid__wrapper`}>
              {logosGroup.map(placeholder => (
                <div
                  className={`${prefix}--logo-grid__logo`}
                  key={placeholder.label}>
                  <img src={placeholder.imgSrc} alt={placeholder.altText} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

LogoGrid.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string,
  logosGroup: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
    })
  ),
};

export default LogoGrid;
