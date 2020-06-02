/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Card } from '../Card';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * CardLink component
 */
const CardLink = ({ card }) => {
  return (
    <Card
      customClassName={`${prefix}--card__CTA`}
      {...card}
      role="region"
      type="link"
    />
  );
};

CardLink.propTypes = {
  /**
   * Card options.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--link-clickable#props) for full usage details.
   */
  card: PropTypes.shape(Card.propTypes).isRequired,
};

export default CardLink;
