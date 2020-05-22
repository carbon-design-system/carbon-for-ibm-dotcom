/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ContentBlock from '../../sub-patterns/ContentBlock/ContentBlock';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Logo Grid
 *
 * @param {object} props Props object
 * @param {string} props.heading Heading for the Logo Grid Pattern
 * @param {Array} props.logosGroup Array of object with label, imgSrc and altText properties
 * @param {object} props.cta CTA object
 * @param {boolean} props.hideBorder Set to true to hide the grid bottom border
 * @returns {*} Logo Grid Pattern JSX object
 */
const LogoGrid = props => {
  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */

  return (
    <section
      data-autoid={`${stablePrefix}--logo-grid ${prefix}--logo-grid`}
      className={classNames(`${prefix}--logo-grid`, {
        [`${prefix}--logo-grid__no-border`]: props.hideBorder,
      })}>
      <div className={`${prefix}--logo-grid__container`}>
        <div
          className={`${prefix}--logo-grid__wrapper ${prefix}--grid ${prefix}--grid--full-width`}>
          <ContentBlock heading={props.heading} cta={props.cta}>
            <div className={`${prefix}--logo-grid__row`}>
              {props.logosGroup.map((placeholder, index) => (
                <div className={`${prefix}--logo-grid__col`} key={index}>
                  <a
                    href={placeholder.href}
                    className={`${prefix}--logo-grid__link`}>
                    <div
                      className={`${prefix}--logo-grid__logo`}
                      key={placeholder.label}>
                      <Image
                        defaultSrc={placeholder.imgSrc}
                        classname={`${prefix}--logo-grid_img`}
                        alt={placeholder.altText}
                      />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </ContentBlock>
        </div>
      </div>
    </section>
  );
};

LogoGrid.propTypes = {
  heading: PropTypes.string,
  logosGroup: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  cta: PropTypes.object,
  hideBorder: PropTypes.bool,
};

export default LogoGrid;
