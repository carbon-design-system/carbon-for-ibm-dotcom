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
 * ContentBlockMixed Pattern
 *
 * @param {object} props ContentBlockMixed props object
 * @param {string} props.heading Content block heading
 * @param {string} props.copy Content block description
 * @param {object} props.cta cta object
 * @param {Array} props.items Content block mixed group patterns
 * @param {object} props.aside elements to render on right panel
 * @returns {*} ContentBlockMixed JSX Object
 */
const ContentBlockMixed = ({ heading, copy, cta, items, aside }) => {
  const patterns = {
    ContentGroupCards,
    ContentGroupSimple,
    ContentGroupPictograms,
  };
  const groups = items.map((item, index) => {
    const Pattern = patterns[item.type];
    return <Pattern key={index} {...item} />;
  });

  return (
    <div
      data-autoid={`${stablePrefix}--content-block-mixed`}
      className={`${prefix}--content-block-mixed`}>
      <ContentBlock heading={heading} copy={copy} cta={cta} aside={aside}>
        {groups}
      </ContentBlock>
    </div>
  );
};

ContentBlockMixed.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string,
  items: PropTypes.array,
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['card']),
  }),
  aside: PropTypes.object,
};

export default ContentBlockMixed;
