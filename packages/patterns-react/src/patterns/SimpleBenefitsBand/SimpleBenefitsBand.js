/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DDS_SIMPLEBENEFITSBAND } from '../../internal/FeatureFlags';
import SimpleBenefitsBandItem from './SimpleBenefitsBandItem';
import root from 'window-or-global';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple benefits band pattern
 *
 * @param {object} props props object
 * @param {string} props.title Section title
 * @param {Array} props.contentGroup Array of objects containing the cards data
 * @returns {*} Simple benefits band item
 */
const SimpleBenefitsBand = ({ contentGroup, theme, title }) => {
  useEffect(() => {
    const selector = `.${prefix}--simplebenefitsband__cards-item__title`;
    setSameHeight(selector);
    root.addEventListener('resize', () => setSameHeight(selector));
  });

  /**
   * Set same height to elements
   *
   * @param {string} selector css selector of target elements
   */
  const setSameHeight = selector => {
    const elements = document.querySelectorAll(selector);
    let biggest = 0;
    elements.forEach(element => {
      element.style.height = `auto`;
    });
    elements.forEach(element => {
      if (element.offsetHeight > biggest) {
        biggest = element.offsetHeight;
      }
    });
    elements.forEach(element => {
      element.style.height = `${biggest}px`;
    });
  };

  return featureFlag(
    DDS_SIMPLEBENEFITSBAND,
    <section
      data-autoid={`${stablePrefix}--simplebenefitsband`}
      className={classNames(`${prefix}--simplebenefitsband`, _setTheme(theme))}>
      <div className={`${prefix}--simplebenefitsband__container`}>
        <div className={`${prefix}--simplebenefitsband__row`}>
          <h2 className={`${prefix}--simplebenefitsband__title`}>
            <div className={`${prefix}--simplebenefitsband__title-container`}>
              {title}
            </div>
          </h2>
          <div
            data-autoid={`${stablePrefix}--simplebenefitsband__cards`}
            className={`${prefix}--simplebenefitsband__cards`}>
            {_renderArray(contentGroup)}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Render the content in array list
 *
 * @private
 * @param {Array} contentArray contentGroup object array
 * @returns {object} JSX Object
 */
const _renderArray = contentArray =>
  contentArray.map((contentItem, contentItemIndex) => (
    <SimpleBenefitsBandItem
      key={contentItemIndex}
      title={contentItem.title}
      copy={contentItem.copy}
      link={contentItem.link}
    />
  ));

/**
 * sets the class name based on theme type
 *
 * @private
 * @param {string} theme theme type
 * @returns {string} theme css class names
 */
const _setTheme = theme => {
  return theme && `${prefix}--simplebenefitsband--${theme}`;
};

SimpleBenefitsBand.propTypes = {
  contentGroup: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      copy: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
  title: PropTypes.string.isRequired,
};

export default SimpleBenefitsBand;
