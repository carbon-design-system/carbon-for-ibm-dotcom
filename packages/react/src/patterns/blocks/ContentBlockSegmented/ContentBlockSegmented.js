/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Simple pattern
 *
 * @param {object} props props object
 * @param {string} props.copy Content block simple short copy to support the heading
 * @param {string} props.linkType link type ( simple | jump | card )
 * @param {object} props.link link object which includes url, link text and target properties.
 * @param {string} props.heading Content block simple heading
 * @param {object} props.cta cta object
 * @param {object} props.contentGroup chilren content element
 * @returns {*} Content block simple pattern
 */
const ContentBlockSegmented = ({ copy, heading, items }) => {
  return (
    <ContentBlock
      heading={heading}
      copy={copy}
      data-autoid={`${stablePrefix}--content-block-segmented`}
      customClassName={`${prefix}--content-block-segmented ${prefix}--col-lg-8`}>
      {_renderGroup(items)}
    </ContentBlock>
  );
};

/**
 *
 * @param {string} mediaType Media type, video or image
 * @param {object} mediaData Data for renderimg the media
 * @returns {*} JSX Component with the media
 */
const _renderMedia = (mediaType, mediaData) => {
  if (mediaData) {
    if (mediaType === 'image') {
      return (
        <div data-autoid={`${stablePrefix}--content-group-simple__media`}>
          <Image {...mediaData} />
        </div>
      );
    }
  }
};

/**
 *
 * @param {object} items content data
 * @returns {*} JSX Component with the media
 */
const _renderGroup = items => {
  console.log('items', items);
  items.map((item, index) => (
    <ContentGroup cta={item.cta} heading={item.heading}>
      {item.mediaData && _renderMedia(item.mediaType, item.mediaData)}
      <ContentItem {...item.content} key={index} />
    </ContentGroup>
  ));
};

/**
 *
 * @param {Array} items Array of data for ContentItems to be rendered
 * @returns {*} Array of ContentItem Components
 */
const _renderContent = items =>
  items.map((item, index) => <ContentItem {...item} key={index} />);

ContentBlockSegmented.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  cta: PropTypes.object,
  ctaStyle: PropTypes.string,
  ctaType: PropTypes.string,
  contentGroup: PropTypes.object,
};

export default ContentBlockSegmented;
