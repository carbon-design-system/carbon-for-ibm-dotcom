import { CardSection } from '../CardSection';
import PropTypes from 'prop-types';
import React from 'react';
/**
 * CardSectionSimple pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {string} props.otherProps props
 * @param {Array} props.cards array card
 * @returns {object} JSX Object
 */
const CardSectionSimple = ({ cards, ...otherProps }) => {
  const cardsWithoutImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      !image && !eyebrow && heading && copy && href
  );
  return <CardSection {...otherProps} cards={cardsWithoutImages} />;
};

CardSectionSimple.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      cta: PropTypes.object,
    })
  ),
};
export default CardSectionSimple;
