/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { settings } from 'carbon-components';
import classNames from 'classnames';
import { featureFlag } from '@carbon/ibmdotcom-utilities';
import { DDS_CARDS_WITHOUT_IMAGES } from '../../internal/FeatureFlags';
import CardsWithoutImagesGroup from './CardsWithoutImagesGroup';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Cards without images pattern
 *
 * @param {object} props props object
 * @param {Array} props.cardsGroup cardsGroup array with title, groupCard and cards properties
 * @returns {object} JSX Object
 */
const CardsWithoutImages = ({ cardsGroup }) =>
  featureFlag(
    DDS_CARDS_WITHOUT_IMAGES,
    <section
      data-autoid={`${stablePrefix}--cards-without-images`}
      className={classNames(`${prefix}--cards-without-images`)}>
      <div className={`${prefix}--cards-without-images__container`}>
        <div className={`${prefix}--cards-without-images__row`}>
          <div className={`${prefix}--cards-without-images__col`}>
            {_renderCardsGroup(cardsGroup)}
          </div>
        </div>
      </div>
    </section>
  );

/**
 * Render Cards without images Group Component
 *
 * @private
 * @param {Array} cardsGroup cardsGroup array with title, groupCard and cards properties
 * @returns {object} JSX Object
 */
const _renderCardsGroup = cardsGroup => {
  return cardsGroup.map(group => {
    return (
      <CardsWithoutImagesGroup
        key={group.title}
        title={group.title}
        groupCard={group.groupCard}
        cards={group.cards}
      />
    );
  });
};

CardsWithoutImages.propTypes = {
  cardsGroup: PropTypes.array,
};

export default CardsWithoutImages;
