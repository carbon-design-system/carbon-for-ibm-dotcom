/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Card } from '../../sub-patterns/Card';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { FeatureCard } from '../../sub-patterns/FeatureCard';
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
 * @returns {*} FeatureCard JSX component
 */
const FeatureCardBlockMedium = ({ heading, card }) => {
  return (
    heading &&
    card.cta && (
      <section
        className={`${prefix}--feature-card-block-medium`}
        data-autoid={`${stablePrefix}--feature-card--feature-card-block-medium`}>
        <ContentGroup heading={heading}>
          <FeatureCard card={card} />
        </ContentGroup>
      </section>
    )
  );
};

FeatureCardBlockMedium.propTypes = {
  heading: PropTypes.string.isRequired,
  card: PropTypes.instanceOf(Card).isRequired,
};

export default FeatureCardBlockMedium;
