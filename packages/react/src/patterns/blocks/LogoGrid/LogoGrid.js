/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../../sub-patterns/ContentBlock/ContentBlock';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
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
const LogoGrid = ({ title, logosGroup }) => {
  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */

  return (
    <section data-autoid={`${stablePrefix}--logo-grid ${prefix}--logo-grid`}>
      <ContentBlock heading={title}>
        <div className={`${prefix}--logo-grid__container`}>
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
      </ContentBlock>
    </section>
  );
};

LogoGrid.propTypes = {
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
