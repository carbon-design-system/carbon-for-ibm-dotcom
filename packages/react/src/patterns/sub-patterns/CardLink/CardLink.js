/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import classNames from 'classnames';
import { ClickableTile } from 'carbon-components-react';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Link Component
 *
 * @param {object} props react proptypes
 * @returns {object} JSX object
 */
const CardLink = ({
  title,
  href,
  content,
  icon: Icon,
  image,
  className,
  ...props
}) => {
  if (!title || !href) {
    return null;
  }

  return (
    <ClickableTile
      data-autoid={`${stablePrefix}--card-link`}
      className={classNames(`${prefix}--card-link`, className)}
      href={href}
      {...props}>
      <Image {...image} classname={`${prefix}--card-link__img`} />
      <div className={`${prefix}--card-link__wrapper`}>
        <h3 className={`${prefix}--card-link__title`}>{title}</h3>
        {optionalContent(content)}
        {renderFooter(Icon)}
      </div>
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
  return !content ? null : (
    <div
      className={`${prefix}--card-link__content`}
      dangerouslySetInnerHTML={{
        __html: markdownToHtml(content, { bold: false }),
      }}></div>
  );
}

/**
 * Render footer with icon
 *
 * @param {object} Icon passes in react icon
 * @returns {object} JSX object
 */
function renderFooter(Icon) {
  return !Icon ? null : (
    <footer className={`${prefix}--card-link__footer`}>
      <Icon />
    </footer>
  );
}

CardLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.object,
  content: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
};

export default CardLink;
