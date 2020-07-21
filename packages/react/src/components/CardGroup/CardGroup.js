/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20';
import { Card } from '../Card';
import { CTA } from '../CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import sameHeight from '@carbon/ibmdotcom-utilities/es/utilities/sameHeight/sameHeight';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * CardGroup component
 */
const CardGroup = ({ cards, cta }) => {
  const containerRef = useRef();
  useEffect(() => {
    setCardHeight();
    root.addEventListener('resize', setCardHeight);
    return () => root.removeEventListener('resize', setCardHeight);
  }, []);

  /**
   * Set the cards to have the same height as the bigger one
   */
  const setCardHeight = () => {
    root.requestAnimationFrame(() => {
      const { current: containerNode } = containerRef;
      if (containerNode) {
        sameHeight(
          containerNode.getElementsByClassName(
            `:not(.${prefix}--card__video) ${prefix}--card__heading`
          ),
          'md'
        );
        sameHeight(
          containerNode.getElementsByClassName(
            `:not(.${prefix}--card__video) ${prefix}--card__copy`
          ),
          'md'
        );
        sameHeight(
          containerNode.getElementsByClassName(`${prefix}--card__eyebrow`),
          'md'
        );
        sameHeight(
          containerNode.getElementsByClassName(`${prefix}--card--link`),
          'md'
        );
      }
    });
  };

  return _renderCards(cards, containerRef, cta);
};

/**
 * Renders the cards based on the CardGroup entries.
 *
 * @param {Array} cards objects array
 * @param {object} containerRef ref of elements
 * @param {object} cta object
 * @returns {*} CardGroup JSX objects
 */
const _renderCards = (cards, containerRef, cta) => (
  <div
    data-autoid={`${stablePrefix}--card-group`}
    className={`${prefix}--card-group__cards__row ${prefix}--row--condensed`}
    ref={containerRef}>
    {cards.map((card, index) => {
      return (
        <div
          key={index}
          className={`${prefix}--card-group__cards__col`}
          role="region"
          aria-label={card.heading}>
          <CTA
            style="card"
            key={index}
            customClassName={`${prefix}--card-group__card`}
            image={card.image}
            media={card.media}
            heading={card.heading}
            eyebrow={card.eyebrow}
            copy={card.copy}
            cta={{
              ...card.cta,
              icon: {
                src: ArrowRight20,
              },
            }}
            type={card.media ? 'video' : 'link'}
          />
        </div>
      );
    })}
    {cta && (
      <div className={`${prefix}--card-group__cards__col`}>
        <Card
          inverse={true}
          heading={cta.heading}
          cta={{
            href: cta.cta.href,
            icon: {
              src: ArrowRight20,
            },
          }}
        />
      </div>
    )}
  </div>
);

CardGroup.propTypes = {
  /**
   * Array of card objects.
   * Uses a sub-scheme of `<Card>`'s props for each items.
   *
   * Simple:
   *
   * | Name       | Required | Data Type | Description                            |
   * | ---------- | -------- | --------- | -------------------------------------- |
   * | `copy`     | YES      | String    | Copy of the card.                      |
   * | `heading`  | YES      | String    | Heading of the card.                   |
   * | `cta.href` | YES      | String    | URI for internal or external resource. |
   *
   * Image:
   *
   * | Name       | Required | Data Type | Description                              |
   * | ---------- | -------- | --------- | ---------------------------------------- |
   * | `image`    | YES      | Object    | Contains source and alt text properties. |
   * | `eyebrow`  | YES      | String    | Eyebrow of the card.                     |
   * | `heading`  | YES      | String    | Heading of the card.                     |
   * | `cta.href` | YES      | String    | URI for internal or external resource.   |
   *
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--static#props) for full usage details.
   */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      eyebrow: PropTypes.string,
      copy: PropTypes.string,
      image: PropTypes.shape({
        classname: PropTypes.string,
        sources: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            breakpoint: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]),
          })
        ),
        media: PropTypes.arrayOf(
          PropTypes.shape({
            src: PropTypes.string,
            type: PropTypes.string,
          })
        ),
        defaultSrc: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        longDescription: PropTypes.string,
      }),
      cta: PropTypes.shape({
        href: PropTypes.string,
      }),
    })
  ).isRequired,

  /**
   * Optional CTA card for group. Always displays as last item.
   * Uses a sub-scheme of `<Card>`'s props.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--static#props) for full usage details.
   */
  cta: PropTypes.shape({
    heading: PropTypes.string,
    cta: PropTypes.shape({
      href: PropTypes.string,
    }),
  }),
};

export default CardGroup;
