/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentGroupCards } from '../ContentGroupCards';
import { ContentGroupPictograms } from '../ContentGroupPictograms';
import { ContentGroupSimple } from '../ContentGroupSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentBlockMixedGroups Pattern
 *
 * @param {object} props ContentBlockMixedGroups props object
 * @param {string} props.heading Content block heading
 * @param {string} props.copy Content block description
 * @param {*} props.cta cta object
 * @param {*} props.items Content block mixed group patterns
 * @returns {*} ContentBlockMixedGroups JSX Object
 */
const ContentBlockMixedGroups = ({ heading, copy, cta, items }) => {
  const group = items.map((item, index) => {
    switch (item.type) {
      case 'ContentGroupCards':
        return (
          <ContentGroupCards
            heading={item.heading}
            items={item.items}
            key={index}
          />
        );
      case 'ContentGroupPictograms':
        return (
          <ContentGroupPictograms
            heading={item.heading}
            items={item.items}
            key={index}
          />
        );
      case 'ContentGroupSimple':
        return (
          <ContentGroupSimple
            mediaType={item.mediaType}
            mediaData={item.mediaData}
            heading={item.heading}
            items={item.items}
            cta={item.cta}
            key={index}
          />
        );
    }
  });

  return (
    <ContentBlock
      heading={heading}
      copy={copy}
      cta={cta}
      items={items}
      customClassName={`${prefix}--content-block-mixedgroups`}>
      <div data-autoid={`${stablePrefix}--content-block-mixedgroups`}>
        {group}
      </div>
    </ContentBlock>
  );
};

ContentBlockMixedGroups.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string,
  items: PropTypes.object,
  cta: PropTypes.object,
};

export default ContentBlockMixedGroups;
