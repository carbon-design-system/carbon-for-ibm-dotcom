/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArrowRight20 } from '@carbon/icons-react';
import { Card } from '../../sub-patterns/Card';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Featured Link Component
 *
 * @param {object} props props object
 * @param {string} props.heading section heading
 * @param {Array} props.card section card object
 * @returns {*} FeatureCard JSX component
 */
const FeatureCard = ({ heading, card }) => {
  const cardProps = {
    ...card,
    cta: { ...card.cta, icon: { src: ArrowRight20, ...card.cta.icon } },
  };
  return (
    <section
      className={`${prefix}--feature-card`}
      data-autoid={`${stablePrefix}--feature-card`}>
      <ContentGroup heading={heading}>
        <Card
          customClassName={`${prefix}--feature-card__card`}
          {...cardProps}
          type="link"
          inverse={true}
        />
      </ContentGroup>
    </section>
  );
};

FeatureCard.propTypes = {
  heading: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
};

export default FeatureCard;
