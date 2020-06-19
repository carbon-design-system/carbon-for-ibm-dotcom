/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentGroup from '../../../internal/components/ContentGroup/ContentGroup';
import ContentItem from '../../../internal/components/ContentItem/ContentItem';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { prefix } = settings;
const { stablePrefix } = ddsSettings;

/**
 * ContentGroupSimple.
 */
const ContentGroupSimple = ({
  heading,
  mediaType,
  mediaData,
  items,
  cta,
  copy,
}) => (
  <div
    data-autoid={`${stablePrefix}--content-group-simple`}
    className={`${prefix}--content-group-simple`}>
    <ContentGroup cta={cta} heading={heading} copy={copy}>
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
  /**
   * Main heading of the pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Copy text (enabled for the `markdownToHtml` utility)
   */
  copy: PropTypes.string,

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
   * Data to be used on `<ContentItem>`s.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,

  /**
   * Data to be used on CTA.
   * See the [`<CTA>`'s README](http://ibmdotcom-react.mybluemix.net/?path=/docs/components-cta--default#props) for full usage details.
   */
  cta: PropTypes.shape({
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
  }),
};

export default ContentGroupSimple;
