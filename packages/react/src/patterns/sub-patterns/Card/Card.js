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
// import { CTA } from '../../../components/CTA';
import { Image } from '../../../components/Image';
import { LinkWithIcon } from '../../../components/LinkWithIcon';
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
export const Card = ({
  type,
  inverse,
  image,
  eyebrow,
  heading,
  customClassName,
  copy,
  cta,
  ...props
}) => {
  const CardTile = type === 'link' ? ClickableTile : Tile;
  return (
    <CardTile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(
        `${prefix}--card`,
        {
          [`${prefix}--card--inverse`]: inverse,
          [`${prefix}--card--link`]: type === 'link',
        },
        customClassName
      )}
      href={cta.href}
      {...props}>
      {image && <Image {...image} classname={`${prefix}--card__img`} />}
      <div className={`${prefix}--card__wrapper`}>
        {eyebrow && <p className={`${prefix}--card__eyebrow`}>{eyebrow}</p>}
        {heading && <h3 className={`${prefix}--card__heading`}>{heading}</h3>}
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
      className={`${prefix}--card__copy`}
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
  return (
    cta && (
      <div className={`${prefix}--card__footer`}>
        {type !== 'link' ? (
          <LinkWithIcon href={cta.href}>
            <span>{cta.copy}</span> <cta.icon.src />
          </LinkWithIcon>
        ) : (
          cta.icon.src && (
            <cta.icon.src className={`${prefix}--card__cta`} {...cta.icon} />
          )
        )}
      </div>
    )
  );
}

/**
 * Defining Card proptypes
 *
 * @type {object}
 */
export const cardPropTypes = {
  heading: PropTypes.string,
  eyebrow: PropTypes.string,
  copy: PropTypes.string,
  cta: PropTypes.object,
  image: PropTypes.object,
  inverse: PropTypes.bool,
  customClassName: PropTypes.string,
  type: PropTypes.string,
};

Card.propTypes = cardPropTypes;
