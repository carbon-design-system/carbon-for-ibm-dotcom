/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { featureFlag, matchHeight } from '@carbon/ibmdotcom-utilities';
import { DDS_CARD_SECTION } from '../../internal/FeatureFlags';
import CardsWithImagesGroup from './CardsWithImagesGroup';
import CardsWithoutImagesGroup from './CardsWithoutImagesGroup';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Cards with images pattern
 *
 * @param {object} props props object
 * @param {Array} props.cardsGroup cardsGroup array with title, groupCard and cards properties
 * @returns {object} JSX Object
 */
const CardSection = ({ theme, cardsGroup, cardType }) => {
  useLayoutEffect(() => {
    root.addEventListener(
      'resize',
      matchHeight(`.${prefix}--cards-with-images-group__cards`)
    );
  });

  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */
  const setTheme = theme => {
    return theme && `${prefix}--cards-with-images--${theme}`;
  };

  return featureFlag(
    DDS_CARD_SECTION,
    <section
      data-autoid={`${stablePrefix}--cards-with-images`}
      className={classNames(`${prefix}--cards-with-images`, setTheme(theme))}>
      <div className={`${prefix}--cards-with-images__container`}>
        <div className={`${prefix}--cards-with-images__row`}>
          <div className={`${prefix}--cards-with-images__col`}>
            {_renderCardsGroup(theme, cardsGroup, cardType)}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Render Cards with images Group Component
 *
 * @private
 * @param {string} theme theme name
 * @param {Array} cardsGroup cardsGroup array with title, groupCard and cards properties
 * @returns {object} JSX Object
 */
const _renderCardsGroup = (theme, cardsGroup) => {
  return cardsGroup.map(group => {
    let Component;
    if (group.type === 'simpleCards') {
      Component = CardsWithoutImagesGroup;
    } else if (group.type === 'imageCards') {
      Component = CardsWithImagesGroup;
    }
    return (
      <Component
        key={group.title}
        title={group.title}
        groupCard={group.groupCard}
        cards={group.cards}
        theme={theme}
      />
    );
  });
};

CardSection.propTypes = {
  theme: PropTypes.string,
  cardsGroup: PropTypes.array,
};

export default CardSection;
