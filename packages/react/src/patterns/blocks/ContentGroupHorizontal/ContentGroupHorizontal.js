/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItemHorizontal } from '../../sub-patterns/ContentItemHorizontal';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentGroupHorizontal pattern
 *
 * @param {object} props props object
 * @param {string} props.heading heading text
 * @param {Array} props.items array of content items
 *
 * @returns {*} JSX ContentGroupHorizontal pattern
 */
const ContentGroupHorizontal = ({ heading, items }) => {
  return (
    <ContentBlock
      heading={heading}
      autoid={`${stablePrefix}--content-group-horizontal`}
      className={`${prefix}--content-group-horizontal`}>
      {items.map((item, index) => (
        <ContentItemHorizontal
          eyebrow={item.eyebrow}
          heading={item.heading}
          copy={item.copy}
          cta={item.cta}
          key={index}
        />
      ))}
    </ContentBlock>
  );
};

ContentGroupHorizontal.propTypes = {
  heading: PropTypes.string.isRequired,
  items: PropTypes.array,
};

export default ContentGroupHorizontal;
