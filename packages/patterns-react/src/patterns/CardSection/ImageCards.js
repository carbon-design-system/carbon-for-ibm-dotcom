import CardSection from './CardSection';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * ImageCards pattern it is Cards with images
 *
 * @param {object} props props object
 * @param {Array} props.cards cards array with title, and cards properties
 * @returns {object} JSX Object
 */
const ImageCards = props => {
  return <CardSection {...props} />;
};

ImageCards.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      altText: PropTypes.string,
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

export default ImageCards;
