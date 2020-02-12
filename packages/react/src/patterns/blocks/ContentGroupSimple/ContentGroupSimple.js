/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentGroup } from '../../sub-patterns/ContentGroup';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { Image } from '../../../components/Image';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

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
      <div>
        {_renderMedia(mediaType, mediaData)}
        {_renderContent(items)}
      </div>
    </ContentGroup>
  </div>
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

ContentGroupSimple.propTypes = {
  heading: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  cta: PropTypes.object,
};

export default ContentGroupSimple;
