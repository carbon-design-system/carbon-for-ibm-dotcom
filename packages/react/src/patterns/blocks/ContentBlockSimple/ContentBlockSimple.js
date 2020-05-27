/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import ContentItem from '../../../internal/components/ContentItem/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Simple pattern
 *
 * @param {object} props props object
 * @param {string} props.copy multiple paragraphs to support the heading
 * @param {string} props.heading Content block simple heading
 * @param {string} props.mediaType Determines the media type (image or video)
 * @param {object} props.mediaData Data properties for image or video
 * @param {object} props.cta cta object
 * @param {object} props.aside elements to render on right panel
 * @returns {*} Content block simple pattern
 */
const ContentBlockSimple = ({
  copy,
  heading,
  mediaType,
  mediaData,
  cta,
  aside,
  inverse,
}) => (
  <div
    data-autoid={`${stablePrefix}--content-block-simple`}
    className={`${prefix}--content-block-simple`}>
    <ContentBlock inverse={inverse} heading={heading} cta={cta} aside={aside}>
      <div className={`${prefix}--content-block-simple__content`}>
        <ContentItem inverse={inverse} copy={copy} />
        {_renderMedia(mediaType, mediaData, inverse)}
      </div>
    </ContentBlock>
  </div>
);

/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @param {boolean} inverse inverse theme
 * @private
 * @returns {*} media component
 */
const _renderMedia = (type, data, inverse) => {
  if (data) {
    return (
      <div data-autoid={`${stablePrefix}--content-block-simple__media`}>
        {type === 'image' && <ImageWithCaption inverse={inverse} {...data} />}
        {type === 'video' && <VideoPlayer inverse={inverse} {...data} />}
      </div>
    );
  }
};

ContentBlockSimple.propTypes = {
  copy: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  cta: PropTypes.object,
  aside: PropTypes.object,
  inverse: PropTypes.bool,
};

export default ContentBlockSimple;
