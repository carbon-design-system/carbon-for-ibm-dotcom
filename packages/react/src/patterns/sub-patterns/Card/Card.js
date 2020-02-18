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
const Card = ({
  title,
  eyebrow,
  copy,
  href,
  cta,
  image,
  inverse,
  className,
  type,
  icon: Icon,
  ...props
}) => {
  const CardTile = type === 'link' ? ClickableTile : Tile;
  return (
    <CardTile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(
        `${prefix}--card`,
        { [`${prefix}--card--inverse`]: inverse },
        className
      )}
      href={href}
      {...props}>
      <Image {...image} classname={`${prefix}--card__img`} />
      <div className={`${prefix}--card__wrapper`}>
        {eyebrow && <p className={`${prefix}--card__eyebrow`}>{eyebrow}</p>}
        {title && <h3 className={`${prefix}--card__title`}>{title}</h3>}
        {optionalContent(copy)}
        {renderFooter(cta, type, href, Icon)}
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
 * @param {string} href url for card
 * @param {object} Icon cta icon for card
 * @returns {object} JSX object
 */
function renderFooter(cta, type, href, Icon) {
  return (
    <footer className={`${prefix}--card__footer`}>
      {type !== 'link' ? (
        <CTA
          style="text"
          type={cta.type}
          href={href}
          copy={cta.copy}
          customClassname={`${prefix}--card__cta`}
        />
      ) : (
        Icon && <Icon className={`${prefix}--card__cta`} />
      )}
    </footer>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  eyebrow: PropTypes.string,
  icon: PropTypes.object,
  copy: PropTypes.string,
  href: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    type: PropTypes.string,
    copy: PropTypes.string,
  }),
  image: PropTypes.object,
  inverse: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Card;
