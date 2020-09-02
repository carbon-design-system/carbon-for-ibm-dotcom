/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  ClickableTile,
  Tile,
} from '../../internal/vendor/carbon-components-react/components/Tile/Tile';
import React, { useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import CTALogic from '../CTA/CTALogic';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { Image } from '../Image';
import markdownToHtml from '@carbon/ibmdotcom-utilities/es/utilities/markdownToHtml/markdownToHtml';
import on from 'carbon-components/es/globals/js/misc/on';
import PropTypes from 'prop-types';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card Link Component.
 */
export const Card = ({
  inverse,
  image,
  eyebrow,
  heading,
  customClassName,
  copy,
  cta,
  pictogram,
  onClick,
  ...props
}) => {
  const refWrapper = useRef(null);
  const TileType = props.disabled ? Tile : ClickableTile;

  const handleClick = useCallback(
    e => {
      if (!onClick || onClick(e) !== false) {
        cta?.type === 'jump' ? CTALogic.jump(e, cta.type) : false;
      }
    },
    [cta, onClick]
  );

  useEffect(() => {
    let hClick;
    const { current: wrapperNode } = refWrapper;
    const tileNode = wrapperNode.closest('.bx--tile');
    if (tileNode) {
      // Manually attach an event listener given `onClick()` of Carbon `<Tile>` runs after `<Tile>` changes its state
      hClick = on(tileNode, 'click', handleClick);
    }
    return () => {
      if (hClick) {
        hClick = hClick.release();
      }
    };
  }, [handleClick]);

  return (
    <TileType
      data-autoid={`${stablePrefix}--card`}
      className={classNames(
        `${prefix}--card`,
        {
          [`${prefix}--card--inverse`]: inverse,
          [`${prefix}--card__CTA--disabled`]: props.disabled,
        },
        customClassName
      )}
      href={cta?.href}
      target={CTALogic.external(cta?.type)}
      {...props}>
      {image && <Image {...image} classname={`${prefix}--card__img`} />}
      <div className={`${prefix}--card__wrapper`} ref={refWrapper}>
        {eyebrow && <p className={`${prefix}--card__eyebrow`}>{eyebrow}</p>}
        {heading && <h3 className={`${prefix}--card__heading`}>{heading}</h3>}
        {optionalContent(copy)}
        {renderFooter(cta, pictogram)}
      </div>
    </TileType>
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
 * @returns {object} JSX object
 */
function renderFooter(cta, pictogram) {
  return (
    cta && (
      <div
        className={classNames(`${prefix}--card__footer`, {
          [`${prefix}--card__footer__icon-left`]: cta?.iconPlacement === 'left',
          [`${prefix}--card__footer__copy`]: cta?.copy,
        })}>
        {cta?.copy && !pictogram && (
          <span className={`${prefix}--card__cta__copy`}>{cta?.copy}</span>
        )}
        {cta?.icon?.src && !pictogram && (
          <cta.icon.src className={`${prefix}--card__cta`} {...cta?.icon} />
        )}
        {pictogram && pictogram}
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
   * Eyebrow text to be passed as a property to the Card component.
   * Style for Card component has been set to "text".
   */
  eyebrow: PropTypes.string,

  /**
   * Paragraph of text that further describing the resource with added detail.
   */
  copy: PropTypes.string,

  /**
   * Disable card link
   */
  disabled: PropTypes.bool,

  /**
   * Pictogram located at the bottom left side of the Card. This prop disables the CTA.copy and CTA.icon (experimental)
   */
  pictogram: PropTypes.node,

  /**
   * CTA options. Has the following structure in summary:
   *
   * | Name            | Data Type | Description                                                                                                                      |
   * | --------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
   * | `href`          | String    | Valid URL for a the location of an internal or external resource                                                                 |
   * | `icon`          | String    | Provide an optional icon to the footer from [Carbon's icon library](https://www.carbondesignsystem.com/guidelines/icons/library) |
   * | `iconPlacement` | String    | Option to place icon left or right of cta text                                                                                   |
   * | `copy`          | String    | Optional text for CTA                                                                                                            |
   * | `type`          | String    | type of CTA (local or external) when Card type is static                                                                         |
   *
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    copy: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(['jump', 'local', 'external', 'download']),
    icon: PropTypes.shape({
      src: PropTypes.elementType,
    }),
    iconPlacement: PropTypes.oneOf(['left', 'right']),
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
   * A handler for `click` event on the card.
   */
  onClick: PropTypes.func,
};

Card.propTypes = cardPropTypes;
