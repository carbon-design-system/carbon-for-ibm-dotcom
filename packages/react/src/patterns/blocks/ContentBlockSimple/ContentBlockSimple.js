/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
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
 * @param {string} props.mediaType Media type, video or image
 * @param {object} props.mediaData Data for renderimg the media
 * @param {Array} props.items Array of objects with data for ContentItems
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({
  copy,
  heading,
  items,
  mediaType,
  mediaData,
  cta,
}) => (
  <ContentBlock
    heading={heading}
    copy={copy}
    items={items}
    cta={cta}
    style
    data-autoid={`${stablePrefix}--content-block-simple`}
    customClassName={`${prefix}--content-block-simple ${prefix}--col-lg-8`}>
    <div
      data-autoid={`${prefix}--content-block-simple__content`}
      className={`${prefix}--content-block-simple__content`}>
      {_renderMedia(mediaType, mediaData)}
      {_renderContent(items)}
    </div>
  </ContentBlock>
);

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
 * @param {Array} items Array of data for ContentItems to be rendered
 * @returns {*} Array of ContentItem Components
 */
const _renderContent = items =>
  items.map((item, index) => <ContentItem {...item} key={index} />);

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  cta: PropTypes.object,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
};

export default ContentBlockSimple;
