import React, { useLayoutEffect } from 'react';
import root from 'window-or-global';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { featureFlag, matchHeight } from '@carbon/ibmdotcom-utilities';
import { DDS_CARD_SECTION } from '../../internal/FeatureFlags';
import { CardLink } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';

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
  useLayoutEffect(() => {
    root.addEventListener(
      'resize',
      matchHeight(`.${prefix}--cards-section__cards`)
    );
  });

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
            <div className={`${prefix}--card-section__cards`}>
              {cards.map(card => {
                return (
                  <CardLink
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

export default CardSection;
