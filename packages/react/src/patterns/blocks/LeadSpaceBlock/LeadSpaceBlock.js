/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import { CTA } from '../../../components/CTA';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { HorizontalRule } from '../../../components/HorizontalRule';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import { LinkList } from '../../../components/LinkList';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * renders media either video or image content
 *
 * @param {string} type media type
 * @param {object} data media data
 * @returns {*} Image or Video
 */
const _renderMedia = (type, data) => {
  if (data) {
    return (
      <div
        data-autoid={`${stablePrefix}--leadspace-block__media`}
        className={`${prefix}--leadspace-block__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

/**
 * Lead space block component (left-aligned).
 */
const LeadSpaceBlock = ({
  title,
  heading,
  copy,
  mediaType,
  mediaData,
  items,
  cta,
}) => {
  const pageTitle = (
    <div>
      {title && (
        <h1
          data-autoid={`${stablePrefix}--leadspace-block__title`}
          className={`${prefix}--leadspace-block__title`}>
          {title}
        </h1>
      )}
    </div>
  );

  return (
    <div
      data-autoid={`${stablePrefix}--leadspace-block`}
      className={`${prefix}--leadspace-block`}>
      {pageTitle}
      <ContentBlock heading={heading} copy={copy}>
        {_renderMedia(mediaType, mediaData)}
        <LinkList
          style="vertical-end"
          heading={items.heading}
          items={items.items}
        />
        <CTA
          customClassName={`${prefix}--leadspace-block__cta ${prefix}--leadspace-block__cta-col`}
          {...cta}
        />
      </ContentBlock>
      <HorizontalRule />
    </div>
  );
};

LeadSpaceBlock.propTypes = {
  /**
   * Heading of the content block.
   */
  title: PropTypes.string.isRequired,

  /**
   * Subheading of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Link list items.
   */
  items: PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
        type: PropTypes.oneOfType([
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
          PropTypes.arrayOf(
            PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
          ),
        ]),
        copy: PropTypes.string,
        href: PropTypes.string,
        customClassName: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,

  /**
   * Simple content item.
   */
  copy: PropTypes.string,

  /**
   * Media Type [image, video or none].
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
   * CTA props.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape(
    PropTypes.shape({
      style: PropTypes.oneOf(['text', 'card', 'button', 'feature']),
      type: PropTypes.oneOfType([
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
        PropTypes.arrayOf(
          PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
        ),
      ]),
      copy: PropTypes.string,
      href: PropTypes.string,
      customClassName: PropTypes.string,
    })
  ),
};

LeadSpaceBlock.defaultProps = {
  copy: '',
  mediaType: null,
  mediaData: null,
  cta: null,
};

export default LeadSpaceBlock;
