/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CTA } from '../../../components/CTA';
import cx from 'classnames';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import { markdownToHtml } from '@carbon/ibmdotcom-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * ContentItem Component
 *
 * @param {object} props props object
 * @param {boolean} props.inverse inverse class
 * @param {string} props.customClassName allows user to pass in custom class name
 * @param {string} props.cta cta object
 * @param {string} props.copy copy text
 * @param {string} props.heading  heading object
 * @param {string} props.mediaType Determines the media type (image or video)
 * @param {object} props.mediaData Data properties for image or video
 * @returns {*} JSX ContentItem component
 */
const ContentItem = ({
  cta,
  copy,
  heading,
  mediaType,
  mediaData,
  inverse,
  customClassName,
}) => {
  const classnames = cx(
    `${prefix}--content-item`,
    { [`${prefix}--content-item--inverse`]: inverse },
    customClassName
  );
  return (
    <div className={classnames} data-autoid={`${stablePrefix}--content-item`}>
      {heading && (
        <h4
          data-autoid={`${stablePrefix}--content-item__heading`}
          className={`${prefix}--content-item__heading`}>
          {heading}
        </h4>
      )}
      {_renderMedia(mediaType, mediaData, inverse)}
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
};

/**
 * renders either video or image content
 *
 * @param {string} type cta type ( external | jump | local)
 * @param {object} data cta type ( external | jump | local)
 * @param {boolean} inverse inverse type
 * @private
 * @returns {*} media component
 */
const _renderMedia = (type, data, inverse) => {
  if (data) {
    return (
      <div data-autoid={`${stablePrefix}--content-item__media`}>
        {type === 'image' && <ImageWithCaption inverse={inverse} {...data} />}
        {type === 'video' && <VideoPlayer inverse={inverse} {...data} />}
      </div>
    );
  }
};

ContentItem.propTypes = {
  cta: PropTypes.shape(CTA.propTypes),
  customClassName: PropTypes.string,
  copy: PropTypes.string,
  heading: PropTypes.string,
  mediaType: PropTypes.string,
  mediaData: PropTypes.object,
  inverse: PropTypes.bool,
};

export default ContentItem;
