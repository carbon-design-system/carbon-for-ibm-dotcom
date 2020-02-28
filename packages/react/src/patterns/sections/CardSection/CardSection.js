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
 * @param {Array} props.cards Array of card
 * @returns {object} JSX Object
 */
const CardSection = ({ heading, cards, theme }) => {
  const containerRef = useRef();
  useEffect(() => {
    setCardHeight();
    root.addEventListener('resize', () => {
      root.requestAnimationFrame(() => {
        setCardHeight();
      });
    });
  }, []);

  /**
   * Set the cards to have the same height as the bigger one
   */
  const setCardHeight = () => {
    sameHeight(
      containerRef.current.getElementsByClassName(`${prefix}--card__heading`),
      'md'
    );
    sameHeight(
      containerRef.current.getElementsByClassName(`${prefix}--card__eyebrow`),
      'md'
    );
    sameHeight(
      containerRef.current.getElementsByClassName(`${prefix}--card__copy`),
      'md'
    );
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
      customClassName={classNames(`${prefix}--card-section`, _setTheme(theme))}>
      {_renderCards(cards, containerRef)}
    </ContentSection>
  );
};

/**
 * Renders the cards based on the CardSection entries
 *
 * @param {Array} cards objects array
 * @param {object} containerRef ref of elements
 * @returns {*} CardSection JSX objects
 */
const _renderCards = (cards, containerRef) => (
  <div
    data-autoid={`${stablePrefix}--card-section`}
    className={`${prefix}--card-section__cards__row ${prefix}--row--condensed`}
    ref={containerRef}>
    {cards.map((card, index) => {
      return (
        <div className={`${prefix}--card-section__cards__col`}>
          <Card
            key={index}
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
            target={card.cta.target}
            type="link"
          />
        </div>
      );
    })}
  </div>
);

CardSection.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(Card),
};

export default CardSection;
