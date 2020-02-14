/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardSection } from '../CardSection';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * CardSectionImages pattern it is Cards with images
 *
 * @param {object} props props object
 * @param {string} props.otherProps props heading
 * @param {Array} props.cards array of card
 * @returns {object} JSX Object
 */
const CardSectionImages = ({ cards, ...otherProps }) => {
  const cardsWithImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      image && eyebrow && heading && !copy && href
  );
  console.log('Props', otherProps, cardsWithImages);
  return <CardSection {...otherProps} cards={cardsWithImages} />;
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
