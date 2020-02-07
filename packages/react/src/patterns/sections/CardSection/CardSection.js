import { featureFlag, sameHeight } from '@carbon/ibmdotcom-utilities';
import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../../sub-patterns/Card';
import classNames from 'classnames';
import { DDS_CARD_SECTION } from '../../../internal/FeatureFlags';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Card section Component
 *
 * @param {object} props props object
 * @param {string} props.title cards group title
 * @param {string} props.theme theme name
 * @param {Array} props.cards Array of object with title, href and target properties
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
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */
  const setTheme = theme => {
    return theme && `${prefix}--card-section--${theme}`;
  };

  return featureFlag(
    DDS_CARD_SECTION,
    <section
      data-autoid={`${stablePrefix}--card-section`}
      className={classNames(`${prefix}--card-section`, setTheme(theme))}>
      <div className={`${prefix}--card-section__container`}>
        <div className={`${prefix}--card-section__row`}>
          <h2 className={`${prefix}--card-section__title`}>{heading}</h2>
          <div className={`${prefix}--card-section__cards`} ref={containerRef}>
            <div
              className={`${prefix}--card-section__cards__row ${prefix}--row--condensed`}>
              {cards.map((card, index) => {
                return (
                  <div className={`${prefix}--card-section__cards__col`}>
                    <Card
                      key={index}
                      image={card.image}
                      title={card.title}
                      content={card.copy}
                      href={card.link.href}
                      target={card.link.target}
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
  heading: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      title: PropTypes.string,
      copy: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
};

export default CardSection;
