/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames';
import ContentBlock from '../../sub-patterns/ContentBlock/ContentBlock';
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Logo Grid component.
 */
const LogoGrid = ({ heading, logosGroup, cta, hideBorder }) => {
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
        [`${prefix}--logo-grid__no-border`]: hideBorder,
      })}>
      <div className={`${prefix}--logo-grid__container`}>
        <div
          className={`${prefix}--logo-grid__wrapper ${prefix}--grid ${prefix}--grid--full-width`}>
          <ContentBlock heading={heading} cta={cta}>
            <div className={`${prefix}--logo-grid__row`}>
              {logosGroup.map((placeholder, index) => (
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
                        longDescription={placeholder.label}
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
  /**
   * Heading text.
   */
  heading: PropTypes.string,
  /**
   * An array of logo objects to be rendered as Image components surrounded by hypertext links:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `label`  | String    | Visible to screen readers, hidden from users.              |
   * | `imgSrc` | String    | Image source for logo placeholder.                         |
   * | `altText`| String    | Alternate text for logo placeholder.                       |
   * | `href`   | String    | Url of that the logo will link to.                         |
   */
  logosGroup: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  /**
   * CTA object.
   * See [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterns-card--static#cta-required) for full usage details.
   */
  cta: PropTypes.shape(CTA.propTypes),
  /**
   * Set to true to hide the default bottom border.
   */
  hideBorder: PropTypes.bool,
};

export default LogoGrid;
