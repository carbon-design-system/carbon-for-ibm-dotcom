/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../ContentBlock/ContentBlock';
import ContentItem from '../ContentItem/ContentItem';
import cx from 'classnames';
import ddsSettings from '../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';
import { ImageWithCaption } from '../ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Simple pattern.
 */
const ContentBlockSimple = ({
  copy,
  heading,
  mediaType,
  mediaData,
  cta,
  aside,
}) => (
  <div
    data-autoid={`${stablePrefix}--content-block-simple`}
    className={`${prefix}--content-block-simple`}
  >
    <ContentBlock heading={heading} cta={cta} aside={aside}>
      <div className={`${prefix}--content-block-simple__content`}>
        <ContentItem copy={copy} />
        {_renderMedia(mediaType, mediaData)}
      </div>
    </ContentBlock>
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
      <div
        data-autoid={`${stablePrefix}--content-block-simple__media`}
        className={cx({
          [`${prefix}--content-block-simple__media-video`]: type === 'video',
          [`${prefix}--content-block-simple__media-image`]: type === 'image',
        })}
      >
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

ContentBlockSimple.propTypes = {
  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/utilities/src/utilities/markdownToHtml) utility.
   */
  copy: PropTypes.string.isRequired,

  /**
   * Title of the content block.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Determines media type (image or video).
   */
  mediaType: PropTypes.string,

  /**
   * Media Data for either image or video.
   * See the following components' README for more details:
   *
   * * `mediaType="image"`: [`<ImageWithCaption>`](http://www.ibm.com/standards/carbon/react/?path=/docs/components-imagewithcaption--default#props)
   * * `mediaType="video"`: [`<VideoPlayer>`](http://www.ibm.com/standards/carbon/react/?path=/docs/components-videoplayer--default#props)
   */
  mediaData: PropTypes.oneOfType([
    PropTypes.shape({
      image: PropTypes.shape({
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
      }).isRequired,
      lightbox: PropTypes.bool,
      heading: PropTypes.string,
      copy: PropTypes.string,
      customClassName: PropTypes.string,
    }),
    PropTypes.shape({
      customClassName: PropTypes.string,
      videoId: PropTypes.string.isRequired,
      showCaption: PropTypes.bool,
    }),
  ]),

  /**
   * CTA used at the end of content body.
   * `Text` and `Card` styles supported.
   * See the [`<CTA>`'s README](http://www.ibm.com/standards/carbon/react/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card']),
    type: PropTypes.oneOfType([
      PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video']),
      PropTypes.arrayOf(
        PropTypes.oneOf(['jump', 'local', 'external', 'download', 'video'])
      ),
    ]),
    heading: PropTypes.string,
    href: PropTypes.string,
    customClassName: PropTypes.string,
  }),

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.object,
};

export default ContentBlockSimple;
