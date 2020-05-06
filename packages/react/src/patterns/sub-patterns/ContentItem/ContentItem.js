/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA } from '../../../components/CTA';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {string} props.cta cta object
 * @param {string} props.copy copy text
 * @param {string} props.heading  heading object
 * @param {string} props.mediaType Determines the media type (image or video)
 * @param {object} props.mediaData Data properties for image or video
 * @returns {*} JSX ContentItem component
 */
const ContentItem = ({ cta, copy, heading, mediaType, mediaData }) => (
  <div
    className={`${prefix}--content-item`}
    data-autoid={`${stablePrefix}--content-item`}>
    {heading && (
      <h4
        data-autoid={`${stablePrefix}--content-item__heading`}
        className={`${prefix}--content-item__heading`}>
        {heading}
      </h4>
    )}
    {_renderMedia(mediaType, mediaData)}
    {copy && (
      <div
        data-autoid={`${stablePrefix}--content-item__copy`}
        className={`${prefix}--content-item__copy`}
        dangerouslySetInnerHTML={{
          __html: markdownToHtml(copy, { bold: false }),
        }}></div>
    )}
    {cta && (
      <CTA
        style="text"
        type={cta.type}
        copy={cta.copy}
        href={cta.href}
        customClassName={`${prefix}--content-item__cta`}
      />
    )}
  </div>
);

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
      <div data-autoid={`${stablePrefix}--content-item__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

ContentItem.propTypes = {
  cta: PropTypes.oneOfType(PropTypes.shape(CTA.propTypes)),
  copy: PropTypes.string,
  heading: PropTypes.string,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
};

export default ContentItem;
