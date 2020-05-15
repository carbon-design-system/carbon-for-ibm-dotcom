/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card, cardPropTypes } from '../../sub-patterns/Card';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Card Component
 *
 * @param {object} props props object
 * @param {object} props.card section card object
 * @param {Function} props.onClick onClick function
 * @returns {*} FeatureCard JSX component
 */
const FeatureCard = ({ card, onClick }) => {
  return (
    card.cta && (
      <div
        className={`${prefix}--feature-card`}
        data-autoid={`${stablePrefix}--feature-card`}>
        <Card
          customClassName={`${prefix}--feature-card__card`}
          {...card}
          type="link"
          inverse={true}
          handleClick={onClick}
        />
      </div>
    )
  );
};

FeatureCard.propTypes = {
  card: PropTypes.shape(cardPropTypes).isRequired,
  onClick: PropTypes.func,
};

export default FeatureCard;
