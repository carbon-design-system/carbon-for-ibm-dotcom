/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { prefix } = settings;
const { stablePrefix } = ddsSettings;

/**
 *
 * @param {object} props ContentGroupSimple props object
 * @param {string} props.heading ContentGroupSimple heading title string
 * @param {string} props.mediaType Media type, video or image
 * @param {object} props.mediaData Data for renderimg the media
 * @param {Array} props.items Array of objects with data for ContentItems
 * @param {object} props.cta  Object with data for the CTA inside ContentGroup
 * @returns {*} ContentGroupSimple JSX object
 */
const ContentGroupSimple = ({ heading, mediaType, mediaData, items, cta }) => (
  <div
    data-autoid={`${stablePrefix}--content-group-simple`}
    className={`${prefix}--content-group-simple`}>
    <ContentGroup cta={cta} heading={heading}>
      {_renderMedia(mediaType, mediaData)}
      {_renderContent(items)}
    </ContentGroup>
  </div>
);

/**
 *
 * @param {Array} items Array of data for ContentItems to be rendered
 * @returns {*} Array of ContentItem Components
 */
const _renderContent = items =>
  items.map((item, index) => <ContentItem {...item} key={index} />);

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
      <div data-autoid={`${stablePrefix}--content-group-simple__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

ContentGroupSimple.propTypes = {
  heading: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  cta: PropTypes.object,
};

export default ContentGroupSimple;
