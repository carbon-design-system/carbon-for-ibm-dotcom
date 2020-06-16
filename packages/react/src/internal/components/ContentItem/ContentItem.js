/**
 * Copyright IBM Corp. 2016, 2020
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
  /**
   * CTA object.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    copy: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Allows user to pass in custom class name.
   */
  customClassName: PropTypes.string,

  /**
   * Copy text.
   */
  copy: PropTypes.string,

  /**
   * Heading text.
   */
  heading: PropTypes.string,

  /**
   * Determines media type (image or video).
   */
  mediaType: PropTypes.oneOf(['image', 'video']),

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: PropTypes.oneOfType([
    PropTypes.shape({
      inverse: PropTypes.bool,
      image: PropTypes.shape(
        PropTypes.shape({
          classname: PropTypes.string,
          sources: PropTypes.arrayOf(
            PropTypes.shape({
              src: PropTypes.string,
              breakpoint: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
              ]),
            })
          ),
          defaultSrc: PropTypes.string.isRequired,
          alt: PropTypes.string.isRequired,
          longDescription: PropTypes.string,
        })
      ).isRequired,
      lightbox: PropTypes.bool,
      heading: PropTypes.string,
      copy: PropTypes.string,
      customClassName: PropTypes.string,
    }),
    PropTypes.shape({
      customClassName: PropTypes.string,
      videoId: PropTypes.string.isRequired,
      showCaption: PropTypes.bool,
      inverse: PropTypes.bool,
    }),
  ]),

  /**
   * `true` to changes theme to inverse.
   */
  inverse: PropTypes.bool,
};

export default ContentItem;
