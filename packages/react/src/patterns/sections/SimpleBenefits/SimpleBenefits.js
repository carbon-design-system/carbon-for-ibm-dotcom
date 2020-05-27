/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import classNames from 'classnames';
import { DDS_SIMPLEBENEFITS } from '../../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import settings from 'carbon-components/es/globals/js/settings';
import SimpleBenefitsItem from './SimpleBenefitsItem';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Simple benefits pattern.
 */
const SimpleBenefits = ({ content, theme, title }) => {
  useEffect(() => {
    /**
     * Function to be added to eventListener and cleaned later on
     */
    const resizeFunction = () => {
      setSameHeight(`.${prefix}--simplebenefits__content-item__title`);
    };

    resizeFunction();
    root.addEventListener('resize', resizeFunction);

    return () => root.removeEventListener('resize', resizeFunction);
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

  const simpleBenefits = classNames({
    [`${prefix}--simplebenefits`]: true,
    [`${prefix}--simplebenefits--multirow`]: content.length > 3,
  });

  return featureFlag(
    DDS_SIMPLEBENEFITS,
    <section
      data-autoid={`${stablePrefix}--simplebenefits`}
      className={`${simpleBenefits} ${_setTheme(theme)}`}>
      <div className={`${prefix}--simplebenefits__container`}>
        <div className={`${prefix}--simplebenefits__row`}>
          <h2 className={`${prefix}--simplebenefits__title`}>
            <div className={`${prefix}--simplebenefits__title-container`}>
              {title}
            </div>
          </h2>
          <div
            data-autoid={`${stablePrefix}--simplebenefits__content`}
            className={`${prefix}--simplebenefits__content`}>
            {_renderArray(content)}
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
 * @param {Array} content content object array
 * @returns {object} JSX Object
 */
const _renderArray = content =>
  content.map((contentItem, contentItemIndex) => (
    <SimpleBenefitsItem
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
  return theme && `${prefix}--simplebenefits--${theme}`;
};

SimpleBenefits.propTypes = {
  /**
   * Array of content group objects. Has the following structure for each items:
   *
   * | Name    | Data Type | Description                                                  |
   * | ------- | --------- | ------------------------------------------------------------ |
   * | `title` | String    | Title of the Content Card item.                              |
   * | `copy`  | String    | Copy of the Content Card item.                               |
   * | `link`  | Object    | Object containing target and href of link. See `link` below. |
   *
   * `link`:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `href`   | String    | Url of link.                                               |
   * | `text`   | String    | Link text.                                                 |
   * | `target` | String    | Open within current tab or new tab ('\_self' or '\_blank') |
   */
  content: PropTypes.arrayOf(
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

  /**
   * Main title of the pattern.
   */
  title: PropTypes.string.isRequired,
};

export default SimpleBenefits;
