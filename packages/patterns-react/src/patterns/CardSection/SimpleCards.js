import React from 'react';
import CardSection from './CardSection';
import PropTypes from 'prop-types';

/**
 * SimpleCards pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {Array} props.cards cards array with title, and cards properties
 * @returns {object} JSX Object
 */
const SimpleCards = props => {
  // return props.cards.map(card => {
  //   if (card.hasOwnProperty('imgSrc') && card.hasOwnProperty('altText')) {
  //     let result = props.cards.map(({ imgSrc, altText, ...rest }) => rest);
  //     return (
  //       <CardSection title="Aliquam condimentum interdum" cards={result} />
  //     );
  //   } else {
  //     return <CardSection {...props} />;
  //   }
  // });
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
