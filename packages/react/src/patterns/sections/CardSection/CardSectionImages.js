import CardSection from './CardSection';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * CardSectionImages pattern it is Cards with images
 *
 * @param {object} props props object
 * @param {Array} props.cards cards array with title, and cards properties
 * @returns {object} JSX Object
 */
const CardSectionImages = props => {
  const cardsWithImages = props.cards.filter(
    card => card.image && card.eyebrow
  );
  return <CardSection {...(cardsWithImages && { ...props })} />;
};

CardSectionImages.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object.isRequired,
      eyebrow: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
};

export default CardSectionImages;
