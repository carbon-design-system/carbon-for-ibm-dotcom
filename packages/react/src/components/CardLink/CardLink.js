/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CARD_LINK } from '../../internal/FeatureFlags.js';
import { featureFlag } from '@carbon/ibmdotcom-utilities';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import { ClickableTile } from 'carbon-components-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

console.log('testing 1,2,3');

/**
 * Card Link Component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const CardLink = ({ title, href, content, icon, className, ...props }) => {
  if (!title || !href) {
    return null;
  }

  console.log('testing');

  return featureFlag(
    CARD_LINK,
    <ClickableTile
      data-autoid={`${stablePrefix}--card-link`}
      className={classNames(`${prefix}--card-link`, className)}
      href={href}
      {...props}>
      <h3 className={`${prefix}--card-link__title`}>{title}</h3>
      {optionalContent(content)}
      {renderFooter(icon)}
    </ClickableTile>
  );
};

/**
 * Card Link optional content
 *
 * @param {string} content paragraph of text
 * @returns {object} JSX object
 */
function optionalContent(content) {
  if (!content) {
    return null;
  }

  return <p className={`${prefix}--card-link__content`}>{content}</p>;
}

/**
 * Render footer with icon
 *
 * @param {object} icon passes in react icon
 * @returns {object} JSX object
 */
function renderFooter(icon) {
  if (!icon) {
    return null;
  }

  return <footer className={`${prefix}--card-link__footer`}>{icon}</footer>;
}

CardLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.element,
  content: PropTypes.string,
  className: PropTypes.string,
};

export default CardLink;
