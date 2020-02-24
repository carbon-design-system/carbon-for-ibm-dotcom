/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
 * @param {string} props.heading FeaturedLink section heading
 * @param {Array} props.card FeaturedLink section card object
 * @returns {*} FeaturedLink JSX component
 */
const FeaturedLink = ({ heading, card }) => {
  const cardProps = {
    ...card,
    cta: { ...card.cta, icon: { src: card.cta.src, ...card.cta.icon } },
  };
  return (
    <section
      className={`${prefix}--featuredlink`}
      data-autoid={`${stablePrefix}--featuredlink`}>
      <ContentGroup heading={heading}>
        <Card
          customClassName={`${prefix}--featuredlink__card`}
          {...cardProps}
          type="link"
          inverse={true}
        />
      </ContentGroup>
    </section>
  );
};

FeaturedLink.propTypes = {
  heading: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
};

export default FeaturedLink;
