/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../../sub-patterns/Card';
import classNames from 'classnames';
import { ContentSection } from '../../sub-patterns/ContentSection';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { sameHeight } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;
/**
 * Card section Component
 *
 * @param {object} props props object
 * @param {string} props.heading cards group heading
 * @param {string} props.theme theme name
 * @param {object} props.cta cta object
 * @param {Array} props.cards Array of card
 * @returns {object} JSX Object
 */
const CardSection = ({ heading, theme, cards, cta, ...otherProps }) => {
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
      if (containerRef && containerRef.current) {
        sameHeight(
          containerRef.current.getElementsByClassName(
            `${prefix}--card__heading`
          ),
          'md'
        );
        sameHeight(
          containerRef.current.getElementsByClassName(`${prefix}--card__copy`),
          'md'
        );
        sameHeight(
          containerRef.current.getElementsByClassName(
            `${prefix}--card__eyebrow`
          ),
          'md'
        );
        sameHeight(
          containerRef.current.getElementsByClassName(`${prefix}--card--link`),
          'md'
        );
      }
    });
  };

  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g10 | g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--card-section--${theme}`;
  };

  return (
    <ContentSection
      heading={heading}
      autoid={otherProps.autoid}
      customClassName={classNames(`${prefix}--card-section`, _setTheme(theme))}>
      {_renderCards(cards, containerRef, cta)}
    </ContentSection>
  );
};

/**
 * Renders the cards based on the CardSection entries
 *
 * @param {Array} cards objects array
 * @param {object} containerRef ref of elements
 * @param {object} cta object
 * @returns {*} CardSection JSX objects
 */
const _renderCards = (cards, containerRef, cta) => (
  <div
    data-autoid={`${stablePrefix}--card-section`}
    className={`${prefix}--card-section__cards__row ${prefix}--row--condensed`}
    ref={containerRef}>
    {cards.map((card, index) => {
      return (
        <div
          key={index}
          className={`${prefix}--card-section__cards__col`}
          role="region"
          aria-label={card.heading}>
          <Card
            key={index}
            customClassName={`${prefix}--card-section__card`}
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
      <div className={`${prefix}--card-section__cards__col`}>
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

CardSection.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)),
  cta: PropTypes.oneOfType(PropTypes.shape(Card.propTypes)),
};

export default CardSection;
