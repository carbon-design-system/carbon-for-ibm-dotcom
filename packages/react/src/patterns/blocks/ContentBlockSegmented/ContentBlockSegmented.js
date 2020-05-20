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
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Segmented pattern
 *
 * @param {object} props props object
 * @param {string} props.heading content block heading
 * @param {string} props.copy content block short copy to support the heading
 * @param {object} props.cta content block cta
 * @param {string} props.mediaType Determines the media type (image or video)
 * @param {object} props.mediaData Data properties for image or video
 * @param {Array} props.items content block content items
 * @param {object} props.aside elements to render on right panel
 * @returns {*} Content Block - Segmented pattern
 */
const ContentBlockSegmented = ({
  copy,
  cta,
  heading,
  mediaType,
  mediaData,
  items,
  aside,
}) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-block-segmented`}
      className={`${prefix}--content-block-segmented`}>
      <ContentBlock heading={heading} copy={copy} cta={cta} aside={aside}>
        {_renderMedia(mediaType, mediaData)}
        {_renderGroup(items)}
      </ContentBlock>
    </div>
  );
};

/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @private
 * @returns {*} media component
 */
const _renderMedia = (type, data) => {
  if (data) {
    return (
      <div data-autoid={`${stablePrefix}--content-block-segmented__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

/**
 *
 * @param {object} items content item data
 * @returns {*} JSX Component with the media
 */
const _renderGroup = items =>
  items.map((item, index) => (
    <ContentGroup
      heading={item.heading}
      key={index}
      cta={
        item.cta && (item.cta.type === 'jump' || item.cta.type === 'local')
          ? {
              style: 'text',
              ...item.cta,
            }
          : false
      }>
      <div
        data-autoid={`${stablePrefix}--content-block-segmented__content-group`}>
        <ContentItem copy={item.copy} key={index} />
        {item.image && (
          <div data-autoid={`${stablePrefix}--content-block-segmented__media`}>
            <ImageWithCaption {...item.image} />
          </div>
        )}
      </div>
    </ContentGroup>
  ));

ContentBlockSegmented.propTypes = {
  heading: PropTypes.string.isRequired,
  copy: PropTypes.string.isRequired,
  cta: PropTypes.object,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  items: PropTypes.array.isRequired,
  aside: PropTypes.object,
};

export default ContentBlockSegmented;
