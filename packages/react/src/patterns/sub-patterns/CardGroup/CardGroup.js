/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../../sub-patterns/Card';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { sameHeight } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * CardGroup sub-pattern
 *
 * @param {object} props props object
 * @param {object} props.cta cta object
 * @param {Array} props.cards Array of cards
 * @returns {object} JSX object
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
          containerNode.getElementsByClassName(`${prefix}--card__heading`),
          'md'
        );
        sameHeight(
          containerNode.getElementsByClassName(`${prefix}--card__copy`),
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
 * Renders the cards based on the CardGroup entries
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
          <Card
            key={index}
            customClassName={`${prefix}--card-group__card`}
            image={card.image}
            heading={card.heading}
            eyebrow={card.eyebrow}
            copy={card.copy}
            cta={{
              href: card.cta.href,
              icon: {
                src: ArrowRight20,
              },
            }}
            type="link"
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
          type="link"
        />
      </div>
    )}
  </div>
);

CardGroup.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
  cta: PropTypes.shape(Card.propTypes),
};

export default CardGroup;
