/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ClickableTile, Tile } from 'carbon-components-react';
import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import classNames from 'classnames';
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
  type,
  ...props
}) => {
  return type === 'link' ? (
    <ClickableTile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(`${prefix}--card`, className)}
      href={href}
      {...props}>
      <Image {...image} classname={`${prefix}--card__img`} />
      <div className={`${prefix}--card__wrapper`}>
        <h3 className={`${prefix}--card__title`}>{title}</h3>
        {optionalContent(content)}
        {renderFooter(Icon)}
      </div>
    </ClickableTile>
  ) : (
    <Tile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(`${prefix}--card`, className)}>
      <Image {...image} />
      <div className={`${prefix}--card__wrapper`}>
        <h3 className={`${prefix}--card__title`}>{title}</h3>
        {optionalContent(content)}
        {renderFooter(Icon)}
      </div>
    </Tile>
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
      className={`${prefix}--card__content`}
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
    <footer className={`${prefix}--card__footer`}>
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
  type: PropTypes.string,
};

export default CardLink;
