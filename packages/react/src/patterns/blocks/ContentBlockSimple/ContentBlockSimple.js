/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ContentBlock } from '../../sub-patterns/ContentBlock';
import { ContentItem } from '../../sub-patterns/ContentItem';
import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

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
  /**
   * Simple content item.
   * Uses [`markdownToHtml`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/utilities/src/utilities/markdownToHtml) utility.
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
   * CTA used at the end of content body.
   * `Text` and `Card` styles supported.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
    style: PropTypes.oneOf(['text', 'card']),
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
   * Elements to be rendered on right panel of the content block.
   * See [`ContentBlock` README](http://ibmdotcom-react.mybluemix.net/?path=/docs/patterns-sub-patterns-contentblock--default) for more info.
   */
  aside: PropTypes.object,

  /**
   * `true` to change theme to inverse.
   */
  inverse: PropTypes.bool,
};

export default ContentBlockSimple;
