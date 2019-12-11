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
import { CardLink } from '@carbon/ibmdotcom-react';
import { ArrowRight20 } from '@carbon/icons-react';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * sets the class name based on theme type
 *
 * @param {string} theme theme type ( g10 | white/default )
 * @returns {string} theme css class names
 */
const setTheme = theme => {
  return theme && `${prefix}--cards-with-images-group--${theme}`;
};

/**
 * Card without images group Component
 *
 * @param {object} props props object
 * @param {string} props.title cards group title
 * @param {string} props.theme theme name
 * @param {Array} props.groupCard cards group card
 * @param {Array} props.cards Array of object with title, href and target properties
 * @returns {object} JSX Object
 */
const CardsWithImagesGroup = ({ theme, title, groupCard, cards }) => {
  return (
    <div
      data-autoid={`${stablePrefix}--cards-with-images-group`}
      className={classNames(
        `${prefix}--cards-with-images-group`,
        setTheme(theme)
      )}>
      <h2 className={`${prefix}--cards-with-images-group__title`}>{title}</h2>
      <div className={`${prefix}--cards-with-images-group__cards`}>
        {_renderList(cards)}
        <CardLink
          data-autoid={`${stablePrefix}--cards-with-images-group__cards__card-${cards.title}`}
          className={`${prefix}--cards-with-images-group__cards__card`}
          title={cards.title}
          href={groupCard.href}
          target={groupCard.target}
          icon={<ArrowRight20 />}
        />
      </div>
    </div>
  );
};

/**
 * Render List Component
 *
 * @private
 * @param {object} cards cards Object
 * @returns {object} JSX Object
 */
const _renderList = cards => {
  return cards.map(card => {
    return (
      <CardLink
        className={`${prefix}--cards-with-images-group__cards__card`}
        data-autoid={`${stablePrefix}--cards-with-images-group__card-${card.title}`}
        key={card.title}
        imgSrc={card.imgSrc}
        altText={card.altText}
        title={card.title}
        content={card.copy}
        href={card.link.href}
        target={card.link.target}
        icon={<ArrowRight20 />}
      />
    );
  });
};

CardsWithImagesGroup.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string,
  groupCard: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
    target: PropTypes.string,
  }),
  cards: PropTypes.array,
};

export default CardsWithImagesGroup;
