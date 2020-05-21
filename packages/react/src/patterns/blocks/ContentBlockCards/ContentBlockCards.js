/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CardGroup } from '../../sub-patterns/CardGroup';
import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Cards pattern
 *
 * @param {object} props props object
 * @param {Array} props.cards array of cards
 * @returns {*} Content block cards pattern
 */
const ContentBlockCards = ({ heading, cards }) => (
  <div
    data-autoid={`${stablePrefix}--content-block-cards`}
    className={`${prefix}--content-block-cards`}>
    <ContentBlock heading={heading}>
      <div className={`${prefix}--content-block-cards__content`}>
        <CardGroup cards={cards} />
      </div>
    </ContentBlock>
  </div>
);

ContentBlockCards.propTypes = {
  heading: PropTypes.string.isRequired,
  cards: PropTypes.array,
};

export default ContentBlockCards;
