import CardSection from './CardSection';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * SimpleCards pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {Array} props.cards cards array with title, and cards properties
 * @returns {object} JSX Object
 */
const SimpleCards = props => {
  return <CardSection {...props} />;
};

SimpleCards.propTypes = {
  theme: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
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

export default SimpleCards;
