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
  return <CardSection {...props} />;
};

CardSectionImages.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      title: PropTypes.string,
      copy: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        text: PropTypes.string,
        target: PropTypes.string,
      }),
    })
  ),
};

export default CardSectionImages;
