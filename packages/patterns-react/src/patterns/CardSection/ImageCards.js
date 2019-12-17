import React from 'react';
import CardSection from './CardSection';

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
export default ImageCards;
