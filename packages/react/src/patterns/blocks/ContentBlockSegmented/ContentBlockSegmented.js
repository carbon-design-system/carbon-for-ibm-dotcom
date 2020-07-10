/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContentBlock from '../../../internal/components/ContentBlock/ContentBlock';
import ContentGroup from '../../../internal/components/ContentGroup/ContentGroup';
import ContentItem from '../../../internal/components/ContentItem/ContentItem';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings';
import { ImageWithCaption } from '../../../components/ImageWithCaption';
import PropTypes from 'prop-types';
import React from 'react';
import settings from 'carbon-components/es/globals/js/settings';
import { VideoPlayer } from '../../../components/VideoPlayer';

const { stablePrefix } = ddsSettings;
const { prefix } = settings;

/**
 * Content Block - Segmented pattern.
 */
const ContentBlockSegmented = ({
  copy,
  cta,
  heading,
  mediaType,
  mediaData,
  items,
  aside,
}) => {
  return (
    <div
      data-autoid={`${stablePrefix}--content-block-segmented`}
      className={`${prefix}--content-block-segmented`}>
      <ContentBlock heading={heading} copy={copy} cta={cta} aside={aside}>
        {_renderMedia(mediaType, mediaData)}
        {_renderGroup(items)}
      </ContentBlock>
    </div>
  );
};

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
      <div data-autoid={`${stablePrefix}--content-block-segmented__media`}>
        {type === 'image' && <ImageWithCaption {...data} />}
        {type === 'video' && <VideoPlayer {...data} />}
      </div>
    );
  }
};

/**
 *
 * @param {object} items content item data
 * @returns {*} JSX Component with the media
 */
const _renderGroup = items =>
  items.map((item, index) => (
    <ContentGroup
      heading={item.heading}
      key={index}
      cta={
        item.cta && (item.cta.type === 'jump' || item.cta.type === 'local')
          ? {
              style: 'text',
              ...item.cta,
            }
          : undefined
      }>
      <div
        data-autoid={`${stablePrefix}--content-block-segmented__content-group`}>
        <ContentItem copy={item.copy} key={index} />
        {item.image && (
          <div data-autoid={`${stablePrefix}--content-block-segmented__media`}>
            <ImageWithCaption {...item.image} />
          </div>
        )}
      </div>
    </ContentGroup>
  ));

ContentBlockSegmented.propTypes = {
  /**
   * Main title of pattern.
   */
  heading: PropTypes.string.isRequired,

  /**
   * Short copy to suppport title.
   */
  copy: PropTypes.string,

  /**
   * Supports `text` and `card` styles.
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
      inverse: PropTypes.bool,
    }),
  ]),

  /**
   * Array of content items to render. Has the following structure for each items:
   *
   * | Name      | Required | Data Type | Description                                                                                                                                                                                                             |
   * | --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | `heading` | YES      | String    | Short copy describing content item.                                                                                                                                                                                     |
   * | `image`   | NO       | Object    | See the [`Image`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/Image) component for full usage details.                                                         |
   * | `cta`     | NO       | Object    | `jump` and `local` types are allowed, for more information, see the [`CTA`](https://github.com/carbon-design-system/ibm-dotcom-library/tree/master/packages/react/src/components/CTA) component for full usage details. |
   * | `copy`    | YES      | String    | Item content.                                                                                                                                                                                                           |
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      copy: PropTypes.string,
      image: PropTypes.shape({
        inverse: PropTypes.bool,
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
      cta: PropTypes.shape({
        style: PropTypes.oneOf(['card']),
        type: PropTypes.oneOf(['local']),
        copy: PropTypes.string,
        customClassName: PropTypes.string,
      }),
    })
  ).isRequired,

  /**
   * Object containing elements to be rendered within <aside> html element on right panel.
   * The structure is:
   *
   * | Name     | Data Type | Description                                                |
   * | -------- | --------- | ---------------------------------------------------------- |
   * | `items`  | Element   | Elements/Components to be rendered on the right panel.     |
   * | `border` | Boolean   | Determines whether bottom border of `ContentBlock` is set. |
   */
  aside: PropTypes.shape({
    items: PropTypes.element,
    border: PropTypes.bool,
  }),
};

export default ContentBlockSegmented;
