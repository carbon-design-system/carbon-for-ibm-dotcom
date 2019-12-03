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
const CardsWithoutImages = ({ theme, cardsGroup }) => {
  useLayoutEffect(() => {
    root.addEventListener(
      'resize',
      _matchHeight(`.${prefix}--cards-without-images-group__cards`)
    );
  });

  /**
   * Match heights of child elements
   *
   * @private
   * @param {*} parentEl Parent element selector
   */
  const _matchHeight = parentEl => {
    const parentEls = document.querySelectorAll(parentEl);
    parentEls.forEach(parentEl => {
      const childEls = parentEl.childNodes;
      childEls.forEach(el => {
        el.style.height = null;
      });
      const maxHeight = _getMaxHeight(childEls);
      childEls.forEach(el => {
        el.style.height = maxHeight + 'px';
      });
    });
  };

  /**
   * Get Max height of given elements
   *
   * @private
   * @param {*} els elements selector
   * @returns {number} the max height between elements
   */
  const _getMaxHeight = els => {
    return Array.prototype.map
      .call(els, el => el.scrollHeight)
      .reduce((pre, cur) => Math.max(pre, cur), -Infinity);
  };

  /**
   * sets the class name based on theme type
   *
   * @param {string} theme theme type ( g10 | white/default )
   * @returns {string} theme css class names
   */
  const setTheme = theme => {
    return theme && `${prefix}--cards-without-images--${theme}`;
  };

  return featureFlag(
    DDS_CARDS_WITHOUT_IMAGES,
    <section
      data-autoid={`${stablePrefix}--cards-without-images`}
      className={classNames(
        `${prefix}--cards-without-images`,
        setTheme(theme)
      )}>
      <div className={`${prefix}--cards-without-images__container`}>
        <div className={`${prefix}--cards-without-images__row`}>
          <div className={`${prefix}--cards-without-images__col`}>
            {_renderCardsGroup(cardsGroup)}
          </div>
        </div>
      </div>
    </section>
  );
};

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
