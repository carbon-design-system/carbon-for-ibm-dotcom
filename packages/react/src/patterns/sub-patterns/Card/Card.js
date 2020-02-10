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
import { CTA } from '../../../components/CTA';
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
const Card = ({ title, copy, cta, image, className, type, ...props }) => {
  const CardTile = type === 'link' ? ClickableTile : Tile;
  return (
    <CardTile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(`${prefix}--card`, className)}
      href={cta.href}
      {...props}>
      <Image {...image} classname={`${prefix}--card__img`} />
      <div className={`${prefix}--card__wrapper`}>
        <h3 className={`${prefix}--card__title`}>{title}</h3>
        {optionalContent(copy)}
        {renderFooter(cta, type)}
      </div>
    </CardTile>
  );
};

/**
 * Card Link optional content
 *
 * @param {string} copy paragraph of text
 * @returns {object} JSX object
 */
function optionalContent(copy) {
  return !copy ? null : (
    <div
      className={`${prefix}--card__content`}
      dangerouslySetInnerHTML={{
        __html: markdownToHtml(copy, { bold: false }),
      }}></div>
  );
}

/**
 * Render footer with icon
 *
 * @param {object} cta cta object
 * @param {string} type type of card (clickable/static)
 * @returns {object} JSX object
 */
function renderFooter(cta, type) {
  if (type !== 'link') {
    return <CTA style="text" type={cta.type} href={cta.href} copy={cta.copy} />;
  } else {
    const Icon = cta.icon;
    return !Icon ? null : (
      <footer className={`${prefix}--card__footer`}>
        <Icon />
      </footer>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object,
  copy: PropTypes.string,
  cta: PropTypes.shape({
    href: PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.element,
    copy: PropTypes.string,
  }),
  image: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Card;
