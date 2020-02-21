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
      containerRef.current.getElementsByClassName(`${prefix}--card__title`),
      'md'
    );
    sameHeight(
      containerRef.current.getElementsByClassName(`${prefix}--card__content`),
      'md'
    );
  };

  /**
   * sets the class name based on theme type
   * @private
   * @param {string} theme theme type ( g10 | g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--card-section--${theme}`;
  };

  return (
    <section
      data-autoid={`${stablePrefix}--card-section`}
      className={classNames(`${prefix}--card-section`, _setTheme(theme))}>
      <div className={`${prefix}--card-section__container`}>
        <div className={`${prefix}--card-section__row`}>
          <h2 className={`${prefix}--card-section__heading`}>{heading}</h2>
          <div className={`${prefix}--card-section__cards`} ref={containerRef}>
            <div
              className={`${prefix}--card-section__cards__row ${prefix}--row--condensed`}>
              {cards.map((card, index) => {
                return (
                  <div className={`${prefix}--card-section__cards__col`}>
                    <Card
                      key={index}
                      image={card.image}
                      title={card.heading}
                      eyebrow={card.eyebrow}
                      copy={card.copy}
                      href={card.cta.href}
                      target={card.cta.target}
                      icon={ArrowRight20}
                      type="link"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CardSection.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(Card),
};

export default CardSection;
