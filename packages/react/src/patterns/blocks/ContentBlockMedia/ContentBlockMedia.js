/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentGroupSimple } from '../ContentGroupSimple';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - segmented pattern
 *
 * @param {object} props props object
 * @param {string} props.copy pattern short copy to support the heading
 * @param {string} props.heading pattern heading
 * @param {Array} props.items items array with heading, image and lists
 * @param {object} props.cta cta object
 * @param {object} props.aside elements to render on right panel
 * @returns {object} JSX Object
 */
const ContentBlockMedia = ({ copy, heading, items, cta, aside }) => {
  if (cta) cta.style = 'feature';

  const content = items.map((item, index) => {
    return <ContentGroupSimple key={index} {...item} />;
  });

  return (
    <div
      data-autoid={`${stablePrefix}--content-block-media`}
      className={`${prefix}--content-block-media`}>
      <ContentBlock heading={heading} copy={copy} cta={cta} aside={aside}>
        {content}
      </ContentBlock>
    </div>
  );
};

ContentBlockMedia.propTypes = {
  copy: PropTypes.string,
  heading: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  cta: PropTypes.object,
  aside: PropTypes.object,
};

export default ContentBlockMedia;
