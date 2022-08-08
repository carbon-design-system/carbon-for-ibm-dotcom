/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ContentBlock from '../ContentBlock/ContentBlock';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { HorizontalRule } from '../HorizontalRule';
import { Image } from '../Image';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Logo Grid component.
 */
const LogoGrid = ({ heading, logosGroup, ctaCopy, ctaHref, hideBorder }) => {
  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */

  let cta = null;

  if (ctaHref) {
    cta = {
      style: 'card',
      type: 'local',
      heading: ctaCopy,
      cta: {
        href: ctaHref,
      },
    };
  }

  return (
    <section
      data-autoid={`${stablePrefix}--logo-grid`}
      className={`${prefix}--logo-grid`}>
      <div className={`${prefix}--logo-grid__container`}>
        <div className={`${prefix}--logo-grid__wrapper`}>
          <ContentBlock heading={heading} cta={cta}>
            <div className={`${prefix}--logo-grid__row`}>
              {logosGroup.map((placeholder, index) => (
                <div className={`${prefix}--logo-grid__col`} key={index}>
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
                </div>
              ))}
            </div>
          </ContentBlock>
        </div>
      </div>
      {!hideBorder && <HorizontalRule />}
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
   */
  logosGroup: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
    })
  ).isRequired,
  /**
   * Optional copy for the CTA
   */
  ctaCopy: PropTypes.string,
  /**
   * Link address for the CTA. If omitted, CTA doesn't render.
   */
  ctaHref: PropTypes.string,
  /**
   * Set to true to hide the default bottom border.
   */
  hideBorder: PropTypes.bool,
};

export default LogoGrid;
