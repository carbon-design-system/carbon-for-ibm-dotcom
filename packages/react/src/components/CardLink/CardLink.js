/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Card } from '../Card';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { prefix } = settings;

/**
 * CardLink component
 */
const CardLink = ({ card, disabled }) => {
  const type = disabled ? '' : 'link';
  const cardLinkClassname = cx(`${prefix}--card__CTA`, {
    [`${prefix}--card__CTA--disabled`]: disabled,
  });
  return (
    <Card
      customClassName={cardLinkClassname}
      {...card}
      role="region"
      type={type}
      disabled={disabled}
    />
  );
};

CardLink.propTypes = {
  /**
   * Card options.
   * See [`<Card>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-card--link-clickable#props) for full usage details.
   */
  card: PropTypes.shape(Card.propTypes).isRequired,
  /**
   * disabled: `true` to disable it.
   */
  disabled: PropTypes.bool,
};

export default CardLink;
