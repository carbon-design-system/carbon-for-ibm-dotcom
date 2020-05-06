/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card, cardPropTypes } from '../../sub-patterns/Card';
import classNames from 'classnames';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
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
 * @param {string} props.heading section heading
 * @param {object} props.card section card object
 * @param {Function} props.onClick onClick function
 * @returns {*} FeatureCard JSX component
 */
const FeatureCard = ({ heading, card, onClick }) => {
  const hasCopy = classNames({ [`no-desc`]: !card.copy });
  return (
    heading &&
    card.cta && (
      <section
        className={`${prefix}--feature-card ${hasCopy}`}
        data-autoid={`${stablePrefix}--feature-card`}>
        <ContentGroup heading={heading}>
          <Card
            customClassName={`${prefix}--feature-card__card`}
            {...card}
            type="link"
            inverse={true}
            handleClick={onClick}
          />
        </ContentGroup>
      </section>
    )
  );
};

FeatureCard.propTypes = {
  heading: PropTypes.string.isRequired,
  card: PropTypes.oneOf(PropTypes.shape(cardPropTypes)).isRequired,
  onClick: PropTypes.func,
};

export default FeatureCard;
