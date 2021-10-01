/**
 * Copyright IBM Corp. 2016, 2021
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
const CardLink = ({ card, customClassName }) => {
  const cardLinkClassname = cx(
    `${prefix}--card-link ${prefix}--card__CTA`,
    customClassName
  );
  return <Card customClassName={cardLinkClassname} {...card} />;
};

CardLink.propTypes = {
  /**
   * Card options.
   * See [`<Card>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-card--link-clickable#props) for full usage details.
   */
  card: PropTypes.shape(Card.propTypes).isRequired,

  /**
   * Custom className
   */
  customClassName: PropTypes.string,
};

CardLink.defaultProps = {
  disabled: false,
};

export default CardLink;
