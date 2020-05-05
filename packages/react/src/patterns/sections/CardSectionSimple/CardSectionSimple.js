/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardSection } from '../CardSection';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';

const { stablePrefix } = ddsSettings;
/**
 * CardSectionSimple pattern it is Cards without images
 *
 * @param {object} props props object
 * @param {Array} props.cards array of card
 * @param {object} props.cta cta object
 * @returns {object} JSX Object
 */
const CardSectionSimple = ({ cards, cta, ...otherProps }) => {
  const cardsWithoutImages = cards.filter(
    ({ image, eyebrow, heading, copy, cta: { href } }) =>
      !image && !eyebrow && heading && copy && href
  );
  return (
    <CardSection
      {...otherProps}
      autoid={`${stablePrefix}--card-section-simple-section`}
      cards={cardsWithoutImages}
      cta={cta}
    />
  );
};

CardSectionSimple.propTypes = {
  theme: PropTypes.string,
  heading: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.exact({
      heading: PropTypes.string,
      copy: PropTypes.string,
      cta: PropTypes.object,
    })
  ),
  cta: PropTypes.object,
};
export default CardSectionSimple;
