/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {string} props.heading  Heading objects
 * @param {string} props.theme theme name
 * @param {*} props.children JSX Components
 * @param {string} props.className optional class to be applied to the containing node
 * @returns {*} JSX ContentSection component
 */
const ContentSection = ({ heading, theme, children, customClassName }) => {
  const className = classNames(`${prefix}--content-section`, customClassName);
  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--content-section--${theme}`;
  };

  return (
    <section
      className={classNames(className, _setTheme(theme))}
      data-autoid={`${stablePrefix}--content-section`}>
      <div className={`${prefix}--content-section__heading__col`}>
        <h2 className={`${prefix}--content-section__heading`}>{heading}</h2>
      </div>
      <div className={`${prefix}--content-section__children__col`}>
        <div className={`${prefix}--content-section__children`}>{children}</div>
      </div>
      {/* <div className={`${prefix}--content-section__children`}>{children}</div> */}
    </section>
  );
};

ContentSection.propTypes = {
  heading: PropTypes.string.isRequired,
  theme: PropTypes.string,
  children: PropTypes.element,
  customClassName: PropTypes.string,
};

export default ContentSection;
