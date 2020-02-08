/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import ContentBlockMediaGroup from './ContentBlockMediaGroup';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Use cases pattern
 *
 * @param {object} props props object
 * @param {string} props.copy Use cases short copy to support the heading
 * @param {string} props.heading Use cases heading
 * @param {Array} props.contentGroup contentGroup array with heading, image and lists
 * @param {object} props.cta cta object
 * @returns {object} JSX Object
 */
const ContentBlockMedia = ({ copy, heading, contentGroup, cta }) => {
  if (cta) cta.style = 'feature';

  return (
    <ContentBlock
      heading={heading}
      copy={copy}
      cta={cta}
      data-autoid={`${stablePrefix}--content-block-media`}
      customClassName={`${prefix}--content-block-media ${prefix}--col-lg-8`}>
      {_renderContentGroup(contentGroup)}
    </ContentBlock>
  );
};

/**
 * Render Content Block Media Group Component
 *
 * @private
 * @param {Array} items content block media group items array
 * @returns {object} JSX Object
 */
const _renderContentGroup = items => {
  return items.map(item => {
    return <ContentBlockMediaGroup key={item.title} contentGroup={item} />;
  });
};

ContentBlockMedia.propTypes = {
  copy: PropTypes.string,
  heading: PropTypes.string.isRequired,
  contentGroup: PropTypes.array.isRequired,
  cta: PropTypes.object,
};

export default ContentBlockMedia;
