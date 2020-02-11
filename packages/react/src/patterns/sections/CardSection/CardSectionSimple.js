import CardSection from './CardSection';
import PropTypes from 'prop-types';
import React from 'react';
/**
 * CardSectionSimple pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {Array} props.cards cards array with title, and cards properties
 * @returns {object} JSX Object
 */
const CardSectionSimple = props => {
  const cardWithoutImages = props.cards.filter(
    card => !card.image && !card.eyebrow
  );
  return <CardSection {...(cardWithoutImages && { ...props })} />;
};
CardSectionSimple.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
};
export default CardSectionSimple;
