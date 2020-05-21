/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentArrayGroup Component, for use with content arrays
 *
 * @param {object} props props object
 * @param {*} props.children JSX Components
 * @param {string} props.heading  Heading string
 * @param {string} props.className optional class to be applied to the containing node
 * @param {*} props.cta CTA component props object
 * @returns {*} JSX ContentGroup component
 */
const ContentGroup = ({ children, heading, customClassName, cta }) => {
  const className = classNames(`${prefix}--content-group`, customClassName);

  return (
    <div className={className} data-autoid={`${stablePrefix}--content-group`}>
      <h3
        data-autoid={`${stablePrefix}--content-group__title`}
        className={`${prefix}--content-group__title`}>
        {heading}
      </h3>
      <div
        data-autoid={`${stablePrefix}--content-group__children`}
        className={classNames(
          `${prefix}--content-group__col`,
          `${prefix}--content-group__children`
        )}>
        {children}
      </div>
      {cta && (
        <div
          data-autoid={`${stablePrefix}--content-group__cta`}
          className={`${prefix}--content-group__cta-row`}>
          <CTA
            customClassName={`${prefix}--content-group__cta`}
            style="card"
            {...cta}
          />
        </div>
      )}
    </div>
  );
};

ContentGroup.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  customClassName: PropTypes.string,
  cta: PropTypes.object,
};

export default ContentGroup;
