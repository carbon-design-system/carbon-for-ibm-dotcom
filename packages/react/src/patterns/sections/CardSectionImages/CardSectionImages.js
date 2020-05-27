/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../../../components/CardGroup';
import classNames from 'classnames';
import ContentSection from '../../../internal/components/ContentSection/ContentSection';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * CardSectionImages pattern it is Cards with images
 *
 * @param {object} props props object
 * @param {Array} props.cards array of card
 * @param {string} props.theme theme of cards
 * @returns {object} JSX Object
 */
const CardSectionImages = ({ cards, theme, ...otherProps }) => {
  const cardsWithImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      image && eyebrow && heading && !copy && href
  );

  /**
   * sets the class name based on theme type
   *
   * @private
   * @param {string} theme theme type ( g10 | g100 | white/default )
   * @returns {string} theme css class names
   */
  const _setTheme = theme => {
    return theme && `${prefix}--card-group--${theme}`;
  };

  return (
    <ContentSection
      heading={otherProps.heading}
      autoid={`${stablePrefix}--card-group-images-group`}
      customClassName={classNames(`${prefix}--card-group`, _setTheme(theme))}>
      <CardGroup cards={cardsWithImages} />
    </ContentSection>
  );
};

CardSectionImages.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      image: PropTypes.object,
      eyebrow: PropTypes.string,
      heading: PropTypes.string,
      cta: PropTypes.object,
    })
  ),
};

export default CardSectionImages;
