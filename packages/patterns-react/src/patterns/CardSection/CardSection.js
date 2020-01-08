import React, { useEffect, useRef } from 'react';
import { ArrowRight20 } from '@carbon/icons-react';
import { CardLink } from '@carbon/ibmdotcom-react';
import { DDS_CARD_SECTION } from '../../internal/FeatureFlags';
import { featureFlag, sameheight } from '@carbon/ibmdotcom-utilities';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
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
const CardSection = ({ title, cards, theme }) => {
  const containerRef = useRef();
  useEffect(() => {
    root.addEventListener('resize', setCardHeight());
  });

  /**
   * Set the cards to have the same height as the bigger one
   */
  const setCardHeight = () => {
    sameheight(
      containerRef.current.querySelectorAll(`.${prefix}--card-section__cards`),
      'md'
    );
    sameheight(
      containerRef.current.querySelectorAll(`.${prefix}--card-link__title`),
      'md'
    );
    sameheight(
      containerRef.current.querySelectorAll(`.${prefix}--card-link__content`),
      'md'
    );
    sameheight(
      containerRef.current.querySelectorAll(`.${prefix}--card-link__footer`),
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
          <div className={`${prefix}--card-section__col`}>
            <h2 className={`${prefix}--card-section__title`}>{title}</h2>
            <div
              className={`${prefix}--card-section__cards`}
              ref={containerRef}>
              {cards.map((card, index) => {
                return (
                  <CardLink
                    key={index}
                    imgSrc={card.imgSrc}
                    altText={card.altText}
                    title={card.title}
                    content={card.copy}
                    href={card.link.href}
                    target={card.link.target}
                    icon={<ArrowRight20 />}
                  />
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
  title: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
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
