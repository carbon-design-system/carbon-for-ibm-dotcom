/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  settings as ddsSettings,
  markdownToHtml,
} from '@carbon/ibmdotcom-utilities';
import {
  Tile,
  ClickableTile,
} from '../../internal/vendor/carbon-components-react/components/Tile/Tile';
import classNames from 'classnames';
import CTALogic from '../CTA/CTALogic';
import { Image } from '../Image';
import { LinkWithIcon } from '../LinkWithIcon';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import TableOfContents from '../TableOfContents/TableOfContents';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Link Component.
 */
export const Card = ({
  type,
  theme,
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
  const _setTheme = theme => {
    return theme && `${prefix}--card--theme--${theme}`;
  };
  const linkProps =
    type === 'link'
      ? {
          target: CTALogic.external(cta.type),
          onClick: e => {
            cta.type === 'jump' ? CTALogic.jump(e, cta.type) : false;
          },
        }
      : {};
  return (
    <CardTile
      data-autoid={`${stablePrefix}--card`}
      className={classNames(
        `${prefix}--card`,
        {
          [`${prefix}--card--inverse`]: inverse,
          [`${prefix}--card--link`]: type === 'link',
        },
        _setTheme(theme),
        customClassName
      )}
      href={cta.href}
      {...linkProps}
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
          <LinkWithIcon
            href={cta.href}
            target={CTALogic.external(cta.type)}
            onClick={e => {
              cta.type === 'jump' ? CTALogic.jump(e, cta.type) : false;
            }}>
            <span>{cta.copy}</span> <cta.icon.src />
          </LinkWithIcon>
        ) : (
          cta.icon.src && (
            <>
              <cta.icon.src className={`${prefix}--card__cta`} {...cta.icon} />
              <span>{cta.copy}</span>
            </>
          )
        )}
      </div>
    )
  );
}

export const cardPropTypes = {
  /**
   * Concise yet descriptive string of text describing the linked resource.
   */
  heading: PropTypes.string,

  /**
   * Theme name.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Eyebrow text to be passed as a property to the Card component.
   * Style for Card component has been set to "text".
   */
  eyebrow: PropTypes.string,

  /**
   * Paragraph of text that further describing the resource with added detail.
   */
  copy: PropTypes.string,

  /**
   * CTA options. Has the following structure in summary:
   *
   * | Name   | Data Type | Description                                                                                                                      |
   * | ------ | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
   * | `href` | String    | Valid URL for a the location of an internal or external resource                                                                 |
   * | `icon` | String    | Provide an optional icon to the footer from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   * | `copy` | String    | Optional text for CTA                                                                                                            |
   * | `type` | String    | type of CTA (local or external) when Card type is static                                                                         |
   *
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    copy: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
  }),

  /**
   * Contains source and alt text properties.
   * See [`<Image>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-image--default#props) for full usage details.
   */
  image: PropTypes.shape({
    classname: PropTypes.string,
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
    defaultSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    longDescription: PropTypes.string,
  }),

  /**
   * `true` to sets the high contrast for Card.
   */
  inverse: PropTypes.bool,

  /**
   * Classname to be assigned to the Card component.
   */
  customClassName: PropTypes.string,

  /**
   * Determines whether card is clickable or static.
   */
  type: PropTypes.oneOf(['link']),
};

Card.defaultProps = {
  theme: 'white',
};

Card.propTypes = cardPropTypes;
